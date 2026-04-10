'use client'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const STEPS = [
  'Naslovna strana', 'Sazetak', 'Biznis ideja', 'Preduzetnik', 'Motivacija',
  'Canvas model', 'Vizija i ciljevi', 'Misija', 'PEST analiza', 'Porterovih 5',
  'SWOT', 'Analiza trzista', 'Marketing plan', 'Operacije', 'Pravna forma',
  'Analiza rizika', 'Prihodi', 'Ulaganja', 'Finansije', 'KPI i scenariji', 'Zakljucak'
]

export default function ProfilePage() {
  const [user, setUser] = useState<{ id: string, email: string } | null>(null)
  const [profile, setProfile] = useState<{ name: string, created_at: string } | null>(null)
  const [planStep, setPlanStep] = useState(0)
  const [learningDone, setLearningDone] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      setUser({ id: user.id, email: user.email || '' })
      const { data: prof } = await supabase.from('profiles').select('name, created_at').eq('id', user.id).single()
      if (prof) setProfile(prof)
      const { data: plan } = await supabase.from('user_plans').select('current_step').eq('user_id', user.id).single()
      if (plan) setPlanStep(plan.current_step || 0)
      const saved = localStorage.getItem('boost_learn')
      if (saved) {
        try {
          const s = JSON.parse(saved)
          setLearningDone((s.completedModules || []).length)
        } catch {}
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
    React.createElement('p', { style: { color: '#6b7a99' } }, 'Ucitavanje...')
  )

  const planPct = Math.round((planStep / STEPS.length) * 100)
  const learnPct = Math.round((learningDone / 8) * 100)
  const joinDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString('hr-HR') : '—'

  return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5f7fb' } },
    React.createElement('nav', { style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', gap: '16px', alignItems: 'center' } },
        React.createElement('a', { href: '/resources', style: { color: '#6b7a99', fontSize: '14px', textDecoration: 'none' } }, 'Resursi'),
        React.createElement('a', { href: '/learn', style: { color: '#6b7a99', fontSize: '14px', textDecoration: 'none' } }, 'Ucenje'),
        React.createElement('button', { onClick: handleSignOut, style: { background: 'none', border: '1px solid #e2e8f0', color: '#6b7a99', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer' } }, 'Odjava')
      )
    ),
    React.createElement('main', { style: { maxWidth: '860px', margin: '0 auto', padding: '40px 24px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' } },
        React.createElement('div', {},
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', marginBottom: '4px' } }, 'Zdravo, ' + (profile?.name || user?.email || '') + '!'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px' } }, 'Clan od ' + joinDate + ' · ' + (user?.email || ''))
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
          React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' } }, 'Nastavi biznis plan'),
          React.createElement('a', { href: '/learn', style: { background: '#1a2740', color: 'white', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', textDecoration: 'none' } }, 'Nastavi ucenje')
        )
      ),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' } },
        React.createElement('div', { style: { background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' } },
            React.createElement('span', { style: { fontSize: '14px', fontWeight: '700', color: '#1a2740' } }, 'Biznis plan'),
            React.createElement('span', { style: { fontSize: '20px', fontWeight: '800', color: '#C9A227' } }, planPct + '%')
          ),
          React.createElement('div', { style: { height: '8px', background: '#f5f7fb', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' } },
            React.createElement('div', { style: { height: '100%', width: planPct + '%', background: '#C9A227', borderRadius: '4px', transition: 'width 0.5s ease' } })
          ),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: '0 0 14px' } }, 'Korak ' + Math.min(planStep + 1, STEPS.length) + ' od ' + STEPS.length + ' — ' + (STEPS[planStep] || 'Zavrseno')),
          React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '8px 20px', borderRadius: '20px', fontWeight: '600', fontSize: '13px', textDecoration: 'none', display: 'inline-block' } }, planStep === 0 ? 'Zapocni' : 'Nastavi')
        ),

        React.createElement('div', { style: { background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' } },
            React.createElement('span', { style: { fontSize: '14px', fontWeight: '700', color: '#1a2740' } }, 'Putanja ucenja'),
            React.createElement('span', { style: { fontSize: '20px', fontWeight: '800', color: '#2d7a4f' } }, learnPct + '%')
          ),
          React.createElement('div', { style: { height: '8px', background: '#f5f7fb', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' } },
            React.createElement('div', { style: { height: '100%', width: learnPct + '%', background: '#2d7a4f', borderRadius: '4px', transition: 'width 0.5s ease' } })
          ),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: '0 0 14px' } }, learningDone + ' od 8 modula zavrseno'),
          React.createElement('a', { href: '/learn', style: { background: '#2d7a4f', color: 'white', padding: '8px 20px', borderRadius: '20px', fontWeight: '600', fontSize: '13px', textDecoration: 'none', display: 'inline-block' } }, learningDone === 0 ? 'Zapocni procjenu' : 'Nastavi ucenje')
        )
      ),

      React.createElement('div', { style: { background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '24px' } },
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '15px', fontWeight: '700', marginBottom: '16px' } }, 'Napredak biznis plana — po koracima'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '8px' } },
          ...STEPS.map((s, i) => {
            const done = i < planStep
            const active = i === planStep
            return React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', background: done ? '#f0faf4' : active ? '#FFF8E7' : '#f5f7fb', border: '1px solid ' + (done ? '#2d7a4f40' : active ? '#C9A22740' : '#e2e8f0') } },
              React.createElement('div', { style: { width: '18px', height: '18px', borderRadius: '50%', background: done ? '#2d7a4f' : active ? '#C9A227' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: done || active ? 'white' : '#6b7a99', fontWeight: 'bold', flexShrink: 0 } }, done ? 'v' : i + 1),
              React.createElement('span', { style: { fontSize: '11px', color: done ? '#2d7a4f' : active ? '#1a2740' : '#6b7a99', fontWeight: active ? '700' : '400', lineHeight: 1.2 } }, s)
            )
          })
        )
      ),

      React.createElement('div', { style: { background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' } },
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '15px', fontWeight: '700', marginBottom: '16px' } }, 'Postavke racuna'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f7fb' } },
            React.createElement('div', {},
              React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, 'Ime i prezime'),
              React.createElement('div', { style: { fontSize: '13px', color: '#6b7a99' } }, profile?.name || '—')
            )
          ),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f7fb' } },
            React.createElement('div', {},
              React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, 'Email adresa'),
              React.createElement('div', { style: { fontSize: '13px', color: '#6b7a99' } }, user?.email || '—')
            )
          ),
          React.createElement('div', { style: { paddingTop: '12px' } },
            React.createElement('button', { onClick: handleSignOut, style: { background: 'none', border: '1px solid #e53e3e', color: '#e53e3e', padding: '8px 20px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' } }, 'Odjava iz racuna')
          )
        )
      )
    )
  )
}
