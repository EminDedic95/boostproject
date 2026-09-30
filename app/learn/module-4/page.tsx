'use client'
import React from 'react'
import { LearnPage, Hero, Goals, Section, Lead, P, Example, Accordion, Quiz, Checklist, NextCta, Icons, BigIcons } from '../LearnComponents'
import { RevealGrid, ScenarioPicker, BudgetAllocator, StepWalkthrough } from '../LearnWidgets'

export default function Module4() {
  return (
    <LearnPage moduleId={4}>
      <Hero
        n={4}
        title="Marketing i operacije"
        desc="Odličan proizvod nije dovoljan ako niko ne zna za njega. Naučite kako doći do kupaca, koliko novca uložiti i kako organizovati posao da sve teče glatko."
        meta={[
          { icon: Icons.clock, text: '~20 minuta' },
          { icon: Icons.tool, text: 'Planer budžeta i procesa' },
          { icon: Icons.check, text: 'Provjera znanja' },
        ]}
      />

      <Goals items={[
        'Kako oblikovati marketinšku poruku',
        '7P marketing miks — svih sedam elemenata',
        'Kako rasporediti marketinški budžet po kanalima',
        'Kako opisati poslovni proces od narudžbe do isporuke',
      ]} />

      <Section label="Lekcija 1" title="Marketing nije samo reklama">
        <Lead>Marketing je sve što radite da kupac sazna za vas, poželi vaš proizvod i vrati se ponovo. Reklama je samo jedan dio.</Lead>
        <P>Prije bilo kakve reklame odgovorite: <strong>koja je vaša glavna poruka i zašto bi kupcu bilo stalo?</strong> Bez jasne poruke, novac za oglase se troši uzalud.</P>
        <Example label="Zlatno pravilo">Ne prodajete bušilicu — prodajete rupu u zidu. Poruka govori o koristi za kupca, ne o osobinama proizvoda.</Example>
      </Section>

      <Section label="Lekcija 2" title="7P marketing miks">
        <Lead>Marketing miks je sedam poluga koje podešavate. Kliknite svaku da vidite šta znači.</Lead>
        <RevealGrid
          title="Sedam elemenata"
          hint="Kliknite svaki blok"
          blocks={[
            { title: 'Proizvod', desc: 'Šta nudite i kako zadovoljava potrebu kupca.' },
            { title: 'Cijena', desc: 'Koliko naplaćujete i kakva je strategija cijena.' },
            { title: 'Mjesto', desc: 'Gdje i kako kupac dolazi do proizvoda.' },
            { title: 'Promocija', desc: 'Kako komunicirate s kupcima — oglasi, mreže, odnosi s javnošću.' },
            { title: 'Ljudi', desc: 'Vaš tim i svako ko je u kontaktu s kupcem.' },
            { title: 'Procesi', desc: 'Kako teče iskustvo od narudžbe do isporuke.' },
            { title: 'Fizički dokazi', desc: 'Vidljivi znakovi kvaliteta — ambalaža, prostor, web stranica, recenzije.', span: 3 },
          ]}
        />
      </Section>

      <Section label="Interaktivni alat" title="Koliko novca u koji kanal?">
        <Lead>Mali biznis ne mora biti svugdje. Bolje je dobro raditi na dva-tri kanala. Isprobajte različite raspodjele i pročitajte povratnu informaciju.</Lead>
        <BudgetAllocator />
      </Section>

      <Section label="Prilagođeno vama" title="Gdje su vaši kupci?">
        <Lead>Kanal birate prema tome gdje se vaš kupac već nalazi. Odaberite opciju koja najviše liči na vaš biznis.</Lead>
        <ScenarioPicker
          title="Vaši kupci su najčešće…"
          options={[
            { id: 'drustvene', label: 'Na društvenim mrežama', icon: BigIcons.globe, advice: <><strong>Društvene mreže</strong> su idealne za vizuelne proizvode i mlađu publiku. Instagram i TikTok za prodaju krajnjim kupcima, LinkedIn za prodaju firmama. Ključ je redovan, autentičan sadržaj — ne samo reklame.</> },
            { id: 'lokalno', label: 'U vašem kraju', icon: BigIcons.target, advice: <><strong>Lokalni marketing</strong> radi za biznise vezane za lokaciju — kafiće, salone, radnje. Preporuke, lokalne grupe, Google Maps i saradnja s drugim lokalnim biznisima donose najviše.</> },
            { id: 'preporuke', label: 'Kroz preporuke', icon: BigIcons.star, advice: <><strong>Preporuke</strong> su najjači i najjeftiniji kanal. Zadovoljan kupac dovodi nove. Potaknite ih popustom za preporuku, odličnom uslugom i traženjem recenzija.</> },
          ]}
        />
      </Section>

      <Section label="Lekcija 3" title="Organizacija poslovanja">
        <Lead>Operacije su „kako“ vašeg biznisa — svakodnevni procesi koji ideju pretvaraju u isporučen proizvod. Prođite kroz tipičan proces korak po korak.</Lead>
        <StepWalkthrough
          title="Od narudžbe do zadovoljnog kupca"
          hint="Kliknite korake ili koristite dugmad ispod"
          steps={[
            { title: 'Narudžba', desc: 'Kupac vas kontaktira: u radnji, telefonom, porukom ili preko weba. Što je lakše naručiti, to više narudžbi dobijate.', ask: 'Kojim kanalima kupci mogu naručiti i ko prima narudžbe?' },
            { title: 'Plaćanje', desc: 'Dogovarate cijenu i način plaćanja — gotovina, kartica, avans ili odgođeno plaćanje. Ovo direktno utiče na novčani tok.', ask: 'Tražite li avans? Koliko dana kupci imaju da plate?' },
            { title: 'Nabavka', desc: 'Obezbjeđujete materijal, robu ili resurse potrebne za posao. Pouzdani dobavljači su temelj.', ask: 'Ko su vaši dobavljači i imate li rezervnog?' },
            { title: 'Izrada', desc: 'Proizvodite proizvod ili izvršavate uslugu. Ovdje nastaje najveći dio troška i vremena.', ask: 'Koliko traje izrada i koliko narudžbi možete obraditi mjesečno?' },
            { title: 'Kontrola', desc: 'Provjeravate kvalitet prije nego stigne do kupca. Jeftinije je uhvatiti grešku ovdje nego kod kupca.', ask: 'Kako provjeravate kvalitet i ko je za to odgovoran?' },
            { title: 'Isporuka', desc: 'Proizvod stiže do kupca — lično, dostavom ili digitalno. Rok isporuke je dio obećanja.', ask: 'Kako isporučujete i koliko to košta po narudžbi?' },
            { title: 'Podrška', desc: 'Nakon prodaje: pitanja, reklamacije, ponovna kupovina. Zadržati kupca je jeftinije nego naći novog.', ask: 'Kako ćete ostati u kontaktu s kupcem nakon prodaje?' },
          ]}
        />
        <Accordion items={[
          { num: '1', title: 'Tim i uloge', body: <p style={{ margin: 0 }}>Ko su ključni ljudi i za šta su odgovorni? Čak i ako ste sami na početku, definišite uloge — to olakšava kasnije zapošljavanje.</p> },
          { num: '2', title: 'Lokacija i oprema', body: <p style={{ margin: 0 }}>Gdje poslujete i šta vam treba? Najam ili kupovina? Koja oprema je neophodna za start, a šta može čekati?</p> },
          { num: '3', title: 'Pravni oblik', body: <p style={{ margin: 0 }}>Obrt, d.o.o. ili nešto drugo? Svaki oblik ima različite poreze, odgovornost i troškove — i utiče na cijeli finansijski plan.</p> },
        ]} />
      </Section>

      <Quiz moduleId={4} questions={[
        { q: 'Na šta se fokusira dobra marketinška poruka?', options: ['Na osobine proizvoda', 'Na korist za kupca', 'Na cijenu materijala'], answer: 1, why: 'Kupac kupuje rješenje svog problema. Osobine su važne tek kad objašnjavaju korist.' },
        { q: 'Koliko elemenata ima prošireni marketing miks?', options: ['4', '7', '10'], answer: 1, why: 'Klasičnim 4P (proizvod, cijena, mjesto, promocija) dodaju se ljudi, procesi i fizički dokazi.' },
        { q: 'Mali biznis ima 400 KM mjesečno za marketing. Šta je najpametnije?', options: ['Rasporediti novac na pet kanala', 'Fokusirati se na dva-tri kanala', 'Sve uložiti u jedan kanal zauvijek'], answer: 1, why: 'Premalo novca po kanalu ne daje rezultat, a sve na jednoj kartici je rizično. Dva-tri kanala je razuman balans.' },
        { q: 'Zašto u planu opisujete proces od narudžbe do isporuke?', options: ['Da plan bude duži', 'Da pokažete da znate kako ćete isporučiti obećano', 'To traže samo proizvodne firme'], answer: 1, why: 'Jasan proces pokazuje čitaocu da ste razmislili o kapacitetu, troškovima i kvalitetu.' },
      ]} />

      <Checklist
        moduleId={4}
        title="Vaš zadatak"
        intro="Prije sljedećeg modula:"
        items={[
          'Napisao/la sam glavnu marketinšku poruku',
          'Odabrao/la sam 2–3 kanala i okvirni mjesečni budžet',
          'Opisao/la sam proces od narudžbe do isporuke',
          'Odlučio/la sam o pravnom obliku registracije',
        ]}
      />

      <NextCta nextN={5} nextTitle="Finansije i rizici" />
    </LearnPage>
  )
}
