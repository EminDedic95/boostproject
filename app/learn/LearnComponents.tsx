'use client'
import React, { useState, useEffect } from 'react'

// ── DESIGN TOKENS ──
export const T = {
  navy: '#1a2740', navySoft: '#243553', gold: '#C9A227', goldLight: '#e8c04a', goldDeep: '#8a6d12',
  paper: '#faf8f3', card: '#ffffff', ink: '#1a2740', inkSoft: '#5a6a85',
  line: '#e6e1d6', green: '#2d7a4f', greenWash: '#eef7f1', goldWash: '#fdf8ec',
  red: '#d64545', redWash: '#fbeeee', blue: '#2E75B6', blueWash: '#eef4fb',
}
export const serif = "'Fraunces', Georgia, serif"

// ── NUMBER FORMAT (same output on server and browser → no hydration mismatch) ──
export function fmt(n: number) {
  const s = Math.round(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return (n < 0 ? '−' : '') + s
}

// ── LOCAL SAVE HOOK (learner's work survives a page reload) ──
export function usePersist<V>(key: string, initial: V): [V, React.Dispatch<React.SetStateAction<V>>] {
  const [val, setVal] = useState<V>(initial)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) setVal(JSON.parse(raw) as V)
    } catch { /* ignore */ }
    setReady(true)
  }, [key])
  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem(key, JSON.stringify(val)) } catch { /* ignore */ }
  }, [key, val, ready])
  return [val, setVal]
}

// ── STYLESHEET (hover, focus, motion, mobile) ──
const LEARN_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
.lr-root, .lr-root * { box-sizing: border-box; }
.lr-root button { font-family: inherit; }
.lr-root :focus-visible { outline: 2px solid ${T.gold}; outline-offset: 2px; }
.lr-btn-reset { background: none; border: none; padding: 0; margin: 0; font: inherit; color: inherit; text-align: inherit; cursor: pointer; }

@keyframes lrFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes lrPop { 0% { opacity: 0; transform: scale(0.9); } 70% { transform: scale(1.02); } 100% { opacity: 1; transform: none; } }
@keyframes lrShake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
@keyframes lrLand { 0% { transform: scale(0.94); } 60% { transform: scale(1.03); } 100% { transform: none; } }
.lr-fade { animation: lrFade 0.32s ease both; }
.lr-pop { animation: lrPop 0.45s cubic-bezier(0.22,1,0.36,1) both; }
.lr-pre { opacity: 0; }
.lr-shake { animation: lrShake 0.4s ease; }
.lr-land { animation: lrLand 0.35s ease; }

.lr-tab:hover { color: ${T.navy}; }
.lr-opt:hover { border-color: ${T.gold} !important; background: ${T.goldWash} !important; }
.lr-tile:hover { border-color: ${T.gold} !important; }
.lr-chip:hover { border-color: ${T.gold} !important; color: ${T.navy} !important; }
.lr-drag { cursor: grab; }
.lr-drag:active { cursor: grabbing; }
.lr-cta { transition: transform 0.2s, box-shadow 0.2s; }
.lr-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,162,39,0.35); }
.lr-ghost:hover { border-color: ${T.navy} !important; }
.lr-modcard { transition: border-color 0.2s, transform 0.2s; }
.lr-modcard:hover { border-color: ${T.gold} !important; transform: translateX(3px); }
.lr-input { width: 100%; padding: 10px 12px; border: 1px solid ${T.line}; border-radius: 8px; font-size: 14px; color: ${T.ink}; background: ${T.card}; font-family: inherit; outline: none; }
.lr-input:focus { border-color: ${T.gold}; }
.lr-range { width: 100%; accent-color: ${T.gold}; cursor: pointer; }

.lr-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.lr-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.lr-opts { display: grid; gap: 10px; }
.lr-bmc { display: grid; grid-template-columns: repeat(10, 1fr); gap: 6px;
  grid-template-areas:
    "kp kp ka ka vp vp cr cr cs cs"
    "kp kp kr kr vp vp ch ch cs cs"
    "co co co co co rv rv rv rv rv"; }
.lr-porter { display: grid; grid-template-columns: 1fr 1.15fr 1fr; gap: 8px;
  grid-template-areas: ". ne ." "su ri bu" ". sb ."; }
.lr-steps-label { display: block; }

@media (max-width: 640px) {
  .lr-grid-3 { grid-template-columns: 1fr 1fr; }
  .lr-grid-3 > * { grid-column: auto !important; }
  .lr-grid-2 { grid-template-columns: 1fr; }
  .lr-opts { grid-template-columns: 1fr !important; }
  .lr-buckets { grid-template-columns: 1fr 1fr !important; }
  .lr-bmc { grid-template-columns: 1fr 1fr; grid-template-areas: none !important; }
  .lr-bmc > * { grid-area: auto !important; }
  .lr-porter { grid-template-columns: 1fr 1fr; grid-template-areas: "ne ne" "su bu" "ri ri" "sb sb"; }
  .lr-steps-label { display: none; }
  .lr-pad { padding: 22px !important; }
  .lr-hero { padding: 40px 0 32px !important; }
  .lr-cta-row a { margin: 6px 0 0 0 !important; }
}
@media (prefers-reduced-motion: reduce) {
  .lr-root *, .lr-root *::before, .lr-root *::after { animation: none !important; transition: none !important; }
  .lr-pre { opacity: 1; }
}
`

export function LearnStyles() {
  return <style dangerouslySetInnerHTML={{ __html: LEARN_CSS }} />
}

export const wrapStyle: React.CSSProperties = { maxWidth: '800px', margin: '0 auto', padding: '0 24px' }
export const pageStyle: React.CSSProperties = { fontFamily: "'Inter', system-ui, sans-serif", background: T.paper, color: T.ink, lineHeight: 1.65, minHeight: '100vh', WebkitFontSmoothing: 'antialiased' }

// ── PAGE SHELL: styles + progress bar + centered column ──
export function LearnPage({ moduleId, children }: { moduleId: number, children: React.ReactNode }) {
  return (
    <div className="lr-root" style={pageStyle}>
      <LearnStyles />
      <ProgressBar moduleId={moduleId} />
      <div style={wrapStyle}>{children}</div>
    </div>
  )
}

// ── PROGRESS BAR (scroll-driven, marks module complete at 90%) ──
export function ProgressBar({ moduleId }: { moduleId?: number }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    function onScroll() {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setPct(h > 0 ? Math.min(100, Math.round(window.scrollY / h * 100)) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pct >= 90 && moduleId) {
      try {
        const done: number[] = JSON.parse(localStorage.getItem('learn_completed') || '[]')
        if (!done.includes(moduleId)) {
          done.push(moduleId)
          localStorage.setItem('learn_completed', JSON.stringify(done))
        }
      } catch { /* ignore */ }
    }
  }, [pct, moduleId])

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(250,248,243,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${T.line}`, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
      <a href="/resources" style={{ fontSize: '13px', color: T.inkSoft, textDecoration: 'none', whiteSpace: 'nowrap' }}>← Svi moduli</a>
      <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Pročitano" style={{ flex: 1, height: '5px', background: T.line, borderRadius: '100px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`, borderRadius: '100px', transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1)' }} />
      </div>
      <span style={{ fontSize: '12px', fontWeight: 600, color: T.goldDeep, minWidth: '34px', textAlign: 'right' }}>{pct}%</span>
    </div>
  )
}

// ── HERO ──
export function Hero({ n, title, desc, meta }: { n: number, title: string, desc: string, meta: { icon: React.ReactNode, text: string }[] }) {
  return (
    <header className="lr-hero" style={{ padding: '64px 0 48px', borderBottom: `1px solid ${T.line}` }}>
      <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, color: T.goldDeep, marginBottom: '16px', padding: '5px 14px', background: T.goldWash, borderRadius: '100px', border: '1px solid rgba(201,162,39,0.25)' }}>Modul {n} od 5</span>
      <h1 style={{ fontFamily: serif, fontSize: 'clamp(32px, 6vw, 46px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.02em', margin: '0 0 18px' }}>{title}</h1>
      <p style={{ fontSize: '17px', color: T.inkSoft, maxWidth: '60ch', margin: 0 }}>{desc}</p>
      <div style={{ display: 'flex', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
        {meta.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: T.inkSoft }}>{m.icon}<span>{m.text}</span></div>
        ))}
      </div>
    </header>
  )
}

// ── GOALS ──
export function Goals({ items }: { items: string[] }) {
  return (
    <div className="lr-pad" style={{ background: T.navy, color: 'white', borderRadius: '20px', padding: '32px 34px', margin: '40px 0' }}>
      <h2 style={{ fontFamily: serif, fontSize: '20px', fontWeight: 600, margin: '0 0 18px', color: 'white' }}>Šta ćete naučiti</h2>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', margin: 0, padding: 0 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '15px', color: 'rgba(255,255,255,0.82)' }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px', stroke: T.gold, fill: 'none', strokeWidth: 2.5, flexShrink: 0, marginTop: '1px' }}><polyline points="20 6 9 17 4 12" /></svg>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── SECTION ──
export function Section({ label, title, children }: { label: string, title: string, children: React.ReactNode }) {
  return (
    <section style={{ padding: '28px 0 12px' }}>
      <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: 700, color: T.goldDeep, marginBottom: '2px' }}>{label}</span>
      <h2 style={{ fontFamily: serif, fontSize: '26px', fontWeight: 600, letterSpacing: '-0.01em', margin: '4px 0 16px', lineHeight: 1.2 }}>{title}</h2>
      {children}
    </section>
  )
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '17px', color: T.inkSoft, margin: '0 0 16px', maxWidth: '65ch' }}>{children}</p>
}
export function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: '16px', color: T.ink, margin: '0 0 16px', maxWidth: '65ch' }}>{children}</p>
}
export function Example({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div style={{ background: T.goldWash, borderLeft: `3px solid ${T.gold}`, borderRadius: '0 12px 12px 0', padding: '16px 20px', margin: '16px 0', fontSize: '14.5px' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: T.goldDeep, display: 'block', marginBottom: '6px' }}>{label}</span>
      {children}
    </div>
  )
}

// ── CARD SHELL used by widgets ──
export function WidgetCard({ title, hint, dark, children }: { title: string, hint?: string, dark?: boolean, children: React.ReactNode }) {
  return (
    <div className="lr-pad" style={{ background: dark ? T.navy : T.card, color: dark ? 'white' : T.ink, border: dark ? 'none' : `1px solid ${T.line}`, borderRadius: '18px', padding: '28px', margin: '24px 0' }}>
      <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 4px', color: dark ? 'white' : T.ink }}>{title}</h3>
      {hint && <p style={{ fontSize: '13px', color: dark ? 'rgba(255,255,255,0.6)' : T.inkSoft, margin: '0 0 20px' }}>{hint}</p>}
      {children}
    </div>
  )
}

// ── TABS (panel fades in on switch) ──
export function Tabs({ tabs }: { tabs: { label: string, content: React.ReactNode }[] }) {
  const [active, setActive] = useState(0)
  return (
    <div style={{ margin: '24px 0' }}>
      <div role="tablist" style={{ display: 'flex', gap: '4px', borderBottom: `2px solid ${T.line}`, flexWrap: 'wrap' }}>
        {tabs.map((t, i) => (
          <button key={i} role="tab" aria-selected={i === active} className="lr-btn-reset lr-tab" onClick={() => setActive(i)} style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 600, color: i === active ? T.goldDeep : T.inkSoft, borderBottom: `2px solid ${i === active ? T.gold : 'transparent'}`, marginBottom: '-2px', whiteSpace: 'nowrap', transition: 'color 0.2s' }}>{t.label}</button>
        ))}
      </div>
      <div role="tabpanel" style={{ padding: '22px', background: T.card, border: `1px solid ${T.line}`, borderTop: 'none', borderRadius: '0 0 14px 14px' }}>
        <div key={active} className="lr-fade" style={{ fontSize: '15px', color: T.inkSoft }}>{tabs[active].content}</div>
      </div>
    </div>
  )
}

// ── ACCORDION ──
export function Accordion({ items }: { items: { num: string, title: string, body: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '24px 0' }}>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i} style={{ background: T.card, border: `1px solid ${isOpen ? 'rgba(201,162,39,0.5)' : T.line}`, borderRadius: '14px', overflow: 'hidden', boxShadow: isOpen ? '0 8px 30px rgba(26,39,64,0.07)' : 'none', transition: 'border-color 0.2s, box-shadow 0.2s' }}>
            <button aria-expanded={isOpen} className="lr-btn-reset" onClick={() => setOpen(isOpen ? null : i)} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 22px', width: '100%' }}>
              <span style={{ width: '30px', height: '30px', borderRadius: '9px', background: isOpen ? T.gold : T.goldWash, color: isOpen ? 'white' : T.goldDeep, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0, transition: 'all 0.2s' }}>{it.num}</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: '15.5px' }}>{it.title}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px', stroke: T.inkSoft, fill: 'none', strokeWidth: 2.5, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            {isOpen && <div className="lr-fade" style={{ padding: '0 22px 22px 66px', fontSize: '15px', color: T.inkSoft }}>{it.body}</div>}
          </div>
        )
      })}
    </div>
  )
}

// ── QUIZ (explanations, score, retry, saved result) ──
export type QuizQuestion = { q: string, options: string[], answer: number, why?: string }

export function Quiz({ moduleId, questions }: { moduleId: number, questions: QuizQuestion[] }) {
  const [picks, setPicks] = useState<(number | null)[]>(() => questions.map(() => null))
  const [round, setRound] = useState(0)
  const answered = picks.filter(p => p !== null).length
  const correct = picks.filter((p, i) => p === questions[i].answer).length
  const finished = answered === questions.length

  useEffect(() => {
    if (!finished) return
    try {
      const all = JSON.parse(localStorage.getItem('learn_quiz') || '{}')
      const prev = all[moduleId]
      if (!prev || correct > prev.correct) {
        all[moduleId] = { correct, total: questions.length }
        localStorage.setItem('learn_quiz', JSON.stringify(all))
      }
    } catch { /* ignore */ }
  }, [finished, correct, moduleId, questions.length])

  function pick(qi: number, oi: number) {
    setPicks(p => p.map((v, i) => (i === qi && v === null ? oi : v)))
  }
  function retry() {
    setPicks(questions.map(() => null))
    setRound(r => r + 1)
  }

  const verdict = correct === questions.length ? 'Sve tačno — spremni ste za sljedeći modul.' : correct >= questions.length / 2 ? 'Dobro. Pogledajte objašnjenja za pogrešne odgovore.' : 'Vratite se na lekcije iznad pa pokušajte ponovo.'

  return (
    <div className="lr-pad" style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: '20px', padding: '34px', margin: '48px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: T.goldDeep, marginBottom: '4px' }}>Provjera znanja</div>
          <h2 style={{ fontFamily: serif, fontSize: '24px', fontWeight: 600, margin: 0 }}>Provjerite šta ste naučili</h2>
        </div>
        <span style={{ fontSize: '13px', color: T.inkSoft }}>{answered} od {questions.length} odgovoreno</span>
      </div>
      {questions.map((q, qi) => (
        <QuizQ key={`${round}-${qi}`} num={qi + 1} q={q} picked={picks[qi]} onPick={oi => pick(qi, oi)} />
      ))}
      {finished && (
        <div className="lr-pop" style={{ marginTop: '8px', padding: '22px', borderRadius: '14px', background: T.navy, color: 'white', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: serif, fontSize: '40px', fontWeight: 600, color: T.gold, lineHeight: 1 }}>{correct}/{questions.length}</div>
          <div style={{ flex: 1, minWidth: '180px', fontSize: '14.5px', color: 'rgba(255,255,255,0.85)' }}>{verdict}</div>
          {correct < questions.length && (
            <button className="lr-btn-reset" onClick={retry} style={{ padding: '9px 18px', borderRadius: '100px', border: `1.5px solid ${T.gold}`, color: T.gold, fontWeight: 600, fontSize: '13px' }}>Pokušaj ponovo</button>
          )}
        </div>
      )}
    </div>
  )
}

function QuizQ({ num, q, picked, onPick }: { num: number, q: QuizQuestion, picked: number | null, onPick: (i: number) => void }) {
  const done = picked !== null
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '14px' }}><span style={{ color: T.goldDeep }}>{num}.</span> {q.q}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {q.options.map((opt, i) => {
          const isAns = i === q.answer
          const isPick = i === picked
          let bg: string = T.paper, bd: string = T.line, col: string = T.ink, mBg = 'transparent', mBd: string = T.line
          if (done && isAns) { bg = T.greenWash; bd = T.green; col = T.green; mBg = T.green; mBd = T.green }
          else if (done && isPick) { bg = T.redWash; bd = T.red; col = T.red; mBg = T.red; mBd = T.red }
          return (
            <button key={i} disabled={done} className={`lr-btn-reset ${done ? '' : 'lr-opt'} ${done && isPick && !isAns ? 'lr-shake' : ''}`} onClick={() => onPick(i)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', border: `1.5px solid ${bd}`, borderRadius: '12px', fontSize: '14.5px', background: bg, color: col, fontWeight: done && isAns ? 600 : 400, opacity: done && !isAns && !isPick ? 0.55 : 1, cursor: done ? 'default' : 'pointer', transition: 'background 0.18s, border-color 0.18s' }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${mBd}`, background: mBg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {done && (isAns || isPick) && (
                  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '12px', height: '12px', stroke: 'white', fill: 'none', strokeWidth: 3 }}>
                    {isAns ? <polyline points="20 6 9 17 4 12" /> : <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>}
                  </svg>
                )}
              </span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>
      {done && (
        <div className="lr-fade" style={{ marginTop: '12px', fontSize: '14px', padding: '12px 16px', borderRadius: '10px', background: picked === q.answer ? T.greenWash : T.redWash, color: picked === q.answer ? T.green : T.red }}>
          <strong>{picked === q.answer ? 'Tačno.' : 'Nije tačno.'}</strong> {q.why || (picked === q.answer ? '' : 'Tačan odgovor je označen zeleno.')}
        </div>
      )}
    </div>
  )
}

// ── CHECKLIST (saved per module) ──
export function Checklist({ moduleId, title, intro, items }: { moduleId: number, title: string, intro: string, items: string[] }) {
  const [done, setDone] = usePersist<number[]>(`learn_check_${moduleId}`, [])
  const toggle = (i: number) => setDone(p => (p.includes(i) ? p.filter(x => x !== i) : [...p, i]))
  return (
    <div className="lr-pad" style={{ background: T.navy, color: 'white', borderRadius: '20px', padding: '34px', margin: '48px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
        <h2 style={{ fontFamily: serif, fontSize: '22px', fontWeight: 600, margin: '0 0 8px', color: 'white' }}>{title}</h2>
        <span style={{ fontSize: '13px', color: T.gold, fontWeight: 600 }}>{done.length}/{items.length}</span>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: '0 0 18px' }}>{intro}</p>
      {items.map((it, i) => {
        const isDone = done.includes(i)
        return (
          <button key={i} role="checkbox" aria-checked={isDone} className="lr-btn-reset" onClick={() => toggle(i)} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '14px 0', borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none', width: '100%' }}>
            <span className={isDone ? 'lr-land' : ''} style={{ width: '24px', height: '24px', borderRadius: '7px', border: `2px solid ${isDone ? T.gold : 'rgba(255,255,255,0.3)'}`, background: isDone ? T.gold : 'transparent', flexShrink: 0, marginTop: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s, border-color 0.2s' }}>
              <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '14px', height: '14px', stroke: T.navy, fill: 'none', strokeWidth: 3, opacity: isDone ? 1 : 0 }}><polyline points="20 6 9 17 4 12" /></svg>
            </span>
            <span style={{ fontSize: '15px', color: isDone ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.88)', textDecoration: isDone ? 'line-through' : 'none' }}>{it}</span>
          </button>
        )
      })}
    </div>
  )
}

// ── NEXT CTA ──
export function NextCta({ nextN, nextTitle }: { nextN: number | null, nextTitle: string | null }) {
  return (
    <div className="lr-cta-row" style={{ textAlign: 'center', padding: '48px 0 80px' }}>
      <p style={{ fontSize: '15px', color: T.inkSoft, margin: '0 0 20px' }}>{nextN ? 'Spremni ste za sljedeći korak?' : 'Završili ste sve module. Vrijeme je da napišete svoj plan.'}</p>
      {nextN && (
        <a href={`/learn/module-${nextN}`} className="lr-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: T.gold, color: T.navy, padding: '15px 34px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
          Modul {nextN}: {nextTitle}
          <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '18px', height: '18px', stroke: T.navy, fill: 'none', strokeWidth: 2.5 }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </a>
      )}
      <a href="/builder" className={nextN ? 'lr-ghost' : 'lr-cta'} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: nextN ? 'transparent' : T.gold, color: T.navy, border: nextN ? `1.5px solid ${T.line}` : 'none', padding: '15px 34px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', marginLeft: nextN ? '10px' : 0 }}>Otvori builder</a>
    </div>
  )
}

// ── ICONS ──
const ic = (children: React.ReactNode) => <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '16px', height: '16px', stroke: T.gold, fill: 'none', strokeWidth: 2 }}>{children}</svg>
export const Icons = {
  clock: ic(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>),
  book: ic(<><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>),
  check: ic(<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>),
  tool: ic(<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />),
}

// Larger icons for pickers
const big = (children: React.ReactNode) => <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '26px', height: '26px', stroke: 'currentColor', fill: 'none', strokeWidth: 1.8 }}>{children}</svg>
export const BigIcons = {
  tag: big(<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></>),
  wrench: big(<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />),
  globe: big(<><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>),
  star: big(<polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.7 5.8 21 7 14 2 9.3 9 8.5 12 2" />),
  coin: big(<><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>),
  target: big(<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>),
}
