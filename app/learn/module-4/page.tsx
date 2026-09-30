'use client'
import React from 'react'
import { P, Example, Accordion, Icons, BigIcons, T } from '../LearnComponents'
import { LessonModule, Lesson, ExamQuestion } from '../LessonModule'
import { RevealGrid, ScenarioPicker, BudgetAllocator, StepWalkthrough } from '../LearnWidgets'

const b = (t: string) => <strong style={{ color: T.navy }}>{t}</strong>
const em = (t: string) => <em style={{ fontStyle: 'italic', color: T.navy }}>{t}</em>
const h3: React.CSSProperties = { fontSize: '17px', fontWeight: 700, margin: '28px 0 8px' }

const LESSONS: Lesson[] = [
  // ─────────────────────────────── 1
  {
    title: 'Marketing nije samo reklama',
    subtitle: 'Prije nego potrošite prvu marku na oglase, morate znati šta govorite i kome.',
    body: (
      <>
        <P>Kad se kaže marketing, većina pomisli na oglase. Oglasi su zadnji korak. Marketing je sve što radite da kupac sazna za vas, poželi ono što nudite i vrati se ponovo — a to uključuje i cijenu, i izgled prostora, i način na koji se javljate na telefon.</P>

        <P>Zato oglašavanje bez jasne poruke gotovo uvijek bude bacanje novca. Možete platiti da vas vidi pet hiljada ljudi, ali ako ne razumiju zašto bi im to trebalo, nijedan neće doći.</P>

        <h3 style={h3}>Poruka govori o kupcu, ne o vama</h3>
        <P>Ovo je najkorisnije pravilo u cijelom modulu: {b('ne prodajete bušilicu, prodajete rupu u zidu.')} Kupac ne kupuje ono što vi pravite — kupuje ono što će time dobiti.</P>
        <P>{em('„Koristimo italijansku peć i brašno tip 500”')} govori o vama. {em('„Hljeb koji je još topao kad ga donesete kući”')} govori o kupcu. Prva rečenica je istinita i vrijedi je spomenuti u planu, ali u opisu opreme, ne u poruci.</P>

        <h3 style={h3}>Tri pitanja koja definišu poruku</h3>
        <P>{b('Kome govorite?')} Profil kupca iz Modula 2 je već tu. Poruka za mladu porodicu i poruka za vlasnika kafića nisu iste, čak i kad prodajete isti hljeb.</P>
        <P>{b('Šta im obećavate?')} Jedna konkretna korist, ne tri. Poruke s više obećanja se ne pamte.</P>
        <P>{b('Zašto bi vam vjerovali?')} Ovdje ide dokaz — iskustvo, recenzije, garancija, cijena koja je vidljiva, mogućnost da probaju. Obećanje bez dokaza zvuči kao svaka druga reklama.</P>

        <Example label="Provjera poruke">Napišite poruku i pokažite je nekome ko ne zna vaš posao. Ako nakon čitanja ne može reći šta nudite i kome, poruka još nije gotova. Ako može, a nije zainteresovan — to je u redu, znači da nije vaš kupac.</Example>

        <P>Kada poruka postoji, izbor kanala postaje mnogo lakši, jer znate koga tražite. To je sljedeći dio modula.</P>
      </>
    ),
    check: {
      q: 'Koja od ovih rečenica je dobra marketinška poruka?',
      options: [
        'Koristimo italijansku peć i brašno vrhunskog kvaliteta',
        'Hljeb koji je još topao kad ga donesete kući',
        'Naša pekara posluje po najvišim standardima',
      ],
      answer: 1,
      why: 'Druga rečenica govori o koristi koju kupac osjeti. Prva govori o opremi, treća je fraza koju može napisati bilo ko — nijedna ne daje kupcu razlog da dođe.',
    },
  },

  // ─────────────────────────────── 2
  {
    title: '7P marketing miks',
    subtitle: 'Sedam poluga koje zajedno određuju kako vas kupac doživljava.',
    body: (
      <>
        <P>Marketing miks je način da provjerite jeste li nešto zaboravili. Klasična četiri elementa — proizvod, cijena, mjesto i promocija — nastala su za robu. Za usluge su dodana još tri, jer kod usluge kupac doživljava i ljude, i proces, i prostor u kojem se sve dešava.</P>

        <P>Kliknite svaki blok da vidite šta se pod njim podrazumijeva:</P>

        <RevealGrid
          title="Sedam elemenata"
          hint="Kliknite svaki blok"
          blocks={[
            { title: 'Proizvod', desc: 'Šta nudite, u kojim varijantama, s kakvom ambalažom i garancijom.' },
            { title: 'Cijena', desc: 'Koliko naplaćujete, kakvi su popusti, rokovi i načini plaćanja.' },
            { title: 'Mjesto', desc: 'Gdje i kako kupac dolazi do proizvoda — lokal, dostava, online.' },
            { title: 'Promocija', desc: 'Kako komunicirate: oglasi, mreže, preporuke, odnosi s javnošću.' },
            { title: 'Ljudi', desc: 'Vi i svako ko je u kontaktu s kupcem. Kod usluga ovo je često presudno.' },
            { title: 'Procesi', desc: 'Kako teče iskustvo od narudžbe do isporuke i koliko je predvidivo.' },
            { title: 'Fizički dokazi', desc: 'Vidljivi znakovi kvaliteta: izgled prostora, ambalaža, web stranica, uredna faktura, recenzije.', span: 3 },
          ]}
        />

        <h3 style={h3}>Elementi moraju govoriti istu priču</h3>
        <P>Najveća vrijednost 7P nije u popunjavanju sedam polja, nego u provjeri da se ne protivrječe. Visoka cijena uz zapušten prostor, ili obećanje brze usluge uz proces koji traje sedmicu — kupac takve neslaganosti osjeti odmah, čak i kad ih ne umije imenovati.</P>

        <P>{b('Praktična provjera:')} uzmite strategiju razlikovanja koju ste odabrali u Modulu 2 i pročitajte svih sedam elemenata kroz nju. Ako ste izabrali kvalitet, mora se vidjeti u cijeni, u prostoru, u ambalaži i u ljudima. Ako se vidi samo u jednom, priča ne stoji.</P>

        <Example label="Za mali biznis">Ne morate biti izvrsni u svih sedam. Trebate biti {em('dosljedni')} u svih sedam i izvrsni u jednom ili dva koja nose vašu prednost.</Example>
      </>
    ),
    check: {
      q: 'Zašto su klasičnim 4P dodana još tri elementa?',
      options: [
        'Zato što kod usluga kupac doživljava i ljude, proces i prostor, ne samo proizvod',
        'Zato što su četiri elementa bila premalo za velike kompanije',
        'Zato što je to zahtjev savremenih digitalnih kanala',
      ],
      answer: 0,
      why: 'Kod usluge se proizvod stvara pred kupcem. Ko ga uslužuje, kako teče proces i kako prostor izgleda postaju dio onoga što kupuje.',
    },
  },

  // ─────────────────────────────── 3
  {
    title: 'Kanali i marketinški budžet',
    subtitle: 'Mali biznis ne mora biti svugdje. Mora biti tamo gdje su njegovi kupci — i to raditi dosljedno.',
    body: (
      <>
        <P>Najčešća greška u marketingu malog biznisa nije loš kanal nego previše kanala. Sa tri stotine maraka mjesečno raspoređenih na pet mjesta, svaki kanal dobije toliko malo da nigdje ne napravi razliku. Isti novac na jednom ili dva kanala može dati vidljiv rezultat.</P>

        <P>Isprobajte to sami. Postavite budžet i raspodijelite ga — sistem će vam reći gdje raspodjela ne drži vodu:</P>

        <BudgetAllocator />

        <h3 style={h3}>Tri pravila koja stoje iza tih upozorenja</h3>
        <P>{b('Ne više od 70% u jedan kanal.')} Ako taj kanal ne upali ili poskupi, ostajete bez dotoka kupaca. Uvijek zadržite 20 do 30% za drugi kanal.</P>
        <P>{b('Ne više od dva-tri kanala s malim budžetom.')} Ispod otprilike 800 KM mjesečno, četiri kanala znači da nijedan nema dovoljno da bude primijećen.</P>
        <P>{b('Mjerite i prebacujte.')} Nakon dva do tri mjeseca vidjet ćete koji kanal stvarno donosi kupce. Tada novac ide tamo. Plan koji kaže da ćete mjeriti i prilagođavati djeluje ozbiljnije od onog koji tvrdi da zna unaprijed.</P>

        <h3 style={h3}>Kako uopšte znati koji kanal radi</h3>
        <P>Ne treba vam softver. Dovoljno je pitati svakog novog kupca {em('„kako ste čuli za nas?”')} i zapisivati crticu na papir. Nakon mjesec dana imate podatak koji vrijedi više od bilo koje procjene.</P>

        <P>Gdje početi zavisi od toga gdje se vaš kupac već nalazi. Odaberite ono što najviše liči na vaš slučaj:</P>

        <ScenarioPicker
          title="Vaši kupci su najčešće…"
          options={[
            { id: 'drustvene', label: 'Na mrežama', icon: BigIcons.globe, advice: <><strong>Društvene mreže.</strong> Najbolje rade za vizuelne proizvode i mlađu publiku. Instagram i TikTok za krajnje kupce, LinkedIn za prodaju firmama. Ključ nije budžet nego redovnost — profil s tri objave sedmično nadmašuje profil s jednim skupim oglasom. Računajte i vrijeme koje sami ulažete, jer i ono je trošak.</> },
            { id: 'lokalno', label: 'U kraju', icon: BigIcons.target, advice: <><strong>Lokalno.</strong> Za sve što zavisi od lokacije — kafići, saloni, radnje, servisi. Najisplativije je ono što mnogi preskoče: uredan Google profil s tačnim radnim vremenom i fotografijama, jer većina ljudi prvo tu pogleda. Uz to letci u krugu od nekoliko ulica i saradnja sa susjednim biznisima.</> },
            { id: 'preporuke', label: 'Kroz preporuke', icon: BigIcons.star, advice: <><strong>Preporuke.</strong> Najjeftiniji kanal i najuvjerljiviji, ali se ne dešava sam. Potaknite ga: tražite recenziju odmah nakon dobre usluge, dajte popust onome ko dovede novog kupca, zapamtite imena stalnih kupaca. Sporije raste od oglasa, ali ne prestaje kad prestanete plaćati.</> },
          ]}
        />
      </>
    ),
    check: {
      q: 'Imate 400 KM mjesečno za marketing. Šta je najpametnije?',
      options: [
        'Podijeliti ih na pet kanala da pokrijete što više ljudi',
        'Uložiti sve u jedan kanal i ostati na njemu bez obzira na rezultat',
        'Fokusirati se na dva-tri kanala, mjeriti šta donosi kupce i prebaciti novac tamo',
      ],
      answer: 2,
      why: 'S malim budžetom rasut na pet strana nijedan kanal ne dobije dovoljno da bude primijećen. Dva-tri kanala uz mjerenje daju i rezultat i podatak na osnovu kojeg dalje odlučujete.',
    },
  },

  // ─────────────────────────────── 4
  {
    title: 'Poslovni proces: od narudžbe do zadovoljnog kupca',
    subtitle: 'Operacije su „kako” vašeg biznisa. Ovdje se vidi znate li zaista izvesti ono što ste obećali.',
    body: (
      <>
        <P>Kada u planu opišete proces, čitalac vidi dvije stvari: da ste razmislili o izvedbi i koliki vam je stvarni kapacitet. Oboje utiče na finansije, jer kapacitet ograničava prihod, a koraci u procesu stvaraju troškove.</P>

        <P>Prođite kroz tipičan proces korak po korak. Uz svaki korak stoji pitanje na koje treba odgovoriti u svom planu:</P>

        <StepWalkthrough
          title="Od narudžbe do zadovoljnog kupca"
          hint="Kliknite korake ili koristite dugmad ispod"
          steps={[
            { title: 'Narudžba', desc: 'Kupac vas kontaktira — u radnji, telefonom, porukom ili preko weba. Što je lakše naručiti, to više narudžbi stiže. Najčešće se gubi upravo ovdje: neodgovorena poruka je izgubljen kupac.', ask: 'Kojim kanalima se može naručiti i ko prima narudžbe kada ste zauzeti?' },
            { title: 'Plaćanje', desc: 'Dogovarate cijenu i način plaćanja: gotovina, kartica, avans ili odgođeno plaćanje. Ovaj korak direktno određuje vaš novčani tok — isto plaćanje trideset dana kasnije je sasvim druga situacija.', ask: 'Tražite li avans i koliko dana kupci imaju za plaćanje?' },
            { title: 'Nabavka', desc: 'Obezbjeđujete materijal ili robu. Ovdje nastaje rizik zavisnosti: jedan dobavljač znači da njegov zastoj postaje vaš zastoj.', ask: 'Ko su dobavljači, koliko traje isporuka i imate li rezervnog?' },
            { title: 'Izrada', desc: 'Proizvodite ili izvršavate uslugu. Ovdje se troši najviše vremena i materijala, pa se ovdje najviše i dobija na efikasnosti.', ask: 'Koliko traje izrada i koliko narudžbi mjesečno realno stižete?' },
            { title: 'Kontrola', desc: 'Provjeravate kvalitet prije nego što proizvod ode kupcu. Greška uhvaćena ovdje košta materijal; greška uhvaćena kod kupca košta kupca.', ask: 'Kako provjeravate kvalitet i ko je za to odgovoran?' },
            { title: 'Isporuka', desc: 'Proizvod stiže do kupca — lično, dostavom ili digitalno. Rok isporuke je dio obećanja i lakše ga je ispuniti nego popraviti kad ga prekršite.', ask: 'Kako isporučujete i koliko to košta po narudžbi?' },
            { title: 'Podrška i povratak', desc: 'Nakon prodaje: pitanja, reklamacije, ponovna kupovina. Zadržati kupca je višestruko jeftinije nego naći novog, a ovaj korak se u planovima najčešće preskoči.', ask: 'Kako ostajete u kontaktu i šta radite s reklamacijama?' },
          ]}
        />

        <Example label="Kako ovo ulazi u plan">Ne treba vam dijagram na dvije stranice. Dovoljan je pasus koji prati ovih sedam koraka, uz dvije brojke: koliko traje jedan ciklus i koliko ih mjesečno možete odraditi. Ta druga brojka je gornja granica vašeg prihoda.</Example>
      </>
    ),
    check: {
      q: 'Zašto opis poslovnog procesa utiče na finansijski dio plana?',
      options: [
        'Jer kapacitet procesa određuje gornju granicu prihoda, a koraci stvaraju troškove',
        'Jer duži opis procesa povećava ocjenu plana',
        'Jer se proces mora prikazati kao dijagram',
      ],
      answer: 0,
      why: 'Ako mjesečno možete odraditi 200 narudžbi, prihod ne može biti veći od toga koliko god tržište tražilo. Zato kapacitet i rokovi plaćanja ulaze pravo u projekcije.',
    },
  },

  // ─────────────────────────────── 5
  {
    title: 'Tim, lokacija i pravni oblik',
    subtitle: 'Tri odluke koje se lako preskoče u planu, a skupo koštaju kad se pogriješe.',
    body: (
      <>
        <P>Ovo su stvari koje djeluju administrativno, ali svaka od njih mijenja vaše troškove i obaveze. Zato ulaze u plan prije finansija, a ne poslije.</P>

        <Accordion items={[
          { num: '1', title: 'Tim i uloge', body: <>
            <p style={{ margin: '0 0 10px' }}>Čak i ako počinjete sami, opišite uloge, a ne imena. Ko prima narudžbe, ko proizvodi, ko vodi papirologiju, ko prodaje. Na početku ćete u većini uloga biti vi — i upravo zato je korisno vidjeti ih nabrojane.</p>
            <p style={{ margin: '0 0 10px' }}>Taj spisak odmah pokaže dvije stvari: koliko sati dnevno posao zaista traži i koja uloga prva mora biti popunjena kad narastete.</p>
            <p style={{ margin: 0 }}>U planu navedite i kada planirate prvo zaposlenje i po kojem kriteriju — na primjer, kada broj narudžbi pređe određenu granicu. To pokazuje da rast niste zamislili kao čudo nego kao posljedicu.</p>
          </> },
          { num: '2', title: 'Lokacija i oprema', body: <>
            <p style={{ margin: '0 0 10px' }}>Za neke biznise lokacija je presudna, za druge gotovo nebitna. Pekara živi od prolaza; serviser koji izlazi na teren ne treba skupu ulicu. Prvo odlučite kojoj grupi pripadate, pa tek onda tražite prostor.</p>
            <p style={{ margin: '0 0 10px' }}>Najam ili kupovina: najam čuva gotovinu i ostavlja prostor za grešku, kupovina veže veliki kapital na početku. Za prvi biznis najam je gotovo uvijek razumniji.</p>
            <p style={{ margin: 0 }}>Kod opreme razdvojite ono bez čega ne možete početi od onoga što može čekati šest mjeseci. Ta podjela direktno smanjuje iznos koji morate obezbijediti na startu — a to je pitanje iz sljedećeg modula.</p>
          </> },
          { num: '3', title: 'Pravni oblik registracije', body: <>
            <p style={{ margin: '0 0 10px' }}>Izbor između obrta i društva s ograničenom odgovornošću nije formalnost. Razlikuju se po tome ko odgovara za dugove, kako se oporezuju, koliko košta knjigovodstvo i koliko papirologije nose.</p>
            <p style={{ margin: '0 0 10px' }}>Obrt je jednostavniji i jeftiniji za vođenje, ali vlasnik odgovara cijelom svojom imovinom. Kod d.o.o. je odgovornost ograničena na uloženo, ali su obaveze i troškovi vođenja veći.</p>
            <p style={{ margin: 0 }}>Pravila i stope se razlikuju po entitetima i kantonima i mijenjaju se, pa konkretne iznose provjerite kod knjigovođe ili u nadležnoj službi prije nego ih upišete u plan. U planu navedite koji oblik birate i zašto — taj izbor kasnije određuje poreze i doprinose u projekcijama.</p>
          </> },
        ]} />

        <Example label="Veza s Modulom 5">Sve tri odluke postaju brojke u finansijama: uloge postaju troškovi plata, oprema postaje ulaganje i amortizacija, pravni oblik određuje poreze i doprinose.</Example>
      </>
    ),
    check: {
      q: 'Zašto je za prvi biznis najam prostora obično razumniji od kupovine?',
      options: [
        'Jer je najam uvijek jeftiniji od kupovine na duži rok',
        'Jer čuva gotovinu i ostavlja prostor za grešku, dok kupovina veže veliki kapital odmah',
        'Jer se prostor u najmu ne mora uređivati',
      ],
      answer: 1,
      why: 'Na početku je gotovina najvredniji resurs, a procjene su najnesigurnije. Najam ostavlja mogućnost da promijenite lokaciju ili veličinu bez velikog gubitka.',
    },
  },
]

const EXAM: ExamQuestion[] = [
  { lesson: 0, q: 'Na šta se fokusira dobra marketinška poruka?', options: ['Na korist koju kupac dobija', 'Na tehničke osobine proizvoda', 'Na historiju firme'], answer: 0 },
  { lesson: 0, q: 'Koliko obećanja treba nositi jedna poruka?', options: ['Jedno konkretno', 'Najmanje tri, da pokrije više kupaca', 'Što više, to bolje'], answer: 0 },
  { lesson: 0, q: 'Šta znači „ne prodajete bušilicu, prodajete rupu u zidu”?', options: ['Da treba sniziti cijenu alata', 'Da kupac kupuje rezultat, a ne proizvod sam po sebi', 'Da je bolje prodavati usluge nego proizvode'], answer: 1 },
  { lesson: 1, q: 'Koja tri elementa su dodana klasičnim 4P?', options: ['Ljudi, procesi, fizički dokazi', 'Partneri, prihodi, pozicija', 'Plan, praćenje, profit'], answer: 0 },
  { lesson: 1, q: 'Koja je najveća vrijednost 7P analize?', options: ['Popunjavanje svih sedam polja', 'Provjera da elementi ne protivrječe jedan drugom', 'Poređenje s konkurencijom'], answer: 1 },
  { lesson: 2, q: 'Zašto nije dobro uložiti više od 70% budžeta u jedan kanal?', options: ['Jer je to zakonsko ograničenje oglašavanja', 'Jer ostajete bez kupaca ako taj kanal prestane raditi', 'Jer veliki kanali traže minimalni ugovor'], answer: 1 },
  { lesson: 2, q: 'Kako mali biznis najjednostavnije mjeri koji kanal donosi kupce?', options: ['Kupovinom analitičkog softvera', 'Pitanjem „kako ste čuli za nas?” uz zapisivanje odgovora', 'Procjenom na kraju godine'], answer: 1 },
  { lesson: 2, q: 'Šta je najisplativije za biznis vezan za lokaciju?', options: ['Uredan Google profil s tačnim informacijama i fotografijama', 'Televizijska reklama', 'Profil na svim postojećim mrežama'], answer: 0 },
  { lesson: 3, q: 'Koja brojka iz opisa procesa predstavlja gornju granicu prihoda?', options: ['Broj zaposlenih', 'Mjesečni kapacitet — koliko narudžbi realno možete odraditi', 'Broj kanala prodaje'], answer: 1 },
  { lesson: 3, q: 'Zašto je rok plaćanja dio poslovnog procesa važan za plan?', options: ['Jer direktno određuje novčani tok', 'Jer utiče na cijenu materijala', 'Jer ga banke propisuju'], answer: 0 },
  { lesson: 4, q: 'Zašto se u planu navode uloge, a ne imena zaposlenih?', options: ['Jer start-up tek treba naći ljude, a uloge pokazuju koliko posao zaista traži', 'Jer su imena zaštićena propisima', 'Jer uloge zvuče profesionalnije'], answer: 0 },
  { lesson: 4, q: 'Šta je ključna razlika između obrta i d.o.o.?', options: ['Obrt ne može zapošljavati radnike', 'Opseg odgovornosti vlasnika za obaveze i način oporezivanja', 'D.o.o. ne plaća doprinose'], answer: 1 },
]

export default function Module4() {
  return (
    <LessonModule
      moduleId={4}
      n={4}
      title="Marketing i operacije"
      desc="Odličan proizvod nije dovoljan ako niko ne zna za njega. Naučite kako oblikovati poruku, gdje uložiti novac i kako organizovati posao da sve teče glatko."
      meta={[
        { icon: Icons.clock, text: '~28 minuta' },
        { icon: Icons.book, text: '5 lekcija' },
        { icon: Icons.tool, text: 'Planer budžeta i procesa' },
      ]}
      goals={[
        'Kako oblikovati poruku koja govori o kupcu, a ne o vama',
        '7P marketing miks i zašto elementi moraju govoriti istu priču',
        'Kako rasporediti mali marketinški budžet i mjeriti šta radi',
        'Kako opisati proces od narudžbe do isporuke i izračunati kapacitet',
        'Tim, lokacija i pravni oblik — tri odluke koje ulaze u finansije',
      ]}
      lessons={LESSONS}
      exam={EXAM}
      taskTitle="Vaš zadatak"
      taskIntro="Prije sljedećeg modula pripremite ove elemente (napredak se čuva):"
      tasks={[
        'Napisao/la sam glavnu poruku: kome, šta obećavam i zašto bi mi vjerovali',
        'Prošao/la sam svih 7 elemenata miksa i provjerio/la da se ne protivrječe',
        'Odabrao/la sam 2 do 3 kanala i odredio/la mjesečni budžet',
        'Znam kako ću mjeriti koji kanal donosi kupce',
        'Opisao/la sam proces od narudžbe do isporuke',
        'Izračunao/la sam mjesečni kapacitet — koliko narudžbi realno stižem',
        'Odlučio/la sam o pravnom obliku i provjerio/la obaveze koje nosi',
      ]}
      nextN={5}
      nextTitle="Finansije i rizici"
    />
  )
}
