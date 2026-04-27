'use client'
import React from 'react'

export interface AssetItem {
  naziv: string
  jm: string
  kolicina: number
  vrijednost: number
}

export interface StalnaData {
  infrastruktura: AssetItem[]
  zemljiste: AssetItem[]
  oprema: AssetItem[]
  vozila: AssetItem[]
  osnivacka: number
  obrtna: number
}

const DEFAULT_ITEM: AssetItem = { naziv: '', jm: 'kom', kolicina: 1, vrijednost: 0 }

const JM_OPTIONS = ['kom', 'm2', 'm', 'set', 'paket']

const CATEGORIES = [
  {
    key: 'infrastruktura' as keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'vozila'>,
    label: '1. Infrastruktura i gradevinski objekti',
    color: '#2E75B6',
    bg: '#f0f7ff',
    amort: '40 god.',
    hint: 'Gradjevinski objekti, adaptacija prostora, instalacije...',
  },
  {
    key: 'zemljiste' as keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'vozila'>,
    label: '2. Zemljiste',
    color: '#8e44ad',
    bg: '#faf0ff',
    amort: 'Ne amortizuje',
    hint: 'Kupovina ili procjena vrijednosti zemljista...',
  },
  {
    key: 'oprema' as keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'vozila'>,
    label: '3. Oprema i masine',
    color: '#C9A227',
    bg: '#fffbf0',
    amort: '10 god.',
    hint: 'Masine, uredajna oprema, racunari, alati...',
  },
  {
    key: 'vozila' as keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'vozila'>,
    label: '4. Vozila',
    color: '#2d7a4f',
    bg: '#f0faf4',
    amort: '5 god.',
    hint: 'Teretna i putnička vozila, specijalna vozila...',
  },
]

function fmt(n: number) {
  return n.toLocaleString('bs-BA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function categoryTotal(items: AssetItem[]) {
  return items.reduce((s, i) => s + (i.kolicina * i.vrijednost), 0)
}

interface Props {
  data: StalnaData
  onChange: (data: StalnaData) => void
}

export default function StepStalnaData({ data, onChange }: Props) {

  function addItem(cat: keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'vozila'>) {
    onChange({ ...data, [cat]: [...data[cat], { ...DEFAULT_ITEM }] })
  }

  function removeItem(cat: keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'vozila'>, idx: number) {
    onChange({ ...data, [cat]: data[cat].filter((_: AssetItem, i: number) => i !== idx) })
  }

  function updateItem(cat: keyof Pick<StalnaData, 'infrastruktura' | 'zemljiste' | 'oprema' | 'vozila'>, idx: number, field: keyof AssetItem, value: string | number) {
    onChange({ ...data, [cat]: data[cat].map((item: AssetItem, i: number) => i === idx ? { ...item, [field]: value } : item) })
  }

  const totalStalna = CATEGORIES.reduce((s, c) => s + categoryTotal(data[c.key]), 0)
  const totalUlaganja = totalStalna + (data.osnivacka || 0) + (data.obrtna || 0)

  const thStyle: React.CSSProperties = { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', fontWeight: '600' }
  const tdStyle: React.CSSProperties = { padding: '4px', border: '1px solid #e2e8f0' }
  const inputStyle: React.CSSProperties = { width: '100%', border: 'none', outline: 'none', fontSize: '12px', padding: '4px 6px', background: 'transparent', boxSizing: 'border-box' }
  const numStyle: React.CSSProperties = { ...inputStyle, textAlign: 'right' }

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Uputa: '),
      'Unesite sva planirana ulaganja u stalna sredstva po kategorijama. Nabavne vrijednosti bez PDV-a. Amortizacija se automatski racuna u P&L.'
    ),

    ...CATEGORIES.map(cat =>
      React.createElement('div', { key: cat.key, style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '16px' } },
        React.createElement('div', { style: { padding: '14px 20px', background: cat.bg, borderBottom: '1px solid ' + cat.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', {},
            React.createElement('h3', { style: { color: cat.color, fontSize: '14px', fontWeight: '700', margin: '0 0 2px' } }, cat.label),
            React.createElement('div', { style: { display: 'flex', gap: '12px' } },
              React.createElement('span', { style: { fontSize: '11px', color: '#6b7a99' } }, 'Amortizacija: ' + cat.amort),
              React.createElement('span', { style: { fontSize: '11px', color: '#6b7a99' } }, cat.hint)
            )
          ),
          React.createElement('div', { style: { fontSize: '16px', fontWeight: '800', color: cat.color } }, fmt(categoryTotal(data[cat.key])))
        ),
        React.createElement('div', { style: { overflowX: 'auto' } },
          React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
            React.createElement('thead', {},
              React.createElement('tr', {},
                React.createElement('th', { style: { ...thStyle, width: '30px' } }, 'R.b.'),
                React.createElement('th', { style: thStyle }, 'Naziv stavke / sredstva'),
                React.createElement('th', { style: { ...thStyle, width: '80px' } }, 'Jed. mjere'),
                React.createElement('th', { style: { ...thStyle, width: '100px' } }, 'Kolicina'),
                React.createElement('th', { style: { ...thStyle, width: '140px' } }, 'Nabavna vrijednost'),
                React.createElement('th', { style: { ...thStyle, width: '140px', background: '#243553' } }, 'Ukupno'),
                React.createElement('th', { style: { ...thStyle, width: '30px', background: '#2d3748' } }, '')
              )
            ),
            React.createElement('tbody', {},
              data[cat.key].length === 0
                ? React.createElement('tr', {},
                    React.createElement('td', { colSpan: 7, style: { padding: '20px', textAlign: 'center', color: '#6b7a99', fontSize: '12px' } }, 'Nema stavki. Kliknite "+ Dodaj" ispod.')
                  )
                : null,
              ...data[cat.key].map((item: AssetItem, idx: number) =>
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
                  React.createElement('td', { style: { ...tdStyle, background: '#EBF4FB', fontWeight: '600', textAlign: 'right' } }, fmt(item.kolicina * item.vrijednost)),
                  React.createElement('td', { style: { ...tdStyle, textAlign: 'center' } },
                    React.createElement('button', { onClick: () => removeItem(cat.key, idx), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '16px', lineHeight: 1 } }, 'x')
                  )
                )
              ),
              React.createElement('tr', { style: { background: '#1a2740' } },
                React.createElement('td', { colSpan: 5, style: { padding: '8px 12px', color: 'white', fontWeight: '700', fontSize: '11px', border: 'none' } }, 'UKUPNO — ' + cat.label),
                React.createElement('td', { style: { padding: '8px 12px', background: cat.color, color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(categoryTotal(data[cat.key]))),
                React.createElement('td', { style: { background: '#2d3748', border: 'none' } }, '')
              )
            )
          )
        ),
        React.createElement('div', { style: { padding: '12px 20px' } },
          React.createElement('button', {
            onClick: () => addItem(cat.key),
            style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '6px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }
          }, '+ Dodaj ' + cat.label.split('. ')[1])
        )
      )
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '16px' } },
      React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', marginBottom: '16px' } }, 'Ostala ulaganja'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
        React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontSize: '12px', fontWeight: '700', color: '#1a2740', marginBottom: '4px' } }, 'Osnivacka ulaganja (start-up troskovi)'),
          React.createElement('p', { style: { fontSize: '11px', color: '#6b7a99', marginBottom: '8px' } }, 'Registracija, notarski troskovi, licenciranje...'),
          React.createElement('input', { type: 'number', min: '0', step: '0.01', value: data.osnivacka || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...data, osnivacka: parseFloat(e.target.value) || 0 }), placeholder: '0.00', style: { width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', textAlign: 'right', boxSizing: 'border-box' } })
        ),
        React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontSize: '12px', fontWeight: '700', color: '#1a2740', marginBottom: '4px' } }, 'Obrtna sredstva'),
          React.createElement('p', { style: { fontSize: '11px', color: '#6b7a99', marginBottom: '8px' } }, 'Min. 3 mjeseca operativnih troskova (unijeti nakon T.6)'),
          React.createElement('input', { type: 'number', min: '0', step: '0.01', value: data.obrtna || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...data, obrtna: parseFloat(e.target.value) || 0 }), placeholder: '0.00', style: { width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', textAlign: 'right', boxSizing: 'border-box' } })
        )
      )
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' } },
      ...[
        { label: 'Ukupno stalna sredstva', value: fmt(totalStalna), color: '#1a2740', bg: '#EBF4FB' },
        { label: 'Osnivacka + Obrtna sredstva', value: fmt((data.osnivacka || 0) + (data.obrtna || 0)), color: '#6b7a99', bg: '#f5f7fb' },
        { label: 'UKUPNA ULAGANJA', value: fmt(totalUlaganja), color: '#C9A227', bg: '#fffbf0' },
      ].map((stat, i) => React.createElement('div', { key: i, style: { background: stat.bg, borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, stat.label),
        React.createElement('div', { style: { fontSize: '20px', fontWeight: '800', color: stat.color } }, stat.value)
      ))
    )
  )
}
