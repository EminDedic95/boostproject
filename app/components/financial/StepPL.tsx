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

export interface PLRow {
  label: string
  g1: number
  g2: number
  g3: number
  bold?: boolean
  highlight?: boolean
  colorFn?: (v: number) => string
}

interface Props {
  salesData: SalesData
  stalnaData: StalnaData
  finansiranjeData: FinansiranjeData
  promocijaData: PromocijaData
  troskoviData: TroskoviData
}

export default function StepPL({ salesData, stalnaData, finansiranjeData, promocijaData, troskoviData }: Props) {
  const g2 = salesData.growthG2
  const g3 = salesData.growthG3

  const prihodG1 = salesData.products.reduce((s, p) => s + p.obim * p.cijena, 0)
  const prihodG2 = prihodG1 * g2
  const prihodG3 = prihodG1 * g3

  const trMatG1 = salesData.products.reduce((s, p) => s + p.obim * p.trMat, 0)
  const trMatG2 = trMatG1 * g2
  const trMatG3 = trMatG1 * g3

  const brutoG1 = prihodG1 - trMatG1
  const brutoG2 = prihodG2 - trMatG2
  const brutoG3 = prihodG3 - trMatG3

  const ostalTrG1 = troskoviData.ostaliTroskovi.reduce((s, t) => s + t.mjesecniIznos * 12, 0)
  const ostalTrG2 = ostalTrG1 * g2
  const ostalTrG3 = ostalTrG1 * g3

  const amort = calcAmort(stalnaData)

  const plateG1 = troskoviData.zaposleni.reduce((s, z) => s + z.brutoPlataMjes * 12, 0)
  const plateG2 = plateG1 * g2
  const plateG3 = plateG1 * g3

  const marketingG1 = promocijaData.items.reduce((s, i) => s + i.mjesecniIznos * 12, 0)
  const marketingG2 = marketingG1 * g2
  const marketingG3 = marketingG1 * g3

  // Kredit interest from finansiranje
  const k = finansiranjeData.kredit
  function calcKamataYear(year: number): number {
    if (!k.iznos || !k.kamatnaStopa || !k.rokOtplate) return 0
    const r = k.kamatnaStopa / 100 / 12
    const annuitet = k.iznos * r / (1 - Math.pow(1 + r, -k.rokOtplate))
    let ostatak = k.iznos
    let kamata = 0
    const startMonth = (year - 1) * 12 + 1
    const endMonth = year * 12
    for (let m = 1; m <= k.gracePeriod + k.rokOtplate && m <= endMonth; m++) {
      const mk = ostatak * r
      if (m >= startMonth) kamata += mk
      if (m > k.gracePeriod) {
        const otplata = Math.min(annuitet - mk, ostatak)
        ostatak = Math.max(0, ostatak - otplata)
      }
    }
    return kamata
  }

  const kamataG1 = calcKamataYear(1)
  const kamataG2 = calcKamataYear(2)
  const kamataG3 = calcKamataYear(3)

  const ebitG1 = brutoG1 - ostalTrG1 - amort - plateG1 - marketingG1
  const ebitG2 = brutoG2 - ostalTrG2 - amort - plateG2 - marketingG2
  const ebitG3 = brutoG3 - ostalTrG3 - amort - plateG3 - marketingG3

  const ebtG1 = ebitG1 - kamataG1
  const ebtG2 = ebitG2 - kamataG2
  const ebtG3 = ebitG3 - kamataG3

  const porezG1 = Math.max(0, ebtG1 * 0.10)
  const porezG2 = Math.max(0, ebtG2 * 0.10)
  const porezG3 = Math.max(0, ebtG3 * 0.10)

  const netoProfitG1 = ebtG1 - porezG1
  const netoProfitG2 = ebtG2 - porezG2
  const netoProfitG3 = ebtG3 - porezG3

  const marzaG1 = prihodG1 > 0 ? (netoProfitG1 / prihodG1) * 100 : 0
  const marzaG2 = prihodG2 > 0 ? (netoProfitG2 / prihodG2) * 100 : 0
  const marzaG3 = prihodG3 > 0 ? (netoProfitG3 / prihodG3) * 100 : 0

  const ukupnoTrG1 = trMatG1 + ostalTrG1 + amort + plateG1 + marketingG1 + kamataG1
  const ukupnoTrG2 = trMatG2 + ostalTrG2 + amort + plateG2 + marketingG2 + kamataG2
  const ukupnoTrG3 = trMatG3 + ostalTrG3 + amort + plateG3 + marketingG3 + kamataG3

  const rows: PLRow[] = [
    { label: 'A.  UKUPAN PRIHOD OD PRODAJE', g1: prihodG1, g2: prihodG2, g3: prihodG3, bold: true, highlight: true },
    { label: '1.  Troskovi materijala / robe', g1: trMatG1, g2: trMatG2, g3: trMatG3 },
    { label: '2.  Ostali troskovi poslovanja', g1: ostalTrG1, g2: ostalTrG2, g3: ostalTrG3 },
    { label: '3.  Amortizacija', g1: amort, g2: amort, g3: amort },
    { label: '4.  Troskovi plata i beneficija', g1: plateG1, g2: plateG2, g3: plateG3 },
    { label: '5.  Troskovi marketinga i promocije', g1: marketingG1, g2: marketingG2, g3: marketingG3 },
    { label: '6.  Kamate na kredite', g1: kamataG1, g2: kamataG2, g3: kamataG3 },
    { label: 'B.  UKUPNI TROSKOVI', g1: ukupnoTrG1, g2: ukupnoTrG2, g3: ukupnoTrG3, bold: true, highlight: true },
    { label: 'C.  BRUTO DOBIT  (Prihod - Tr. materijala)', g1: brutoG1, g2: brutoG2, g3: brutoG3, bold: true, colorFn: v => v >= 0 ? '#2d7a4f' : '#c0392b' },
    { label: 'D.  EBIT  (Zarada prije kamata i poreza)', g1: ebitG1, g2: ebitG2, g3: ebitG3, bold: true, colorFn: v => v >= 0 ? '#2d7a4f' : '#c0392b' },
    { label: '    Poslovni rezultat prije poreza (EBT)', g1: ebtG1, g2: ebtG2, g3: ebtG3 },
    { label: '    Porez na dobit (10%)', g1: porezG1, g2: porezG2, g3: porezG3 },
    { label: 'E.  NETO PROFIT / (GUBITAK)', g1: netoProfitG1, g2: netoProfitG2, g3: netoProfitG3, bold: true, highlight: true, colorFn: v => v >= 0 ? '#2d7a4f' : '#c0392b' },
    { label: '    Neto marza (%)', g1: marzaG1, g2: marzaG2, g3: marzaG3, colorFn: v => v >= 0 ? '#2d7a4f' : '#c0392b' },
  ]

  const profitColor = (v: number) => v >= 0 ? '#2d7a4f' : '#c0392b'
  const profitBg = (v: number) => v >= 0 ? '#f0faf4' : '#fef5f5'

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Automatski izracun: '),
      'P&L se automatski generise iz svih prethodno unesenih podataka. Provjerite da li su svi prethodni koraci (17-22) ispravno popunjeni.'
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' } },
      ...[
        { label: 'Neto profit G1', value: fmt(netoProfitG1), color: profitColor(netoProfitG1), bg: profitBg(netoProfitG1) },
        { label: 'Neto profit G2', value: fmt(netoProfitG2), color: profitColor(netoProfitG2), bg: profitBg(netoProfitG2) },
        { label: 'Neto profit G3', value: fmt(netoProfitG3), color: profitColor(netoProfitG3), bg: profitBg(netoProfitG3) },
        { label: 'Neto marza G1', value: marzaG1.toFixed(1) + '%', color: profitColor(marzaG1), bg: profitBg(marzaG1) },
        { label: 'Neto marza G2', value: marzaG2.toFixed(1) + '%', color: profitColor(marzaG2), bg: profitBg(marzaG2) },
        { label: 'Neto marza G3', value: marzaG3.toFixed(1) + '%', color: profitColor(marzaG3), bg: profitBg(marzaG3) },
      ].map((stat, i) => React.createElement('div', { key: i, style: { background: stat.bg, borderRadius: '10px', padding: '14px 16px', border: '1px solid #e2e8f0' } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, stat.label),
        React.createElement('div', { style: { fontSize: '20px', fontWeight: '800', color: stat.color } }, stat.value)
      ))
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
      React.createElement('div', { style: { padding: '14px 20px', background: '#f5f7fb', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', margin: 0 } }, 'Racun dobiti i gubitka — 3 finansijske godine'),
        React.createElement('span', { style: { fontSize: '11px', color: '#6b7a99', background: '#EBF4FB', padding: '2px 8px', borderRadius: '4px' } }, 'Automatski izracun')
      ),
      React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
        React.createElement('thead', {},
          React.createElement('tr', {},
            React.createElement('th', { style: { padding: '10px 16px', background: '#1a2740', color: 'white', textAlign: 'left', width: '50%' } }, 'STAVKA'),
            React.createElement('th', { style: { padding: '10px 16px', background: '#1F4E79', color: 'white', textAlign: 'right' } }, 'Godina 1'),
            React.createElement('th', { style: { padding: '10px 16px', background: '#243553', color: 'white', textAlign: 'right' } }, 'Godina 2'),
            React.createElement('th', { style: { padding: '10px 16px', background: '#1a3a5c', color: 'white', textAlign: 'right' } }, 'Godina 3'),
            React.createElement('th', { style: { padding: '10px 16px', background: '#2d3748', color: 'rgba(255,255,255,0.5)', textAlign: 'right', fontSize: '10px' } }, 'Prosjek')
          )
        ),
        React.createElement('tbody', {},
          ...rows.map((row, i) => {
            const avg = (row.g1 + row.g2 + row.g3) / 3
            const isMarza = row.label.includes('marza')
            const fmtVal = (v: number) => isMarza ? v.toFixed(1) + '%' : fmt(v)
            const bg = row.highlight ? '#EBF4FB' : i % 2 === 0 ? 'white' : '#fafafa'
            const color = row.colorFn ? row.colorFn(row.g1) : '#1a2740'
            return React.createElement('tr', { key: i, style: { borderBottom: '1px solid #e2e8f0', background: bg } },
              React.createElement('td', { style: { padding: '8px 16px', fontWeight: row.bold ? '700' : '400', color: '#1a2740', fontSize: '12px' } }, row.label),
              React.createElement('td', { style: { padding: '8px 16px', textAlign: 'right', fontWeight: row.bold ? '700' : '400', color: row.colorFn ? row.colorFn(row.g1) : '#1a2740' } }, fmtVal(row.g1)),
              React.createElement('td', { style: { padding: '8px 16px', textAlign: 'right', fontWeight: row.bold ? '700' : '400', color: row.colorFn ? row.colorFn(row.g2) : '#1a2740' } }, fmtVal(row.g2)),
              React.createElement('td', { style: { padding: '8px 16px', textAlign: 'right', fontWeight: row.bold ? '700' : '400', color: row.colorFn ? row.colorFn(row.g3) : '#1a2740' } }, fmtVal(row.g3)),
              React.createElement('td', { style: { padding: '8px 16px', textAlign: 'right', color: '#6b7a99', fontSize: '11px' } }, fmtVal(avg))
            )
          })
        )
      )
    )
  )
}
