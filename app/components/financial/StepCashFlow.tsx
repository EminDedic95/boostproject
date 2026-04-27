'use client'
import React from 'react'
import { SalesData } from './StepProdajniAsortiman'
import { StalnaData } from './StepStalnaData'
import { FinansiranjeData } from './StepFinansiranje'
import { PromocijaData } from './StepPromocija'
import { TroskoviData } from './StepTroskovi'

function fmt(n: number) {
  return n.toLocaleString('bs-BA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function calcAmort(stalnaData: StalnaData): number {
  const rates: Record<string, number> = { infrastruktura: 40, oprema: 10, vozila: 5, zemljiste: 0 }
  let total = 0
  for (const [cat, rate] of Object.entries(rates)) {
    if (rate === 0) continue
    const items = stalnaData[cat as keyof StalnaData] as Array<{ kolicina: number, vrijednost: number }>
    if (Array.isArray(items)) total += items.reduce((s, i) => s + i.kolicina * i.vrijednost, 0) / rate
  }
  return total
}

interface MonthlyRow {
  month: string
  year: number
  primici: number
  trMat: number
  ostaliTr: number
  plate: number
  marketing: number
  kamata: number
  otplataGlavnice: number
  izdaci: number
  neto: number
  kumulativni: number
}

interface Props {
  salesData: SalesData
  stalnaData: StalnaData
  finansiranjeData: FinansiranjeData
  promocijaData: PromocijaData
  troskoviData: TroskoviData
}

export default function StepCashFlow({ salesData, stalnaData, finansiranjeData, promocijaData, troskoviData }: Props) {
  const g2 = salesData.growthG2
  const g3 = salesData.growthG3

  const prihodG1 = salesData.products.reduce((s, p) => s + p.obim * p.cijena, 0)
  const trMatG1 = salesData.products.reduce((s, p) => s + p.obim * p.trMat, 0)
  const amort = calcAmort(stalnaData)
  const plateG1 = troskoviData.zaposleni.reduce((s, z) => s + z.brutoPlataMjes * 12, 0)
  const ostalTrG1 = troskoviData.ostaliTroskovi.reduce((s, t) => s + t.mjesecniIznos * 12, 0)
  const marketingG1 = promocijaData.items.reduce((s, i) => s + i.mjesecniIznos * 12, 0)

  const totalUlaganja = (() => {
    let t = 0
    for (const cat of ['infrastruktura', 'zemljiste', 'oprema', 'vozila']) {
      const items = stalnaData[cat as keyof StalnaData] as Array<{ kolicina: number, vrijednost: number }>
      if (Array.isArray(items)) t += items.reduce((s, i) => s + i.kolicina * i.vrijednost, 0)
    }
    return t + (stalnaData.osnivacka || 0) + (stalnaData.obrtna || 0)
  })()

  const k = finansiranjeData.kredit

  // Build 36-month schedule
  let kreditOstatak = k.iznos || 0
  const kreditR = k.iznos && k.kamatnaStopa && k.rokOtplate ? (k.kamatnaStopa / 100 / 12) : 0
  const annuitet = kreditR > 0 && k.rokOtplate ? k.iznos * kreditR / (1 - Math.pow(1 + kreditR, -k.rokOtplate)) : 0

  const months: MonthlyRow[] = []
  let kumulativni = 0

  // Seasonal distribution (flat for now)
  const seasonFactor = 1 / 12

  for (let m = 1; m <= 36; m++) {
    const yr = Math.ceil(m / 12)
    const mo = ((m - 1) % 12) + 1
    const label = 'G' + yr + '-M' + String(mo).padStart(2, '0')

    const growthFactor = yr === 1 ? 1 : yr === 2 ? g2 : g3

    const primici = prihodG1 * growthFactor * seasonFactor
    const trMat = trMatG1 * growthFactor * seasonFactor
    const ostaliTr = ostalTrG1 * growthFactor * seasonFactor
    const plate = plateG1 * growthFactor * seasonFactor
    const marketing = marketingG1 * growthFactor * seasonFactor

    let kamata = 0
    let otplataGlavnice = 0

    if (k.iznos > 0 && m <= (k.gracePeriod || 0) + (k.rokOtplate || 0)) {
      kamata = kreditOstatak * kreditR
      if (m > (k.gracePeriod || 0)) {
        otplataGlavnice = Math.min(annuitet - kamata, kreditOstatak)
        kreditOstatak = Math.max(0, kreditOstatak - otplataGlavnice)
      }
    }

    // Add initial investment in month 1
    const investicija = m === 1 ? totalUlaganja : 0

    const izdaci = trMat + ostaliTr + plate + marketing + kamata + otplataGlavnice + investicija
    const neto = primici - izdaci
    kumulativni += neto

    months.push({ month: label, year: yr, primici, trMat, ostaliTr, plate, marketing, kamata, otplataGlavnice, izdaci, neto, kumulativni })
  }

  // Yearly summaries
  const yearlySummary = [1, 2, 3].map(yr => {
    const yMonths = months.filter(m => m.year === yr)
    return {
      yr,
      primici: yMonths.reduce((s, m) => s + m.primici, 0),
      izdaci: yMonths.reduce((s, m) => s + m.izdaci, 0),
      neto: yMonths.reduce((s, m) => s + m.neto, 0),
      kumulativni: yMonths[yMonths.length - 1]?.kumulativni || 0,
    }
  })

  const thStyle: React.CSSProperties = { padding: '6px 8px', background: '#1a2740', color: 'white', fontSize: '10px', fontWeight: '600', textAlign: 'right', whiteSpace: 'nowrap' }
  const tdStyle: React.CSSProperties = { padding: '5px 8px', border: '1px solid #f0f0f0', fontSize: '11px', textAlign: 'right' }

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Automatski izracun: '),
      'Cash Flow prikazuje kretanje gotovine kroz 36 mjeseci. Primici i izdaci se distribuiraju ravnomjerno po mjesecima sa rastom prema faktorima iz prodajnog asortimana.'
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' } },
      ...yearlySummary.map(yr => React.createElement('div', { key: yr.yr, style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '18px', overflow: 'hidden' } },
        React.createElement('div', { style: { fontSize: '12px', fontWeight: '700', color: '#6b7a99', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' } }, 'Godina ' + yr.yr),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement('span', { style: { fontSize: '12px', color: '#6b7a99' } }, 'Ukupni primici'),
            React.createElement('span', { style: { fontSize: '12px', fontWeight: '600', color: '#2d7a4f' } }, fmt(yr.primici))
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
            React.createElement('span', { style: { fontSize: '12px', color: '#6b7a99' } }, 'Ukupni izdaci'),
            React.createElement('span', { style: { fontSize: '12px', fontWeight: '600', color: '#c0392b' } }, fmt(yr.izdaci))
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '8px' } },
            React.createElement('span', { style: { fontSize: '12px', fontWeight: '700', color: '#1a2740' } }, 'Neto CF'),
            React.createElement('span', { style: { fontSize: '14px', fontWeight: '800', color: yr.neto >= 0 ? '#2d7a4f' : '#c0392b' } }, fmt(yr.neto))
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', background: yr.kumulativni >= 0 ? '#f0faf4' : '#fef5f5', borderRadius: '6px', padding: '6px 8px' } },
            React.createElement('span', { style: { fontSize: '11px', color: '#6b7a99' } }, 'Kumulativni'),
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '800', color: yr.kumulativni >= 0 ? '#2d7a4f' : '#c0392b' } }, fmt(yr.kumulativni))
          )
        )
      ))
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
      React.createElement('div', { style: { padding: '14px 20px', background: '#f5f7fb', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', margin: 0 } }, 'Mjesecni Cash Flow — 36 mjeseci'),
        React.createElement('span', { style: { fontSize: '11px', color: '#6b7a99', background: '#EBF4FB', padding: '2px 8px', borderRadius: '4px' } }, 'Automatski izracun')
      ),
      React.createElement('div', { style: { overflowX: 'auto' } },
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '11px', minWidth: '900px' } },
          React.createElement('thead', {},
            React.createElement('tr', {},
              React.createElement('th', { style: { ...thStyle, textAlign: 'left' } }, 'Mjesec'),
              React.createElement('th', { style: { ...thStyle, background: '#2d4a2d' } }, 'Primici'),
              React.createElement('th', { style: thStyle }, 'Tr. materijala'),
              React.createElement('th', { style: thStyle }, 'Ostali tr.'),
              React.createElement('th', { style: thStyle }, 'Plate'),
              React.createElement('th', { style: thStyle }, 'Marketing'),
              React.createElement('th', { style: thStyle }, 'Kamata'),
              React.createElement('th', { style: thStyle }, 'Otpl. glav.'),
              React.createElement('th', { style: { ...thStyle, background: '#c0392b' } }, 'Uk. izdaci'),
              React.createElement('th', { style: { ...thStyle, background: '#243553' } }, 'Neto CF'),
              React.createElement('th', { style: { ...thStyle, background: '#1a3a5c' } }, 'Kumulativni')
            )
          ),
          React.createElement('tbody', {},
            ...months.map((row, i) => {
              const isYearStart = i % 12 === 0
              return React.createElement(React.Fragment, { key: i },
                isYearStart && i > 0 ? React.createElement('tr', {},
                  React.createElement('td', { colSpan: 11, style: { padding: '6px 10px', background: '#1a2740', color: '#C9A227', fontWeight: '700', fontSize: '11px', border: 'none' } },
                    'GODINA ' + row.year + ' — Ukupno: Primici ' + fmt(yearlySummary[row.year - 1].primici) + ' | Izdaci ' + fmt(yearlySummary[row.year - 1].izdaci) + ' | Neto CF ' + fmt(yearlySummary[row.year - 1].neto)
                  )
                ) : null,
                React.createElement('tr', { style: { borderBottom: '1px solid #f5f7fb', background: i % 2 === 0 ? 'white' : '#fafafa' } },
                  React.createElement('td', { style: { ...tdStyle, textAlign: 'left', fontWeight: '600', color: '#6b7a99' } }, row.month),
                  React.createElement('td', { style: { ...tdStyle, background: '#f0faf4', color: '#2d7a4f', fontWeight: '600' } }, fmt(row.primici)),
                  React.createElement('td', { style: tdStyle }, fmt(row.trMat)),
                  React.createElement('td', { style: tdStyle }, fmt(row.ostaliTr)),
                  React.createElement('td', { style: tdStyle }, fmt(row.plate)),
                  React.createElement('td', { style: tdStyle }, fmt(row.marketing)),
                  React.createElement('td', { style: { ...tdStyle, color: row.kamata > 0 ? '#c0392b' : '#6b7a99' } }, fmt(row.kamata)),
                  React.createElement('td', { style: tdStyle }, fmt(row.otplataGlavnice)),
                  React.createElement('td', { style: { ...tdStyle, background: '#fef5f5', color: '#c0392b', fontWeight: '600' } }, fmt(row.izdaci)),
                  React.createElement('td', { style: { ...tdStyle, fontWeight: '700', color: row.neto >= 0 ? '#2d7a4f' : '#c0392b', background: row.neto >= 0 ? '#f0faf4' : '#fef5f5' } }, fmt(row.neto)),
                  React.createElement('td', { style: { ...tdStyle, fontWeight: '700', color: row.kumulativni >= 0 ? '#2E75B6' : '#c0392b', background: '#EBF4FB' } }, fmt(row.kumulativni))
                )
              )
            })
          )
        )
      )
    )
  )
}
