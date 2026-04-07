import React from 'react'

export default function Builder() {
  return React.createElement('div', {
    style: { fontFamily: 'Segoe UI, sans-serif', height: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr', overflow: 'hidden' }
  },

    React.createElement('nav', {
      style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
    },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
        React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '20px', padding: '4px 16px', fontSize: '13px', color: '#6b7a99' } }, 'DIO I od VIII'),
        React.createElement('div', { style: { width: '120px', height: '4px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' } },
          React.createElement('div', { style: { width: '12.5%', height: '100%', background: '#C9A227', borderRadius: '4px' } })
        )
      )
    ),

    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: '220px 1fr 320px', overflow: 'hidden' }
    },

      React.createElement('aside', {
        style: { borderRight: '1px solid #e2e8f0', overflowY: 'auto', padding: '16px 0', background: 'white' }
      },
        ...[
          { n: 1, label: 'Biznis ideja', active: true, done: false },
          { n: 2, label: 'Canvas model', active: false, done: false },
          { n: 3, label: 'PEST analiza', active: false, done: false },
          { n: 4, label: 'Porter & SWOT', active: false, done: false },
          { n: 5, label: 'Tržište', active: false, done: false },
          { n: 6, label: 'Marketing', active: false, done: false },
          { n: 7, label: 'Procesi & tim', active: false, done: false },
          { n: 8, label: 'Finansije', active: false, done: false },
        ].map(item =>
          React.createElement('div', {
            key: item.n,
            style: {
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 16px',
              borderLeft: item.active ? '3px solid #C9A227' : '3px solid transparent',
              background: item.active ? '#FFF8E7' : 'transparent',
              cursor: 'pointer'
            }
          },
            React.createElement('div', {
              style: {
                width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                background: item.active ? '#C9A227' : item.done ? '#2d7a4f' : '#f5f7fb',
                border: item.active ? 'none' : '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 'bold',
                color: item.active ? '#1a2740' : item.done ? 'white' : '#6b7a99'
              }
            }, item.done ? '✓' : item.n),
            React.createElement('span', {
              style: {
                fontSize: '13px', lineHeight: 1.3,
                color: item.active ? '#1a2740' : '#6b7a99',
                fontWeight: item.active ? '600' : '400'
              }
            }, item.label)
          )
        )
      ),

      React.createElement('main', {
        style: { background: '#f5f7fb', overflowY: 'auto', padding: '40px 40px' }
      },
        React.createElement('div', { style: { maxWidth: '640px' } },
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em', textTransform: 'uppercase' } }, 'DIO I – Biznis ideja'),
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '12px 0 6px' } }, 'Opišite svoju poslovnu ideju'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6 } }, 'Ukratko opišite čime se vaše preduzeće bavi, koji problem rješava i ko su vaši kupci.'),

          ...[
            { label: 'Naziv preduzeća', placeholder: 'npr. Pekara Mostar d.o.o.', type: 'input' },
            { label: 'Opis poslovne ideje', placeholder: 'Opišite svoju ideju...', type: 'textarea' },
            { label: 'Koji problem rješavate?', placeholder: 'Problem koji vaš biznis rješava...', type: 'textarea' },
            { label: 'Ko su vaši kupci?', placeholder: 'Opišite ciljnu grupu...', type: 'textarea' },
          ].map(f =>
            React.createElement('div', { key: f.label, style: { background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '12px', border: '1px solid #e2e8f0' } },
              React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '8px', fontSize: '13px' } }, f.label),
              f.type === 'input'
                ? React.createElement('input', { type: 'text', placeholder: f.placeholder, style: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' } })
                : React.createElement('textarea', { placeholder: f.placeholder, rows: 3, style: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' } })
            )
          ),

          React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', marginTop: '8px' } },
            React.createElement('button', { style: { background: '#1a2740', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' } }, 'Naprijed →')
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
            React.createElement('span', { style: { fontSize: '11px', color: '#6b7a99', marginLeft: 'auto' } }, 'BOOST vodič')
          )
        ),
        React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 20px' } },
          React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '12px', padding: '14px', marginBottom: '12px' } },
            React.createElement('p', { style: { fontSize: '13px', color: '#1a2740', lineHeight: 1.6, margin: 0 } }, 'Zdravo! Ja sam vaš AI asistent za izradu biznis plana. Baziran sam na BOOST vodiču i tu sam da vam pomognem kroz svaki korak. Počnite unosom naziva vašeg preduzeća i opisa ideje, pa me slobodno pitajte bilo šta! 💡')
          )
        ),
        React.createElement('div', { style: { padding: '12px 16px', borderTop: '1px solid #e2e8f0' } },
          React.createElement('div', { style: { display: 'flex', gap: '8px' } },
            React.createElement('input', { type: 'text', placeholder: 'Postavite pitanje...', style: { flex: 1, padding: '10px 14px', borderRadius: '24px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' } }),
            React.createElement('button', { style: { background: '#1a2740', color: 'white', border: 'none', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px' } }, '↑')
          )
        )
      )
    )
  )
}
