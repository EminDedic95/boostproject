'use client'
import React from 'react'
import { StalnaData } from './StepStalnaData'

export interface TrosakLine {
  naziv: string
  mjesecniIznos: number
}

export interface Zaposleni {
  ime: string
  pozicija: string
  brutoPlataMjes: number
}

export interface TroskoviData {
  ostaliTroskovi: TrosakLine[]
  zaposleni: Zaposleni[]
  growthG2: number
  growthG3: number
}

const DEFAULT_TROSKOVI: TrosakLine[] = [
  { naziv: 'Troskovi transporta / odrzavanja vozila', mjesecniIznos: 0 },
  { naziv: 'Zakupnina poslovnog prostora (renta)', mjesecniIznos: 0 },
  { naziv: 'Komunalije (struja, voda, grijanje, internet)', mjesecniIznos: 0 },
  { naziv: 'Investicijsko odrzavanje', mjesecniIznos: 0 },
  { naziv: 'Ostali troskovi direktno vezani za pr./uslugu', mjesecniIznos: 0 },
  { naziv: 'Dnevnice i putni troskovi', mjesecniIznos: 0 },
  { naziv: 'Naknade vanjskim saradnicima / outsourcing', mjesecniIznos: 0 },
  { naziv: 'Osiguranje imovine i odgovornosti', mjesecniIznos: 0 },
  { naziv: 'Uredski i potrosni materijal', mjesecniIznos: 0 },
  { naziv: 'Poslovne takse, licence, certifikati', mjesecniIznos: 0 },
]

const AMORT_RATES: Record<string, number> = {
  infrastruktura: 40,
  oprema: 10,
  vozila: 5,
  zemljiste: 0,
}

function fmt(n: number) {
  return n.toLocaleString('bs-BA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function calcAmortizacija(stalnaData: StalnaData): number {
  let total = 0
  for (const [cat, rate] of Object.entries(AMORT_RATES)) {
    if (rate === 0) continue
    const items = stalnaData[cat as keyof StalnaData] as Array<{ kolicina: number, vrijednost: number }>
    if (Array.isArray(items)) {
      const catTotal = items.reduce((s, i) => s + i.kolicina * i.vrijednost, 0)
      total += catTotal / rate
    }
  }
  return total
}

interface Props {
  data: TroskoviData
  stalnaData: StalnaData
  growthG2: number
  growthG3: number
  onChange: (data: TroskoviData) => void
}

export default function StepTroskovi({ data, stalnaData, growthG2, growthG3, onChange }: Props) {

  function updateTrosak(idx: number, field: keyof TrosakLine, value: string | number) {
    onChange({ ...data, ostaliTroskovi: data.ostaliTroskovi.map((t, i) => i === idx ? { ...t, [field]: value } : t) })
  }

  function addTrosak() {
    onChange({ ...data, ostaliTroskovi: [...data.ostaliTroskovi, { naziv: '', mjesecniIznos: 0 }] })
  }

  function removeTrosak(idx: number) {
    onChange({ ...data, ostaliTroskovi: data.ostaliTroskovi.filter((_, i) => i !== idx) })
  }

  function updateZaposleni(idx: number, field: keyof Zaposleni, value: string | number) {
    onChange({ ...data, zaposleni: data.zaposleni.map((z, i) => i === idx ? { ...z, [field]: value } : z) })
  }

  function addZaposleni() {
    onChange({ ...data, zaposleni: [...data.zaposleni, { ime: '', pozicija: '', brutoPlataMjes: 0 }] })
  }

  function removeZaposleni(idx: number) {
    onChange({ ...data, zaposleni: data.zaposleni.filter((_, i) => i !== idx) })
  }

  const amortizacijaGodisnja = calcAmortizacija(stalnaData)
  const totalTroskoviMjes = data.ostaliTroskovi.reduce((s, t) => s + (t.mjesecniIznos || 0), 0)
  const totalTroskoviG1 = totalTroskoviMjes * 12
  const totalTroskoviG2 = totalTroskoviG1 * growthG2
  const totalTroskoviG3 = totalTroskoviG1 * growthG3
  const totalPlataGod = data.zaposleni.reduce((s, z) => s + (z.brutoPlataMjes || 0) * 12, 0)
  const totalPlataG2 = totalPlataGod * growthG2
  const totalPlataG3 = totalPlataGod * growthG3

  const thStyle: React.CSSProperties = { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', fontWeight: '600' }
  const tdStyle: React.CSSProperties = { padding: '4px 8px', border: '1px solid #e2e8f0', fontSize: '12px' }
  const inputStyle: React.CSSProperties = { width: '100%', border: 'none', outline: 'none', fontSize: '12px', background: 'transparent', boxSizing: 'border-box' }

  return React.createElement('div', {},

    React.createElement('div', { style: { background: '#EBF4FB', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', fontSize: '13px', color: '#1F4E79', lineHeight: 1.6 } },
      React.createElement('strong', {}, 'Uputa: '),
      'Unesite sve operativne troskove i troskove radne snage. Amortizacija se automatski racuna na osnovu stalnih sredstava iz koraka 19.'
    ),

    React.createElement('div', { style: { background: '#f0faf4', borderRadius: '10px', padding: '16px 20px', border: '1px solid #2d7a4f30', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      React.createElement('div', {},
        React.createElement('div', { style: { fontSize: '12px', fontWeight: '700', color: '#2d7a4f', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, 'Amortizacija (automatski iz stalnih sredstava)'),
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99' } }, 'Infrastruktura/40 god. + Oprema/10 god. + Vozila/5 god.')
      ),
      React.createElement('div', { style: { textAlign: 'right' } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', marginBottom: '2px' } }, 'Godisnja amortizacija'),
        React.createElement('div', { style: { fontSize: '22px', fontWeight: '800', color: '#2d7a4f' } }, fmt(amortizacijaGodisnja))
      )
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '16px' } },
      React.createElement('div', { style: { padding: '14px 20px', background: '#f5f7fb', borderBottom: '1px solid #e2e8f0' } },
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', margin: 0 } }, 'Ostali troskovi poslovanja')
      ),
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
          ...data.ostaliTroskovi.map((t, idx) => {
            const g1 = (t.mjesecniIznos || 0) * 12
            return React.createElement('tr', { key: idx, style: { borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? 'white' : '#fafafa' } },
              React.createElement('td', { style: { ...tdStyle, textAlign: 'center', color: '#6b7a99', fontWeight: '600' } }, idx + 1),
              React.createElement('td', { style: tdStyle },
                React.createElement('input', { type: 'text', value: t.naziv, onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateTrosak(idx, 'naziv', e.target.value), style: inputStyle })
              ),
              React.createElement('td', { style: tdStyle },
                React.createElement('input', { type: 'number', min: '0', step: '0.01', value: t.mjesecniIznos || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateTrosak(idx, 'mjesecniIznos', parseFloat(e.target.value) || 0), placeholder: '0.00', style: { ...inputStyle, textAlign: 'right' } })
              ),
              React.createElement('td', { style: { ...tdStyle, background: '#EBF4FB', textAlign: 'right', fontWeight: '600' } }, fmt(g1)),
              React.createElement('td', { style: { ...tdStyle, background: '#f0faf4', textAlign: 'right', color: '#2d7a4f' } }, fmt(g1 * growthG2)),
              React.createElement('td', { style: { ...tdStyle, background: '#f0f7ff', textAlign: 'right', color: '#2E75B6' } }, fmt(g1 * growthG3)),
              React.createElement('td', { style: { ...tdStyle, textAlign: 'center' } },
                data.ostaliTroskovi.length > 1
                  ? React.createElement('button', { onClick: () => removeTrosak(idx), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '14px' } }, 'x')
                  : null
              )
            )
          }),
          React.createElement('tr', { style: { background: '#1a2740' } },
            React.createElement('td', { colSpan: 3, style: { padding: '8px 12px', color: 'white', fontWeight: '700', fontSize: '11px', border: 'none' } }, 'UKUPNO OSTALI TROSKOVI'),
            React.createElement('td', { style: { padding: '8px 12px', background: '#1F4E79', color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(totalTroskoviG1)),
            React.createElement('td', { style: { padding: '8px 12px', background: '#2d4a2d', color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(totalTroskoviG2)),
            React.createElement('td', { style: { padding: '8px 12px', background: '#1a3a5c', color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(totalTroskoviG3)),
            React.createElement('td', { style: { background: '#2d3748', border: 'none' } }, '')
          )
        )
      ),
      React.createElement('div', { style: { padding: '12px 20px' } },
        React.createElement('button', { onClick: addTrosak, style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '6px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' } }, '+ Dodaj trosak')
      )
    ),

    React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '16px' } },
      React.createElement('div', { style: { padding: '14px 20px', background: '#f5f7fb', borderBottom: '1px solid #e2e8f0' } },
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', margin: 0 } }, 'Troskovi radne snage — Zaposleni')
      ),
      React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
        React.createElement('thead', {},
          React.createElement('tr', {},
            React.createElement('th', { style: { ...thStyle, width: '30px' } }, '#'),
            React.createElement('th', { style: thStyle }, 'Ime i prezime'),
            React.createElement('th', { style: thStyle }, 'Pozicija / Uloga'),
            React.createElement('th', { style: { ...thStyle, width: '150px', textAlign: 'right' } }, 'Bruto plata / mjes.'),
            React.createElement('th', { style: { ...thStyle, width: '130px', textAlign: 'right', background: '#243553' } }, 'Godisnja bruto'),
            React.createElement('th', { style: { ...thStyle, width: '30px', background: '#2d3748' } }, '')
          )
        ),
        React.createElement('tbody', {},
          data.zaposleni.length === 0
            ? React.createElement('tr', {},
                React.createElement('td', { colSpan: 6, style: { padding: '24px', textAlign: 'center', color: '#6b7a99', fontSize: '12px' } }, 'Nema zaposlenih. Kliknite "+ Dodaj zaposlenog" ispod.')
              )
            : null,
          ...data.zaposleni.map((z, idx) =>
            React.createElement('tr', { key: idx, style: { borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? 'white' : '#fafafa' } },
              React.createElement('td', { style: { ...tdStyle, textAlign: 'center', color: '#6b7a99', fontWeight: '600' } }, idx + 1),
              React.createElement('td', { style: tdStyle },
                React.createElement('input', { type: 'text', value: z.ime, onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateZaposleni(idx, 'ime', e.target.value), placeholder: 'Ime i prezime', style: inputStyle })
              ),
              React.createElement('td', { style: tdStyle },
                React.createElement('input', { type: 'text', value: z.pozicija, onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateZaposleni(idx, 'pozicija', e.target.value), placeholder: 'npr. Direktor, Pekar, Vozac...', style: inputStyle })
              ),
              React.createElement('td', { style: tdStyle },
                React.createElement('input', { type: 'number', min: '0', step: '0.01', value: z.brutoPlataMjes || '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateZaposleni(idx, 'brutoPlataMjes', parseFloat(e.target.value) || 0), placeholder: '0.00', style: { ...inputStyle, textAlign: 'right' } })
              ),
              React.createElement('td', { style: { ...tdStyle, background: '#EBF4FB', textAlign: 'right', fontWeight: '600' } }, fmt((z.brutoPlataMjes || 0) * 12)),
              React.createElement('td', { style: { ...tdStyle, textAlign: 'center' } },
                React.createElement('button', { onClick: () => removeZaposleni(idx), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '14px' } }, 'x')
              )
            )
          ),
          data.zaposleni.length > 0 && React.createElement('tr', { style: { background: '#1a2740' } },
            React.createElement('td', { colSpan: 4, style: { padding: '8px 12px', color: 'white', fontWeight: '700', fontSize: '11px', border: 'none' } }, 'UKUPNE BRUTO PLATE — ' + data.zaposleni.length + ' zaposlenih'),
            React.createElement('td', { style: { padding: '8px 12px', background: '#1F4E79', color: 'white', fontWeight: '800', textAlign: 'right', border: 'none' } }, fmt(totalPlataGod)),
            React.createElement('td', { style: { background: '#2d3748', border: 'none' } }, '')
          ) || null
        )
      ),
      React.createElement('div', { style: { padding: '12px 20px' } },
        React.createElement('button', { onClick: addZaposleni, style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '6px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' } }, '+ Dodaj zaposlenog')
      )
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' } },
      ...[
        { label: 'Ostali troskovi G1', value: fmt(totalTroskoviG1), color: '#1a2740', bg: '#EBF4FB' },
        { label: 'Ukupne plate G1', value: fmt(totalPlataGod), color: '#2E75B6', bg: '#f0f7ff' },
        { label: 'Amortizacija godisnja', value: fmt(amortizacijaGodisnja), color: '#2d7a4f', bg: '#f0faf4' },
        { label: 'Ostali troskovi G2', value: fmt(totalTroskoviG2), color: '#1a2740', bg: '#f5f7fb' },
        { label: 'Ukupne plate G2', value: fmt(totalPlataG2), color: '#2E75B6', bg: '#f5f7fb' },
        { label: 'Ukupno operativni troskovi G1', value: fmt(totalTroskoviG1 + totalPlataGod + amortizacijaGodisnja), color: '#C9A227', bg: '#fffbf0' },
      ].map((stat, i) => React.createElement('div', { key: i, style: { background: stat.bg, borderRadius: '10px', padding: '14px 16px', border: '1px solid #e2e8f0' } },
        React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, stat.label),
        React.createElement('div', { style: { fontSize: '16px', fontWeight: '800', color: stat.color } }, stat.value)
      ))
    )
  )
}
