'use client'
import React, { useState } from 'react'

function Cell({ title, subtitle, color, bg, value, onChange, placeholder, tip }: { title: string, subtitle: string, color: string, bg: string, value: string, onChange: (v: string) => void, placeholder: string, tip: string }) {
  const [focused, setFocused] = useState(false)
  const [showTip, setShowTip] = useState(false)
  return React.createElement('div', {
    style: { border: '2px solid ' + color, borderRadius: '12px', padding: '18px', background: focused ? 'white' : bg, transition: 'all 0.2s', boxShadow: focused ? '0 4px 20px rgba(0,0,0,0.1)' : 'none', display: 'flex', flexDirection: 'column' }
  },
    React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' } },
      React.createElement('div', {},
        React.createElement('h3', { style: { color: color, fontSize: '14px', fontWeight: '700', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' } }, title),
        React.createElement('p', { style: { color: color, fontSize: '11px', margin: 0, opacity: 0.75 } }, subtitle)
      ),
      React.createElement('button', {
        onClick: () => setShowTip(!showTip),
        style: { width: '20px', height: '20px', borderRadius: '50%', background: showTip ? color : 'transparent', border: '1px solid ' + color, cursor: 'pointer', fontSize: '11px', fontWeight: '700', color: showTip ? 'white' : color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
      }, '?')
    ),
    showTip && React.createElement('div', {
      style: { background: '#1a2740', color: 'white', borderRadius: '8px', padding: '10px 12px', marginBottom: '10px', fontSize: '12px', lineHeight: 1.5 }
    },
      React.createElement('p', { style: { margin: '0 0 4px', fontWeight: '600', color: '#C9A227' } }, 'Sta upisati?'),
      React.createElement('p', { style: { margin: 0, color: 'rgba(255,255,255,0.85)' } }, tip)
    ),
    React.createElement('textarea', {
      value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true), onBlur: () => setFocused(false),
      placeholder,
      style: { flex: 1, border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '13px', color: '#1a2740', lineHeight: 1.6, fontFamily: 'Segoe UI, sans-serif', minHeight: focused ? '130px' : '90px', transition: 'min-height 0.2s' }
    })
  )
}

const CELLS = [
  { key: 'problem', title: 'Problem', subtitle: 'The Problem', color: '#c0392b', bg: '#fef5f5', placeholder: 'Koji problem postoji na trzistu? Sto frustrira vase ciljne kupce?', tip: 'Opisite konkretan, stvaran problem koji ima vasa ciljna grupa. Sto vise detalja, to bolje. Izbjegavajte generalizacije.' },
  { key: 'customers', title: 'Ciljni kupci', subtitle: 'Target Customers', color: '#2E75B6', bg: '#f0f7ff', placeholder: 'Ko ima ovaj problem? Opiste demografski i psiholoski profil.', tip: 'Budite specificni. Recite ko TACNO ima ovaj problem - dob, zanimanje, lokacija, navike, frustracije.' },
  { key: 'solution', title: 'Rjesenje', subtitle: 'The Solution', color: '#2d7a4f', bg: '#f0faf4', placeholder: 'Kako vasem rijeste ovaj problem? Sta je vasoj jedinstveno?', tip: 'Opisite kako tacno vase rjesenje adresira problem. Sta ga cini boljim od postojecih alternativa?' },
  { key: 'alternatives', title: 'Postojece alternative', subtitle: 'Existing Alternatives', color: '#8e44ad', bg: '#faf0ff', placeholder: 'Kako kupci danas rjesavaju ovaj problem? Koja su konkurentska rjesenja?', tip: 'Navedite sta kupci rade sada - mozda ignoriraju problem, koriste zaobilazna rjesenja ili koriste konkurenciju.' },
  { key: 'uvp', title: 'Jedinstvena vrijednosna ponuda', subtitle: 'Unique Value Proposition', color: '#C9A227', bg: '#fffbf0', placeholder: 'Zasto bi kupci odabrali bas vas? Sta vas cini razlicitim?', tip: 'Jedna jasna recenica koja objasnjava zasto ste bolji, drugaciji ili posebni u odnosu na alternative.' },
  { key: 'validation', title: 'Validacija', subtitle: 'Evidence & Validation', color: '#16a085', bg: '#f0fbf9', placeholder: 'Kako ste potvrdili da ovaj problem stvarno postoji? Sta ste naucili od potencijalnih kupaca?', tip: 'Navedite razgovore sa kupcima, ankete, testove, pilot projekte ili druge dokaze koji potvrdjuju vasu hipotezu.' },
]

export default function PSFTool() {
  const [data, setData] = useState<Record<string, string>>({})
  const set = (key: string) => (v: string) => setData(prev => ({ ...prev, [key]: v }))

  const fitScore = () => {
    const filled = CELLS.filter(c => (data[c.key] || '').trim().length > 20).length
    if (filled <= 2) return { label: 'Slabo uskladjivanje', color: '#c0392b', pct: (filled / CELLS.length) * 100 }
    if (filled <= 4) return { label: 'Djelimicno uskladjivanje', color: '#C9A227', pct: (filled / CELLS.length) * 100 }
    return { label: 'Dobro uskladjivanje', color: '#2d7a4f', pct: (filled / CELLS.length) * 100 }
  }

  const fit = fitScore()

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
    React.createElement('main', { style: { maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' } },
        React.createElement('div', {},
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em' } }, 'ALAT'),
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '8px 0 4px' } }, 'Problem-Solution Fit Canvas'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', margin: 0 } }, 'Provjerite da li vase rjesenje zaista adresira stvarni problem. Kliknite ? za pomoc.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
          React.createElement('button', {
            onClick: () => window.print(),
            style: { background: 'white', border: '1px solid #e2e8f0', color: '#1a2740', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }
          }, 'Stampa / PDF'),
          React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Puni biznis plan')
        )
      ),

      React.createElement('div', { style: { background: 'white', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' } },
        React.createElement('div', { style: { flex: 1 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' } },
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, 'Problem-Solution Fit'),
            React.createElement('span', { style: { fontSize: '13px', fontWeight: '700', color: fit.color } }, fit.label)
          ),
          React.createElement('div', { style: { height: '8px', background: '#f5f7fb', borderRadius: '4px', overflow: 'hidden' } },
            React.createElement('div', { style: { height: '100%', width: fit.pct + '%', background: fit.color, borderRadius: '4px', transition: 'width 0.5s ease' } })
          )
        ),
        React.createElement('span', { style: { fontSize: '12px', color: '#6b7a99', whiteSpace: 'nowrap' } }, Math.round(fit.pct) + '% popunjeno')
      ),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' } },
        ...CELLS.map(cell =>
          React.createElement(Cell, { key: cell.key, title: cell.title, subtitle: cell.subtitle, color: cell.color, bg: cell.bg, value: data[cell.key] || '', onChange: set(cell.key), placeholder: cell.placeholder, tip: cell.tip })
        )
      ),

      React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e2e8f0', marginBottom: '32px' } },
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: 0, lineHeight: 1.6 } }, 'Savjet: Problem-Solution Fit je postignut kada imate jasne dokaze da ciljni kupci aktivno traze rjesenje za problem koji vi rjesavate, i da je vase rjesenje znacajno bolje od alternativa. Razgovarajte sa najmanje 10 potencijalnih kupaca prije lansiranja.')
      ),

      React.createElement('div', { style: { background: '#1a2740', borderRadius: '16px', padding: '32px', textAlign: 'center' } },
        React.createElement('h3', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' } }, 'Zelite kompletan biznis plan?'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' } }, 'PSF Canvas je odlicna osnova. Izradite kompletan profesionalni biznis plan uz AI podrsku.'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'inline-block' } }, 'Pocni izradu biznis plana')
      )
    )
  )
}
