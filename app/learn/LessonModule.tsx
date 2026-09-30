'use client'
import React, { useState, useEffect, useRef } from 'react'
import { T, serif, LearnStyles, pageStyle } from './LearnComponents'

// ════════════════════════════════════════════
// LESSON MODULE — intro → lekcije → završetak
// Svaka lekcija ima svoje provjerno pitanje.
// ════════════════════════════════════════════

export type Lesson = {
  title: string
  subtitle?: string
  body: React.ReactNode
  check: { q: string, options: string[], answer: number, why: string }
}

export type ExamQuestion = {
  q: string
  options: string[]
  answer: number
  lesson: number   // indeks lekcije (0-based) na koju se pitanje odnosi
}

export const EXAM_SIZE = 8

export type LessonModuleProps = {
  moduleId: number
  n: number
  title: string
  desc: string
  meta: { icon: React.ReactNode, text: string }[]
  goals: string[]
  lessons: Lesson[]
  exam: ExamQuestion[]
  taskTitle: string
  taskIntro: string
  tasks: string[]
  nextN: number | null
  nextTitle: string | null
}

export function LessonModule(p: LessonModuleProps) {
  const total = p.lessons.length
  const lastStep = total + 1 // 0 = intro, 1..total = lekcije, total+1 = završetak

  const [step, setStep] = useState(0)
  const [maxSeen, setMaxSeen] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [tasksDone, setTasksDone] = useState<number[]>([])
  const [passed, setPassed] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const [ready, setReady] = useState(false)
  const [resumeAsked, setResumeAsked] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  const SK = `learn_m${p.moduleId}_state`

  // ── učitavanje sačuvanog stanja ──
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SK)
      if (raw) {
        const s = JSON.parse(raw)
        if (typeof s.step === 'number' && s.step > 0 && s.step <= lastStep) setResumeAsked(true)
        if (s.answers) setAnswers(s.answers)
        if (s.tasksDone) setTasksDone(s.tasksDone)
        if (typeof s.maxSeen === 'number') setMaxSeen(Math.min(s.maxSeen, lastStep))
        if (s.passed) setPassed(true)
        if (s.skipped) setSkipped(true)
      }
    } catch { /* ignore */ }
    setReady(true)
  }, [SK, lastStep])

  // ── snimanje ──
  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem(SK, JSON.stringify({ step, maxSeen, answers, tasksDone, passed, skipped })) } catch { /* ignore */ }
  }, [SK, ready, step, maxSeen, answers, tasksDone, passed, skipped])

  // ── skrol na vrh pri promjeni koraka ──
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    topRef.current?.scrollIntoView({ block: 'start' })
  }, [step])

  // ── završetak modula ──
  useEffect(() => {
    if (!passed) return
    try {
      const done: number[] = JSON.parse(localStorage.getItem('learn_completed') || '[]')
      if (!done.includes(p.moduleId)) {
        done.push(p.moduleId)
        localStorage.setItem('learn_completed', JSON.stringify(done))
      }
      const size = Math.min(EXAM_SIZE, p.exam.length)
      const all = JSON.parse(localStorage.getItem('learn_quiz') || '{}')
      all[p.moduleId] = { correct: size, total: size }
      localStorage.setItem('learn_quiz', JSON.stringify(all))
    } catch { /* ignore */ }
  }, [passed, p.moduleId, p.exam.length])

  const correctCount = p.lessons.reduce((s, l, i) => s + (answers[i] === l.check.answer ? 1 : 0), 0)
  const answeredCount = p.lessons.filter((_, i) => answers[i] !== undefined).length

  function go(s: number) {
    setStep(s)
    setMaxSeen(m => Math.max(m, s))
  }

  const pct = Math.round((step / lastStep) * 100)

  return (
    <div className="lr-root" style={pageStyle}>
      <LearnStyles />

      {/* sticky traka */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(250,248,243,0.94)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: `1px solid ${T.line}`, padding: '12px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/resources" style={{ fontSize: '13px', color: T.inkSoft, textDecoration: 'none', whiteSpace: 'nowrap' }}>← Svi moduli</a>
          <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Napredak kroz modul" style={{ flex: 1, height: '5px', background: T.line, borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: pct + '%', background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`, borderRadius: '100px', transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1)' }} />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: T.goldDeep, whiteSpace: 'nowrap' }}>
            {step === 0 ? 'Uvod' : step === lastStep ? 'Kraj' : `Lekcija ${step}/${total}`}
          </span>
        </div>
      </div>

      <div ref={topRef} style={{ scrollMarginTop: '70px' }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

        {/* šina lekcija */}
        {step > 0 && (
          <LessonRail total={total} step={step} maxSeen={maxSeen} lastStep={lastStep} answers={answers} lessons={p.lessons} onGo={go} />
        )}

        {step === 0 && (
          <IntroStep {...p} total={total} resume={resumeAsked && maxSeen > 0 ? maxSeen : null} onStart={() => go(1)} onResume={s => go(s)} />
        )}

        {step > 0 && step <= total && (
          <LessonStep
            key={step}
            index={step - 1}
            total={total}
            lesson={p.lessons[step - 1]}
            answer={answers[step - 1]}
            onAnswer={a => setAnswers(prev => (prev[step - 1] !== undefined ? prev : { ...prev, [step - 1]: a }))}
            onBack={() => go(step - 1)}
            onNext={() => go(step + 1)}
          />
        )}

        {step === lastStep && (
          <FinishStep
            correct={correctCount}
            total={total}
            answered={answeredCount}
            exam={p.exam}
            lessonTitles={p.lessons.map(l => l.title)}
            passed={passed}
            skipped={skipped}
            onPass={() => setPassed(true)}
            onSkip={() => setSkipped(true)}
            onGoLesson={n => go(n)}
            taskTitle={p.taskTitle}
            taskIntro={p.taskIntro}
            tasks={p.tasks}
            tasksDone={tasksDone}
            onToggleTask={i => setTasksDone(d => (d.includes(i) ? d.filter(x => x !== i) : [...d, i]))}
            nextN={p.nextN}
            nextTitle={p.nextTitle}
            onReview={() => go(1)}
            onBack={() => go(total)}
          />
        )}
      </div>
    </div>
  )
}

// ── ŠINA LEKCIJA ──
function LessonRail({ total, step, maxSeen, lastStep, answers, lessons, onGo }: { total: number, step: number, maxSeen: number, lastStep: number, answers: Record<number, number>, lessons: Lesson[], onGo: (s: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '18px 0 0', flexWrap: 'wrap' }}>
      {Array.from({ length: total }, (_, i) => i + 1).map(s => {
        const cur = s === step
        const seen = s <= maxSeen
        const ok = answers[s - 1] !== undefined && answers[s - 1] === lessons[s - 1].check.answer
        const missed = answers[s - 1] !== undefined && !ok
        const bg = cur ? T.navy : ok ? T.green : missed ? T.gold : seen ? T.goldWash : 'transparent'
        const col = cur ? 'white' : ok || missed ? 'white' : seen ? T.goldDeep : '#b9c0cc'
        return (
          <button
            key={s}
            disabled={!seen}
            onClick={() => onGo(s)}
            title={lessons[s - 1].title}
            aria-current={cur ? 'step' : undefined}
            className="lr-btn-reset"
            style={{ width: '30px', height: '30px', borderRadius: '50%', background: bg, color: col, border: `1.5px solid ${cur ? T.navy : ok ? T.green : missed ? T.gold : T.line}`, fontSize: '12.5px', fontWeight: 700, cursor: seen ? 'pointer' : 'default', transition: 'background 0.2s, border-color 0.2s' }}
          >{s}</button>
        )
      })}
      <span style={{ width: '18px', height: '1.5px', background: T.line, margin: '0 2px' }} />
      <button
        disabled={maxSeen < lastStep}
        onClick={() => onGo(lastStep)}
        title="Završetak"
        className="lr-btn-reset"
        style={{ height: '30px', padding: '0 14px', borderRadius: '100px', background: step === lastStep ? T.navy : 'transparent', color: step === lastStep ? 'white' : maxSeen >= lastStep ? T.goldDeep : '#b9c0cc', border: `1.5px solid ${step === lastStep ? T.navy : T.line}`, fontSize: '12px', fontWeight: 700, cursor: maxSeen >= lastStep ? 'pointer' : 'default' }}
      >Kraj</button>
    </div>
  )
}

// ── UVODNI KORAK ──
function IntroStep({ n, title, desc, meta, goals, total, resume, onStart, onResume }: { n: number, title: string, desc: string, meta: { icon: React.ReactNode, text: string }[], goals: string[], total: number, resume: number | null, onStart: () => void, onResume: (s: number) => void }) {
  return (
    <div className="lr-fade">
      <header className="lr-hero" style={{ padding: '56px 0 36px' }}>
        <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, color: T.goldDeep, marginBottom: '16px', padding: '5px 14px', background: T.goldWash, borderRadius: '100px', border: '1px solid rgba(201,162,39,0.25)' }}>Modul {n} od 5</span>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(32px, 6vw, 46px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.02em', margin: '0 0 18px' }}>{title}</h1>
        <p style={{ fontSize: '17px', color: T.inkSoft, maxWidth: '62ch', margin: 0 }}>{desc}</p>
        <div style={{ display: 'flex', gap: '24px', marginTop: '26px', flexWrap: 'wrap' }}>
          {meta.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: T.inkSoft }}>{m.icon}<span>{m.text}</span></div>
          ))}
        </div>
      </header>

      <div className="lr-pad" style={{ background: T.navy, color: 'white', borderRadius: '20px', padding: '32px 34px' }}>
        <h2 style={{ fontFamily: serif, fontSize: '20px', fontWeight: 600, margin: '0 0 6px', color: 'white' }}>Šta ćete naučiti</h2>
        <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', margin: '0 0 18px' }}>{total} {total === 5 ? 'lekcija' : 'lekcije'}, svaka sa kratkom provjerom na kraju.</p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', margin: 0, padding: 0 }}>
          {goals.map((g, i) => (
            <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '15px', color: 'rgba(255,255,255,0.85)' }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(201,162,39,0.22)', color: T.goldLight, fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>{i + 1}</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ padding: '32px 0 80px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button className="lr-btn-reset lr-cta" onClick={onStart} style={{ background: T.gold, color: T.navy, padding: '15px 34px', borderRadius: '100px', fontWeight: 700, fontSize: '15px' }}>
          {resume ? 'Počni ispočetka' : 'Počnite prvu lekciju →'}
        </button>
        {resume && (
          <button className="lr-btn-reset lr-ghost" onClick={() => onResume(resume)} style={{ background: 'transparent', color: T.navy, border: `1.5px solid ${T.line}`, padding: '15px 28px', borderRadius: '100px', fontWeight: 700, fontSize: '15px' }}>
            Nastavi gdje si stao
          </button>
        )}
      </div>
    </div>
  )
}

// ── LEKCIJA ──
function LessonStep({ index, total, lesson, answer, onAnswer, onBack, onNext }: { index: number, total: number, lesson: Lesson, answer: number | undefined, onAnswer: (a: number) => void, onBack: () => void, onNext: () => void }) {
  return (
    <div className="lr-fade">
      <div style={{ padding: '26px 0 0' }}>
        <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: 700, color: T.goldDeep }}>Lekcija {index + 1} od {total}</span>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(26px, 4.5vw, 34px)', fontWeight: 600, letterSpacing: '-0.015em', margin: '6px 0 10px', lineHeight: 1.18 }}>{lesson.title}</h1>
        {lesson.subtitle && <p style={{ fontSize: '17px', color: T.inkSoft, margin: '0 0 8px', maxWidth: '62ch' }}>{lesson.subtitle}</p>}
      </div>

      <div style={{ paddingTop: '10px' }}>{lesson.body}</div>

      <CheckQuestion check={lesson.check} answer={answer} onAnswer={onAnswer} />

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '26px 0 80px', flexWrap: 'wrap' }}>
        <button className="lr-btn-reset lr-ghost" onClick={onBack} style={{ padding: '13px 26px', borderRadius: '100px', border: `1.5px solid ${T.line}`, fontSize: '14px', fontWeight: 600, background: 'transparent' }}>← Nazad</button>
        <button className="lr-btn-reset lr-cta" onClick={onNext} style={{ padding: '13px 30px', borderRadius: '100px', background: T.gold, color: T.navy, fontSize: '14px', fontWeight: 700 }}>
          {index + 1 === total ? 'Završi modul →' : 'Sljedeća lekcija →'}
        </button>
      </div>
    </div>
  )
}

// ── PROVJERA NA KRAJU LEKCIJE ──
function CheckQuestion({ check, answer, onAnswer }: { check: Lesson['check'], answer: number | undefined, onAnswer: (a: number) => void }) {
  const [picked, setPicked] = useState<number | null>(answer ?? null)
  const done = answer !== undefined
  const correct = done && answer === check.answer

  return (
    <div className="lr-pad" style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: '18px', padding: '28px', margin: '32px 0 0' }}>
      <div style={{ fontSize: '12.5px', fontWeight: 700, color: T.goldDeep, marginBottom: '6px' }}>Provjera</div>
      <div style={{ fontWeight: 600, fontSize: '16.5px', marginBottom: '16px', lineHeight: 1.45 }}>{check.q}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {check.options.map((opt, i) => {
          const isAns = i === check.answer
          const sel = picked === i
          let bg: string = T.paper, bd: string = T.line, col: string = T.ink, weight = 400
          if (done) {
            if (isAns) { bg = T.greenWash; bd = T.green; col = T.green; weight = 600 }
            else if (i === answer) { bg = T.redWash; bd = T.red; col = T.red }
          } else if (sel) { bg = T.goldWash; bd = T.gold }
          return (
            <button
              key={i}
              disabled={done}
              className={`lr-btn-reset ${done ? '' : 'lr-opt'}`}
              onClick={() => setPicked(i)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', border: `1.5px solid ${bd}`, borderRadius: '12px', fontSize: '15px', background: bg, color: col, fontWeight: weight, opacity: done && !isAns && i !== answer ? 0.5 : 1, cursor: done ? 'default' : 'pointer', textAlign: 'left', transition: 'background 0.15s, border-color 0.15s' }}
            >
              <span style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${done ? (isAns ? T.green : i === answer ? T.red : T.line) : sel ? T.gold : T.line}`, background: done ? (isAns ? T.green : i === answer ? T.red : 'transparent') : sel ? T.gold : 'transparent', flexShrink: 0 }} />
              <span>{opt}</span>
            </button>
          )
        })}
      </div>

      {!done && (
        <button
          className="lr-btn-reset"
          disabled={picked === null}
          onClick={() => picked !== null && onAnswer(picked)}
          style={{ marginTop: '16px', padding: '11px 26px', borderRadius: '100px', background: picked === null ? T.line : T.navy, color: picked === null ? T.inkSoft : 'white', fontSize: '14px', fontWeight: 700, cursor: picked === null ? 'default' : 'pointer' }}
        >Provjeri odgovor</button>
      )}

      {done && (
        <div className="lr-fade" style={{ marginTop: '16px', padding: '14px 18px', borderRadius: '12px', background: correct ? T.greenWash : T.redWash, color: correct ? T.green : T.red, fontSize: '14.5px', lineHeight: 1.6 }}>
          <strong>{correct ? 'Tačno. ' : 'Nije tačno. '}</strong>{check.why}
        </div>
      )}
    </div>
  )
}

// ── ZAVRŠETAK: završni test + zadatak ──
function FinishStep({ correct, total, answered, exam, lessonTitles, passed, skipped, onPass, onSkip, onGoLesson, taskTitle, taskIntro, tasks, tasksDone, onToggleTask, nextN, nextTitle, onReview, onBack }: { correct: number, total: number, answered: number, exam: ExamQuestion[], lessonTitles: string[], passed: boolean, skipped: boolean, onPass: () => void, onSkip: () => void, onGoLesson: (n: number) => void, taskTitle: string, taskIntro: string, tasks: string[], tasksDone: number[], onToggleTask: (i: number) => void, nextN: number | null, nextTitle: string | null, onReview: () => void, onBack: () => void }) {
  const unlocked = passed || skipped
  return (
    <div className="lr-fade">
      <div style={{ padding: '30px 0 0' }}>
        <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: 700, color: T.goldDeep }}>Završetak modula</span>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 600, margin: '6px 0 12px', lineHeight: 1.15 }}>Završni test</h1>
        <p style={{ fontSize: '16px', color: T.inkSoft, margin: '0 0 6px', maxWidth: '62ch' }}>
          Osam pitanja iz svih lekcija. Za prolaz su potrebni <strong style={{ color: T.navy }}>svi tačni odgovori</strong> — svaki pokušaj donosi drugačija pitanja.
        </p>
        {answered > 0 && (
          <p style={{ fontSize: '13.5px', color: T.inkSoft, margin: '10px 0 0' }}>
            Kroz lekcije ste tačno odgovorili na {correct} od {total} provjera.
            {correct < total && <> <button className="lr-btn-reset" onClick={onReview} style={{ color: T.goldDeep, textDecoration: 'underline', fontSize: '13.5px', fontWeight: 600 }}>Ponovite lekcije</button> prije testa.</>}
          </p>
        )}
      </div>

      <FinalExam exam={exam} lessonTitles={lessonTitles} passed={passed} onPass={onPass} onGoLesson={onGoLesson} />

      <div className="lr-pad" style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: '20px', padding: '30px 34px', margin: '20px 0 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: serif, fontSize: '22px', fontWeight: 600, margin: '0 0 6px' }}>{taskTitle}</h2>
          <span style={{ fontSize: '13px', color: T.goldDeep, fontWeight: 600 }}>{tasksDone.length}/{tasks.length}</span>
        </div>
        <p style={{ color: T.inkSoft, fontSize: '14px', margin: '0 0 14px' }}>{taskIntro}</p>
        {tasks.map((it, i) => {
          const isDone = tasksDone.includes(i)
          return (
            <button key={i} role="checkbox" aria-checked={isDone} className="lr-btn-reset" onClick={() => onToggleTask(i)} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '13px 0', borderBottom: i < tasks.length - 1 ? `1px solid ${T.line}` : 'none', width: '100%' }}>
              <span className={isDone ? 'lr-land' : ''} style={{ width: '23px', height: '23px', borderRadius: '7px', border: `2px solid ${isDone ? T.gold : T.line}`, background: isDone ? T.gold : 'transparent', flexShrink: 0, marginTop: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s, border-color 0.2s' }}>
                <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '13px', height: '13px', stroke: T.navy, fill: 'none', strokeWidth: 3.2, opacity: isDone ? 1 : 0 }}><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <span style={{ fontSize: '15px', color: isDone ? T.inkSoft : T.ink, textDecoration: isDone ? 'line-through' : 'none', textAlign: 'left' }}>{it}</span>
            </button>
          )
        })}
      </div>

      <div className="lr-cta-row" style={{ textAlign: 'center', padding: '36px 0 80px' }}>
        {nextN ? (
          unlocked ? (
            <>
              <p style={{ fontSize: '15px', color: T.inkSoft, margin: '0 0 18px' }}>{passed ? 'Test je položen. Spremni ste za sljedeći modul.' : 'Test niste položili, ali možete nastaviti.'}</p>
              <a href={`/learn/module-${nextN}`} className="lr-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: T.gold, color: T.navy, padding: '15px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>
                Modul {nextN}: {nextTitle} →
              </a>
              <a href="/builder" className="lr-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'transparent', color: T.navy, border: `1.5px solid ${T.line}`, padding: '15px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', textDecoration: 'none', marginLeft: '10px' }}>Otvori builder</a>
            </>
          ) : (
            <>
              <p style={{ fontSize: '15px', color: T.inkSoft, margin: '0 0 18px' }}>Položite završni test da otključate sljedeći modul.</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: T.line, color: '#8b93a3', padding: '15px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', cursor: 'not-allowed' }}>
                <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '16px', height: '16px', stroke: '#8b93a3', fill: 'none', strokeWidth: 2 }}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                Modul {nextN}: {nextTitle}
              </span>
              <div style={{ marginTop: '16px' }}>
                <button className="lr-btn-reset" onClick={onSkip} style={{ color: T.inkSoft, fontSize: '13px', textDecoration: 'underline' }}>Preskoči test ovaj put →</button>
              </div>
            </>
          )
        ) : (
          <>
            <p style={{ fontSize: '15px', color: T.inkSoft, margin: '0 0 18px' }}>Završili ste sve module. Vrijeme je da napišete svoj plan.</p>
            <a href="/builder" className="lr-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: T.gold, color: T.navy, padding: '15px 32px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }}>Otvori builder</a>
          </>
        )}
        <div style={{ marginTop: '18px' }}>
          <button className="lr-btn-reset" onClick={onBack} style={{ color: T.inkSoft, fontSize: '13px', textDecoration: 'underline' }}>← Nazad na zadnju lekciju</button>
        </div>
      </div>
    </div>
  )
}

// ── ZAVRŠNI TEST ──
type Drawn = { qi: number, order: number[] }

function shuffle<X>(arr: X[]): X[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = a[i]; a[i] = a[j]; a[j] = t
  }
  return a
}

function FinalExam({ exam, lessonTitles, passed, onPass, onGoLesson }: { exam: ExamQuestion[], lessonTitles: string[], passed: boolean, onPass: () => void, onGoLesson: (n: number) => void }) {
  const size = Math.min(EXAM_SIZE, exam.length)
  const [draw, setDraw] = useState<Drawn[] | null>(null)
  const [picks, setPicks] = useState<Record<number, number>>({})
  const [result, setResult] = useState<null | { correct: number, weakLessons: number[] }>(null)
  const [attempt, setAttempt] = useState(1)

  // izvlačenje tek na klijentu — inače se server i browser ne poklope
  useEffect(() => {
    if (passed) return
    setDraw(shuffle(exam.map((_, i) => i)).slice(0, size).map(qi => ({ qi, order: shuffle(exam[qi].options.map((_, k) => k)) })))
  }, [exam, size, passed, attempt])

  function submit() {
    if (!draw) return
    let correct = 0
    const weak = new Set<number>()
    draw.forEach((d, idx) => {
      const chosenOriginal = d.order[picks[idx]]
      if (chosenOriginal === exam[d.qi].answer) correct++
      else weak.add(exam[d.qi].lesson)
    })
    setResult({ correct, weakLessons: [...weak].sort((a, b) => a - b) })
    if (correct === draw.length) onPass()
  }

  function retry() {
    setPicks({})
    setResult(null)
    setAttempt(a => a + 1)
  }

  if (passed) {
    return (
      <div className="lr-pad lr-pop" style={{ background: T.navy, borderRadius: '20px', padding: '30px 34px', margin: '24px 0 0', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '26px', height: '26px', stroke: 'white', fill: 'none', strokeWidth: 3 }}><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ color: 'white', fontFamily: serif, fontSize: '22px', fontWeight: 600, marginBottom: '3px' }}>Test položen</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Svih {size} odgovora tačno. Sljedeći modul je otključan.</div>
        </div>
      </div>
    )
  }

  if (!draw) {
    return <div className="lr-pad" style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: '20px', padding: '30px', margin: '24px 0 0', color: T.inkSoft, fontSize: '14px' }}>Priprema pitanja…</div>
  }

  const allAnswered = draw.every((_, idx) => picks[idx] !== undefined)

  return (
    <div className="lr-pad" style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: '20px', padding: '30px 34px', margin: '24px 0 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <span style={{ fontSize: '12.5px', fontWeight: 700, color: T.goldDeep }}>Pokušaj {attempt}</span>
        <span style={{ fontSize: '13px', color: T.inkSoft }}>{Object.keys(picks).length} od {draw.length} odgovoreno</span>
      </div>

      {draw.map((d, idx) => {
        const q = exam[d.qi]
        return (
          <div key={`${attempt}-${idx}`} style={{ marginBottom: '26px' }}>
            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '12px', lineHeight: 1.45 }}>
              <span style={{ color: T.goldDeep }}>{idx + 1}.</span> {q.q}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {d.order.map((origIdx, oi) => {
                const sel = picks[idx] === oi
                return (
                  <button
                    key={oi}
                    data-exam-opt={`${idx}-${oi}`}
                    disabled={!!result}
                    className={`lr-btn-reset ${result ? '' : 'lr-opt'}`}
                    onClick={() => setPicks(p => ({ ...p, [idx]: oi }))}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 17px', border: `1.5px solid ${sel ? T.gold : T.line}`, borderRadius: '12px', fontSize: '14.5px', background: sel ? T.goldWash : T.paper, color: T.ink, textAlign: 'left', cursor: result ? 'default' : 'pointer', transition: 'background 0.15s, border-color 0.15s' }}
                  >
                    <span style={{ width: '19px', height: '19px', borderRadius: '50%', border: `2px solid ${sel ? T.gold : T.line}`, background: sel ? T.gold : 'transparent', flexShrink: 0 }} />
                    <span>{q.options[origIdx]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {!result && (
        <button
          className="lr-btn-reset"
          disabled={!allAnswered}
          onClick={submit}
          style={{ padding: '13px 30px', borderRadius: '100px', background: allAnswered ? T.navy : T.line, color: allAnswered ? 'white' : '#8b93a3', fontSize: '14.5px', fontWeight: 700, cursor: allAnswered ? 'pointer' : 'default' }}
        >Predaj test</button>
      )}

      {result && (
        <div className="lr-fade" style={{ padding: '20px 22px', borderRadius: '14px', background: T.redWash, border: `1px solid ${T.red}33` }}>
          <div style={{ fontWeight: 700, fontSize: '16px', color: T.red, marginBottom: '6px' }}>{result.correct} od {draw.length} tačno — za prolaz trebaju svi</div>
          <p style={{ fontSize: '14px', color: T.ink, margin: '0 0 12px', lineHeight: 1.6 }}>
            Ne prikazujemo koja su pitanja pogrešna, jer sljedeći pokušaj donosi drugačija. Vratite se na lekcije ispod i pokušajte ponovo.
          </p>
          {result.weakLessons.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
              {result.weakLessons.map(li => (
                <button key={li} className="lr-btn-reset lr-chip" onClick={() => onGoLesson(li + 1)} style={{ padding: '7px 14px', borderRadius: '100px', border: `1.5px solid ${T.line}`, background: T.card, color: T.navy, fontSize: '12.5px', fontWeight: 600 }}>
                  Lekcija {li + 1}: {lessonTitles[li]}
                </button>
              ))}
            </div>
          )}
          <button className="lr-btn-reset lr-cta" onClick={retry} style={{ padding: '11px 24px', borderRadius: '100px', background: T.gold, color: T.navy, fontSize: '14px', fontWeight: 700 }}>Pokušaj ponovo</button>
        </div>
      )}
    </div>
  )
}
