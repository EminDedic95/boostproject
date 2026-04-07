'use client'
import React, { useEffect } from 'react'

const css = `
:root {
  --green:#004A2C;--green-light:#00663D;--green-dark:#003321;
  --green-faint:rgba(0,74,44,0.07);--green-faint2:rgba(0,74,44,0.14);
  --dark:#1A1A1A;--gray:#666666;--gray-light:#E8E8E8;
  --white:#FFFFFF;--cream:#FAFAF8;--cream-dark:#F2F2EC;
  --gold:#A0700A;--gold-bg:#FDF5E0;--gold-border:rgba(160,112,10,0.22);
  --font-display:'Fraunces',serif;--font-body:'Inter',sans-serif;
  --shadow-sm:0 1px 4px rgba(0,0,0,0.05);--shadow-md:0 4px 16px rgba(0,74,44,0.08);
  --shadow-lg:0 12px 40px rgba(0,74,44,0.12);--shadow-xl:0 24px 64px rgba(0,74,44,0.16);
  --radius:12px;--radius-lg:20px;--max:1080px;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;}
body{font-family:var(--font-body);color:var(--dark);background:var(--white);line-height:1.7;overflow-x:hidden;letter-spacing:-0.01em;}
.container{max-width:var(--max);margin:0 auto;padding:0 2rem;width:100%;}
.section-badge{display:inline-block;color:var(--green);font-size:0.78rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:0.45rem 1.1rem;background:var(--green-faint);border-radius:50px;border:1px solid var(--green-faint2);margin-bottom:1.5rem;}
.section-header{text-align:center;max-width:640px;margin:0 auto 5rem;}
.section-header h2{font-family:var(--font-display);font-size:clamp(1.9rem,4vw,2.9rem);font-weight:700;color:var(--dark);letter-spacing:-0.02em;line-height:1.15;margin-bottom:1.1rem;}
.section-header p{font-size:1.05rem;color:var(--gray);line-height:1.75;}
nav{position:fixed;top:0;left:0;right:0;z-index:200;background:rgba(255,255,255,0.97);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--gray-light);transition:box-shadow 0.3s;}
nav.scrolled{box-shadow:0 2px 20px rgba(0,0,0,0.08);}
.nav-inner{max-width:var(--max);margin:0 auto;padding:0 2rem;height:68px;display:flex;align-items:center;justify-content:space-between;}
.nav-logo{font-family:var(--font-display);font-size:1.2rem;font-weight:700;color:var(--green);text-decoration:none;letter-spacing:-0.02em;}
.nav-links{display:flex;align-items:center;gap:2.5rem;}
.nav-links a:not(.nav-cta){color:var(--gray);font-size:0.9rem;font-weight:500;text-decoration:none;transition:color 0.2s;}
.nav-links a:not(.nav-cta):hover{color:var(--green);}
.nav-cta{background:var(--green);color:var(--white)!important;font-size:0.875rem!important;font-weight:500;padding:0.65rem 1.5rem;border-radius:8px;border:none;cursor:pointer;text-decoration:none;transition:background 0.2s,transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 14px rgba(0,74,44,0.25);}
.nav-cta:hover{background:var(--green-light)!important;transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,74,44,0.32);}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:6px;border:none;background:none;}
.hamburger span{display:block;width:22px;height:2px;background:var(--dark);border-radius:2px;transition:all 0.3s;}
.hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.hamburger.open span:nth-child(2){opacity:0;}
.hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
.mobile-menu{display:none;position:fixed;top:68px;left:0;right:0;bottom:0;background:var(--white);z-index:199;padding:2rem;flex-direction:column;gap:0;overflow-y:auto;}
.mobile-menu.open{display:flex;}
.mobile-menu a{font-size:1.05rem;font-weight:500;color:var(--dark);text-decoration:none;padding:1rem 0;border-bottom:1px solid var(--gray-light);}
.mobile-menu .nav-cta{margin-top:1.5rem;text-align:center;padding:1rem;border-radius:8px;border:none;background:var(--green);color:var(--white)!important;}
.hero{min-height:100vh;background:linear-gradient(155deg,var(--cream) 0%,var(--white) 50%,var(--cream-dark) 100%);display:flex;align-items:center;padding:10rem 2rem 7rem;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;top:-100px;right:-80px;width:580px;height:580px;background:radial-gradient(circle,rgba(0,74,44,0.06) 0%,transparent 65%);border-radius:50%;pointer-events:none;}
.hero::after{content:'';position:absolute;bottom:-80px;left:-60px;width:480px;height:480px;background:radial-gradient(circle,rgba(0,74,44,0.04) 0%,transparent 65%);border-radius:50%;pointer-events:none;}
.hero-inner{max-width:var(--max);margin:0 auto;width:100%;text-align:center;position:relative;z-index:1;}
.hero-eu-badge{display:inline-flex;align-items:center;gap:0.5rem;background:var(--gold-bg);border:1px solid var(--gold-border);color:var(--gold);font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:0.5rem 1.25rem;border-radius:50px;margin-bottom:2.5rem;animation:fadeUp 0.5s ease both;}
.hero h1{font-family:var(--font-display);font-size:clamp(2.6rem,6vw,4.5rem);font-weight:700;color:var(--dark);line-height:1.1;letter-spacing:-0.03em;max-width:760px;margin:0 auto 2rem;animation:fadeUp 0.55s 0.1s ease both;}
.hero h1 em{font-style:normal;color:var(--green);}
.hero-line{display:block;width:60px;height:3px;background:linear-gradient(90deg,transparent,var(--green),transparent);margin:0 auto 2rem;border-radius:2px;animation:fadeUp 0.5s 0.18s ease both;}
.hero-sub{font-size:clamp(1rem,2vw,1.15rem);color:var(--gray);max-width:560px;margin:0 auto 3.5rem;line-height:1.8;animation:fadeUp 0.55s 0.22s ease both;}
.hero-actions{display:flex;gap:1rem;align-items:center;justify-content:center;flex-wrap:wrap;animation:fadeUp 0.55s 0.3s ease both;}
.btn-primary{background:linear-gradient(135deg,var(--green),var(--green-light));color:var(--white);font-family:var(--font-body);font-size:1rem;font-weight:500;padding:1rem 2.5rem;border-radius:8px;border:none;cursor:pointer;text-decoration:none;transition:transform 0.25s,box-shadow 0.25s;box-shadow:0 6px 24px rgba(0,74,44,0.28);display:inline-block;}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,74,44,0.38);}
.btn-secondary{background:transparent;color:var(--dark);font-family:var(--font-body);font-size:1rem;font-weight:500;padding:1rem 2.5rem;border-radius:8px;border:1.5px solid rgba(0,0,0,0.18);cursor:pointer;text-decoration:none;transition:all 0.25s;display:inline-block;}
.btn-secondary:hover{border-color:var(--green);color:var(--green);transform:translateY(-3px);}
.hero-trust{display:flex;gap:2.5rem;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid var(--gray-light);animation:fadeUp 0.55s 0.4s ease both;position:relative;}
.hero-trust::before{content:'';position:absolute;top:-1px;left:50%;transform:translateX(-50%);width:48px;height:2px;background:linear-gradient(90deg,transparent,var(--green),transparent);}
.trust-item{display:flex;align-items:center;gap:0.5rem;color:var(--gray);font-size:0.85rem;font-weight:500;}
.trust-check{width:16px;height:16px;border-radius:50%;background:var(--green-faint);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.trust-check svg{width:10px;height:10px;color:var(--green);}
.stats{background:var(--white);border-top:1px solid var(--gray-light);border-bottom:1px solid var(--gray-light);padding:3.5rem 2rem;}
.stats-grid{max-width:var(--max);margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);text-align:center;}
.stat-item{padding:1.5rem 1rem;position:relative;}
.stat-item:not(:last-child)::after{content:'';position:absolute;right:0;top:50%;transform:translateY(-50%);height:44px;width:1px;background:var(--gray-light);}
.stat-num{font-family:var(--font-display);font-size:2.5rem;font-weight:700;color:var(--green);letter-spacing:-0.03em;line-height:1;}
.stat-label{font-size:0.82rem;color:var(--gray);margin-top:0.4rem;line-height:1.4;}
.features{padding:8rem 2rem;background:var(--white);}
.features-grid{max-width:var(--max);margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;}
.feat-card{background:linear-gradient(140deg,var(--white),var(--cream));border:1px solid var(--gray-light);border-radius:var(--radius-lg);padding:2.75rem;transition:transform 0.35s,box-shadow 0.35s,border-color 0.35s;position:relative;overflow:hidden;}
.feat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--green),var(--green-light));transform:scaleX(0);transform-origin:left;transition:transform 0.4s ease;}
.feat-card:hover::before{transform:scaleX(1);}
.feat-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg);border-color:rgba(0,74,44,0.18);}
.feat-icon{width:54px;height:54px;background:var(--green-faint);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:1.75rem;transition:background 0.3s;}
.feat-card:hover .feat-icon{background:var(--green-faint2);}
.feat-icon svg{width:24px;height:24px;color:var(--green);}
.feat-card h3{font-family:var(--font-display);font-size:1.3rem;font-weight:700;color:var(--dark);margin-bottom:0.75rem;letter-spacing:-0.01em;}
.feat-card p{font-size:0.93rem;color:var(--gray);line-height:1.75;}
.tools{padding:8rem 2rem;background:linear-gradient(160deg,var(--cream) 0%,var(--cream-dark) 100%);}
.tools-pills{display:flex;flex-wrap:wrap;gap:0.9rem;justify-content:center;margin-top:4rem;max-width:760px;margin-left:auto;margin-right:auto;}
.tool-pill{display:inline-flex;align-items:center;gap:0.65rem;background:var(--white);border:1px solid var(--gray-light);border-radius:50px;padding:0.85rem 1.6rem;font-size:0.88rem;font-weight:500;color:var(--dark);transition:all 0.25s;cursor:default;box-shadow:var(--shadow-sm);}
.tool-pill:hover{border-color:var(--green);color:var(--green);background:var(--green-faint);transform:translateY(-2px);box-shadow:var(--shadow-md);}
.tool-dot{width:7px;height:7px;border-radius:50%;background:var(--green);flex-shrink:0;}
.how{padding:8rem 2rem;background:var(--white);}
.steps-list{max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:1.25rem;}
.step{display:grid;grid-template-columns:56px 1fr;gap:1.5rem;align-items:flex-start;background:var(--cream);border:1px solid var(--gray-light);border-radius:var(--radius-lg);padding:2rem;transition:box-shadow 0.3s,border-color 0.3s;}
.step:hover{box-shadow:var(--shadow-md);border-color:rgba(0,74,44,0.18);}
.step-num{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--green-light));color:var(--white);font-family:var(--font-display);font-size:1.2rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px rgba(0,74,44,0.28);}
.step-content h4{font-family:var(--font-display);font-size:1.1rem;font-weight:700;color:var(--dark);margin-bottom:0.4rem;letter-spacing:-0.01em;}
.step-content p{font-size:0.9rem;color:var(--gray);line-height:1.7;}
.cta-band{padding:8rem 2rem;background:linear-gradient(135deg,var(--green-dark) 0%,var(--green) 55%,var(--green-light) 100%);text-align:center;position:relative;overflow:hidden;}
.cta-band::before{content:'';position:absolute;top:-120px;left:50%;transform:translateX(-50%);width:700px;height:700px;background:radial-gradient(circle,rgba(255,255,255,0.06) 0%,transparent 65%);border-radius:50%;pointer-events:none;}
.cta-band h2{font-family:var(--font-display);font-size:clamp(2rem,5vw,3.2rem);font-weight:700;color:var(--white);letter-spacing:-0.02em;line-height:1.15;margin-bottom:1.25rem;position:relative;}
.cta-band p{font-size:1.05rem;color:rgba(255,255,255,0.68);max-width:480px;margin:0 auto 3rem;line-height:1.75;position:relative;}
.btn-white{background:var(--white);color:var(--green);font-family:var(--font-body);font-size:1rem;font-weight:600;padding:1.1rem 2.75rem;border-radius:8px;border:none;cursor:pointer;text-decoration:none;transition:transform 0.25s,box-shadow 0.25s;box-shadow:0 8px 28px rgba(0,0,0,0.18);display:inline-block;}
.btn-white:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(0,0,0,0.24);}
.cta-note{margin-top:1.25rem;font-size:0.78rem;color:rgba(255,255,255,0.45);position:relative;}
footer{background:#111;padding:3.5rem 2rem;text-align:center;}
.footer-logo{font-family:var(--font-display);font-size:1.1rem;font-weight:700;color:var(--white);margin-bottom:1rem;display:block;letter-spacing:-0.01em;}
.footer-links{display:flex;gap:2rem;justify-content:center;flex-wrap:wrap;margin-bottom:1.75rem;}
.footer-links a{color:rgba(255,255,255,0.4);font-size:0.83rem;text-decoration:none;transition:color 0.2s;}
.footer-links a:hover{color:rgba(255,255,255,0.75);}
.footer-divider{width:40px;height:1px;background:rgba(255,255,255,0.12);margin:0 auto 1.5rem;}
.footer-copy{font-size:0.78rem;color:rgba(255,255,255,0.25);}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
.reveal{opacity:0;transform:translateY(26px);transition:opacity 0.65s ease,transform 0.65s ease;}
.reveal.in{opacity:1;transform:translateY(0);}
.d1{transition-delay:0.1s;}.d2{transition-delay:0.2s;}.d3{transition-delay:0.3s;}
@media(max-width:860px){.nav-links{display:none;}.hamburger{display:flex;}.stats-grid{grid-template-columns:repeat(2,1fr);}.features-grid{grid-template-columns:1fr;}}
@media(max-width:580px){.hero{padding:8rem 1.25rem 5rem;}.hero-actions{flex-direction:column;align-items:stretch;max-width:300px;margin:0 auto;}.btn-primary,.btn-secondary{text-align:center;padding:0.95rem 1.5rem;}}
`

export default function Home() {
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@300;400;500;600&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const nav = document.getElementById('lp-nav')
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll)

    const hamburger = document.getElementById('lp-hamburger')
    const mobileMenu = document.getElementById('lp-mobile-menu')
    const toggleMenu = () => {
      const open = mobileMenu?.classList.toggle('open')
      hamburger?.classList.toggle('open', open)
      document.body.style.overflow = open ? 'hidden' : ''
    }
    hamburger?.addEventListener('click', toggleMenu)

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      hamburger?.removeEventListener('click', toggleMenu)
    }
  }, [])

  return React.createElement(React.Fragment, {},
    React.createElement('style', { dangerouslySetInnerHTML: { __html: css } }),

    React.createElement('nav', { id: 'lp-nav' },
      React.createElement('div', { className: 'nav-inner' },
        React.createElement('a', { href: '/', className: 'nav-logo' }, 'BOOST Biznis Plan'),
        React.createElement('div', { className: 'nav-links' },
          React.createElement('a', { href: '#kako' }, 'Kako funkcionise'),
          React.createElement('a', { href: '#alati' }, 'Alati'),
          React.createElement('a', { href: '/builder', className: 'nav-cta' }, 'Pocni besplatno')
        ),
        React.createElement('button', { className: 'hamburger', id: 'lp-hamburger' },
          React.createElement('span'), React.createElement('span'), React.createElement('span')
        )
      )
    ),

    React.createElement('div', { className: 'mobile-menu', id: 'lp-mobile-menu' },
      React.createElement('a', { href: '#kako' }, 'Kako funkcionise'),
      React.createElement('a', { href: '#alati' }, 'Alati i analize'),
      React.createElement('a', { href: '/builder', className: 'nav-cta' }, 'Pocni besplatno')
    ),

    React.createElement('section', { className: 'hero' },
      React.createElement('div', { className: 'hero-inner' },
        React.createElement('div', { className: 'hero-eu-badge' }, 'BOOST BALKANS x EU'),
        React.createElement('h1', {}, 'Izradi profesionalni ', React.createElement('em', {}, 'biznis plan'), ' uz AI'),
        React.createElement('span', { className: 'hero-line' }),
        React.createElement('p', { className: 'hero-sub' }, 'Vodic koji vas korak po korak vodi kroz Canvas model, SWOT, PEST, finansijske projekcije i sve sto je potrebno za uspjesan biznis plan.'),
        React.createElement('div', { className: 'hero-actions' },
          React.createElement('a', { href: '/builder', className: 'btn-primary' }, 'Pocni izradu biznis plana'),
          React.createElement('a', { href: '#kako', className: 'btn-secondary' }, 'Pogledaj kako radi')
        ),
        React.createElement('div', { className: 'hero-trust' },
          ...['Besplatno', 'Na bosanskom jeziku', 'Bez registracije', 'EU certificiran program'].map(t =>
            React.createElement('div', { key: t, className: 'trust-item' },
              React.createElement('div', { className: 'trust-check' },
                React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '3' },
                  React.createElement('polyline', { points: '20,6 9,17 4,12' })
                )
              ),
              React.createElement('span', {}, t)
            )
          )
        )
      )
    ),

    React.createElement('section', { className: 'stats' },
      React.createElement('div', { className: 'stats-grid' },
        ...[
          { num: '8', label: 'dijelova biznis plana' },
          { num: '4', label: 'poslovne analize ukljucene' },
          { num: '100%', label: 'besplatno za korisnike' },
          { num: 'PDF', label: 'spreman za banku i investitore' },
        ].map((s, i) =>
          React.createElement('div', { key: i, className: 'stat-item reveal' },
            React.createElement('div', { className: 'stat-num' }, s.num),
            React.createElement('div', { className: 'stat-label' }, s.label)
          )
        )
      )
    ),

    React.createElement('section', { className: 'features' },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { className: 'section-header' },
          React.createElement('span', { className: 'section-badge reveal' }, 'Sve na jednom mjestu'),
          React.createElement('h2', { className: 'reveal' }, 'Sve sto vam treba za uspjesan biznis plan'),
          React.createElement('p', { className: 'reveal' }, 'Od poslovne ideje do gotovog dokumenta - AI vodi svaki korak, vi donosite odluke.')
        ),
        React.createElement('div', { className: 'features-grid' },
          ...[
            { title: 'AI asistent', desc: 'Unesite svoju poslovnu ideju - AI automatski generiše Business Model Canvas, SWOT, PEST analizu i Porterovih 5 sila prilagodenih vasem konkretnom biznisu.' },
            { title: 'Korak po korak vodic', desc: 'Strukturirani proces kroz svih 8 dijelova biznis plana. Svaki korak je jasan i objasnjeni, a AI je tu kada zapnete.' },
            { title: 'Resursi i vodici', desc: 'PDF materijali i video tutorijali koji detaljno objasnjanju svaki analiticki alat - Canvas, Porter, SWOT, PEST i finansijsko planiranje.' },
            { title: 'PDF izvoz', desc: 'Preuzmite kompletan, profesionalno formatiran biznis plan koji je odmah spreman za predaju banci, investitoru ili prijavu na grant.' },
          ].map((f, i) =>
            React.createElement('div', { key: i, className: 'feat-card reveal' + (i > 0 ? ' d' + i : '') },
              React.createElement('div', { className: 'feat-icon' },
                React.createElement('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.8' },
                  React.createElement('circle', { cx: '12', cy: '12', r: '10' })
                )
              ),
              React.createElement('h3', {}, f.title),
              React.createElement('p', {}, f.desc)
            )
          )
        )
      )
    ),

    React.createElement('section', { className: 'tools', id: 'alati' },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { className: 'section-header' },
          React.createElement('span', { className: 'section-badge reveal' }, 'Poslovni alati'),
          React.createElement('h2', { className: 'reveal' }, 'Sve analize ukljucene'),
          React.createElement('p', { className: 'reveal' }, 'Svaki alat koji profesionalni konsultanti koriste pri izradi biznis plana - dostupan odmah, uz AI podrsku.')
        ),
        React.createElement('div', { className: 'tools-pills reveal' },
          ...['Business Model Canvas', 'SWOT analiza', 'PEST analiza', 'Porterovih 5 sila', 'Finansijske projekcije', 'Analiza trzista', 'Marketinska strategija', 'Plan ljudskih resursa', 'Analiza rizika'].map(t =>
            React.createElement('div', { key: t, className: 'tool-pill' },
              React.createElement('span', { className: 'tool-dot' }),
              t
            )
          )
        )
      )
    ),

    React.createElement('section', { className: 'how', id: 'kako' },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { className: 'section-header' },
          React.createElement('span', { className: 'section-badge reveal' }, 'Proces'),
          React.createElement('h2', { className: 'reveal' }, 'Kako funkcionise?'),
          React.createElement('p', { className: 'reveal' }, 'Cetiri jednostavna koraka od ideje do gotovog biznis plana.')
        ),
        React.createElement('div', { className: 'steps-list' },
          ...[
            { n: '1', title: 'Opisite svoju poslovnu ideju', desc: 'U nekoliko recenica recite cime se bavite, ko su vasi kupci i na kom trzistu planirate poslovati.' },
            { n: '2', title: 'AI generise sve kljucne analize', desc: 'Canvas, SWOT, PEST i Porterovih 5 sila - sve se automatski popuni za vas biznis.' },
            { n: '3', title: 'Unesite finansijske projekcije', desc: 'Vodic vas vodi kroz svaki red - prihodi, troskovi, investicije, tok gotovine.' },
            { n: '4', title: 'Preuzmite profesionalni PDF', desc: 'Jednim klikom dobijate kompletan, formatiran biznis plan - spreman za banku ili investitora.' },
          ].map((s, i) =>
            React.createElement('div', { key: i, className: 'step reveal' + (i > 0 ? ' d' + i : '') },
              React.createElement('div', { className: 'step-num' }, s.n),
              React.createElement('div', { className: 'step-content' },
                React.createElement('h4', {}, s.title),
                React.createElement('p', {}, s.desc)
              )
            )
          )
        )
      )
    ),

    React.createElement('section', { className: 'cta-band' },
      React.createElement('h2', {}, 'Pocnite danas - potpuno besplatno'),
      React.createElement('p', {}, 'Bez registracije. Na bosanskom jeziku. Podrska EU BOOST Balkans programa.'),
      React.createElement('a', { href: '/builder', className: 'btn-white' }, 'Pocni izradu biznis plana'),
      React.createElement('p', { className: 'cta-note' }, 'Besplatno - Na bosanskom jeziku - EU certificirano')
    ),

    React.createElement('footer', {},
      React.createElement('span', { className: 'footer-logo' }, 'BOOST Biznis Plan'),
      React.createElement('div', { className: 'footer-links' },
        React.createElement('a', { href: '#' }, 'O projektu'),
        React.createElement('a', { href: '/resources' }, 'Resursi'),
        React.createElement('a', { href: '#' }, 'Kontakt')
      ),
      React.createElement('div', { className: 'footer-divider' }),
      React.createElement('p', { className: 'footer-copy' }, '2025 BOOST Balkans - Faculty of Economics Mostar - EU sufinancirani projekat')
    )
  )
}
