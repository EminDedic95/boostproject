'use client'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const STEPS = [
  { n: 1, label: 'Naslovna strana', tag: 'COVER', title: 'Osnovni podaci o biznisu', desc: 'Unesite osnovne informacije o vasem biznisu i preduzetnickom timu.' },
  { n: 2, label: 'Sazetak', tag: 'SAZETAK', title: 'Sazetak biznis plana', desc: 'Sazetak pisati POSLJEDNJI. Maksimalno 2 stranice. Odgovara na: sto? za koga? koliko treba? kakva korist?' },
  { n: 3, label: 'Biznis ideja', tag: 'DIO I.1', title: 'Opis biznis ideje', desc: 'Detaljno opisite vas poslovni koncept, proizvode/usluge i trzisnu poziciju.' },
  { n: 4, label: 'Preduzetnik', tag: 'DIO I.2', title: 'Biografija preduzetnika', desc: 'Unesite informacije o preduzetnickom timu i kljucnim osobama.' },
  { n: 5, label: 'Motivacija', tag: 'DIO I.3-4', title: 'Motivi i kvalifikacije', desc: 'Navedite motive za pokretanje biznisa i kljucne kvalifikacije tima.' },
  { n: 6, label: 'Canvas model', tag: 'DIO II.1', title: 'Business Model Canvas', desc: 'Popunite svih 9 blokova Canvas modela prema vasem poslovnom konceptu.' },
  { n: 7, label: 'Vizija i ciljevi', tag: 'DIO II.2', title: 'Vizija i SMART Ciljevi', desc: 'Definisite viziju poslovanja i minimum 3 SMART cilja.' },
  { n: 8, label: 'Misija', tag: 'DIO II.3', title: 'Misija i Abellov okvir', desc: 'Formulisite misiju kompanije i definisite ko, sta i kako.' },
  { n: 9, label: 'PEST analiza', tag: 'DIO III.1', title: 'PEST Analiza', desc: 'Identificirajte vanjske faktore koji utjecu na vase poslovanje.' },
  { n: 10, label: 'Porterovih 5', tag: 'DIO III.2', title: 'Porterovih 5 sila', desc: 'Ocijenite intenzitet svake konkurentske sile u vasoj industriji.' },
  { n: 11, label: 'SWOT', tag: 'DIO III.3', title: 'SWOT Analiza', desc: 'Analizirajte interne snage i slabosti te vanjske prilike i prijetnje.' },
  { n: 12, label: 'Analiza trzista', tag: 'DIO IV', title: 'Analiza trzista', desc: 'Istrazite trziste, konkurenciju i profil vaseg idealnog kupca.' },
  { n: 13, label: 'Marketing plan', tag: 'DIO V', title: 'Marketinski plan', desc: 'Definisite marketinske ciljeve, kanale i budzet.' },
  { n: 14, label: 'Operacije', tag: 'DIO VI', title: 'Poslovni procesi i organizacija', desc: 'Opisite kako funkcionise vase preduzece iznutra.' },
  { n: 15, label: 'Pravna forma', tag: 'DIO VI.5', title: 'Pravna forma registracije', desc: 'Navedite pravnu formu i detalje registracije preduzeca.' },
  { n: 16, label: 'Analiza rizika', tag: 'DIO VII', title: 'Analiza rizika', desc: 'Identificirajte minimum 5 rizika sa ocjenom i mjerama ublazavanja.' },
  { n: 17, label: 'Prihodi', tag: 'DIO VIII.1', title: 'Prodajni asortiman i prihodi', desc: 'Unesite proizvode/usluge sa kolicinama i cijenama.' },
  { n: 18, label: 'Ulaganja', tag: 'DIO VIII.2', title: 'Inicijalna ulaganja i izvori finansiranja', desc: 'Definisite ukupna ulaganja i strukturu finansiranja.' },
  { n: 19, label: 'Finansije', tag: 'DIO VIII.3-4', title: 'Racun dobiti i gubitka i Cash Flow', desc: 'Projekcije prihoda, troskova i novcanih tokova za 3 godine.' },
  { n: 20, label: 'KPI i scenariji', tag: 'DIO VIII.5-6', title: 'Kljucni pokazatelji i scenarijska analiza', desc: 'Finansijski KPIs i scenarijska analiza (pesimisticki/bazni/optimisticki).' },
  { n: 21, label: 'Zakljucak', tag: 'ZAKLJUCAK', title: 'Zakljucak i izjava preduzetnika', desc: 'Zakljucna izjava i potpis preduzetnika.' },
]

function Field({ label, placeholder, value, onChange, type = 'textarea', rows = 3 }: { label: string, placeholder: string, value: string, onChange: (v: string) => void, type?: string, rows?: number }) {
  return React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '16px', marginBottom: '10px', border: '1px solid #e2e8f0' } },
    React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '6px', fontSize: '13px' } }, label),
    type === 'input'
      ? React.createElement('input', { type: 'text', placeholder, value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), style: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' } })
      : React.createElement('textarea', { placeholder, value, rows, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value), style: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' } })
  )
}

function CanvasBlock({ title, value, onChange, style }: { title: string, value: string, onChange: (v: string) => void, style?: React.CSSProperties }) {
  const [focused, setFocused] = useState(false)
  return React.createElement('div', {
    style: { border: '1px solid #cbd5e0', background: focused ? 'white' : '#fafafa', padding: '10px', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', boxShadow: focused ? '0 0 0 2px #C9A227' : 'none', ...style }
  },
    React.createElement('div', { style: { fontSize: '10px', fontWeight: '700', color: '#1F4E79', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' } }, title),
    React.createElement('textarea', { value, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value), onFocus: () => setFocused(true), onBlur: () => setFocused(false), placeholder: 'Unesite...', style: { flex: 1, border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '12px', color: '#1a2740', lineHeight: 1.5, fontFamily: 'Segoe UI, sans-serif', minHeight: '50px' } })
  )
}

function TableGrid({ headers, rows, onChange }: { headers: string[], rows: string[][], onChange: (rows: string[][]) => void }) {
  return React.createElement('div', { style: { overflowX: 'auto' } },
    React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' } },
      React.createElement('thead', {},
        React.createElement('tr', {},
          ...headers.map(h => React.createElement('th', { key: h, style: { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' } }, h))
        )
      ),
      React.createElement('tbody', {},
        ...rows.map((row, ri) =>
          React.createElement('tr', { key: ri },
            ...row.map((cell, ci) =>
              React.createElement('td', { key: ci, style: { border: '1px solid #e2e8f0', padding: '4px' } },
                React.createElement('input', { type: 'text', value: cell, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { const nr = rows.map((r, rr) => rr === ri ? r.map((c, cc) => cc === ci ? e.target.value : c) : r); onChange(nr) }, style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', padding: '4px 6px', background: 'transparent', boxSizing: 'border-box' } })
              )
            )
          )
        )
      )
    )
  )
}

export default function Builder() {
  const [current, setCurrent] = useState(0)
  const [showChoice, setShowChoice] = useState(false)
  const [pendingData, setPendingData] = useState<Record<string, unknown> | null>(null)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveEmail, setSaveEmail] = useState('')
  const [saved, setSaved] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [aiOpen, setAiOpen] = useState(true)

  const [cover, setCover] = useState({ name: '', entrepreneur: '', date: '', version: '', email: '' })
  const [summary, setSummary] = useState({ idea: '', investment: '', effects: '', usp: '' })
  const [idea, setIdea] = useState({ products: '', specific: '', customers: '', marketSize: '', painPoint: '', businessModel: '', milestones: '' })
  const [bio, setBio] = useState({ name: '', dob: '', education: '', experience: '', achievements: '', linkedin: '' })
  const [motivation, setMotivation] = useState({ market: '', passion: '', autonomy: '', financial: '', social: '', eduQual: '', profSkills: '', ref1: '', ref2: '' })
  const [canvas, setCanvas] = useState<Record<string, string>>({})
  const [vision, setVision] = useState('')
  const [smartGoals, setSmartGoals] = useState([['Cilj 1', '', '', '', '', ''], ['Cilj 2', '', '', '', '', ''], ['Cilj 3', '', '', '', '', '']])
  const [mission, setMission] = useState({ statement: '', who: '', what: '', how: '' })
  const [pest, setPest] = useState({ p: '', e: '', s: '', t: '' })
  const [porter, setPorter] = useState({ rivalry: ['', ''], newEntrants: ['', ''], substitutes: ['', ''], buyers: ['', ''], suppliers: ['', ''] })
  const [swot, setSwot] = useState({ s: '', w: '', o: '', t: '' })
  const [market, setMarket] = useState({ size: '', segment: '', profile: '', competition: '', gap: '' })
  const [marketing, setMarketing] = useState({ goals: '', channels: '', budget: '', messages: '', kpis: '' })
  const [operations, setOperations] = useState({ processes: '', structure: '', equipment: '', location: '' })
  const [legal, setLegal] = useState({ form: '', code: '', date: '', address: '' })
  const [risks, setRisks] = useState([['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']])
  const [sales, setSales] = useState([['', 'kom', '0', '0.00', '0.00', '0.00'], ['', 'kom', '0', '0.00', '0.00', '0.00'], ['', 'kom', '0', '0.00', '0.00', '0.00']])
  const [investment, setInvestment] = useState({ fixed: '', working: '', sources: [['Vlastita sredstva', '0.00', '0%'], ['Bankovni kredit za opremu', '0.00', '0%'], ['Kredit za obrtna sredstva', '0.00', '0%'], ['EU fondovi / grant', '0.00', '0%'], ['Ostalo', '0.00', '0%']] })
  const [pl, setPl] = useState([['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00']])
  const [cashflow, setCashflow] = useState([['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00']])
  const [kpi, setKpi] = useState([['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00'], ['0.00', '0.00', '0.00']])
  const [scenarios, setScenarios] = useState([['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']])
  const [conclusion, setConclusion] = useState({ text: '', name: '', place: '', date: '' })

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/login'
    })
  }, [])

  const totalSteps = STEPS.length

  const totalSteps = STEPS.length
  const pct = Math.round(((current + 1) / totalSteps) * 100)
  const step = STEPS[current]

  useEffect(() => {
    const s = localStorage.getItem('boost_plan_v2')
    if (s) {
      const d = JSON.parse(s)
      if (d.cover && Object.values(d.cover).some((v: unknown) => v)) { setPendingData(d); setShowChoice(true) }
    }
  }, [])

  useEffect(() => {
    if (!showChoice) {
      localStorage.setItem('boost_plan_v2', JSON.stringify({ cover, summary, idea, bio, motivation, canvas, vision, smartGoals, mission, pest, porter, swot, market, marketing, operations, legal, risks, sales, investment, pl, cashflow, kpi, scenarios, conclusion }))
    }
  }, [cover, summary, idea, bio, motivation, canvas, vision, smartGoals, mission, pest, porter, swot, market, marketing, operations, legal, risks, sales, investment, pl, cashflow, kpi, scenarios, conclusion, showChoice])

  function continueProgress() {
    if (pendingData) {
      const d = pendingData as Record<string, unknown>
      if (d.cover) setCover(d.cover as typeof cover)
      if (d.summary) setSummary(d.summary as typeof summary)
      if (d.idea) setIdea(d.idea as typeof idea)
      if (d.bio) setBio(d.bio as typeof bio)
      if (d.motivation) setMotivation(d.motivation as typeof motivation)
      if (d.canvas) setCanvas(d.canvas as typeof canvas)
      if (d.vision) setVision(d.vision as string)
      if (d.smartGoals) setSmartGoals(d.smartGoals as typeof smartGoals)
      if (d.mission) setMission(d.mission as typeof mission)
      if (d.pest) setPest(d.pest as typeof pest)
      if (d.porter) setPorter(d.porter as typeof porter)
      if (d.swot) setSwot(d.swot as typeof swot)
      if (d.market) setMarket(d.market as typeof market)
      if (d.marketing) setMarketing(d.marketing as typeof marketing)
      if (d.operations) setOperations(d.operations as typeof operations)
      if (d.legal) setLegal(d.legal as typeof legal)
      if (d.risks) setRisks(d.risks as typeof risks)
      if (d.sales) setSales(d.sales as typeof sales)
      if (d.investment) setInvestment(d.investment as typeof investment)
      if (d.pl) setPl(d.pl as typeof pl)
      if (d.cashflow) setCashflow(d.cashflow as typeof cashflow)
      if (d.kpi) setKpi(d.kpi as typeof kpi)
      if (d.scenarios) setScenarios(d.scenarios as typeof scenarios)
      if (d.conclusion) setConclusion(d.conclusion as typeof conclusion)
    }
    setShowChoice(false)
  }

  function startFresh() {
    localStorage.removeItem('boost_plan_v2')
    setShowChoice(false)
  }

  async function generatePDF() {
    setShowSaveModal(true)
  }

  async function savePlan() {
    if (!saveEmail) return
    setGenerating(true)
    await supabase.from('business_plans').insert({ company_name: cover.name || 'Bez naziva', form_data: { cover, summary, idea, bio, motivation, canvas, vision, smartGoals, mission, pest, porter, swot, market, marketing, operations, legal, risks, sales, investment, pl, cashflow, kpi, scenarios, conclusion }, current_step: current })
    const res = await fetch('/api/generate-pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cover, summary, idea, bio, motivation, canvas, vision, smartGoals, mission, pest, porter, swot, market, marketing, operations, legal, risks, sales, investment, pl, cashflow, kpi, scenarios, conclusion }) })
    const html = await res.text()
    const win = window.open('', '_blank')
    if (win) { win.document.write(html); win.document.close(); setTimeout(() => win.print(), 500) }
    setGenerating(false)
    setSaved(true)
    setTimeout(() => setShowSaveModal(false), 2000)
  }

  function renderStep() {
    const n = current + 1

    if (n === 1) return React.createElement('div', {},
      Field({ label: 'Naziv biznisa / projekta', placeholder: 'npr. Pekara Mostar d.o.o.', value: cover.name, onChange: v => setCover(p => ({...p, name: v})), type: 'input' }),
      Field({ label: 'Ime preduzetnika / tima', placeholder: 'Ime i prezime ili nazivi clanova tima', value: cover.entrepreneur, onChange: v => setCover(p => ({...p, entrepreneur: v})), type: 'input' }),
      Field({ label: 'Datum izrade', placeholder: 'npr. 01.01.2025.', value: cover.date, onChange: v => setCover(p => ({...p, date: v})), type: 'input' }),
      Field({ label: 'Verzija dokumenta', placeholder: 'npr. v1.0', value: cover.version, onChange: v => setCover(p => ({...p, version: v})), type: 'input' }),
      Field({ label: 'E-mail / Telefon', placeholder: 'kontakt@email.com / +387 61 000 000', value: cover.email, onChange: v => setCover(p => ({...p, email: v})), type: 'input' })
    )

    if (n === 2) return React.createElement('div', {},
      Field({ label: 'Poslovna ideja (2-3 recenice)', placeholder: 'Ukratko opisite poslovni koncept...', value: summary.idea, onChange: v => setSummary(p => ({...p, idea: v})) }),
      Field({ label: 'Potrebna ulaganja — ukupan iznos i struktura finansiranja', placeholder: 'npr. Ukupno 50.000 KM: 30% vlastita sredstva, 70% bankovni kredit', value: summary.investment, onChange: v => setSummary(p => ({...p, investment: v})) }),
      Field({ label: 'Ocekivani efekti i koristi — kljucni finansijski pokazatelji, broj zaposlenih, drustveni utjecaj', placeholder: 'npr. Prihod 120.000 KM u prvoj godini, 3 nova radna mjesta...', value: summary.effects, onChange: v => setSummary(p => ({...p, effects: v})) }),
      Field({ label: 'Konkurentske prednosti (USP) — sto vas razlikuje?', placeholder: 'Zasto ce kupci odabrati vas a ne konkurenciju?', value: summary.usp, onChange: v => setSummary(p => ({...p, usp: v})) })
    )

    if (n === 3) return React.createElement('div', {},
      Field({ label: 'Naziv biznisa', placeholder: 'Naziv vaseg biznisa ili projekta', value: idea.products.split('||')[0] || '', onChange: v => setIdea(p => ({...p, products: v})), type: 'input' }),
      Field({ label: 'Detaljno opisite sto nudite — karakteristike, prednosti, razlikovanje', placeholder: 'Opisite proizvode/usluge detaljno...', value: idea.products, onChange: v => setIdea(p => ({...p, products: v})), rows: 4 }),
      Field({ label: 'Specificni atributi koji diferenciraju od konkurencije', placeholder: 'Sta vas cini jedinstvenim na trzistu?', value: idea.specific, onChange: v => setIdea(p => ({...p, specific: v})) }),
      Field({ label: 'Ko su kljucni kupci? (demografija, geografija, psihografija)', placeholder: 'Opisite vasu ciljnu grupu...', value: idea.customers, onChange: v => setIdea(p => ({...p, customers: v})) }),
      Field({ label: 'Velicina ciljnog trzista (procjena)', placeholder: 'npr. 50.000 potencijalnih kupaca u BiH...', value: idea.marketSize, onChange: v => setIdea(p => ({...p, marketSize: v})), type: 'input' }),
      Field({ label: 'Koji pain point adresira vas biznis? Kako to dokazujete?', placeholder: 'Opisite problem koji rjesavate...', value: idea.painPoint, onChange: v => setIdea(p => ({...p, painPoint: v})) }),
      Field({ label: 'Kako generirate prihod? (direktna prodaja / pretplata / B2B / B2C)', placeholder: 'Opisite poslovni model...', value: idea.businessModel, onChange: v => setIdea(p => ({...p, businessModel: v})) }),
      Field({ label: 'Kljucni koraci i rokovi: osnivanje > pilot > rast > ekspanzija', placeholder: 'Navedite milestones sa rokovima...', value: idea.milestones, onChange: v => setIdea(p => ({...p, milestones: v})), rows: 4 })
    )

    if (n === 4) return React.createElement('div', {},
      Field({ label: 'Ime i prezime', placeholder: 'Puno ime i prezime', value: bio.name, onChange: v => setBio(p => ({...p, name: v})), type: 'input' }),
      Field({ label: 'Datum i mjesto rodjenja', placeholder: 'npr. 01.01.1985., Mostar', value: bio.dob, onChange: v => setBio(p => ({...p, dob: v})), type: 'input' }),
      Field({ label: 'Obrazovanje', placeholder: 'Stepen obrazovanja, institucija, godina...', value: bio.education, onChange: v => setBio(p => ({...p, education: v})) }),
      Field({ label: 'Radno iskustvo', placeholder: 'Relevantno radno iskustvo...', value: bio.experience, onChange: v => setBio(p => ({...p, experience: v})), rows: 4 }),
      Field({ label: 'Posebna postignuca / certifikati', placeholder: 'Nagrade, certifikati, posebna postignuca...', value: bio.achievements, onChange: v => setBio(p => ({...p, achievements: v})) }),
      Field({ label: 'LinkedIn / Web profil', placeholder: 'https://linkedin.com/in/...', value: bio.linkedin, onChange: v => setBio(p => ({...p, linkedin: v})), type: 'input' })
    )

    if (n === 5) return React.createElement('div', {},
      React.createElement('h3', { style: { color: '#1a2740', fontSize: '15px', fontWeight: '700', marginBottom: '12px' } }, 'Motivi za pokretanje biznisa'),
      Field({ label: 'Identifikacija trzisne potrebe / prilike', placeholder: 'Koje ste trzisne prilike identifikovali?', value: motivation.market, onChange: v => setMotivation(p => ({...p, market: v})) }),
      Field({ label: 'Licna strast i interesovanje', placeholder: 'Sta vas inspiriše u ovom biznisu?', value: motivation.passion, onChange: v => setMotivation(p => ({...p, passion: v})) }),
      Field({ label: 'Profesionalna autonomija / kreativnost', placeholder: 'Kako ovaj biznis pruza profesionalnu slobodu?', value: motivation.autonomy, onChange: v => setMotivation(p => ({...p, autonomy: v})) }),
      Field({ label: 'Ekonomska / finansijska motivacija', placeholder: 'Finansijski ciljevi i motivacija...', value: motivation.financial, onChange: v => setMotivation(p => ({...p, financial: v})) }),
      Field({ label: 'Drustvena misija / impact', placeholder: 'Kakav drustveni utjecaj zelite ostvariti?', value: motivation.social, onChange: v => setMotivation(p => ({...p, social: v})) }),
      React.createElement('h3', { style: { color: '#1a2740', fontSize: '15px', fontWeight: '700', margin: '20px 0 12px' } }, 'Kvalifikacije i preporuke'),
      Field({ label: 'Obrazovne kvalifikacije', placeholder: 'Kljucne obrazovne kvalifikacije...', value: motivation.eduQual, onChange: v => setMotivation(p => ({...p, eduQual: v})) }),
      Field({ label: 'Strucne vjestine', placeholder: 'Tehnicke vjestine, kompetencije...', value: motivation.profSkills, onChange: v => setMotivation(p => ({...p, profSkills: v})) }),
      Field({ label: 'Preporucitelj 1 (ime, pozicija, kontakt)', placeholder: 'Ime Prezime, Pozicija, email@...', value: motivation.ref1, onChange: v => setMotivation(p => ({...p, ref1: v})), type: 'input' }),
      Field({ label: 'Preporucitelj 2 (ime, pozicija, kontakt)', placeholder: 'Ime Prezime, Pozicija, email@...', value: motivation.ref2, onChange: v => setMotivation(p => ({...p, ref2: v})), type: 'input' })
    )

    if (n === 6) return React.createElement('div', {},
      React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', marginBottom: '16px' } }, 'Kliknite na svaki blok i unesite informacije direktno.'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr 1fr 1fr', gridTemplateRows: '1fr 1fr auto', gap: '0', border: '2px solid #1a2740', height: '480px' } },
        React.createElement(CanvasBlock, { title: '1. Kljucna partnerstva', value: canvas['partners'] || '', onChange: v => setCanvas(p => ({...p, partners: v})), style: { gridColumn: '1', gridRow: '1 / 3', borderRight: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: '2. Kljucne aktivnosti', value: canvas['activities'] || '', onChange: v => setCanvas(p => ({...p, activities: v})), style: { gridColumn: '2', gridRow: '1', borderRight: '1px solid #cbd5e0', borderBottom: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: '3. Vrijednosna ponuda', value: canvas['value'] || '', onChange: v => setCanvas(p => ({...p, value: v})), style: { gridColumn: '3', gridRow: '1 / 3', borderRight: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: '4. Odnosi sa kupcima', value: canvas['relationships'] || '', onChange: v => setCanvas(p => ({...p, relationships: v})), style: { gridColumn: '4', gridRow: '1', borderRight: '1px solid #cbd5e0', borderBottom: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: '5. Korisnicki segmenti', value: canvas['segments'] || '', onChange: v => setCanvas(p => ({...p, segments: v})), style: { gridColumn: '5', gridRow: '1 / 3' } }),
        React.createElement(CanvasBlock, { title: '6. Kljucni resursi', value: canvas['resources'] || '', onChange: v => setCanvas(p => ({...p, resources: v})), style: { gridColumn: '2', gridRow: '2', borderRight: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: '7. Kanali', value: canvas['channels'] || '', onChange: v => setCanvas(p => ({...p, channels: v})), style: { gridColumn: '4', gridRow: '2', borderRight: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: '8. Struktura troskova', value: canvas['costs'] || '', onChange: v => setCanvas(p => ({...p, costs: v})), style: { gridColumn: '1 / 4', gridRow: '3', borderTop: '1px solid #cbd5e0', borderRight: '1px solid #cbd5e0' } }),
        React.createElement(CanvasBlock, { title: '9. Tokovi prihoda', value: canvas['revenue'] || '', onChange: v => setCanvas(p => ({...p, revenue: v})), style: { gridColumn: '4 / 6', gridRow: '3', borderTop: '1px solid #cbd5e0' } })
      )
    )

    if (n === 7) return React.createElement('div', {},
      Field({ label: 'Vizija poslovanja', placeholder: 'npr. Postati vodeći regionalni pruzalac [usluge] u [regiji] do [godine]', value: vision, onChange: setVision, rows: 2 }),
      React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', margin: '16px 0 10px' } }, 'SMART Ciljevi (minimum 3)'),
      React.createElement('div', { style: { overflowX: 'auto', background: 'white', borderRadius: '10px', border: '1px solid #e2e8f0' } },
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
          React.createElement('thead', {},
            React.createElement('tr', {},
              ...['Cilj', 'Specificnost', 'Mjerljivost', 'Dostiznost', 'Relevantnost', 'Rok'].map(h =>
                React.createElement('th', { key: h, style: { padding: '8px 10px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', whiteSpace: 'nowrap' } }, h)
              )
            )
          ),
          React.createElement('tbody', {},
            ...smartGoals.map((row, ri) =>
              React.createElement('tr', { key: ri },
                ...row.map((cell, ci) =>
                  React.createElement('td', { key: ci, style: { border: '1px solid #e2e8f0', padding: '4px' } },
                    React.createElement('input', { type: 'text', value: cell, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { const nr = smartGoals.map((r, rr) => rr === ri ? r.map((c, cc) => cc === ci ? e.target.value : c) : r); setSmartGoals(nr) }, style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', padding: '4px 6px', background: 'transparent', boxSizing: 'border-box' } })
                  )
                )
              )
            )
          )
        )
      ),
      React.createElement('button', { onClick: () => setSmartGoals(p => [...p, ['', '', '', '', '', '']]), style: { marginTop: '10px', background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '6px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' } }, '+ Dodaj cilj')
    )

    if (n === 8) return React.createElement('div', {},
      Field({ label: 'Izjava o misiji — sto radimo? Za koga? Koje vrijednosti zastupamo?', placeholder: 'Nasa misija je da...', value: mission.statement, onChange: v => setMission(p => ({...p, statement: v})), rows: 3 }),
      React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', margin: '16px 0 10px' } }, 'Abellov okvir'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' } },
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '700', color: '#1F4E79', fontSize: '12px', marginBottom: '6px', textTransform: 'uppercase' } }, 'Ko (Ciljni kupci)'),
          React.createElement('textarea', { value: mission.who, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setMission(p => ({...p, who: e.target.value})), placeholder: 'Unesite...', rows: 3, style: { width: '100%', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px', fontSize: '12px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' } })
        ),
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '700', color: '#C9A227', fontSize: '12px', marginBottom: '6px', textTransform: 'uppercase' } }, 'Sto (Potrebe kupaca)'),
          React.createElement('textarea', { value: mission.what, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setMission(p => ({...p, what: e.target.value})), placeholder: 'Unesite...', rows: 3, style: { width: '100%', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px', fontSize: '12px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' } })
        ),
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '700', color: '#2d7a4f', fontSize: '12px', marginBottom: '6px', textTransform: 'uppercase' } }, 'Kako (Tehnologije / Metode)'),
          React.createElement('textarea', { value: mission.how, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setMission(p => ({...p, how: e.target.value})), placeholder: 'Unesite...', rows: 3, style: { width: '100%', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px', fontSize: '12px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' } })
        )
      )
    )

    if (n === 9) return React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
      ...[
        { key: 'p', title: 'P — POLITICKI FAKTORI', color: '#2E75B6', bg: '#f0f7ff', placeholder: 'Regulatorni okvir... Poreska politika... Politicka stabilnost...' },
        { key: 'e', title: 'E — EKONOMSKI FAKTORI', color: '#C9A227', bg: '#fffbf0', placeholder: 'BDP i ekonomski rast... Inflacija / kamatne stope... Kupovna moc...' },
        { key: 's', title: 'S — SOCIJALNI FAKTORI', color: '#2d7a4f', bg: '#f0faf4', placeholder: 'Demografski trendovi... Kulturni trendovi... Zivotni stil / obrazovanje...' },
        { key: 't', title: 'T — TEHNOLOSKI FAKTORI', color: '#7B2D8B', bg: '#faf0ff', placeholder: 'Digitalizacija... Automatizacija... Inovacije u sektoru...' },
      ].map(q => React.createElement('div', { key: q.key, style: { border: '2px solid ' + q.color, borderRadius: '10px', padding: '14px', background: q.bg } },
        React.createElement('div', { style: { fontSize: '12px', fontWeight: '700', color: q.color, marginBottom: '8px' } }, q.title),
        React.createElement('textarea', { value: pest[q.key as keyof typeof pest], onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setPest(p => ({...p, [q.key]: e.target.value})), placeholder: q.placeholder, rows: 5, style: { width: '100%', border: 'none', outline: 'none', resize: 'vertical', background: 'transparent', fontSize: '13px', color: '#1a2740', lineHeight: 1.5, boxSizing: 'border-box' } })
      ))
    )

    if (n === 10) return React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
      React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' } },
        React.createElement('thead', {},
          React.createElement('tr', {},
            React.createElement('th', { style: { padding: '12px 16px', background: '#1a2740', color: 'white', textAlign: 'left', width: '35%' } }, 'SILA'),
            React.createElement('th', { style: { padding: '12px 16px', background: '#1a2740', color: 'white', textAlign: 'center', width: '20%' } }, 'OCJENA'),
            React.createElement('th', { style: { padding: '12px 16px', background: '#1a2740', color: 'white', textAlign: 'left' } }, 'OBRAZLOZENJE')
          )
        ),
        React.createElement('tbody', {},
          ...[
            { key: 'rivalry', label: 'Rivalitet medu konkurentima' },
            { key: 'newEntrants', label: 'Prijetnja novih ucesnika' },
            { key: 'substitutes', label: 'Prijetnja supstituta' },
            { key: 'buyers', label: 'Pregovaracka moc kupaca' },
            { key: 'suppliers', label: 'Pregovaracka moc dobavljaca' },
          ].map(row => React.createElement('tr', { key: row.key, style: { borderBottom: '1px solid #e2e8f0' } },
            React.createElement('td', { style: { padding: '10px 16px', fontWeight: '600', color: '#1a2740' } }, row.label),
            React.createElement('td', { style: { padding: '6px 16px', textAlign: 'center' } },
              React.createElement('select', { value: porter[row.key as keyof typeof porter][0], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setPorter(p => ({...p, [row.key]: [e.target.value, p[row.key as keyof typeof porter][1]]})), style: { border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', outline: 'none', background: 'white' } },
                React.createElement('option', { value: '' }, '—'),
                React.createElement('option', { value: 'Visoka' }, 'Visoka'),
                React.createElement('option', { value: 'Srednja' }, 'Srednja'),
                React.createElement('option', { value: 'Niska' }, 'Niska')
              )
            ),
            React.createElement('td', { style: { padding: '6px 16px' } },
              React.createElement('input', { type: 'text', value: porter[row.key as keyof typeof porter][1], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPorter(p => ({...p, [row.key]: [p[row.key as keyof typeof porter][0], e.target.value]})), placeholder: 'Obrazlozite ocjenu...', style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', background: 'transparent', boxSizing: 'border-box' } })
            )
          ))
        )
      )
    )

    if (n === 11) return React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
      ...[
        { key: 's', title: 'SNAGE (Strengths)', color: '#2d7a4f', bg: '#f0faf4', placeholder: '- Unesite snagu 1...\n- Unesite snagu 2...\n- Unesite snagu 3...' },
        { key: 'w', title: 'SLABOSTI (Weaknesses)', color: '#c0392b', bg: '#fef5f5', placeholder: '- Unesite slabost 1...\n- Unesite slabost 2...\n- Unesite slabost 3...' },
        { key: 'o', title: 'PRILIKE (Opportunities)', color: '#2E75B6', bg: '#f0f7ff', placeholder: '- Unesite priliku 1...\n- Unesite priliku 2...\n- Unesite priliku 3...' },
        { key: 't', title: 'PRIJETNJE (Threats)', color: '#C9A227', bg: '#fffbf0', placeholder: '- Unesite prijetnju 1...\n- Unesite prijetnju 2...\n- Unesite prijetnju 3...' },
      ].map(q => React.createElement('div', { key: q.key, style: { border: '2px solid ' + q.color, borderRadius: '10px', padding: '14px', background: q.bg } },
        React.createElement('div', { style: { fontSize: '13px', fontWeight: '700', color: q.color, marginBottom: '8px' } }, q.title),
        React.createElement('textarea', { value: swot[q.key as keyof typeof swot], onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setSwot(p => ({...p, [q.key]: e.target.value})), placeholder: q.placeholder, rows: 6, style: { width: '100%', border: 'none', outline: 'none', resize: 'vertical', background: 'transparent', fontSize: '13px', color: '#1a2740', lineHeight: 1.6, boxSizing: 'border-box' } })
      ))
    )

    if (n === 12) return React.createElement('div', {},
      Field({ label: 'Velicina trzista i trzisni potencijal', placeholder: 'Procijenite velicinu vaseg ciljnog trzista...', value: market.size, onChange: v => setMarket(p => ({...p, size: v})) }),
      Field({ label: 'Ciljni segment i pozicioniranje', placeholder: 'Koji segment ciljate i kako se pozicionirate?', value: market.segment, onChange: v => setMarket(p => ({...p, segment: v})) }),
      Field({ label: 'Profil idealnog kupca (persona)', placeholder: 'Detaljno opisite vaseg idealnog kupca...', value: market.profile, onChange: v => setMarket(p => ({...p, profile: v})), rows: 4 }),
      Field({ label: 'Analiza konkurencije', placeholder: 'Ko su glavni konkurenti? Koje su njihove snage/slabosti?', value: market.competition, onChange: v => setMarket(p => ({...p, competition: v})), rows: 4 }),
      Field({ label: 'Trzisna praznina (Gap analiza)', placeholder: 'Koja trzisna praznina postoji? Kako je vas biznis popunjava?', value: market.gap, onChange: v => setMarket(p => ({...p, gap: v})) })
    )

    if (n === 13) return React.createElement('div', {},
      Field({ label: 'Marketinski ciljevi', placeholder: 'Sto zelite postici marketingom u prvoj godini?', value: marketing.goals, onChange: v => setMarketing(p => ({...p, goals: v})) }),
      Field({ label: 'Marketinski kanali i taktike', placeholder: 'Drustvene mreze, SEO, oglasi, PR, eventi...', value: marketing.channels, onChange: v => setMarketing(p => ({...p, channels: v})), rows: 4 }),
      Field({ label: 'Marketinski budzet (godisnji, KM)', placeholder: 'npr. 5.000 KM godisnje', value: marketing.budget, onChange: v => setMarketing(p => ({...p, budget: v})), type: 'input' }),
      Field({ label: 'Kljucne marketinske poruke', placeholder: 'Sta je vasa glavna poruka kupcima?', value: marketing.messages, onChange: v => setMarketing(p => ({...p, messages: v})) }),
      Field({ label: 'Kljucni marketinski KPIs', placeholder: 'Kako mjerite uspjeh marketinga? (npr. broj leadova, konverzija...)', value: marketing.kpis, onChange: v => setMarketing(p => ({...p, kpis: v})) })
    )

    if (n === 14) return React.createElement('div', {},
      Field({ label: 'Kljucni poslovni procesi', placeholder: 'Opisite glavne procese od narudzbe do isporuke...', value: operations.processes, onChange: v => setOperations(p => ({...p, processes: v})), rows: 4 }),
      Field({ label: 'Organizacijska struktura i tim', placeholder: 'Ko su kljucni ljudi, koje su uloge i odgovornosti?', value: operations.structure, onChange: v => setOperations(p => ({...p, structure: v})), rows: 4 }),
      Field({ label: 'Oprema i tehnologija', placeholder: 'Koja oprema, alati i tehnologija su potrebni?', value: operations.equipment, onChange: v => setOperations(p => ({...p, equipment: v})) }),
      Field({ label: 'Lokacija i poslovni prostor', placeholder: 'Gdje ce se odvijati poslovanje? Kupovina ili najam?', value: operations.location, onChange: v => setOperations(p => ({...p, location: v})) })
    )

    if (n === 15) return React.createElement('div', {},
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '6px', fontSize: '13px' } }, 'Odabrana pravna forma (d.o.o. / obrt / d.d.)'),
          React.createElement('input', { type: 'text', value: legal.form, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLegal(p => ({...p, form: e.target.value})), placeholder: 'npr. d.o.o.', style: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' } })
        ),
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '6px', fontSize: '13px' } }, 'Sifra djelatnosti'),
          React.createElement('input', { type: 'text', value: legal.code, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLegal(p => ({...p, code: e.target.value})), placeholder: 'npr. 10.71', style: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' } })
        ),
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '6px', fontSize: '13px' } }, 'Datum planirane registracije'),
          React.createElement('input', { type: 'text', value: legal.date, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLegal(p => ({...p, date: e.target.value})), placeholder: 'npr. 01.03.2025.', style: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' } })
        ),
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '6px', fontSize: '13px' } }, 'Sjediste / adresa'),
          React.createElement('input', { type: 'text', value: legal.address, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLegal(p => ({...p, address: e.target.value})), placeholder: 'Ulica i broj, Grad', style: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' } })
        )
      )
    )

    if (n === 16) return React.createElement('div', {},
      React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', marginBottom: '12px' } }, 'Identificirajte minimum 5 rizika. Procijenite vjerovatnocu i utjecaj. Definirajte konkretne mjere.'),
      React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '10px' } },
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
          React.createElement('thead', {},
            React.createElement('tr', {},
              ...['Rizik / Prijetnja', 'Vjerovatnoca', 'Utjecaj', 'Mjere ublazavanja', ''].map(h =>
                React.createElement('th', { key: h, style: { padding: '10px 8px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px' } }, h)
              )
            )
          ),
          React.createElement('tbody', {},
            ...risks.map((row, ri) =>
              React.createElement('tr', { key: ri, style: { borderBottom: '1px solid #e2e8f0' } },
                React.createElement('td', { style: { padding: '6px 8px', border: '1px solid #e2e8f0' } },
                  React.createElement('input', { type: 'text', value: row[0], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setRisks(p => p.map((r, i) => i === ri ? [e.target.value, r[1], r[2], r[3]] : r)), placeholder: 'Opisite rizik...', style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', background: 'transparent' } })
                ),
                React.createElement('td', { style: { padding: '6px', border: '1px solid #e2e8f0', textAlign: 'center' } },
                  React.createElement('select', { value: row[1], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setRisks(p => p.map((r, i) => i === ri ? [r[0], e.target.value, r[2], r[3]] : r)), style: { border: 'none', background: 'transparent', fontSize: '11px', outline: 'none' } },
                    React.createElement('option', { value: '' }, '—'),
                    React.createElement('option', { value: 'Visoka' }, 'Visoka'),
                    React.createElement('option', { value: 'Srednja' }, 'Srednja'),
                    React.createElement('option', { value: 'Niska' }, 'Niska')
                  )
                ),
                React.createElement('td', { style: { padding: '6px', border: '1px solid #e2e8f0', textAlign: 'center' } },
                  React.createElement('select', { value: row[2], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setRisks(p => p.map((r, i) => i === ri ? [r[0], r[1], e.target.value, r[3]] : r)), style: { border: 'none', background: 'transparent', fontSize: '11px', outline: 'none' } },
                    React.createElement('option', { value: '' }, '—'),
                    React.createElement('option', { value: 'Visok' }, 'Visok'),
                    React.createElement('option', { value: 'Srednji' }, 'Srednji'),
                    React.createElement('option', { value: 'Nizak' }, 'Nizak')
                  )
                ),
                React.createElement('td', { style: { padding: '6px 8px', border: '1px solid #e2e8f0' } },
                  React.createElement('input', { type: 'text', value: row[3], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setRisks(p => p.map((r, i) => i === ri ? [r[0], r[1], r[2], e.target.value] : r)), placeholder: 'Navedite mjere...', style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', background: 'transparent' } })
                ),
                React.createElement('td', { style: { padding: '6px', border: '1px solid #e2e8f0', textAlign: 'center' } },
                  React.createElement('button', { onClick: () => setRisks(p => p.filter((_, i) => i !== ri)), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '14px' } }, 'x')
                )
              )
            )
          )
        )
      ),
      React.createElement('button', { onClick: () => setRisks(p => [...p, ['', '', '', '']]), style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' } }, '+ Dodaj rizik')
    )

    if (n === 17) return React.createElement('div', {},
      React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', marginBottom: '12px' } }, 'Unesite sve proizvode/usluge sa kolicinama i cijenama.'),
      React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '10px' } },
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
          React.createElement('thead', {},
            React.createElement('tr', {},
              ...['Proizvod / Usluga', 'Jed. mjere', 'Kol./god.', 'Prod. cijena', 'Tr. materijala', 'Ukupan prihod', ''].map(h =>
                React.createElement('th', { key: h, style: { padding: '8px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '11px', whiteSpace: 'nowrap' } }, h)
              )
            )
          ),
          React.createElement('tbody', {},
            ...sales.map((row, ri) =>
              React.createElement('tr', { key: ri, style: { borderBottom: '1px solid #e2e8f0' } },
                ...row.map((cell, ci) =>
                  React.createElement('td', { key: ci, style: { padding: '4px', border: '1px solid #e2e8f0' } },
                    React.createElement('input', { type: 'text', value: cell, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSales(p => p.map((r, i) => i === ri ? r.map((c, j) => j === ci ? e.target.value : c) : r)), style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', padding: '4px 6px', background: 'transparent', boxSizing: 'border-box' } })
                  )
                ),
                React.createElement('td', { style: { padding: '4px', textAlign: 'center' } },
                  React.createElement('button', { onClick: () => setSales(p => p.filter((_, i) => i !== ri)), style: { background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer', fontSize: '14px' } }, 'x')
                )
              )
            )
          )
        )
      ),
      React.createElement('button', { onClick: () => setSales(p => [...p, ['', 'kom', '0', '0.00', '0.00', '0.00']]), style: { background: 'white', border: '1px dashed #C9A227', color: '#C9A227', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' } }, '+ Dodaj proizvod / uslugu')
    )

    if (n === 18) return React.createElement('div', {},
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' } },
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '6px', fontSize: '13px' } }, 'Ukupna stalna sredstva (KM)'),
          React.createElement('input', { type: 'text', value: investment.fixed, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInvestment(p => ({...p, fixed: e.target.value})), placeholder: '0.00', style: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' } })
        ),
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '6px', fontSize: '13px' } }, 'Ukupna obrtna sredstva (KM)'),
          React.createElement('input', { type: 'text', value: investment.working, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInvestment(p => ({...p, working: e.target.value})), placeholder: '0.00', style: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' } })
        )
      ),
      React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', marginBottom: '10px' } }, 'Struktura finansiranja'),
      React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
        React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' } },
          React.createElement('thead', {},
            React.createElement('tr', {},
              ...['Izvor finansiranja', 'Iznos (KM)', 'Udio (%)'].map(h =>
                React.createElement('th', { key: h, style: { padding: '10px 12px', background: '#1a2740', color: 'white', textAlign: 'left', fontSize: '12px' } }, h)
              )
            )
          ),
          React.createElement('tbody', {},
            ...investment.sources.map((row, ri) =>
              React.createElement('tr', { key: ri, style: { borderBottom: '1px solid #e2e8f0' } },
                ...row.map((cell, ci) =>
                  React.createElement('td', { key: ci, style: { padding: '4px 8px', border: '1px solid #e2e8f0' } },
                    React.createElement('input', { type: 'text', value: cell, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInvestment(p => ({...p, sources: p.sources.map((r, i) => i === ri ? r.map((c, j) => j === ci ? e.target.value : c) : r)})), style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', padding: '4px', background: 'transparent', boxSizing: 'border-box' } })
                  )
                )
              )
            ),
            React.createElement('tr', { style: { background: '#f5f7fb' } },
              React.createElement('td', { style: { padding: '10px 12px', fontWeight: '700', color: '#1a2740' } }, 'UKUPNO'),
              React.createElement('td', { style: { padding: '10px 12px', fontWeight: '700', color: '#1a2740' } }, investment.sources.reduce((s, r) => s + (parseFloat(r[1]) || 0), 0).toFixed(2)),
              React.createElement('td', { style: { padding: '10px 12px', fontWeight: '700', color: '#1a2740' } }, '100%')
            )
          )
        )
      )
    )

    if (n === 19) {
      const plRows = ['UKUPAN PRIHOD OD PRODAJE', 'Troskovi materijala / robe', 'BRUTO DOBIT', 'Troskovi plata (bruto)', 'Amortizacija', 'Troskovi zakupa prostora', 'Troskovi marketinga', 'Ostali operativni troskovi', 'POSLOVNI REZULTAT (EBIT)', 'Kamate na kredite', 'REZULTAT PRIJE POREZA', 'NETO PROFIT / (GUBITAK)']
      const cfRows = ['Operativni novcani tok', 'Investicioni novcani tok (ulaganja)', 'Finansijski novcani tok', 'NETO NOVCANI TOK', 'Kumulativni novcani tok']
      return React.createElement('div', {},
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', marginBottom: '10px' } }, 'Racun dobiti i gubitka — 3 godine'),
        React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' } },
          React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
            React.createElement('thead', {},
              React.createElement('tr', {},
                React.createElement('th', { style: { padding: '8px 12px', background: '#1a2740', color: 'white', textAlign: 'left', width: '50%' } }, 'STAVKA'),
                ...['Godina 1', 'Godina 2', 'Godina 3'].map(y => React.createElement('th', { key: y, style: { padding: '8px 12px', background: '#1a2740', color: 'white', textAlign: 'right' } }, y))
              )
            ),
            React.createElement('tbody', {},
              ...plRows.map((row, ri) =>
                React.createElement('tr', { key: ri, style: { borderBottom: '1px solid #e2e8f0', background: row.toUpperCase() === row ? '#f5f7fb' : 'white' } },
                  React.createElement('td', { style: { padding: '6px 12px', fontWeight: row.toUpperCase() === row ? '700' : '400', color: '#1a2740', fontSize: '12px' } }, row),
                  ...[0, 1, 2].map(ci =>
                    React.createElement('td', { key: ci, style: { padding: '4px 8px', border: '1px solid #e2e8f0', textAlign: 'right' } },
                      React.createElement('input', { type: 'text', value: pl[ri][ci], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPl(p => p.map((r, i) => i === ri ? r.map((c, j) => j === ci ? e.target.value : c) : r)), style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', textAlign: 'right', background: 'transparent', boxSizing: 'border-box' } })
                    )
                  )
                )
              )
            )
          )
        ),
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', marginBottom: '10px' } }, 'Novcani tok (Cash Flow) — 3 godine'),
        React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
          React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
            React.createElement('thead', {},
              React.createElement('tr', {},
                React.createElement('th', { style: { padding: '8px 12px', background: '#1a2740', color: 'white', textAlign: 'left', width: '50%' } }, 'CASH FLOW'),
                ...['Godina 1', 'Godina 2', 'Godina 3'].map(y => React.createElement('th', { key: y, style: { padding: '8px 12px', background: '#1a2740', color: 'white', textAlign: 'right' } }, y))
              )
            ),
            React.createElement('tbody', {},
              ...cfRows.map((row, ri) =>
                React.createElement('tr', { key: ri, style: { borderBottom: '1px solid #e2e8f0', background: row.startsWith('NETO') || row.startsWith('Kumulativni') ? '#f5f7fb' : 'white' } },
                  React.createElement('td', { style: { padding: '6px 12px', fontWeight: row.startsWith('NETO') || row.startsWith('Kumulativni') ? '700' : '400', color: '#1a2740' } }, row),
                  ...[0, 1, 2].map(ci =>
                    React.createElement('td', { key: ci, style: { padding: '4px 8px', border: '1px solid #e2e8f0', textAlign: 'right' } },
                      React.createElement('input', { type: 'text', value: cashflow[ri][ci], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCashflow(p => p.map((r, i) => i === ri ? r.map((c, j) => j === ci ? e.target.value : c) : r)), style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', textAlign: 'right', background: 'transparent', boxSizing: 'border-box' } })
                    )
                  )
                )
              )
            )
          )
        )
      )
    }

    if (n === 20) {
      const kpiRows = ['Ukupan prihod (KM)', 'Neto profit (KM)', 'Neto marza (%)', 'Povrat na investiciju — ROI (%)', 'Break-even tacka (kom / KM)', 'Period povrata investicije (god.)']
      const scenRows = ['Prihod', 'Neto profit', 'Neto marza (%)', 'Ocjena odrzivosti']
      return React.createElement('div', {},
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', marginBottom: '10px' } }, 'Kljucni finansijski pokazatelji — 3 godine'),
        React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '20px' } },
          React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
            React.createElement('thead', {},
              React.createElement('tr', {},
                React.createElement('th', { style: { padding: '8px 12px', background: '#1a2740', color: 'white', textAlign: 'left', width: '50%' } }, 'POKAZATELJI USPJEHA'),
                ...['Godina 1', 'Godina 2', 'Godina 3'].map(y => React.createElement('th', { key: y, style: { padding: '8px 12px', background: '#1a2740', color: 'white', textAlign: 'right' } }, y))
              )
            ),
            React.createElement('tbody', {},
              ...kpiRows.map((row, ri) =>
                React.createElement('tr', { key: ri, style: { borderBottom: '1px solid #e2e8f0' } },
                  React.createElement('td', { style: { padding: '6px 12px', color: '#1a2740', fontWeight: row.includes('Povrat') || row.includes('Period') ? '700' : '400' } }, row),
                  ...[0, 1, 2].map(ci =>
                    React.createElement('td', { key: ci, style: { padding: '4px 8px', border: '1px solid #e2e8f0', textAlign: 'right' } },
                      React.createElement('input', { type: 'text', value: kpi[ri][ci], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setKpi(p => p.map((r, i) => i === ri ? r.map((c, j) => j === ci ? e.target.value : c) : r)), style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', textAlign: 'right', background: 'transparent', boxSizing: 'border-box' } })
                    )
                  )
                )
              )
            )
          )
        ),
        React.createElement('h3', { style: { color: '#1a2740', fontSize: '14px', fontWeight: '700', marginBottom: '10px' } }, 'Scenarijska analiza'),
        React.createElement('div', { style: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' } },
          React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' } },
            React.createElement('thead', {},
              React.createElement('tr', {},
                React.createElement('th', { style: { padding: '8px 12px', background: '#1a2740', color: 'white', textAlign: 'left', width: '25%' } }, ''),
                React.createElement('th', { style: { padding: '8px 12px', background: '#c0392b', color: 'white', textAlign: 'center' } }, 'PESIMISTICKI (-30%)'),
                React.createElement('th', { style: { padding: '8px 12px', background: '#2d7a4f', color: 'white', textAlign: 'center' } }, 'BAZNI (plan)'),
                React.createElement('th', { style: { padding: '8px 12px', background: '#2E75B6', color: 'white', textAlign: 'center' } }, 'OPTIMISTICKI (+30%)')
              )
            ),
            React.createElement('tbody', {},
              ...scenRows.map((row, ri) =>
                React.createElement('tr', { key: ri, style: { borderBottom: '1px solid #e2e8f0' } },
                  React.createElement('td', { style: { padding: '6px 12px', fontWeight: '600', color: '#1a2740' } }, row),
                  ...[0, 1, 2].map(ci =>
                    React.createElement('td', { key: ci, style: { padding: '4px 8px', border: '1px solid #e2e8f0', textAlign: 'center' } },
                      React.createElement('input', { type: 'text', value: scenarios[ri][ci], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setScenarios(p => p.map((r, i) => i === ri ? r.map((c, j) => j === ci ? e.target.value : c) : r)), placeholder: 'Unesite...', style: { width: '100%', border: 'none', outline: 'none', fontSize: '12px', textAlign: 'center', background: 'transparent', boxSizing: 'border-box' } })
                    )
                  )
                )
              )
            )
          )
        )
      )
    }

    if (n === 21) return React.createElement('div', {},
      Field({ label: 'Zakljucna izjava', placeholder: 'Ja, dolje potpisani/a, izjavljujem da su svi podaci u ovom biznis planu istiniti, provjereni i realisticni...', value: conclusion.text, onChange: v => setConclusion(p => ({...p, text: v})), rows: 4 }),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' } },
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '6px', fontSize: '13px' } }, 'Ime i prezime'),
          React.createElement('input', { type: 'text', value: conclusion.name, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConclusion(p => ({...p, name: e.target.value})), placeholder: 'Puno ime i prezime', style: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' } })
        ),
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '6px', fontSize: '13px' } }, 'Mjesto'),
          React.createElement('input', { type: 'text', value: conclusion.place, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConclusion(p => ({...p, place: e.target.value})), placeholder: 'Grad, drzava', style: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' } })
        ),
        React.createElement('div', { style: { background: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0', gridColumn: '1 / -1' } },
          React.createElement('label', { style: { display: 'block', fontWeight: '600', color: '#1a2740', marginBottom: '6px', fontSize: '13px' } }, 'Datum'),
          React.createElement('input', { type: 'text', value: conclusion.date, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConclusion(p => ({...p, date: e.target.value})), placeholder: 'npr. 01.01.2025.', style: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', boxSizing: 'border-box' } })
        )
      )
    )

    return React.createElement('div', {}, React.createElement('p', {}, 'Korak u izradi...'))
  }

  const gridCols = [sidebarOpen ? '240px' : '40px', '1fr', aiOpen ? '300px' : '40px'].join(' ')

  return React.createElement('div', { style: { fontFamily: 'Segoe UI, sans-serif', height: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr', overflow: 'hidden' } },
    React.createElement('nav', { style: { background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 32px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      React.createElement('a', { href: '/', style: { color: '#1a2740', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none' } }, 'BOOST Biznis Plan'),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
        React.createElement('a', { href: '/resources', style: { color: '#6b7a99', fontSize: '14px', textDecoration: 'none' } }, 'Resursi'),
        React.createElement('span', { style: { fontSize: '13px', color: '#6b7a99' } }, 'Korak ' + (current + 1) + ' od ' + totalSteps),
        React.createElement('div', { style: { width: '140px', height: '4px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' } },
          React.createElement('div', { style: { width: pct + '%', height: '100%', background: '#C9A227', borderRadius: '4px', transition: 'width 0.4s ease' } })
        )
      )
    ),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: gridCols, overflow: 'hidden', transition: 'grid-template-columns 0.3s ease' } },
      React.createElement('aside', { style: { borderRight: '1px solid #e2e8f0', background: 'white', overflow: 'hidden', position: 'relative' } },
        React.createElement('button', { onClick: () => setSidebarOpen(!sidebarOpen), style: { position: 'absolute', top: '16px', right: '-12px', width: '24px', height: '24px', borderRadius: '50%', background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: '10px', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' } }, sidebarOpen ? '<' : '>'),
        sidebarOpen && React.createElement('div', { style: { overflowY: 'auto', height: '100%' } },
          React.createElement('div', { style: { padding: '12px 16px', borderBottom: '1px solid #e2e8f0', background: '#f5f7fb' } },
            React.createElement('p', { style: { fontSize: '11px', fontWeight: '700', color: '#6b7a99', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 } }, 'BOOST Biznis Plan')
          ),
          ...STEPS.map((s, i) =>
            React.createElement('div', { key: i, onClick: () => setCurrent(i), style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 16px', borderLeft: i === current ? '3px solid #C9A227' : '3px solid transparent', background: i === current ? '#FFF8E7' : 'transparent', cursor: 'pointer' } },
              React.createElement('div', { style: { width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, background: i === current ? '#C9A227' : i < current ? '#2d7a4f' : '#f5f7fb', border: i === current ? 'none' : '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: i === current ? '#1a2740' : i < current ? 'white' : '#6b7a99' } }, i < current ? 'v' : s.n),
              React.createElement('div', {},
                React.createElement('div', { style: { fontSize: '13px', color: i === current ? '#1a2740' : '#6b7a99', fontWeight: i === current ? '600' : '400', lineHeight: 1.3 } }, s.label),
                React.createElement('div', { style: { fontSize: '11px', color: i === current ? '#C9A227' : '#9fa6b4', fontWeight: '600' } }, s.tag)
              )
            )
          )
        )
      ),
      React.createElement('main', { style: { background: '#f5f7fb', overflowY: 'auto', padding: '28px 36px' } },
        React.createElement('div', { style: { maxWidth: '100%' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' } },
            React.createElement('span', { style: { background: '#EBF4FB', color: '#1F4E79', fontSize: '11px', fontWeight: '700', padding: '2px 10px', borderRadius: '20px', letterSpacing: '0.06em' } }, step.tag),
            React.createElement('span', { style: { fontSize: '12px', color: '#6b7a99' } }, 'Korak ' + (current + 1) + ' od ' + totalSteps)
          ),
          React.createElement('h1', { style: { color: '#1a2740', fontSize: '22px', fontWeight: 'bold', margin: '6px 0 4px' } }, step.title),
          React.createElement('p', { style: { color: '#6b7a99', fontSize: '13px', marginBottom: '20px', lineHeight: 1.6 } }, step.desc),
          renderStep(),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '24px' } },
            current > 0 ? React.createElement('button', { onClick: () => setCurrent(current - 1), style: { background: 'white', color: '#1a2740', border: '1px solid #e2e8f0', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' } }, 'Nazad') : React.createElement('span', {}),
            current === totalSteps - 1
              ? React.createElement('button', { onClick: generatePDF, style: { background: '#C9A227', color: '#1a2740', border: 'none', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' } }, 'Preuzmi biznis plan')
              : React.createElement('button', { onClick: () => setCurrent(current + 1), style: { background: '#1a2740', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' } }, 'Naprijed')
          )
        )
      ),
      React.createElement('aside', { style: { borderLeft: '1px solid #e2e8f0', background: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' } },
        React.createElement('button', { onClick: () => setAiOpen(!aiOpen), style: { position: 'absolute', top: '16px', left: '-12px', width: '24px', height: '24px', borderRadius: '50%', background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: '10px', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' } }, aiOpen ? '>' : '<'),
        aiOpen && React.createElement(React.Fragment, {},
          React.createElement('div', { style: { padding: '16px 20px', borderBottom: '1px solid #e2e8f0' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
              React.createElement('div', { style: { width: '8px', height: '8px', borderRadius: '50%', background: '#2d7a4f' } }),
              React.createElement('span', { style: { fontSize: '13px', fontWeight: '600', color: '#1a2740' } }, 'AI asistent'),
              React.createElement('span', { style: { fontSize: '11px', color: '#6b7a99', marginLeft: 'auto' } }, 'BOOST vodic')
            )
          ),
          React.createElement('div', { style: { flex: 1, overflowY: 'auto', padding: '16px 20px' } },
            React.createElement('div', { style: { background: '#f5f7fb', borderRadius: '12px', padding: '14px' } },
              React.createElement('p', { style: { fontSize: '13px', color: '#1a2740', lineHeight: 1.6, margin: 0 } }, 'Zdravo! Nalazite se na koraku ' + step.title + '. Postavite mi pitanje i pomoci cu vam na osnovu BOOST vodica.')
            )
          ),
          React.createElement('div', { style: { padding: '12px 16px', borderTop: '1px solid #e2e8f0' } },
            React.createElement('div', { style: { display: 'flex', gap: '8px' } },
              React.createElement('input', { type: 'text', placeholder: 'Postavite pitanje...', style: { flex: 1, padding: '10px 14px', borderRadius: '24px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' } }),
              React.createElement('button', { style: { background: '#1a2740', color: 'white', border: 'none', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px' } }, '^')
            )
          )
        )
      )
    ),
    showSaveModal && React.createElement('div', { style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 } },
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '40px', maxWidth: '480px', width: '90%', textAlign: 'center' } },
        saved
          ? React.createElement('div', {},
              React.createElement('div', { style: { fontSize: '48px', marginBottom: '16px' } }, 'v'),
              React.createElement('h2', { style: { color: '#1a2740', fontSize: '22px', fontWeight: 'bold' } }, 'Plan je sacuvan!'),
              React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', marginTop: '8px' } }, 'Vas PDF se otvara...')
            )
          : React.createElement('div', {},
              React.createElement('h2', { style: { color: '#1a2740', fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' } }, 'Unesite email za preuzimanje'),
              React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 } }, 'Vas biznis plan ce biti sacuvan i mozete mu pristupiti u bilo kom trenutku.'),
              React.createElement('input', { type: 'email', placeholder: 'vasa@email.com', value: saveEmail, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSaveEmail(e.target.value), style: { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' } }),
              saveEmail === '' && React.createElement('p', { style: { color: '#e53e3e', fontSize: '12px', marginBottom: '8px' } }, 'Email je obavezan za preuzimanje plana.'),
              React.createElement('button', { onClick: savePlan, style: { width: '100%', background: saveEmail ? '#1a2740' : '#ccc', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: saveEmail ? 'pointer' : 'not-allowed' } }, generating ? 'Generisem...' : 'Preuzmi biznis plan')
            )
      )
    ),
    showChoice && React.createElement('div', { style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 } },
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '40px', maxWidth: '440px', width: '90%', textAlign: 'center' } },
        React.createElement('h2', { style: { color: '#1a2740', fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' } }, 'Dobrodosli nazad!'),
        React.createElement('p', { style: { color: '#6b7a99', fontSize: '14px', marginBottom: '32px', lineHeight: 1.6 } }, 'Imamo sacuvani napredak vaseg biznis plana. Zelite li nastaviti gdje ste stali ili poceti iznova?'),
        React.createElement('button', { onClick: continueProgress, style: { width: '100%', background: '#1a2740', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginBottom: '12px' } }, 'Nastavi gdje sam stao'),
        React.createElement('button', { onClick: startFresh, style: { width: '100%', background: 'white', color: '#e53e3e', border: '1px solid #e53e3e', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' } }, 'Pocni iznova')
      )
    )
  )
}
