import React from 'react'

export default function Home() {
  return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif' } },

    React.createElement('nav', {
      style: { background: '#1a2740', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
    },
      React.createElement('span', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold' } }, 'BOOST Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', gap: '24px', alignItems: 'center' } },
        React.createElement('a', { href: '/resources', style: { color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' } }, 'Resursi'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '8px 24px', borderRadius: '24px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' } }, 'Počni →')
      )
    ),

    React.createElement('main', {
      style: { minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb', padding: '80px 24px 40px', textAlign: 'center' }
    },
      React.createElement('div', { style: { background: '#C9A227', color: '#1a2740', fontSize: '12px', fontWeight: 'bold', padding: '4px 16px', borderRadius: '20px', marginBottom: '24px', letterSpacing: '0.08em' } }, 'BOOST BALKANS × EU'),
      React.createElement('h1', { style: { fontSize: '3rem', fontWeight: 'bold', color: '#1a2740', marginBottom: '16px', maxWidth: '700px', lineHeight: 1.2 } }, 'Izradi svoj biznis plan uz pomoć AI'),
      React.createElement('p', { style: { fontSize: '1.2rem', color: '#6b7a99', marginBottom: '40px', maxWidth: '560px', lineHeight: 1.6 } }, 'Vodič koji vas korak po korak vodi kroz Canvas model, SWOT, PEST, finansijske projekcije i sve što vam treba za uspješan biznis plan.'),
      React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '16px 40px', borderRadius: '32px', fontWeight: 'bold', textDecoration: 'none', fontSize: '16px', marginBottom: '16px', display: 'inline-block' } }, 'Počni izradu biznis plana →'),
      React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px' } }, 'Besplatno • Na bosanskom jeziku')
    ),

    React.createElement('section', {
      style: { background: 'white', padding: '80px 24px' }
    },
      React.createElement('h2', { style: { textAlign: 'center', color: '#1a2740', fontSize: '2rem', fontWeight: 'bold', marginBottom: '48px' } }, 'Sve što vam treba na jednom mjestu'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' } },
        ...[
          { icon: '🤖', title: 'AI asistent', desc: 'Unesite svoju ideju — AI generiše Canvas, SWOT, PEST i finansijske projekcije za vaš konkretni biznis.' },
          { icon: '📋', title: 'Korak po korak', desc: 'Strukturirani vodič kroz svih 8 dijelova biznis plana, od ideje do finansijskih projekcija.' },
          { icon: '📚', title: 'Resursi i vodiči', desc: 'PDF materijali i video tutorijali koji objašnjavaju svaki alat — Canvas, Porter, SWOT i više.' },
          { icon: '📄', title: 'PDF izvoz', desc: 'Na kraju preuzmite kompletan, profesionalno formatiran biznis plan spreman za banku ili investitora.' },
        ].map(f =>
          React.createElement('div', { key: f.title, style: { background: '#f5f7fb', borderRadius: '16px', padding: '32px 24px', textAlign: 'center' } },
            React.createElement('div', { style: { fontSize: '32px', marginBottom: '16px' } }, f.icon),
            React.createElement('h3', { style: { color: '#1a2740', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' } }, f.title),
            React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', lineHeight: 1.6 } }, f.desc)
          )
        )
      )
    ),

    React.createElement('footer', {
      style: { background: '#1a2740', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '24px', fontSize: '13px' }
    }, '© 2025 BOOST Balkans – Faculty of Economics Mostar')
  )
}
