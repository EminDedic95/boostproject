'use client'
import React, { useState } from 'react'

function CanvasCell({ title, value, onChange, wide }: { title: string, value: string, onChange: (v: string) => void, wide?: boolean }) {
  const [focused, setFocused] = useState(false)
  return React.createElement('div', {
    style: {
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: focused ? '14px' : '10px',
      background: focused ? 'white' : '#fafafa',
      gridColumn: wide ? 'span 2' : 'span 1',
      transition: 'all 0.2s ease',
      transform: focused ? 'scale(1.02)' : 'scale(1)',
      boxShadow: focused ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
      zIndex: focused ? 10 : 1,
      position: 'relative',
      minHeight: focused ? '120px' : '80px',
    }
  },
    React.createElement('div', { style: { fontSize: '10px', fontWeight: '700', color: '#1F4E79', letterSpacing: '0.06em', marginBottom: '6px', textTransform: 'uppercase' } }, title),
    React.createElement('textarea', {
      value: value,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      placeholder: 'Kliknite za unos...',
      style: {
        width: '100%',
        border: 'none',
        outline: 'none',
        resize: 'none',
        background: 'transparent',
        fontSize: '13px',
        color: '#1a2740',
        lineHeight: 1.5,
        minHeight: focused ? '80px' : '40px',
        transition: 'min-height 0.2s ease',
        fontFamily: 'Segoe UI, sans-serif',
      }
    })
  )
}

function SwotCell({ title, value, onChange, color }: { title: string, value: string, onChange: (v: string) => void, color: string }) {
  const [focused, setFocused] = useState(false)
  return React.createElement('div', {
    style: {
      border: '2px solid ' + color,
      borderRadius: '8px',
      padding: focused ? '16px' : '12px',
      background: focused ? 'white' : color + '10',
      transition: 'all 0.2s ease',
      transform: focused ? 'scale(1.03)' : 'scale(1)',
      boxShadow: focused ? '0 4px 20px rgba(0,0,0,0.12)' : 'none',
      zIndex: focused ? 10 : 1,
      position: 'relative',
      minHeight: focused ? '160px' : '120px',
    }
  },
    React.createElement('div', { style: { fontSize: '12px', fontWeight: '700', color: color, marginBottom: '8px' } }, title),
    React.createElement('textarea', {
      value: value,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      placeholder: 'Kliknite za unos...',
      style: {
        width: '100%',
        border: 'none',
        outline: 'none',
        resize: 'none',
        background: 'transparent',
        fontSize: '13px',
        color: '#1a2740',
        lineHeight: 1.5,
        minHeight: focused ? '120px' : '80px',
        transition: 'min-height 0.2s ease',
        fontFamily: 'Segoe UI, sans-serif',
      }
    })
  )
}

function PestCell({ title, value, onChange, color }: { title: string, value: string, onChange: (v: string) => void, color: string }) {
  const [focused, setFocused] = useState(false)
  return React.createElement('div', {
    style: {
      border: '2px solid ' + color,
      borderRadius: '8px',
      padding: focused ? '16px' : '12px',
      background: focused ? 'white' : color + '15',
      transition: 'all 0.2s ease',
      transform: focused ? 'scale(1.03)' : 'scale(1)',
      boxShadow: focused ? '0 4px 20px rgba(0,0,0,0.12)' : 'none',
      zIndex: focused ? 10 : 1,
      position: 'relative',
      minHeight: focused ? '160px' : '120px',
    }
  },
    React.createElement('div', { style: { fontSize: '12px', fontWeight: '700', color: color, marginBottom: '8px' } }, title),
    React.createElement('textarea', {
      value: value,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      placeholder: 'Kliknite za unos...',
      style: {
        width: '100%',
        border: 'none',
        outline: 'none',
        resize: 'none',
        background: 'transparent',
        fontSize: '13px',
        color: '#1a2740',
        lineHeight: 1.5,
        minHeight: focused ? '120px' : '80px',
        transition: 'min-height 0.2s ease',
        fontFamily: 'Segoe UI, sans-serif',
      }
    })
  )
}

function RiskRow({ row, onChange, onDelete }: { row: {risk: string, prob: string, impact: string, mitigation: string}, onChange: (field: string, val: string) => void, onDelete: () => void }) {
  return React.createElement('tr', {},
    ...['risk', 'prob', 'impact', 'mitigation'].map(field =>
      React.createElement('td', { key: field, style: { padding: '8px', border: '1px solid #e2e8f0' } },
        React.createElement('input', {
          type: 'text',
          value: row[field as keyof typeof row],
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value),
          style: { width: '100%', border: 'none', outline: 'none', fontSize: '13px', background: 'transparent', fontFamily: 'Segoe UI, sans-serif' }
        })
      )
    ),
    React.createElement('td', { style: { padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' } },
      React.createElement('button', {
        onClick: onDelete,
        style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '16px' }
      }, 'x')
    )
  )
}

const SIMPLE_STEPS = [1, 5, 6, 7, 8]

const STEP_LABELS = ['Biznis ideja', 'Canvas model', 'PEST analiza', 'SWOT analiza', 'Trziste', 'Marketing', 'Procesi i tim', 'Rizici', 'Finansije']
const STEP_TAGS = ['DIO I', 'DIO II', 'DIO III', 'DIO IV', 'DIO V', 'DIO VI', 'DIO VII', 'DIO VII', 'DIO VIII']
const STEP_TITLES = ['Opisite svoju poslovnu ideju', 'Business Model Canvas', 'PEST Analiza', 'SWOT Analiza', 'Analiza trzista', 'Marketinski plan', 'Poslovni procesi i organizacija', 'Analiza rizika', 'Ekonomsko-finansijske projekcije']
const STEP_DESCS = [
  'Ukratko opisite cime se vase preduzece bavi, koji problem rjesava i ko su vasi kupci.',
  'Canvas model prikazuje kako vase preduzece kreira, isporucuje i zadrzava vrijednost kroz 9 kljucnih blokova.',
  'Analiza eksternog okruzenja kroz Politicke, Ekonomske, Socijalne i Tehnoloske faktore.',
  'Analiza internih snaga i slabosti te vanjskih prilika i prijetnji vaseg biznisa.',
  'Istrazite trziste, konkurenciju i profil vaseg idealnog kupca.',
  'Definisite kako cete doci do kupaca i komunicirati svoju vrijednosnu ponudu.',
  'Opisite kako funkcionise vase preduzece iznutra i ko su kljucni ljudi.',
  'Identificirajte kljucne rizike i definisite mjere za njihovo ublazavanje.',
  'Procijenite prihode, troskove i finansijsku odrzivost vaseg biznisa.',
]

const SIMPLE_FIELDS: Record<number, {label: string, placeholder: string, type: string}[]> = {
  1: [
    { label: 'Naziv preduzeca', placeholder: 'npr. Pekara Mostar d.o.o.', type: 'input' },
    { label: 'Opis poslovne ideje', placeholder: 'Opisite svoju ideju...', type: 'textarea' },
    { label: 'Koji problem rjesavate', placeholder: 'Problem koji vas biznis rjesava...', type: 'textarea' },
    { label: 'Ko su vasi kupci', placeholder: 'Opisite ciljnu grupu...', type: 'textarea' },
  ],
  5: [
    { label: 'Velicina trzista', placeholder: 'Koliko je veliko vase ciljno trziste?', type: 'textarea' },
    { label: 'Ciljni segment', placeholder: 'Koji segment trzista ciljate?', type: 'textarea' },
    { label: 'Profil idealnog kupca', placeholder: 'Opisite vaseg idealnog kupca...', type: 'textarea' },
    { label: 'Analiza konkurencije', placeholder: 'Ko su vasi glavni konkurenti?', type: 'textarea' },
  ],
  6: [
    { label: 'Marketinski ciljevi', placeholder: 'Sta zelite postici marketingom?', type: 'textarea' },
    { label: 'Marketinski kanali', placeholder: 'Koje kanale cete koristiti?', type: 'textarea' },
    { label: 'Budzet za marketing', placeholder: 'Koliko planirate uloziti?', type: 'input' },
    { label: 'Kljucne poruke', placeholder: 'Sta je vasa glavna marketinska poruka?', type: 'textarea' },
  ],
  7: [
    { label: 'Kljucni poslovni procesi', placeholder: 'Opisite glavne procese...', type: 'textarea' },
    { label: 'Organizacijska struktura', placeholder: 'Ko su kljucni ljudi i njihove uloge?', type: 'textarea' },
    { label: 'Pravni oblik registracije', placeholder: 'npr. d.o.o., s.p., d.d...', type: 'input' },
  ],
  9: [
    { label: 'Pocetna ulaganja KM', placeholder: 'Koliko novca trebate za pocetak?', type: 'input' },
    { label: 'Planirani mjesecni prihodi KM', placeholder: 'Koliko prihoda ocekujete?', type: 'input' },
    { label: 'Planirani mjesecni troskovi KM', placeholder: 'Koliki su vasi troskovi?', type: 'input' },
    { label: 'Tacka pokrica troskova', placeholder: 'Kada ocekujete break-even?', type: 'textarea' },
    { label: 'Izvori finansiranja', placeholder: 'Vlastita sredstva, kredit, grant...', type: 'textarea' },
  ],
}

export default function Builder() {
  const [current, setCurrent] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [canvas, setCanvas] = useState<Record<string, string>>({})
  const [pest, setPest] = useState<Record<string, string>>({})
  const [swot, setSwot] = useState<Record<string, string>>({})
  const [risks, setRisks] = useState([{ risk: '', prob: '', impact: '', mitigation: '' }])
  const [generating, setGenerating] = useState(false)

  const totalSteps = 9
  const pct = Math.round(((current + 1) / totalSteps) * 100)

  function handleFormChange(label: string, value: string) {
    setFormData(prev => ({ ...prev, [label]: value }))
  }

  function addRisk() {
    setRisks(prev => [...prev, { risk: '', prob: '', impact: '', mitigation: '' }])
  }

  function updateRisk(i: number, field: string, val: string) {
    setRisks(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r))
  }

  function deleteRisk(i: number) {
    setRisks(prev => prev.filter((_, idx) => idx !== i))
  }

  async function generatePDF() {
    setGenerating(true)
    const res = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData, canvas, pest, swot, risks })
    })
    const html = await res.text()
    const win = window.open('', '_blank')
    if (win) {
      win.document.write(html)
      win.document.close()
      setTimeout(() => win.print(), 500)
    }
    setGenerating(false)
  }

  function renderStep() {
    const stepNum = current + 1

    if (stepNum === 2) {
      return React.createElement('div', {},
        React.createElement('p', { style: { fontSize: '12px', color: '#6b7a99', marginBottom: '16px' } }, 'Kliknite na svaki blok i unesite informacije direktno.'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' } },
          React.createElement(CanvasCell, { title: 'Kljucni partneri', value: canvas['partneri'] || '', onChange: v => setCanvas(p => ({...p, partneri: v})) }),
          React.createElement('div', { style: { display: 'grid', gridTemplateRows: '1fr 1fr', gap: '8px' } },
            React.createElement(CanvasCell, { title: 'Kljucne aktivnosti', value: canvas['aktivnosti'] || '', onChange: v => setCanvas(p => ({...p, aktivnosti: v})) }),
            React.createElement(CanvasCell, { title: 'Kljucni resursi', value: canvas['resursi'] || '', onChange: v => setCanvas(p => ({...p, resursi: v})) })
          ),
          React.createElement(CanvasCell, { title: 'Vrijednosna ponuda', value: canvas['ponuda'] || '', onChange: v => setCanvas(p => ({...p, ponuda: v})) }),
          React.createElement('div', { style: { display: 'grid', gridTemplateRows: '1fr 1fr', gap: '8px' } },
            React.createElement(CanvasCell, { title: 'Odnosi s kupcima', value: canvas['odnosi'] || '', onChange: v => setCanvas(p => ({...p, odnosi: v})) }),
            React.createElement(CanvasCell, { title: 'Kanali prodaje', value: canvas['kanali'] || '', onChange: v => setCanvas(p => ({...p, kanali: v})) })
          ),
          React.createElement(CanvasCell, { title: 'Segmenti kupaca', value: canvas['segmenti'] || '', onChange: v => setCanvas(p => ({...p, segmenti: v})) }),
          React.createElement(CanvasCell, { title: 'Struktura troskova', value: canvas['troskovi'] || '', onChange: v => setCanvas(p => ({...p, troskovi: v})), wide: true }),
          React.createElement(CanvasCell, { title: 'Tokovi prihoda', value: canvas['prihodi'] || '', onChange: v => setCanvas(p => ({...p, prihodi: v})), wide: true })
        )
      )
    }

    if (stepNum === 3) {
      return React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
        React.createElement(PestCell, { title: 'P — Politicki faktori', value: pest['p'] || '', onChange: v => setPest(prev => ({...prev, p: v})), color: '#2E75B6' }),
        React.createElement(PestCell, { title: 'E — Ekonomski faktori', value: pest['e'] || '', onChange: v => setPest(prev => ({...prev, e: v})), color: '#C9A227' }),
        React.createElement(PestCell, { title: 'S — Socijalni faktori', value: pest['s'] || '', onChange: v => setPest(prev => ({...prev, s: v})), color: '#2d7a4f' }),
        React.createElement(PestCell, { title: 'T — Tehnoloski faktori', value: pest['t'] || '', onChange: v => setPest(prev => ({...prev, t: v})), color: '#7B2D8B' })
      )
    }

    if (stepNum === 4) {
      return React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
        React.createElement(SwotCell, { title: 'Snage (Strengths)', value: swot['s'] || '', onChange: v => setSwot(prev => ({...prev, s: v})), color: '#2d7a4f' }),
        React.createElement(SwotCell, { title: 'Slabosti (Weaknesses)', value: swot['w'] || '', onChange: v => setSwot(prev => ({...prev, w: v})), color: '#e53e3e' }),
        React.createElement(SwotCell, { title: 'Prilike (Opportunities)', value: swot['o'] || '', onChange: v => setSwot(prev => ({...prev, o: v})), color: '#2E75B6' }),
        React.createElement(SwotCell, { title: 'Prijetnje (Threats)', value: swot['t'] || '', onChange: v => setSwot(prev => ({...prev, t: v})), color: '#C9A227' })
      )
    }

    if (stepNum === 8) {
      return React.createElement('div', {},
        React.createElement('div', { style: { overflowX: 'auto', marginBottom: '16px' } },
          React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' } },
            React.createElement('thead', {},
              React.createElement('tr', {},
                ...['Rizik', 'Vjerovatnoca', 'Uticaj', 'Mjere ublazavanja', ''].map(h =>
                  React.createElement('th', { key: h, style: { padding: '10px 8px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '12px', fontWeight: '600' } }, h)
                )
              )
            ),
            React.createElement('tbody', {},
              ...risks.map((row, i) =>
                React.createElement(RiskRow, {
                  key: i,
                  row,
                  onChange: (field, val) => updateRisk(i, field, val),
                  onDelete: () => deleteRisk(i)
                })
              )
            )
          )
        ),
        React.createElement('button', {
          onClick: addRisk,
          style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }
        }, '+ Dodaj rizik')
      )
    }

    const fields = SIMPLE_FIELDS[stepNum] || []
    return React.createElement('div', {},
      ...fields.map(f =>
        React.createElement('div', { key: f.label, style: { background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '12px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '8px', fontSize: '13px' } }, f.label),
          f.type === 'input'
            ? React.createElement('input', {
                type: 'text',
                placeholder: f.placeholder,
                value: formData[f.label] || '',
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleFormChange(f.label, e.target.value),
                style: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }
              })
            : React.createElement('textarea', {
                placeholder: f.placeholder,
                rows: 3,
                value: formData[f.label] || '',
                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => handleFormChange(f.label, e.target.value),
                style: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }
              })
        )
      )
    )
  }

  return React.createElement('div', {
    style: { fontFamily: 'Segoe UI, sans-serif', height: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr', overflow: 'hidden' }
  },
    React.createElement('nav', {
      style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
    },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
        React.createElement('span', { style: { fontSize: '13px', color: '#6b7a99' } }, 'DIO ' + (current + 1) + ' od ' + totalSteps),
        React.createElement('div', { style: { width: '120px', height: '4px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' } },
          React.createElement('div', { style: { width: pct + '%', height: '100%', background: '#C9A227', borderRadius: '4px', transition: 'width 0.4s ease' } })
        )
      )
    ),
    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: '220px 1fr 300px', overflow: 'hidden' }
    },
      React.createElement('aside', {
        style: { borderRight: '1px solid #e2e8f0', overflowY: 'auto', padding: '16px 0', background: 'white' }
      },
        ...STEP_LABELS.map((label, i) =>
          React.createElement('div', {
            key: i,
            onClick: () => setCurrent(i),
            style: {
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 16px',
              borderLeft: i === current ? '3px solid #C9A227' : '3px solid transparent',
              background: i === current ? '#FFF8E7' : 'transparent',
              cursor: 'pointer'
            }
          },
            React.createElement('div', {
              style: {
                width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                background: i === current ? '#C9A227' : i < current ? '#2d7a4f' : '#f5f7fb',
                border: i === current ? 'none' : '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 'bold',
                color: i === current ? '#1a2740' : i < current ? 'white' : '#6b7a99'
              }
            }, i < current ? 'v' : i + 1),
            React.createElement('span', {
              style: { fontSize: '13px', color: i === current ? '#1a2740' : '#6b7a99', fontWeight: i === current ? '600' : '400' }
            }, label)
          )
        )
      ),
      React.createElement('main', {
        style: { background: '#f5f7fb', overflowY: 'auto', padding: '32px 40px' }
      },
        React.createElement('div', { style: { maxWidth: '100%' } },
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em' } }, STEP_TAGS[current]),
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '22px', fontWeight: 'bold', margin: '10px 0 4px' } }, STEP_TITLES[current]),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', marginBottom: '20px', lineHeight: 1.6 } }, STEP_DESCS[current]),
          renderStep(),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '24px' } },
            current > 0 ? React.createElement('button', {
              onClick: () => setCurrent(current - 1),
              style: { background: 'white', color: '#1a2740', border: '1px solid #e2e8f0', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }
            }, 'Nazad') : React.createElement('span', {}),
            current === totalSteps - 1
              ? React.createElement('button', {
                  onClick: generatePDF,
                  style: { background: '#C9A227', color: '#1a2740', border: 'none', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }
                }, generating ? 'Generisem...' : 'Preuzmi biznis plan')
              : React.createElement('button', {
                  onClick: () => setCurrent(current + 1),
                  style: { background: '#1a2740', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }
                }, 'Naprijed')
          )
        )
      ),
      React.createElement('aside', {
        style: { borderLeft: '1px solid #e2e8f0', background: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden' }
      },
        React.createElement('div', { style: { padding: '16px 20px', borderBottom: '1px solid #e2e8f0' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
            React.createElement('div', { style: { width: '8px', height: '8px', borderRadius: '50%', background: '#2d7a4f' } }),
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, 'AI asistent'),
            React.createElement('span', { style: { fontSize: '11px', color: '#6b7a99', marginLeft: 'auto' } }, 'BOOST vodic')
          )
        ),
        React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 20px' } },
          React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '12px', padding: '14px' } },
            React.createElement('p', { style: { fontSize: '13px', color: '#1a2740', lineHeight: 1.6, margin: 0 } }, 'Zdravo! Nalazite se na koraku ' + STEP_TITLES[current] + '. Postavite mi pitanje i pomoci cu vam na osnovu BOOST vodica.')
          )
        ),
        React.createElement('div', { style: { padding: '12px 16px', borderTop: '1px solid #e2e8f0' } },
          React.createElement('div', { style: { display: 'flex', gap: '8px' } },
            React.createElement('input', { type: 'text', placeholder: 'Postavite pitanje...', style: { flex: 1, padding: '10px 14px', borderRadius: '24px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' } }),
            React.createElement('button', { style: { background: '#1a2740', color: 'white', border: 'none', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px' } }, '^')
          )
        )
      )
    )
  )
}
