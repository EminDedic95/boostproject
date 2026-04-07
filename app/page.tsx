import React from 'react'

export default function Home() {
  return React.createElement('main', {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f7fb'
    }
  },
    React.createElement('div', { style: { textAlign: 'center' } },
      React.createElement('h1', {
        style: { fontSize: '2.5rem', fontWeight: 'bold', color: '#1a2740', marginBottom: '1rem' }
      }, 'BOOST Biznis Plan'),
      React.createElement('p', {
        style: { color: '#6b7a99', fontSize: '1.1rem', marginBottom: '2rem' }
      }, 'AI vodič za izradu biznis plana')
    )
  )
}
