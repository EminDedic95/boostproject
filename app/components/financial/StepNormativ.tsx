'use client'
import React, { useState } from 'react'
import { Product } from './StepProdajniAsortiman'

export interface MaterialItem {
  naziv: string
  jm: string
  normativ: number
  cijena: number
}

export interface ProductNormativ {
  productId: string
  materials: MaterialItem[]
}

export interface NormativData {
  items: ProductNormativ[]
}

const DEFAULT_MATERIAL: MaterialItem = { naziv: '', jm: 'kg', normativ: 0, cijena: 0 }

const JM_OPTIONS = ['kg', 'g', 'l', 'ml', 'kom', 'm', 'm2', 'sat', 'paket', 'set', 'mjesec']

const TIP_INFO: Record<string, { label: string, color: string, bg: string, hint: string, nazivLabel: string, normativLabel: string, cijenaLabel: string, showNormativ: boolean }> = {
  proizvod: {
    label: 'Proizvod',
    color: '#2E75B6',
    bg: '#f0f7ff',
    hint: 'Unesite materijale koji ulaze u jedan komad proizvoda (recept / normativ utroška).',
    nazivLabel: 'Materijal / Sirovina',
    normativLabel: 'Normativ (kol. / jed.)',
    cijenaLabel: 'Cijena po JM',
    showNormativ: true,
  },
  roba: {
    label: 'Roba',
    color: '#C9A227',
    bg: '#fffbf0',
    hint: 'Unesite nabavnu cijenu po jedinici za robu koju preprodajete.',
    nazivLabel: 'Naziv robe',
    normativLabel: '—',
    cijenaLabel: 'Nabavna cijena / jed.',
    showNormativ: false,
  },
  usluga: {
    label: 'Usluga',
    color: '#2d7a4f',
    bg: '#f0faf4',
    hint: 'Unesite potrošni materijal koji koristite pri pružanju usluge.',
    nazivLabel: 'Potrošni materijal',
    normativLabel: 'Normativ (kol. / jed.)',
    cijenaLabel: 'Cijena po JM',
    showNormativ: true,
  },
}

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

  function calcTotal(pn: ProductNormativ, tip: string): number {
    const info = TIP_INFO[tip] || TIP_INFO.proizvod
    return pn.materials.reduce((s, m) => {
      return s + (info.showNormativ ? m.normativ * m.cijena : m.cijena)
    }, 0)
  }

  if (products.length === 0) {
    return React.createElement('div', { style: { background: '#fef5f5', border: '1px solid #c0392b', borderRadius: '12px', padding: '24px', textAlign: 'center' } },
      React.createElement('p', { style: { color: '#c0392b', fontSize: '14px', fontWeight: '600' } }, 'Nema stavki u prodajnom asortimanu.'),
      React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', marginTop: '8px' } }, 'Molimo vas da prvo unesete proizvode/usluge u koraku 17 — Prodajni asortiman.')
    )
  }

  const activeProduct = products.find(p => p.id === activeProductId) || products[0]
  const activePn = getProductNormativ(activeProduct.id)
  const tipInfo = TIP_INFO[activeProduct.tip] || TIP_INFO.proizvod
  const totalCost = calcTotal(activePn, activeProduct.tip)

  const thStyle: React.CSSProperties = { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', fontWeight: '600' }
  const tdStyle: React.CSSProperties = { padding: '4px', border: '1px solid #e2e8f0' }
  const inputStyle: React.CSSProperties = { width: '100%', border: 'none', outline: 'none', fontSize: '12px', padding: '4px 6px', background: 'transparent', boxSizing: 'border-box' }
  const numStyle: React.CSSProperties = { ...inputStyle, textAlign: 'right' }

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Uputa: '),
      'Odaberite stavku s lijeve strane i unesite troškove materijala. Tip (proizvod/roba/usluga) je preuzet iz prethodnog koraka i određuje vrstu unosa.'
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px' } },

      // LEFT SIDEBAR
      React.createElement('div', {},
        React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
          React.createElement('div', { style: { padding: '12px 16px', background: '#f5f7fb', borderBottom: '1px solid #e2e8f0' } },
            React.createElement('p', { style: { fontSize: '11px', fontWeight: '700', color: '#6b7a99', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 } }, 'Stavke')
          ),
          ...products.map((p, i) => {
            const pn = getProductNormativ(p.id)
            const ti = TIP_INFO[p.tip] || TIP_INFO.proizvod
            const cost = calcTotal(pn, p.tip)
            const isActive = p.id === activeProduct.id
            return React.createElement('div', {
              key: p.id,
              onClick: () => setActiveProductId(p.id),
              style: { padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f5f7fb', borderLeft: isActive ? '3px solid #C9A227' : '3px solid transparent', background: isActive ? '#FFF8E7' : 'white', transition: 'all 0.15s' }
            },
              React.createElement('div', { style: { fontSize: '13px', fontWeight: isActive ? '700' : '500', color: '#1a2740', marginBottom: '4px' } }, p.naziv || 'Stavka ' + (i + 1)),
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('span', { style: { fontSize: '10px', fontWeight: '700', color: ti.color, background: ti.bg, padding: '1px 6px', borderRadius: '4px' } }, ti.label),
                React.createElement('span', { style: { fontSize: '11px', color: '#6b7a99' } }, fmt(cost) + ' / jed.')
              )
            )
          })
        )
      ),

      // RIGHT PANEL
      React.createElement('div', {},

        React.createElement('div', { style: { background: tipInfo.bg, borderRadius: '10px', padding: '14px 18px', border: '1px solid ' + tipInfo.color + '30', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: tipInfo.color, marginBottom: '2px' } }, activeProduct.naziv || 'Stavka'),
            React.createElement('div', { style: { fontSize: '12px', color: '#6b7a99' } }, tipInfo.hint)
          ),
          React.createElement('span', { style: { background: tipInfo.color, color: 'white', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', flexShrink: 0, marginLeft: '12px' } }, tipInfo.label)
        ),

        React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '12px' } },
          React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
            React.createElement('thead', {},
              React.createElement('tr', {},
                React.createElement('th', { style: thStyle }, tipInfo.nazivLabel),
                tipInfo.showNormativ && React.createElement('th', { style: { ...thStyle, width: '80px' } }, 'Jed. mjere'),
                tipInfo.showNormativ && React.createElement('th', { style: { ...thStyle, width: '120px' } }, tipInfo.normativLabel),
                React.createElement('th', { style: { ...thStyle, width: '140px' } }, tipInfo.cijenaLabel),
                React.createElement('th', { style: { ...thStyle, width: '130px', background: '#243553' } }, 'Trošak / jed.'),
                React.createElement('th', { style: { ...thStyle, width: '30px', background: '#2d3748' } }, '')
              )
            ),
            React.createElement('tbody', {},
              ...activePn.materials.map((m, idx) => {
                const trosak = tipInfo.showNormativ ? m.normativ * m.cijena : m.cijena
                return React.createElement('tr', { key: idx, style: { borderBottom: '1px solid #e2e8f0' } },
                  React.createElement('td', { style: tdStyle },
                    React.createElement('input', { type: 'text', value: m.naziv, onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateMaterial(activeProduct.id, idx, 'naziv', e.target.value), placeholder: activeProduct.tip === 'proizvod' ? 'npr. Brašno T-500' : activeProduct.tip === 'roba' ? 'npr. Televizor Samsung' : 'npr. Ulje za masažu', style: inputStyle })
                  ),
                  tipInfo.showNormativ && React.createElement('td', { style: tdStyle },
                    React.createElement('select', { value: m.jm, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => updateMaterial(activeProduct.id, idx, 'jm', e.target.value), style: { ...inputStyle, cursor: 'pointer' } },
                      ...JM_OPTIONS.map(jm => React.createElement('option', { key: jm, value: jm }, jm))
                    )
                  ),
                  tipInfo.showNormativ && React.createElement('td', { style: tdStyle },
                    React.createElement('input', { type: 'number', min: '0', step: '0.001', value: m.normativ || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateMaterial(activeProduct.id, idx, 'normativ', parseFloat(e.target.value) || 0), placeholder: '0,000', style: numStyle })
                  ),
                  React.createElement('td', { style: tdStyle },
                    React.createElement('input', { type: 'number', min: '0', step: '0.01', value: m.cijena || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateMaterial(activeProduct.id, idx, 'cijena', parseFloat(e.target.value) || 0), placeholder: '0,00', style: numStyle })
                  ),
                  React.createElement('td', { style: { ...tdStyle, background: '#EBF4FB', fontWeight: '600', textAlign: 'right' } },
                    fmt(trosak)
                  ),
                  React.createElement('td', { style: { ...tdStyle, textAlign: 'center' } },
                    activePn.materials.length > 1
                      ? React.createElement('button', { onClick: () => removeMaterial(activeProduct.id, idx), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '16px', lineHeight: 1 } }, '×')
                      : null
                  )
                )
              }),
              React.createElement('tr', { style: { background: '#1a2740' } },
                React.createElement('td', { colSpan: tipInfo.showNormativ ? 4 : 2, style: { padding: '10px 12px', color: 'white', fontWeight: '700', fontSize: '12px', border: 'none' } }, 'UKUPAN TROŠAK MATERIJALA / JED.'),
                React.createElement('td', { style: { padding: '10px 12px', background: tipInfo.color, color: 'white', fontWeight: '800', textAlign: 'right', fontSize: '14px', border: 'none' } }, fmt(totalCost)),
                React.createElement('td', { style: { background: '#2d3748', border: 'none' } }, '')
              )
            )
          )
        ),

        React.createElement('button', {
          onClick: () => addMaterial(activeProduct.id),
          style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', marginBottom: '16px' }
        }, '+ Dodaj stavku'),

        totalCost > 0 && React.createElement('div', { style: { background: tipInfo.bg, borderRadius: '10px', padding: '16px 20px', border: '1px solid ' + tipInfo.color + '40', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: '11px', fontWeight: '700', color: '#6b7a99', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, 'Trošak materijala po jedinici — prenosi se u P&L'),
            React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99' } }, activeProduct.naziv || 'Stavka')
          ),
          React.createElement('div', { style: { fontSize: '24px', fontWeight: '800', color: tipInfo.color } }, fmt(totalCost))
        )
      )
    )
  )
}
