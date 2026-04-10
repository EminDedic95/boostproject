'use client'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleRegister() {
    setError('')
    if (!name.trim()) return setError('Unesite vase ime.')
    if (!email.trim()) return setError('Unesite email adresu.')
    if (password.length < 6) return setError('Lozinka mora imati najmanje 6 karaktera.')
    if (password !== confirm) return setError('Lozinke se ne podudaraju.')
    setLoading(true)
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError) { setError(signUpError.message); setLoading(false); return }
    if (data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, name, email })
    }
    setLoading(false)
    setSuccess(true)
  }

  return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5f7fb', display: 'flex', flexDirection: 'column' } },
    React.createElement('nav', { style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('a', { href: '/login', style: { color: '#6b7a99', fontSize: '14px', textDecoration: 'none' } }, 'Vec imate racun? Prijavite se')
    ),
    React.createElement('main', { style: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' } },
      React.createElement('div', { style: { maxWidth: '460px', width: '100%' } },
        success
          ? React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0', textAlign: 'center' } },
              React.createElement('div', { style: { fontSize: '48px', marginBottom: '16px' } }, 'v'),
              React.createElement('h2', { style: { color: '#1a2740', fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' } }, 'Racun je kreiran!'),
              React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' } }, 'Poslali smo vam email za potvrdu. Provjerite inbox i kliknite na link za aktivaciju.'),
              React.createElement('a', { href: '/login', style: { background: '#1a2740', color: 'white', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Idi na prijavu')
            )
          : React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0' } },
              React.createElement('div', { style: { textAlign: 'center', marginBottom: '28px' } },
                React.createElement('div', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '12px', letterSpacing: '0.06em' } }, 'BESPLATNO'),
                React.createElement('h1', { style: { color: '#1a2740', fontSize: '24px', fontWeight: 'bold', marginBottom: '6px' } }, 'Kreirajte vas profil'),
                React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px' } }, 'Zapocnite izradu vaseg biznis plana')
              ),
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
                React.createElement('div', {},
                  React.createElement('label', { style: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#1a2740', marginBottom: '6px' } }, 'Ime i prezime'),
                  React.createElement('input', { type: 'text', value: name, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), placeholder: 'Vase ime i prezime', style: { width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' } })
                ),
                React.createElement('div', {},
                  React.createElement('label', { style: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#1a2740', marginBottom: '6px' } }, 'Email adresa'),
                  React.createElement('input', { type: 'email', value: email, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), placeholder: 'vasa@email.com', style: { width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' } })
                ),
                React.createElement('div', {},
                  React.createElement('label', { style: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#1a2740', marginBottom: '6px' } }, 'Lozinka'),
                  React.createElement('input', { type: 'password', value: password, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), placeholder: 'Najmanje 6 karaktera', style: { width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' } })
                ),
                React.createElement('div', {},
                  React.createElement('label', { style: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#1a2740', marginBottom: '6px' } }, 'Potvrdi lozinku'),
                  React.createElement('input', { type: 'password', value: confirm, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value), placeholder: 'Ponovite lozinku', onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleRegister() }, style: { width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' } })
                ),
                error && React.createElement('div', { style: { background: '#fef5f5', border: '1px solid #c0392b', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#c0392b' } }, error),
                React.createElement('button', { onClick: handleRegister, style: { background: '#1a2740', color: 'white', border: 'none', padding: '13px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', opacity: loading ? 0.7 : 1 } }, loading ? 'Kreiranje...' : 'Kreiraj racun'),
                React.createElement('p', { style: { textAlign: 'center', fontSize: '12px', color: '#6b7a99', margin: 0 } }, 'Vec imate racun? ', React.createElement('a', { href: '/login', style: { color: '#1a2740', fontWeight: '600', textDecoration: 'none' } }, 'Prijavite se'))
              )
            )
      )
    )
  )
}
