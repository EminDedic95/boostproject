'use client'
import React, { useState } from 'react'

const PS = [
  {
    key: 'product', letter: 'P1', title: 'Product', subtitle: 'Proizvod', color: '#2E75B6', bg: '#f0f7ff',
    question: 'Sta prodajete?',
    tip: 'Opisite vas proizvod ili uslugu. Koje su kljucne karakteristike? Sta ga cini posebnim? Koji problemi rjesava?',
    placeholder: 'Opisite vas proizvod/uslugu, kljucne karakteristike, prednosti, pakovanje, kvalitet...',
    examples: 'Karakteristike, kvalitet, dizajn, brendiranje, pakovanje, garancija, podrska nakon kupovine',
  },
  {
    key: 'price', letter: 'P2', title: 'Price', subtitle: 'Cijena', color: '#c0392b', bg: '#fef5f5',
    question: 'Koliko kostaju vasi proizvodi/usluge?',
    tip: 'Kakva je vasa strategija odredjivanja cijena? Premium, ekonomicna, konkurentna? Koje su vase marze?',
    placeholder: 'Cjenovni model, popusti, uslovi placanja, cijenovni rang, strategija cijena...',
    examples: 'Cjenovni model, lista cijena, popusti, uvjeti placanja, kreditni uvjeti',
  },
  {
    key: 'place', letter: 'P3', title: 'Place', subtitle: 'Mjesto', color: '#2d7a4f', bg: '#f0faf4',
    question: 'Gdje i kako kupci kupuju od vas?',
    tip: 'Kroz koje kanale distribuirate vas proizvod? Fizicka lokacija, online, veleprodaja, maloprodaja?',
    placeholder: 'Fizicke lokacije, online prodaja, distributivna mreza, logistika, pokrivenost trzista...',
    examples: 'Fizicke prodavnice, online shop, veleprodaja, distribucija, logistika, skladistenje',
  },
  {
    key: 'promotion', letter: 'P4', title: 'Promotion', subtitle: 'Promocija', color: '#8e44ad', bg: '#faf0ff',
    question: 'Kako komunicirate sa kupcima?',
    tip: 'Koje marketinske kanale koristite? Oglasi, drustvene mreze, PR, email marketing, eventi?',
    placeholder: 'Marketinski kanali, oglasavanje, drustvene mreze, PR aktivnosti, promotivne kampanje...',
    examples: 'Oglasavanje, PR, drustvene mreze, email marketing, SEO, eventi, usmena preporuka',
  },
  {
    key: 'people', letter: 'P5', title: 'People', subtitle: 'Ljudi', color: '#C9A227', bg: '#fffbf0',
    question: 'Ko su kljucni ljudi u vasem biznisu?',
    tip: 'Koji zaposleni su u direktnom kontaktu sa kupcima? Kako obucavate tim? Kakva je kultura kompanije?',
    placeholder: 'Tim koji radi sa kupcima, obuka zaposlenih, kultura kompanije, korisnicka podrska...',
    examples: 'Zaposleni, korisnicka podrska, obuka, kultura kompanije, kupci, stakeholderi',
  },
  {
    key: 'process', letter: 'P6', title: 'Process', subtitle: 'Procesi', color: '#16a085', bg: '#f0fbf9',
    question: 'Kako isporucujete vrijednost kupcima?',
    tip: 'Koji su kljucni procesi od narudzbe do isporuke? Kako osiguravate konzistentnost i kvalitet?',
    placeholder: 'Tok narudzbe, isporuka, kvalitet kontrola, standardni operativni postupci, automatizacija...',
    examples: 'Tok usluge, standardni postupci, automatizacija, kvalitet kontrola, sistem narudzbe',
  },
  {
    key: 'physical', letter: 'P7', title: 'Physical Evidence', subtitle: 'Fizicki dokazi', color: '#e67e22', bg: '#fff8f0',
    question: 'Kako kupci vide i dokazuju vasu uslugu?',
    tip: 'Fizicki elementi koji podrzavaju vas brend: prostor, materijali, izgled, web stranica, certifikati...',
    placeholder: 'Fizicki prostor, brendiranje, web stranica, uniforme, materijali, certifikati, recenzije...',
    examples: 'Fizicki prostor, web stranica, brendirani materijali, uniforme, certifikati, online recenzije',
  },
]

function PCard({ p, value, onChange, active, onToggle }: { p: typeof PS[0], value: { desc: string }, onChange: (val: string) => void, active: boolean, onToggle: () => void }) {
  const [showTip, setShowTip] = useState(false)
  const filled = (value.desc || '').trim().length > 10

  return React.createElement('div', {
    style: { border: '2px solid ' + (active ? p.color : (filled ? p.color + '80' : '#e2e8f0')), borderRadius: '12px', overflow: 'hidden', transition: 'all 0.2s', boxShadow: active ? '0 4px 20px rgba(0,0,0,0.12)' : 'none' }
  },
    React.createElement('div', {
      onClick: onToggle,
      style: { background: active ? p.color : (filled ? p.color + '15' : '#fafafa'), padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }
    },
      React.createElement('div', { style: { width: '38px', height: '38px', borderRadius: '10px', background: active ? 'rgba(255,255,255,0.25)' : p.bg, border: '2px solid ' + p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
        React.createElement('span', { style: { fontSize: '11px', fontWeight: '800', color: active ? 'white' : p.color } }, p.letter)
      ),
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('div', { style: { fontWeight: '700', fontSize: '15px', color: active ? 'white' : '#1a2740' } }, p.title),
        React.createElement('div', { style: { fontSize: '12px', color: active ? 'rgba(255,255,255,0.8)' : '#6b7a99' } }, p.subtitle + ' — ' + p.question)
      ),
      React.createElement('div', { style: { width: '20px', height: '20px', borderRadius: '50%', background: filled ? (active ? 'white' : p.color) : 'transparent', border: '2px solid ' + (active ? 'white' : p.color), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '11px', color: filled ? (active ? p.color : 'white') : 'transparent' } }, 'v')
    ),
    active && React.createElement('div', { style: { padding: '16px', background: 'white' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' } },
        React.createElement('div', { style: { background: p.bg, borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: p.color, lineHeight: 1.5, flex: 1 } },
          React.createElement('span', { style: { fontWeight: '700' } }, 'Kljucni elementi: '),
          p.examples
        ),
        React.createElement('button', {
          onClick: (e: React.MouseEvent) => { e.stopPropagation(); setShowTip(!showTip) },
          style: { width: '28px', height: '28px', borderRadius: '50%', background: showTip ? p.color : p.bg, border: '1px solid ' + p.color, cursor: 'pointer', fontSize: '12px', fontWeight: '700', color: showTip ? 'white' : p.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }
        }, '?')
      ),
      showTip && React.createElement('div', { style: { background: '#1a2740', color: 'white', borderRadius: '8px', padding: '10px 14px', marginBottom: '12px', fontSize: '12px', lineHeight: 1.6 } }, p.tip),
      React.createElement('textarea', {
        value: value.desc || '',
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
        placeholder: p.placeholder,
        autoFocus: true,
        style: { width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', outline: 'none', resize: 'vertical', minHeight: '100px', fontFamily: 'Segoe UI, sans-serif', color: '#1a2740', lineHeight: 1.6, boxSizing: 'border-box' }
      })
    )
  )
}

export default function SevenPsTool() {
  const [data, setData] = useState<Record<string, { desc: string }>>({})
  const [active, setActive] = useState<string | null>('product')

  function handleChange(key: string, val: string) {
    setData(prev => ({ ...prev, [key]: { desc: val } }))
  }

  const filled = PS.filter(p => (data[p.key]?.desc || '').trim().length > 10).length

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
    React.createElement('main', { style: { maxWidth: '820px', margin: '0 auto', padding: '40px 24px' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' } },
        React.createElement('div', {},
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.06em' } }, 'ALAT'),
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '26px', fontWeight: 'bold', margin: '8px 0 4px' } }, '7Ps Marketing Mix'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', margin: 0 } }, 'Definisite svih 7 elemenata vaseg marketinskog miksa. Kliknite na svaki P za detalje.')
        ),
        React.createElement('div', { style: { display: 'flex', gap: '10px', alignItems: 'center' } },
          React.createElement('span', { style: { fontSize: '13px', color: '#6b7a99' } }, filled + '/7 popunjeno'),
          React.createElement('button', { onClick: () => window.print(), style: { background: 'white', border: '1px solid #e2e8f0', color: '#1a2740', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' } }, 'Stampa / PDF'),
          React.createElement('a', { href: '/builder', style: { background: '#1a2740', color: 'white', padding: '10px 20px', borderRadius: '24px', fontWeight: '600', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Puni biznis plan')
        )
      ),

      React.createElement('div', { style: { marginBottom: '16px' } },
        React.createElement('div', { style: { height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' } },
          React.createElement('div', { style: { height: '100%', width: (filled / 7 * 100) + '%', background: 'linear-gradient(90deg, #2E75B6, #C9A227)', borderRadius: '4px', transition: 'width 0.4s ease' } })
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } },
          ...PS.map(p =>
            React.createElement('div', { key: p.key, style: { textAlign: 'center' } },
              React.createElement('div', { style: { width: '28px', height: '28px', borderRadius: '50%', background: (data[p.key]?.desc || '').length > 10 ? p.color : '#e2e8f0', margin: '0 auto 2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '800', color: 'white', cursor: 'pointer', transition: 'background 0.3s' }, onClick: () => setActive(active === p.key ? null : p.key) }, p.letter),
              React.createElement('div', { style: { fontSize: '9px', color: '#6b7a99' } }, p.subtitle)
            )
          )
        )
      ),

      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' } },
        ...PS.map(p =>
          React.createElement(PCard, {
            key: p.key, p,
            value: data[p.key] || { desc: '' },
            onChange: (val: string) => handleChange(p.key, val),
            active: active === p.key,
            onToggle: () => setActive(active === p.key ? null : p.key)
          })
        )
      ),

      React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '12px', padding: '16px 20px', border: '1px solid #e2e8f0', marginBottom: '32px' } },
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: 0, lineHeight: 1.6 } }, 'Savjet: 7Ps Marketing Mix je prosirenje klasicnih 4Ps (Proizvod, Cijena, Mjesto, Promocija) sa dodatna 3 elementa (Ljudi, Procesi, Fizicki dokazi) koji su posebno vazni za usluzne biznise. Svi elementi moraju biti uskladjeni da bi marketing bio efikasan.')
      ),

      React.createElement('div', { style: { background: '#1a2740', borderRadius: '16px', padding: '32px', textAlign: 'center' } },
        React.createElement('h3', { style: { color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' } }, 'Zelite kompletan biznis plan?'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '20px' } }, '7Ps Marketing Mix je kljucni dio marketinskog plana. Izradite kompletan profesionalni biznis plan uz AI podrsku.'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '12px 32px', borderRadius: '24px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none', display: 'inline-block' } }, 'Pocni izradu biznis plana')
      )
    )
  )
}
