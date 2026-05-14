'use client'
import React from 'react'

export interface AssetItem {
  naziv: string
  jm: string
  kolicina: number
  vrijednost: number
  amortPeriod: number
}

export interface StalnaData {
  infrastruktura: AssetItem[]
  zemljiste: AssetItem[]
  oprema: AssetItem[]
  nematerijalna: AssetItem[]
  vozila: AssetItem[]
  osnivacka: number
  obrtna: number
}

const DEFAULT_ITEM = (defaultAmort: number): AssetItem => ({ naziv: '', jm: 'kom', kolicina: 1, vrijednost: 0, amortPeriod: defaultAmort })

const JM_OPTIONS = ['kom', 'm2', 'm', 'set', 'paket', 'licenca', 'godina']

const CATEGORIES = [
  {
    key: 'infrastruktura' as keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'nematerijalna' | 'vozila'>,
    label: '1. Infrastruktura i građevinski objekti',
    color: '#2E75B6',
    bg: '#f0f7ff',
    defaultAmort: 40,
    hint: 'Građevinski objekti, adaptacija prostora, instalacije...',
    showAmort: true,
  },
  {
    key: 'zemljiste' as keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'nematerijalna' | 'vozila'>,
    label: '2. Zemljište',
    color: '#8e44ad',
    bg: '#faf0ff',
    defaultAmort: 0,
    hint: 'Kupovina ili procjena vrijednosti zemljišta — ne amortizuje se.',
    showAmort: false,
  },
  {
    key: 'oprema' as keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'nematerijalna' | 'vozila'>,
    label: '3. Oprema i mašine',
    color: '#C9A227',
    bg: '#fffbf0',
    defaultAmort: 10,
    hint: 'Mašine, uređaji, računari, alati — period amortizacije se može mijenjati po stavci.',
    showAmort: true,
  },
  {
    key: 'nematerijalna' as keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'nematerijalna' | 'vozila'>,
    label: '4. Nematerijalna ulaganja',
    color: '#2d7a4f',
    bg: '#f0faf4',
    defaultAmort: 5,
    hint: 'Softveri, višegodišnje licence, sertifikati, koncesije, patenti i slično.',
    showAmort: true,
  },
  {
    key: 'vozila' as keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'nematerijalna' | 'vozila'>,
    label: '5. Vozila',
    color: '#c0392b',
    bg: '#fef5f5',
    defaultAmort: 5,
    hint: 'Teretna i putnička vozila, specijalna vozila.',
    showAmort: true,
  },
]

function fmt(n: number) {
  return n.toLocaleString('bs-BA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function categoryTotal(items: AssetItem[]) {
  return items.reduce((s, i) => s + (i.kolicina * i.vrijednost), 0)
}

export function calcAmortizacijaGodisnja(stalnaData: StalnaData): number {
  let total = 0
  for (const cat of CATEGORIES) {
    if (!cat.showAmort) continue
    const items = stalnaData[cat.key] as AssetItem[]
    if (Array.isArray(items)) {
      total += items.reduce((s, i) => {
        const period = i.amortPeriod || cat.defaultAmort
        return period > 0 ? s + (i.kolicina * i.vrijednost) / period : s
      }, 0)
    }
  }
  return total
}

interface Props {
  data: StalnaData
  onChange: (data: StalnaData) => void
}

export default function StepStalnaData({ data, onChange }: Props) {

  function addItem(cat: keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'nematerijalna' | 'vozila'>, defaultAmort: number) {
    onChange({ ...data, [cat]: [...(data[cat] as AssetItem[]), DEFAULT_ITEM(defaultAmort)] })
  }

  function removeItem(cat: keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'nematerijalna' | 'vozila'>, idx: number) {
    onChange({ ...data, [cat]: (data[cat] as AssetItem[]).filter((_: AssetItem, i: number) => i !== idx) })
  }

  function updateItem(cat: keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'nematerijalna' | 'vozila'>, idx: number, field: keyof AssetItem, value: string | number) {
    onChange({ ...data, [cat]: (data[cat] as AssetItem[]).map((item: AssetItem, i: number) => i === idx ? { ...item, [field]: value } : item) })
  }

  const totalStalna = CATEGORIES.reduce((s, c) => s + categoryTotal(data[c.key] as AssetItem[]), 0)
  const totalAmort = calcAmortizacijaGodisnja(data)
  const totalUlaganja = totalStalna + (data.osnivacka || 0) + (data.obrtna || 0)

  const thStyle: React.CSSProperties = { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', fontWeight: '600' }
  const tdStyle: React.CSSProperties = { padding: '4px', border: '1px solid #e2e8f0' }
  const inputStyle: React.CSSProperties = { width: '100%', border: 'none', outline: 'none', fontSize: '12px', padding: '4px 6px', background: 'transparent', boxSizing: 'border-box' }
  const numStyle: React.CSSProperties = { ...inputStyle, textAlign: 'right' }

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Uputa: '),
      'Unesite sva planirana stalna sredstva po kategorijama. Nabavne vrijednosti bez PDV-a. Period amortizacije je predefinisan ali može se mijenjati po stavci. Godišnja amortizacija se automatski prenosi u troškove.'
    ),

    ...CATEGORIES.map(cat =>
      React.createElement('div', { key: cat.key, style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '16px' } },
        React.createElement('div', { style: { padding: '14px 20px', background: cat.bg, borderBottom: '1px solid ' + cat.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', {},
            React.createElement('h3', { style: { color: cat.color, fontSize: '14px', fontWeight: '700', margin: '0 0 2px' } }, cat.label),
            React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99' } }, cat.hint)
          ),
          React.createElement('div', { style: { textAlign: 'right' } },
            React.createElement('div', { style: { fontSize: '16px', fontWeight: '800', color: cat.color } }, fmt(categoryTotal(data[cat.key] as AssetItem[]))),
            cat.showAmort && React.createElement('div', { style: { fontSize: '10px', color: '#6b7a99' } }, 'Amortizacija/god: ' + fmt(calcAmortizacijaGodisnja({ ...data, infrastruktura: cat.key === 'infrastruktura' ? data[cat.key] as AssetItem[] : [], zemljiste: [], oprema: cat.key === 'oprema' ? data[cat.key] as AssetItem[] : [], nematerijalna: cat.key === 'nematerijalna' ? data[cat.key] as AssetItem[] : [], vozila: cat.key === 'vozila' ? data[cat.key] as AssetItem[] : [], osnivacka: 0, obrtna: 0 })))
          )
        ),
        React.createElement('div', { style: { overflowX: 'auto' } },
          React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
            React.createElement('thead', {},
              React.createElement('tr', {},
                React.createElement('th', { style: { ...thStyle, width: '30px' } }, 'R.b.'),
                React.createElement('th', { style: thStyle }, 'Naziv stavke / sredstva'),
                React.createElement('th', { style: { ...thStyle, width: '80px' } }, 'JM'),
                React.createElement('th', { style: { ...thStyle, width: '90px' } }, 'Količina'),
                React.createElement('th', { style: { ...thStyle, width: '140px' } }, 'Nabavna vrijednost'),
                cat.showAmort && React.createElement('th', { style: { ...thStyle, width: '110px', background: '#243553' } }, 'God. amort.'),
                React.createElement('th', { style: { ...thStyle, width: '130px', background: '#1F4E79' } }, 'Ukupno'),
                React.createElement('th', { style: { ...thStyle, width: '30px', background: '#2d3748' } }, '')
              )
            ),
            React.createElement('tbody', {},
              (data[cat.key] as AssetItem[]).length === 0
                ? React.createElement('tr', {},
                    React.createElement('td', { colSpan: cat.showAmort ? 8 : 7, style: { padding: '20px', textAlign: 'center', color: '#6b7a99', fontSize: '12px' } }, 'Nema stavki. Kliknite "+ Dodaj" ispod.')
                  )
                : null,
              ...(data[cat.key] as AssetItem[]).map((item: AssetItem, idx: number) =>
                React.createElement('tr', { key: idx, style: { borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? 'white' : '#fafafa' } },
                  React.createElement('td', { style: { ...tdStyle, textAlign: 'center', color: '#6b7a99', fontWeight: '600' } }, idx + 1),
                  React.createElement('td', { style: tdStyle },
                    React.createElement('input', { type: 'text', value: item.naziv, onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateItem(cat.key, idx, 'naziv', e.target.value), placeholder: 'Naziv sredstva...', style: inputStyle })
                  ),
                  React.createElement('td', { style: tdStyle },
                    React.createElement('select', { value: item.jm, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => updateItem(cat.key, idx, 'jm', e.target.value), style: { ...inputStyle, cursor: 'pointer' } },
                      ...JM_OPTIONS.map(jm => React.createElement('option', { key: jm, value: jm }, jm))
                    )
                  ),
                  React.createElement('td', { style: tdStyle },
                    React.createElement('input', { type: 'number', min: '0', step: '1', value: item.kolicina || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateItem(cat.key, idx, 'kolicina', parseFloat(e.target.value) || 0), style: numStyle })
                  ),
                  React.createElement('td', { style: tdStyle },
                    React.createElement('input', { type: 'number', min: '0', step: '0.01', value: item.vrijednost || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateItem(cat.key, idx, 'vrijednost', parseFloat(e.target.value) || 0), placeholder: '0.00', style: numStyle })
                  ),
                  cat.showAmort && React.createElement('td', { style: tdStyle },
                    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
                      React.createElement('input', { type: 'number', min: '1', max: '50', step: '1', value: item.amortPeriod || cat.defaultAmort, onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateItem(cat.key, idx, 'amortPeriod', parseInt(e.target.value) || cat.defaultAmort), style: { ...numStyle, width: '50px' } }),
                      React.createElement('span', { style: { fontSize: '10px', color: '#6b7a99', flexShrink: 0 } }, 'god.')
                    )
                  ),
                  React.createElement('td', { style: { ...tdStyle, background: '#EBF4FB', fontWeight: '600', textAlign: 'right' } }, fmt(item.kolicina * item.vrijednost)),
                  React.createElement('td', { style: { ...tdStyle, textAlign: 'center' } },
                    React.createElement('button', { onClick: () => removeItem(cat.key, idx), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '16px', lineHeight: 1 } }, '×')
                  )
                )
              ),
              React.createElement('tr', { style: { background: '#1a2740' } },
                React.createElement('td', { colSpan: cat.showAmort ? 5 : 4, style: { padding: '8px 12px', color: 'white', fontWeight: '700', fontSize: '11px', border: 'none' } }, 'UKUPNO — ' + cat.label),
                cat.showAmort && React.createElement('td', { style: { padding: '8px 12px', background: '#243553', color: 'white', fontWeight: '700', textAlign: 'right', border: 'none', fontSize: '11px' } }, fmt(calcAmortizacijaGodisnja({ ...data, infrastruktura: cat.key === 'infrastruktura' ? data[cat.key] as AssetItem[] : [], zemljiste: [], oprema: cat.key === 'oprema' ? data[cat.key] as AssetItem[] : [], nematerijalna: cat.key === 'nematerijalna' ? data[cat.key] as AssetItem[] : [], vozila: cat.key === 'vozila' ? data[cat.key] as AssetItem[] : [], osnivacka: 0, obrtna: 0 }))),
                React.createElement('td', { style: { padding: '8px 12px', background: cat.color, color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(categoryTotal(data[cat.key] as AssetItem[]))),
                React.createElement('td', { style: { background: '#2d3748', border: 'none' } }, '')
              )
            )
          )
        ),
        React.createElement('div', { style: { padding: '12px 20px' } },
          React.createElement('button', {
            onClick: () => addItem(cat.key, cat.defaultAmort),
            style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '6px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }
          }, '+ Dodaj u ' + cat.label.split('. ')[1])
        )
      )
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '8px' } },
      ...[
        { label: 'Ukupno stalna sredstva', value: fmt(totalStalna), color: '#1a2740', bg: '#EBF4FB' },
        { label: 'Godišnja amortizacija (auto)', value: fmt(totalAmort), color: '#2d7a4f', bg: '#f0faf4' },
        { label: 'Ukupna vrijednost imovine', value: fmt(totalUlaganja), color: '#C9A227', bg: '#fffbf0' },
      ].map((stat, i) => React.createElement('div', { key: i, style: { background: stat.bg, borderRadius: '10px', padding: '14px 16px', border: '1px solid #e2e8f0' } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, stat.label),
        React.createElement('div', { style: { fontSize: '18px', fontWeight: '800', color: stat.color } }, stat.value)
      ))
    )
  )
}
