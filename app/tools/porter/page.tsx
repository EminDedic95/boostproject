'use client'
import React, { useState } from 'react'

const FORCES = [
  { key: 'rivalry', title: 'Rivalitet medu konkurentima', sub: 'Competitive Rivalry', color: '#c0392b', bg: '#fef5f5', desc: 'Koliko je jaka konkurencija u vasoj industriji? Koliko ima konkurenata, kako se bore za trziste?', examples: 'Broj konkurenata, rast industrije, diferencijacija proizvoda, troskovi promjene dobavljaca' },
  { key: 'new', title: 'Prijetnja novih ucesnika', sub: 'Threat of New Entrants', color: '#e67e22', bg: '#fff8f0', desc: 'Koliko je lako novim kompanijama uci u vasu industriju?', examples: 'Barijere za ulazak, potreban kapital, ekonomija obima, regulatorni zahtjevi, brendovi' },
  { key: 'substitutes', title: 'Prijetnja supstituta', sub: 'Threat of Substitutes', color: '#8e44ad', bg: '#faf0ff', desc: 'Postoje li alternativni proizvodi ili usluge koji mogu zamijeniti vase?', examples: 'Alternativni proizvodi, cijena supstituta, sklonost kupaca ka promjeni, kvalitet supstituta' },
  { key: 'buyers', title: 'Pregovaracka moc kupaca', sub: 'Bargaining Power of Buyers', color: '#2E75B6', bg: '#f0f7ff', desc: 'Koliku moc imaju vasi kupci da uticu na cijene i uslove?', examples: 'Koncentracija kupaca, volumen kupovine, informiranost kupaca, troskovi promjene' },
  { key: 'suppliers', title: 'Pregovaracka moc dobavljaca', sub: 'Bargaining Power of Suppliers', color: '#2d7a4f', bg: '#f0faf4', desc: 'Koliku moc imaju vasi dobavljaci da uticu na cijene inputa?', examples: 'Broj dobavljaca, jedinstvenost inputa, troskovi promjene dobavljaca, forward integracija' },
]

function ForceCell({ force, value, onChange }: { force: typeof FORCES[0], value: string, onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false)
  const [showEx, setShowEx] = useState(false)
  return React.createElement('div', {
    style: { border: '2px solid ' + force.color, borderRadius: '12px', padding: '20px', background: focused ? 'white' : force.bg, transition: 'all 0.2s', boxShadow: focused ? '0 4px 20px rgba(0,0,0,0.1)' : 'none' }
  },
    React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' } },
      React.createElement('div', {},
        React.createElement('h3', { style: { color: force.color, fontSize: '15px', fontWeight: '700', margin: '0 0 2px' } }, force.title),
        React.createElement('p', { style: { color: force.color, fontSize: '11px', margin: '0 0 6px', opacity: 0.7 } }, force.sub),
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '12px', margin: 0, lineHeight: 1.4 } }, force.desc)
      ),
      React.createElement('button', {
        onClick: () => setShowEx(!showEx),
        style: { width: '22px', height: '22px', borderRadius: '50%', background: showEx ? force.color : force.bg, border: '1px solid ' + force.color, cursor: 'pointer', fontSize: '11px', fontWeight: '700', color: showEx ? 'white' : force.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '12px' }
      }, '?')
    ),
    showEx && React.createElement('div', {
      style: { background: '#1a2740', color: 'white', borderRadius: '8px', padding: '10px 12px', marginBottom: '10px', fontSize: '12px', lineHeight: 1.5 }
    },
      React.createElement('p', { style: { margin: '0 0 4px', fontWeight: '600', color: '#C9A227' } }, 'Na sta obratiti paznju:'),
      React.createElement('p', { style: { margin: 0, color: 'rgba(255,255,255,0.8)' } }, force.examples)
    ),
    React.createElement('textarea', {
      value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true), onBlur: () => setFocused(false),
      placeholder: 'Opiste ovu silu u kontekstu vaseg biznisa...',
      style: { width: '100%', border: '1px solid ' + force.color + '40', outline: 'none', resize: 'none', background: 'white', borderRadius: '8px', padding: '10px', marginTop: '12px', fontSize: '13px', color: '#1a2740', lineHeight: 1.6, fontFamily: 'Segoe UI, sans-serif', minHeight: focused ? '120px' : '80px', transition: 'min-height 0.2s' }
    })
  )
}

export default function PorterTool() {
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
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '8px 0 4px' } }, 'Porterovih 5 sila'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', margin: 0 } }, 'Analizirajte konkurentske sile u vasoj industriji. Kliknite ? za pomoc pri svakoj sili.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
          React.createElement('button', {
            onClick: () => window.print(),
            style: { background: 'white', border: '1px solid #e2e8f0', color: '#1a2740', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }
          }, 'Stampa / PDF'),
          React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Puni biznis plan')
        )
      ),
      React.createElement('div', { style: { display: 'grid', gap: '16px', marginBottom: '16px' } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
          React.createElement(ForceCell, { key: 'rivalry', force: FORCES[0], value: data['rivalry'] || '', onChange: set('rivalry') }),
          React.createElement(ForceCell, { key: 'new', force: FORCES[1], value: data['new'] || '', onChange: set('new') })
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
          React.createElement(ForceCell, { key: 'substitutes', force: FORCES[2], value: data['substitutes'] || '', onChange: set('substitutes') }),
          React.createElement(ForceCell, { key: 'buyers', force: FORCES[3], value: data['buyers'] || '', onChange: set('buyers') })
        ),
        React.createElement(ForceCell, { key: 'suppliers', force: FORCES[4], value: data['suppliers'] || '', onChange: set('suppliers') })
      ),
      React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e2e8f0', marginBottom: '32px' } },
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: 0, lineHeight: 1.6 } }, 'Savjet: Procjenite svaku silu kao Nisku, Srednju ili Visoku. Sto je vise sila visoke intenzivnosti, industrija je teze. Koristite ovu analizu da identifikujete gdje imate konkurentsku prednost.')
      ),
      React.createElement('div', { style: { background: '#1a2740', borderRadius: '16px', padding: '32px', textAlign: 'center' } },
        React.createElement('h3', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' } }, 'Zelite kompletan biznis plan?'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' } }, 'Porterovih 5 sila je samo jedan od 9 koraka. Izradite kompletan profesionalni biznis plan uz AI podrsku.'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'inline-block' } }, 'Pocni izradu biznis plana')
      )
    )
  )
}
