'use client'
import React, { useState } from 'react'

const PEST_INFO = [
  { key: 'p', title: 'Politicki faktori', sub: 'Political', color: '#2E75B6', bg: '#f0f7ff', examples: 'Zakoni, propisi, porezi, politicka stabilnost, EU regulacije, lokalna samouprava' },
  { key: 'e', title: 'Ekonomski faktori', sub: 'Economic', color: '#C9A227', bg: '#fffbf0', examples: 'Inflacija, kurs, kupovna moc, nezaposlenost, kamatne stope, ekonomski rast' },
  { key: 's', title: 'Socijalni faktori', sub: 'Social', color: '#2d7a4f', bg: '#f0faf4', examples: 'Demografija, kulturne vrijednosti, trendovi, obrazovanje, zdravlje, stil zivota' },
  { key: 't', title: 'Tehnoloski faktori', sub: 'Technological', color: '#7B2D8B', bg: '#faf0ff', examples: 'Inovacije, digitalizacija, automatizacija, internet, softver, nove tehnologije' },
]

function PestCell({ info, value, onChange }: { info: typeof PEST_INFO[0], value: string, onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false)
  const [showEx, setShowEx] = useState(false)
  return React.createElement('div', {
    style: { border: '2px solid ' + info.color, borderRadius: '12px', padding: '20px', background: focused ? 'white' : info.bg, transition: 'all 0.2s', minHeight: focused ? '220px' : '180px', boxShadow: focused ? '0 4px 20px rgba(0,0,0,0.1)' : 'none' }
  },
    React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' } },
      React.createElement('div', {},
        React.createElement('h3', { style: { color: info.color, fontSize: '16px', fontWeight: '700', margin: '0 0 2px' } }, info.title),
        React.createElement('p', { style: { color: info.color, fontSize: '12px', margin: 0, opacity: 0.7 } }, info.sub)
      ),
      React.createElement('button', {
        onClick: () => setShowEx(!showEx),
        style: { width: '22px', height: '22px', borderRadius: '50%', background: showEx ? info.color : info.bg, border: '1px solid ' + info.color, cursor: 'pointer', fontSize: '11px', fontWeight: '700', color: showEx ? 'white' : info.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
      }, '?')
    ),
    showEx && React.createElement('div', {
      style: { background: '#1a2740', color: 'white', borderRadius: '8px', padding: '10px 12px', marginBottom: '10px', fontSize: '12px', lineHeight: 1.5 }
    },
      React.createElement('p', { style: { margin: '0 0 4px', fontWeight: '600', color: '#C9A227' } }, 'Primjeri faktora:'),
      React.createElement('p', { style: { margin: 0, color: 'rgba(255,255,255,0.8)' } }, info.examples)
    ),
    React.createElement('textarea', {
      value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true), onBlur: () => setFocused(false),
      placeholder: 'Unesite relevantne faktore za vas biznis...',
      style: { width: '100%', border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '14px', color: '#1a2740', lineHeight: 1.7, fontFamily: 'Segoe UI, sans-serif', minHeight: focused ? '140px' : '100px', transition: 'min-height 0.2s' }
    })
  )
}

export default function PestTool() {
  const [data, setData] = useState<Record<string, string>>({})
  const set = (key: string) => (v: string) => setData(prev => ({ ...prev, [key]: v }))

  return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5f7fb' } },
    React.createElement('nav', {
      style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
    },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', gap: '12px', alignItems: 'center' } },
        React.createElement('a', { href: '/resources', style: { color: '#6b7a99', fontSize: '14px', textDecoration: 'none' } }, 'Resursi'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '8px 20px', borderRadius: '24px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' } }, 'Puni builder')
      )
    ),
    React.createElement('main', { style: { maxWidth: '900px', margin: '0 auto', padding: '40px 24px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' } },
        React.createElement('div', {},
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em' } }, 'ALAT'),
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '8px 0 4px' } }, 'PEST Analiza'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', margin: 0 } }, 'Analizirajte eksterno okruzenje vaseg biznisa kroz 4 kljucna faktora. Kliknite ? za primjere.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
          React.createElement('button', {
            onClick: () => window.print(),
            style: { background: 'white', border: '1px solid #e2e8f0', color: '#1a2740', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }
          }, 'Stampa / PDF'),
          React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Puni biznis plan')
        )
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' } },
        ...PEST_INFO.map(info =>
          React.createElement(PestCell, { key: info.key, info, value: data[info.key] || '', onChange: set(info.key) })
        )
      ),
      React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e2e8f0', marginBottom: '32px' } },
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: 0, lineHeight: 1.6 } }, 'Savjet: PEST analiza fokusira se na vanjske faktore koje vi ne mozete kontrolirati, ali ih mozete predvidjeti i prilagoditi svoju strategiju. Budite specificni za vase trziste i industriju.')
      ),
      React.createElement('div', { style: { background: '#1a2740', borderRadius: '16px', padding: '32px', textAlign: 'center' } },
        React.createElement('h3', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' } }, 'Zelite kompletan biznis plan?'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' } }, 'PEST analiza je samo jedan od 9 koraka. Izradite kompletan profesionalni biznis plan uz AI podrsku.'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'inline-block' } }, 'Pocni izradu biznis plana')
      )
    )
  )
}
