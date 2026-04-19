'use client'
import React, { useState } from 'react'
import { Product } from './StepProdajniAsortiman'

export type NormativMode = 'M1' | 'M3' | 'M4'

export interface MaterialItem {
  naziv: string
  jm: string
  normativ: number
  cijena: number
}

export interface ProductNormativ {
  productId: string
  mode: NormativMode
  materials: MaterialItem[]
}

export interface NormativData {
  items: ProductNormativ[]
}

const DEFAULT_MATERIAL: MaterialItem = { naziv: '', jm: 'kg', normativ: 0, cijena: 0 }

const MODE_INFO = {
  M1: { label: 'M1 — Proizvodnja', desc: 'Normativ utroska materijala (BOM)', color: '#2E75B6', bg: '#f0f7ff', hint: 'Unesite materijale koji ulaze u jedan komad proizvoda (recept/normativ).' },
  M3: { label: 'M3 — Trgovina', desc: 'Nabavna cijena robe', color: '#C9A227', bg: '#fffbf0', hint: 'Unesite nabavnu cijenu po jedinici za robu koju preprodajete.' },
  M4: { label: 'M4 — Usluge', desc: 'Potrosni materijal', color: '#2d7a4f', bg: '#f0faf4', hint: 'Unesite potrosni materijal koji koristite pri pruzanju usluge.' },
}

const JM_OPTIONS = ['kg', 'g', 'l', 'ml', 'kom', 'm', 'm2', 'sat', 'paket', 'set']

function fmt(n: number) {
  return n.toLocaleString('bs-BA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface Props {
  data: NormativData
  products: Product[]
  onChange: (data: NormativData) => void
}

export default function StepNormativ({ data, products, onChange }: Props) {
  const [activeProductId, setActiveProductId] = useState<string | null>(
    products.length > 0 ? products[0].id : null
  )

  function getProductNormativ(productId: string): ProductNormativ {
    return data.items.find(i => i.productId === productId) || {
      productId,
      mode: 'M1',
      materials: [{ ...DEFAULT_MATERIAL }],
    }
  }

  function updateProductNormativ(updated: ProductNormativ) {
    const exists = data.items.find(i => i.productId === updated.productId)
    if (exists) {
      onChange({ items: data.items.map(i => i.productId === updated.productId ? updated : i) })
    } else {
      onChange({ items: [...data.items, updated] })
    }
  }

  function setMode(productId: string, mode: NormativMode) {
    const pn = getProductNormativ(productId)
    updateProductNormativ({ ...pn, mode, materials: [{ ...DEFAULT_MATERIAL }] })
  }

  function addMaterial(productId: string) {
    const pn = getProductNormativ(productId)
    updateProductNormativ({ ...pn, materials: [...pn.materials, { ...DEFAULT_MATERIAL }] })
  }

  function removeMaterial(productId: string, idx: number) {
    const pn = getProductNormativ(productId)
    updateProductNormativ({ ...pn, materials: pn.materials.filter((_, i) => i !== idx) })
  }

  function updateMaterial(productId: string, idx: number, field: keyof MaterialItem, value: string | number) {
    const pn = getProductNormativ(productId)
    updateProductNormativ({
      ...pn,
      materials: pn.materials.map((m, i) => i === idx ? { ...m, [field]: value } : m)
    })
  }

  function calcTotal(pn: ProductNormativ): number {
    return pn.materials.reduce((s, m) => s + (m.normativ * m.cijena), 0)
  }

  if (products.length === 0) {
    return React.createElement('div', { style: { background: '#fef5f5', border: '1px solid #c0392b', borderRadius: '12px', padding: '24px', textAlign: 'center' } },
      React.createElement('p', { style: { color: '#c0392b', fontSize: '14px', fontWeight: '600' } }, 'Nema proizvoda u prodajnom asortimanu.'),
      React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', marginTop: '8px' } }, 'Molimo vas da prvo unesete proizvode/usluge u koraku 17 — Prodajni asortiman.')
    )
  }

  const activeProduct = products.find(p => p.id === activeProductId) || products[0]
  const activePn = getProductNormativ(activeProduct.id)
  const modeInfo = MODE_INFO[activePn.mode]
  const totalCost = calcTotal(activePn)

  const thStyle: React.CSSProperties = { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', fontWeight: '600' }
  const tdStyle: React.CSSProperties = { padding: '4px', border: '1px solid #e2e8f0' }
  const inputStyle: React.CSSProperties = { width: '100%', border: 'none', outline: 'none', fontSize: '12px', padding: '4px 6px', background: 'transparent', boxSizing: 'border-box' }
  const numStyle: React.CSSProperties = { ...inputStyle, textAlign: 'right' }

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Uputa: '),
      'Za svaki proizvod odaberite tip djelatnosti i unesite materijale. Troskovi materijala po jedinici se automatski prenose u Prodajni asortiman i P&L.'
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px' } },

      React.createElement('div', {},
        React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
          React.createElement('div', { style: { padding: '12px 16px', background: '#f5f7fb', borderBottom: '1px solid #e2e8f0' } },
            React.createElement('p', { style: { fontSize: '11px', fontWeight: '700', color: '#6b7a99', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 } }, 'Proizvodi')
          ),
          ...products.map((p, i) => {
            const pn = getProductNormativ(p.id)
            const cost = calcTotal(pn)
            const isActive = p.id === activeProduct.id
            return React.createElement('div', {
              key: p.id,
              onClick: () => setActiveProductId(p.id),
              style: { padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f5f7fb', borderLeft: isActive ? '3px solid #C9A227' : '3px solid transparent', background: isActive ? '#FFF8E7' : 'white', transition: 'all 0.15s' }
            },
              React.createElement('div', { style: { fontSize: '13px', fontWeight: isActive ? '700' : '500', color: '#1a2740', marginBottom: '2px' } }, p.naziv || 'Proizvod ' + (i + 1)),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { fontSize: '10px', fontWeight: '700', color: MODE_INFO[pn.mode].color, background: MODE_INFO[pn.mode].bg, padding: '1px 6px', borderRadius: '4px' } }, pn.mode),
                React.createElement('span', { style: { fontSize: '11px', color: '#6b7a99' } }, fmt(cost) + ' / jed.')
              )
            )
          })
        )
      ),

      React.createElement('div', {},
        React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '16px' } },
          React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', marginBottom: '4px' } }, activeProduct.naziv || 'Proizvod'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '12px', marginBottom: '16px' } }, 'Odaberite tip djelatnosti za ovaj proizvod / uslugu'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' } },
            ...(['M1', 'M3', 'M4'] as NormativMode[]).map(mode => {
              const info = MODE_INFO[mode]
              const isSelected = activePn.mode === mode
              return React.createElement('button', {
                key: mode,
                onClick: () => setMode(activeProduct.id, mode),
                style: { background: isSelected ? info.color : 'white', border: '2px solid ' + (isSelected ? info.color : '#e2e8f0'), borderRadius: '10px', padding: '12px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }
              },
                React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: isSelected ? 'white' : info.color, marginBottom: '2px' } }, mode),
                React.createElement('div', { style: { fontSize: '11px', color: isSelected ? 'rgba(255,255,255,0.8)' : '#1a2740', fontWeight: '600', marginBottom: '2px' } }, info.label.split(' — ')[1]),
                React.createElement('div', { style: { fontSize: '10px', color: isSelected ? 'rgba(255,255,255,0.65)' : '#6b7a99' } }, info.desc)
              )
            })
          )
        ),

        React.createElement('div', { style: { background: modeInfo.bg, borderRadius: '10px', padding: '10px 14px', border: '1px solid ' + modeInfo.color + '30', marginBottom: '16px', fontSize: '12px', color: modeInfo.color } },
          modeInfo.hint
        ),

        React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '12px' } },
          React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
            React.createElement('thead', {},
              React.createElement('tr', {},
                React.createElement('th', { style: thStyle }, activePn.mode === 'M1' ? 'Materijal / Stavka' : activePn.mode === 'M3' ? 'Naziv robe' : 'Potrosni materijal'),
                React.createElement('th', { style: { ...thStyle, width: '80px' } }, 'Jed. mjere'),
                React.createElement('th', { style: { ...thStyle, width: '120px' } }, activePn.mode === 'M3' ? 'Nabavna cijena' : 'Normativ / kol.'),
                React.createElement('th', { style: { ...thStyle, width: '120px' } }, 'Cijena po JM'),
                React.createElement('th', { style: { ...thStyle, width: '120px', background: '#243553' } }, 'Trosak / jed.'),
                React.createElement('th', { style: { ...thStyle, width: '30px', background: '#2d3748' } }, '')
              )
            ),
            React.createElement('tbody', {},
              ...activePn.materials.map((m, idx) =>
                React.createElement('tr', { key: idx, style: { borderBottom: '1px solid #e2e8f0' } },
                  React.createElement('td', { style: tdStyle },
                    React.createElement('input', { type: 'text', value: m.naziv, onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateMaterial(activeProduct.id, idx, 'naziv', e.target.value), placeholder: activePn.mode === 'M1' ? 'npr. Brasno T-500' : activePn.mode === 'M3' ? 'npr. Televizor Samsung' : 'npr. Ulje za masazu', style: inputStyle })
                  ),
                  React.createElement('td', { style: tdStyle },
                    activePn.mode === 'M3'
                      ? React.createElement('span', { style: { padding: '4px 6px', fontSize: '12px', color: '#6b7a99' } }, activeProduct.jm || 'kom')
                      : React.createElement('select', { value: m.jm, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => updateMaterial(activeProduct.id, idx, 'jm', e.target.value), style: { ...inputStyle, cursor: 'pointer' } },
                          ...JM_OPTIONS.map(jm => React.createElement('option', { key: jm, value: jm }, jm))
                        )
                  ),
                  React.createElement('td', { style: tdStyle },
                    activePn.mode === 'M3'
                      ? React.createElement('span', { style: { padding: '4px 6px', fontSize: '12px', color: '#6b7a99' } }, '1')
                      : React.createElement('input', { type: 'number', min: '0', step: '0.001', value: m.normativ || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateMaterial(activeProduct.id, idx, 'normativ', parseFloat(e.target.value) || 0), placeholder: '0.000', style: numStyle })
                  ),
                  React.createElement('td', { style: tdStyle },
                    React.createElement('input', { type: 'number', min: '0', step: '0.01', value: m.cijena || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateMaterial(activeProduct.id, idx, 'cijena', parseFloat(e.target.value) || 0), placeholder: '0.00', style: numStyle })
                  ),
                  React.createElement('td', { style: { ...tdStyle, background: '#EBF4FB', fontWeight: '600', textAlign: 'right' } },
                    fmt(activePn.mode === 'M3' ? m.cijena : m.normativ * m.cijena)
                  ),
                  React.createElement('td', { style: { ...tdStyle, textAlign: 'center' } },
                    activePn.materials.length > 1
                      ? React.createElement('button', { onClick: () => removeMaterial(activeProduct.id, idx), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '16px', lineHeight: 1 } }, 'x')
                      : null
                  )
                )
              ),
              React.createElement('tr', { style: { background: '#1a2740' } },
                React.createElement('td', { colSpan: 4, style: { padding: '10px 12px', color: 'white', fontWeight: '700', fontSize: '12px', border: 'none' } }, 'UKUPAN TROSAK MATERIJALA / JED.'),
                React.createElement('td', { style: { padding: '10px 12px', background: modeInfo.color, color: 'white', fontWeight: '800', textAlign: 'right', fontSize: '14px', border: 'none' } }, fmt(totalCost)),
                React.createElement('td', { style: { background: '#2d3748', border: 'none' } }, '')
              )
            )
          )
        ),

        React.createElement('button', {
          onClick: () => addMaterial(activeProduct.id),
          style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', marginBottom: '16px' }
        }, '+ Dodaj materijal'),

        totalCost > 0 && React.createElement('div', { style: { background: modeInfo.bg, borderRadius: '10px', padding: '16px 20px', border: '1px solid ' + modeInfo.color + '40', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: '11px', fontWeight: '700', color: '#6b7a99', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, 'Trosak materijala po jedinici → prenosi se u Prodajni asortiman'),
            React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99' } }, activeProduct.naziv || 'Proizvod')
          ),
          React.createElement('div', { style: { fontSize: '24px', fontWeight: '800', color: modeInfo.color } }, fmt(totalCost))
        )
      )
    )
  )
}
