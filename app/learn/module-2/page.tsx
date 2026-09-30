'use client'
import React from 'react'
import { LearnPage, Hero, Goals, Section, Lead, P, Example, Tabs, Quiz, Checklist, NextCta, Icons, BigIcons, T } from '../LearnComponents'
import { RevealGrid, ScenarioPicker, PersonaBuilder, CanvasBuilder, SortBuckets } from '../LearnWidgets'

const strong = (t: string) => <strong style={{ color: T.navy }}>{t}</strong>

export default function Module2() {
  return (
    <LearnPage moduleId={2}>
      <Hero
        n={2}
        title="Analiza tržišta"
        desc="Prije nego uložite vrijeme i novac, morate razumjeti tržište: ko su kupci, ko je konkurencija i kako vaš biznis stvara i naplaćuje vrijednost."
        meta={[
          { icon: Icons.clock, text: '~25 minuta' },
          { icon: Icons.tool, text: 'Canvas i profil kupca' },
          { icon: Icons.check, text: 'Provjera znanja' },
        ]}
      />

      <Goals items={[
        'Zašto analiza tržišta štiti vaš novac',
        'Kako napraviti profil idealnog kupca',
        'Kako popuniti svih devet blokova Business Model Canvasa',
        'Kako prepoznati direktnu i indirektnu konkurenciju',
        'Kako pronaći svoju tržišnu prazninu',
      ]} />

      <Section label="Lekcija 1" title="Zašto analiza tržišta?">
        <Lead>Najčešći razlog propasti biznisa nije loš proizvod — nego to što ga niko ne treba dovoljno da bi platio. Analiza tržišta provjerava potražnju prije nego uložite.</Lead>
        <P>Analiza odgovara na tri pitanja: <strong>koliko je tržište veliko, ko su kupci i ko su konkurenti.</strong> Bez tih odgovora gradite naslijepo.</P>
        <Example label="Iz prakse">Tržište ne mora biti ogromno da bi biznis uspio. Bolje je jasno pokriti mali dio tržišta nego pokušati doći do svih.</Example>
      </Section>

      <Section label="Lekcija 2" title="Upoznajte svog kupca">
        <Lead>Što bolje poznajete kupca, to lakše prilagodite ponudu, cijenu i marketing. Kupca opisujemo kroz četiri dimenzije:</Lead>
        <RevealGrid
          title="Četiri dimenzije kupca"
          hint="Kliknite svaki blok da vidite šta istražiti"
          blocks={[
            { title: 'Demografija', desc: 'Dob, spol, prihod, obrazovanje, veličina domaćinstva.' },
            { title: 'Geografija', desc: 'Gdje živi? Grad, regija, urbano ili ruralno.' },
            { title: 'Psihografija', desc: 'Vrijednosti, stil života, interesi.' },
            { title: 'Ponašanje', desc: 'Gdje i koliko često kupuje? Šta ga pokreće na kupovinu?', span: 3 },
          ]}
        />
        <P>Sada to primijenite. Umjesto „žene od 25 do 45“, zamislite jednu stvarnu osobu — tako je mnogo lakše odlučiti šta joj reći i gdje je pronaći.</P>
        <PersonaBuilder />
      </Section>

      <Section label="Lekcija 3" title="Business Model Canvas">
        <Lead>Canvas na jednoj stranici pokazuje kako vaš biznis funkcioniše. Devet blokova: desna strana je kupac i prihod, lijeva strana je ono što vam treba da to isporučite.</Lead>
        <CanvasBuilder />
        <Example label="Savjet">Ako zapnete, pogledajte primjer pekare pa se vratite na svoj Canvas. Blokovi 1 i 2 su srce modela — ostalo se gradi oko njih.</Example>
      </Section>

      <Section label="Lekcija 4" title="Analiza konkurencije">
        <Lead>Konkurent nije samo neko ko radi isto što i vi. To je svako ko rješava isti problem kupca — na bilo koji način.</Lead>
        <Tabs tabs={[
          { label: 'Direktni', content: <p style={{ margin: 0 }}>{strong('Direktni konkurenti')} nude isti proizvod istim kupcima. Ako otvarate pekaru, to su druge pekare u blizini.</p> },
          { label: 'Indirektni', content: <p style={{ margin: 0 }}>{strong('Indirektni konkurenti')} rješavaju isti problem na drugi način. Za pekaru, to je supermarket koji prodaje hljeb.</p> },
          { label: 'Zamjene', content: <p style={{ margin: 0 }}>{strong('Zamjene')} su potpuno drugačiji način da kupac zadovolji potrebu — na primjer, neko ko peče hljeb kod kuće.</p> },
        ]} />
        <SortBuckets
          title="Razvrstajte konkurente pekare"
          hint="Prevucite svaku stavku u pravu kolonu ili je dodirnite pa dodirnite kolonu"
          buckets={[
            { id: 'dir', label: 'Direktni', color: T.red, wash: T.redWash },
            { id: 'ind', label: 'Indirektni', color: T.goldDeep, wash: T.goldWash },
            { id: 'zam', label: 'Zamjene', color: T.blue, wash: T.blueWash },
          ]}
          items={[
            { text: 'Pekara u istoj ulici', bucket: 'dir', why: 'Pekara u istoj ulici nudi isto, istim kupcima — to je direktni konkurent.' },
            { text: 'Supermarket s pekarskim odjelom', bucket: 'ind', why: 'Supermarket nije pekara, ali kupcu rješava isti problem — indirektni konkurent.' },
            { text: 'Mašina za pečenje hljeba kod kuće', bucket: 'zam', why: 'Pečenje kod kuće je sasvim drugi način da se dođe do hljeba — to je zamjena.' },
            { text: 'Pekara u susjednom naselju', bucket: 'dir', why: 'Druga pekara s istom ponudom je direktni konkurent, čak i malo dalje.' },
            { text: 'Benzinska pumpa koja prodaje peciva', bucket: 'ind', why: 'Pumpa prodaje peciva usput — isti problem, drugi format. Indirektni konkurent.' },
            { text: 'Doručak od žitarica umjesto peciva', bucket: 'zam', why: 'Žitarice zadovoljavaju istu potrebu (doručak) bez hljeba — zamjena.' },
          ]}
        />
      </Section>

      <Section label="Prilagođeno vama" title="Gdje je vaša tržišna praznina?">
        <Lead>Tržišna praznina je prostor koji konkurencija ne pokriva dobro. Odaberite pristup koji vam najviše odgovara.</Lead>
        <ScenarioPicker
          title="Vaša strategija razlikovanja"
          options={[
            { id: 'kvalitet', label: 'Kvalitet', icon: BigIcons.star, advice: <><strong>Strategija kvaliteta:</strong> nudite bolji proizvod od konkurencije. Kupci plaćaju više za pouzdanost, trajnost ili iskustvo. U planu pokažite po čemu ste bolji i zašto to vrijedi višu cijenu.</> },
            { id: 'cijena', label: 'Cijena', icon: BigIcons.coin, advice: <><strong>Strategija cijene:</strong> nudite istu vrijednost jeftinije. To zahtijeva niske troškove i efikasnost. Oprez — cjenovni rat je težak za male firme.</> },
            { id: 'nisa', label: 'Niša', icon: BigIcons.target, advice: <><strong>Strategija niše:</strong> fokusirate se na grupu koju veliki igrači zanemaruju. Manje tržište, ali jača veza s kupcima i manje konkurencije.</> },
          ]}
        />
      </Section>

      <Quiz moduleId={2} questions={[
        { q: 'Koji je najčešći razlog propasti biznisa?', options: ['Proizvod koji niko ne treba dovoljno', 'Previše zaposlenih', 'Prevelik poslovni prostor'], answer: 0, why: 'Bez potražnje ni najbolji proizvod ne opstaje. Zato analiza tržišta dolazi prije ulaganja.' },
        { q: 'Od kojih blokova je najbolje početi Canvas?', options: ['Od strukture troškova', 'Od korisničkih segmenata i vrijednosne ponude', 'Od ključnih partnera'], answer: 1, why: 'Kupac i vrijednost koju mu dajete određuju sve ostalo — kanale, prihode, resurse i troškove.' },
        { q: 'Supermarket koji prodaje hljeb je za pekaru:', options: ['Direktni konkurent', 'Indirektni konkurent', 'Ključni partner'], answer: 1, why: 'Rješava isti problem kupca, ali drugim formatom — to je indirektna konkurencija.' },
        { q: 'Zašto je korisno zamisliti jednu konkretnu osobu kao kupca?', options: ['Jer tada ne trebate istraživati tržište', 'Jer je lakše odlučiti šta joj reći i gdje je naći', 'Jer banke to zahtijevaju'], answer: 1, why: 'Profil kupca pretvara apstraktnu grupu u osobu čije navike, probleme i kanale možete stvarno opisati.' },
      ]} />

      <Checklist
        moduleId={2}
        title="Vaš zadatak"
        intro="Prije sljedećeg modula:"
        items={[
          'Napravio/la sam profil idealnog kupca',
          'Popunio/la sam svih 9 blokova Canvasa',
          'Naveo/la sam bar 3 direktna i 2 indirektna konkurenta',
          'Znam svoju tržišnu prazninu i strategiju razlikovanja',
        ]}
      />

      <NextCta nextN={3} nextTitle="Strateška analiza" />
    </LearnPage>
  )
}
