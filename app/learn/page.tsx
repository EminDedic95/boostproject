'use client'
import React, { useState } from 'react'

const QUESTIONS = [
  {
    id: 'q1',
    text: 'Gdje se nalazite u preduzetniskom putu?',
    options: ['Tek razmisljam o ideji', 'Imam ideju ali nisam poceo', 'Vec radim na tome'],
    scores: [0, 1, 2],
  },
  {
    id: 'q2',
    text: 'Da li ste razgovarali sa potencijalnim kupcima?',
    options: ['Nisam', 'Par razgovora', 'Da, imam povratne informacije'],
    scores: [0, 1, 2],
  },
  {
    id: 'q3',
    text: 'Koliko znate o vasoj konkurenciji?',
    options: ['Nista', 'Znam ko su ali nisam analizirao', 'Analizirao sam ih detaljno'],
    scores: [0, 1, 2],
  },
  {
    id: 'q4',
    text: 'Kako stojite sa finansijskim planiranjem?',
    options: ['Nisam poceo', 'Imam grubu procjenu', 'Imam detaljan finansijski plan'],
    scores: [0, 1, 2],
  },
  {
    id: 'q5',
    text: 'Da li znate kako cete doci do prvih kupaca?',
    options: ['Nemam ideju', 'Imam par ideja', 'Imam jasnu marketinsku strategiju'],
    scores: [0, 1, 2],
  },
  {
    id: 'q6',
    text: 'Sta vam je sada najpotrebnije?',
    options: ['Nauciti osnove biznisa', 'Strukturirati svoju ideju', 'Poceti pisati biznis plan'],
    scores: [0, 1, 2],
  },
]

const RESOURCES = {
  tools: [
    { title: 'Business Model Canvas', desc: 'Mapirajte vas poslovni model kroz 9 kljucnih blokova.', href: '/tools/canvas', tag: 'ALAT' },
    { title: 'SWOT Analiza', desc: 'Analizirajte snage, slabosti, prilike i prijetnje.', href: '/tools/swot', tag: 'ALAT' },
    { title: 'PEST Analiza', desc: 'Istrazite vanjsko okruzenje vaseg biznisa.', href: '/tools/pest', tag: 'ALAT' },
    { title: 'Porterovih 5 sila', desc: 'Analizirajte konkurentske sile u industriji.', href: '/tools/porter', tag: 'ALAT' },
    { title: 'Value Proposition Canvas', desc: 'Uskladite ponudu sa potrebama kupaca.', href: '/tools/vpc', tag: 'ALAT' },
    { title: 'Problem-Solution Fit', desc: 'Provjerite da li rjesavate pravi problem.', href: '/tools/psf', tag: 'ALAT' },
    { title: 'Konkurentska matrica', desc: 'Uporedite sebe sa konkurentima.', href: '/tools/competitive', tag: 'ALAT' },
    { title: 'AARRR Funnel', desc: 'Mapirajte rast vaseg biznisa.', href: '/tools/aarrr', tag: 'ALAT' },
    { title: '7Ps Marketing Mix', desc: 'Definisite svih 7 elemenata marketinga.', href: '/tools/7ps', tag: 'ALAT' },
  ],
  pdfs: [
    { title: 'BOOST Vodic za izradu biznis plana', desc: 'Kompletan vodic kroz sve dijelove biznis plana', tag: 'PDF' },
    { title: 'Business Model Canvas - Template', desc: 'Prazan Canvas template za stampanje', tag: 'PDF' },
    { title: 'SWOT Analiza - Radni list', desc: 'Radni list za SWOT analizu sa primjerima', tag: 'PDF' },
    { title: 'PEST Analiza - Vodic', desc: 'Kako provesti PEST analizu korak po korak', tag: 'PDF' },
    { title: 'Finansijske projekcije - Template', desc: 'Excel template za finansijske projekcije', tag: 'XLSX' },
  ],
  videos: [
    { title: 'Kako ispuniti Business Model Canvas', step: 'DIO II' },
    { title: 'PEST analiza - Vodic', step: 'DIO III' },
    { title: 'SWOT analiza za pocetnike', step: 'DIO IV' },
    { title: 'Analiza trzista i konkurencije', step: 'DIO V' },
    { title: 'Finansijske projekcije korak po korak', step: 'DIO IX' },
  ],
}

type Level = 1 | 2 | 3

const PROFILES: Record<Level, { label: string, sublabel: string, color: string, bg: string, desc: string }> = {
  1: {
    label: 'Pocetnik',
    sublabel: 'Preporuka: Edukativni materijali',
    color: '#2E75B6',
    bg: '#f0f7ff',
    desc: 'Vas rezultat pokazuje da ste na pocetku preduzetniskog puta. Preporucujemo da prije izrade biznis plana proucite nase materijale, alate i vodice. To ce vam pomoci da razumijete kljucne koncepte i budete spremniji za sljedeci korak.',
  },
  2: {
    label: 'Spreman za akciju',
    sublabel: 'Preporuka: BOOST Builder',
    color: '#C9A227',
    bg: '#fffbf0',
    desc: 'Imate solidno razumijevanje biznisa i spremni ste za izradu profesionalnog biznis plana. Nas builder ce vas provesti kroz sve 21 sekciju korak po korak, od ideje do finansijskih projekcija.',
  },
  3: {
    label: 'Napredan preduzetnik',
    sublabel: 'Preporuka: Builder + Konsultacije',
    color: '#2d7a4f',
    bg: '#f0faf4',
    desc: 'Vas nivo znanja i iskustva je iznad prosjeka. Preporucujemo da koristite BOOST Builder za izradu plana uz individualnu konsultaciju sa nasim ekspertima koji ce vam pomoci da maksimizirate potencijal vaseg biznisa.',
  },
}

function getLevel(totalScore: number): Level {
  const max = QUESTIONS.length * 2
  const pct = totalScore / max
  if (pct < 0.4) return 1
  if (pct < 0.75) return 2
  return 3
}

export default function LearnPage() {
  const [phase, setPhase] = useState<'intro' | 'questions' | 'results'>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [level, setLevel] = useState<Level | null>(null)

  function handleAnswer(optionIndex: number) {
    const newAnswers = [...answers, optionIndex]
    if (currentQ < QUESTIONS.length - 1) {
      setAnswers(newAnswers)
      setCurrentQ(currentQ + 1)
    } else {
      const total = newAnswers.reduce((s, a, i) => s + QUESTIONS[i].scores[a], 0)
      setLevel(getLevel(total))
      setAnswers(newAnswers)
      setPhase('results')
    }
  }

  function restart() {
    setPhase('intro')
    setCurrentQ(0)
    setAnswers([])
    setLevel(null)
  }

  const pct = Math.round((currentQ / QUESTIONS.length) * 100)
  const profile = level ? PROFILES[level] : null

  return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5f7fb' } },

    React.createElement('nav', { style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', gap: '16px', alignItems: 'center' } },
        React.createElement('a', { href: '/profile', style: { color: '#6b7a99', fontSize: '14px', textDecoration: 'none' } }, 'Profil'),
        React.createElement('a', { href: '/resources', style: { color: '#6b7a99', fontSize: '14px', textDecoration: 'none' } }, 'Resursi'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '8px 20px', borderRadius: '24px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' } }, 'Builder')
      )
    ),

    phase === 'intro' && React.createElement('main', { style: { maxWidth: '580px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' } },
      React.createElement('div', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '4px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: '24px', letterSpacing: '0.08em' } }, 'PROCJENA ZNANJA'),
      React.createElement('h1', { style: { color: '#1a2740', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', lineHeight: 1.2 } }, 'Gdje se nalazite na preduzetniskom putu?'),
      React.createElement('p', { style: { color: '#6b7a99', fontSize: '16px', marginBottom: '48px', lineHeight: 1.7 } }, 'Odgovorite na 6 kratkih pitanja i dobit cete personalizovanu preporuku sta je vas sljedeci korak.'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '48px' } },
        ...[
          { n: '6', label: 'Pitanja', sub: 'Oko 2 minute' },
          { n: '3', label: 'Profila', sub: 'Pocetnik, Srednji, Napredan' },
          { n: '1', label: 'Preporuka', sub: 'Jasan sljedeci korak' },
        ].map((item, i) => React.createElement('div', { key: i, style: { background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', textAlign: 'center' } },
          React.createElement('div', { style: { fontSize: '28px', fontWeight: '800', color: '#1a2740', marginBottom: '4px' } }, item.n),
          React.createElement('div', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740', marginBottom: '2px' } }, item.label),
          React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99' } }, item.sub)
        ))
      ),
      React.createElement('button', {
        onClick: () => setPhase('questions'),
        style: { background: '#1a2740', color: 'white', border: 'none', padding: '16px 48px', borderRadius: '32px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }
      }, 'Zapocni procjenu')
    ),

    phase === 'questions' && React.createElement('main', { style: { maxWidth: '560px', margin: '0 auto', padding: '60px 24px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
        React.createElement('span', { style: { fontSize: '13px', color: '#6b7a99' } }, 'Pitanje ' + (currentQ + 1) + ' od ' + QUESTIONS.length),
        React.createElement('span', { style: { fontSize: '13px', color: '#6b7a99' } }, pct + '% zavrseno')
      ),
      React.createElement('div', { style: { height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '40px' } },
        React.createElement('div', { style: { height: '100%', width: pct + '%', background: '#C9A227', borderRadius: '4px', transition: 'width 0.3s ease' } })
      ),
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' } },
        React.createElement('h2', { style: { color: '#1a2740', fontSize: '22px', fontWeight: 'bold', marginBottom: '32px', lineHeight: 1.4 } }, QUESTIONS[currentQ].text),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
          ...QUESTIONS[currentQ].options.map((opt, i) => React.createElement('button', {
            key: i,
            onClick: () => handleAnswer(i),
            style: { background: '#f5f7fb', border: '2px solid #e2e8f0', borderRadius: '10px', padding: '16px 20px', textAlign: 'left', cursor: 'pointer', fontSize: '15px', color: '#1a2740', fontFamily: 'Segoe UI, sans-serif', transition: 'all 0.15s' },
            onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = '#C9A227'; e.currentTarget.style.background = '#fffbf0' },
            onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f5f7fb' },
          }, opt))
        )
      )
    ),

    phase === 'results' && level && profile && React.createElement('main', { style: { maxWidth: '800px', margin: '0 auto', padding: '60px 24px' } },

      React.createElement('div', { style: { background: profile.bg, border: '2px solid ' + profile.color, borderRadius: '20px', padding: '40px', marginBottom: '32px', textAlign: 'center' } },
        React.createElement('div', { style: { background: profile.color, color: 'white', fontSize: '12px', fontWeight: '700', padding: '4px 16px', borderRadius: '20px', display: 'inline-block', marginBottom: '16px', letterSpacing: '0.06em' } }, profile.sublabel),
        React.createElement('h1', { style: { color: '#1a2740', fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' } }, profile.label),
        React.createElement('p', { style: { color: '#444', fontSize: '15px', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto' } }, profile.desc)
      ),

      level === 1 && React.createElement('div', {},
        React.createElement('h2', { style: { color: '#1a2740', fontSize: '18px', fontWeight: '700', marginBottom: '20px' } }, 'Vasi preporuceni resursi'),

        React.createElement('h3', { style: { color: '#1F4E79', fontSize: '13px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' } }, 'Interaktivni alati'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' } },
          ...RESOURCES.tools.map((tool, i) => React.createElement('a', { key: i, href: tool.href, style: { background: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0', textDecoration: 'none', display: 'block' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' } },
              React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '9px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' } }, tool.tag),
              React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, tool.title)
            ),
            React.createElement('p', { style: { color: '#6b7a99', fontSize: '12px', margin: 0, lineHeight: 1.4 } }, tool.desc)
          ))
        ),

        React.createElement('h3', { style: { color: '#c0392b', fontSize: '13px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' } }, 'PDF Materijali'),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' } },
          ...RESOURCES.pdfs.map((pdf, i) => React.createElement('div', { key: i, style: { background: 'white', borderRadius: '10px', padding: '14px 18px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            React.createElement('div', {},
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' } },
                React.createElement('span', { style: { background: pdf.tag === 'PDF' ? '#FFEBEB' : '#EBF4EB', color: pdf.tag === 'PDF' ? '#c0392b' : '#2d7a4f', fontSize: '9px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' } }, pdf.tag),
                React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, pdf.title)
              ),
              React.createElement('p', { style: { color: '#6b7a99', fontSize: '12px', margin: 0 } }, pdf.desc)
            ),
            React.createElement('button', { style: { background: '#1a2740', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '16px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', flexShrink: 0, marginLeft: '12px' } }, 'Preuzmi')
          ))
        ),

        React.createElement('h3', { style: { color: '#C9A227', fontSize: '13px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' } }, 'Video tutorijali'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '32px' } },
          ...RESOURCES.videos.map((video, i) => React.createElement('div', { key: i, style: { background: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
            React.createElement('div', { style: { background: '#1a2740', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement('div', { style: { width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement('div', { style: { width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: '12px solid white', marginLeft: '3px' } })
              )
            ),
            React.createElement('div', { style: { padding: '12px' } },
              React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '9px', fontWeight: '700', padding: '2px 6px', borderRadius: '10px' } }, video.step),
              React.createElement('p', { style: { color: '#1a2740', fontSize: '12px', fontWeight: '600', margin: '6px 0 0', lineHeight: 1.3 } }, video.title)
            )
          ))
        ),

        React.createElement('div', { style: { background: '#1a2740', borderRadius: '16px', padding: '28px', textAlign: 'center' } },
          React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '16px' } }, 'Kad budete spremni, mozete zapoceti izradu vaseg biznis plana.'),
          React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'inline-block' } }, 'Pocni izradu biznis plana')
        )
      ),

      level === 2 && React.createElement('div', { style: { textAlign: 'center' } },
        React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0', marginBottom: '20px' } },
          React.createElement('h2', { style: { color: '#1a2740', fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' } }, 'Vas sljedeci korak je BOOST Builder'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' } }, 'Builder ce vas provesti kroz sve 21 sekciju profesionalnog biznis plana. Od opisivanja ideje, analize trzista, do finansijskih projekcija.'),
          React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '14px 40px', borderRadius: '32px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none', display: 'inline-block', marginBottom: '16px' } }, 'Otvori BOOST Builder'),
          React.createElement('div', {},
            React.createElement('a', { href: '/resources', style: { color: '#6b7a99', fontSize: '13px', textDecoration: 'underline' } }, 'Ili pogledajte resurse i alate')
          )
        )
      ),

      level === 3 && React.createElement('div', { style: { textAlign: 'center' } },
        React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0', marginBottom: '20px' } },
          React.createElement('h2', { style: { color: '#1a2740', fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' } }, 'Vas nivo je iznad prosjeka!'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', lineHeight: 1.7, marginBottom: '32px' } }, 'Preporucujemo kombinaciju BOOST Buildera za strukturirani biznis plan i individualne konsultacije sa nasim ekspertima koji ce vam pomoci maksimizirate potencijal.'),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
            React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '14px 24px', borderRadius: '12px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'block' } },
              React.createElement('div', { style: { fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.6)', marginBottom: '4px', letterSpacing: '0.06em' } }, 'KORAK 1'),
              'Otvori BOOST Builder'
            ),
            React.createElement('a', { href: 'mailto:info@boostbalkans.eu', style: { background: '#C9A227', color: '#1a2740', padding: '14px 24px', borderRadius: '12px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'block' } },
              React.createElement('div', { style: { fontSize: '11px', fontWeight: '600', color: 'rgba(26,39,64,0.6)', marginBottom: '4px', letterSpacing: '0.06em' } }, 'KORAK 2'),
              'Zakazi konsultaciju'
            )
          )
        )
      ),

      React.createElement('div', { style: { textAlign: 'center', marginTop: '24px' } },
        React.createElement('button', { onClick: restart, style: { background: 'none', border: 'none', color: '#6b7a99', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' } }, 'Ponovi procjenu')
      )
    )
  )
}
