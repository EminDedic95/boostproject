'use client'
import React from 'react'
import { StalnaData } from './StepStalnaData'

export interface FinansiranjeLine {
  naziv: string
  iznos: number
}

export interface KreditData {
  iznos: number
  gracePeriod: number
  rokOtplate: number
  kamatnaStopa: number
}

export interface FinansiranjeData {
  sources: FinansiranjeLine[]
  kredit: KreditData
}

const DEFAULT_SOURCES: FinansiranjeLine[] = [
  { naziv: 'Vlastita sredstva osnivaca', iznos: 0 },
  { naziv: 'Bankovni kredit za opremu', iznos: 0 },
  { naziv: 'Kredit za obrtna sredstva', iznos: 0 },
  { naziv: 'EU fondovi / grant', iznos: 0 },
  { naziv: 'Ostalo', iznos: 0 },
]

function fmt(n: number) {
  return n.toLocaleString('bs-BA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function calcAnnuitet(iznos: number, stopa: number, rok: number): number {
  if (!iznos || !stopa || !rok) return 0
  const r = stopa / 100 / 12
  return iznos * r / (1 - Math.pow(1 + r, -rok))
}

interface Props {
  data: FinansiranjeData
  stalnaData: StalnaData
  onChange: (data: FinansiranjeData) => void
}

export default function StepFinansiranje({ data, stalnaData, onChange }: Props) {

  function updateSource(idx: number, field: keyof FinansiranjeLine, value: string | number) {
    onChange({ ...data, sources: data.sources.map((s, i) => i === idx ? { ...s, [field]: value } : s) })
  }

  function addSource() {
    onChange({ ...data, sources: [...data.sources, { naziv: '', iznos: 0 }] })
  }

  function removeSource(idx: number) {
    onChange({ ...data, sources: data.sources.filter((_, i) => i !== idx) })
  }

  function updateKredit(field: keyof KreditData, value: number) {
    onChange({ ...data, kredit: { ...data.kredit, [field]: value } })
  }

  const totalSources = data.sources.reduce((s, l) => s + (l.iznos || 0), 0)

  // Fixed assets total from stalna sredstva
  const totalStalna = ['infrastruktura', 'zemljiste', 'oprema', 'vozila'].reduce((s, cat) => {
    const items = stalnaData[cat as keyof StalnaData] as Array<{ kolicina: number, vrijednost: number }>
    if (Array.isArray(items)) return s + items.reduce((ss, i) => ss + (i.kolicina * i.vrijednost), 0)
    return s
  }, 0)
  const totalUlaganja = totalStalna + (stalnaData.osnivacka || 0) + (stalnaData.obrtna || 0)
  const razlika = totalSources - totalUlaganja

  // Kredit calculations
  const k = data.kredit
  const annuitet = calcAnnuitet(k.iznos, k.kamatnaStopa, k.rokOtplate)
  const interkalarna = k.iznos && k.kamatnaStopa && k.gracePeriod ? k.iznos * (k.kamatnaStopa / 100 / 12) * k.gracePeriod : 0

  // Generate 36-month schedule
  const schedule: { month: string, ostatak: number, kamata: number, otplata: number, ukupno: number }[] = []
  if (k.iznos > 0 && k.rokOtplate > 0) {
    let ostatak = k.iznos
    let month = 0
    const totalMonths = k.gracePeriod + k.rokOtplate
    for (let m = 1; m <= Math.min(totalMonths, 36); m++) {
      const yr = Math.ceil(m / 12)
      const mo = ((m - 1) % 12) + 1
      const label = 'G' + yr + '-M' + mo
      const kamata = ostatak * (k.kamatnaStopa / 100 / 12)
      if (m <= k.gracePeriod) {
        schedule.push({ month: label, ostatak, kamata, otplata: 0, ukupno: kamata })
      } else {
        const otplata = Math.min(annuitet - kamata, ostatak)
        schedule.push({ month: label, ostatak, kamata, otplata, ukupno: kamata + otplata })
        ostatak = Math.max(0, ostatak - otplata)
      }
    }
  }

  const yearlySchedule = [
    { label: 'Godina 1', months: schedule.slice(0, 12) },
    { label: 'Godina 2', months: schedule.slice(12, 24) },
    { label: 'Godina 3', months: schedule.slice(24, 36) },
  ]

  const thStyle: React.CSSProperties = { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', fontWeight: '600' }
  const tdStyle: React.CSSProperties = { padding: '6px 10px', border: '1px solid #e2e8f0', fontSize: '12px' }

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Uputa: '),
      'Unesite izvore finansiranja. Zbir izvora mora biti jednak ukupnim ulaganjima iz prethodnog koraka. Ako koristite kredit, popunite i kreditni kalkulator.'
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' } },
      React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, 'Ukupna ulaganja (iz prethodnog koraka)'),
        React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', color: '#1a2740' } }, fmt(totalUlaganja))
      ),
      React.createElement('div', { style: { background: razlika === 0 ? '#f0faf4' : '#fef5f5', borderRadius: '10px', padding: '16px', border: '1px solid ' + (razlika === 0 ? '#2d7a4f40' : '#c0392b40') } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, 'Razlika (mora biti 0)'),
        React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', color: razlika === 0 ? '#2d7a4f' : '#c0392b' } }, (razlika > 0 ? '+' : '') + fmt(razlika)),
        razlika !== 0 && React.createElement('div', { style: { fontSize: '11px', color: '#c0392b', marginTop: '4px' } }, razlika > 0 ? 'Vise izvora nego ulaganja' : 'Nedostaje finansiranja')
      )
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '16px' } },
      React.createElement('div', { style: { padding: '14px 20px', background: '#f5f7fb', borderBottom: '1px solid #e2e8f0' } },
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', margin: 0 } }, 'Struktura finansiranja')
      ),
      React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' } },
        React.createElement('thead', {},
          React.createElement('tr', {},
            React.createElement('th', { style: thStyle }, 'Izvor finansiranja'),
            React.createElement('th', { style: { ...thStyle, width: '160px' } }, 'Iznos'),
            React.createElement('th', { style: { ...thStyle, width: '100px', background: '#243553' } }, 'Udio (%)'),
            React.createElement('th', { style: { ...thStyle, width: '40px', background: '#2d3748' } }, '')
          )
        ),
        React.createElement('tbody', {},
          ...data.sources.map((source, idx) =>
            React.createElement('tr', { key: idx, style: { borderBottom: '1px solid #e2e8f0' } },
              React.createElement('td', { style: tdStyle },
                React.createElement('input', { type: 'text', value: source.naziv, onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateSource(idx, 'naziv', e.target.value), style: { width: '100%', border: 'none', outline: 'none', fontSize: '13px', background: 'transparent', boxSizing: 'border-box' } })
              ),
              React.createElement('td', { style: tdStyle },
                React.createElement('input', { type: 'number', min: '0', step: '0.01', value: source.iznos || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateSource(idx, 'iznos', parseFloat(e.target.value) || 0), placeholder: '0.00', style: { width: '100%', border: 'none', outline: 'none', fontSize: '13px', textAlign: 'right', background: 'transparent', boxSizing: 'border-box' } })
              ),
              React.createElement('td', { style: { ...tdStyle, background: '#EBF4FB', textAlign: 'center', fontWeight: '600' } },
                totalSources > 0 ? ((source.iznos / totalSources) * 100).toFixed(1) + '%' : '0%'
              ),
              React.createElement('td', { style: { ...tdStyle, textAlign: 'center' } },
                data.sources.length > 1
                  ? React.createElement('button', { onClick: () => removeSource(idx), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '16px' } }, 'x')
                  : null
              )
            )
          ),
          React.createElement('tr', { style: { background: '#1a2740' } },
            React.createElement('td', { style: { ...tdStyle, color: 'white', fontWeight: '700', border: 'none' } }, 'UKUPNO'),
            React.createElement('td', { style: { ...tdStyle, color: 'white', fontWeight: '700', textAlign: 'right', border: 'none' } }, fmt(totalSources)),
            React.createElement('td', { style: { ...tdStyle, color: '#C9A227', fontWeight: '700', textAlign: 'center', border: 'none' } }, '100%'),
            React.createElement('td', { style: { border: 'none', background: '#2d3748' } }, '')
          )
        )
      ),
      React.createElement('div', { style: { padding: '12px 20px' } },
        React.createElement('button', { onClick: addSource, style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '6px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' } }, '+ Dodaj izvor')
      )
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '16px' } },
      React.createElement('div', { style: { padding: '14px 20px', background: '#f5f7fb', borderBottom: '1px solid #e2e8f0' } },
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', margin: 0 } }, 'Kreditni kalkulator'),
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '12px', margin: '4px 0 0' } }, 'Popuniti samo ako koristite kredit')
      ),
      React.createElement('div', { style: { padding: '20px' } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' } },
          ...[
            { label: 'Iznos kredita', field: 'iznos' as keyof KreditData, placeholder: '0.00', hint: '' },
            { label: 'Grace period (mjes.)', field: 'gracePeriod' as keyof KreditData, placeholder: '0', hint: 'Broj mjeseci bez otplate glavnice' },
            { label: 'Rok otplate (mjes.)', field: 'rokOtplate' as keyof KreditData, placeholder: '36', hint: 'Bez grace perioda' },
            { label: 'Kamatna stopa (%/god.)', field: 'kamatnaStopa' as keyof KreditData, placeholder: '5.00', hint: '' },
          ].map(field => React.createElement('div', { key: field.field, style: { background: '#f5f7fb', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0' } },
            React.createElement('label', { style: { display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7a99', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' } }, field.label),
            React.createElement('input', { type: 'number', min: '0', step: '0.01', value: data.kredit[field.field] || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateKredit(field.field, parseFloat(e.target.value) || 0), placeholder: field.placeholder, style: { width: '100%', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 10px', fontSize: '16px', fontWeight: '700', color: '#1a2740', outline: 'none', background: 'white', textAlign: 'right', boxSizing: 'border-box' } }),
            field.hint && React.createElement('div', { style: { fontSize: '10px', color: '#6b7a99', marginTop: '4px' } }, field.hint)
          ))
        ),

        k.iznos > 0 && React.createElement('div', {},
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' } },
            ...[
              { label: 'Mjesecni anuitet', value: fmt(annuitet), color: '#1a2740' },
              { label: 'Interkalarna kamata', value: fmt(interkalarna), color: '#c0392b' },
              { label: 'Ukupna obaveza', value: fmt(annuitet * k.rokOtplate + interkalarna), color: '#2E75B6' },
            ].map((stat, i) => React.createElement('div', { key: i, style: { background: '#EBF4FB', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f040' } },
              React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, stat.label),
              React.createElement('div', { style: { fontSize: '18px', fontWeight: '800', color: stat.color } }, stat.value)
            ))
          ),

          React.createElement('h4', { style: { color: '#1a2740', fontSize: '13px', fontWeight: '700', marginBottom: '12px' } }, 'Plan otplate — po godinama'),
          React.createElement('div', { style: { overflowX: 'auto' } },
            React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '11px' } },
              React.createElement('thead', {},
                React.createElement('tr', {},
                  React.createElement('th', { style: { ...thStyle, fontSize: '10px' } }, 'Mjesec'),
                  React.createElement('th', { style: { ...thStyle, fontSize: '10px', textAlign: 'right' } }, 'Ostatak duga'),
                  React.createElement('th', { style: { ...thStyle, fontSize: '10px', textAlign: 'right' } }, 'Kamata'),
                  React.createElement('th', { style: { ...thStyle, fontSize: '10px', textAlign: 'right' } }, 'Otplata glavnice'),
                  React.createElement('th', { style: { ...thStyle, fontSize: '10px', textAlign: 'right', background: '#243553' } }, 'Ukupna obaveza')
                )
              ),
              React.createElement('tbody', {},
                ...yearlySchedule.map((yr, yi) =>
                  yr.months.length > 0
                    ? React.createElement(React.Fragment, { key: yi },
                        React.createElement('tr', {},
                          React.createElement('td', { colSpan: 5, style: { padding: '6px 10px', background: '#f5f7fb', fontWeight: '700', fontSize: '11px', color: '#1a2740', border: '1px solid #e2e8f0' } }, yr.label)
                        ),
                        ...yr.months.map((row, mi) =>
                          React.createElement('tr', { key: mi, style: { borderBottom: '1px solid #f5f7fb', background: mi % 2 === 0 ? 'white' : '#fafafa' } },
                            React.createElement('td', { style: { ...tdStyle, fontSize: '10px', color: '#6b7a99' } }, row.month),
                            React.createElement('td', { style: { ...tdStyle, textAlign: 'right' } }, fmt(row.ostatak)),
                            React.createElement('td', { style: { ...tdStyle, textAlign: 'right', color: '#c0392b' } }, fmt(row.kamata)),
                            React.createElement('td', { style: { ...tdStyle, textAlign: 'right', color: '#2d7a4f' } }, fmt(row.otplata)),
                            React.createElement('td', { style: { ...tdStyle, textAlign: 'right', fontWeight: '600', background: '#EBF4FB' } }, fmt(row.ukupno))
                          )
                        ),
                        React.createElement('tr', { style: { background: '#1a2740' } },
                          React.createElement('td', { style: { padding: '6px 10px', color: 'white', fontWeight: '700', fontSize: '10px', border: 'none' } }, 'Ukupno ' + yr.label),
                          React.createElement('td', { style: { padding: '6px 10px', border: 'none' } }, ''),
                          React.createElement('td', { style: { padding: '6px 10px', textAlign: 'right', color: '#ff9999', fontWeight: '700', fontSize: '10px', border: 'none' } }, fmt(yr.months.reduce((s, r) => s + r.kamata, 0))),
                          React.createElement('td', { style: { padding: '6px 10px', textAlign: 'right', color: '#90EE90', fontWeight: '700', fontSize: '10px', border: 'none' } }, fmt(yr.months.reduce((s, r) => s + r.otplata, 0))),
                          React.createElement('td', { style: { padding: '6px 10px', textAlign: 'right', color: '#C9A227', fontWeight: '700', fontSize: '10px', border: 'none' } }, fmt(yr.months.reduce((s, r) => s + r.ukupno, 0)))
                        )
                      )
                    : null
                )
              )
            )
          )
        )
      )
    )
  )
}
