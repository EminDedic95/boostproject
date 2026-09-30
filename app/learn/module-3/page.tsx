'use client'
import React from 'react'
import { LearnPage, Hero, Goals, Section, Lead, P, Example, Tabs, Quiz, Checklist, NextCta, Icons, T } from '../LearnComponents'
import { SwotBuilder, PorterForces, SortBuckets } from '../LearnWidgets'

const strong = (t: string) => <strong style={{ color: T.navy }}>{t}</strong>
const em = (t: string) => <em style={{ fontStyle: 'italic', color: T.navy }}>{t}</em>

export default function Module3() {
  return (
    <LearnPage moduleId={3}>
      <Hero
        n={3}
        title="Strateška analiza"
        desc="Sada kad poznajete tržište, vrijeme je da postavite pravac. Vizija, ciljevi i tri analize koje vam pomažu da donosite pametne odluke — i da ih odbranite pred bankom ili komisijom."
        meta={[
          { icon: Icons.clock, text: '~25 minuta' },
          { icon: Icons.tool, text: 'PEST, Porter i SWOT' },
          { icon: Icons.check, text: 'Provjera znanja' },
        ]}
      />

      <Goals items={[
        'Kako napisati viziju i postaviti SMART ciljeve',
        'PEST analiza — vanjski faktori koje ne kontrolišete',
        'Porterovih 5 sila — koliko je vaše tržište privlačno',
        'SWOT analiza i kako je pretvoriti u strategiju',
      ]} />

      <Section label="Lekcija 1" title="Vizija i SMART ciljevi">
        <Lead>Vizija je slika gdje želite biti za nekoliko godina. Ciljevi su konkretni koraci koji vas tamo vode.</Lead>
        <P>Dobar cilj je <strong>SMART</strong>. Kliknite svako slovo:</P>
        <Tabs tabs={[
          { label: 'S · Specifičan', content: <p style={{ margin: 0 }}>{strong('Specifičan:')} jasan i precizan. Umjesto „želim rasti“ recite „otvoriti drugu poslovnicu“.</p> },
          { label: 'M · Mjerljiv', content: <p style={{ margin: 0 }}>{strong('Mjerljiv:')} možete provjeriti da li ste ga postigli. Na primjer, „100 kupaca mjesečno“.</p> },
          { label: 'A · Ostvariv', content: <p style={{ margin: 0 }}>{strong('Ostvariv:')} realan s obzirom na vaše resurse. Ambiciozan, ali ne nemoguć.</p> },
          { label: 'R · Relevantan', content: <p style={{ margin: 0 }}>{strong('Relevantan:')} važan za vaš biznis i usklađen s vizijom.</p> },
          { label: 'T · Vremenski', content: <p style={{ margin: 0 }}>{strong('Vremenski određen:')} ima rok. „Do kraja godine“, a ne „jednog dana“.</p> },
        ]} />
        <Example label="Primjer">Loš cilj: {em('„Želim više kupaca.“')} SMART cilj: {em('„Doći do 200 stalnih kupaca do 31. decembra kroz Instagram oglase.“')}</Example>
      </Section>

      <Section label="Lekcija 2" title="PEST analiza">
        <Lead>PEST gleda vanjske faktore koje ne kontrolišete, ali koji utiču na vas. Četiri kategorije:</Lead>
        <Tabs tabs={[
          { label: 'Politički', content: <p style={{ margin: 0 }}>{strong('Politički i pravni:')} zakoni, propisi, porezi, dozvole, politička stabilnost.</p> },
          { label: 'Ekonomski', content: <p style={{ margin: 0 }}>{strong('Ekonomski:')} inflacija, kupovna moć, kamate, nezaposlenost. Određuju koliko ljudi mogu trošiti.</p> },
          { label: 'Socijalni', content: <p style={{ margin: 0 }}>{strong('Socijalni:')} demografija, navike, kulturni trendovi, stil života.</p> },
          { label: 'Tehnološki', content: <p style={{ margin: 0 }}>{strong('Tehnološki:')} nove tehnologije, digitalizacija, automatizacija. Mogu biti prilika ili prijetnja.</p> },
        ]} />
        <SortBuckets
          title="Razvrstajte faktore u PEST kategorije"
          hint="Prevucite svaki faktor u pravu kategoriju ili ga dodirnite pa dodirnite kategoriju"
          buckets={[
            { id: 'p', label: 'Politički', color: T.navy, wash: '#eceff5' },
            { id: 'e', label: 'Ekonomski', color: T.goldDeep, wash: T.goldWash },
            { id: 's', label: 'Socijalni', color: T.green, wash: T.greenWash },
            { id: 't', label: 'Tehnološki', color: T.blue, wash: T.blueWash },
          ]}
          items={[
            { text: 'Izmjene zakona o PDV-u', bucket: 'p', why: 'Porezi i zakoni su politički i pravni faktor.' },
            { text: 'Rast inflacije', bucket: 'e', why: 'Inflacija mijenja kupovnu moć — to je ekonomski faktor.' },
            { text: 'Iseljavanje mladih', bucket: 's', why: 'Promjene u stanovništvu su socijalni faktor.' },
            { text: 'Širenje online plaćanja', bucket: 't', why: 'Nova tehnologija plaćanja je tehnološki faktor.' },
            { text: 'Novi uslovi za dozvole', bucket: 'p', why: 'Dozvole i propisi su politički i pravni faktor.' },
            { text: 'Rast kamata na kredite', bucket: 'e', why: 'Kamate određuju cijenu novca — ekonomski faktor.' },
            { text: 'Trend zdrave ishrane', bucket: 's', why: 'Navike i stil života su socijalni faktor.' },
            { text: 'Umjetna inteligencija u uslugama', bucket: 't', why: 'Nova tehnologija koja mijenja način rada je tehnološki faktor.' },
          ]}
        />
      </Section>

      <Section label="Interaktivni alat" title="Porterovih 5 sila">
        <Lead>Ovaj model pokazuje koliko je vaše tržište privlačno. Što je više sila visokih, teže je zarađivati. Ocijenite svaku silu za svoj biznis — dobit ćete ocjenu tržišta.</Lead>
        <PorterForces />
      </Section>

      <Section label="Vježba" title="Napravite svoju SWOT analizu">
        <Lead>SWOT spaja unutrašnje faktore (snage i slabosti) i vanjske (prilike i prijetnje). Popunite za svoj biznis — kad završite, kopirajte je u builder.</Lead>
        <SwotBuilder />
        <Example label="Kako koristiti">Iskoristite ono što ste upravo naučili: prilike i prijetnje često dolaze iz PEST analize i Porterovih sila, a snage i slabosti iz vašeg tima i resursa.</Example>
      </Section>

      <Quiz moduleId={3} questions={[
        { q: 'Šta znači „M“ u SMART cilju?', options: ['Motivišući', 'Mjerljiv', 'Marketinški'], answer: 1, why: 'Cilj mora imati broj ili jasan kriterij da biste znali jeste li ga postigli.' },
        { q: 'Rast kamata na kredite je koji PEST faktor?', options: ['Politički', 'Ekonomski', 'Tehnološki'], answer: 1, why: 'Kamate su cijena novca i utiču na troškove i kupovnu moć — ekonomski faktor.' },
        { q: 'Kad je moć kupaca visoka?', options: ['Kad kupci lako prelaze kod konkurencije', 'Kad imate malo dobavljača', 'Kad je tržište novo'], answer: 0, why: 'Ako kupac lako ode drugome, on diktira cijenu i uslove.' },
        { q: 'U SWOT analizi, snage i slabosti su:', options: ['Vanjski faktori', 'Unutrašnji faktori', 'Isto što i prilike'], answer: 1, why: 'Snage i slabosti su unutar vašeg biznisa i možete ih mijenjati. Prilike i prijetnje dolaze izvana.' },
      ]} />

      <Checklist
        moduleId={3}
        title="Vaš zadatak"
        intro="Prije sljedećeg modula:"
        items={[
          'Napisao/la sam viziju u jednoj rečenici',
          'Postavio/la sam 3 SMART cilja',
          'Ocijenio/la sam Porterovih 5 sila za svoje tržište',
          'Popunio/la sam SWOT i odgovorio/la na pitanja strategije',
        ]}
      />

      <NextCta nextN={4} nextTitle="Marketing i operacije" />
    </LearnPage>
  )
}
