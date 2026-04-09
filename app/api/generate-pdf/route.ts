import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const d = await req.json()
  const { cover, summary, idea, bio, motivation, canvas, vision, smartGoals, mission, pest, porter, swot, market, marketing, operations, legal, risks, sales, investment, pl, cashflow, kpi, scenarios, conclusion } = d

  function section(title: string) {
    return `<div class="section-title">${title}</div>`
  }

  function field(label: string, value: string) {
    if (!value || !value.trim()) return ''
    return `<div class="field"><div class="field-label">${label}</div><div class="field-value">${value.replace(/\n/g, '<br>')}</div></div>`
  }

  function table(headers: string[], rows: string[][], highlight?: number[]) {
    const heads = headers.map(h => `<th>${h}</th>`).join('')
    const body = rows.map((row, ri) => {
      const isHighlight = highlight && highlight.includes(ri)
      return `<tr class="${isHighlight ? 'highlight-row' : ''}">${row.map(c => `<td>${c || '—'}</td>`).join('')}</tr>`
    }).join('')
    return `<table><thead><tr>${heads}</tr></thead><tbody>${body}</tbody></table>`
  }

  const plRowLabels = ['UKUPAN PRIHOD OD PRODAJE', 'Troskovi materijala / robe', 'BRUTO DOBIT', 'Troskovi plata (bruto)', 'Amortizacija', 'Troskovi zakupa prostora', 'Troskovi marketinga', 'Ostali operativni troskovi', 'POSLOVNI REZULTAT (EBIT)', 'Kamate na kredite', 'REZULTAT PRIJE POREZA', 'NETO PROFIT / (GUBITAK)']
  const boldPL = [0, 2, 8, 10, 11]

  const cfRowLabels = ['Operativni novcani tok', 'Investicioni novcani tok (ulaganja)', 'Finansijski novcani tok', 'NETO NOVCANI TOK', 'Kumulativni novcani tok']
  const boldCF = [3, 4]

  const kpiRowLabels = ['Ukupan prihod (KM)', 'Neto profit (KM)', 'Neto marza (%)', 'Povrat na investiciju — ROI (%)', 'Break-even tacka (kom / KM)', 'Period povrata investicije (god.)']
  const boldKPI = [3, 5]

  const scenRowLabels = ['Prihod', 'Neto profit', 'Neto marza (%)', 'Ocjena odrzivosti']

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

<!-- COVER PAGE -->
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

<!-- TABLE OF CONTENTS -->
<div class="toc">
  <h2>Sadrzaj</h2>
  ${[
    { tag: 'SAZETAK', label: 'Sazetak biznis plana', section: true },
    { tag: 'DIO I', label: 'Opis biznis ideje i preduzetnik', section: true },
    { tag: 'DIO I.1', label: 'Opis biznis ideje' },
    { tag: 'DIO I.2', label: 'Biografija preduzetnika' },
    { tag: 'DIO I.3-4', label: 'Motivi i kvalifikacije' },
    { tag: 'DIO II', label: 'Analiza poslovnog modela', section: true },
    { tag: 'DIO II.1', label: 'Business Model Canvas' },
    { tag: 'DIO II.2', label: 'Vizija i SMART Ciljevi' },
    { tag: 'DIO II.3', label: 'Misija i Abellov okvir' },
    { tag: 'DIO III', label: 'Strateska analiza', section: true },
    { tag: 'DIO III.1', label: 'PEST Analiza' },
    { tag: 'DIO III.2', label: 'Porterovih 5 sila' },
    { tag: 'DIO III.3', label: 'SWOT Analiza' },
    { tag: 'DIO IV', label: 'Analiza trzista', section: true },
    { tag: 'DIO V', label: 'Marketinski plan', section: true },
    { tag: 'DIO VI', label: 'Poslovni procesi i organizacija', section: true },
    { tag: 'DIO VII', label: 'Analiza rizika', section: true },
    { tag: 'DIO VIII', label: 'Ekonomsko-finansijske projekcije', section: true },
    { tag: 'ZAKLJUCAK', label: 'Zakljucak i izjava preduzetnika', section: true },
  ].map(item => `<div class="toc-item ${item.section ? 'toc-section' : ''}"><span>${item.tag} — ${item.label}</span></div>`).join('')}
</div>

<!-- SUMMARY -->
<div class="chapter">
  <div class="chapter-header">
    <div class="chapter-tag">SAZETAK</div>
    <h2>Sazetak biznis plana</h2>
  </div>
  ${field('Poslovna ideja', summary?.idea)}
  ${field('Potrebna ulaganja', summary?.investment)}
  ${field('Ocekivani efekti i koristi', summary?.effects)}
  ${field('Konkurentske prednosti (USP)', summary?.usp)}
</div>

<!-- DIO I -->
<div class="chapter">
  <div class="chapter-header">
    <div class="chapter-tag">DIO I</div>
    <h2>Opis biznis ideje i preduzetnik</h2>
  </div>

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
  <div class="chapter-header">
    <div class="chapter-tag">DIO II</div>
    <h2>Analiza poslovnog modela</h2>
  </div>

  ${section('2.1 Canvas Model poslovnog platna')}
  <div class="canvas-grid">
    <div class="canvas-cell tall">
      <div class="canvas-label">1. Kljucna partnerstva</div>
      <div class="canvas-value">${canvas?.partners || '—'}</div>
    </div>
    <div class="canvas-cell">
      <div class="canvas-label">2. Kljucne aktivnosti</div>
      <div class="canvas-value">${canvas?.activities || '—'}</div>
    </div>
    <div class="canvas-cell tall">
      <div class="canvas-label">3. Vrijednosna ponuda</div>
      <div class="canvas-value">${canvas?.value || '—'}</div>
    </div>
    <div class="canvas-cell">
      <div class="canvas-label">4. Odnosi sa kupcima</div>
      <div class="canvas-value">${canvas?.relationships || '—'}</div>
    </div>
    <div class="canvas-cell tall">
      <div class="canvas-label">5. Korisnicki segmenti</div>
      <div class="canvas-value">${canvas?.segments || '—'}</div>
    </div>
    <div class="canvas-cell">
      <div class="canvas-label">6. Kljucni resursi</div>
      <div class="canvas-value">${canvas?.resources || '—'}</div>
    </div>
    <div class="canvas-cell">
      <div class="canvas-label">7. Kanali</div>
      <div class="canvas-value">${canvas?.channels || '—'}</div>
    </div>
    <div class="canvas-cell bottom" style="grid-column: span 2; border-top: 1px solid #cbd5e0;">
      <div class="canvas-label">8. Struktura troskova</div>
      <div class="canvas-value">${canvas?.costs || '—'}</div>
    </div>
    <div class="canvas-cell bottom" style="grid-column: span 3; border-top: 1px solid #cbd5e0;">
      <div class="canvas-label">9. Tokovi prihoda</div>
      <div class="canvas-value">${canvas?.revenue || '—'}</div>
    </div>
  </div>

  ${section('2.2 Vizija i SMART Ciljevi')}
  ${field('Vizija poslovanja', vision)}
  <p style="font-size:10pt;font-weight:bold;color:#1a2740;margin:12px 0 8px">SMART Ciljevi</p>
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
  <div class="chapter-header">
    <div class="chapter-tag">DIO III</div>
    <h2>Strateska analiza</h2>
  </div>

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
  <div class="chapter-header">
    <div class="chapter-tag">DIO IV</div>
    <h2>Analiza trzista</h2>
  </div>
  ${field('Velicina trzista i trzisni potencijal', market?.size)}
  ${field('Ciljni segment i pozicioniranje', market?.segment)}
  ${field('Profil idealnog kupca (persona)', market?.profile)}
  ${field('Analiza konkurencije', market?.competition)}
  ${field('Trzisna praznina (Gap analiza)', market?.gap)}
</div>

<!-- DIO V -->
<div class="chapter">
  <div class="chapter-header">
    <div class="chapter-tag">DIO V</div>
    <h2>Marketinski plan</h2>
  </div>
  ${field('Marketinski ciljevi', marketing?.goals)}
  ${field('Marketinski kanali i taktike', marketing?.channels)}
  ${field('Marketinski budzet (godisnji, KM)', marketing?.budget)}
  ${field('Kljucne marketinske poruke', marketing?.messages)}
  ${field('Kljucni marketinski KPIs', marketing?.kpis)}
</div>

<!-- DIO VI -->
<div class="chapter">
  <div class="chapter-header">
    <div class="chapter-tag">DIO VI</div>
    <h2>Poslovni procesi i organizacija</h2>
  </div>
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
  <div class="chapter-header">
    <div class="chapter-tag">DIO VII</div>
    <h2>Analiza rizika</h2>
  </div>
  ${table(['Rizik / Prijetnja', 'Vjerovatnoca', 'Utjecaj', 'Mjere ublazavanja'], risks || [])}
</div>

<!-- DIO VIII -->
<div class="chapter">
  <div class="chapter-header">
    <div class="chapter-tag">DIO VIII</div>
    <h2>Ekonomsko-finansijske projekcije</h2>
  </div>

  ${section('8.1 Prodajni asortiman i prihodi')}
  ${table(['Proizvod / Usluga', 'Jed. mjere', 'Kol./god.', 'Prod. cijena', 'Tr. materijala', 'Ukupan prihod'], sales || [])}

  ${section('8.2 Inicijalna ulaganja i izvori finansiranja')}
  <div class="grid-2">
    ${field('Ukupna stalna sredstva (KM)', investment?.fixed)}
    ${field('Ukupna obrtna sredstva (KM)', investment?.working)}
  </div>
  ${table(['Izvor finansiranja', 'Iznos (KM)', 'Udio (%)'], [
    ...(investment?.sources || []),
    ['UKUPNO', String((investment?.sources || []).reduce((s: number, r: string[]) => s + (parseFloat(r[1]) || 0), 0).toFixed(2)), '100%']
  ], [investment?.sources?.length || 5])}

  ${section('8.3 Racun dobiti i gubitka — 3 godine')}
  ${table(['RACUN DOBITI I GUBITKA', 'Godina 1', 'Godina 2', 'Godina 3'],
    (pl || []).map((row: string[], i: number) => [plRowLabels[i] || '', ...row]),
    boldPL
  )}

  ${section('8.4 Novcani tok (Cash Flow) — 3 godine')}
  ${table(['CASH FLOW SAZETAK', 'Godina 1', 'Godina 2', 'Godina 3'],
    (cashflow || []).map((row: string[], i: number) => [cfRowLabels[i] || '', ...row]),
    boldCF
  )}

  ${section('8.5 Kljucni finansijski pokazatelji — 3 godine')}
  ${table(['POKAZATELJI USPJEHA', 'Godina 1', 'Godina 2', 'Godina 3'],
    (kpi || []).map((row: string[], i: number) => [kpiRowLabels[i] || '', ...row]),
    boldKPI
  )}

  ${section('8.6 Scenarijska analiza')}
  <table class="scenario-table">
    <thead>
      <tr>
        <th></th>
        <th class="pessimistic">PESIMISTICKI (-30%)</th>
        <th class="base">BAZNI (plan)</th>
        <th class="optimistic">OPTIMISTICKI (+30%)</th>
      </tr>
    </thead>
    <tbody>
      ${(scenarios || []).map((row: string[], i: number) => `<tr><td style="font-weight:bold">${scenRowLabels[i] || ''}</td>${row.map((c: string) => `<td style="text-align:center">${c || '—'}</td>`).join('')}</tr>`).join('')}
    </tbody>
  </table>
</div>

<!-- ZAKLJUCAK -->
<div class="chapter">
  <div class="chapter-header">
    <div class="chapter-tag">ZAKLJUCAK</div>
    <h2>Zakljucak i izjava preduzetnika</h2>
  </div>
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
