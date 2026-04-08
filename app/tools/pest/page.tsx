'use client'
import React, { useState } from 'react'

const TIPS: Record<string, { what: string, example: string }> = {
  'Political': { what: 'Koji politički faktori utiču na vaš biznis?', example: 'Porezi, zakoni, subvencije, politička stabilnost' },
  'Economic': { what: 'Koji ekonomski faktori utiču na poslovanje?', example: 'Inflacija, kupovna moć, nezaposlenost, kurs valute' },
  'Social': { what: 'Koji društveni trendovi utiču na vaše kupce?', example: 'Lifestyle trendovi, demografija, ponašanje kupaca' },
  'Technological': { what: 'Koje tehnologije utiču na vašu industriju?', example: 'Digitalni marketing, AI alati, automatizacija' },
  'Legal': { what: 'Koji zakoni regulišu vaš biznis?', example: 'Radni odnosi, GDPR, registracija firme' },
  'Environmental': { what: 'Kako okoliš utiče na poslovanje?', example: 'Ekološki trendovi, održivost, energetski troškovi' },
}

function Block({ title, value, onChange, style }: { title: string, value: string, onChange: (v: string) => void, style?: React.CSSProperties }) {
  const [focused, setFocused] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const tip = TIPS[title]

  return (
    <div style={{ border: '1px solid #cbd5e0', background: focused ? 'white' : '#fafafa', padding: '12px', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', boxShadow: focused ? '0 0 0 2px #C9A227' : 'none', position: 'relative', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ fontSize: '10px', fontWeight: '700', color: '#1F4E79', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{title}</div>
        {tip && (
          <button
            onClick={(e) => { e.stopPropagation(); setShowTip(!showTip) }}
            style={{ width: '18px', height: '18px', borderRadius: '50%', background: showTip ? '#1F4E79' : '#EBF4FB', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '700', color: showTip ? 'white' : '#1F4E79', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ?
          </button>
        )}
      </div>

      {showTip && tip && (
        <div style={{ background: '#1a2740', color: 'white', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px', fontSize: '11px', lineHeight: 1.5 }}>
          <p style={{ margin: '0 0 4px', fontWeight: '600', color: '#C9A227' }}>Šta upisati?</p>
          <p style={{ margin: '0 0 4px' }}>{tip.what}</p>
          <p style={{ margin: '0', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>{tip.example}</p>
        </div>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Unesite..."
        style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '13px', color: '#1a2740', lineHeight: 1.5, fontFamily: 'Segoe UI, sans-serif', minHeight: focused ? '120px' : '80px', transition: 'min-height 0.2s' }}
      />
    </div>
  )
}

export default function PestleTool() {
  const [data, setData] = useState<Record<string, string>>({})
  const set = (key: string) => (v: string) => setData(prev => ({ ...prev, [key]: v }))

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5f7fb' }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' }}>BOOST Biznis Plan</a>
      </nav>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <span style={{ background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' }}>ALAT</span>
          <h1 style={{ color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '8px 0 4px' }}>PESTLE Analiza</h1>
          <p style={{ color: '#6b7a99', fontSize: '14px' }}>Analizirajte vanjske faktore koji utiču na vaš biznis.</p>
        </div>

        <div style={{ border: '2px solid #1a2740', background: 'white' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '200px 200px 200px' }}>
            <Block title="Political" value={data['political'] || ''} onChange={set('political')} style={{ borderRight: '1px solid #cbd5e0', borderBottom: '1px solid #cbd5e0' }} />
            <Block title="Economic" value={data['economic'] || ''} onChange={set('economic')} style={{ borderBottom: '1px solid #cbd5e0' }} />

            <Block title="Social" value={data['social'] || ''} onChange={set('social')} style={{ borderRight: '1px solid #cbd5e0', borderBottom: '1px solid #cbd5e0' }} />
            <Block title="Technological" value={data['technological'] || ''} onChange={set('technological')} style={{ borderBottom: '1px solid #cbd5e0' }} />

            <Block title="Legal" value={data['legal'] || ''} onChange={set('legal')} style={{ borderRight: '1px solid #cbd5e0' }} />
            <Block title="Environmental" value={data['environmental'] || ''} onChange={set('environmental')} />
          </div>
        </div>
      </main>
    </div>
  )
}
