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

interface Props {
  salesData: SalesData
  stalnaData: StalnaData
  finansiranjeData: FinansiranjeData
  promocijaData: PromocijaData
  troskoviData: TroskoviData
}

export default function StepBreakEven({ salesData, stalnaData, finansiranjeData, promocijaData, troskoviData }: Props) {
  const g2 = salesData.growthG2

  const prihodG1 = salesData.products.reduce((s, p) => s + p.obim * p.cijena, 0)
  const trMatG1 = salesData.products.reduce((s, p) => s + p.obim * p.trMat, 0)

  const amort = calcAmort(stalnaData)
  const plateG1 = troskoviData.zaposleni.reduce((s, z) => s + z.brutoPlataMjes * 12, 0)
  const ostalTrG1 = troskoviData.ostaliTroskovi.reduce((s, t) => s + t.mjesecniIznos * 12, 0)
  const marketingG1 = promocijaData.items.reduce((s, i) => s + i.mjesecniIznos * 12, 0)

  const k = finansiranjeData.kredit
  let kamataG1 = 0
  if (k.iznos && k.kamatnaStopa && k.rokOtplate) {
    const r = k.kamatnaStopa / 100 / 12
    const annuitet = k.iznos * r / (1 - Math.pow(1 + r, -k.rokOtplate))
    let ostatak = k.iznos
    for (let m = 1; m <= Math.min(12, k.gracePeriod + k.rokOtplate); m++) {
      const mk = ostatak * r
      kamataG1 += mk
      if (m > k.gracePeriod) ostatak = Math.max(0, ostatak - (annuitet - mk))
    }
  }

  // Fixed vs Variable costs
  const fixedCosts = plateG1 + amort + ostalTrG1 + marketingG1 + kamataG1
  const variableCosts = trMatG1
  const variableCostRate = prihodG1 > 0 ? variableCosts / prihodG1 : 0
  const contributionMarginRate = 1 - variableCostRate

  // Break-even in KM
  const breakEvenKM = contributionMarginRate > 0 ? fixedCosts / contributionMarginRate : 0

  // Break-even in units (weighted average)
  const totalUnits = salesData.products.reduce((s, p) => s + p.obim, 0)
  const avgPrice = totalUnits > 0 ? prihodG1 / totalUnits : 0
  const avgVarCost = totalUnits > 0 ? variableCosts / totalUnits : 0
  const breakEvenUnits = avgPrice > avgVarCost ? fixedCosts / (avgPrice - avgVarCost) : 0

  // Safety margin
  const safetyMargin = prihodG1 > 0 ? ((prihodG1 - breakEvenKM) / prihodG1) * 100 : 0

  // Per-product cost analysis
  const productAnalysis = salesData.products.map(p => {
    const revenueShare = prihodG1 > 0 ? (p.obim * p.cijena) / prihodG1 : 0
    const allocFixedCost = fixedCosts * revenueShare
    const totalVarCost = p.obim * p.trMat
    const ckI = totalVarCost // Material only
    const ckIPerUnit = p.obim > 0 ? ckI / p.obim : 0
    const ckII = ckI + allocFixedCost // Full cost
    const ckIIPerUnit = p.obim > 0 ? ckII / p.obim : 0
    const marza = p.cijena > 0 ? ((p.cijena - ckIIPerUnit) / p.cijena) * 100 : 0
    return { ...p, ckIPerUnit, ckIIPerUnit, marza, revenueShare }
  })

  const thStyle: React.CSSProperties = { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', fontWeight: '600' }
  const tdStyle: React.CSSProperties = { padding: '8px 12px', border: '1px solid #e2e8f0', fontSize: '12px' }

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Automatski izracun: '),
      'Break-even i cijena kostanja se automatski racunaju na osnovu svih unesenih podataka.'
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' } },
      ...[
        { label: 'Break-even prihod (KM)', value: fmt(breakEvenKM), color: '#1a2740', bg: '#EBF4FB', sub: 'Minimalni prihod za pokrice svih troskova' },
        { label: 'Break-even kolicina (jed.)', value: Math.ceil(breakEvenUnits).toLocaleString(), color: '#2E75B6', bg: '#f0f7ff', sub: 'Prosjecni broj jedinica za break-even' },
        { label: 'Margina sigurnosti', value: safetyMargin.toFixed(1) + '%', color: safetyMargin >= 20 ? '#2d7a4f' : safetyMargin >= 0 ? '#C9A227' : '#c0392b', bg: safetyMargin >= 20 ? '#f0faf4' : safetyMargin >= 0 ? '#fffbf0' : '#fef5f5', sub: 'Koliko prihod moze pasti do break-evena' },
      ].map((stat, i) => React.createElement('div', { key: i, style: { background: stat.bg, borderRadius: '12px', padding: '18px', border: '1px solid #e2e8f0' } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, stat.label),
        React.createElement('div', { style: { fontSize: '24px', fontWeight: '800', color: stat.color, marginBottom: '4px' } }, stat.value),
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99' } }, stat.sub)
      ))
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '16px' } },
      React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', marginBottom: '16px' } }, 'Struktura troskova — Fiksni vs Varijabilni'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' } },
        ...[
          { label: 'Fiksni troskovi G1', items: [
            { name: 'Plate i beneficije', value: plateG1 },
            { name: 'Amortizacija', value: amort },
            { name: 'Ostali operativni', value: ostalTrG1 },
            { name: 'Marketing i promocija', value: marketingG1 },
            { name: 'Kamate na kredite', value: kamataG1 },
          ], total: fixedCosts, color: '#c0392b', bg: '#fef5f5' },
          { label: 'Varijabilni troskovi G1', items: [
            { name: 'Troskovi materijala / robe', value: variableCosts },
          ], total: variableCosts, color: '#2E75B6', bg: '#f0f7ff' },
        ].map((section, si) => React.createElement('div', { key: si, style: { background: section.bg, borderRadius: '10px', padding: '16px', border: '1px solid ' + section.color + '30' } },
          React.createElement('h4', { style: { color: section.color, fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' } }, section.label),
          ...section.items.filter(i => i.value > 0).map((item, ii) => React.createElement('div', { key: ii, style: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid ' + section.color + '15' } },
            React.createElement('span', { style: { fontSize: '12px', color: '#444' } }, item.name),
            React.createElement('span', { style: { fontSize: '12px', fontWeight: '600', color: '#1a2740' } }, fmt(item.value))
          )),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', paddingTop: '8px', marginTop: '4px' } },
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '700', color: section.color } }, 'UKUPNO'),
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '800', color: section.color } }, fmt(section.total))
          )
        ))
      ),
      React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, 'Stopa doprinosa pokrica (Contribution Margin Rate)'),
        React.createElement('span', { style: { fontSize: '18px', fontWeight: '800', color: '#1a2740' } }, (contributionMarginRate * 100).toFixed(1) + '%')
      )
    ),

    salesData.products.length > 0 && React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
      React.createElement('div', { style: { padding: '14px 20px', background: '#f5f7fb', borderBottom: '1px solid #e2e8f0' } },
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', margin: 0 } }, 'Cijena kostanja po proizvodu / usluzi')
      ),
      React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
        React.createElement('thead', {},
          React.createElement('tr', {},
            React.createElement('th', { style: thStyle }, 'Proizvod / Usluga'),
            React.createElement('th', { style: { ...thStyle, textAlign: 'right' } }, 'Prod. cijena'),
            React.createElement('th', { style: { ...thStyle, textAlign: 'right' } }, 'CK I / jed. (mat.)'),
            React.createElement('th', { style: { ...thStyle, textAlign: 'right' } }, 'CK II / jed. (puna)'),
            React.createElement('th', { style: { ...thStyle, textAlign: 'right', background: '#243553' } }, 'Marza (%)'),
            React.createElement('th', { style: { ...thStyle, textAlign: 'right', background: '#2d4a2d' } }, 'Udio u prihodu')
          )
        ),
        React.createElement('tbody', {},
          ...productAnalysis.map((p, i) => React.createElement('tr', { key: i, style: { borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#fafafa' } },
            React.createElement('td', { style: { ...tdStyle, fontWeight: '600' } }, p.naziv || 'Proizvod ' + (i + 1)),
            React.createElement('td', { style: { ...tdStyle, textAlign: 'right' } }, fmt(p.cijena)),
            React.createElement('td', { style: { ...tdStyle, textAlign: 'right' } }, fmt(p.ckIPerUnit)),
            React.createElement('td', { style: { ...tdStyle, textAlign: 'right', fontWeight: '600' } }, fmt(p.ckIIPerUnit)),
            React.createElement('td', { style: { ...tdStyle, textAlign: 'right', background: '#EBF4FB', fontWeight: '700', color: p.marza >= 0 ? '#2d7a4f' : '#c0392b' } }, p.marza.toFixed(1) + '%'),
            React.createElement('td', { style: { ...tdStyle, textAlign: 'right', background: '#f0faf4', color: '#2d7a4f' } }, (p.revenueShare * 100).toFixed(1) + '%')
          ))
        )
      )
    )
  )
}
