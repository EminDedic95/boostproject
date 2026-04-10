'use client'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState('')

  async function handleLogin() {
    setError('')
    if (!email.trim() || !password.trim()) return setError('Unesite email i lozinku.')
    setLoading(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) { setError('Pogresna email adresa ili lozinka.'); setLoading(false); return }
    window.location.href = '/builder'
  }

  async function handleReset() {
    if (!resetEmail.trim()) return setError('Unesite email adresu.')
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(resetEmail, { redirectTo: window.location.origin + '/reset-password' })
    if (resetError) { setError(resetError.message); return }
    setResetSent(true)
  }

  return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5f7fb', display: 'flex', flexDirection: 'column' } },
    React.createElement('nav', { style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('a', { href: '/register', style: { color: '#6b7a99', fontSize: '14px', textDecoration: 'none' } }, 'Nemate racun? Registrujte se')
    ),
    React.createElement('main', { style: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' } },
      React.createElement('div', { style: { maxWidth: '420px', width: '100%' } },
        showReset
          ? React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0' } },
              resetSent
                ? React.createElement('div', { style: { textAlign: 'center' } },
                    React.createElement('div', { style: { fontSize: '40px', marginBottom: '16px' } }, 'v'),
                    React.createElement('h2', { style: { color: '#1a2740', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' } }, 'Email je poslan!'),
                    React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' } }, 'Provjerite inbox i kliknite na link za resetovanje lozinke.'),
                    React.createElement('button', { onClick: () => { setShowReset(false); setResetSent(false) }, style: { background: '#1a2740', color: 'white', border: 'none', padding: '10px 28px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' } }, 'Nazad na prijavu')
                  )
                : React.createElement('div', {},
                    React.createElement('h2', { style: { color: '#1a2740', fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' } }, 'Resetuj lozinku'),
                    React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', marginBottom: '24px' } }, 'Unesite vas email i posaljemo vam link za resetovanje.'),
                    React.createElement('input', { type: 'email', value: resetEmail, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setResetEmail(e.target.value), placeholder: 'vasa@email.com', style: { width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box', marginBottom: '12px' } }),
                    error && React.createElement('div', { style: { background: '#fef5f5', border: '1px solid #c0392b', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#c0392b', marginBottom: '12px' } }, error),
                    React.createElement('button', { onClick: handleReset, style: { width: '100%', background: '#1a2740', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginBottom: '10px' } }, 'Posalji link'),
                    React.createElement('button', { onClick: () => setShowReset(false), style: { background: 'none', border: 'none', color: '#6b7a99', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' } }, 'Nazad na prijavu')
                  )
            )
          : React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0' } },
              React.createElement('div', { style: { textAlign: 'center', marginBottom: '28px' } },
                React.createElement('h1', { style: { color: '#1a2740', fontSize: '24px', fontWeight: 'bold', marginBottom: '6px' } }, 'Dobrodosli nazad'),
                React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px' } }, 'Prijavite se i nastavite sa vasim planom')
              ),
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
                React.createElement('div', {},
                  React.createElement('label', { style: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#1a2740', marginBottom: '6px' } }, 'Email adresa'),
                  React.createElement('input', { type: 'email', value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), placeholder: 'vasa@email.com', style: { width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' } })
                ),
                React.createElement('div', {},
                  React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' } },
                    React.createElement('label', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, 'Lozinka'),
                    React.createElement('button', { onClick: () => setShowReset(true), style: { background: 'none', border: 'none', color: '#6b7a99', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' } }, 'Zaboravili ste lozinku?')
                  ),
                  React.createElement('input', { type: 'password', value: password, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), placeholder: 'Vasa lozinka', onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleLogin() }, style: { width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' } })
                ),
                error && React.createElement('div', { style: { background: '#fef5f5', border: '1px solid #c0392b', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#c0392b' } }, error),
                React.createElement('button', { onClick: handleLogin, style: { background: '#1a2740', color: 'white', border: 'none', padding: '13px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', opacity: loading ? 0.7 : 1 } }, loading ? 'Prijava...' : 'Prijavite se'),
                React.createElement('p', { style: { textAlign: 'center', fontSize: '12px', color: '#6b7a99', margin: 0 } }, 'Nemate racun? ', React.createElement('a', { href: '/register', style: { color: '#1a2740', fontWeight: '600', textDecoration: 'none' } }, 'Registrujte se besplatno'))
              )
            )
      )
    )
  )
}
