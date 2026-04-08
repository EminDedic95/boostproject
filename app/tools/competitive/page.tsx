'use client'
import React, { useState } from 'react'

const DEFAULT_CRITERIA = [
  'Cijena',
  'Kvalitet proizvoda',
  'Korisnicka podrska',
  'Brzina isporuke',
  'Brend i reputacija',
  'Inovativnost',
  'Lokacija i dostupnost',
  'Online prisustvo',
]

export default function CompetitiveTool() {
  const [myName, setMyName] = useState('')
  const [competitors, setCompetitors] = useState(['', '', ''])
  const [criteria, setCriteria] = useState(DEFAULT_CRITERIA)
  const [scores, setScores] = useState<Record<string, string>>({})
  const [newCrit, setNewCrit] = useState('')

  function setScore(col: string, row: string, val: string) {
    setScores(prev => ({ ...prev, [col + '_' + row]: val }))
  }

  function getScore(col: string, row: string) {
    return scores[col + '_' + row] || ''
  }

  function getRatingColor(val: string) {
    const n = parseInt(val)
    if (!n) return '#f5f7fb'
    if (n >= 4) return '#e8f5e9'
    if (n >= 3) return '#fff8e7'
    return '#ffebee'
  }

  function addCriterion() {
    if (newCrit.trim()) {
      setCriteria(prev => [...prev, newCrit.trim()])
      setNewCrit('')
    }
  }

  function removeCriterion(i: number) {
    setCriteria(prev => prev.filter((_, idx) => idx !== i))
  }

  const cols = ['vi', 'k1', 'k2', 'k3']
  const colNames = [
    myName || 'Vi',
    competitors[0] || 'Konkurent 1',
    competitors[1] || 'Konkurent 2',
    competitors[2] || 'Konkurent 3',
  ]

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
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '8px 0 4px' } }, 'Matrica konkurentske analize'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', margin: 0 } }, 'Uporedite sebe sa konkurentima. Ocjene: 1 = slabo, 5 = odlicno.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
          React.createElement('button', {
            onClick: () => window.print(),
            style: { background: 'white', border: '1px solid #e2e8f0', color: '#1a2740', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }
          }, 'Stampa / PDF'),
          React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Puni biznis plan')
        )
      ),

      React.createElement('div', { style: { background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', marginBottom: '16px' } },
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', marginBottom: '12px' } }, 'Unesite nazive kompanija'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' } },
          React.createElement('div', {},
            React.createElement('label', { style: { display: 'block', fontSize: '11px', fontWeight: '700', color: '#1F4E79', marginBottom: '4px', textTransform: 'uppercase' } }, 'Vasa kompanija'),
            React.createElement('input', {
              type: 'text', value: myName,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => setMyName(e.target.value),
              placeholder: 'Vas naziv...',
              style: { width: '100%', padding: '8px 12px', borderRadius: '8px', border: '2px solid #1F4E79', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }
            })
          ),
          ...[0, 1, 2].map(i =>
            React.createElement('div', { key: i },
              React.createElement('label', { style: { display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7a99', marginBottom: '4px', textTransform: 'uppercase' } }, 'Konkurent ' + (i + 1)),
              React.createElement('input', {
                type: 'text', value: competitors[i],
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCompetitors(prev => prev.map((c, idx) => idx === i ? e.target.value : c)),
                placeholder: 'Naziv konkurenta...',
                style: { width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }
              })
            )
          )
        )
      ),

      React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '16px' } },
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse' } },
          React.createElement('thead', {},
            React.createElement('tr', {},
              React.createElement('th', { style: { padding: '14px 16px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '13px', fontWeight: '700', width: '35%' } }, 'Kriterij'),
              ...cols.map((col, i) =>
                React.createElement('th', { key: col, style: { padding: '14px 16px', background: i === 0 ? '#1F4E79' : '#2d3748', color: 'white', textAlign: 'center', fontSize: '13px', fontWeight: '700' } }, colNames[i])
              )
            )
          ),
          React.createElement('tbody', {},
            ...criteria.map((crit, ri) =>
              React.createElement('tr', { key: ri, style: { borderBottom: '1px solid #e2e8f0' } },
                React.createElement('td', { style: { padding: '10px 16px', fontSize: '13px', color: '#1a2740', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
                  crit,
                  React.createElement('button', {
                    onClick: () => removeCriterion(ri),
                    style: { background: 'none', border: 'none', color: '#e2e8f0', cursor: 'pointer', fontSize: '16px', lineHeight: 1 }
                  }, 'x')
                ),
                ...cols.map(col =>
                  React.createElement('td', { key: col, style: { padding: '6px', textAlign: 'center', background: getRatingColor(getScore(col, crit)) } },
                    React.createElement('select', {
                      value: getScore(col, crit),
                      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setScore(col, crit, e.target.value),
                      style: { border: 'none', background: 'transparent', fontSize: '14px', fontWeight: '600', color: '#1a2740', cursor: 'pointer', outline: 'none', width: '100%', textAlign: 'center' }
                    },
                      React.createElement('option', { value: '' }, '-'),
                      React.createElement('option', { value: '1' }, '1'),
                      React.createElement('option', { value: '2' }, '2'),
                      React.createElement('option', { value: '3' }, '3'),
                      React.createElement('option', { value: '4' }, '4'),
                      React.createElement('option', { value: '5' }, '5')
                    )
                  )
                )
              )
            ),
            React.createElement('tr', { style: { background: '#f5f7fb', borderTop: '2px solid #e2e8f0' } },
              React.createElement('td', { style: { padding: '10px 16px', fontSize: '13px', fontWeight: '700', color: '#1a2740' } }, 'UKUPNO'),
              ...cols.map(col => {
                const total = criteria.reduce((sum, crit) => sum + (parseInt(getScore(col, crit)) || 0), 0)
                const max = criteria.length * 5
                const pct = max ? Math.round((total / max) * 100) : 0
                return React.createElement('td', { key: col, style: { padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: '#1a2740', fontSize: '14px' } },
                  total + '/' + max,
                  React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '400' } }, pct + '%')
                )
              })
            )
          )
        )
      ),

      React.createElement('div', { style: { background: 'white', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e2e8f0', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' } },
        React.createElement('input', {
          type: 'text', value: newCrit, placeholder: 'Dodajte novi kriterij...',
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNewCrit(e.target.value),
          onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter') addCriterion() },
          style: { flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' }
        }),
        React.createElement('button', {
          onClick: addCriterion,
          style: { background: '#1a2740', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }
        }, '+ Dodaj')
      ),

      React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e2e8f0', marginBottom: '32px' } },
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: 0, lineHeight: 1.6 } }, 'Savjet: Zelena = 4-5 (prednost), Zuta = 3 (prosjek), Crvena = 1-2 (slabost). Fokusirajte se na kriterije gdje imate prednost i gdje mozete poboljsati poziciju.')
      ),

      React.createElement('div', { style: { background: '#1a2740', borderRadius: '16px', padding: '32px', textAlign: 'center' } },
        React.createElement('h3', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' } }, 'Zelite kompletan biznis plan?'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' } }, 'Konkurentska analiza je samo jedan korak. Izradite kompletan profesionalni biznis plan uz AI podrsku.'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'inline-block' } }, 'Pocni izradu biznis plana')
      )
    )
  )
}
