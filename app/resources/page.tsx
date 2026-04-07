import React from 'react'

const PDFS = [
  { title: 'BOOST Vodic za izradu biznis plana', desc: 'Kompletan vodic kroz sve dijelove biznis plana', size: 'PDF' },
  { title: 'Business Model Canvas - Template', desc: 'Prazan Canvas template za stampanje', size: 'PDF' },
  { title: 'SWOT Analiza - Radni list', desc: 'Radni list za SWOT analizu sa primjerima', size: 'PDF' },
  { title: 'PEST Analiza - Vodic', desc: 'Kako provesti PEST analizu korak po korak', size: 'PDF' },
  { title: 'Finansijske projekcije - Template', desc: 'Excel template za finansijske projekcije', size: 'XLSX' },
]

const VIDEOS = [
  { title: 'Kako ispuniti Business Model Canvas', step: 'DIO II', duration: 'Uskoro dostupno' },
  { title: 'PEST analiza - Vodic', step: 'DIO III', duration: 'Uskoro dostupno' },
  { title: 'SWOT analiza za pocetnike', step: 'DIO IV', duration: 'Uskoro dostupno' },
  { title: 'Analiza trzista i konkurencije', step: 'DIO V', duration: 'Uskoro dostupno' },
  { title: 'Finansijske projekcije korak po korak', step: 'DIO IX', duration: 'Uskoro dostupno' },
  { title: 'Socijalno preduzetnistvo', step: 'DIO X', duration: 'Uskoro dostupno' },
]

export default function Resources() {
  return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5f7fb' } },

    React.createElement('nav', {
      style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
    },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', gap: '24px', alignItems: 'center' } },
        React.createElement('a', { href: '/resources', style: { color: '#1a2740', fontSize: '14px', textDecoration: 'none', fontWeight: '600' } }, 'Resursi'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '8px 20px', borderRadius: '24px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' } }, 'Otvori builder')
      )
    ),

    React.createElement('main', { style: { maxWidth: '900px', margin: '0 auto', padding: '48px 24px' } },

      React.createElement('h1', { style: { color: '#1a2740', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' } }, 'Resursi i materijali'),
      React.createElement('p', { style: { color: '#6b7a99', fontSize: '15px', marginBottom: '48px' } }, 'Vodici, templates i video tutorijali koji ce vam pomoci u izradi biznis plana.'),

      React.createElement('h2', { style: { color: '#1a2740', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' } },
        React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '12px', padding: '3px 10px', borderRadius: '20px' } }, 'PDF'),
        'Dokumenti i templates'
      ),

      React.createElement('div', { style: { display: 'grid', gap: '12px', marginBottom: '48px' } },
        ...PDFS.map(pdf =>
          React.createElement('div', { key: pdf.title, style: { background: 'white', borderRadius: '12px', padding: '20px 24px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            React.createElement('div', {},
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' } },
                React.createElement('span', { style: { background: pdf.size === 'PDF' ? '#FFEBEB' : '#EBF4EB', color: pdf.size === 'PDF' ? '#c0392b' : '#2d7a4f', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' } }, pdf.size),
                React.createElement('span', { style: { fontWeight: '600', color: '#1a2740', fontSize: '14px' } }, pdf.title)
              ),
              React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: 0 } }, pdf.desc)
            ),
            React.createElement('button', {
              style: { background: '#1a2740', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', flexShrink: 0, marginLeft: '16px' }
            }, 'Preuzmi')
          )
        )
      ),

      React.createElement('h2', { style: { color: '#1a2740', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' } },
        React.createElement('span', { style: { background: '#FFF8E7', color: '#C9A227', fontSize: '12px', padding: '3px 10px', borderRadius: '20px' } }, 'VIDEO'),
        'Video tutorijali'
      ),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' } },
        ...VIDEOS.map(video =>
          React.createElement('div', { key: video.title, style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
            React.createElement('div', { style: { background: '#1a2740', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              React.createElement('div', { style: { width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement('div', { style: { width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid white', marginLeft: '4px' } })
              )
            ),
            React.createElement('div', { style: { padding: '16px' } },
              React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' } }, video.step),
              React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '600', margin: '8px 0 4px' } }, video.title),
              React.createElement('p', { style: { color: '#6b7a99', fontSize: '12px', margin: 0 } }, video.duration)
            )
          )
        )
      )
    ),

    React.createElement('footer', {
      style: { background: '#1a2740', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '24px', fontSize: '13px', marginTop: '48px' }
    }, '2025 BOOST Balkans - Faculty of Economics Mostar')
  )
}
