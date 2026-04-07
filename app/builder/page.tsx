'use client'
import React, { useState } from 'react'

const STEPS = [
  { n: 1, label: 'Biznis ideja', tag: 'DIO I – Biznis ideja', title: 'Opišite svoju poslovnu ideju', desc: 'Ukratko opišite čime se vaše preduzeće bavi, koji problem rješava i ko su vaši kupci.', fields: [
    { label: 'Naziv preduzeća', placeholder: 'npr. Pekara Mostar d.o.o.', type: 'input' },
    { label: 'Opis poslovne ideje', placeholder: 'Opišite svoju ideju...', type: 'textarea' },
    { label: 'Koji problem rješavate?', placeholder: 'Problem koji vaš biznis rješava...', type: 'textarea' },
    { label: 'Ko su vaši kupci?', placeholder: 'Opišite ciljnu grupu...', type: 'textarea' },
  ]},
  { n: 2, label: 'Canvas model', tag: 'DIO II – Canvas model', title: 'Business Model Canvas', desc: 'Canvas model prikazuje kako vaše preduzeće kreira, isporučuje i zadržava vrijednost.', fields: [
    { label: 'Ključni partneri', placeholder: 'Ko su vaši ključni partneri i dobavljači?', type: 'textarea' },
    { label: 'Ključne aktivnosti', placeholder: 'Koje aktivnosti su ključne za vaš biznis?', type: 'textarea' },
    { label: 'Vrijednosna ponuda', placeholder: 'Kakvu vrijednost nudite kupcima?', type: 'textarea' },
    { label: 'Odnosi s kupcima', placeholder: 'Kako gradite odnose s kupcima?', type: 'textarea' },
    { label: 'Kanali prodaje', placeholder: 'Kako dopirjete do kupaca?', type: 'textarea' },
    { label: 'Segmenti kupaca', placeholder: 'Za koga kreirate vrijednost?', type: 'textarea' },
    { label: 'Ključni resursi', placeholder: 'Koji resursi su vam potrebni?', type: 'textarea' },
    { label: 'Struktura troškova', placeholder: 'Koji su vaši najveći troškovi?', type: 'textarea' },
    { label: 'Tokovi prihoda', placeholder: 'Kako zarađujete novac?', type: 'textarea' },
  ]},
  { n: 3, label: 'PEST analiza', tag: 'DIO III – PEST analiza', title: 'PEST analiza', desc: 'Analiza eksternog okruženja kroz Političke, Ekonomske, Socijalne i Tehnološke faktore.', fields: [
    { label: 'Politički faktori', placeholder: 'Zakoni, propisi, politička stabilnost...', type: 'textarea' },
    { label: 'Ekonomski faktori', placeholder: 'Inflacija, kurs, kupovna moć...', type: 'textarea' },
    { label: 'Socijalni faktori', placeholder: 'Demografija, kultura, trendovi...', type: 'textarea' },
    { label: 'Tehnološki faktori', placeholder: 'Inovacije, digitalizacija, automatizacija...', type: 'textarea' },
  ]},
  { n: 4, label: 'Porter & SWOT', tag: 'DIO III – Porter & SWOT', title: 'Porterovih 5 sila & SWOT analiza', desc: 'Analiza konkurentskog okruženja i internih snaga i slabosti vašeg biznisa.', fields: [
    { label: 'Snage (Strengths)', placeholder: 'Šta vaš biznis radi dobro?', type: 'textarea' },
    { label: 'Slabosti (Weaknesses)', placeholder: 'Gdje ima prostora za poboljšanje?', type: 'textarea' },
    { label: 'Prilike (Opportunities)', placeholder: 'Koje vanjske prilike možete iskoristiti?', type: 'textarea' },
    { label: 'Prijetnje (Threats)', placeholder: 'Koje vanjske prijetnje postoje?', type: 'textarea' },
    { label: 'Konkurentska rivalnost', placeholder: 'Koliko je jaka konkurencija u vašoj industriji?', type: 'textarea' },
    { label: 'Pregovaračka moć kupaca', placeholder: 'Koliku moć imaju vaši kupci?', type: 'textarea' },
  ]},
  { n: 5, label: 'Tržište', tag: 'DIO IV – Analiza tržišta', title: 'Analiza tržišta', desc: 'Istražite tržište, konkurenciju i profil vašeg idealnog kupca.', fields: [
    { label: 'Veličina tržišta', placeholder: 'Koliko je veliko vaše ciljno tržište?', type: 'textarea' },
    { label: 'Ciljni segment', placeholder: 'Koji segment tržišta ciljate?', type: 'textarea' },
    { label: 'Profil idealnog kupca', placeholder: 'Opišite vašeg idealnog kupca...', type: 'textarea' },
    { label: 'Analiza konkurencije', placeholder: 'Ko su vaši glavni konkurenti?', type: 'textarea' },
  ]},
  { n: 6, label: 'Marketing', tag: 'DIO V – Marketinški plan', title: 'Marketinški plan', desc: 'Definišite kako ćete doći do kupaca i kako ćete komunicirati svoju vrijednosnu ponudu.', fields: [
    { label: 'Marketinški ciljevi', placeholder: 'Šta želite postići marketingom?', type: 'textarea' },
    { label: 'Marketinški kanali', placeholder: 'Koje kanale ćete koristiti?', type: 'textarea' },
    { label: 'Budžet za marketing', placeholder: 'Koliko planirate uložiti u marketing?', type: 'input' },
    { label: 'Ključne poruke', placeholder: 'Šta je vaša glavna marketinška poruka?', type: 'textarea' },
  ]},
  { n: 7, label: 'Procesi & tim', tag: 'DIO VI – Procesi i organizacija', title: 'Poslovni procesi i organizacija', desc: 'Opišite kako funkcioniše vaše preduzeće iznutra i ko su ključni ljudi.', fields: [
    { label: 'Ključni poslovni procesi', placeholder: 'Opišite glavne procese u vašem biznisu...', type: 'textarea' },
    { label: 'Organizacijska struktura', placeholder: 'Ko su ključni ljudi i koje su njihove uloge?', type: 'textarea' },
    { label: 'Pravni oblik registracije', placeholder: 'npr. d.o.o., s.p., d.d...', type: 'input' },
  ]},
  { n: 8, label: 'Finansije', tag: 'DIO VIII – Finansijske projekcije', title: 'Ekonomsko-finansijske projekcije', desc: 'Procijenite prihode, troškove i finansijsku održivost vašeg biznisa.', fields: [
    { label: 'Početna ulaganja (KM)', placeholder: 'Koliko novca trebate za početak?', type: 'input' },
    { label: 'Planirani mjesečni prihodi (KM)', placeholder: 'Koliko prihoda očekujete mjesečno?', type: 'input' },
    { label: 'Planirani mjesečni troškovi (KM)', placeholder: 'Koliki su vaši fiksni i varijabilni troškovi?', type: 'input' },
    { label: 'Tačka pokrića troškova', placeholder: 'Kada očekujete break-even?', type: 'textarea' },
    { label: 'Izvori finansiranja', placeholder: 'Vlastita sredstva, kredit, grant...', type: 'textarea' },
  ]},
]

export default function Builder() {
  const [current, setCurrent] = useState(0)
  const step = STEPS[current]
  const pct = Math.round(((current + 1) / STEPS.length) * 100)

  return React.createElement('div', {
    style: { fontFamily: 'Segoe UI, sans-serif', height: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr', overflow: 'hidden' }
  },

    React.createElement('nav', {
      style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
    },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
        React.createElement('span', { style: { fontSize: '13px', color: '#6b7a99' } }, `DIO ${current + 1} od ${STEPS.length}`),
        React.createElement('div', { style: { width: '120px', height: '4px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' } },
          React.createElement('div', { style: { width: `${pct}%`, height: '100%', background: '#C9A227', borderRadius: '4px', transition: 'width 0.4s ease' } })
        )
      )
    ),

    React.createElement('div', {
      style: { display: 'grid', gridTemplateColumns: '220px 1fr 320px', overflow: 'hidden' }
    },

      React.createElement('aside', {
        style: { borderRight: '1px solid #e2e8f0', overflowY: 'auto', padding: '16px 0', background: 'white' }
      },
        ...STEPS.map((s, i) =>
          React.createElement('div', {
            key: s.n,
            onClick: () => setCurrent(i),
            style: {
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 16px',
              borderLeft: i === current ? '3px solid #C9A227' : '3px solid transparent',
              background: i === current ? '#FFF8E7' : 'transparent',
              cursor: 'pointer'
            }
          },
            React.createElement('div', {
              style: {
                width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                background: i === current ? '#C9A227' : i < current ? '#2d7a4f' : '#f5f7fb',
                border: i === current ? 'none' : '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 'bold',
                color: i === current ? '#1a2740' : i < current ? 'white' : '#6b7a99'
              }
            }, i < current ? '✓' : s.n),
            React.createElement('span', {
              style: {
                fontSize: '13px',
                color: i === current ? '#1a2740' : '#6b7a99',
                fontWeight: i === current ? '600' : '400'
              }
            }, s.label)
          )
        )
      ),

      React.createElement('main', {
        style: { background: '#f5f7fb', overflowY: 'auto', padding: '40px' }
      },
        React.createElement('div', { style: { maxWidth: '640px' } },
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em', textTransform: 'uppercase' } }, step.tag),
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '12px 0 6px' } }, step.title),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6 } }, step.desc),

          ...step.fields.map(f =>
            React.createElement('div', { key: f.label, style: { background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '12px', border: '1px solid #e2e8f0' } },
              React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '8px', fontSize: '13px' } }, f.label),
              f.type === 'input'
                ? React.createElement('input', { type: 'text', placeholder: f.placeholder, style: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' } })
                : React.createElement('textarea', { placeholder: f.placeholder, rows: 3, style: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' } })
            )
          ),

          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '16px' } },
            current > 0 && React.createElement('button', {
              onClick: () => setCurrent(current - 1),
              style: { background: 'white', color: '#1a2740', border: '1px solid #e2e8f0', padding: '12px 28px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }
            }, '← Nazad'),
            React.createElement('button', {
              onClick: () => current < STEPS.length - 1 ? setCurrent(current + 1) : null,
              style: { background: '#1a2740', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginLeft: 'auto' }
            }, current === STEPS.length - 1 ? 'Završi ✓' : 'Naprijed →')
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
            React.createElement('p', { style: { fontSize: '13px', color: '#1a2740', lineHeight: 1.6, margin: 0 } }, `Zdravo! Nalazite se na koraku "${step.title}". Postavite mi pitanje i pomoći ću vam na osnovu BOOST vodiča za biznis planove. 💡`)
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
