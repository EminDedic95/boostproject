import React from 'react'

export default function YouthBizPage() {
  return React.createElement('div', { style: { fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: '#f5f7fb', color: '#1a2740' } },

    React.createElement('style', {}, `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'DM Sans', 'Segoe UI', sans-serif; }
      .hero-section { background: #1a2740; position: relative; overflow: hidden; }
      .hero-section::before { content: ''; position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; border-radius: 50%; background: rgba(201,162,39,0.08); pointer-events: none; }
      .hero-section::after { content: ''; position: absolute; bottom: -150px; left: -50px; width: 400px; height: 400px; border-radius: 50%; background: rgba(201,162,39,0.05); pointer-events: none; }
      .country-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
      .country-card { transition: all 0.3s ease; }
      .stat-number { font-family: 'DM Serif Display', serif; }
      .bootcamp-card { background: linear-gradient(135deg, #1a2740 0%, #243553 100%); }
      .partner-logo { transition: opacity 0.2s; }
      .partner-logo:hover { opacity: 0.7; }
      @media (max-width: 768px) {
        .hero-grid { grid-template-columns: 1fr !important; }
        .stats-grid { grid-template-columns: 1fr 1fr !important; }
        .countries-grid { grid-template-columns: 1fr !important; }
        .bootcamp-grid { grid-template-columns: 1fr !important; }
        .partners-grid { grid-template-columns: repeat(2, 1fr) !important; }
      }
    `),

    React.createElement('nav', {
      style: { background: '#1a2740', padding: '0 48px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.08)' }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
        React.createElement('div', { style: { width: '32px', height: '32px', background: '#C9A227', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement('span', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '800' } }, 'YB')
        ),
        React.createElement('span', { style: { color: 'white', fontSize: '16px', fontWeight: '700', letterSpacing: '-0.02em' } }, 'YouthBiz Catalyst')
      ),
      React.createElement('div', { style: { display: 'flex', gap: '32px', alignItems: 'center' } },
        ...['O projektu', 'Aktivnosti', 'Partneri'].map(item =>
          React.createElement('a', { key: item, href: '#', style: { color: 'rgba(255,255,255,0.65)', fontSize: '14px', textDecoration: 'none', fontWeight: '500' } }, item)
        ),
        React.createElement('a', { href: '#', style: { background: '#C9A227', color: '#1a2740', padding: '8px 20px', borderRadius: '24px', fontSize: '14px', fontWeight: '700', textDecoration: 'none' } }, 'Saznajte vise')
      )
    ),

    React.createElement('section', { className: 'hero-section', style: { padding: '100px 48px 120px', position: 'relative' } },
      React.createElement('div', { style: { maxWidth: '1100px', margin: '0 auto' } },
        React.createElement('div', { className: 'hero-grid', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' } },
          React.createElement('div', {},
            React.createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' } },
              React.createElement('span', { style: { background: 'rgba(201,162,39,0.15)', color: '#C9A227', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.08em' } }, 'BOOST BALKANS'),
              React.createElement('span', { style: { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.08em' } }, 'EU ALDA INITIATIVE')
            ),
            React.createElement('h1', { style: { fontFamily: "'DM Serif Display', serif", color: 'white', fontSize: '52px', lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' } }, 'Katalizator mladih preduzetnika Zapadnog Balkana'),
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: '17px', lineHeight: 1.7, marginBottom: '36px', maxWidth: '480px' } }, 'YouthBiz Catalyst je regionalni program koji razvija preduzetnicki potencijal mladih kroz obuke, mentorstvo i izgradnju biznis planova u Bosni i Hercegovini, Srbiji i Crnoj Gori.'),
            React.createElement('div', { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' } },
              React.createElement('a', { href: '#aktivnosti', style: { background: '#C9A227', color: '#1a2740', padding: '14px 32px', borderRadius: '32px', fontWeight: '700', fontSize: '15px', textDecoration: 'none', display: 'inline-block' } }, 'Pogledajte aktivnosti'),
              React.createElement('a', { href: '#o-projektu', style: { background: 'rgba(255,255,255,0.08)', color: 'white', padding: '14px 32px', borderRadius: '32px', fontWeight: '600', fontSize: '15px', textDecoration: 'none', display: 'inline-block', border: '1px solid rgba(255,255,255,0.15)' } }, 'O projektu')
            )
          ),
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
            ...[
              { n: '3', label: 'Zemlje', sub: 'BiH, Srbija, Crna Gora' },
              { n: '100+', label: 'Mladih preduzetnika', sub: 'Direktni korisnici' },
              { n: '12+', label: 'Radionica', sub: 'Obuke i treninzi' },
              { n: '1', label: 'Bootcamp', sub: 'Regionalni event, BiH' },
            ].map((stat, i) => React.createElement('div', { key: i, style: { background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)' } },
              React.createElement('div', { className: 'stat-number', style: { fontSize: '40px', fontWeight: '700', color: '#C9A227', marginBottom: '4px', fontFamily: "'DM Serif Display', serif" } }, stat.n),
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '600', color: 'white', marginBottom: '2px' } }, stat.label),
              React.createElement('div', { style: { fontSize: '12px', color: 'rgba(255,255,255,0.45)' } }, stat.sub)
            ))
          )
        )
      )
    ),

    React.createElement('section', { id: 'o-projektu', style: { padding: '100px 48px', background: 'white' } },
      React.createElement('div', { style: { maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' } },
        React.createElement('div', {},
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '20px' } }, 'O PROJEKTU'),
          React.createElement('h2', { style: { fontFamily: "'DM Serif Display', serif", fontSize: '40px', color: '#1a2740', lineHeight: 1.2, marginBottom: '20px' } }, 'Izgradnja preduzetniske kulture na Zapadnom Balkanu'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '16px', lineHeight: 1.7, marginBottom: '16px' } }, 'YouthBiz Catalyst je regionalni projekat koji kroz strukturirane programe obuke, mentorstvo i prakticne radionice podrz\u0161ava mlade ljude da pretvore svoje ideje u odrzive poslovne planove.'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' } }, 'Projekt se implementira u tri zemlje Zapadnog Balkana — Bosni i Hercegovini, Srbiji i Crnoj Gori — sa fokusom na kreativne industrije i digitalno preduzetnistvo.'),
          React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            ...[
              'ILO metodologije: SIYB, DYB i SYB programi obuke',
              'Regionalna mreza mladih preduzetnika',
              'Digitalni alati za izradu biznis planova',
            ].map((item, i) => React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'flex-start', gap: '12px' } },
              React.createElement('div', { style: { width: '20px', height: '20px', borderRadius: '50%', background: '#C9A227', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' } },
                React.createElement('span', { style: { color: '#1a2740', fontSize: '11px', fontWeight: '800' } }, 'v')
              ),
              React.createElement('span', { style: { color: '#1a2740', fontSize: '14px', lineHeight: 1.5 } }, item)
            ))
          )
        ),
        React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '24px', padding: '40px' } },
          React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
            ...[
              { label: 'Trajanje projekta', value: '[Placeholder]' },
              { label: 'Budzet', value: '[Placeholder]' },
              { label: 'Implementator', value: 'BOOST Balkans' },
              { label: 'Finansijer', value: 'EU ALDA Initiative' },
              { label: 'Fokus', value: 'Kreativne industrije' },
              { label: 'Uzrasna grupa', value: '18 — 35 godina' },
            ].map((item, i) => React.createElement('div', { key: i, style: { background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' } },
              React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' } }, item.label),
              React.createElement('div', { style: { fontSize: '14px', fontWeight: '700', color: '#1a2740' } }, item.value)
            ))
          )
        )
      )
    ),

    React.createElement('section', { id: 'aktivnosti', style: { padding: '100px 48px', background: '#f5f7fb' } },
      React.createElement('div', { style: { maxWidth: '1100px', margin: '0 auto' } },
        React.createElement('div', { style: { textAlign: 'center', marginBottom: '56px' } },
          React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '16px' } }, 'RADIONICE'),
          React.createElement('h2', { style: { fontFamily: "'DM Serif Display', serif", fontSize: '40px', color: '#1a2740', marginBottom: '12px' } }, 'Regionalne radionice i obuke'),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '16px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 } }, 'Program se odvija u tri zemlje kroz intenzivne radionice prilagodjene lokalnom kontekstu i potrebama mladih preduzetnika.')
        ),
        React.createElement('div', { className: 'countries-grid', style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' } },
          ...[
            { country: 'Bosna i Hercegovina', flag: 'BA', color: '#2E75B6', bg: '#f0f7ff', sessions: '[X] radionica', participants: '[X] ucesnika', focus: 'Kreativne i digitalne industrije', status: 'Zavrseno', statusColor: '#2d7a4f', statusBg: '#f0faf4' },
            { country: 'Srbija', flag: 'RS', color: '#c0392b', bg: '#fef5f5', sessions: '[X] radionica', participants: '[X] ucesnika', focus: 'Preduzetnistivo u kreativnom sektoru', status: 'Zavrseno', statusColor: '#2d7a4f', statusBg: '#f0faf4' },
            { country: 'Crna Gora', flag: 'ME', color: '#2d7a4f', bg: '#f0faf4', sessions: '[X] radionica', participants: '[X] ucesnika', focus: 'Mladi preduzetnici i biznis ideje', status: 'Zavrseno', statusColor: '#2d7a4f', statusBg: '#f0faf4' },
          ].map((c, i) => React.createElement('div', { key: i, className: 'country-card', style: { background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
                React.createElement('div', { style: { width: '36px', height: '36px', borderRadius: '10px', background: c.bg, border: '2px solid ' + c.color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: c.color } }, c.flag),
                React.createElement('span', { style: { fontSize: '16px', fontWeight: '700', color: '#1a2740' } }, c.country)
              ),
              React.createElement('span', { style: { background: c.statusBg, color: c.statusColor, fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px' } }, c.status)
            ),
            React.createElement('div', { style: { display: 'flex', gap: '12px', marginBottom: '16px' } },
              React.createElement('div', { style: { flex: 1, background: '#f5f7fb', borderRadius: '10px', padding: '12px', textAlign: 'center' } },
                React.createElement('div', { style: { fontSize: '18px', fontWeight: '800', color: '#1a2740', fontFamily: "'DM Serif Display', serif" } }, c.sessions.split(' ')[0]),
                React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99' } }, 'Radionica')
              ),
              React.createElement('div', { style: { flex: 1, background: '#f5f7fb', borderRadius: '10px', padding: '12px', textAlign: 'center' } },
                React.createElement('div', { style: { fontSize: '18px', fontWeight: '800', color: '#1a2740', fontFamily: "'DM Serif Display', serif" } }, c.participants.split(' ')[0]),
                React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99' } }, 'Ucesnika')
              )
            ),
            React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', lineHeight: 1.5, borderTop: '1px solid #f5f7fb', paddingTop: '16px' } }, c.focus)
          ))
        )
      )
    ),

    React.createElement('section', { style: { padding: '0 48px 100px', background: '#f5f7fb' } },
      React.createElement('div', { style: { maxWidth: '1100px', margin: '0 auto' } },
        React.createElement('div', { className: 'bootcamp-grid bootcamp-card', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', borderRadius: '24px', overflow: 'hidden' } },
          React.createElement('div', { style: { padding: '56px' } },
            React.createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '24px' } },
              React.createElement('span', { style: { background: '#C9A227', color: '#1a2740', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.08em' } }, 'PREDSTOJECII EVENT'),
              React.createElement('span', { style: { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px' } }, 'BOSNA I HERCEGOVINA')
            ),
            React.createElement('h2', { style: { fontFamily: "'DM Serif Display', serif", fontSize: '38px', color: 'white', lineHeight: 1.2, marginBottom: '16px' } }, 'YouthBiz Catalyst Bootcamp'),
            React.createElement('p', { style: { color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' } }, 'Regionalni bootcamp koji ce okupiti ucesnike iz sve tri zemlje na intenzivnom programu razvoja biznis planova, mentorstva i umrezavanja.'),
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' } },
              ...[
                { icon: 'L', label: 'Lokacija', value: 'Mostar, Bosna i Hercegovina' },
                { icon: 'D', label: 'Datum', value: '[Placeholder datum]' },
                { icon: 'U', label: 'Ucesnici', value: 'Odabrani ucesnici iz BiH, Srbije i CG' },
              ].map((item, i) => React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: '12px' } },
                React.createElement('div', { style: { width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,162,39,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#C9A227', flexShrink: 0 } }, item.icon),
                React.createElement('div', {},
                  React.createElement('div', { style: { fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' } }, item.label),
                  React.createElement('div', { style: { fontSize: '14px', color: 'white', fontWeight: '600' } }, item.value)
                )
              ))
            ),
            React.createElement('a', { href: '#', style: { background: '#C9A227', color: '#1a2740', padding: '12px 28px', borderRadius: '24px', fontWeight: '700', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Saznajte vise o bootcampu')
          ),
          React.createElement('div', { style: { background: 'rgba(201,162,39,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' } },
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' } },
              ...[
                { n: '[X]', label: 'Dana intenzivnog programa' },
                { n: '[X]', label: 'Mentora i trenera' },
                { n: '[X]', label: 'Biznis planova' },
                { n: '[X]', label: 'Regionalnih partnera' },
              ].map((stat, i) => React.createElement('div', { key: i, style: { background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' } },
                React.createElement('div', { style: { fontFamily: "'DM Serif Display', serif", fontSize: '36px', color: '#C9A227', marginBottom: '8px' } }, stat.n),
                React.createElement('div', { style: { fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 } }, stat.label)
              ))
            )
          )
        )
      )
    ),

    React.createElement('section', { style: { padding: '100px 48px', background: 'white' } },
      React.createElement('div', { style: { maxWidth: '1100px', margin: '0 auto' } },
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' } },
          React.createElement('div', {},
            React.createElement('span', { style: { background: '#FFF8E7', color: '#C9A227', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '20px', border: '1px solid rgba(201,162,39,0.2)' } }, 'DIGITALNI ALAT'),
            React.createElement('h2', { style: { fontFamily: "'DM Serif Display', serif", fontSize: '38px', color: '#1a2740', lineHeight: 1.2, marginBottom: '16px' } }, 'Svaki ucesnik gradi svoj biznis plan digitalno'),
            React.createElement('p', { style: { color: '#6b7a99', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' } }, 'Ucesnici YouthBiz Catalyst programa koriste specijalizovani digitalni alat koji ih vodi kroz sve faze izrade profesionalnog biznis plana — od ideje do finansijskih projekcija.'),
            React.createElement('p', { style: { color: '#6b7a99', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' } }, 'Alat je prilagodjen Western Balkans trzisnom kontekstu i podrzava Bosanski jezik.'),
            React.createElement('a', { href: 'https://boostproject-cth5.vercel.app', target: '_blank', style: { background: '#1a2740', color: 'white', padding: '12px 28px', borderRadius: '24px', fontWeight: '700', fontSize: '14px', textDecoration: 'none', display: 'inline-block' } }, 'Isprobajte alat')
          ),
          React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '20px', padding: '32px', border: '1px solid #e2e8f0' } },
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
              ...[
                { n: '21', label: 'Sekcija biznis plana', desc: 'Od ideje do finansija' },
                { n: 'AI', label: 'AI asistent', desc: 'Podrska na svakom koraku' },
                { n: 'PDF', label: 'Export', desc: 'Profesionalni dokument' },
              ].map((item, i) => React.createElement('div', { key: i, style: { background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' } },
                React.createElement('div', { style: { width: '48px', height: '48px', borderRadius: '12px', background: '#1a2740', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: '#C9A227', flexShrink: 0 } }, item.n),
                React.createElement('div', {},
                  React.createElement('div', { style: { fontSize: '14px', fontWeight: '700', color: '#1a2740', marginBottom: '2px' } }, item.label),
                  React.createElement('div', { style: { fontSize: '12px', color: '#6b7a99' } }, item.desc)
                )
              ))
            )
          )
        )
      )
    ),

    React.createElement('section', { id: 'partneri', style: { padding: '80px 48px', background: '#f5f7fb' } },
      React.createElement('div', { style: { maxWidth: '1100px', margin: '0 auto', textAlign: 'center' } },
        React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '16px' } }, 'PARTNERI'),
        React.createElement('h2', { style: { fontFamily: "'DM Serif Display', serif", fontSize: '36px', color: '#1a2740', marginBottom: '48px' } }, 'Implementacioni partneri'),
        React.createElement('div', { className: 'partners-grid', style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' } },
          ...[
            { name: '[Partner BiH]', country: 'Bosna i Hercegovina', initial: 'BiH' },
            { name: '[Partner Srbija]', country: 'Srbija', initial: 'SRB' },
            { name: '[Partner CG]', country: 'Crna Gora', initial: 'CGO' },
            { name: 'BOOST Balkans', country: 'Regionalni koordinator', initial: 'BB' },
          ].map((p, i) => React.createElement('div', { key: i, className: 'partner-logo', style: { background: 'white', borderRadius: '16px', padding: '28px 20px', border: '1px solid #e2e8f0', textAlign: 'center' } },
            React.createElement('div', { style: { width: '52px', height: '52px', borderRadius: '14px', background: '#1a2740', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '12px', fontWeight: '800', color: '#C9A227' } }, p.initial),
            React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: '#1a2740', marginBottom: '4px' } }, p.name),
            React.createElement('div', { style: { fontSize: '11px', color: '#6b7a99' } }, p.country)
          ))
        )
      )
    ),

    React.createElement('footer', { style: { background: '#1a2740', padding: '48px', textAlign: 'center' } },
      React.createElement('div', { style: { maxWidth: '1100px', margin: '0 auto' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' } },
          React.createElement('div', { style: { width: '32px', height: '32px', background: '#C9A227', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement('span', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '800' } }, 'YB')
          ),
          React.createElement('span', { style: { color: 'white', fontSize: '16px', fontWeight: '700' } }, 'YouthBiz Catalyst')
        ),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '8px' } }, 'Implementira: BOOST Balkans | EU ALDA Initiative'),
        React.createElement('p', { style: { color: 'rgba(255,255,255,0.25)', fontSize: '12px' } }, '[Placeholder godina] YouthBiz Catalyst. Sva prava zadrzana.')
      )
    )
  )
}
