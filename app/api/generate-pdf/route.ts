import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const d = await req.json()
  const { cover, summary, idea, bio, motivation, canvas, vision, smartGoals, mission, pest, porter, swot, market, marketing, operations, legal, risks, conclusion, salesData, normativData, stalnaData, finansiranjeData, promocijaData, troskoviData } = d

  function section(title: string) {
    return `<div class="section-title">${title}</div>`
  }

  function field(label: string, value: string) {
    if (!value || !String(value).trim()) return ''
    return `<div class="field"><div class="field-label">${label}</div><div class="field-value">${String(value).replace(/\n/g, '<br>')}</div></div>`
  }

  function table(headers: string[], rows: (string | number)[][], highlight?: number[]) {
    const heads = headers.map(h => `<th>${h}</th>`).join('')
    const body = rows.map((row, ri) => {
      const isHighlight = highlight && highlight.includes(ri)
      return `<tr class="${isHighlight ? 'highlight-row' : ''}">${row.map(c => `<td>${c ?? '—'}</td>`).join('')}</tr>`
    }).join('')
    return `<table><thead><tr>${heads}</tr></thead><tbody>${body}</tbody></table>`
  }

  function fmt(n: number) {
    if (isNaN(n)) return '0.00'
    return n.toLocaleString('bs-BA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  // ─── FINANCIAL CALCULATIONS ───────────────────────────────────────────────

  const products = salesData?.products || []
  const g2 = salesData?.growthG2 || 1.10
  const g3 = salesData?.growthG3 || 1.20

  const prihodG1 = products.reduce((s: number, p: any) => s + p.obim * p.cijena, 0)
  const prihodG2 = prihodG1 * g2
  const prihodG3 = prihodG1 * g3
  const trMatG1 = products.reduce((s: number, p: any) => s + p.obim * p.trMat, 0)
  const trMatG2 = trMatG1 * g2
  const trMatG3 = trMatG1 * g3
  const brutoG1 = prihodG1 - trMatG1
  const brutoG2 = prihodG2 - trMatG2
  const brutoG3 = prihodG3 - trMatG3

  // Amortizacija
  const amortRates: Record<string, number> = { infrastruktura: 40, oprema: 10, vozila: 5, zemljiste: 0 }
  let amort = 0
  for (const [cat, rate] of Object.entries(amortRates)) {
    if (rate === 0) continue
    const items = stalnaData?.[cat] || []
    amort += items.reduce((s: number, i: any) => s + i.kolicina * i.vrijednost, 0) / rate
  }

  const plateG1 = (troskoviData?.zaposleni || []).reduce((s: number, z: any) => s + z.brutoPlataMjes * 12, 0)
  const plateG2 = plateG1 * g2
  const plateG3 = plateG1 * g3

  const ostalTrG1 = (troskoviData?.ostaliTroskovi || []).reduce((s: number, t: any) => s + t.mjesecniIznos * 12, 0)
  const ostalTrG2 = ostalTrG1 * g2
  const ostalTrG3 = ostalTrG1 * g3

  const marketingG1 = (promocijaData?.items || []).reduce((s: number, i: any) => s + i.mjesecniIznos * 12, 0)
  const marketingG2 = marketingG1 * g2
  const marketingG3 = marketingG1 * g3

  // Kredit kamata po godinama
  const k = finansiranjeData?.kredit || {}
  function calcKamataYear(year: number): number {
    if (!k.iznos || !k.kamatnaStopa || !k.rokOtplate) return 0
    const r = k.kamatnaStopa / 100 / 12
    const annuitet = k.iznos * r / (1 - Math.pow(1 + r, -k.rokOtplate))
    let ostatak = k.iznos
    let kamata = 0
    const startMonth = (year - 1) * 12 + 1
    const endMonth = year * 12
    for (let m = 1; m <= (k.gracePeriod || 0) + k.rokOtplate && m <= endMonth; m++) {
      const mk = ostatak * r
      if (m >= startMonth) kamata += mk
      if (m > (k.gracePeriod || 0)) {
        const otplata = Math.min(annuitet - mk, ostatak)
        ostatak = Math.max(0, ostatak - otplata)
      }
    }
    return kamata
  }

  const kamataG1 = calcKamataYear(1)
  const kamataG2 = calcKamataYear(2)
  const kamataG3 = calcKamataYear(3)

  const ebitG1 = brutoG1 - ostalTrG1 - amort - plateG1 - marketingG1
  const ebitG2 = brutoG2 - ostalTrG2 - amort - plateG2 - marketingG2
  const ebitG3 = brutoG3 - ostalTrG3 - amort - plateG3 - marketingG3

  const ebtG1 = ebitG1 - kamataG1
  const ebtG2 = ebitG2 - kamataG2
  const ebtG3 = ebitG3 - kamataG3

  const porezG1 = Math.max(0, ebtG1 * 0.10)
  const porezG2 = Math.max(0, ebtG2 * 0.10)
  const porezG3 = Math.max(0, ebtG3 * 0.10)

  const netoProfitG1 = ebtG1 - porezG1
  const netoProfitG2 = ebtG2 - porezG2
  const netoProfitG3 = ebtG3 - porezG3

  const marzaG1 = prihodG1 > 0 ? (netoProfitG1 / prihodG1 * 100) : 0
  const marzaG2 = prihodG2 > 0 ? (netoProfitG2 / prihodG2 * 100) : 0
  const marzaG3 = prihodG3 > 0 ? (netoProfitG3 / prihodG3 * 100) : 0

  const ukupnoTrG1 = trMatG1 + ostalTrG1 + amort + plateG1 + marketingG1 + kamataG1
  const ukupnoTrG2 = trMatG2 + ostalTrG2 + amort + plateG2 + marketingG2 + kamataG2
  const ukupnoTrG3 = trMatG3 + ostalTrG3 + amort + plateG3 + marketingG3 + kamataG3

  // Total ulaganja
  const totalStalna = Object.keys(amortRates).reduce((s, cat) => {
    const items = stalnaData?.[cat] || []
    return s + items.reduce((ss: number, i: any) => ss + i.kolicina * i.vrijednost, 0)
  }, 0)
  const totalUlaganja = totalStalna + (stalnaData?.osnivacka || 0) + (stalnaData?.obrtna || 0)

  // Break-even
  const fixedCosts = plateG1 + amort + ostalTrG1 + marketingG1 + kamataG1
  const variableCostRate = prihodG1 > 0 ? trMatG1 / prihodG1 : 0
  const cmRate = 1 - variableCostRate
  const breakEvenKM = cmRate > 0 ? fixedCosts / cmRate : 0
  const safetyMargin = prihodG1 > 0 ? ((prihodG1 - breakEvenKM) / prihodG1 * 100) : 0

  // Cash flow yearly summary
  let kreditOstatak = k.iznos || 0
  const kreditR = k.iznos && k.kamatnaStopa && k.rokOtplate ? (k.kamatnaStopa / 100 / 12) : 0
  const annuitet = kreditR > 0 && k.rokOtplate ? k.iznos * kreditR / (1 - Math.pow(1 + kreditR, -k.rokOtplate)) : 0

  const cfYears = [1, 2, 3].map(yr => {
    const gf = yr === 1 ? 1 : yr === 2 ? g2 : g3
    const primici = prihodG1 * gf
    let kamata = 0, otplata = 0
    for (let m = (yr - 1) * 12 + 1; m <= yr * 12; m++) {
      if (m <= (k.gracePeriod || 0) + (k.rokOtplate || 0)) {
        const mk = kreditOstatak * kreditR
        kamata += mk
        if (m > (k.gracePeriod || 0)) {
          const op = Math.min(annuitet - mk, kreditOstatak)
          otplata += op
          kreditOstatak = Math.max(0, kreditOstatak - op)
        }
      }
    }
    const investicija = yr === 1 ? totalUlaganja : 0
    const izdaci = (trMatG1 + ostalTrG1 + plateG1 + marketingG1) * gf + amort + kamata + otplata + investicija
    return { primici, izdaci, neto: primici - izdaci }
  })

  // Porter rows
  const porterRows = [
    ['Rivalitet medu konkurentima', porter?.rivalry?.[0] || '—', porter?.rivalry?.[1] || ''],
    ['Prijetnja novih ucesnika', porter?.newEntrants?.[0] || '—', porter?.newEntrants?.[1] || ''],
    ['Prijetnja supstituta', porter?.substitutes?.[0] || '—', porter?.substitutes?.[1] || ''],
    ['Pregovaracka moc kupaca', porter?.buyers?.[0] || '—', porter?.buyers?.[1] || ''],
    ['Pregovaracka moc dobavljaca', porter?.suppliers?.[0] || '—', porter?.suppliers?.[1] || ''],
  ]

  const html = `<!DOCTYPE html>
<html lang="bs">
<head>
<meta charset="UTF-8">
<title>Biznis Plan — ${cover?.name || 'BOOST Balkans'}</title>
<style>
  @page { margin: 20mm 18mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; color: #1a2740; font-size: 11pt; line-height: 1.6; }

  .cover { page-break-after: always; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 60px 40px; background: #1a2740; color: white; }
  .cover-logo { font-size: 12pt; font-weight: bold; color: rgba(255,255,255,0.6); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 40px; }
  .cover-badge { background: #C9A227; color: #1a2740; font-size: 10pt; font-weight: bold; padding: 6px 20px; border-radius: 20px; display: inline-block; margin-bottom: 32px; letter-spacing: 0.08em; }
  .cover h1 { font-size: 28pt; font-weight: bold; color: white; margin-bottom: 8px; line-height: 1.2; }
  .cover h2 { font-size: 14pt; color: rgba(255,255,255,0.7); font-weight: normal; margin-bottom: 48px; }
  .cover-table { width: 100%; max-width: 500px; border-collapse: collapse; text-align: left; }
  .cover-table td { padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.15); font-size: 10pt; }
  .cover-table td:first-child { color: rgba(255,255,255,0.6); width: 45%; }
  .cover-table td:last-child { color: white; font-weight: 600; }

  .toc { page-break-after: always; padding: 20px 0; }
  .toc h2 { font-size: 16pt; font-weight: bold; color: #1a2740; border-bottom: 3px solid #C9A227; padding-bottom: 8px; margin-bottom: 20px; }
  .toc-item { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dotted #e2e8f0; font-size: 10pt; }
  .toc-item.toc-section { font-weight: bold; color: #1F4E79; margin-top: 8px; }

  .chapter { page-break-before: always; }
  .chapter-header { background: #1a2740; color: white; padding: 14px 20px; margin-bottom: 20px; border-radius: 4px; }
  .chapter-header .chapter-tag { font-size: 9pt; font-weight: bold; color: #C9A227; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
  .chapter-header h2 { font-size: 16pt; font-weight: bold; color: white; margin: 0; }

  .section-title { font-size: 12pt; font-weight: bold; color: #1F4E79; border-left: 4px solid #C9A227; padding-left: 10px; margin: 20px 0 10px; }

  .field { margin-bottom: 14px; }
  .field-label { font-size: 9pt; font-weight: bold; color: #6b7a99; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
  .field-value { font-size: 10.5pt; color: #1a2740; line-height: 1.6; background: #f5f7fb; padding: 8px 12px; border-radius: 4px; border-left: 3px solid #e2e8f0; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px; }

  table { width: 100%; border-collapse: collapse; font-size: 10pt; margin-bottom: 16px; }
  th { background: #1a2740; color: white; padding: 8px 10px; text-align: left; font-size: 9pt; font-weight: bold; }
  td { padding: 7px 10px; border: 1px solid #e2e8f0; vertical-align: top; }
  tr:nth-child(even) td { background: #f9fafb; }
  .highlight-row td { background: #EBF4FB; font-weight: bold; color: #1a2740; }
  .total-row td { background: #1a2740; color: white; font-weight: bold; }
  .positive td { color: #2d7a4f; }
  .negative td { color: #c0392b; }

  .canvas-grid { display: grid; grid-template-columns: 1fr 1fr 1.4fr 1fr 1fr; border: 2px solid #1a2740; margin-bottom: 16px; }
  .canvas-cell { border: 1px solid #cbd5e0; padding: 10px; min-height: 80px; }
  .canvas-cell.tall { grid-row: span 2; }
  .canvas-cell.wide { grid-column: span 2; }
  .canvas-cell.bottom { grid-column: span 2; }
  .canvas-label { font-size: 8pt; font-weight: bold; color: #1F4E79; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; }
  .canvas-value { font-size: 9.5pt; color: #1a2740; line-height: 1.5; }

  .swot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 2px solid #1a2740; margin-bottom: 16px; }
  .swot-cell { padding: 14px; min-height: 120px; }
  .swot-cell.s { background: #f0faf4; border-right: 1px solid #1a2740; border-bottom: 1px solid #1a2740; }
  .swot-cell.w { background: #fef5f5; border-bottom: 1px solid #1a2740; }
  .swot-cell.o { background: #f0f7ff; border-right: 1px solid #1a2740; }
  .swot-cell.t { background: #fffbf0; }
  .swot-label { font-size: 10pt; font-weight: bold; margin-bottom: 8px; }
  .swot-cell.s .swot-label { color: #2d7a4f; }
  .swot-cell.w .swot-label { color: #c0392b; }
  .swot-cell.o .swot-label { color: #2E75B6; }
  .swot-cell.t .swot-label { color: #C9A227; }
  .swot-value { font-size: 10pt; color: #1a2740; line-height: 1.6; white-space: pre-wrap; }

  .pest-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
  .pest-cell { padding: 14px; border-radius: 6px; min-height: 100px; }
  .pest-cell.p { background: #f0f7ff; border: 2px solid #2E75B6; }
  .pest-cell.e { background: #fffbf0; border: 2px solid #C9A227; }
  .pest-cell.s { background: #f0faf4; border: 2px solid #2d7a4f; }
  .pest-cell.t { background: #faf0ff; border: 2px solid #7B2D8B; }
  .pest-label { font-size: 10pt; font-weight: bold; margin-bottom: 8px; }
  .pest-cell.p .pest-label { color: #2E75B6; }
  .pest-cell.e .pest-label { color: #C9A227; }
  .pest-cell.s .pest-label { color: #2d7a4f; }
  .pest-cell.t .pest-label { color: #7B2D8B; }
  .pest-value { font-size: 10pt; color: #1a2740; line-height: 1.6; white-space: pre-wrap; }

  .kpi-box { background: #EBF4FB; border-radius: 6px; padding: 14px; text-align: center; border: 1px solid #2E75B640; }
  .kpi-label { font-size: 9pt; color: #6b7a99; margin-bottom: 4px; }
  .kpi-value { font-size: 14pt; font-weight: bold; color: #1a2740; }

  .scenario-table th.pessimistic { background: #c0392b; }
  .scenario-table th.base { background: #2d7a4f; }
  .scenario-table th.optimistic { background: #2E75B6; }

  .conclusion-box { border: 2px solid #1a2740; border-radius: 8px; padding: 24px; margin-top: 20px; }
  .conclusion-text { font-size: 10.5pt; color: #1a2740; line-height: 1.7; margin-bottom: 32px; font-style: italic; }
  .signature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 20px; }
  .signature-line { border-top: 1px solid #1a2740; padding-top: 6px; font-size: 9pt; color: #6b7a99; margin-top: 40px; }

  .footer { position: fixed; bottom: 10mm; left: 18mm; right: 18mm; text-align: center; font-size: 8pt; color: #9fa6b4; border-top: 1px solid #e2e8f0; padding-top: 6px; }
</style>
</head>
<body>

<div class="footer">BOOST Balkans | EU ALDA Initiative — Biznis Plan: ${cover?.name || ''} | Datum: ${cover?.date || ''}</div>

<!-- COVER -->
<div class="cover">
  <div class="cover-logo">BOOST BALKANS | EU ALDA Initiative</div>
  <div class="cover-badge">BIZNIS PLAN</div>
  <h1>${cover?.name || 'Naziv biznisa'}</h1>
  <h2>Okvir za izradu biznis plana</h2>
  <table class="cover-table">
    <tr><td>Ime preduzetnika / tima</td><td>${cover?.entrepreneur || '—'}</td></tr>
    <tr><td>Datum izrade</td><td>${cover?.date || '—'}</td></tr>
    <tr><td>Verzija dokumenta</td><td>${cover?.version || '—'}</td></tr>
    <tr><td>E-mail / Telefon</td><td>${cover?.email || '—'}</td></tr>
  </table>
</div>

<!-- TOC -->
<div class="toc">
  <h2>Sadrzaj</h2>
  ${[
    { tag: 'SAZETAK', label: 'Sazetak biznis plana', section: true },
    { tag: 'DIO I', label: 'Opis biznis ideje i preduzetnik', section: true },
    { tag: 'DIO II', label: 'Analiza poslovnog modela', section: true },
    { tag: 'DIO III', label: 'Strateska analiza', section: true },
    { tag: 'DIO IV', label: 'Analiza trzista', section: true },
    { tag: 'DIO V', label: 'Marketinski plan', section: true },
    { tag: 'DIO VI', label: 'Poslovni procesi i organizacija', section: true },
    { tag: 'DIO VII', label: 'Analiza rizika', section: true },
    { tag: 'DIO VIII.1', label: 'Prodajni asortiman i prihodi' },
    { tag: 'DIO VIII.2', label: 'Normativ materijalnih troskova' },
    { tag: 'DIO VIII.3', label: 'Stalna sredstva i ulaganja' },
    { tag: 'DIO VIII.4', label: 'Finansiranje i kreditni plan' },
    { tag: 'DIO VIII.5', label: 'Troskovi promocije i marketinga' },
    { tag: 'DIO VIII.6', label: 'Ostali troskovi i plate' },
    { tag: 'DIO VIII.7', label: 'Racun dobiti i gubitka (P&L)' },
    { tag: 'DIO VIII.8', label: 'Break-even analiza' },
    { tag: 'DIO VIII.9', label: 'Cash Flow — 3 godine' },
    { tag: 'ZAKLJUCAK', label: 'Zakljucak i izjava preduzetnika', section: true },
  ].map(item => `<div class="toc-item ${item.section ? 'toc-section' : ''}"><span>${item.tag} — ${item.label}</span></div>`).join('')}
</div>

<!-- SUMMARY -->
<div class="chapter">
  <div class="chapter-header"><div class="chapter-tag">SAZETAK</div><h2>Sazetak biznis plana</h2></div>
  ${field('Poslovna ideja', summary?.idea)}
  ${field('Potrebna ulaganja', summary?.investment)}
  ${field('Ocekivani efekti i koristi', summary?.effects)}
  ${field('Konkurentske prednosti (USP)', summary?.usp)}
</div>

<!-- DIO I -->
<div class="chapter">
  <div class="chapter-header"><div class="chapter-tag">DIO I</div><h2>Opis biznis ideje i preduzetnik</h2></div>
  ${section('1.1 Opis biznis ideje')}
  ${field('Proizvodi / Usluge', idea?.products)}
  ${field('Specificni atributi koji diferenciraju od konkurencije', idea?.specific)}
  ${field('Ko su kljucni kupci?', idea?.customers)}
  ${field('Velicina ciljnog trzista', idea?.marketSize)}
  ${field('Trzisna potreba / Problem koji rjesavate', idea?.painPoint)}
  ${field('Poslovni model', idea?.businessModel)}
  ${field('Razvojni plan — milestones', idea?.milestones)}

  ${section('1.2 Biografija preduzetnika')}
  <table>
    <tr><td style="width:35%;font-weight:bold">Ime i prezime</td><td>${bio?.name || '—'}</td></tr>
    <tr><td style="font-weight:bold">Datum i mjesto rodjenja</td><td>${bio?.dob || '—'}</td></tr>
    <tr><td style="font-weight:bold">Obrazovanje</td><td>${bio?.education || '—'}</td></tr>
    <tr><td style="font-weight:bold">Radno iskustvo</td><td>${bio?.experience || '—'}</td></tr>
    <tr><td style="font-weight:bold">Posebna postignuca / certifikati</td><td>${bio?.achievements || '—'}</td></tr>
    <tr><td style="font-weight:bold">LinkedIn / Web profil</td><td>${bio?.linkedin || '—'}</td></tr>
  </table>

  ${section('1.3 Motivi za pokretanje biznisa')}
  ${field('Identifikacija trzisne potrebe / prilike', motivation?.market)}
  ${field('Licna strast i interesovanje', motivation?.passion)}
  ${field('Profesionalna autonomija / kreativnost', motivation?.autonomy)}
  ${field('Ekonomska / finansijska motivacija', motivation?.financial)}
  ${field('Drustvena misija / impact', motivation?.social)}

  ${section('1.4 Kvalifikacije i preporuke')}
  <div class="grid-2">
    ${field('Obrazovne kvalifikacije', motivation?.eduQual)}
    ${field('Strucne vjestine', motivation?.profSkills)}
  </div>
  <div class="grid-2">
    ${field('Preporucitelj 1', motivation?.ref1)}
    ${field('Preporucitelj 2', motivation?.ref2)}
  </div>
</div>

<!-- DIO II -->
<div class="chapter">
  <div class="chapter-header"><div class="chapter-tag">DIO II</div><h2>Analiza poslovnog modela</h2></div>
  ${section('2.1 Canvas Model poslovnog platna')}
  <div class="canvas-grid">
    <div class="canvas-cell tall"><div class="canvas-label">1. Kljucna partnerstva</div><div class="canvas-value">${canvas?.partners || '—'}</div></div>
    <div class="canvas-cell"><div class="canvas-label">2. Kljucne aktivnosti</div><div class="canvas-value">${canvas?.activities || '—'}</div></div>
    <div class="canvas-cell tall"><div class="canvas-label">3. Vrijednosna ponuda</div><div class="canvas-value">${canvas?.value || '—'}</div></div>
    <div class="canvas-cell"><div class="canvas-label">4. Odnosi sa kupcima</div><div class="canvas-value">${canvas?.relationships || '—'}</div></div>
    <div class="canvas-cell tall"><div class="canvas-label">5. Korisnicki segmenti</div><div class="canvas-value">${canvas?.segments || '—'}</div></div>
    <div class="canvas-cell"><div class="canvas-label">6. Kljucni resursi</div><div class="canvas-value">${canvas?.resources || '—'}</div></div>
    <div class="canvas-cell"><div class="canvas-label">7. Kanali</div><div class="canvas-value">${canvas?.channels || '—'}</div></div>
    <div class="canvas-cell bottom" style="grid-column:span 2;border-top:1px solid #cbd5e0"><div class="canvas-label">8. Struktura troskova</div><div class="canvas-value">${canvas?.costs || '—'}</div></div>
    <div class="canvas-cell bottom" style="grid-column:span 3;border-top:1px solid #cbd5e0"><div class="canvas-label">9. Tokovi prihoda</div><div class="canvas-value">${canvas?.revenue || '—'}</div></div>
  </div>

  ${section('2.2 Vizija i SMART Ciljevi')}
  ${field('Vizija poslovanja', vision)}
  ${table(['Cilj', 'Specificnost', 'Mjerljivost', 'Dostiznost', 'Relevantnost', 'Rok'], smartGoals || [])}

  ${section('2.3 Misija i Abellov okvir')}
  ${field('Izjava o misiji', mission?.statement)}
  <div class="grid-3">
    ${field('Ko (Ciljni kupci)', mission?.who)}
    ${field('Sto (Potrebe kupaca)', mission?.what)}
    ${field('Kako (Tehnologije / Metode)', mission?.how)}
  </div>
</div>

<!-- DIO III -->
<div class="chapter">
  <div class="chapter-header"><div class="chapter-tag">DIO III</div><h2>Strateska analiza</h2></div>
  ${section('3.1 PEST Analiza')}
  <div class="pest-grid">
    <div class="pest-cell p"><div class="pest-label">P — POLITICKI FAKTORI</div><div class="pest-value">${pest?.p || '—'}</div></div>
    <div class="pest-cell e"><div class="pest-label">E — EKONOMSKI FAKTORI</div><div class="pest-value">${pest?.e || '—'}</div></div>
    <div class="pest-cell s"><div class="pest-label">S — SOCIJALNI FAKTORI</div><div class="pest-value">${pest?.s || '—'}</div></div>
    <div class="pest-cell t"><div class="pest-label">T — TEHNOLOSKI FAKTORI</div><div class="pest-value">${pest?.t || '—'}</div></div>
  </div>

  ${section('3.2 Porterovih 5 sila')}
  ${table(['SILA', 'OCJENA', 'OBRAZLOZENJE'], porterRows)}

  ${section('3.3 SWOT Analiza')}
  <div class="swot-grid">
    <div class="swot-cell s"><div class="swot-label">SNAGE (Strengths)</div><div class="swot-value">${swot?.s || '—'}</div></div>
    <div class="swot-cell w"><div class="swot-label">SLABOSTI (Weaknesses)</div><div class="swot-value">${swot?.w || '—'}</div></div>
    <div class="swot-cell o"><div class="swot-label">PRILIKE (Opportunities)</div><div class="swot-value">${swot?.o || '—'}</div></div>
    <div class="swot-cell t"><div class="swot-label">PRIJETNJE (Threats)</div><div class="swot-value">${swot?.t || '—'}</div></div>
  </div>
</div>

<!-- DIO IV -->
<div class="chapter">
  <div class="chapter-header"><div class="chapter-tag">DIO IV</div><h2>Analiza trzista</h2></div>
  ${field('Velicina trzista i trzisni potencijal', market?.size)}
  ${field('Ciljni segment i pozicioniranje', market?.segment)}
  ${field('Profil idealnog kupca (persona)', market?.profile)}
  ${field('Analiza konkurencije', market?.competition)}
  ${field('Trzisna praznina (Gap analiza)', market?.gap)}
</div>

<!-- DIO V -->
<div class="chapter">
  <div class="chapter-header"><div class="chapter-tag">DIO V</div><h2>Marketinski plan</h2></div>
  ${field('Marketinski ciljevi', marketing?.goals)}
  ${field('Marketinski kanali i taktike', marketing?.channels)}
  ${field('Marketinski budzet (godisnji, KM)', marketing?.budget)}
  ${field('Kljucne marketinske poruke', marketing?.messages)}
  ${field('Kljucni marketinski KPIs', marketing?.kpis)}
</div>

<!-- DIO VI -->
<div class="chapter">
  <div class="chapter-header"><div class="chapter-tag">DIO VI</div><h2>Poslovni procesi i organizacija</h2></div>
  ${field('Kljucni poslovni procesi', operations?.processes)}
  ${field('Organizacijska struktura i tim', operations?.structure)}
  ${field('Oprema i tehnologija', operations?.equipment)}
  ${field('Lokacija i poslovni prostor', operations?.location)}
  ${section('6.5 Pravna forma registracije')}
  <div class="grid-2">
    ${field('Odabrana pravna forma', legal?.form)}
    ${field('Sifra djelatnosti', legal?.code)}
    ${field('Datum planirane registracije', legal?.date)}
    ${field('Sjediste / adresa', legal?.address)}
  </div>
</div>

<!-- DIO VII -->
<div class="chapter">
  <div class="chapter-header"><div class="chapter-tag">DIO VII</div><h2>Analiza rizika</h2></div>
  ${table(['Rizik / Prijetnja', 'Vjerovatnoca', 'Utjecaj', 'Mjere ublazavanja'], risks || [])}
</div>

<!-- DIO VIII -->
<div class="chapter">
  <div class="chapter-header"><div class="chapter-tag">DIO VIII</div><h2>Ekonomsko-finansijske projekcije</h2></div>

  ${section('8.1 Prodajni asortiman i prihodi')}
  ${table(
    ['Proizvod / Usluga', 'JM', 'Kol./god.', 'Prod. cijena', 'Tr. mat./jed.', 'Prihod G1', 'Prihod G2', 'Prihod G3'],
    products.map((p: any) => [
      p.naziv || '—', p.jm, p.obim, fmt(p.cijena), fmt(p.trMat),
      fmt(p.obim * p.cijena), fmt(p.obim * p.cijena * g2), fmt(p.obim * p.cijena * g3)
    ])
  )}
  <table><tbody>
    <tr class="highlight-row"><td style="font-weight:bold">UKUPAN PRIHOD G1</td><td>${fmt(prihodG1)}</td><td style="font-weight:bold">UKUPAN PRIHOD G2</td><td>${fmt(prihodG2)}</td><td style="font-weight:bold">UKUPAN PRIHOD G3</td><td>${fmt(prihodG3)}</td></tr>
  </tbody></table>

  ${section('8.2 Normativ materijalnih troskova')}
  ${(normativData?.items || []).map((pn: any) => {
    const prod = products.find((p: any) => p.id === pn.productId)
    if (!prod || !pn.materials?.length) return ''
    const total = pn.materials.reduce((s: number, m: any) => s + (pn.mode === 'M3' ? m.cijena : m.normativ * m.cijena), 0)
    return `<p style="font-weight:bold;margin:8px 0 4px;font-size:10pt">${prod.naziv || '—'} — ${pn.mode}</p>
    ${table(['Materijal', 'JM', 'Normativ', 'Cijena/JM', 'Trosak/jed.'],
      pn.materials.map((m: any) => [m.naziv, m.jm, pn.mode === 'M3' ? '1' : m.normativ, fmt(m.cijena), fmt(pn.mode === 'M3' ? m.cijena : m.normativ * m.cijena)])
    )}
    <p style="font-size:10pt;font-weight:bold;color:#2d7a4f;margin-bottom:12px">Ukupan trosak materijala / jed.: ${fmt(total)}</p>`
  }).join('')}

  ${section('8.3 Stalna sredstva i ukupna ulaganja')}
  ${['infrastruktura', 'zemljiste', 'oprema', 'vozila'].map(cat => {
    const items = stalnaData?.[cat] || []
    if (!items.length) return ''
    const catTotal = items.reduce((s: number, i: any) => s + i.kolicina * i.vrijednost, 0)
    return `<p style="font-weight:bold;font-size:10pt;margin:8px 0 4px;color:#1F4E79">${cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
    ${table(['Naziv', 'JM', 'Kolicina', 'Vr. / jed.', 'Ukupno'],
      items.map((i: any) => [i.naziv, i.jm, i.kolicina, fmt(i.vrijednost), fmt(i.kolicina * i.vrijednost)])
    )}`
  }).join('')}
  <table><tbody>
    <tr class="highlight-row"><td style="font-weight:bold">Osnivacka ulaganja</td><td>${fmt(stalnaData?.osnivacka || 0)}</td><td style="font-weight:bold">Obrtna sredstva</td><td>${fmt(stalnaData?.obrtna || 0)}</td><td style="font-weight:bold">UKUPNA ULAGANJA</td><td>${fmt(totalUlaganja)}</td></tr>
  </tbody></table>

  ${section('8.4 Finansiranje i kreditni plan')}
  ${table(
    ['Izvor finansiranja', 'Iznos (KM)', 'Udio (%)'],
    [
      ...(finansiranjeData?.sources || []).map((s: any) => [s.naziv, fmt(s.iznos), (finansiranjeData.sources.reduce((t: number, x: any) => t + x.iznos, 0) > 0 ? (s.iznos / finansiranjeData.sources.reduce((t: number, x: any) => t + x.iznos, 0) * 100).toFixed(1) + '%' : '0%')]),
    ]
  )}
  ${k.iznos > 0 ? `<p style="font-weight:bold;font-size:10pt;margin:12px 0 4px">Kreditni plan</p>
  <table><tbody>
    <tr><td>Iznos kredita</td><td>${fmt(k.iznos)}</td><td>Kamatna stopa</td><td>${k.kamatnaStopa}% god.</td></tr>
    <tr><td>Grace period</td><td>${k.gracePeriod} mjes.</td><td>Rok otplate</td><td>${k.rokOtplate} mjes.</td></tr>
  </tbody></table>` : ''}

  ${section('8.5 Troskovi promocije i marketinga')}
  ${table(
    ['Kategorija', 'Mjes. iznos', 'Godina 1', 'Godina 2', 'Godina 3'],
    [
      ...(promocijaData?.items || []).map((i: any) => [i.naziv, fmt(i.mjesecniIznos), fmt(i.mjesecniIznos * 12), fmt(i.mjesecniIznos * 12 * g2), fmt(i.mjesecniIznos * 12 * g3)]),
      ['UKUPNO MARKETING', '', fmt(marketingG1), fmt(marketingG2), fmt(marketingG3)]
    ],
    [(promocijaData?.items || []).length]
  )}

  ${section('8.6 Ostali troskovi i plate')}
  ${table(
    ['Trosak', 'Mjes. iznos', 'Godina 1', 'Godina 2', 'Godina 3'],
    [
      ...(troskoviData?.ostaliTroskovi || []).map((t: any) => [t.naziv, fmt(t.mjesecniIznos), fmt(t.mjesecniIznos * 12), fmt(t.mjesecniIznos * 12 * g2), fmt(t.mjesecniIznos * 12 * g3)]),
      ['Amortizacija (auto)', '—', fmt(amort), fmt(amort), fmt(amort)],
      ['UKUPNO OSTALI TR.', '', fmt(ostalTrG1 + amort), fmt(ostalTrG2 + amort), fmt(ostalTrG3 + amort)]
    ],
    [(troskoviData?.ostaliTroskovi || []).length + 1]
  )}
  ${(troskoviData?.zaposleni || []).length > 0 ? table(
    ['Zaposleni', 'Pozicija', 'Bruto plata/mjes.', 'Godisnja bruto'],
    [
      ...(troskoviData?.zaposleni || []).map((z: any) => [z.ime, z.pozicija, fmt(z.brutoPlataMjes), fmt(z.brutoPlataMjes * 12)]),
      ['UKUPNE PLATE', '', '', fmt(plateG1)]
    ],
    [(troskoviData?.zaposleni || []).length]
  ) : ''}

  ${section('8.7 Racun dobiti i gubitka (P&L) — 3 finansijske godine')}
  ${table(
    ['STAVKA', 'Godina 1', 'Godina 2', 'Godina 3'],
    [
      ['A. UKUPAN PRIHOD OD PRODAJE', fmt(prihodG1), fmt(prihodG2), fmt(prihodG3)],
      ['1. Troskovi materijala / robe', fmt(trMatG1), fmt(trMatG2), fmt(trMatG3)],
      ['2. Ostali troskovi poslovanja', fmt(ostalTrG1), fmt(ostalTrG2), fmt(ostalTrG3)],
      ['3. Amortizacija', fmt(amort), fmt(amort), fmt(amort)],
      ['4. Troskovi plata i beneficija', fmt(plateG1), fmt(plateG2), fmt(plateG3)],
      ['5. Troskovi marketinga i promocije', fmt(marketingG1), fmt(marketingG2), fmt(marketingG3)],
      ['6. Kamate na kredite', fmt(kamataG1), fmt(kamataG2), fmt(kamataG3)],
      ['B. UKUPNI TROSKOVI', fmt(ukupnoTrG1), fmt(ukupnoTrG2), fmt(ukupnoTrG3)],
      ['C. BRUTO DOBIT', fmt(brutoG1), fmt(brutoG2), fmt(brutoG3)],
      ['D. EBIT (Poslovni rezultat)', fmt(ebitG1), fmt(ebitG2), fmt(ebitG3)],
      ['   Rezultat prije poreza (EBT)', fmt(ebtG1), fmt(ebtG2), fmt(ebtG3)],
      ['   Porez na dobit (10%)', fmt(porezG1), fmt(porezG2), fmt(porezG3)],
      ['E. NETO PROFIT / (GUBITAK)', fmt(netoProfitG1), fmt(netoProfitG2), fmt(netoProfitG3)],
      ['   Neto marza (%)', marzaG1.toFixed(1) + '%', marzaG2.toFixed(1) + '%', marzaG3.toFixed(1) + '%'],
    ],
    [0, 7, 8, 9, 12]
  )}

  ${section('8.8 Break-even analiza')}
  <div class="grid-3" style="margin-bottom:16px">
    <div class="kpi-box"><div class="kpi-label">Break-even prihod</div><div class="kpi-value">${fmt(breakEvenKM)} KM</div></div>
    <div class="kpi-box"><div class="kpi-label">Margina sigurnosti</div><div class="kpi-value">${safetyMargin.toFixed(1)}%</div></div>
    <div class="kpi-box"><div class="kpi-label">Stopa doprinosa pokrica</div><div class="kpi-value">${(cmRate * 100).toFixed(1)}%</div></div>
  </div>
  ${table(
    ['Kategorija', 'Iznos G1'],
    [
      ['Fiksni troskovi ukupno', fmt(fixedCosts)],
      ['Varijabilni troskovi (tr. materijala)', fmt(trMatG1)],
      ['Ukupan prihod', fmt(prihodG1)],
      ['Break-even prihod', fmt(breakEvenKM)],
      ['Razlika (rezerva iznad break-evena)', fmt(prihodG1 - breakEvenKM)],
    ],
    [4]
  )}

  ${section('8.9 Cash Flow — 3 finansijske godine')}
  ${table(
    ['CASH FLOW', 'Godina 1', 'Godina 2', 'Godina 3'],
    [
      ['Ukupni primici (prihodi)', fmt(cfYears[0].primici), fmt(cfYears[1].primici), fmt(cfYears[2].primici)],
      ['Ukupni izdaci', fmt(cfYears[0].izdaci), fmt(cfYears[1].izdaci), fmt(cfYears[2].izdaci)],
      ['NETO NOVCANI TOK', fmt(cfYears[0].neto), fmt(cfYears[1].neto), fmt(cfYears[2].neto)],
      ['Kumulativni novcani tok', fmt(cfYears[0].neto), fmt(cfYears[0].neto + cfYears[1].neto), fmt(cfYears[0].neto + cfYears[1].neto + cfYears[2].neto)],
    ],
    [2, 3]
  )}
</div>

<!-- ZAKLJUCAK -->
<div class="chapter">
  <div class="chapter-header"><div class="chapter-tag">ZAKLJUCAK</div><h2>Zakljucak i izjava preduzetnika</h2></div>
  <div class="conclusion-box">
    <div class="conclusion-text">${conclusion?.text || 'Ja, dolje potpisani/a, izjavljujem da su svi podaci u ovom biznis planu istiniti, provjereni i realisticni, te da sam ih izradio/la u dobroj vjeri i na osnovu realnih trzisnih istrazivanja.'}</div>
    <div class="signature-grid">
      <div>
        <div style="font-size:10pt;color:#6b7a99;margin-bottom:4px">Ime i prezime:</div>
        <div style="font-size:11pt;font-weight:bold;color:#1a2740;margin-bottom:16px">${conclusion?.name || ''}</div>
        <div class="signature-line">Potpis</div>
      </div>
      <div>
        <div style="font-size:10pt;color:#6b7a99;margin-bottom:4px">Datum:</div>
        <div style="font-size:11pt;font-weight:bold;color:#1a2740;margin-bottom:4px">${conclusion?.date || ''}</div>
        <div style="font-size:10pt;color:#6b7a99;margin-bottom:4px">Mjesto:</div>
        <div style="font-size:11pt;font-weight:bold;color:#1a2740">${conclusion?.place || ''}</div>
      </div>
    </div>
  </div>
</div>

</body>
</html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  })
}
