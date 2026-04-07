import React from 'react'

export default function Home() {
  return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif' } },
    React.createElement('nav', {
      style: { background: '#1a2740', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
    },
      React.createElement('span', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold' } }, 'BOOST Biznis Plan'),
      React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '8px 24px', borderRadius: '24px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' } }, 'Počni →')
    ),
    React.createElement('main', {
      style: { minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb', padding: '40px 24px', textAlign: 'center' }
    },
      React.createElement('div', { style: { background: '#C9A227', color: '#1a2740', fontSize: '12px', fontWeight: 'bold', padding: '4px 16px', borderRadius: '20px', marginBottom: '24px', letterSpacing: '0.08em' } }, 'BOOST BALKANS × EU'),
      React.createElement('h1', { style: { fontSize: '3rem', fontWeight: 'bold', color: '#1a2740', marginBottom: '16px', maxWidth: '700px', lineHeight: 1.2 } }, 'Izradi svoj biznis plan uz pomoć AI'),
      React.createElement('p', { style: { fontSize: '1.2rem', color: '#6b7a99', marginBottom: '40px', maxWidth: '560px', lineHeight: 1.6 } }, 'Vodič koji vas korak po korak vodi kroz Canvas model, SWOT, PEST, finansijske projekcije i sve što vam treba za uspješan biznis plan.'),
      React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '16px 40px', borderRadius: '32px', fontWeight: 'bold', textDecoration: 'none', fontSize: '16px', marginBottom: '16px', display: 'inline-block' } }, 'Počni izradu biznis plana →'),
      React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px' } }, 'Besplatno • Bez registracije • Na bosanskom jeziku')
    ),
    React.createElement('footer', {
      style: { background: '#1a2740', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '24px', fontSize: '13px' }
    }, '© 2025 BOOST Balkans – Faculty of Economics Mostar')
  )
}
