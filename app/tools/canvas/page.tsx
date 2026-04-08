'use client'
import React, { useState } from 'react'

const TIPS: Record<string, { what: string, example: string }> = {
  'Key Partners': { what: 'Ko su vasi kljucni partneri?', example: 'Npr: Dobavljaci brasna' },
  'Key Activities': { what: 'Koje aktivnosti su kljucne?', example: 'Npr: Pecenje hljeba' },
  'Value Proposition': { what: 'Kakvu vrijednost nudite?', example: 'Npr: Svjez domaci hljeb' },
  'Customer Relationships': { what: 'Kako gradite odnose?', example: 'Npr: Licni kontakt' },
  'Customer Segments': { what: 'Ko su vasi kupci?', example: 'Npr: Porodice, restorani' },
  'Key Resources': { what: 'Koji resursi su potrebni?', example: 'Npr: Pecnica, vozilo' },
  'Channels': { what: 'Kako dopirjete do kupaca?', example: 'Npr: Prodavnica, dostava' },
  'Cost Structure': { what: 'Koji su najveci troskovi?', example: 'Npr: Sirovine, plata' },
  'Revenue Streams': { what: 'Kako zaradjujete?', example: 'Npr: Prodaja, catering' },
}

function Block({ title, value, onChange, style }: { title: string, value: string, onChange: (v: string) => void, style?: React.CSSProperties }) {
  const [focused, setFocused] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const tip = TIPS[title]
  return React.createElement('div', {
    style: { border: '1px solid #cbd5e0', background: focused ? 'white' : '#fafafa', padding: '12px', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', boxShadow: focused ? '0 0 0 2px #C9A227' : 'none', position: 'relative', ...style }
  },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' } },
      React.createElement('div', { style: { fontSize: '10px', fontWeight: '700', color: '#1F4E79', letterSpacing: '0.06em', textTransform: 'uppercase' } }, title),
      tip && React.createElement('button', {
        onClick: (e: React.MouseEvent) => { e.stopPropagation(); setShowTip(!showTip) },
        style: { width: '18px', height: '18px', borderRadius: '50%', background: showTip ? '#1F4E79' : '#EBF4FB', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: '700', color: showTip ? 'white' : '#1F4E79', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
      }, '?')
    ),
    showTip && tip && React.createElement('div', {
      style: { background: '#1a2740', color: 'white', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px', fontSize: '11px', lineHeight: 1.5 }
    },
      React.createElement('p', { style: { margin: '0 0 4px', fontWeight: '600', color: '#C9A227' } }, 'Sta upisati?'),
      React.createElement('p', { style: { margin: '0 0 4px' } }, tip.what),
      React.createElement('p', { style: { margin: '0', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' } }, tip.example)
    ),
    React.createElement('textarea', {
      value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true), onBlur: () => setFocused(false),
      placeholder: 'Unesite...',
      style: { flex: 1, border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '13px', color: '#1a2740', lineHeight: 1.5, fontFamily: 'Segoe UI, sans-serif', minHeight: focused ? '100px' : '60px', transition: 'min-height 0.2s' }
    })
  )
}

export default function CanvasTool() {
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
    React.createElement('main', { style: { maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' } },
        React.createElement('div', {},
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em' } }, 'ALAT'),
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '8px 0 4px' } }, 'Business Model Canvas'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', margin: 0 } }, 'Kliknite na svaki blok i unesite informacije. Kliknite ? za pomoc.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
          React.createElement('button', {
            onClick: () => window.print(),
            style: { background: 'white', border: '1px solid #e2e8f0', color: '#1a2740', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }
          }, 'Stampa / PDF'),
          React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Puni biznis plan')
        )
      ),
      React.createElement('div', { style: { border: '2px solid #1a2740', background: 'white' } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr 1fr 1fr', gridTemplateRows: '220px 220px 140px' } },
          React.createElement(Block, { title: 'Key Partners', value: data['partners'] || '', onChange: set('partners'), style: { gridColumn: '1', gridRow: '1 / 3', borderRight: '1px solid #cbd5e0' } }),
          React.createElement(Block, { title: 'Key Activities', value: data['activities'] || '', onChange: set('activities'), style: { gridColumn: '2', gridRow: '1', borderRight: '1px solid #cbd5e0', borderBottom: '1px solid #cbd5e0' } }),
          React.createElement(Block, { title: 'Value Proposition', value: data['value'] || '', onChange: set('value'), style: { gridColumn: '3', gridRow: '1 / 3', borderRight: '1px solid #cbd5e0' } }),
          React.createElement(Block, { title: 'Customer Relationships', value: data['relationships'] || '', onChange: set('relationships'), style: { gridColumn: '4', gridRow: '1', borderRight: '1px solid #cbd5e0', borderBottom: '1px solid #cbd5e0' } }),
          React.createElement(Block, { title: 'Customer Segments', value: data['segments'] || '', onChange: set('segments'), style: { gridColumn: '5', gridRow: '1 / 3' } }),
          React.createElement(Block, { title: 'Key Resources', value: data['resources'] || '', onChange: set('resources'), style: { gridColumn: '2', gridRow: '2', borderRight: '1px solid #cbd5e0' } }),
          React.createElement(Block, { title: 'Channels', value: data['channels'] || '', onChange: set('channels'), style: { gridColumn: '4', gridRow: '2', borderRight: '1px solid #cbd5e0' } }),
          React.createElement(Block, { title: 'Cost Structure', value: data['costs'] || '', onChange: set('costs'), style: { gridColumn: '1 / 4', gridRow: '3', borderTop: '1px solid #cbd5e0', borderRight: '1px solid #cbd5e0' } }),
          React.createElement(Block, { title: 'Revenue Streams', value: data['revenue'] || '', onChange: set('revenue'), style: { gridColumn: '4 / 6', gridRow: '3', borderTop: '1px solid #cbd5e0' } })
        )
      ),
      React.createElement('div', { style: { marginTop: '32px', background: '#1a2740', borderRadius: '16px', padding: '32px', textAlign: 'center' } },
        React.createElement('h3', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' } }, 'Zelite kompletan biznis plan?'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' } }, 'Canvas je samo jedan od 9 koraka. Izradite kompletan profesionalni biznis plan uz AI podrsku.'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'inline-block' } }, 'Pocni izradu biznis plana')
      )
    )
  )
}
