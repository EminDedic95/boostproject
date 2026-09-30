'use client'
import React from 'react'
import { LearnPage, Hero, Goals, Section, Lead, P, Example, Tabs, Accordion, Quiz, Checklist, NextCta, Icons, T } from '../LearnComponents'
import { BreakEvenCalc, CashFlowSim, RiskMatrix, SortBuckets } from '../LearnWidgets'

const strong = (t: string) => <strong style={{ color: T.navy }}>{t}</strong>

export default function Module5() {
  return (
    <LearnPage moduleId={5}>
      <Hero
        n={5}
        title="Finansije i rizici"
        desc="Brojke pokazuju da li vaša ideja može opstati. Ne morate biti računovođa — dovoljno je razumjeti nekoliko pojmova koji odlučuju o sudbini biznisa."
        meta={[
          { icon: Icons.clock, text: '~25 minuta' },
          { icon: Icons.tool, text: '3 kalkulatora uživo' },
          { icon: Icons.check, text: 'Provjera znanja' },
        ]}
      />

      <Goals items={[
        'Razliku između prihoda, troška i zarade',
        'Kako razlikovati fiksne i varijabilne troškove',
        'Kako izračunati prag rentabilnosti',
        'Zašto profitabilan biznis može ostati bez novca',
        'Kako procijeniti rizike i pripremiti mjere',
      ]} />

      <Section label="Lekcija 1" title="Tri broja koja morate znati">
        <Lead>Finansije zvuče strašno, ali sve počinje s tri pojma.</Lead>
        <Tabs tabs={[
          { label: 'Prihod', content: <p style={{ margin: 0 }}>{strong('Prihod')} je sav novac koji uđe od prodaje. Ako prodate 100 komada po 20 KM, prihod je 2.000 KM. To nije vaša zarada.</p> },
          { label: 'Trošak', content: <p style={{ margin: 0 }}>{strong('Trošak')} je sve što platite da biste poslovali — materijal, najam, plate, struja. Dijele se na fiksne i varijabilne.</p> },
          { label: 'Zarada', content: <p style={{ margin: 0 }}>{strong('Zarada (dobit)')} je ono što ostane: prihod minus troškovi. To je pravi pokazatelj uspjeha.</p> },
        ]} />
        <Example label="Zapamtite">Visok prihod ne znači zaradu. Mnogi biznisi propadnu uz dobru prodaju — jer su troškovi bili veći od prihoda.</Example>
      </Section>

      <Section label="Lekcija 2" title="Fiksni i varijabilni troškovi">
        <Lead>Ova razlika je temelj svih finansijskih odluka, uključujući prag rentabilnosti ispod.</Lead>
        <Accordion items={[
          { num: 'F', title: 'Fiksni troškovi', body: <p style={{ margin: 0 }}>Ne mijenjaju se s količinom prodaje. Plaćate ih i kad ništa ne prodate: najam, plate, osiguranje, pretplate. Što više prodate, to manje fiksnog troška pada na svaki komad.</p> },
          { num: 'V', title: 'Varijabilni troškovi', body: <p style={{ margin: 0 }}>Rastu sa svakom prodajom: materijal, ambalaža, provizije, dostava. Ako ne proizvodite, nema ih. Po komadu ostaju otprilike isti.</p> },
        ]} />
        <SortBuckets
          title="Razvrstajte troškove jednog kafića"
          hint="Prevucite svaki trošak u pravu kolonu ili ga dodirnite pa dodirnite kolonu"
          buckets={[
            { id: 'f', label: 'Fiksni', color: T.navy, wash: '#eceff5' },
            { id: 'v', label: 'Varijabilni', color: T.goldDeep, wash: T.goldWash },
          ]}
          items={[
            { text: 'Najam prostora', bucket: 'f', why: 'Najam plaćate isto svaki mjesec, bez obzira na broj gostiju — fiksni trošak.' },
            { text: 'Kafa u zrnu', bucket: 'v', why: 'Što više kafa prodate, više zrna trošite — varijabilni trošak.' },
            { text: 'Plata konobara', bucket: 'f', why: 'Fiksna mjesečna plata ne zavisi od prodaje — fiksni trošak.' },
            { text: 'Mlijeko i šećer', bucket: 'v', why: 'Troši se sa svakom prodanom kafom — varijabilni trošak.' },
            { text: 'Osiguranje lokala', bucket: 'f', why: 'Osiguranje je isto svaki mjesec — fiksni trošak.' },
            { text: 'Čaše za poneti', bucket: 'v', why: 'Svaka kafa za poneti troši jednu čašu — varijabilni trošak.' },
            { text: 'Mjesečna pretplata za kasu', bucket: 'f', why: 'Pretplata je ista bez obzira na promet — fiksni trošak.' },
            { text: 'Provizija za plaćanje karticom', bucket: 'v', why: 'Provizija raste sa svakom transakcijom — varijabilni trošak.' },
          ]}
        />
      </Section>

      <Section label="Interaktivni alat" title="Prag rentabilnosti">
        <Lead>Prag rentabilnosti je broj komada koji morate prodati da pokrijete sve troškove. Ispod njega gubite, iznad zarađujete. Upišite i svoju očekivanu prodaju da vidite gdje ste.</Lead>
        <BreakEvenCalc />
        <Example label="Zašto je važno">Prag vam govori da li je plan realan. Ako morate prodati 5.000 komada mjesečno, a tržište je premalo, vrijeme je da promijenite cijenu, troškove ili model.</Example>
      </Section>

      <Section label="Lekcija 3" title="Novčani tok">
        <Lead>Biznis koji zarađuje na papiru može propasti ako mu ponestane gotovine u pogrešnom trenutku. Novčani tok prati kada novac stvarno ulazi i izlazi.</Lead>
        <P>Primjer: isporučite robu u januaru, a kupac plati tek u martu. U međuvremenu plaćate dobavljače i plate. <strong>Taj jaz može ugušiti biznis</strong> — čak i kad je profitabilan.</P>
        <CashFlowSim />
        <Example label="Pravilo">Imajte rezervu za 3 do 6 mjeseci troškova. Probajte gore: postavite zakašnjenje na 3 mjeseca i pogledajte koliko novca vam treba na početku.</Example>
      </Section>

      <Section label="Vježba" title="Analiza rizika">
        <Lead>Svaki biznis ima rizike. Pametan preduzetnik ih predviđa i ima plan. Dodajte rizike, ocijenite ih i upišite mjere — mapa se crta dok radite.</Lead>
        <RiskMatrix />
        <Example label="Kako koristiti">Rizici u gornjem desnom uglu mape traže konkretan plan. U biznis planu za svaki napišite kako ćete ga spriječiti ili šta ćete uraditi ako se desi.</Example>
      </Section>

      <Quiz moduleId={5} questions={[
        { q: 'Šta je zarada (dobit)?', options: ['Sav novac od prodaje', 'Prihod minus troškovi', 'Isto što i prihod'], answer: 1, why: 'Prihod je samo ono što uđe. Zarada je ono što ostane kad platite sve troškove.' },
        { q: 'Koji trošak se ne mijenja s količinom prodaje?', options: ['Fiksni trošak', 'Varijabilni trošak', 'Trošak materijala'], answer: 0, why: 'Fiksne troškove poput najma plaćate isto, prodali vi 10 ili 1.000 komada.' },
        { q: 'Fiksni troškovi su 3.000 KM, cijena 25 KM, varijabilni trošak 10 KM. Koliki je prag?', options: ['120 komada', '200 komada', '300 komada'], answer: 1, why: 'Na svakom komadu ostaje 15 KM (25 − 10). 3.000 ÷ 15 = 200 komada.' },
        { q: 'Zašto profitabilan biznis može propasti?', options: ['Zbog previše kupaca', 'Ako mu ponestane gotovine u pogrešnom trenutku', 'Zbog niskih cijena konkurencije'], answer: 1, why: 'Kad kupci plaćaju kasnije nego što vi plaćate troškove, nastaje jaz koji treba pokriti rezervom.' },
      ]} />

      <Checklist
        moduleId={5}
        title="Vaš zadatak"
        intro="Da završite pripremu biznis plana:"
        items={[
          'Razdvojio/la sam fiksne i varijabilne troškove',
          'Izračunao/la sam svoj prag rentabilnosti',
          'Procijenio/la sam novčani tok za prvih 6 mjeseci',
          'Imam matricu s najmanje 5 rizika i mjerama',
        ]}
      />

      <NextCta nextN={null} nextTitle={null} />
    </LearnPage>
  )
}
