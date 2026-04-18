'use client'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const STEPS_COUNT = 21
const MODULES_COUNT = 8

export default function ProfilePage() {
  const [user, setUser] = useState<{ id: string, email: string } | null>(null)
  const [profile, setProfile] = useState<{ name: string, created_at: string } | null>(null)
  const [planStep, setPlanStep] = useState(0)
  const [learningDone, setLearningDone] = useState(0)
  const [learningProfile, setLearningProfile] = useState<string | null>(null)
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
          setLearningProfile(s.profile || null)
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

  if (loading) return React.createElement('div', {
    style: { fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  },
    React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px' } }, 'Ucitavanje...')
  )

  const planPct = Math.round((planStep / STEPS_COUNT) * 100)
  const learnPct = Math.round((learningDone / MODULES_COUNT) * 100)
  const joinDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString('hr-HR') : '—'
  const firstName = profile?.name ? profile.name.split(' ')[0] : user?.email?.split('@')[0] || ''

  const profileLabels: Record<string, { label: string, color: string }> = {
    pocetnik: { label: 'Pocetnik preduzetnik', color: '#2E75B6' },
    srednji: { label: 'U razvoju', color: '#C9A227' },
    napredan: { label: 'Iskusan preduzetnik', color: '#2d7a4f' },
  }
  const profileInfo = learningProfile ? profileLabels[learningProfile] : null

  return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5f7fb' } },

    React.createElement('nav', { style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', gap: '16px', alignItems: 'center' } },
        React.createElement('span', { style: { fontSize: '14px', color: '#6b7a99' } }, user?.email),
        React.createElement('button', { onClick: handleSignOut, style: { background: 'none', border: '1px solid #e2e8f0', color: '#6b7a99', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer' } }, 'Odjava')
      )
    ),

    React.createElement('main', { style: { maxWidth: '820px', margin: '0 auto', padding: '64px 24px' } },

      React.createElement('div', { style: { marginBottom: '48px' } },
        React.createElement('h1', { style: { color: '#1a2740', fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' } }, 'Zdravo, ' + firstName + '!'),
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '16px' } }, 'Sta zelite raditi danas?')
      ),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' } },

        React.createElement('div', {
          style: { background: '#1a2740', borderRadius: '20px', padding: '36px', position: 'relative', overflow: 'hidden', cursor: 'pointer' },
          onClick: () => window.location.href = '/builder'
        },
          React.createElement('div', { style: { position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(201,162,39,0.15)' } }),
          React.createElement('div', { style: { position: 'absolute', bottom: '-30px', right: '30px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(201,162,39,0.1)' } }),
          React.createElement('div', { style: { background: '#C9A227', color: '#1a2740', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '20px', letterSpacing: '0.06em' } }, 'BIZNIS PLAN'),
          React.createElement('h2', { style: { color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', lineHeight: 1.2 } }, 'Izradi biznis plan'),
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6 } }, 'Korak-po-korak vodic kroz 21 sekciju profesionalnog biznis plana uz AI podrsku.'),
          planStep > 0
            ? React.createElement('div', {},
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' } },
                  React.createElement('span', { style: { fontSize: '12px', color: 'rgba(255,255,255,0.6)' } }, 'Napredak'),
                  React.createElement('span', { style: { fontSize: '12px', fontWeight: '700', color: '#C9A227' } }, planPct + '%')
                ),
                React.createElement('div', { style: { height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' } },
                  React.createElement('div', { style: { height: '100%', width: planPct + '%', background: '#C9A227', borderRadius: '4px' } })
                ),
                React.createElement('div', { style: { background: '#C9A227', color: '#1a2740', padding: '11px 28px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', display: 'inline-block' } }, 'Nastavi plan')
              )
            : React.createElement('div', { style: { background: '#C9A227', color: '#1a2740', padding: '11px 28px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', display: 'inline-block' } }, 'Zapocni izradu')
        ),

        React.createElement('div', {
          style: { background: 'white', borderRadius: '20px', padding: '36px', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden', cursor: 'pointer' },
          onClick: () => window.location.href = '/learn'
        },
          React.createElement('div', { style: { position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(45,122,79,0.06)' } }),
          React.createElement('div', { style: { background: '#f0faf4', color: '#2d7a4f', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '20px', letterSpacing: '0.06em', border: '1px solid rgba(45,122,79,0.2)' } }, 'UCENJE'),
          React.createElement('h2', { style: { color: '#1a2740', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', lineHeight: 1.2 } }, 'Putanja ucenja'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6 } }, 'Procijenite znanje, dobijte personalizovani plan ucenja sa teorijom, videima i kvizovima.'),
          learningProfile
            ? React.createElement('div', {},
                profileInfo && React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' } },
                  React.createElement('div', { style: { width: '8px', height: '8px', borderRadius: '50%', background: profileInfo.color } }),
                  React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: profileInfo.color } }, profileInfo.label)
                ),
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' } },
                  React.createElement('span', { style: { fontSize: '12px', color: '#6b7a99' } }, learningDone + ' od ' + MODULES_COUNT + ' modula'),
                  React.createElement('span', { style: { fontSize: '12px', fontWeight: '700', color: '#2d7a4f' } }, learnPct + '%')
                ),
                React.createElement('div', { style: { height: '4px', background: '#f5f7fb', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' } },
                  React.createElement('div', { style: { height: '100%', width: learnPct + '%', background: '#2d7a4f', borderRadius: '4px' } })
                ),
                React.createElement('div', { style: { background: '#1a2740', color: 'white', padding: '11px 28px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', display: 'inline-block' } }, 'Nastavi ucenje')
              )
            : React.createElement('div', { style: { background: '#1a2740', color: 'white', padding: '11px 28px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', display: 'inline-block' } }, 'Zapocni procjenu')
        )
      ),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' } },
        React.createElement('a', { href: '/resources', style: { background: 'white', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' } },
          React.createElement('div', { style: { width: '36px', height: '36px', borderRadius: '10px', background: '#EBF4FB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#1F4E79', flexShrink: 0 } }, 'R'),
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, 'Resursi i alati'),
            React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', marginTop: '2px' } }, 'Canvas, SWOT, PEST...')
          )
        ),
        React.createElement('a', { href: '/resources', style: { background: 'white', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' } },
          React.createElement('div', { style: { width: '36px', height: '36px', borderRadius: '10px', background: '#FFEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#c0392b', flexShrink: 0 } }, 'PDF'),
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, 'PDF materijali'),
            React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', marginTop: '2px' } }, 'Vodici i templates')
          )
        ),
        React.createElement('div', { style: { background: 'white', borderRadius: '12px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }, onClick: handleSignOut },
          React.createElement('div', { style: { width: '36px', height: '36px', borderRadius: '10px', background: '#f5f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#6b7a99', flexShrink: 0 } }, 'E'),
          React.createElement('div', {},
            React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, profile?.name || firstName),
            React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', marginTop: '2px' } }, 'Clan od ' + joinDate + ' · Odjava')
          )
        )
      )
    )
  )
}
