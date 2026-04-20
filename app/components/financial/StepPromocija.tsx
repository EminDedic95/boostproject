'use client'
import React from 'react'

export interface PromocijaLine {
  naziv: string
  mjesecniIznos: number
}

export interface PromocijaData {
  items: PromocijaLine[]
  growthG2: number
  growthG3: number
}

const DEFAULT_ITEMS: PromocijaLine[] = [
  { naziv: 'Istrazivanje trzista', mjesecniIznos: 0 },
  { naziv: 'Kreativne usluge (dizajn, foto, video)', mjesecniIznos: 0 },
  { naziv: 'Produkcija (stampanje, plakati, reklame)', mjesecniIznos: 0 },
  { naziv: 'Zakup medija (bilbordi, TV, radio, stampa)', mjesecniIznos: 0 },
  { naziv: 'Internet oglasavanje (Google/Meta/TikTok Ads)', mjesecniIznos: 0 },
  { naziv: 'Sajmovi, izlozbe i eventi', mjesecniIznos: 0 },
  { naziv: 'PR i odnosi s javnoscu', mjesecniIznos: 0 },
  { naziv: 'Influencer marketing i partnerstva', mjesecniIznos: 0 },
  { naziv: 'Web / app razvoj i odrzavanje', mjesecniIznos: 0 },
  { naziv: 'Ostali troskovi promocije', mjesecniIznos: 0 },
]

function fmt(n: number) {
  return n.toLocaleString('bs-BA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface Props {
  data: PromocijaData
  growthG2: number
  growthG3: number
  onChange: (data: PromocijaData) => void
}

export default function StepPromocija({ data, growthG2, growthG3, onChange }: Props) {

  function updateItem(idx: number, field: keyof PromocijaLine, value: string | number) {
    onChange({ ...data, items: data.items.map((item, i) => i === idx ? { ...item, [field]: value } : item) })
  }

  function addItem() {
    onChange({ ...data, items: [...data.items, { naziv: '', mjesecniIznos: 0 }] })
  }

  function removeItem(idx: number) {
    onChange({ ...data, items: data.items.filter((_, i) => i !== idx) })
  }

  const totalMjesecni = data.items.reduce((s, i) => s + (i.mjesecniIznos || 0), 0)
  const totalG1 = totalMjesecni * 12
  const totalG2 = totalG1 * growthG2
  const totalG3 = totalG1 * growthG3

  const thStyle: React.CSSProperties = { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', fontWeight: '600' }
  const tdStyle: React.CSSProperties = { padding: '4px 8px', border: '1px solid #e2e8f0', fontSize: '12px' }
  const inputStyle: React.CSSProperties = { width: '100%', border: 'none', outline: 'none', fontSize: '12px', background: 'transparent', boxSizing: 'border-box' }

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Uputa: '),
      'Unesite mjesecne iznose za svaku kategoriju marketinskih troskova. Godisnji iznosi se automatski racunaju. Faktori rasta preuzimaju se iz Prodajnog asortimana.'
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' } },
      ...[
        { label: 'Faktor rasta G2', value: growthG2.toFixed(2), color: '#2d7a4f', bg: '#f0faf4' },
        { label: 'Faktor rasta G3', value: growthG3.toFixed(2), color: '#2E75B6', bg: '#f0f7ff' },
        { label: 'Ukupno marketing G1', value: fmt(totalG1), color: '#C9A227', bg: '#fffbf0' },
      ].map((stat, i) => React.createElement('div', { key: i, style: { background: stat.bg, borderRadius: '10px', padding: '14px 16px', border: '1px solid #e2e8f0' } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, stat.label),
        React.createElement('div', { style: { fontSize: '20px', fontWeight: '800', color: stat.color } }, stat.value)
      ))
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '12px' } },
      React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
        React.createElement('thead', {},
          React.createElement('tr', {},
            React.createElement('th', { style: { ...thStyle, width: '30px' } }, 'R.b.'),
            React.createElement('th', { style: thStyle }, 'Naziv troska'),
            React.createElement('th', { style: { ...thStyle, width: '130px', textAlign: 'right' } }, 'Mjes. iznos'),
            React.createElement('th', { style: { ...thStyle, width: '130px', textAlign: 'right', background: '#243553' } }, 'Godina 1'),
            React.createElement('th', { style: { ...thStyle, width: '120px', textAlign: 'right', background: '#2d4a2d' } }, 'Godina 2'),
            React.createElement('th', { style: { ...thStyle, width: '120px', textAlign: 'right', background: '#1a3a5c' } }, 'Godina 3'),
            React.createElement('th', { style: { ...thStyle, width: '30px', background: '#2d3748' } }, '')
          )
        ),
        React.createElement('tbody', {},
          ...data.items.map((item, idx) => {
            const g1 = (item.mjesecniIznos || 0) * 12
            const g2 = g1 * growthG2
            const g3 = g1 * growthG3
            return React.createElement('tr', { key: idx, style: { borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? 'white' : '#fafafa' } },
              React.createElement('td', { style: { ...tdStyle, textAlign: 'center', color: '#6b7a99', fontWeight: '600' } }, idx + 1),
              React.createElement('td', { style: tdStyle },
                React.createElement('input', { type: 'text', value: item.naziv, onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateItem(idx, 'naziv', e.target.value), style: inputStyle })
              ),
              React.createElement('td', { style: tdStyle },
                React.createElement('input', { type: 'number', min: '0', step: '0.01', value: item.mjesecniIznos || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateItem(idx, 'mjesecniIznos', parseFloat(e.target.value) || 0), placeholder: '0.00', style: { ...inputStyle, textAlign: 'right' } })
              ),
              React.createElement('td', { style: { ...tdStyle, background: '#EBF4FB', textAlign: 'right', fontWeight: '600' } }, fmt(g1)),
              React.createElement('td', { style: { ...tdStyle, background: '#f0faf4', textAlign: 'right', color: '#2d7a4f' } }, fmt(g2)),
              React.createElement('td', { style: { ...tdStyle, background: '#f0f7ff', textAlign: 'right', color: '#2E75B6' } }, fmt(g3)),
              React.createElement('td', { style: { ...tdStyle, textAlign: 'center' } },
                data.items.length > 1
                  ? React.createElement('button', { onClick: () => removeItem(idx), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '14px' } }, 'x')
                  : null
              )
            )
          }),
          React.createElement('tr', { style: { background: '#1a2740' } },
            React.createElement('td', { colSpan: 3, style: { padding: '10px 12px', color: 'white', fontWeight: '700', fontSize: '12px', border: 'none' } }, 'UKUPNO MARKETING I PROMOCIJA'),
            React.createElement('td', { style: { padding: '10px 12px', background: '#1F4E79', color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(totalG1)),
            React.createElement('td', { style: { padding: '10px 12px', background: '#2d4a2d', color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(totalG2)),
            React.createElement('td', { style: { padding: '10px 12px', background: '#1a3a5c', color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(totalG3)),
            React.createElement('td', { style: { background: '#2d3748', border: 'none' } }, '')
          )
        )
      )
    ),

    React.createElement('button', {
      onClick: addItem,
      style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', marginBottom: '20px' }
    }, '+ Dodaj stavku'),

    totalG1 > 0 && React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
      React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, 'Prosjecni miesecni budzet za marketing'),
        React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', color: '#1a2740' } }, fmt(totalMjesecni))
      ),
      React.createElement('div', { style: { background: '#fffbf0', borderRadius: '10px', padding: '16px', border: '1px solid #C9A22740' } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, 'Ukupno marketing 3 godine'),
        React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', color: '#C9A227' } }, fmt(totalG1 + totalG2 + totalG3))
      )
    )
  )
}
