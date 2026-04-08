'use client'
import React, { useState } from 'react'

function SwotCell({ title, subtitle, value, onChange, color, bg }: { title: string, subtitle: string, value: string, onChange: (v: string) => void, color: string, bg: string }) {
  const [focused, setFocused] = useState(false)
  return React.createElement('div', {
    style: { border: '2px solid ' + color, borderRadius: '12px', padding: '20px', background: focused ? 'white' : bg, transition: 'all 0.2s', minHeight: focused ? '220px' : '180px', boxShadow: focused ? '0 4px 20px rgba(0,0,0,0.1)' : 'none' }
  },
    React.createElement('div', { style: { marginBottom: '12px' } },
      React.createElement('h3', { style: { color: color, fontSize: '16px', fontWeight: '700', margin: '0 0 2px' } }, title),
      React.createElement('p', { style: { color: color, fontSize: '12px', margin: 0, opacity: 0.7 } }, subtitle)
    ),
    React.createElement('textarea', {
      value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true), onBlur: () => setFocused(false),
      placeholder: 'Unesite stavke, jedna po liniji...',
      style: { width: '100%', border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '14px', color: '#1a2740', lineHeight: 1.7, fontFamily: 'Segoe UI, sans-serif', minHeight: focused ? '160px' : '120px', transition: 'min-height 0.2s' }
    })
  )
}

export default function SwotTool() {
  const [data, setData] = useState({ s: '', w: '', o: '', t: '' })
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
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '8px 0 4px' } }, 'SWOT Analiza'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', margin: 0 } }, 'Analizirajte interni i eksterni kontekst vaseg biznisa kroz 4 kvadranta.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
          React.createElement('button', {
            onClick: () => window.print(),
            style: { background: 'white', border: '1px solid #e2e8f0', color: '#1a2740', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }
          }, 'Stampa / PDF'),
          React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Puni biznis plan')
        )
      ),
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '16px' } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
          React.createElement('div', {},
            React.createElement('div', { style: { background: '#1a2740', color: 'white', borderRadius: '8px 8px 0 0', padding: '8px 16px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.06em', textAlign: 'center' } }, 'INTERNO'),
            React.createElement(SwotCell, { title: 'Snage', subtitle: 'Strengths — sta radite dobro?', value: data.s, onChange: set('s'), color: '#2d7a4f', bg: '#f0faf4' }),
            React.createElement('div', { style: { height: '12px' } }),
            React.createElement(SwotCell, { title: 'Slabosti', subtitle: 'Weaknesses — sta treba poboljsati?', value: data.w, onChange: set('w'), color: '#c0392b', bg: '#fef5f5' })
          ),
          React.createElement('div', {},
            React.createElement('div', { style: { background: '#6b7a99', color: 'white', borderRadius: '8px 8px 0 0', padding: '8px 16px', fontSize: '12px', fontWeight: '700', letterSpacing: '0.06em', textAlign: 'center' } }, 'EKSTERNO'),
            React.createElement(SwotCell, { title: 'Prilike', subtitle: 'Opportunities — koje prilike postoje?', value: data.o, onChange: set('o'), color: '#2E75B6', bg: '#f0f7ff' }),
            React.createElement('div', { style: { height: '12px' } }),
            React.createElement(SwotCell, { title: 'Prijetnje', subtitle: 'Threats — koje prijetnje postoje?', value: data.t, onChange: set('t'), color: '#C9A227', bg: '#fffbf0' })
          )
        )
      ),
      React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e2e8f0', marginBottom: '32px' } },
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: 0, lineHeight: 1.6 } }, 'Savjet: Snage i slabosti su unutrasnji faktori koje vi kontrolirate. Prilike i prijetnje su vanjski faktori iz okruzenja. Budite specificni i realni u procjeni.')
      ),
      React.createElement('div', { style: { background: '#1a2740', borderRadius: '16px', padding: '32px', textAlign: 'center' } },
        React.createElement('h3', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' } }, 'Zelite kompletan biznis plan?'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' } }, 'SWOT analiza je samo jedan od 9 koraka. Izradite kompletan profesionalni biznis plan uz AI podrsku.'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'inline-block' } }, 'Pocni izradu biznis plana')
      )
    )
  )
}
