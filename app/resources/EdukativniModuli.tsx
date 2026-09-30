'use client'
import React, { useState, useEffect } from 'react'

const MODULES = [
  { n: 1, title: 'Biznis ideja i preduzetnik', desc: 'Opišite ideju u jednoj rečenici i predstavite sebe tako da gradite povjerenje.', time: '~20 min', tools: 'Simulator zarade, spajanje parova' },
  { n: 2, title: 'Analiza tržišta', desc: 'Profil kupca, Business Model Canvas i analiza konkurencije.', time: '~25 min', tools: 'Canvas builder, profil kupca' },
  { n: 3, title: 'Strateška analiza', desc: 'SMART ciljevi, PEST, Porterovih 5 sila i SWOT sa strategijom.', time: '~25 min', tools: 'Porter dijagram, SWOT builder' },
  { n: 4, title: 'Marketing i operacije', desc: 'Poruka, 7P, raspodjela budžeta i proces od narudžbe do isporuke.', time: '~20 min', tools: 'Planer budžeta, vodič kroz proces' },
  { n: 5, title: 'Finansije i rizici', desc: 'Prag rentabilnosti, novčani tok i matrica rizika.', time: '~25 min', tools: '3 kalkulatora, mapa rizika' },
]

const NAVY = '#1a2740'
const GOLD = '#C9A227'
const GOLD_DEEP = '#8a6d12'
const GOLD_WASH = '#fdf8ec'
const GREEN = '#2d7a4f'
const INK_SOFT = '#6b7a99'
const LINE = '#e2e8f0'

export default function EdukativniModuli() {
  const [completed, setCompleted] = useState<number[]>([])
  const [quiz, setQuiz] = useState<Record<string, { correct: number, total: number }>>({})

  useEffect(() => {
    try { setCompleted(JSON.parse(localStorage.getItem('learn_completed') || '[]')) } catch { /* ignore */ }
    try { setQuiz(JSON.parse(localStorage.getItem('learn_quiz') || '{}')) } catch { /* ignore */ }
  }, [])

  const pctDone = Math.round((completed.length / MODULES.length) * 100)
  const nextUp = MODULES.find(m => !completed.includes(m.n))

  return (
    <div style={{ marginBottom: '48px' }}>
      <h2 style={{ color: NAVY, fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ background: GOLD_WASH, color: GOLD_DEEP, fontSize: '12px', padding: '3px 10px', borderRadius: '20px' }}>MODULI</span>
        Edukativni moduli
      </h2>
      <p style={{ color: INK_SOFT, fontSize: '14px', margin: '0 0 20px', lineHeight: 1.6 }}>
        Pet interaktivnih modula koji vas vode od ideje do finansija. Svaki modul ima vježbe u kojima radite na svom biznisu — sve što upišete ostaje sačuvano.
      </p>

      <div style={{ background: NAVY, borderRadius: '14px', padding: '18px 22px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ color: 'white', fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>Vaš napredak</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>{completed.length} od {MODULES.length} modula završeno</div>
        </div>
        <div style={{ flex: 1, minWidth: '140px', maxWidth: '240px' }}>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: pctDone + '%', background: GOLD, borderRadius: '100px', transition: 'width 0.4s' }} />
          </div>
        </div>
        {nextUp && (
          <a href={`/learn/module-${nextUp.n}`} style={{ background: GOLD, color: NAVY, padding: '9px 20px', borderRadius: '100px', fontWeight: 'bold', fontSize: '13px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {completed.length === 0 ? 'Počnite s Modulom 1' : `Nastavite: Modul ${nextUp.n}`}
          </a>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {MODULES.map(m => {
          const done = completed.includes(m.n)
          const q = quiz[String(m.n)]
          return (
            <a key={m.n} href={`/learn/module-${m.n}`} style={{ display: 'flex', alignItems: 'center', gap: '18px', background: 'white', border: `1px solid ${done ? 'rgba(45,122,79,0.4)' : LINE}`, borderRadius: '14px', padding: '18px 22px', textDecoration: 'none', color: NAVY }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: done ? GREEN : GOLD_WASH, color: done ? 'white' : GOLD_DEEP, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', flexShrink: 0 }}>
                {done ? '✓' : m.n}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px', color: NAVY, marginBottom: '3px' }}>{m.title}</div>
                <div style={{ fontSize: '13px', color: INK_SOFT, lineHeight: 1.5 }}>{m.desc}</div>
                <div style={{ display: 'flex', gap: '14px', marginTop: '6px', flexWrap: 'wrap', fontSize: '12px', color: INK_SOFT }}>
                  <span>{m.time}</span>
                  <span>{m.tools}</span>
                  {q && <span style={{ color: q.correct === q.total ? GREEN : GOLD_DEEP, fontWeight: 600 }}>Kviz: {q.correct}/{q.total}</span>}
                </div>
              </div>
              <span style={{ color: GOLD, fontSize: '18px', flexShrink: 0 }}>›</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
