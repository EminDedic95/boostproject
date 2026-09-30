'use client'
import React, { useState } from 'react'

export interface Product {
  id: string
  naziv: string
  tip: 'proizvod' | 'roba' | 'usluga'
  jm: string
  obim: number
  cijena: number
  trMat: number
}

export interface SalesData {
  products: Product[]
  growthG2: number
  growthG3: number
}

const DEFAULT_PRODUCT: Product = {
  id: '', naziv: '', tip: 'proizvod', jm: 'kom', obim: 0, cijena: 0, trMat: 0
}

const JM_PRESET = ['kom', 'kg', 'l', 'sat', 'projekt', 'm', 'm2', 'set', 'paket', 'usluga', 'mjesec', 'godisnja pretplata']

function genId() { return Math.random().toString(36).slice(2, 8) }

function fmt(n: number) {
  return n.toLocaleString('bs-BA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const TIP_LABELS: Record<string, { label: string, color: string, bg: string }> = {
  proizvod: { label: 'Proizvod', color: '#2E75B6', bg: '#f0f7ff' },
  roba: { label: 'Roba', color: '#C9A227', bg: '#fffbf0' },
  usluga: { label: 'Usluga', color: '#2d7a4f', bg: '#f0faf4' },
}

interface JMInputProps {
  value: string
  onChange: (v: string) => void
}

function JMInput({ value, onChange }: JMInputProps) {
  const [custom, setCustom] = useState(!JM_PRESET.includes(value))

  return React.createElement('div', { style: { display: 'flex', gap: '4px', alignItems: 'center' } },
    custom
      ? React.createElement('input', {
          type: 'text',
          value,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
          placeholder: 'Unesi...',
          style: { width: '80px', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '3px 6px', fontSize: '11px', outline: 'none' }
        })
      : React.createElement('select', {
          value,
          onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value === '__custom__') { setCustom(true); onChange('') }
            else onChange(e.target.value)
          },
          style: { border: '1px solid #e2e8f0', borderRadius: '4px', padding: '3px 4px', fontSize: '11px', outline: 'none', maxWidth: '90px' }
        },
          ...JM_PRESET.map(jm => React.createElement('option', { key: jm, value: jm }, jm)),
          React.createElement('option', { value: '__custom__' }, '+ Ručni unos')
        ),
    custom && React.createElement('button', {
      onClick: () => { setCustom(false); onChange('kom') },
      style: { border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', color: '#6b7a99', padding: '2px' }
    }, '↩')
  )
}

interface Props {
  data: SalesData
  onChange: (data: SalesData) => void
}

export default function StepProdajniAsortiman({ data, onChange }: Props) {

  function addProduct() {
    const newP = { ...DEFAULT_PRODUCT, id: genId() }
    onChange({ ...data, products: [...data.products, newP] })
  }

  function removeProduct(id: string) {
    onChange({ ...data, products: data.products.filter(p => p.id !== id) })
  }

  function updateProduct(id: string, field: keyof Product, value: string | number) {
    onChange({ ...data, products: data.products.map(p => p.id === id ? { ...p, [field]: value } : p) })
  }

  function updateGrowth(field: 'growthG2' | 'growthG3', value: string) {
    onChange({ ...data, [field]: parseFloat(value) || 1 })
  }

  const prihodG1 = data.products.reduce((s, p) => s + p.obim * p.cijena, 0)
  const prihodG2 = prihodG1 * data.growthG2
  const prihodG3 = prihodG1 * data.growthG3

  const thStyle: React.CSSProperties = { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap' }
  const tdStyle: React.CSSProperties = { padding: '4px', border: '1px solid #e2e8f0', verticalAlign: 'middle' }
  const inputStyle: React.CSSProperties = { width: '100%', border: 'none', outline: 'none', fontSize: '12px', padding: '4px 6px', background: 'transparent', boxSizing: 'border-box' }
  const numStyle: React.CSSProperties = { ...inputStyle, textAlign: 'right' }

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Uputa: '),
      'Unesite sve proizvode, robu ili usluge koje planirate prodavati. Za svaki stavite godišnji obim prodaje i prodajnu cijenu. Faktori rasta za G2 i G3 se definišu ispod tabele.'
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '12px' } },
      React.createElement('div', { style: { overflowX: 'auto' } },
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '700px' } },
          React.createElement('thead', {},
            React.createElement('tr', {},
              React.createElement('th', { style: { ...thStyle, width: '30px' } }, '#'),
              React.createElement('th', { style: { ...thStyle, minWidth: '180px' } }, 'Naziv proizvoda / usluge'),
              React.createElement('th', { style: { ...thStyle, width: '110px' } }, 'Tip'),
              React.createElement('th', { style: { ...thStyle, width: '100px' } }, 'Jed. mjere'),
              React.createElement('th', { style: { ...thStyle, width: '110px' } }, 'God. obim'),
              React.createElement('th', { style: { ...thStyle, width: '120px' } }, 'Prod. cijena'),
              React.createElement('th', { style: { ...thStyle, width: '130px', background: '#243553' } }, 'Prihod G1'),
              React.createElement('th', { style: { ...thStyle, width: '120px', background: '#2d4a2d' } }, 'Prihod G2'),
              React.createElement('th', { style: { ...thStyle, width: '120px', background: '#1a3a5c' } }, 'Prihod G3'),
              React.createElement('th', { style: { ...thStyle, width: '30px', background: '#2d3748' } }, '')
            )
          ),
          React.createElement('tbody', {},
            data.products.length === 0
              ? React.createElement('tr', {},
                  React.createElement('td', { colSpan: 10, style: { padding: '32px', textAlign: 'center', color: '#6b7a99', fontSize: '13px' } },
                    'Nema stavki. Kliknite "+ Dodaj stavku" ispod.'
                  )
                )
              : null,
            ...data.products.map((p, i) => {
              const g1 = p.obim * p.cijena
              const tipInfo = TIP_LABELS[p.tip]
              return React.createElement('tr', { key: p.id, style: { borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#fafafa' } },
                React.createElement('td', { style: { ...tdStyle, textAlign: 'center', color: '#6b7a99', fontWeight: '600' } }, i + 1),
                React.createElement('td', { style: tdStyle },
                  React.createElement('input', { type: 'text', value: p.naziv, onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateProduct(p.id, 'naziv', e.target.value), placeholder: 'npr. Hljeb bijeli 500g', style: inputStyle })
                ),
                React.createElement('td', { style: tdStyle },
                  React.createElement('select', {
                    value: p.tip,
                    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => updateProduct(p.id, 'tip', e.target.value),
                    style: { width: '100%', border: 'none', outline: 'none', fontSize: '11px', padding: '4px 4px', background: tipInfo.bg, color: tipInfo.color, fontWeight: '700', borderRadius: '4px', cursor: 'pointer', boxSizing: 'border-box' }
                  },
                    React.createElement('option', { value: 'proizvod' }, 'Proizvod'),
                    React.createElement('option', { value: 'roba' }, 'Roba'),
                    React.createElement('option', { value: 'usluga' }, 'Usluga')
                  )
                ),
                React.createElement('td', { style: tdStyle },
                  React.createElement(JMInput, { value: p.jm, onChange: v => updateProduct(p.id, 'jm', v) })
                ),
                React.createElement('td', { style: tdStyle },
                  React.createElement('input', { type: 'number', min: '0', value: p.obim || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateProduct(p.id, 'obim', parseFloat(e.target.value) || 0), placeholder: '0', style: numStyle })
                ),
                React.createElement('td', { style: tdStyle },
                  React.createElement('input', { type: 'number', min: '0', step: '0.01', value: p.cijena || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateProduct(p.id, 'cijena', parseFloat(e.target.value) || 0), placeholder: '0.00', style: numStyle })
                ),
                React.createElement('td', { style: { ...tdStyle, background: '#EBF4FB', fontWeight: '600', textAlign: 'right' } }, fmt(g1)),
                React.createElement('td', { style: { ...tdStyle, background: '#f0faf4', textAlign: 'right', color: '#2d7a4f' } }, fmt(g1 * data.growthG2)),
                React.createElement('td', { style: { ...tdStyle, background: '#f0f7ff', textAlign: 'right', color: '#2E75B6' } }, fmt(g1 * data.growthG3)),
                React.createElement('td', { style: { ...tdStyle, textAlign: 'center' } },
                  React.createElement('button', { onClick: () => removeProduct(p.id), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '16px', lineHeight: 1, padding: '2px' } }, '×')
                )
              )
            }),
            data.products.length > 0
              ? React.createElement('tr', { style: { background: '#1a2740' } },
                  React.createElement('td', { colSpan: 6, style: { padding: '10px 12px', color: 'white', fontWeight: '700', border: 'none' } }, 'UKUPAN PRIHOD'),
                  React.createElement('td', { style: { padding: '10px 12px', background: '#1F4E79', color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(prihodG1)),
                  React.createElement('td', { style: { padding: '10px 12px', background: '#2d4a2d', color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(prihodG2)),
                  React.createElement('td', { style: { padding: '10px 12px', background: '#1a3a5c', color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(prihodG3)),
                  React.createElement('td', { style: { background: '#2d3748', border: 'none' } }, '')
                )
              : null
          )
        )
      )
    ),

    data.products.length < 12
      ? React.createElement('button', {
          onClick: addProduct,
          style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', marginBottom: '28px' }
        }, '+ Dodaj stavku')
      : React.createElement('p', { style: { color: '#6b7a99', fontSize: '12px', marginBottom: '28px' } }, 'Maksimalan broj stavki je 12.'),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' } },
      React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', marginBottom: '16px' } }, 'Faktori rasta prihoda po godinama'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' } },
        React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '8px', padding: '14px' } },
          React.createElement('label', { style: { display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7a99', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' } }, 'Godina 1 (baza)'),
          React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', color: '#1a2740' } }, '1.00'),
          React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', marginTop: '2px' } }, 'Osnovna godina')
        ),
        React.createElement('div', { style: { background: '#f0faf4', borderRadius: '8px', padding: '14px' } },
          React.createElement('label', { style: { display: 'block', fontSize: '11px', fontWeight: '700', color: '#2d7a4f', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' } }, 'Godina 2 — faktor'),
          React.createElement('input', {
            type: 'number', step: '0.01', min: '0',
            value: data.growthG2,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateGrowth('growthG2', e.target.value),
            style: { width: '100%', border: '1px solid #2d7a4f40', borderRadius: '6px', padding: '6px 10px', fontSize: '18px', fontWeight: '800', color: '#2d7a4f', outline: 'none', background: 'white', boxSizing: 'border-box' }
          }),
          React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', marginTop: '4px' } }, '1.10 = +10% rast')
        ),
        React.createElement('div', { style: { background: '#f0f7ff', borderRadius: '8px', padding: '14px' } },
          React.createElement('label', { style: { display: 'block', fontSize: '11px', fontWeight: '700', color: '#2E75B6', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' } }, 'Godina 3 — faktor'),
          React.createElement('input', {
            type: 'number', step: '0.01', min: '0',
            value: data.growthG3,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateGrowth('growthG3', e.target.value),
            style: { width: '100%', border: '1px solid #2E75B640', borderRadius: '6px', padding: '6px 10px', fontSize: '18px', fontWeight: '800', color: '#2E75B6', outline: 'none', background: 'white', boxSizing: 'border-box' }
          }),
          React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', marginTop: '4px' } }, '1.20 = +20% rast')
        )
      )
    )
  )
}
