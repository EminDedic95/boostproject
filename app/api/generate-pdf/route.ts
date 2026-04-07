import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; color: #1a2740; padding: 40px; }
        h1 { color: #1a2740; font-size: 28px; margin-bottom: 8px; }
        h2 { color: #1F4E79; font-size: 18px; margin-top: 32px; margin-bottom: 12px; border-bottom: 2px solid #C9A227; padding-bottom: 6px; }
        p { color: #444; font-size: 14px; line-height: 1.6; }
        .label { font-weight: bold; color: #1a2740; font-size: 13px; margin-top: 16px; }
        .value { color: #444; font-size: 14px; margin-top: 4px; white-space: pre-wrap; }
        .header { background: #1a2740; color: white; padding: 24px 40px; margin: -40px -40px 32px; }
        .header h1 { color: white; margin: 0; }
        .header p { color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px; }
        .badge { display: inline-block; background: #C9A227; color: #1a2740; font-size: 11px; font-weight: bold; padding: 2px 10px; border-radius: 20px; margin-bottom: 16px; }
        .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #999; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${data.companyName || 'Biznis Plan'}</h1>
        <p>Izrađeno uz BOOST Biznis Plan vodič • ${new Date().toLocaleDateString('bs-BA')}</p>
      </div>

      <h2>DIO I – Biznis ideja</h2>
      ${renderFields(data.d1)}

      <h2>DIO II – Canvas model</h2>
      ${renderFields(data.d2)}

      <h2>DIO III – PEST analiza</h2>
      ${renderFields(data.d3)}

      <h2>DIO IV – Porter & SWOT</h2>
      ${renderFields(data.d4)}

      <h2>DIO V – Analiza tržišta</h2>
      ${renderFields(data.d5)}

      <h2>DIO VI – Marketinški plan</h2>
      ${renderFields(data.d6)}

      <h2>DIO VII – Procesi i organizacija</h2>
      ${renderFields(data.d7)}

      <h2>DIO VIII – Finansijske projekcije</h2>
      ${renderFields(data.d8)}

      <div class="footer">
        BOOST Balkans – Faculty of Economics Mostar • boost-biznis-plan.vercel.app
      </div>
    </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

function renderFields(fields: Record<string, string> | undefined) {
  if (!fields) return '<p>Nije popunjeno.</p>'
  return Object.entries(fields).map(([label, value]) => `
    <div class="label">${label}</div>
    <div class="value">${value || '—'}</div>
  `).join('')
}
