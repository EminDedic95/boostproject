'use client'
import React from 'react'
import { LearnPage, Hero, Goals, Section, Lead, P, Example, Tabs, Accordion, Quiz, Checklist, NextCta, Icons, BigIcons, T } from '../LearnComponents'
import { ProfitSim, ScenarioPicker, RevealGrid, DragMatch, IdeaSentence } from '../LearnWidgets'

const strong = (t: string) => <strong style={{ color: T.navy }}>{t}</strong>

export default function Module1() {
  return (
    <LearnPage moduleId={1}>
      <Hero
        n={1}
        title="Biznis ideja i preduzetnik"
        desc="Svaki dobar biznis plan počinje jasnom idejom i osobom koja stoji iza nje. U ovom modulu opisat ćete svoju ideju u jednoj rečenici i naučiti kako predstaviti sebe da gradite povjerenje."
        meta={[
          { icon: Icons.clock, text: '~20 minuta' },
          { icon: Icons.tool, text: '5 interaktivnih vježbi' },
          { icon: Icons.check, text: 'Provjera znanja' },
        ]}
      />

      <Goals items={[
        'Zašto vam je biznis plan potreban i ko ga čita',
        'Četiri elementa svake dobre poslovne ideje',
        'Kako svoju ideju opisati u jednoj rečenici',
        'Kako predstaviti sebe kroz biografiju i motive',
        'Kako cijena i troškovi određuju vašu zaradu',
      ]} />

      <Section label="Lekcija 1" title="Šta je biznis plan i zašto ga trebate?">
        <Lead>Biznis plan je dokument koji opisuje vašu ideju, kako ćete je ostvariti i koliko novca vam treba. To je vaša mapa puta i alat za razgovor s bankama, investitorima i donatorima.</Lead>
        <P>Dobar plan odgovara na četiri pitanja: <strong>šta nudite, kome, koliko vam treba i kakva je korist.</strong> Isti plan različiti ljudi čitaju različito:</P>
        <Tabs tabs={[
          { label: 'Banka', content: <p style={{ margin: 0 }}>{strong('Banka gleda:')} možete li vratiti kredit? Fokus je na novčanom toku, kolateralu i realnosti projekcija. Žele sigurnost, ne rast pod svaku cijenu.</p> },
          { label: 'Investitor', content: <p style={{ margin: 0 }}>{strong('Investitor gleda:')} koliko brzo biznis može rasti i kolika je zarada na uloženo. Zanima ih veličina tržišta, tim i konkurentska prednost.</p> },
          { label: 'Grant komisija', content: <p style={{ margin: 0 }}>{strong('Grant komisija gleda:')} društveni učinak — nova radna mjesta, doprinos zajednici, održivost. Usklađenost sa ciljevima programa je ključna.</p> },
          { label: 'Vi sami', content: <p style={{ margin: 0 }}>{strong('Vi dobijate:')} jasnoću. Pisanje plana tjera vas da razmislite o svemu — od cijene do rizika — prije nego uložite novac i vrijeme.</p> },
        ]} />
        <Example label="Zašto je važno">Investitori i komisije prvu odluku donose na osnovu sažetka. Zato plan pišite za onoga ko ga čita, a ne za sebe.</Example>
      </Section>

      <Section label="Lekcija 2" title="Četiri elementa dobre ideje">
        <Lead>Svaka ideja koju vrijedi finansirati ima ova četiri elementa. Kliknite blokove da ih otkrijete.</Lead>
        <RevealGrid
          title="Anatomija vaše ideje"
          hint="Kliknite svaki blok"
          blocks={[
            { title: 'Proizvod ili usluga', desc: 'Šta nudite i kakvu korist kupac dobija. Ne opisujte samo osobine — opišite rješenje.', span: 3 },
            { title: 'Ciljni kupac', desc: 'Ko tačno kupuje? Dob, mjesto, navike.' },
            { title: 'Problem', desc: 'Koju muku uklanjate i zašto je kupcu važna?' },
            { title: 'Prednost', desc: 'Zašto vi, a ne konkurencija?' },
          ]}
        />
      </Section>

      <Section label="Vježba" title="Povežite pojam s primjerom">
        <Lead>Prevucite svaki pojam na primjer koji mu odgovara. Na mobitelu: dodirnite pojam, pa dodirnite primjer.</Lead>
        <DragMatch
          title="Spojite parove"
          hint="Pogrešan izbor se trese — pokušajte ponovo"
          pairs={[
            { id: 'proizvod', term: 'Proizvod', example: 'Aplikacija za dijeljenje bilješki' },
            { id: 'kupac', term: 'Ciljni kupac', example: 'Studenti od 18 do 25 godina u Sarajevu' },
            { id: 'problem', term: 'Problem', example: 'Studenti gube bilješke i vrijeme pred ispite' },
            { id: 'prednost', term: 'Prednost', example: 'Jedini smo besplatni i radimo bez interneta' },
          ]}
        />
      </Section>

      <Section label="Vježba" title="Vaša ideja u jednoj rečenici">
        <Lead>Sada iste elemente primijenite na svoju ideju. Ako je ne možete opisati u jednoj rečenici, ni čitalac plana je neće razumjeti. Ono što upišete ostaje sačuvano.</Lead>
        <IdeaSentence />
      </Section>

      <Section label="Lekcija 3" title="Predstavite sebe: biografija i kvalifikacije">
        <Lead>Investitori ne ulažu samo u ideje — ulažu u ljude. Vaša biografija pokazuje da možete ostvariti ono što obećavate.</Lead>
        <Accordion items={[
          { num: 'A', title: 'Obrazovanje i iskustvo', body: <p style={{ margin: 0 }}>Navedite obrazovanje i radno iskustvo koje je važno za ovaj biznis. Nije bitno samo šta ste završili, nego kako vas to priprema za konkretan poduhvat. Uključite kurseve, obuke i certifikate.</p> },
          { num: 'B', title: 'Postignuća', body: <p style={{ margin: 0 }}>Nagrade, uspješni projekti, priznanja — sve što pokazuje da postižete rezultate. To su vanjske potvrde vaše sposobnosti.</p> },
          { num: 'C', title: 'Motivi', body: <p style={{ margin: 0 }}>Zašto pokrećete baš ovaj biznis? Motiv može biti tržišna prilika, strast, samostalnost, finansijski cilj ili društvena misija. Važno je da je iskren i jasan.</p> },
        ]} />
      </Section>

      <Section label="Interaktivni alat" title="Kako cijena utiče na zaradu">
        <Lead>Prije finansija u Modulu 5, osjetite kako male promjene mijenjaju zaradu. Probajte spustiti cijenu ispod troška.</Lead>
        <ProfitSim />
      </Section>

      <Section label="Prilagođeno vama" title="Kakav je vaš biznis?">
        <Lead>Odaberite tip biznisa i dobit ćete savjet na šta da pazite u planu.</Lead>
        <ScenarioPicker
          title="Odaberite tip"
          options={[
            { id: 'proizvod', label: 'Proizvod', icon: BigIcons.tag, advice: <><strong>Za proizvodni biznis</strong> pazite na trošak izrade i zalihe. U planu naglasite kako nabavljate materijal i koliko možete proizvesti mjesečno. Prednost je često kvalitet ili cijena.</> },
            { id: 'usluga', label: 'Usluga', icon: BigIcons.wrench, advice: <><strong>Za uslužni biznis</strong> najvažnije sredstvo ste vi i vaš tim. Naglasite kvalifikacije, iskustvo i kapacitet — koliko klijenata možete opslužiti. Prednost je često stručnost i povjerenje.</> },
            { id: 'online', label: 'Online', icon: BigIcons.globe, advice: <><strong>Za online biznis</strong> fokus je na tome kako privući posjetioce i pretvoriti ih u kupce. Digitalni marketing i korisničko iskustvo su ključni. Prednost je često dostupnost i širi doseg.</> },
          ]}
        />
      </Section>

      <Quiz moduleId={1} questions={[
        { q: 'Na osnovu čega čitaoci plana najčešće donose prvu odluku?', options: ['Na osnovu broja stranica', 'Na osnovu kvaliteta sažetka', 'Na osnovu dizajna korica'], answer: 1, why: 'Sažetak se čita prvi i često jedini. Ako ne uvjeri, ostatak plana niko ne čita.' },
        { q: 'Kako najbolje definisati ciljnog kupca?', options: ['„Svi ljudi“ — što više to bolje', 'Ne treba ga definisati na početku', 'Konkretno — po dobi, mjestu i navikama'], answer: 2, why: 'Konkretan kupac vam govori gdje da se oglašavate, koju cijenu da postavite i šta da naglasite.' },
        { q: 'Šta se dešava sa zaradom kad trošak izrade priđe cijeni?', options: ['Zarada po komadu se smanjuje', 'Zarada raste', 'Ništa se ne mijenja'], answer: 0, why: 'Zarada po komadu je razlika cijene i troška. Kad se razlika smanjuje, morate prodati mnogo više za istu zaradu.' },
        { q: 'Šta je „prednost“ u opisu ideje?', options: ['Niža cijena od svih ostalih, uvijek', 'Razlog zašto bi kupac izabrao vas, a ne konkurenciju', 'Broj godina iskustva vlasnika'], answer: 1, why: 'Prednost može biti cijena, ali i kvalitet, brzina, lokacija ili povjerenje — sve što vas razlikuje.' },
      ]} />

      <Checklist
        moduleId={1}
        title="Vaš zadatak"
        intro="Prije sljedećeg modula pripremite ove elemente (napredak se čuva):"
        items={[
          'Napisao/la sam svoju ideju u jednoj rečenici',
          'Znam ko je moj idealni kupac',
          'Zapisao/la sam koji problem rješavam',
          'Znam svoju glavnu prednost u odnosu na konkurenciju',
          'Imam kratku biografiju s iskustvom i motivima',
        ]}
      />

      <NextCta nextN={2} nextTitle="Analiza tržišta" />
    </LearnPage>
  )
}
