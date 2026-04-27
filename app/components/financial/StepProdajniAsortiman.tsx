'use client'
import React, { useState, useEffect } from 'react'

// Types
export interface Product {
  id: string
  naziv: string
  jm: string
  obim: number
  cijena: number
  trMat: number // troskovi materijala po jedinici
}

export interface SalesData {
  products: Product[]
  growthG2: number // faktor rasta godina 2 (npr 1.1 = +10%)
  growthG3: number // faktor rasta godina 3
}

const DEFAULT_PRODUCT: Product = {
  id: '', naziv: '', jm: 'kom', obim: 0, cijena: 0, trMat: 0
}

const JM_OPTIONS = ['kom', 'kg', 'l', 'sat', 'projekt', 'm', 'm2', 'set', 'paket', 'usluga']

function genId() { return Math.random().toString(36).slice(2, 8) }

function fmt(n: number) {
  return n.toLocaleString('bs-BA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface Props {
  data: SalesData
  onChange: (data: SalesData) => void
}

export default function StepProdajniAsortiman({ data, onChange }: Props) {
  const [activeProduct, setActiveProduct] = useState<string | null>(null)

  function addProduct() {
    const newP = { ...DEFAULT_PRODUCT, id: genId() }
    onChange({ ...data, products: [...data.products, newP] })
    setActiveProduct(newP.id)
  }

  function removeProduct(id: string) {
    onChange({ ...data, products: data.products.filter(p => p.id !== id) })
    if (activeProduct === id) setActiveProduct(null)
  }

  function updateProduct(id: string, field: keyof Product, value: string | number) {
    onChange({
      ...data,
      products: data.products.map(p => p.id === id ? { ...p, [field]: value } : p)
    })
  }

  function updateGrowth(field: 'growthG2' | 'growthG3', value: string) {
    const num = parseFloat(value) || 1
    onChange({ ...data, [field]: num })
  }

  // Calculations
  function calcProduct(p: Product) {
    const prihodG1 = p.obim * p.cijena
    const trMatG1 = p.obim * p.trMat
    const brutoG1 = prihodG1 - trMatG1
    const prihodG2 = prihodG1 * data.growthG2
    const prihodG3 = prihodG1 * data.growthG3
    return { prihodG1, trMatG1, brutoG1, prihodG2, prihodG3 }
  }

  const totals = {
    prihodG1: data.products.reduce((s, p) => s + p.obim * p.cijena, 0),
    trMatG1: data.products.reduce((s, p) => s + p.obim * p.trMat, 0),
    prihodG2: data.products.reduce((s, p) => s + p.obim * p.cijena * data.growthG2, 0),
    prihodG3: data.products.reduce((s, p) => s + p.obim * p.cijena * data.growthG3, 0),
  }
  totals['brutoG1' as keyof typeof totals] = (totals.prihodG1 - totals.trMatG1) as unknown as number

  const thStyle: React.CSSProperties = { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap' }
  const tdStyle: React.CSSProperties = { padding: '4px', border: '1px solid #e2e8f0', verticalAlign: 'middle' }
  const inputStyle: React.CSSProperties = { width: '100%', border: 'none', outline: 'none', fontSize: '12px', padding: '4px 6px', background: 'transparent', boxSizing: 'border-box' }
  const numStyle: React.CSSProperties = { ...inputStyle, textAlign: 'right' }

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Uputa: '),
      'Unesite sve proizvode ili usluge koje planirate prodavati. Za svaki proizvod unesite godisnji obim prodaje, prodajnu cijenu i troskove materijala po jedinici. Faktori rasta automatski racunaju prihode za Godinu 2 i 3.'
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', marginBottom: '16px' } },
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
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '12px' } },
      React.createElement('div', { style: { overflowX: 'auto' } },
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '900px' } },
          React.createElement('thead', {},
            React.createElement('tr', {},
              React.createElement('th', { style: { ...thStyle, width: '30px' } }, '#'),
              React.createElement('th', { style: { ...thStyle, minWidth: '160px' } }, 'Naziv proizvoda / usluge'),
              React.createElement('th', { style: { ...thStyle, width: '90px' } }, 'Jed. mjere'),
              React.createElement('th', { style: { ...thStyle, width: '100px' } }, 'Godisnji obim'),
              React.createElement('th', { style: { ...thStyle, width: '110px' } }, 'Prod. cijena / jed.'),
              React.createElement('th', { style: { ...thStyle, width: '110px' } }, 'Tr. mat. / jed.'),
              React.createElement('th', { style: { ...thStyle, width: '120px', background: '#243553' } }, 'Prihod G1'),
              React.createElement('th', { style: { ...thStyle, width: '120px', background: '#243553' } }, 'Bruto dobit G1'),
              React.createElement('th', { style: { ...thStyle, width: '110px', background: '#2d4a2d' } }, 'Prihod G2'),
              React.createElement('th', { style: { ...thStyle, width: '110px', background: '#1a3a5c' } }, 'Prihod G3'),
              React.createElement('th', { style: { ...thStyle, width: '30px', background: '#2d3748' } }, '')
            )
          ),
          React.createElement('tbody', {},
            data.products.length === 0
              ? React.createElement('tr', {},
                  React.createElement('td', { colSpan: 11, style: { padding: '32px', textAlign: 'center', color: '#6b7a99', fontSize: '13px' } },
                    'Nema proizvoda. Kliknite "+ Dodaj proizvod" ispod.'
                  )
                )
              : null,
            ...data.products.map((p, i) => {
              const calc = calcProduct(p)
              return React.createElement('tr', { key: p.id, style: { borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? 'white' : '#fafafa' } },
                React.createElement('td', { style: { ...tdStyle, textAlign: 'center', color: '#6b7a99', fontWeight: '600' } }, i + 1),
                React.createElement('td', { style: tdStyle },
                  React.createElement('input', { type: 'text', value: p.naziv, onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateProduct(p.id, 'naziv', e.target.value), placeholder: 'npr. Hljeb bijeli 500g', style: inputStyle })
                ),
                React.createElement('td', { style: tdStyle },
                  React.createElement('select', { value: p.jm, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => updateProduct(p.id, 'jm', e.target.value), style: { ...inputStyle, cursor: 'pointer' } },
                    ...JM_OPTIONS.map(jm => React.createElement('option', { key: jm, value: jm }, jm))
                  )
                ),
                React.createElement('td', { style: tdStyle },
                  React.createElement('input', { type: 'number', min: '0', value: p.obim || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateProduct(p.id, 'obim', parseFloat(e.target.value) || 0), placeholder: '0', style: numStyle })
                ),
                React.createElement('td', { style: tdStyle },
                  React.createElement('input', { type: 'number', min: '0', step: '0.01', value: p.cijena || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateProduct(p.id, 'cijena', parseFloat(e.target.value) || 0), placeholder: '0.00', style: numStyle })
                ),
                React.createElement('td', { style: tdStyle },
                  React.createElement('input', { type: 'number', min: '0', step: '0.01', value: p.trMat || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateProduct(p.id, 'trMat', parseFloat(e.target.value) || 0), placeholder: '0.00', style: numStyle })
                ),
                React.createElement('td', { style: { ...tdStyle, background: '#EBF4FB', fontWeight: '600', textAlign: 'right' } }, fmt(calc.prihodG1)),
                React.createElement('td', { style: { ...tdStyle, background: calc.brutoG1 >= 0 ? '#f0faf4' : '#fef5f5', fontWeight: '600', textAlign: 'right', color: calc.brutoG1 >= 0 ? '#2d7a4f' : '#c0392b' } }, fmt(calc.brutoG1)),
                React.createElement('td', { style: { ...tdStyle, background: '#f0faf4', textAlign: 'right', color: '#2d7a4f' } }, fmt(calc.prihodG2)),
                React.createElement('td', { style: { ...tdStyle, background: '#f0f7ff', textAlign: 'right', color: '#2E75B6' } }, fmt(calc.prihodG3)),
                React.createElement('td', { style: { ...tdStyle, textAlign: 'center' } },
                  React.createElement('button', { onClick: () => removeProduct(p.id), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '16px', lineHeight: 1, padding: '2px' } }, 'x')
                )
              )
            }),
            data.products.length > 0
              ? React.createElement('tr', { style: { background: '#1a2740', fontWeight: '700' } },
                  React.createElement('td', { colSpan: 6, style: { ...tdStyle, background: '#1a2740', color: 'white', fontWeight: '700', padding: '10px 12px', border: 'none' } }, 'UKUPNO'),
                  React.createElement('td', { style: { ...tdStyle, background: '#1F4E79', color: 'white', fontWeight: '700', textAlign: 'right', border: 'none' } }, fmt(totals.prihodG1)),
                  React.createElement('td', { style: { ...tdStyle, background: totals.prihodG1 - totals.trMatG1 >= 0 ? '#2d7a4f' : '#c0392b', color: 'white', fontWeight: '700', textAlign: 'right', border: 'none' } }, fmt(totals.prihodG1 - totals.trMatG1)),
                  React.createElement('td', { style: { ...tdStyle, background: '#2d4a2d', color: 'white', fontWeight: '700', textAlign: 'right', border: 'none' } }, fmt(totals.prihodG2)),
                  React.createElement('td', { style: { ...tdStyle, background: '#1a3a5c', color: 'white', fontWeight: '700', textAlign: 'right', border: 'none' } }, fmt(totals.prihodG3)),
                  React.createElement('td', { style: { ...tdStyle, background: '#2d3748', border: 'none' } }, '')
                )
              : null
          )
        )
      )
    ),

    data.products.length < 12
      ? React.createElement('button', {
          onClick: addProduct,
          style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', marginBottom: '20px' }
        }, '+ Dodaj proizvod / uslugu')
      : React.createElement('p', { style: { color: '#6b7a99', fontSize: '12px', marginBottom: '20px' } }, 'Maksimalan broj proizvoda je 12.'),

    data.products.length > 0 && React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' } },
      ...[
        { label: 'Ukupan prihod G1', value: fmt(totals.prihodG1), color: '#1a2740', bg: '#EBF4FB' },
        { label: 'Bruto dobit G1', value: fmt(totals.prihodG1 - totals.trMatG1), color: totals.prihodG1 - totals.trMatG1 >= 0 ? '#2d7a4f' : '#c0392b', bg: totals.prihodG1 - totals.trMatG1 >= 0 ? '#f0faf4' : '#fef5f5' },
        { label: 'Marza bruto dobiti', value: totals.prihodG1 > 0 ? ((totals.prihodG1 - totals.trMatG1) / totals.prihodG1 * 100).toFixed(1) + '%' : '0%', color: '#1a2740', bg: '#f5f7fb' },
        { label: 'Ukupan prihod G2', value: fmt(totals.prihodG2), color: '#2d7a4f', bg: '#f0faf4' },
        { label: 'Ukupan prihod G3', value: fmt(totals.prihodG3), color: '#2E75B6', bg: '#f0f7ff' },
        { label: 'Rast G1 → G3', value: totals.prihodG1 > 0 ? '+' + ((totals.prihodG3 / totals.prihodG1 - 1) * 100).toFixed(1) + '%' : '0%', color: '#C9A227', bg: '#fffbf0' },
      ].map((stat, i) => React.createElement('div', { key: i, style: { background: stat.bg, borderRadius: '10px', padding: '14px 16px', border: '1px solid #e2e8f0' } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, stat.label),
        React.createElement('div', { style: { fontSize: '18px', fontWeight: '800', color: stat.color } }, stat.value)
      ))
    )
  )
}
