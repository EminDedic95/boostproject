'use client'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const CANVAS_TIPS: Record<string, { what: string, example: string }> = {
  'Key Partners': { what: 'Ko su vasi kljucni partneri i dobavljaci? Ko vam pomaze u poslovanju?', example: 'Npr: Lokalni dobavljaci brasna, prevoznicke kompanije, serviseri opreme' },
  'Key Activities': { what: 'Koje aktivnosti su najvaznije za funkcionisanje vaseg biznisa?', example: 'Npr: Pecenje hljeba, dostava, upravljanje narudzbamaomima' },
  'Value Proposition': { what: 'Kakvu vrijednost nudite kupcima? Koji problem rjesavate?', example: 'Npr: Svjez domaci hljeb dostavljan svaki dan, bez konzervansa' },
  'Customer Relationships': { what: 'Kako gradite i odrzavate odnose sa kupcima?', example: 'Npr: Licni kontakt, loyalty kartica, redovne dostave' },
  'Customer Segments': { what: 'Ko su vasi kupci? Za koga kreirate vrijednost?', example: 'Npr: Porodice u Mostaru, restorani, kafici, hoteli' },
  'Key Resources': { what: 'Koji resursi su vam potrebni za poslovanje?', example: 'Npr: Pecnica, vozilo za dostavu, iskusni pekar, prostor' },
  'Channels': { what: 'Kako dopirjete do kupaca i isporucujete vrijednost?', example: 'Npr: Vlastita prodavnica, dostava na adresu, trznica' },
  'Cost Structure': { what: 'Koji su vasi najveci troskovi? Sta kosta najvise?', example: 'Npr: Sirovine, plata radnika, najam prostora, struja' },
  'Revenue Streams': { what: 'Kako zaradjujete novac? Koji su vasi izvori prihoda?', example: 'Npr: Prodaja u prodavnici, dostava, catering za firme' },
}

function CanvasBlock({ title, value, onChange, style }: { title: string, value: string, onChange: (v: string) => void, style?: React.CSSProperties }) {
  const [focused, setFocused] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const tip = CANVAS_TIPS[title]
  return React.createElement('div', {
    style: { border: '1px solid #cbd5e0', background: focused ? 'white' : '#fafafa', padding: '10px', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', boxShadow: focused ? '0 0 0 2px #C9A227' : 'none', position: 'relative', ...style }
  },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' } },
      React.createElement('div', { style: { fontSize: '10px', fontWeight: '700', color: '#1F4E79', letterSpacing: '0.06em', textTransform: 'uppercase' } }, title),
      tip && React.createElement('button', {
        onClick: (e: React.MouseEvent) => { e.stopPropagation(); setShowTip(!showTip) },
        style: { width: '16px', height: '16px', borderRadius: '50%', background: showTip ? '#1F4E79' : '#EBF4FB', border: 'none', cursor: 'pointer', fontSize: '10px', fontWeight: '700', color: showTip ? 'white' : '#1F4E79', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
      }, '?')
    ),
    showTip && tip && React.createElement('div', {
      style: { background: '#1a2740', color: 'white', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px', fontSize: '11px', lineHeight: 1.5 }
    },
      React.createElement('p', { style: { margin: '0 0 6px', fontWeight: '600', color: '#C9A227' } }, 'Sta upisati?'),
      React.createElement('p', { style: { margin: '0 0 6px' } }, tip.what),
      React.createElement('p', { style: { margin: '0', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' } }, tip.example)
    ),
    React.createElement('textarea', {
      value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true), onBlur: () => setFocused(false),
      placeholder: 'Unesite...',
      style: { flex: 1, border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '12px', color: '#1a2740', lineHeight: 1.5, fontFamily: 'Segoe UI, sans-serif', minHeight: focused ? '80px' : '50px', transition: 'min-height 0.2s' }
    })
  )
}

function SwotCell({ title, value, onChange, color }: { title: string, value: string, onChange: (v: string) => void, color: string }) {
  const [focused, setFocused] = useState(false)
  return React.createElement('div', {
    style: { border: '2px solid ' + color, borderRadius: '8px', padding: '12px', background: focused ? 'white' : color + '12', transition: 'all 0.2s', minHeight: focused ? '160px' : '120px', boxShadow: focused ? '0 4px 16px rgba(0,0,0,0.1)' : 'none' }
  },
    React.createElement('div', { style: { fontSize: '12px', fontWeight: '700', color, marginBottom: '8px' } }, title),
    React.createElement('textarea', {
      value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true), onBlur: () => setFocused(false),
      placeholder: 'Kliknite za unos...',
      style: { width: '100%', border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '13px', color: '#1a2740', lineHeight: 1.5, fontFamily: 'Segoe UI, sans-serif', minHeight: focused ? '110px' : '70px', transition: 'min-height 0.2s' }
    })
  )
}

function PestCell({ title, value, onChange, color }: { title: string, value: string, onChange: (v: string) => void, color: string }) {
  const [focused, setFocused] = useState(false)
  return React.createElement('div', {
    style: { border: '2px solid ' + color, borderRadius: '8px', padding: '12px', background: focused ? 'white' : color + '12', transition: 'all 0.2s', minHeight: focused ? '160px' : '120px', boxShadow: focused ? '0 4px 16px rgba(0,0,0,0.1)' : 'none' }
  },
    React.createElement('div', { style: { fontSize: '12px', fontWeight: '700', color, marginBottom: '8px' } }, title),
    React.createElement('textarea', {
      value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true), onBlur: () => setFocused(false),
      placeholder: 'Kliknite za unos...',
      style: { width: '100%', border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '13px', color: '#1a2740', lineHeight: 1.5, fontFamily: 'Segoe UI, sans-serif', minHeight: focused ? '110px' : '70px', transition: 'min-height 0.2s' }
    })
  )
}

const STEP_LABELS = ['Biznis ideja', 'Canvas model', 'PEST analiza', 'SWOT analiza', 'Trziste', 'Marketing', 'Procesi i tim', 'Rizici', 'Finansije']
const STEP_TAGS = ['DIO I', 'DIO II', 'DIO III', 'DIO IV', 'DIO V', 'DIO VI', 'DIO VII', 'DIO VIII', 'DIO IX']
const STEP_TITLES = ['Opisite svoju poslovnu ideju', 'Business Model Canvas', 'PEST Analiza', 'SWOT Analiza', 'Analiza trzista', 'Marketinski plan', 'Poslovni procesi i organizacija', 'Analiza rizika', 'Ekonomsko-finansijske projekcije']
const STEP_DESCS = [
  'Ukratko opisite cime se vase preduzece bavi, koji problem rjesava i ko su vasi kupci.',
  'Canvas model prikazuje kako vase preduzece kreira, isporucuje i zadrzava vrijednost kroz 9 kljucnih blokova. Kliknite na svaki blok i unesite informacije direktno. Kliknite ? za pomoc.',
  'Analiza eksternog okruzenja kroz Politicke, Ekonomske, Socijalne i Tehnoloske faktore.',
  'Analiza internih snaga i slabosti te vanjskih prilika i prijetnji vaseg biznisa.',
  'Istrazite trziste, konkurenciju i profil vaseg idealnog kupca.',
  'Definisite kako cete doci do kupaca i komunicirati svoju vrijednosnu ponudu.',
  'Opisite kako funkcionise vase preduzece iznutra i ko su kljucni ljudi.',
  'Identificirajte kljucne rizike i definisite mjere za njihovo ublazavanje.',
  'Procijenite prihode, troskove i finansijsku odrzivost vaseg biznisa.',
]

const SIMPLE_FIELDS: Record<number, { label: string, placeholder: string, type: string }[]> = {
  0: [
    { label: 'Naziv preduzeca', placeholder: 'npr. Pekara Mostar d.o.o.', type: 'input' },
    { label: 'Opis poslovne ideje', placeholder: 'Opisite svoju ideju...', type: 'textarea' },
    { label: 'Koji problem rjesavate', placeholder: 'Problem koji vas biznis rjesava...', type: 'textarea' },
    { label: 'Ko su vasi kupci', placeholder: 'Opisite ciljnu grupu...', type: 'textarea' },
  ],
  4: [
    { label: 'Velicina trzista', placeholder: 'Koliko je veliko vase ciljno trziste?', type: 'textarea' },
    { label: 'Ciljni segment', placeholder: 'Koji segment trzista ciljate?', type: 'textarea' },
    { label: 'Profil idealnog kupca', placeholder: 'Opisite vaseg idealnog kupca...', type: 'textarea' },
    { label: 'Analiza konkurencije', placeholder: 'Ko su vasi glavni konkurenti?', type: 'textarea' },
  ],
  5: [
    { label: 'Marketinski ciljevi', placeholder: 'Sta zelite postici marketingom?', type: 'textarea' },
    { label: 'Marketinski kanali', placeholder: 'Koje kanale cete koristiti?', type: 'textarea' },
    { label: 'Budzet za marketing', placeholder: 'Koliko planirate uloziti?', type: 'input' },
    { label: 'Kljucne poruke', placeholder: 'Sta je vasa glavna marketinska poruka?', type: 'textarea' },
  ],
  6: [
    { label: 'Kljucni poslovni procesi', placeholder: 'Opisite glavne procese...', type: 'textarea' },
    { label: 'Organizacijska struktura', placeholder: 'Ko su kljucni ljudi i njihove uloge?', type: 'textarea' },
    { label: 'Pravni oblik registracije', placeholder: 'npr. d.o.o., s.p., d.d...', type: 'input' },
  ],
  8: [
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
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveEmail, setSaveEmail] = useState('')
  const [saved, setSaved] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [aiOpen, setAiOpen] = useState(true)

  useEffect(() => {
    const s = localStorage.getItem('boost_plan')
    if (s) {
      const d = JSON.parse(s)
      if (d.formData) setFormData(d.formData)
      if (d.canvas) setCanvas(d.canvas)
      if (d.pest) setPest(d.pest)
      if (d.swot) setSwot(d.swot)
      if (d.risks) setRisks(d.risks)
      if (d.current) setCurrent(d.current)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('boost_plan', JSON.stringify({ formData, canvas, pest, swot, risks, current }))
  }, [formData, canvas, pest, swot, risks, current])

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
    setShowSaveModal(true)
  }

  async function savePlan() {
    if (!saveEmail) return
    setGenerating(true)
    await supabase.from('business_plans').insert({
      company_name: formData['Naziv preduzeca'] || 'Bez naziva',
      form_data: formData,
      canvas, pest, swot, risks,
      current_step: current,
    })
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
    setSaved(true)
    setTimeout(() => setShowSaveModal(false), 2000)
  }

  function renderStep() {
    if (current === 1) {
      return React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr 1fr 1fr', gridTemplateRows: '1fr 1fr auto', gap: '0', border: '2px solid #1a2740', height: '480px' } },
        React.createElement(CanvasBlock, { title: 'Key Partners', value: canvas['partners'] || '', onChange: v => setCanvas(p => ({ ...p, partners: v })), style: { gridColumn: '1', gridRow: '1 / 3', borderRight: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: 'Key Activities', value: canvas['activities'] || '', onChange: v => setCanvas(p => ({ ...p, activities: v })), style: { gridColumn: '2', gridRow: '1', borderRight: '1px solid #cbd5e0', borderBottom: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: 'Value Proposition', value: canvas['value'] || '', onChange: v => setCanvas(p => ({ ...p, value: v })), style: { gridColumn: '3', gridRow: '1 / 3', borderRight: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: 'Customer Relationships', value: canvas['relationships'] || '', onChange: v => setCanvas(p => ({ ...p, relationships: v })), style: { gridColumn: '4', gridRow: '1', borderRight: '1px solid #cbd5e0', borderBottom: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: 'Customer Segments', value: canvas['segments'] || '', onChange: v => setCanvas(p => ({ ...p, segments: v })), style: { gridColumn: '5', gridRow: '1 / 3' } }),
        React.createElement(CanvasBlock, { title: 'Key Resources', value: canvas['resources'] || '', onChange: v => setCanvas(p => ({ ...p, resources: v })), style: { gridColumn: '2', gridRow: '2', borderRight: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: 'Channels', value: canvas['channels'] || '', onChange: v => setCanvas(p => ({ ...p, channels: v })), style: { gridColumn: '4', gridRow: '2', borderRight: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: 'Cost Structure', value: canvas['costs'] || '', onChange: v => setCanvas(p => ({ ...p, costs: v })), style: { gridColumn: '1 / 4', gridRow: '3', borderTop: '1px solid #cbd5e0', borderRight: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: 'Revenue Streams', value: canvas['revenue'] || '', onChange: v => setCanvas(p => ({ ...p, revenue: v })), style: { gridColumn: '4 / 6', gridRow: '3', borderTop: '1px solid #cbd5e0' } })
      )
    }

    if (current === 2) {
      return React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
        React.createElement(PestCell, { title: 'P — Politicki faktori', value: pest['p'] || '', onChange: v => setPest(prev => ({ ...prev, p: v })), color: '#2E75B6' }),
        React.createElement(PestCell, { title: 'E — Ekonomski faktori', value: pest['e'] || '', onChange: v => setPest(prev => ({ ...prev, e: v })), color: '#C9A227' }),
        React.createElement(PestCell, { title: 'S — Socijalni faktori', value: pest['s'] || '', onChange: v => setPest(prev => ({ ...prev, s: v })), color: '#2d7a4f' }),
        React.createElement(PestCell, { title: 'T — Tehnoloski faktori', value: pest['t'] || '', onChange: v => setPest(prev => ({ ...prev, t: v })), color: '#7B2D8B' })
      )
    }

    if (current === 3) {
      return React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
        React.createElement(SwotCell, { title: 'Snage (Strengths)', value: swot['s'] || '', onChange: v => setSwot(prev => ({ ...prev, s: v })), color: '#2d7a4f' }),
        React.createElement(SwotCell, { title: 'Slabosti (Weaknesses)', value: swot['w'] || '', onChange: v => setSwot(prev => ({ ...prev, w: v })), color: '#e53e3e' }),
        React.createElement(SwotCell, { title: 'Prilike (Opportunities)', value: swot['o'] || '', onChange: v => setSwot(prev => ({ ...prev, o: v })), color: '#2E75B6' }),
        React.createElement(SwotCell, { title: 'Prijetnje (Threats)', value: swot['t'] || '', onChange: v => setSwot(prev => ({ ...prev, t: v })), color: '#C9A227' })
      )
    }

    if (current === 7) {
      return React.createElement('div', {},
        React.createElement('div', { style: { overflowX: 'auto', marginBottom: '16px' } },
          React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' } },
            React.createElement('thead', {},
              React.createElement('tr', {},
                ...['Rizik', 'Vjerovatnoca', 'Uticaj', 'Mjere ublazavanja', ''].map(h =>
                  React.createElement('th', { key: h, style: { padding: '10px 8px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '12px' } }, h)
                )
              )
            ),
            React.createElement('tbody', {},
              ...risks.map((row, i) =>
                React.createElement('tr', { key: i },
                  ...(['risk', 'prob', 'impact', 'mitigation'] as const).map(field =>
                    React.createElement('td', { key: field, style: { padding: '8px', border: '1px solid #e2e8f0' } },
                      React.createElement('input', {
                        type: 'text', value: row[field],
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateRisk(i, field, e.target.value),
                        style: { width: '100%', border: 'none', outline: 'none', fontSize: '13px', background: 'transparent', fontFamily: 'Segoe UI, sans-serif' }
                      })
                    )
                  ),
                  React.createElement('td', { style: { padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' } },
                    React.createElement('button', { onClick: () => deleteRisk(i), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '16px' } }, 'x')
                  )
                )
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

    const fields = SIMPLE_FIELDS[current] || []
    return React.createElement('div', {},
      ...fields.map(f =>
        React.createElement('div', { key: f.label, style: { background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '12px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '8px', fontSize: '13px' } }, f.label),
          f.type === 'input'
            ? React.createElement('input', {
              type: 'text', placeholder: f.placeholder,
              value: formData[f.label] || '',
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleFormChange(f.label, e.target.value),
              style: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }
            })
            : React.createElement('textarea', {
              placeholder: f.placeholder, rows: 3,
              value: formData[f.label] || '',
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => handleFormChange(f.label, e.target.value),
              style: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }
            })
        )
      )
    )
  }

  const gridCols = [sidebarOpen ? '220px' : '40px', '1fr', aiOpen ? '300px' : '40px'].join(' ')

  return React.createElement('div', {
    style: { fontFamily: 'Segoe UI, sans-serif', height: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr', overflow: 'hidden' }
  },
    React.createElement('nav', {
      style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
    },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
        React.createElement('a', { href: '/resources', style: { color: '#6b7a99', fontSize: '14px', textDecoration: 'none' } }, 'Resursi'),
        React.createElement('span', { style: { fontSize: '13px', color: '#6b7a99' } }, 'DIO ' + (current + 1) + ' od ' + totalSteps),
        React.createElement('div', { style: { width: '120px', height: '4px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' } },
          React.createElement('div', { style: { width: pct + '%', height: '100%', background: '#C9A227', borderRadius: '4px', transition: 'width 0.4s ease' } })
        )
      )
    ),

    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: gridCols, overflow: 'hidden', transition: 'grid-template-columns 0.3s ease' } },

      React.createElement('aside', { style: { borderRight: '1px solid #e2e8f0', background: 'white', overflow: 'hidden', position: 'relative' } },
        React.createElement('button', {
          onClick: () => setSidebarOpen(!sidebarOpen),
          style: { position: 'absolute', top: '16px', right: '-12px', width: '24px', height: '24px', borderRadius: '50%', background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: '10px', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }
        }, sidebarOpen ? '<' : '>'),
        sidebarOpen && React.createElement('div', { style: { overflowY: 'auto', padding: '16px 0', height: '100%' } },
          ...STEP_LABELS.map((label, i) =>
            React.createElement('div', {
              key: i, onClick: () => setCurrent(i),
              style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderLeft: i === current ? '3px solid #C9A227' : '3px solid transparent', background: i === current ? '#FFF8E7' : 'transparent', cursor: 'pointer' }
            },
              React.createElement('div', {
                style: { width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0, background: i === current ? '#C9A227' : i < current ? '#2d7a4f' : '#f5f7fb', border: i === current ? 'none' : '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: i === current ? '#1a2740' : i < current ? 'white' : '#6b7a99' }
              }, i < current ? 'v' : i + 1),
              React.createElement('span', { style: { fontSize: '13px', color: i === current ? '#1a2740' : '#6b7a99', fontWeight: i === current ? '600' : '400' } }, label)
            )
          )
        )
      ),

      React.createElement('main', { style: { background: '#f5f7fb', overflowY: 'auto', padding: '32px 40px' } },
        React.createElement('div', { style: { maxWidth: '100%' } },
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em' } }, STEP_TAGS[current]),
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '22px', fontWeight: 'bold', margin: '10px 0 4px' } }, STEP_TITLES[current]),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', marginBottom: '20px', lineHeight: 1.6 } }, STEP_DESCS[current]),
          renderStep(),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '24px' } },
            current > 0
              ? React.createElement('button', { onClick: () => setCurrent(current - 1), style: { background: 'white', color: '#1a2740', border: '1px solid #e2e8f0', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' } }, 'Nazad')
              : React.createElement('span', {}),
            current === totalSteps - 1
              ? React.createElement('button', { onClick: generatePDF, style: { background: '#C9A227', color: '#1a2740', border: 'none', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' } }, generating ? 'Generisem...' : 'Preuzmi biznis plan')
              : React.createElement('button', { onClick: () => setCurrent(current + 1), style: { background: '#1a2740', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' } }, 'Naprijed')
          )
        )
      ),

      React.createElement('aside', { style: { borderLeft: '1px solid #e2e8f0', background: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' } },
        React.createElement('button', {
          onClick: () => setAiOpen(!aiOpen),
          style: { position: 'absolute', top: '16px', left: '-12px', width: '24px', height: '24px', borderRadius: '50%', background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: '10px', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }
        }, aiOpen ? '>' : '<'),
        aiOpen && React.createElement(React.Fragment, {},
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
    ),

    showSaveModal && React.createElement('div', {
      style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }
    },
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '40px', maxWidth: '480px', width: '90%', textAlign: 'center' } },
        saved
          ? React.createElement('div', {},
              React.createElement('div', { style: { fontSize: '48px', marginBottom: '16px' } }, 'v'),
              React.createElement('h2', { style: { color: '#1a2740', fontSize: '22px', fontWeight: 'bold' } }, 'Plan je sacuvan!'),
              React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', marginTop: '8px' } }, 'Vas PDF se otvara...')
            )
          : React.createElement('div', {},
              React.createElement('h2', { style: { color: '#1a2740', fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' } }, 'Unesite email za preuzimanje'),
              React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 } }, 'Vas biznis plan ce biti sacuvan i mozete mu pristupiti u bilo kom trenutku.'),
              React.createElement('input', {
                type: 'email', placeholder: 'vasa@email.com',
                value: saveEmail,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSaveEmail(e.target.value),
                style: { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' }
              }),
              saveEmail === '' && React.createElement('p', { style: { color: '#e53e3e', fontSize: '12px', marginBottom: '8px' } }, 'Email je obavezan za preuzimanje plana.'),
              React.createElement('button', {
                onClick: savePlan,
                style: { width: '100%', background: saveEmail ? '#1a2740' : '#ccc', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: saveEmail ? 'pointer' : 'not-allowed' }
              }, generating ? 'Generisem...' : 'Preuzmi biznis plan')
            )
      )
    )
