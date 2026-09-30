'use client'
import React, { useState, useEffect, useRef } from 'react'
import { T, serif, fmt, usePersist, WidgetCard } from './LearnComponents'

// ════════════════════════════════════════════
// SHARED BITS
// ════════════════════════════════════════════

function SimRow({ label, val, min, max, step = 1, value, onChange, dark = true }: { label: string, val: string, min: number, max: number, step?: number, value: number, onChange: (v: number) => void, dark?: boolean }) {
  return (
    <label style={{ display: 'block', marginBottom: '20px' }}>
      <span style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '13px', marginBottom: '8px', color: dark ? 'rgba(255,255,255,0.8)' : T.inkSoft }}>
        <span>{label}</span><b style={{ color: dark ? T.gold : T.goldDeep, fontSize: '15px', whiteSpace: 'nowrap' }}>{val}</b>
      </span>
      <input type="range" className="lr-range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} />
    </label>
  )
}

function Stat({ label, value, note, bad }: { label: string, value: string, note?: string, bad?: boolean }) {
  return (
    <div style={{ flex: 1, minWidth: '160px', background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '18px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontFamily: serif, fontSize: '32px', fontWeight: 600, color: bad ? '#ff8a8a' : T.gold, lineHeight: 1.05 }}>{value}</div>
      {note && <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '8px' }}>{note}</div>}
    </div>
  )
}

function SmallBtn({ onClick, children, dark }: { onClick: () => void, children: React.ReactNode, dark?: boolean }) {
  return (
    <button className="lr-btn-reset lr-chip" onClick={onClick} style={{ padding: '7px 14px', borderRadius: '100px', border: `1.5px solid ${dark ? 'rgba(255,255,255,0.25)' : T.line}`, color: dark ? 'rgba(255,255,255,0.85)' : T.inkSoft, fontSize: '12.5px', fontWeight: 600 }}>{children}</button>
  )
}

function Done({ children }: { children: React.ReactNode }) {
  return (
    <div className="lr-pop" style={{ marginTop: '18px', padding: '14px 18px', borderRadius: '12px', background: T.greenWash, color: T.green, fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '18px', height: '18px', stroke: T.green, fill: 'none', strokeWidth: 3, flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
      {children}
    </div>
  )
}

function useCopy() {
  const [copied, setCopied] = useState(false)
  function copy(text: string) {
    try {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }).catch(() => { /* ignore */ })
    } catch { /* ignore */ }
  }
  return { copied, copy }
}

// Delays an entrance until the element scrolls into view (used for the Canvas build)
function useEnterStage<E extends HTMLElement>() {
  const ref = useRef<E>(null)
  const [stage, setStage] = useState<'static' | 'waiting' | 'entered'>('static')
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return
    setStage('waiting')
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { setStage('entered'); io.disconnect() }
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, stage }
}

// ════════════════════════════════════════════
// MODULE 1
// ════════════════════════════════════════════

// ── PROFIT SIMULATOR with live bar chart ──
export function ProfitSim() {
  const [price, setPrice] = useState(20)
  const [cost, setCost] = useState(8)
  const [qty, setQty] = useState(100)
  const revenue = price * qty
  const costs = cost * qty
  const profit = revenue - costs
  const scale = Math.max(revenue, costs, Math.abs(profit), 1)
  const bars = [
    { label: 'Prihod', v: revenue, color: T.gold },
    { label: 'Troškovi', v: costs, color: '#7a869e' },
    { label: profit < 0 ? 'Gubitak' : 'Zarada', v: Math.abs(profit), color: profit < 0 ? T.red : '#3fae74' },
  ]
  return (
    <WidgetCard dark title="Simulator zarade" hint="Zamislite da prodajete zanatske proizvode. Pomjerajte klizače i gledajte kako se mijenja zarada.">
      <SimRow label="Prodajna cijena po komadu" val={price + ' KM'} min={5} max={50} value={price} onChange={setPrice} />
      <SimRow label="Trošak izrade po komadu" val={cost + ' KM'} min={2} max={40} value={cost} onChange={setCost} />
      <SimRow label="Prodano komada mjesečno" val={String(qty)} min={10} max={500} step={10} value={qty} onChange={setQty} />
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px', height: '150px', padding: '8px 4px 0', borderBottom: '1px solid rgba(255,255,255,0.2)', marginTop: '8px' }}>
        {bars.map(b => (
          <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '6px', fontWeight: 600 }}>{fmt(b.v)} KM</div>
            <div style={{ width: '100%', maxWidth: '90px', height: `${(b.v / scale) * 100}%`, minHeight: '2px', background: b.color, borderRadius: '6px 6px 0 0', transition: 'height 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '18px', padding: '8px 4px 0' }}>
        {bars.map(b => <div key={b.label} style={{ flex: 1, textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{b.label}</div>)}
      </div>
      <p style={{ fontSize: '13px', color: profit < 0 ? '#ff8a8a' : 'rgba(255,255,255,0.6)', margin: '18px 0 0', textAlign: 'center' }}>
        {price <= cost ? 'Cijena je niža od troška — svaki prodani komad vas košta.' : `Na svakom komadu zarađujete ${price - cost} KM. Zarada = (cijena − trošak) × količina.`}
      </p>
    </WidgetCard>
  )
}

// ── IDEA SENTENCE BUILDER ──
export function IdeaSentence() {
  const empty = { proizvod: '', kupac: '', problem: '', prednost: '' }
  const [v, setV] = usePersist('learn_m1_idea', empty)
  const { copied, copy } = useCopy()
  const fields: { k: keyof typeof empty, label: string, ph: string }[] = [
    { k: 'proizvod', label: 'Šta nudite?', ph: 'npr. Naša mobilna aplikacija' },
    { k: 'kupac', label: 'Kome?', ph: 'npr. studentima u Sarajevu' },
    { k: 'problem', label: 'Koji problem imaju?', ph: 'npr. gube bilješke i vrijeme pred ispite' },
    { k: 'prednost', label: 'Po čemu ste drugačiji?', ph: 'npr. potpuno je besplatna i radi bez interneta' },
  ]
  const part = (k: keyof typeof empty, fallback: string) => v[k].trim()
    ? <span style={{ color: T.navy, borderBottom: `2px solid ${T.gold}` }}>{v[k].trim()}</span>
    : <span style={{ color: '#a3adbf', fontStyle: 'italic' }}>{fallback}</span>
  const complete = fields.every(f => v[f.k].trim())
  const sentence = `${v.proizvod.trim()} pomaže ${v.kupac.trim()} koji ${v.problem.trim()}, a za razliku od drugih rješenja, ${v.prednost.trim()}.`
  return (
    <WidgetCard title="Vaša ideja u jednoj rečenici" hint="Popunite četiri polja. Rečenica ispod se slaže dok pišete.">
      <div className="lr-grid-2" style={{ gap: '12px' }}>
        {fields.map(f => (
          <label key={f.k} style={{ display: 'block' }}>
            <span style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: T.inkSoft, marginBottom: '6px' }}>{f.label}</span>
            <input className="lr-input" value={v[f.k]} placeholder={f.ph} onChange={e => setV(p => ({ ...p, [f.k]: e.target.value }))} />
          </label>
        ))}
      </div>
      <div style={{ marginTop: '20px', padding: '22px', background: T.paper, borderRadius: '14px', border: `1px solid ${T.line}` }}>
        <p style={{ fontFamily: serif, fontSize: '19px', lineHeight: 1.55, margin: 0, color: T.ink }}>
          {part('proizvod', '[Vaš proizvod]')} pomaže {part('kupac', '[kome]')} koji {part('problem', '[imaju koji problem]')}, a za razliku od drugih rješenja, {part('prednost', '[vaša prednost]')}.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
        {complete && <SmallBtn onClick={() => copy(sentence)}>{copied ? 'Kopirano' : 'Kopiraj rečenicu'}</SmallBtn>}
        <SmallBtn onClick={() => setV({ proizvod: 'Naša mobilna aplikacija', kupac: 'studentima u Sarajevu', problem: 'gube bilješke i vrijeme pred ispite', prednost: 'potpuno je besplatna i radi bez interneta' })}>Prikaži primjer</SmallBtn>
        <SmallBtn onClick={() => setV(empty)}>Očisti</SmallBtn>
      </div>
    </WidgetCard>
  )
}

// ── SCENARIO PICKER ──
export function ScenarioPicker({ title, options }: { title: string, options: { id: string, label: string, icon: React.ReactNode, advice: React.ReactNode }[] }) {
  const [active, setActive] = useState<string | null>(null)
  const chosen = options.find(o => o.id === active)
  return (
    <WidgetCard title={title}>
      <div className="lr-opts" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
        {options.map(o => {
          const on = active === o.id
          return (
            <button key={o.id} aria-pressed={on} className={`lr-btn-reset ${on ? '' : 'lr-tile'}`} onClick={() => setActive(o.id)} style={{ padding: '16px 12px', border: `1.5px solid ${on ? T.gold : T.line}`, borderRadius: '12px', textAlign: 'center', background: on ? T.gold : 'transparent', color: on ? T.navy : T.ink, transition: 'background 0.2s, border-color 0.2s' }}>
              <span style={{ marginBottom: '6px', display: 'flex', justifyContent: 'center' }}>{o.icon}</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{o.label}</span>
            </button>
          )
        })}
      </div>
      {chosen && <div key={chosen.id} className="lr-fade" style={{ marginTop: '20px', padding: '20px', background: T.goldWash, borderRadius: '12px', fontSize: '14.5px', color: T.navy }}>{chosen.advice}</div>}
    </WidgetCard>
  )
}

// ── REVEAL GRID ──
export function RevealGrid({ title, hint, blocks }: { title: string, hint: string, blocks: { title: string, desc: string, span?: number }[] }) {
  const [revealed, setRevealed] = useState<number[]>([])
  const reveal = (i: number) => setRevealed(p => (p.includes(i) ? p : [...p, i]))
  const all = revealed.length === blocks.length
  return (
    <WidgetCard title={title} hint={hint}>
      <div className="lr-grid-3">
        {blocks.map((b, i) => {
          const isR = revealed.includes(i)
          return (
            <button key={i} aria-expanded={isR} className={`lr-btn-reset ${isR ? '' : 'lr-tile'}`} onClick={() => reveal(i)} style={{ gridColumn: b.span ? `span ${b.span}` : 'span 1', background: isR ? T.goldWash : T.paper, border: `1.5px solid ${isR ? T.gold : T.line}`, borderRadius: '10px', padding: '14px', minHeight: '88px', transition: 'background 0.25s, border-color 0.25s', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: T.navy }}>{b.title}</span>
              {isR
                ? <span className="lr-fade" style={{ fontSize: '12.5px', color: T.inkSoft, lineHeight: 1.45 }}>{b.desc}</span>
                : <span style={{ fontSize: '12px', color: '#a3adbf' }}>Kliknite za objašnjenje</span>}
            </button>
          )
        })}
      </div>
      <div style={{ marginTop: '16px', fontSize: '13px', color: all ? T.green : T.inkSoft, textAlign: 'center', fontWeight: all ? 600 : 400 }}>
        {all ? 'Sve otkriveno' : <>Otkriveno <strong style={{ color: T.goldDeep }}>{revealed.length}</strong> od {blocks.length}</>}
      </div>
    </WidgetCard>
  )
}

// ── DRAG MATCH (real drag-and-drop + tap fallback for phones) ──
export function DragMatch({ title, hint, pairs }: { title: string, hint: string, pairs: { id: string, term: string, example: string }[] }) {
  const [placed, setPlaced] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [wrong, setWrong] = useState<string | null>(null)
  const [over, setOver] = useState<string | null>(null)
  const [mistakes, setMistakes] = useState(0)
  // deterministic scramble (same order on server and browser)
  const examples = [...pairs].sort((a, b) => (a.example < b.example ? -1 : 1))

  function attempt(zoneId: string, termId: string | null) {
    if (!termId || placed.includes(zoneId)) return
    if (termId === zoneId) {
      setPlaced(p => [...p, zoneId])
      setSelected(null)
    } else {
      setMistakes(m => m + 1)
      setWrong(zoneId)
      setTimeout(() => setWrong(null), 450)
    }
  }
  function reset() { setPlaced([]); setSelected(null); setMistakes(0) }
  const finished = placed.length === pairs.length

  return (
    <WidgetCard title={title} hint={hint}>
      <div className="lr-grid-2" style={{ gap: '20px' }}>
        <div>
          <div style={{ fontSize: '12.5px', fontWeight: 700, color: T.goldDeep, marginBottom: '10px' }}>Pojmovi</div>
          {pairs.map(p => placed.includes(p.id) ? null : (
            <div
              key={p.id}
              role="button"
              tabIndex={0}
              aria-pressed={selected === p.id}
              draggable
              onDragStart={e => { e.dataTransfer.setData('text/plain', p.id); e.dataTransfer.effectAllowed = 'move'; setSelected(p.id) }}
              onClick={() => setSelected(selected === p.id ? null : p.id)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(selected === p.id ? null : p.id) } }}
              className="lr-drag"
              style={{ background: selected === p.id ? T.gold : T.goldWash, color: T.navy, border: `1.5px solid ${selected === p.id ? T.gold : 'rgba(201,162,39,0.4)'}`, borderRadius: '10px', padding: '12px 14px', marginBottom: '8px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', userSelect: 'none', transition: 'background 0.15s' }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '14px', height: '14px', stroke: T.goldDeep, fill: 'none', strokeWidth: 2.5, flexShrink: 0 }}><circle cx="9" cy="6" r="1" /><circle cx="15" cy="6" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="9" cy="18" r="1" /><circle cx="15" cy="18" r="1" /></svg>
              {p.term}
            </div>
          ))}
          {finished && <div style={{ fontSize: '13px', color: T.inkSoft }}>Svi pojmovi su spojeni.</div>}
        </div>
        <div>
          <div style={{ fontSize: '12.5px', fontWeight: 700, color: T.goldDeep, marginBottom: '10px' }}>Primjeri</div>
          {examples.map(ex => {
            const done = placed.includes(ex.id)
            const isOver = over === ex.id && !done
            return (
              <div
                key={ex.id}
                role="button"
                tabIndex={done ? -1 : 0}
                onDragOver={e => { if (!done) { e.preventDefault(); setOver(ex.id) } }}
                onDragLeave={() => setOver(null)}
                onDrop={e => { e.preventDefault(); setOver(null); attempt(ex.id, e.dataTransfer.getData('text/plain') || selected) }}
                onClick={() => attempt(ex.id, selected)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); attempt(ex.id, selected) } }}
                className={wrong === ex.id ? 'lr-shake' : done ? 'lr-land' : ''}
                style={{ border: `1.5px ${done ? 'solid' : 'dashed'} ${done ? T.green : wrong === ex.id ? T.red : isOver || selected ? T.gold : T.line}`, borderRadius: '10px', padding: '10px 14px', marginBottom: '8px', minHeight: '48px', fontSize: '13.5px', color: done ? T.green : T.ink, background: done ? T.greenWash : isOver ? T.goldWash : 'transparent', cursor: done ? 'default' : 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'background 0.15s, border-color 0.15s' }}
              >
                {done && <span style={{ fontSize: '11.5px', fontWeight: 700 }}>✓ {pairs.find(p => p.id === ex.id)?.term}</span>}
                <span>{ex.example}</span>
              </div>
            )
          })}
        </div>
      </div>
      {finished && (
        <Done>
          {mistakes === 0 ? 'Sve tačno iz prvog pokušaja.' : `Sve spojeno, uz ${mistakes} ${mistakes === 1 ? 'grešku' : 'greške'}.`}
          <span style={{ marginLeft: 'auto' }}><SmallBtn onClick={reset}>Ponovi vježbu</SmallBtn></span>
        </Done>
      )}
    </WidgetCard>
  )
}

// ════════════════════════════════════════════
// SORTING EXERCISE (Modules 2, 3, 5)
// ════════════════════════════════════════════

export function SortBuckets({ title, hint, buckets, items }: { title: string, hint: string, buckets: { id: string, label: string, color: string, wash: string }[], items: { text: string, bucket: string, why?: string }[] }) {
  const [placed, setPlaced] = useState<Record<number, string>>({})
  const [selected, setSelected] = useState<number | null>(null)
  const [wrong, setWrong] = useState<string | null>(null)
  const [over, setOver] = useState<string | null>(null)
  const [mistakes, setMistakes] = useState(0)
  const [lastWhy, setLastWhy] = useState<string | null>(null)

  function attempt(bucketId: string, idx: number | null) {
    if (idx === null || placed[idx] !== undefined) return
    if (items[idx].bucket === bucketId) {
      setPlaced(p => ({ ...p, [idx]: bucketId }))
      setSelected(null)
      setLastWhy(null)
    } else {
      setMistakes(m => m + 1)
      setWrong(bucketId)
      setLastWhy(items[idx].why || null)
      setTimeout(() => setWrong(null), 450)
    }
  }
  function reset() { setPlaced({}); setSelected(null); setMistakes(0); setLastWhy(null) }
  const pool = items.map((it, i) => ({ ...it, i })).filter(it => placed[it.i] === undefined)
  const finished = pool.length === 0

  return (
    <WidgetCard title={title} hint={hint}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '44px', padding: '12px', background: T.paper, borderRadius: '12px', border: `1px solid ${T.line}`, marginBottom: '14px' }}>
        {pool.map(it => (
          <div
            key={it.i}
            role="button"
            tabIndex={0}
            aria-pressed={selected === it.i}
            draggable
            onDragStart={e => { e.dataTransfer.setData('text/plain', String(it.i)); setSelected(it.i) }}
            onClick={() => setSelected(selected === it.i ? null : it.i)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(selected === it.i ? null : it.i) } }}
            className="lr-drag"
            style={{ padding: '8px 14px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, background: selected === it.i ? T.navy : T.card, color: selected === it.i ? 'white' : T.ink, border: `1.5px solid ${selected === it.i ? T.navy : T.line}`, userSelect: 'none', transition: 'background 0.15s' }}
          >{it.text}</div>
        ))}
        {finished && <span style={{ fontSize: '13px', color: T.inkSoft, alignSelf: 'center' }}>Sve je razvrstano.</span>}
      </div>
      {lastWhy && <div className="lr-fade" style={{ fontSize: '13px', color: T.red, background: T.redWash, padding: '10px 14px', borderRadius: '10px', marginBottom: '12px' }}>{lastWhy}</div>}
      <div className="lr-buckets" style={{ display: 'grid', gridTemplateColumns: `repeat(${buckets.length}, 1fr)`, gap: '10px' }}>
        {buckets.map(b => {
          const inside = items.map((it, i) => ({ ...it, i })).filter(it => placed[it.i] === b.id)
          const isOver = over === b.id
          return (
            <div
              key={b.id}
              role="button"
              tabIndex={0}
              aria-label={`Ubaci u: ${b.label}`}
              onDragOver={e => { e.preventDefault(); setOver(b.id) }}
              onDragLeave={() => setOver(null)}
              onDrop={e => { e.preventDefault(); setOver(null); const raw = e.dataTransfer.getData('text/plain'); attempt(b.id, raw !== '' ? Number(raw) : selected) }}
              onClick={() => attempt(b.id, selected)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); attempt(b.id, selected) } }}
              className={wrong === b.id ? 'lr-shake' : ''}
              style={{ border: `2px ${isOver || selected !== null ? 'solid' : 'dashed'} ${wrong === b.id ? T.red : b.color}`, background: isOver ? b.wash : T.card, borderRadius: '12px', padding: '12px', minHeight: '120px', cursor: selected !== null ? 'pointer' : 'default', transition: 'background 0.15s' }}
            >
              <div style={{ fontSize: '13px', fontWeight: 700, color: b.color, marginBottom: '8px' }}>{b.label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {inside.map(it => (
                  <div key={it.i} className="lr-land" style={{ fontSize: '12.5px', padding: '6px 10px', borderRadius: '8px', background: b.wash, color: T.ink }}>{it.text}</div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {finished && (
        <Done>
          {mistakes === 0 ? 'Savršeno — sve razvrstano bez greške.' : `Razvrstano, uz ${mistakes} ${mistakes === 1 ? 'grešku' : 'greške'}.`}
          <span style={{ marginLeft: 'auto' }}><SmallBtn onClick={reset}>Ponovi</SmallBtn></span>
        </Done>
      )}
    </WidgetCard>
  )
}

// ════════════════════════════════════════════
// MODULE 2
// ════════════════════════════════════════════

// ── CUSTOMER PERSONA BUILDER with live card ──
const PERSONA_EMPTY = { ime: '', dob: '', mjesto: '', zanimanje: '', problem: '', kanal: '', bitno: [] as string[] }
export function PersonaBuilder() {
  const [p, setP] = usePersist('learn_m2_persona', PERSONA_EMPTY)
  const set = (k: 'ime' | 'dob' | 'mjesto' | 'zanimanje' | 'problem' | 'kanal', v: string) => setP(prev => ({ ...prev, [k]: v }))
  const toggle = (v: string) => setP(prev => ({ ...prev, bitno: prev.bitno.includes(v) ? prev.bitno.filter(x => x !== v) : [...prev.bitno, v] }))
  const initials = (p.ime.trim() || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const meta = [p.dob && `${p.dob} god.`, p.mjesto, p.zanimanje].filter(Boolean).join(', ')
  const values = ['Cijena', 'Kvalitet', 'Brzina', 'Povjerenje', 'Blizina']
  return (
    <WidgetCard title="Napravite profil svog kupca" hint="Zamislite jednu stvarnu osobu koja kupuje od vas. Kartica desno se puni dok pišete.">
      <div className="lr-grid-2" style={{ gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label><span style={lbl}>Ime (izmišljeno)</span><input className="lr-input" value={p.ime} placeholder="npr. Amra" onChange={e => set('ime', e.target.value)} /></label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <label style={{ flex: 1 }}><span style={lbl}>Dob</span>
              <select className="lr-input" value={p.dob} onChange={e => set('dob', e.target.value)}>
                <option value="">Odaberite</option>
                {['18–24', '25–34', '35–44', '45–54', '55+'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </label>
            <label style={{ flex: 1 }}><span style={lbl}>Mjesto</span><input className="lr-input" value={p.mjesto} placeholder="npr. Mostar" onChange={e => set('mjesto', e.target.value)} /></label>
          </div>
          <label><span style={lbl}>Zanimanje</span><input className="lr-input" value={p.zanimanje} placeholder="npr. vlasnica frizerskog salona" onChange={e => set('zanimanje', e.target.value)} /></label>
          <label><span style={lbl}>Najveći problem koji ima</span><input className="lr-input" value={p.problem} placeholder="npr. nema vremena za društvene mreže" onChange={e => set('problem', e.target.value)} /></label>
          <label><span style={lbl}>Gdje traži rješenja</span>
            <select className="lr-input" value={p.kanal} onChange={e => set('kanal', e.target.value)}>
              <option value="">Odaberite</option>
              {['Instagram', 'Facebook', 'Google pretraga', 'Preporuke prijatelja', 'Lokalne radnje'].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
          <div>
            <span style={lbl}>Šta joj je najvažnije pri kupovini</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {values.map(v => {
                const on = p.bitno.includes(v)
                return <button key={v} aria-pressed={on} className={`lr-btn-reset ${on ? '' : 'lr-chip'}`} onClick={() => toggle(v)} style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '12.5px', fontWeight: 600, border: `1.5px solid ${on ? T.gold : T.line}`, background: on ? T.gold : 'transparent', color: on ? T.navy : T.inkSoft }}>{v}</button>
              })}
            </div>
          </div>
        </div>
        <div style={{ position: 'sticky', top: '80px' }}>
          <div style={{ background: T.navy, borderRadius: '18px', padding: '24px', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: T.gold, color: T.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: serif, fontSize: '22px', fontWeight: 600, flexShrink: 0 }}>{initials}</div>
              <div>
                <div style={{ fontFamily: serif, fontSize: '20px', fontWeight: 600 }}>{p.ime.trim() || 'Vaš kupac'}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{meta || 'Dob, mjesto, zanimanje'}</div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '14px 16px', fontSize: '14px', marginBottom: '14px', fontStyle: p.problem ? 'normal' : 'italic', color: p.problem ? 'white' : 'rgba(255,255,255,0.45)' }}>
              {p.problem ? `„${p.problem.trim()}“` : 'Njen najveći problem pojavit će se ovdje'}
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
              Traži rješenja: <strong style={{ color: 'white' }}>{p.kanal || '—'}</strong>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {p.bitno.length ? p.bitno.map(b => <span key={b} style={{ padding: '4px 10px', borderRadius: '100px', background: 'rgba(201,162,39,0.2)', color: T.goldLight, fontSize: '12px', fontWeight: 600 }}>{b}</span>) : <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Vrijednosti kupca</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            <SmallBtn onClick={() => setP({ ime: 'Amra', dob: '25–34', mjesto: 'Mostar', zanimanje: 'vlasnica frizerskog salona', problem: 'nema vremena za vođenje društvenih mreža', kanal: 'Instagram', bitno: ['Brzina', 'Povjerenje'] })}>Prikaži primjer</SmallBtn>
            <SmallBtn onClick={() => setP(PERSONA_EMPTY)}>Očisti</SmallBtn>
          </div>
        </div>
      </div>
    </WidgetCard>
  )
}
const lbl: React.CSSProperties = { display: 'block', fontSize: '12.5px', fontWeight: 600, color: T.inkSoft, marginBottom: '6px' }

// ── BUSINESS MODEL CANVAS BUILDER (builds block by block on first view) ──
const BMC: { k: string, n: number, title: string, q: string, ex: string }[] = [
  { k: 'cs', n: 1, title: 'Korisnički segmenti', q: 'Za koga stvarate vrijednost? Ko su vaši najvažniji kupci?', ex: 'Porodice i radnici iz naselja koji svaki dan kupuju svjež hljeb' },
  { k: 'vp', n: 2, title: 'Vrijednosna ponuda', q: 'Koji problem rješavate? Zašto bi kupac izabrao baš vas?', ex: 'Topao hljeb od 6 ujutro, domaći recepti bez aditiva' },
  { k: 'ch', n: 3, title: 'Kanali', q: 'Kako kupci saznaju za vas i kako do njih stiže proizvod?', ex: 'Radnja u naselju, Instagram, dostava lokalnim kafićima' },
  { k: 'cr', n: 4, title: 'Odnosi s kupcima', q: 'Kakav odnos gradite: lični, automatizovan, kroz zajednicu?', ex: 'Lično poznajemo stalne kupce, kartica vjernosti' },
  { k: 'rv', n: 5, title: 'Tokovi prihoda', q: 'Za šta i kako kupci plaćaju? Jednokratno ili redovno?', ex: 'Prodaja u radnji, veleprodaja kafićima, narudžbe za proslave' },
  { k: 'kr', n: 6, title: 'Ključni resursi', q: 'Šta vam je neophodno: ljudi, oprema, prostor, znanje?', ex: 'Peć, prostor, iskusan pekar, porodični recepti' },
  { k: 'ka', n: 7, title: 'Ključne aktivnosti', q: 'Šta morate raditi svaki dan da model funkcioniše?', ex: 'Pečenje, nabavka brašna, prodaja, dostava' },
  { k: 'kp', n: 8, title: 'Ključni partneri', q: 'Ko su dobavljači i partneri bez kojih ne možete?', ex: 'Mlin koji dostavlja brašno, lokalni kafići' },
  { k: 'co', n: 9, title: 'Struktura troškova', q: 'Koji su najveći troškovi vašeg modela?', ex: 'Brašno i sirovine, najam, plate, struja za peć' },
]
export function CanvasBuilder() {
  const [vals, setVals] = usePersist<Record<string, string>>('learn_m2_canvas', {})
  const [active, setActive] = useState<string | null>(null)
  const [showEx, setShowEx] = useState(false)
  const { ref, stage } = useEnterStage<HTMLDivElement>()
  const filled = BMC.filter(b => (vals[b.k] || '').trim()).length
  const cur = BMC.find(b => b.k === active)
  const next = cur ? BMC.find(b => b.n === cur.n + 1) : null

  return (
    <WidgetCard title="Vaš Business Model Canvas" hint="Kliknite blok da ga popunite. Idite redom brojeva — počinje se od kupca i vrijednosti.">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '180px' }}>
          <div style={{ flex: 1, height: '6px', background: T.line, borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{ width: `${showEx ? 100 : (filled / 9) * 100}%`, height: '100%', background: showEx ? T.line : T.gold, transition: 'width 0.4s' }} />
          </div>
          <span style={{ fontSize: '12.5px', color: showEx ? T.goldDeep : T.inkSoft, fontWeight: showEx ? 600 : 400, whiteSpace: 'nowrap' }}>{showEx ? 'Primjer: pekara' : `${filled} od 9`}</span>
        </div>
        <SmallBtn onClick={() => setShowEx(s => !s)}>{showEx ? 'Prikaži moj Canvas' : 'Pogledaj primjer: pekara'}</SmallBtn>
      </div>
      <div ref={ref} className="lr-bmc">
        {BMC.map((b, i) => {
          const text = showEx ? b.ex : (vals[b.k] || '').trim()
          const isFilled = !!text
          const isActive = active === b.k && !showEx
          const cls = stage === 'waiting' ? 'lr-pre' : stage === 'entered' ? 'lr-pop' : ''
          return (
            <button
              key={b.k}
              className={`lr-btn-reset ${cls} ${isActive ? '' : 'lr-tile'}`}
              onClick={() => { if (!showEx) setActive(isActive ? null : b.k) }}
              aria-pressed={isActive}
              style={{ gridArea: b.k, animationDelay: stage === 'entered' ? `${i * 90}ms` : undefined, minHeight: '96px', padding: '10px', borderRadius: '10px', border: `1.5px solid ${isActive ? T.navy : isFilled ? T.gold : T.line}`, background: isActive ? T.card : isFilled ? T.goldWash : T.paper, boxShadow: isActive ? '0 6px 20px rgba(26,39,64,0.12)' : 'none', display: 'flex', flexDirection: 'column', gap: '4px', cursor: showEx ? 'default' : 'pointer', transition: 'background 0.2s, border-color 0.2s' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: isFilled ? T.gold : T.line, color: isFilled ? T.navy : T.inkSoft, fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{b.n}</span>
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: T.navy, lineHeight: 1.2 }}>{b.title}</span>
              </span>
              {text && <span style={{ fontSize: '11px', color: T.inkSoft, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{text}</span>}
            </button>
          )
        })}
      </div>
      {cur && !showEx && (
        <div key={cur.k} className="lr-fade" style={{ marginTop: '16px', padding: '18px', borderRadius: '14px', border: `1.5px solid ${T.navy}`, background: T.card }}>
          <div style={{ fontSize: '12.5px', fontWeight: 700, color: T.goldDeep, marginBottom: '4px' }}>Blok {cur.n}: {cur.title}</div>
          <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '10px' }}>{cur.q}</div>
          <textarea className="lr-input" rows={3} value={vals[cur.k] || ''} onChange={e => setVals(p => ({ ...p, [cur.k]: e.target.value }))} placeholder={`Primjer: ${cur.ex}`} style={{ resize: 'vertical', lineHeight: 1.5 }} />
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <SmallBtn onClick={() => setActive(null)}>Zatvori</SmallBtn>
            {next && (
              <button className="lr-btn-reset lr-cta" onClick={() => setActive(next.k)} style={{ padding: '7px 16px', borderRadius: '100px', background: T.gold, color: T.navy, fontSize: '12.5px', fontWeight: 700 }}>Sljedeći: {next.title}</button>
            )}
          </div>
        </div>
      )}
      {filled === 9 && !showEx && <Done>Canvas je kompletan. Ovo je kostur vašeg biznis plana — prenesite ga u builder.</Done>}
    </WidgetCard>
  )
}

// ════════════════════════════════════════════
// MODULE 3
// ════════════════════════════════════════════

// ── PORTER'S FIVE FORCES: diagram + attractiveness meter ──
const FORCES: { k: string, title: string, short: string, desc: string, ask: string }[] = [
  { k: 'ne', title: 'Prijetnja novih ulazaka', short: 'Novi ulasci', desc: 'Koliko lako neko novi može ući na vaše tržište? Niske barijere znače stalnu prijetnju.', ask: 'Treba li puno novca, dozvola ili znanja da neko otvori isto što i vi?' },
  { k: 'su', title: 'Moć dobavljača', short: 'Dobavljači', desc: 'Koliko dobavljači diktiraju cijene i uslove? Ako ih je malo, imaju veliku moć.', ask: 'Možete li lako promijeniti dobavljača ako podigne cijene?' },
  { k: 'ri', title: 'Rivalitet konkurencije', short: 'Konkurencija', desc: 'Koliko je jaka borba među postojećim firmama? Mnogo sličnih ponuda znači pritisak na cijene.', ask: 'Koliko firmi nudi gotovo isto što i vi, istim kupcima?' },
  { k: 'bu', title: 'Moć kupaca', short: 'Kupci', desc: 'Koliko kupci mogu diktirati uslove? Ako lako prelaze kod drugog, imaju veću moć.', ask: 'Koliko lako vaš kupac može otići kod konkurencije?' },
  { k: 'sb', title: 'Prijetnja zamjena', short: 'Zamjene', desc: 'Postoje li potpuno drugi načini da kupac riješi isti problem?', ask: 'Može li kupac potrebu zadovoljiti nečim sasvim drugim?' },
]
const LEVELS = [
  { v: 1, label: 'Niska', color: T.green, wash: T.greenWash },
  { v: 2, label: 'Srednja', color: T.goldDeep, wash: T.goldWash },
  { v: 3, label: 'Visoka', color: T.red, wash: T.redWash },
]
export function PorterForces() {
  const [r, setR] = usePersist<Record<string, number>>('learn_m3_porter', {})
  const [sel, setSel] = useState('ri')
  const cur = FORCES.find(f => f.k === sel) || FORCES[0]
  const rated = FORCES.filter(f => r[f.k]).length
  const score = FORCES.reduce((s, f) => s + (r[f.k] || 0), 0)
  const strongest = FORCES.filter(f => r[f.k] === 3).map(f => f.short.toLowerCase())

  function rate(v: number) {
    const nextR = { ...r, [sel]: v }
    setR(nextR)
    const nextUnrated = FORCES.find(f => !nextR[f.k])
    if (nextUnrated) setSel(nextUnrated.k)
  }

  let verdict = ''
  if (rated === 5) {
    if (score <= 8) verdict = 'Privlačno tržište. Sile su uglavnom slabe i ima prostora za dobru zaradu.'
    else if (score <= 11) verdict = 'Umjereno privlačno tržište. Plan treba odgovoriti na najjače sile.'
    else verdict = 'Teško tržište. Trebat će vam jasna prednost ili uska niša da opstanete.'
    if (strongest.length) verdict += ` Najjači pritisak: ${strongest.join(', ')}.`
  }

  return (
    <WidgetCard title="Porterovih 5 sila za vaše tržište" hint="Kliknite silu u dijagramu i ocijenite koliko je jaka u vašoj industriji.">
      <div className="lr-porter">
        {FORCES.map(f => {
          const lv = LEVELS.find(l => l.v === r[f.k])
          const on = sel === f.k
          const center = f.k === 'ri'
          return (
            <button key={f.k} aria-pressed={on} className={`lr-btn-reset ${on ? '' : 'lr-tile'}`} onClick={() => setSel(f.k)} style={{ gridArea: f.k, padding: '14px 10px', borderRadius: '12px', textAlign: 'center', minHeight: center ? '96px' : '76px', border: `2px solid ${on ? T.navy : lv ? lv.color : T.line}`, background: center ? T.navy : lv ? lv.wash : T.paper, color: center ? 'white' : T.ink, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'border-color 0.2s, background 0.2s', boxShadow: on ? '0 0 0 3px rgba(26,39,64,0.12)' : 'none' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.25 }}>{f.title}</span>
              <span style={{ fontSize: '11.5px', fontWeight: 600, padding: '2px 10px', borderRadius: '100px', background: lv ? lv.color : center ? 'rgba(255,255,255,0.12)' : T.line, color: lv ? 'white' : center ? 'rgba(255,255,255,0.7)' : T.inkSoft }}>{lv ? lv.label : 'Neocijenjeno'}</span>
            </button>
          )
        })}
      </div>

      <div key={cur.k} className="lr-fade" style={{ marginTop: '16px', padding: '18px', borderRadius: '14px', background: T.paper, border: `1px solid ${T.line}` }}>
        <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{cur.title}</div>
        <div style={{ fontSize: '13.5px', color: T.inkSoft, marginBottom: '10px' }}>{cur.desc}</div>
        <div style={{ fontSize: '13.5px', color: T.navy, fontWeight: 600, marginBottom: '12px' }}>{cur.ask}</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {LEVELS.map(l => {
            const on = r[cur.k] === l.v
            return <button key={l.v} aria-pressed={on} className={`lr-btn-reset ${on ? '' : 'lr-chip'}`} onClick={() => rate(l.v)} style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, border: `1.5px solid ${on ? l.color : T.line}`, background: on ? l.color : T.card, color: on ? 'white' : T.inkSoft }}>{l.label}</button>
          })}
        </div>
      </div>

      <div style={{ marginTop: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: T.inkSoft, marginBottom: '6px' }}>
          <span>Privlačno</span><span>{rated}/5 ocijenjeno</span><span>Teško</span>
        </div>
        <div style={{ position: 'relative', height: '10px', borderRadius: '100px', background: `linear-gradient(90deg, ${T.green}, ${T.gold}, ${T.red})`, opacity: rated === 5 ? 1 : 0.35, transition: 'opacity 0.3s' }}>
          {rated === 5 && <div className="lr-pop" style={{ position: 'absolute', top: '-5px', left: `calc(${((score - 5) / 10) * 100}% - 10px)`, width: '20px', height: '20px', borderRadius: '50%', background: T.card, border: `3px solid ${T.navy}`, transition: 'left 0.4s' }} />}
        </div>
        {verdict && <p className="lr-fade" style={{ fontSize: '14px', color: T.navy, margin: '14px 0 0', fontWeight: 500 }}>{verdict}</p>}
      </div>
    </WidgetCard>
  )
}

// ── SWOT BUILDER with strategy step + copy ──
const QUADS = [
  { key: 's', title: 'Snage', sub: 'Interno, pozitivno', color: T.green, bg: T.greenWash, ph: 'npr. iskusan tim, niski troškovi' },
  { key: 'w', title: 'Slabosti', sub: 'Interno, negativno', color: T.red, bg: T.redWash, ph: 'npr. mali budžet, nepoznat brend' },
  { key: 'o', title: 'Prilike', sub: 'Eksterno, pozitivno', color: T.blue, bg: T.blueWash, ph: 'npr. rast tržišta, novi trend' },
  { key: 't', title: 'Prijetnje', sub: 'Eksterno, negativno', color: T.goldDeep, bg: T.goldWash, ph: 'npr. jaka konkurencija, novi propisi' },
]
const STRATS = [
  { key: 'so', title: 'Snage + prilike', q: 'Koje snage ćete iskoristiti da uhvatite prilike?' },
  { key: 'wo', title: 'Slabosti + prilike', q: 'Koje prilike vam mogu pomoći da smanjite slabosti?' },
  { key: 'st', title: 'Snage + prijetnje', q: 'Kako vas snage štite od prijetnji?' },
  { key: 'wt', title: 'Slabosti + prijetnje', q: 'Gdje ste najranjiviji i šta ćete poduzeti?' },
]
export function SwotBuilder() {
  const [vals, setVals] = usePersist<Record<string, string>>('learn_m3_swot', {})
  const { copied, copy } = useCopy()
  const lines = (k: string) => (vals[k] || '').split('\n').map(s => s.trim()).filter(Boolean).length
  const allFilled = QUADS.every(q => lines(q.key) > 0)

  function exportText() {
    const q = QUADS.map(x => `${x.title.toUpperCase()}\n${(vals[x.key] || '').trim()}`).join('\n\n')
    const s = STRATS.filter(x => (vals[x.key] || '').trim()).map(x => `${x.title}: ${(vals[x.key] || '').trim()}`).join('\n')
    return `SWOT ANALIZA\n\n${q}${s ? `\n\nSTRATEGIJE\n${s}` : ''}`
  }

  return (
    <WidgetCard title="Vaša SWOT analiza" hint="Upišite po jednu stavku u svaki red. Kad popunite sva četiri polja, otvara se korak strategije.">
      <div className="lr-grid-2" style={{ gap: '12px' }}>
        {QUADS.map(q => (
          <label key={q.key} style={{ display: 'block', border: `2px solid ${q.color}`, borderRadius: '12px', padding: '14px', background: q.bg }}>
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: q.color }}>{q.title}</span>
              <span style={{ fontSize: '11.5px', color: T.inkSoft }}>{lines(q.key)} {lines(q.key) === 1 ? 'stavka' : 'stavki'}</span>
            </span>
            <span style={{ display: 'block', fontSize: '11.5px', color: T.inkSoft, marginBottom: '8px' }}>{q.sub}</span>
            <textarea value={vals[q.key] || ''} onChange={e => setVals(p => ({ ...p, [q.key]: e.target.value }))} placeholder={q.ph} rows={4} style={{ width: '100%', border: 'none', outline: 'none', resize: 'vertical', background: 'transparent', fontSize: '13.5px', color: T.ink, lineHeight: 1.55, fontFamily: 'inherit' }} />
          </label>
        ))}
      </div>
      {allFilled && (
        <div className="lr-fade" style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>Od analize do strategije</div>
          <p style={{ fontSize: '13px', color: T.inkSoft, margin: '0 0 12px' }}>SWOT vrijedi tek kad ga pretvorite u odluke. Odgovorite kratko na četiri pitanja.</p>
          <div className="lr-grid-2" style={{ gap: '10px' }}>
            {STRATS.map(s => (
              <label key={s.key} style={{ display: 'block', padding: '12px', borderRadius: '12px', border: `1px solid ${T.line}`, background: T.paper }}>
                <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: T.goldDeep }}>{s.title}</span>
                <span style={{ display: 'block', fontSize: '13px', color: T.navy, fontWeight: 600, margin: '2px 0 8px' }}>{s.q}</span>
                <textarea className="lr-input" rows={2} value={vals[s.key] || ''} onChange={e => setVals(p => ({ ...p, [s.key]: e.target.value }))} style={{ resize: 'vertical', fontSize: '13px' }} />
              </label>
            ))}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
        {allFilled && <SmallBtn onClick={() => copy(exportText())}>{copied ? 'Kopirano' : 'Kopiraj za builder'}</SmallBtn>}
        <SmallBtn onClick={() => setVals({})}>Očisti</SmallBtn>
      </div>
    </WidgetCard>
  )
}

// ════════════════════════════════════════════
// MODULE 4
// ════════════════════════════════════════════

// ── MARKETING BUDGET ALLOCATOR ──
const CHANNELS = [
  { k: 'soc', label: 'Oglasi na društvenim mrežama', color: T.gold },
  { k: 'goo', label: 'Google oglasi', color: T.blue },
  { k: 'ref', label: 'Program preporuka', color: T.green },
  { k: 'loc', label: 'Letci i lokalni oglasi', color: '#7a869e' },
  { k: 'evt', label: 'Događaji i sajmovi', color: '#b5652e' },
]
export function BudgetAllocator() {
  const [budget, setBudget] = useState(600)
  const [pct, setPct] = useState<Record<string, number>>({ soc: 40, goo: 20, ref: 20, loc: 10, evt: 10 })
  const total = CHANNELS.reduce((s, c) => s + (pct[c.k] || 0), 0)
  const active = CHANNELS.filter(c => pct[c.k] > 0).length
  const maxShare = total > 0 ? Math.max(...CHANNELS.map(c => pct[c.k] || 0)) / total : 0

  function balance() {
    if (total === 0) return
    const scaled: Record<string, number> = {}
    CHANNELS.forEach(c => { scaled[c.k] = Math.round(((pct[c.k] || 0) / total) * 100) })
    const diff = 100 - CHANNELS.reduce((s, c) => s + scaled[c.k], 0)
    const biggest = CHANNELS.reduce((a, c) => (scaled[c.k] > scaled[a.k] ? c : a), CHANNELS[0])
    scaled[biggest.k] += diff
    setPct(scaled)
  }

  let msg = '', bad = false
  if (total !== 100) { msg = `Raspodjela mora biti tačno 100%. Trenutno je ${total}%.`; bad = true }
  else if (maxShare > 0.7) { msg = 'Više od 70% budžeta ide u jedan kanal. Ako on ne upali, ostajete bez kupaca — ostavite bar 20–30% za drugi kanal.'; bad = true }
  else if (active >= 4 && budget < 800) { msg = `Sa ${fmt(budget)} KM mjesečno, ${active} kanala je previše — svaki dobija premalo da bi dao rezultat. Fokusirajte se na 2–3.`; bad = true }
  else msg = 'Dobra raspodjela. Pratite koji kanal donosi kupce i nakon 2–3 mjeseca prebacite novac tamo gdje radi.'

  return (
    <WidgetCard title="Raspodijelite marketinški budžet" hint="Postavite mjesečni budžet pa odlučite koliko ide u koji kanal.">
      <SimRow dark={false} label="Mjesečni budžet za marketing" val={`${fmt(budget)} KM`} min={200} max={3000} step={50} value={budget} onChange={setBudget} />
      <div style={{ display: 'flex', height: '26px', borderRadius: '8px', overflow: 'hidden', background: T.line, marginBottom: '6px' }}>
        {CHANNELS.map(c => {
          const w = total > 0 ? ((pct[c.k] || 0) / total) * 100 : 0
          return <div key={c.k} title={c.label} style={{ width: `${w}%`, background: c.color, transition: 'width 0.3s' }} />
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: total === 100 ? T.green : T.red }}>Ukupno {total}%</span>
        {total !== 100 && total > 0 && <SmallBtn onClick={balance}>Uravnoteži na 100%</SmallBtn>}
      </div>
      {CHANNELS.map(c => (
        <div key={c.k} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: c.color, flexShrink: 0 }} />
          <span style={{ fontSize: '13.5px', flex: '1 1 180px' }}>{c.label}</span>
          <input type="range" className="lr-range" aria-label={c.label} min={0} max={100} step={5} value={pct[c.k] || 0} onChange={e => setPct(p => ({ ...p, [c.k]: +e.target.value }))} style={{ flex: '2 1 160px', width: 'auto' }} />
          <span style={{ fontSize: '13px', fontWeight: 600, width: '96px', textAlign: 'right', color: T.navy }}>{pct[c.k] || 0}% · {fmt(total > 0 ? budget * (pct[c.k] || 0) / 100 : 0)} KM</span>
        </div>
      ))}
      <div className="lr-fade" key={msg} style={{ marginTop: '8px', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', background: bad ? T.redWash : T.greenWash, color: bad ? T.red : T.green }}>{msg}</div>
    </WidgetCard>
  )
}

// ── STEP-BY-STEP WALKTHROUGH ──
export function StepWalkthrough({ title, hint, steps }: { title: string, hint: string, steps: { title: string, desc: string, ask: string }[] }) {
  const [cur, setCur] = useState(0)
  const s = steps[cur]
  return (
    <WidgetCard title={title} hint={hint}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '16px', right: '16px', top: '15px', height: '2px', background: T.line }} />
        <div aria-hidden="true" style={{ position: 'absolute', left: '16px', top: '15px', height: '2px', background: T.gold, width: `calc((100% - 32px) * ${cur / (steps.length - 1)})`, transition: 'width 0.35s' }} />
        {steps.map((st, i) => {
          const state = i < cur ? 'done' : i === cur ? 'cur' : 'todo'
          return (
            <button key={i} aria-current={state === 'cur' ? 'step' : undefined} className="lr-btn-reset" onClick={() => setCur(i)} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: `${100 / steps.length}%` }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, background: state === 'todo' ? T.card : state === 'cur' ? T.navy : T.gold, color: state === 'todo' ? T.inkSoft : state === 'cur' ? 'white' : T.navy, border: `2px solid ${state === 'todo' ? T.line : state === 'cur' ? T.navy : T.gold}`, transition: 'background 0.25s, border-color 0.25s' }}>{i + 1}</span>
              <span className="lr-steps-label" style={{ fontSize: '11px', color: state === 'cur' ? T.navy : T.inkSoft, fontWeight: state === 'cur' ? 700 : 500, textAlign: 'center', lineHeight: 1.25 }}>{st.title}</span>
            </button>
          )
        })}
      </div>
      <div key={cur} className="lr-fade" style={{ padding: '20px', borderRadius: '14px', background: T.paper, border: `1px solid ${T.line}` }}>
        <div style={{ fontSize: '12.5px', fontWeight: 700, color: T.goldDeep }}>Korak {cur + 1} od {steps.length}</div>
        <div style={{ fontFamily: serif, fontSize: '20px', fontWeight: 600, margin: '4px 0 8px' }}>{s.title}</div>
        <p style={{ fontSize: '14.5px', color: T.inkSoft, margin: '0 0 12px' }}>{s.desc}</p>
        <div style={{ fontSize: '14px', color: T.navy, background: T.goldWash, borderRadius: '10px', padding: '12px 14px' }}><strong>Za vaš plan:</strong> {s.ask}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px' }}>
        <button className="lr-btn-reset lr-ghost" disabled={cur === 0} onClick={() => setCur(c => c - 1)} style={{ padding: '9px 18px', borderRadius: '100px', border: `1.5px solid ${T.line}`, fontSize: '13px', fontWeight: 600, opacity: cur === 0 ? 0.4 : 1, cursor: cur === 0 ? 'default' : 'pointer' }}>← Nazad</button>
        {cur < steps.length - 1
          ? <button className="lr-btn-reset lr-cta" onClick={() => setCur(c => c + 1)} style={{ padding: '9px 20px', borderRadius: '100px', background: T.gold, color: T.navy, fontSize: '13px', fontWeight: 700 }}>Sljedeći korak</button>
          : <span style={{ fontSize: '13px', color: T.green, fontWeight: 600, alignSelf: 'center' }}>Prošli ste cijeli proces</span>}
      </div>
    </WidgetCard>
  )
}

// ════════════════════════════════════════════
// MODULE 5
// ════════════════════════════════════════════

// ── BREAK-EVEN CALCULATOR with live chart ──
export function BreakEvenCalc() {
  const [fixed, setFixed] = useState(2000)
  const [price, setPrice] = useState(20)
  const [varCost, setVarCost] = useState(8)
  const [expected, setExpected] = useState(250)
  const margin = price - varCost
  const beExact = margin > 0 ? fixed / margin : null
  const breakEven = beExact !== null ? Math.ceil(beExact) : null
  const profitAtExpected = expected * margin - fixed

  // chart geometry — SVG stretches to a fixed height (0–100 space), labels are HTML so they stay crisp
  const xmax = Math.max(20, beExact ? beExact * 2 : 0, expected * 1.15)
  const yMax = Math.max(price * xmax, fixed + varCost * xmax) * 1.08
  const X = (u: number) => (u / xmax) * 100
  const Y = (v: number) => 100 - (v / yMax) * 100
  const rev = (u: number) => price * u
  const cost = (u: number) => fixed + varCost * u
  const pts = (arr: [number, number][]) => arr.map(([u, v]) => `${X(u).toFixed(2)},${Y(v).toFixed(2)}`).join(' ')
  const beVisible = beExact !== null && beExact < xmax
  const xb = beVisible && beExact !== null ? beExact : xmax
  const lossPoly = pts([[0, cost(0)], [xb, cost(xb)], [xb, rev(xb)], [0, rev(0)]])
  const profitPoly = beVisible ? pts([[xb, rev(xb)], [xmax, rev(xmax)], [xmax, cost(xmax)], [xb, cost(xb)]]) : null
  const beX = beVisible && beExact !== null ? X(beExact) : 0
  const beY = beVisible && beExact !== null ? Y(rev(beExact)) : 0

  return (
    <WidgetCard dark title="Kalkulator praga rentabilnosti" hint="Koliko komada morate prodati da pokrijete sve troškove? Crveno je zona gubitka, zeleno zona zarade.">
      <SimRow label="Fiksni troškovi mjesečno (najam, plate…)" val={`${fmt(fixed)} KM`} min={500} max={10000} step={100} value={fixed} onChange={setFixed} />
      <SimRow label="Prodajna cijena po komadu" val={`${price} KM`} min={5} max={100} value={price} onChange={setPrice} />
      <SimRow label="Varijabilni trošak po komadu" val={`${varCost} KM`} min={1} max={80} value={varCost} onChange={setVarCost} />
      <SimRow label="Vaša očekivana prodaja mjesečno" val={`${fmt(expected)} kom`} min={0} max={1500} step={10} value={expected} onChange={setExpected} />

      <div style={{ position: 'relative', height: '220px', margin: '8px 0 4px', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Grafikon prihoda i troškova" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
          <polygon points={lossPoly} fill="rgba(214,69,69,0.22)" />
          {profitPoly && <polygon points={profitPoly} fill="rgba(63,174,116,0.25)" />}
          <line x1={X(0)} y1={Y(cost(0))} x2={X(xmax)} y2={Y(cost(xmax))} stroke="#ff8a8a" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          <line x1={X(0)} y1={Y(0)} x2={X(xmax)} y2={Y(rev(xmax))} stroke={T.gold} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
          {expected > 0 && <line x1={X(expected)} y1={0} x2={X(expected)} y2={100} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />}
        </svg>
        {beVisible && (
          <>
            <div aria-hidden="true" style={{ position: 'absolute', left: `${beX}%`, top: `${beY}%`, width: '12px', height: '12px', borderRadius: '50%', background: T.navy, border: '2.5px solid white', transform: 'translate(-50%, -50%)', transition: 'left 0.2s, top 0.2s' }} />
            <div style={{ position: 'absolute', left: `${beX}%`, top: `${beY}%`, transform: beX > 70 ? 'translate(calc(-100% - 12px), -130%)' : 'translate(12px, -130%)', fontSize: '12px', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', background: 'rgba(26,39,64,0.85)', padding: '2px 8px', borderRadius: '6px', transition: 'left 0.2s, top 0.2s' }}>Prag: {fmt(breakEven || 0)} kom</div>
          </>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
        <span>0 kom</span><span>Prodano komada mjesečno</span><span>{fmt(xmax)} kom</span>
      </div>
      <div style={{ display: 'flex', gap: '18px', fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '18px', flexWrap: 'wrap' }}>
        <span><span style={{ display: 'inline-block', width: '14px', height: '3px', background: T.gold, verticalAlign: 'middle', marginRight: '6px' }} />Prihod</span>
        <span><span style={{ display: 'inline-block', width: '14px', height: '3px', background: '#ff8a8a', verticalAlign: 'middle', marginRight: '6px' }} />Ukupni troškovi</span>
        <span><span style={{ display: 'inline-block', width: '14px', borderTop: '2px dashed rgba(255,255,255,0.6)', verticalAlign: 'middle', marginRight: '6px' }} />Očekivana prodaja</span>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Stat label="Prag rentabilnosti" value={breakEven === null ? 'Nema' : `${fmt(breakEven)} kom`} note={breakEven === null ? 'Cijena mora biti veća od varijabilnog troška' : `≈ ${fmt(breakEven * price)} KM prihoda mjesečno`} bad={breakEven === null} />
        <Stat label="Rezultat pri očekivanoj prodaji" value={`${fmt(profitAtExpected)} KM`} note={profitAtExpected >= 0 ? 'mjesečna zarada' : 'mjesečni gubitak'} bad={profitAtExpected < 0} />
      </div>
    </WidgetCard>
  )
}

// ── CASH FLOW SIMULATOR (profit on paper vs money in the bank) ──
export function CashFlowSim() {
  const [start, setStart] = useState(8000)
  const [sales, setSales] = useState(6000)
  const [costs, setCosts] = useState(5000)
  const [delay, setDelay] = useState(2)
  const months = 6
  const balances: number[] = []
  let bal = start
  for (let m = 1; m <= months; m++) {
    bal += (m > delay ? sales : 0) - costs
    balances.push(bal)
  }
  const minBal = Math.min(...balances)
  const firstNeg = balances.findIndex(b => b < 0)
  const paperProfit = (sales - costs) * months
  const maxV = Math.max(0, ...balances), minV = Math.min(0, ...balances)
  const range = maxV - minV || 1
  const zero = (maxV / range) * 100

  let msg: string
  if (sales <= costs) msg = 'Troškovi su veći od prodaje — ovaj biznis gubi novac svaki mjesec, bez obzira na rokove plaćanja.'
  else if (firstNeg >= 0) msg = `U ${firstNeg + 1}. mjesecu ostajete bez novca, iako na papiru zarađujete. Potrebna vam je dodatna rezerva od ${fmt(-minBal)} KM.`
  else msg = `Novac ne pada ispod nule. Najniže stanje na računu je ${fmt(minBal)} KM.`

  return (
    <WidgetCard dark title="Simulator novčanog toka" hint="Kupci često plaćaju kasnije nego što vi plaćate troškove. Pomjerite rok plaćanja i gledajte račun.">
      <SimRow label="Novac na računu na početku" val={`${fmt(start)} KM`} min={0} max={20000} step={500} value={start} onChange={setStart} />
      <SimRow label="Prodaja mjesečno" val={`${fmt(sales)} KM`} min={1000} max={20000} step={500} value={sales} onChange={setSales} />
      <SimRow label="Troškovi mjesečno" val={`${fmt(costs)} KM`} min={1000} max={20000} step={500} value={costs} onChange={setCosts} />
      <SimRow label="Kupci plaćaju sa zakašnjenjem od" val={delay === 0 ? 'odmah' : `${delay} mj.`} min={0} max={3} value={delay} onChange={setDelay} />

      <div style={{ padding: '22px 0', margin: '4px 0 0' }}>
      <div style={{ position: 'relative', height: '160px', display: 'flex', gap: '10px' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: `${zero}%`, borderTop: '1px solid rgba(255,255,255,0.35)' }} />
        {balances.map((b, i) => {
          const h = (Math.abs(b) / range) * 100
          const top = b >= 0 ? zero - h : zero
          return (
            <div key={i} style={{ flex: 1, position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12%', right: '12%', top: `${top}%`, height: `${Math.max(h, 0.8)}%`, background: b < 0 ? T.red : T.gold, borderRadius: b >= 0 ? '5px 5px 0 0' : '0 0 5px 5px', transition: 'top 0.35s, height 0.35s, background 0.3s' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: '10.5px', fontWeight: 600, color: b < 0 ? '#ff8a8a' : 'rgba(255,255,255,0.85)', top: b >= 0 ? `calc(${top}% - 16px)` : `calc(${top + h}% + 3px)`, transition: 'top 0.35s', whiteSpace: 'nowrap' }}>{Math.abs(b) < 50 ? '0' : `${b < 0 ? '−' : ''}${(Math.abs(b) / 1000).toFixed(1).replace('.', ',')}k`}</div>
            </div>
          )
        })}
      </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
        {balances.map((_, i) => <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '11.5px', color: 'rgba(255,255,255,0.55)' }}>{i + 1}. mj</div>)}
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Stat label="Zarada na papiru (6 mj.)" value={`${fmt(paperProfit)} KM`} bad={paperProfit < 0} />
        <Stat label="Najniže stanje na računu" value={`${fmt(minBal)} KM`} bad={minBal < 0} />
      </div>
      <p className="lr-fade" key={msg} style={{ fontSize: '13.5px', color: minBal < 0 || sales <= costs ? '#ff8a8a' : 'rgba(255,255,255,0.75)', margin: '16px 0 0', textAlign: 'center' }}>{msg}</p>
    </WidgetCard>
  )
}

// ── RISK MATRIX with heat map ──
type Risk = { name: string, prob: number, impact: number, fix: string }
const RISK_PRESETS = ['Kupci kasne s plaćanjem', 'Ulazak novog konkurenta', 'Rast cijena sirovina', 'Odlazak ključnog radnika', 'Promjena propisa']
const LV_NAMES = ['', 'Niska', 'Srednja', 'Visoka']
export function RiskMatrix() {
  const [risks, setRisks] = usePersist<Risk[]>('learn_m5_risks', [{ name: '', prob: 0, impact: 0, fix: '' }])
  const update = (i: number, patch: Partial<Risk>) => setRisks(p => p.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))
  const remove = (i: number) => setRisks(p => p.filter((_, idx) => idx !== i))
  const add = (name = '') => setRisks(p => {
    if (name && p.some(r => r.name === name)) return p
    const emptyIdx = p.findIndex(r => !r.name.trim())
    if (name && emptyIdx >= 0) return p.map((r, idx) => (idx === emptyIdx ? { ...r, name } : r))
    return [...p, { name, prob: 0, impact: 0, fix: '' }]
  })
  const score = (r: Risk) => (r.prob && r.impact ? r.prob * r.impact : 0)
  const tone = (s: number) => (s >= 6 ? { c: T.red, w: T.redWash } : s >= 3 ? { c: T.goldDeep, w: T.goldWash } : s > 0 ? { c: T.green, w: T.greenWash } : { c: T.line, w: T.paper })
  const unhandled = risks.filter(r => score(r) >= 6 && !r.fix.trim()).length

  return (
    <WidgetCard title="Vaša matrica rizika" hint="Upišite rizik, ocijenite koliko je vjerovatan i koliko bi vas pogodio. Za crvene rizike obavezno upišite mjeru.">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '12.5px', color: T.inkSoft, marginRight: '4px' }}>Česti rizici:</span>
        {RISK_PRESETS.map(pr => <SmallBtn key={pr} onClick={() => add(pr)}>+ {pr}</SmallBtn>)}
      </div>

      {risks.map((r, i) => {
        const s = score(r), t = tone(s)
        return (
          <div key={i} style={{ border: `1px solid ${T.line}`, borderLeft: `4px solid ${t.c}`, borderRadius: '12px', padding: '12px', marginBottom: '10px', background: T.card }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: T.navy, color: 'white', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
              <input className="lr-input" aria-label="Rizik" value={r.name} onChange={e => update(i, { name: e.target.value })} placeholder="Opišite rizik…" style={{ flex: '1 1 180px', width: 'auto' }} />
              <select className="lr-input" aria-label="Vjerovatnoća" value={r.prob} onChange={e => update(i, { prob: +e.target.value })} style={{ width: 'auto', flex: '0 0 auto' }}>
                <option value={0}>Vjerovatnoća</option>
                {[1, 2, 3].map(v => <option key={v} value={v}>{LV_NAMES[v]} vjer.</option>)}
              </select>
              <select className="lr-input" aria-label="Utjecaj" value={r.impact} onChange={e => update(i, { impact: +e.target.value })} style={{ width: 'auto', flex: '0 0 auto' }}>
                <option value={0}>Utjecaj</option>
                {[1, 2, 3].map(v => <option key={v} value={v}>{LV_NAMES[v]} utjecaj</option>)}
              </select>
              <span title="Prioritet" style={{ width: '34px', height: '34px', borderRadius: '8px', background: s ? t.c : T.line, color: 'white', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s || '—'}</span>
              <button className="lr-btn-reset" aria-label="Ukloni rizik" onClick={() => remove(i)} style={{ width: '28px', height: '28px', borderRadius: '8px', color: T.inkSoft, fontSize: '18px', lineHeight: 1 }}>×</button>
            </div>
            <input className="lr-input" aria-label="Mjera" value={r.fix} onChange={e => update(i, { fix: e.target.value })} placeholder={s >= 6 ? 'Obavezno: kako ćete spriječiti ili ublažiti ovaj rizik?' : 'Mjera: šta ćete uraditi ako se desi?'} style={{ marginTop: '8px', borderColor: s >= 6 && !r.fix.trim() ? T.red : T.line, fontSize: '13px' }} />
          </div>
        )
      })}
      <button className="lr-btn-reset lr-chip" onClick={() => add()} style={{ border: `1.5px dashed ${T.gold}`, color: T.goldDeep, padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>+ Dodaj rizik</button>

      <div style={{ marginTop: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Mapa rizika</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '11.5px', color: T.inkSoft, textAlign: 'center' }}>Utjecaj →</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
              {[3, 2, 1].map(imp => [1, 2, 3].map(pr => {
                const t = tone(imp * pr)
                const here = risks.map((r, i) => ({ r, i })).filter(({ r }) => r.prob === pr && r.impact === imp)
                return (
                  <div key={`${imp}-${pr}`} style={{ minHeight: '58px', borderRadius: '8px', background: t.w, border: `1px solid ${t.c}33`, padding: '6px', display: 'flex', flexWrap: 'wrap', gap: '4px', alignContent: 'flex-start' }}>
                    {here.map(({ i }) => <span key={i} className="lr-pop" title={risks[i].name} style={{ width: '22px', height: '22px', borderRadius: '50%', background: T.navy, color: 'white', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>)}
                  </div>
                )
              }))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', marginTop: '4px' }}>
              {['Niska', 'Srednja', 'Visoka'].map(l => <div key={l} style={{ fontSize: '11px', color: T.inkSoft, textAlign: 'center' }}>{l}</div>)}
            </div>
            <div style={{ fontSize: '11.5px', color: T.inkSoft, textAlign: 'center', marginTop: '2px' }}>Vjerovatnoća →</div>
          </div>
        </div>
      </div>
      {unhandled > 0 && <div className="lr-fade" style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '10px', background: T.redWash, color: T.red, fontSize: '13.5px' }}>{unhandled} {unhandled === 1 ? 'rizik visokog prioriteta nema mjeru' : 'rizika visokog prioriteta nemaju mjeru'}. Banke i komisije to prve primijete.</div>}
    </WidgetCard>
  )
}
