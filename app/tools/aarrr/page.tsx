'use client'
import React, { useState } from 'react'

const STAGES = [
  { key: 'acquisition', letter: 'A', title: 'Acquisition', subtitle: 'Akvizicija', color: '#1ABCB0', question: 'Kako kupci pronalazu vas?', placeholder: 'Kanali: Google, drustvene mreze, preporuke, oglasi, SEO...', metricPlaceholder: 'npr. 1.000 posjeta/mj', tip: 'Koji kanali dovode ljude do vas? Navedite sve kanale i procijenite koji je najefikasniji.' },
  { key: 'activation', letter: 'A', title: 'Activation', subtitle: 'Aktivacija', color: '#1AA8B0', question: 'Da li imaju dobro prvo iskustvo?', placeholder: 'Sta je "aha moment"? Kada kupci prvi put osjete vrijednost?', metricPlaceholder: 'npr. 15% konverzija', tip: 'Opisite sta se desava kada kupac prvi put iskusi vas proizvod ili uslugu.' },
  { key: 'retention', letter: 'R', title: 'Retention', subtitle: 'Zadrzavanje', color: '#1A8BB0', question: 'Da li se kupci vracaju?', placeholder: 'Strategije zadrzavanja: email, loyalty, kvalitet, personalizacija...', metricPlaceholder: 'npr. 40% vraca se u 30 dana', tip: 'Kako osiguravate da se kupci vracaju? Koliko cesto?' },
  { key: 'revenue', letter: 'R', title: 'Revenue', subtitle: 'Prihod', color: '#1A5F9E', question: 'Kako zaradjujete novac?', placeholder: 'Poslovni model: jednokratna kupovina, pretplata, freemium...', metricPlaceholder: 'npr. prosjecna narudzba 85 KM', tip: 'Opisite sve tokove prihoda i prosjecnu vrijednost kupca.' },
  { key: 'referral', letter: 'R', title: 'Referral', subtitle: 'Preporuke', color: '#1A3580', question: 'Da li vas preporucuju drugima?', placeholder: 'Referral programi, word-of-mouth, recenzije, NPS...', metricPlaceholder: 'npr. NPS = 45', tip: 'Kako kupci sire rijec o vasem biznisu? Imate li referral program?' },
]

export default function AARRRTool() {
  const [data, setData] = useState<Record<string, { desc: string, metric: string }>>({})
  const [active, setActive] = useState<string | null>(null)

  function handleChange(key: string, field: string, val: string) {
    setData(prev => ({ ...prev, [key]: { desc: prev[key]?.desc || '', metric: prev[key]?.metric || '', [field]: val } }))
  }

  const totalWidth = 600
  const minWidth = 160
  const widthStep = (totalWidth - minWidth) / (STAGES.length - 1)
  const rowHeight = 80

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
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' } },
        React.createElement('div', {},
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em' } }, 'ALAT'),
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '8px 0 4px' } }, 'AARRR Funnel — Pirate Metrics'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', margin: 0 } }, 'Kliknite na svaki nivo lijevka da unesete strategije i metrike. Lijevak se suzava kako kupci napreduju.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
          React.createElement('button', { onClick: () => window.print(), style: { background: 'white', border: '1px solid #e2e8f0', color: '#1a2740', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' } }, 'Stampa / PDF'),
          React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Puni biznis plan')
        )
      ),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '420px 1fr', gap: '40px', alignItems: 'start' } },

        React.createElement('div', {},
          React.createElement('svg', { width: '420', height: String(STAGES.length * rowHeight + 20), viewBox: '0 0 420 ' + String(STAGES.length * rowHeight + 20) },
            ...STAGES.map((stage, i) => {
              const topW = totalWidth / 1.4 - i * (widthStep / 1.4)
              const botW = totalWidth / 1.4 - (i + 1) * (widthStep / 1.4)
              const topX = (420 - topW) / 2
              const botX = (420 - botW) / 2
              const y = i * rowHeight
              const isActive = active === stage.key
              const isFilled = (data[stage.key]?.desc || '').length > 5

              return React.createElement('g', { key: stage.key, onClick: () => setActive(active === stage.key ? null : stage.key), style: { cursor: 'pointer' } },
                React.createElement('polygon', {
                  points: `${topX},${y} ${topX + topW},${y} ${botX + botW},${y + rowHeight - 4} ${botX},${y + rowHeight - 4}`,
                  fill: isActive ? stage.color : stage.color + 'CC',
                  stroke: isActive ? 'white' : 'none',
                  strokeWidth: isActive ? '2' : '0',
                  style: { transition: 'all 0.2s' }
                }),
                React.createElement('text', {
                  x: '210', y: y + rowHeight / 2 - 8,
                  textAnchor: 'middle', dominantBaseline: 'middle',
                  fill: 'white', fontSize: '15', fontWeight: '700', fontFamily: 'Segoe UI, sans-serif'
                }, stage.title),
                React.createElement('text', {
                  x: '210', y: y + rowHeight / 2 + 10,
                  textAnchor: 'middle', dominantBaseline: 'middle',
                  fill: 'rgba(255,255,255,0.85)', fontSize: '11', fontFamily: 'Segoe UI, sans-serif'
                }, stage.subtitle + (isFilled ? ' v' : '')),
                React.createElement('rect', { x: String(topX - 2), y: String(y + rowHeight - 4), width: String(topW + 4), height: '4', fill: 'white' })
              )
            })
          )
        ),

        React.createElement('div', {},
          active
            ? React.createElement('div', { style: { background: 'white', borderRadius: '16px', border: '2px solid ' + (STAGES.find(s => s.key === active)?.color || '#e2e8f0'), padding: '24px', animation: 'none' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' } },
                  React.createElement('div', {},
                    React.createElement('h3', { style: { color: STAGES.find(s => s.key === active)?.color, fontSize: '18px', fontWeight: '700', margin: '0 0 2px' } }, STAGES.find(s => s.key === active)?.title),
                    React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: 0 } }, STAGES.find(s => s.key === active)?.question)
                  ),
                  React.createElement('button', { onClick: () => setActive(null), style: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7a99' } }, 'x')
                ),
                React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '8px', padding: '12px', marginBottom: '14px', fontSize: '12px', color: '#6b7a99', lineHeight: 1.5 } },
                  STAGES.find(s => s.key === active)?.tip
                ),
                React.createElement('label', { style: { display: 'block', fontSize: '12px', fontWeight: '700', color: '#1a2740', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' } }, 'Strategija i opis'),
                React.createElement('textarea', {
                  value: data[active]?.desc || '',
                  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(active, 'desc', e.target.value),
                  placeholder: STAGES.find(s => s.key === active)?.placeholder,
                  style: { width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', outline: 'none', resize: 'vertical', minHeight: '100px', fontFamily: 'Segoe UI, sans-serif', color: '#1a2740', lineHeight: 1.6, boxSizing: 'border-box', marginBottom: '14px' }
                }),
                React.createElement('label', { style: { display: 'block', fontSize: '12px', fontWeight: '700', color: '#1a2740', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' } }, 'Trenutne metrike'),
                React.createElement('input', {
                  type: 'text',
                  value: data[active]?.metric || '',
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(active, 'metric', e.target.value),
                  placeholder: STAGES.find(s => s.key === active)?.metricPlaceholder,
                  style: { width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', color: '#1a2740' }
                })
              )
            : React.createElement('div', { style: { background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', textAlign: 'center' } },
                React.createElement('div', { style: { fontSize: '40px', marginBottom: '12px' } }, 'AARRR'),
                React.createElement('h3', { style: { color: '#1a2740', fontSize: '16px', fontWeight: '700', marginBottom: '8px' } }, 'Kliknite na nivo lijevka'),
                React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' } }, 'Svaki nivo lijevka predstavlja fazu korisnickog putovanja. Kliknite na nivo da unesete strategije i metrike.'),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
                  ...STAGES.map(s =>
                    React.createElement('div', { key: s.key, style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '8px', background: '#f5f7fb', cursor: 'pointer' }, onClick: () => setActive(s.key) },
                      React.createElement('div', { style: { width: '10px', height: '10px', borderRadius: '50%', background: (data[s.key]?.desc || '').length > 5 ? s.color : '#e2e8f0', flexShrink: 0 } }),
                      React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, s.title),
                      React.createElement('span', { style: { fontSize: '12px', color: '#6b7a99', marginLeft: 'auto' } }, (data[s.key]?.desc || '').length > 5 ? 'Popunjeno' : 'Prazno')
                    )
                  )
                )
              )
        )
      ),

      React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e2e8f0', margin: '32px 0' } },
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: 0, lineHeight: 1.6 } }, 'Savjet: Lijevak se suzava jer ne prolaze svi korisnici kroz sve faze. Cilj je povecati konverziju na svakom nivou. Identifikujte gdje najvise gubite potencijalne kupce i fokusirajte se na poboljsanje tog nivoa.')
      ),

      React.createElement('div', { style: { background: '#1a2740', borderRadius: '16px', padding: '32px', textAlign: 'center' } },
        React.createElement('h3', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' } }, 'Zelite kompletan biznis plan?'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' } }, 'AARRR analiza je kljucna za rast. Integrirajte je u kompletan biznis plan uz AI podrsku.'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'inline-block' } }, 'Pocni izradu biznis plana')
      )
    )
  )
}
