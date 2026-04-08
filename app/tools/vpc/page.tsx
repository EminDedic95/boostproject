'use client'
import React, { useState } from 'react'

function Section({ title, subtitle, color, bg, value, onChange, placeholder }: { title: string, subtitle: string, color: string, bg: string, value: string, onChange: (v: string) => void, placeholder: string }) {
  const [focused, setFocused] = useState(false)
  return React.createElement('div', {
    style: { padding: '20px', background: focused ? 'white' : bg, transition: 'all 0.2s', height: '100%', display: 'flex', flexDirection: 'column' }
  },
    React.createElement('div', { style: { marginBottom: '10px' } },
      React.createElement('h3', { style: { color: color, fontSize: '14px', fontWeight: '700', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.06em' } }, title),
      React.createElement('p', { style: { color: color, fontSize: '11px', margin: 0, opacity: 0.7 } }, subtitle)
    ),
    React.createElement('textarea', {
      value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
      onFocus: () => setFocused(true), onBlur: () => setFocused(false),
      placeholder,
      style: { flex: 1, border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '13px', color: '#1a2740', lineHeight: 1.6, fontFamily: 'Segoe UI, sans-serif', minHeight: '80px' }
    })
  )
}

export default function VPCTool() {
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
    React.createElement('main', { style: { maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' } },
        React.createElement('div', {},
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em' } }, 'ALAT'),
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '8px 0 4px' } }, 'Value Proposition Canvas'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', margin: 0 } }, 'Uskladite svoju vrijednosnu ponudu sa potrebama kupaca.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
          React.createElement('button', {
            onClick: () => window.print(),
            style: { background: 'white', border: '1px solid #e2e8f0', color: '#1a2740', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }
          }, 'Stampa / PDF'),
          React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Puni biznis plan')
        )
      ),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', border: '2px solid #1a2740', background: 'white', borderRadius: '12px', overflow: 'hidden' } },

        React.createElement('div', { style: { borderRight: '2px solid #1a2740' } },
          React.createElement('div', { style: { background: '#2E75B6', color: 'white', padding: '12px 20px', textAlign: 'center' } },
            React.createElement('h2', { style: { margin: 0, fontSize: '16px', fontWeight: '700' } }, 'Vrijednosna ponuda'),
            React.createElement('p', { style: { margin: 0, fontSize: '11px', opacity: 0.8 } }, 'Value Proposition')
          ),
          React.createElement('div', { style: { borderBottom: '1px solid #e2e8f0' } },
            React.createElement(Section, { title: 'Proizvodi i usluge', subtitle: 'Products & Services', color: '#2E75B6', bg: '#f0f7ff', value: data['products'] || '', onChange: set('products'), placeholder: 'Koje proizvode ili usluge nudite kupcima?' })
          ),
          React.createElement('div', { style: { borderBottom: '1px solid #e2e8f0' } },
            React.createElement(Section, { title: 'Generatori dobitka', subtitle: 'Gain Creators', color: '#2d7a4f', bg: '#f0faf4', value: data['gains'] || '', onChange: set('gains'), placeholder: 'Kako vasi proizvodi/usluge stvaraju koristi za kupce?' })
          ),
          React.createElement('div', {},
            React.createElement(Section, { title: 'Ubojice bola', subtitle: 'Pain Relievers', color: '#c0392b', bg: '#fef5f5', value: data['pain_relievers'] || '', onChange: set('pain_relievers'), placeholder: 'Kako vasi proizvodi/usluge rjesavaju probleme kupaca?' })
          )
        ),

        React.createElement('div', {},
          React.createElement('div', { style: { background: '#C9A227', color: '#1a2740', padding: '12px 20px', textAlign: 'center' } },
            React.createElement('h2', { style: { margin: 0, fontSize: '16px', fontWeight: '700' } }, 'Profil kupca'),
            React.createElement('p', { style: { margin: '0', fontSize: '11px', opacity: 0.8 } }, 'Customer Profile')
          ),
          React.createElement('div', { style: { borderBottom: '1px solid #e2e8f0' } },
            React.createElement(Section, { title: 'Zadaci kupca', subtitle: 'Customer Jobs', color: '#C9A227', bg: '#fffbf0', value: data['jobs'] || '', onChange: set('jobs'), placeholder: 'Sta vasi kupci pokusavaju postici? Koji su njihovi zadaci?' })
          ),
          React.createElement('div', { style: { borderBottom: '1px solid #e2e8f0' } },
            React.createElement(Section, { title: 'Dobici kupca', subtitle: 'Customer Gains', color: '#2d7a4f', bg: '#f0faf4', value: data['customer_gains'] || '', onChange: set('customer_gains'), placeholder: 'Koje koristi i rezultate kupci ocekuju ili zele?' })
          ),
          React.createElement('div', {},
            React.createElement(Section, { title: 'Bolovi kupca', subtitle: 'Customer Pains', color: '#c0392b', bg: '#fef5f5', value: data['pains'] || '', onChange: set('pains'), placeholder: 'Koji su problemi, frustracije i rizici vasih kupaca?' })
          )
        )
      ),

      React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e2e8f0', margin: '16px 0 32px' } },
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: 0, lineHeight: 1.6 } }, 'Savjet: Cilj je uskladiti lijevu stranu (sta nudite) sa desnom stranom (sta kupci trebaju). Sto je bolje uskladjivanje, to je vasa vrijednosna ponuda jaca i konkurentnija.')
      ),

      React.createElement('div', { style: { background: '#1a2740', borderRadius: '16px', padding: '32px', textAlign: 'center' } },
        React.createElement('h3', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' } }, 'Zelite kompletan biznis plan?'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' } }, 'VPC je samo jedan od alata. Izradite kompletan profesionalni biznis plan uz AI podrsku.'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'inline-block' } }, 'Pocni izradu biznis plana')
      )
    )
  )
}
