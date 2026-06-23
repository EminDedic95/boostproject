import React from 'react'

const TOOLS = [
  { title: 'Business Model Canvas', desc: 'Interaktivni Canvas model sa 9 blokova. Popunite i preuzmite kao PDF.', href: '/tools/canvas', tag: 'ALAT' },
  { title: 'SWOT Analiza', desc: 'Analizirajte snage, slabosti, prilike i prijetnje vaseg biznisa.', href: '/tools/swot', tag: 'ALAT' },
  { title: 'PEST Analiza', desc: 'Analiza politickih, ekonomskih, socijalnih i tehnoloskih faktora.', href: '/tools/pest', tag: 'ALAT' },
  { title: 'Porterovih 5 sila', desc: 'Analizirajte konkurentske sile u vasoj industriji.', href: '/tools/porter', tag: 'ALAT' },
  { title: 'Value Proposition Canvas', desc: 'Uskladite svoju ponudu sa potrebama kupaca kroz 6 kljucnih elemenata.', href: '/tools/vpc', tag: 'ALAT' },
  { title: 'Matrica konkurentske analize', desc: 'Uporedite sebe sa do 3 konkurenta po kljucnim kriterijima sa ocjenama.', href: '/tools/competitive', tag: 'ALAT' },
  { title: 'Problem-Solution Fit Canvas', desc: 'Provjerite da li vase rjesenje zaista adresira stvarni problem kupaca.', href: '/tools/psf', tag: 'ALAT' },
  { title: '7Ps Marketing Mix', desc: 'Definisite svih 7 elemenata marketinskog miksa: Proizvod, Cijena, Mjesto, Promocija, Ljudi, Procesi, Fizicki dokazi.', href: '/tools/7ps', tag: 'ALAT' },
 ]

const PDFS = [
  { title: 'YouthBiz Vodic za izradu biznis plana', desc: 'Kompletan vodic kroz sve dijelove biznis plana', size: 'PDF' },
  { title: 'Finansijske projekcije - Template', desc: 'Excel template za finansijske projekcije', size: 'XLSX' },
]

export default function Resources() {
  return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f5f7fb' } },

    React.createElement('nav', {
      style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
    },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', gap: '24px', alignItems: 'center' } },
        React.createElement('a', { href: '/resources', style: { color: '#1a2740', fontSize: '14px', textDecoration: 'none', fontWeight: '600' } }, 'Resursi'),
        React.createElement('a', { href: '/profile', style: { color: '#6b7a99', fontSize: '14px', textDecoration: 'none' } }, 'Profil'),
        React.createElement('a', { href: '/builder', style: { background: '#C9A227', color: '#1a2740', padding: '8px 20px', borderRadius: '24px', fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' } }, 'Otvori builder')
      )
    ),

    React.createElement('main', { style: { maxWidth: '900px', margin: '0 auto', padding: '48px 24px' } },

      React.createElement('h1', { style: { color: '#1a2740', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' } }, 'Resursi i materijali'),
      React.createElement('p', { style: { color: '#6b7a99', fontSize: '15px', marginBottom: '48px' } }, 'Vodici, alati i materijali koji ce vam pomoci u izradi biznis plana.'),

      React.createElement('h2', { style: { color: '#1a2740', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' } },
        React.createElement('span', { style: { background: '#FFF8E7', color: '#C9A227', fontSize: '12px', padding: '3px 10px', borderRadius: '20px' } }, 'ALATI'),
        'Standalone poslovni alati'
      ),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '48px' } },
        ...TOOLS.map(tool =>
          React.createElement('div', { key: tool.title, style: { background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' } },
              React.createElement('span', { style: { background: tool.tag === 'ALAT' ? '#EBF4FB' : '#f5f7fb', color: tool.tag === 'ALAT' ? '#1F4E79' : '#6b7a99', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' } }, tool.tag),
              React.createElement('span', { style: { fontWeight: '600', color: '#1a2740', fontSize: '14px' } }, tool.title)
            ),
            React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', margin: '0 0 16px', lineHeight: 1.5 } }, tool.desc),
            tool.tag === 'ALAT'
              ? React.createElement('a', { href: tool.href, style: { background: '#1a2740', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' } }, 'Otvori alat')
              : React.createElement('span', { style: { color: '#6b7a99', fontSize: '13px' } }, 'Uskoro dostupno')
          )
        )
      ),

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
      )
    ),

    React.createElement('footer', {
      style: { background: '#1a2740', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '24px', fontSize: '13px', marginTop: '48px' }
    }, '2025 BOOST Balkans')
  )
}
