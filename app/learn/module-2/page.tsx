'use client'
import React from 'react'
import { P, Example, Tabs, Icons, BigIcons, T } from '../LearnComponents'
import { LessonModule, Lesson, ExamQuestion } from '../LessonModule'
import { RevealGrid, ScenarioPicker, PersonaBuilder, CanvasBuilder, SortBuckets } from '../LearnWidgets'

const b = (t: string) => <strong style={{ color: T.navy }}>{t}</strong>
const em = (t: string) => <em style={{ fontStyle: 'italic', color: T.navy }}>{t}</em>
const h3: React.CSSProperties = { fontSize: '17px', fontWeight: 700, margin: '28px 0 8px' }

const LESSONS: Lesson[] = [
  // ─────────────────────────────── 1
  {
    title: 'Zašto se analiza tržišta radi prije, a ne poslije',
    subtitle: 'Većina biznisa ne propadne zato što je proizvod loš, nego zato što ga premalo ljudi treba dovoljno da bi platili.',
    body: (
      <>
        <P>Preduzetnici obično krenu obrnutim redom: prvo naprave proizvod, pa onda traže kome da ga prodaju. To je skup način da se uči, jer novac i vrijeme već budu potrošeni kad se otkrije da potražnje nema.</P>

        <P>Analiza tržišta je pokušaj da taj rizik smanjite prije nego uložite. Ona ne daje sigurnost — ništa je ne daje — ali razlikuje pretpostavku od provjerene činjenice. A upravo pretpostavke koje niko nije provjerio ruše planove.</P>

        <P>Cijela analiza svodi se na tri pitanja:</P>

        <P>{b('Koliko je tržište veliko?')} Ne u smislu „svi u Bosni i Hercegovini”, nego koliko ljudi realno može doći do vas i platiti. Za pekaru u naselju to je broj domaćinstava u krugu od nekoliko ulica, a ne broj stanovnika grada.</P>

        <P>{b('Ko su kupci?')} Ne demografska kategorija, nego ljudi s konkretnim navikama: kada kupuju, koliko troše, šta im je važno, gdje traže informacije.</P>

        <P>{b('Ko je konkurencija?')} Svako ko već rješava isti problem tim istim ljudima — a to je gotovo uvijek širi krug nego što se na prvu čini.</P>

        <h3 style={h3}>Istraživanje ne mora koštati</h3>
        <P>Kada se kaže „istraživanje tržišta”, ljudi zamišljaju skupu agenciju. Za mali biznis dovoljno je nekoliko jeftinih i brzih metoda:</P>
        <P>{b('Razgovor s dvadesetak potencijalnih kupaca.')} Ne pitajte {em('„da li biste ovo kupili?”')} — svi iz pristojnosti kažu da. Pitajte kako danas rješavaju taj problem, koliko ih to košta i šta ih najviše nervira. Odgovori na ta pitanja su upotrebljivi.</P>
        <P>{b('Posmatranje konkurencije na terenu.')} Sjednite preko puta konkurentskog lokala i brojte koliko ljudi uđe u sat vremena, u koje doba je gužva, šta nose kad izađu. To je stvarni podatak o potražnji, besplatan.</P>
        <P>{b('Javni podaci.')} Agencija za statistiku, popis stanovništva, podaci općine o broju registrovanih firmi u djelatnosti. Grubo, ali bolje od nagađanja.</P>

        <Example label="Iz prakse">Tržište ne mora biti veliko da bi biznis bio uspješan. Mnogo je lakše zauzeti jasno definisan mali prostor nego se boriti za mrvicu velikog. Plan koji pošteno kaže {em('„naše tržište je oko 400 domaćinstava”')} djeluje ozbiljnije od onog koji tvrdi da cilja cijelu zemlju.</Example>
      </>
    ),
    check: {
      q: 'Pitate potencijalne kupce da li bi kupili vaš proizvod i skoro svi kažu da. Zašto to nije dobar dokaz potražnje?',
      options: [
        'Zato što ljudi iz pristojnosti potvrđuju — korisnije je pitati kako danas rješavaju problem i koliko ih to košta',
        'Zato što je uzorak od dvadeset ljudi premali za bilo kakav zaključak',
        'Zato što se potražnja može utvrditi jedino kroz zvaničnu statistiku',
      ],
      answer: 0,
      why: 'Hipotetično „da” ne košta ništa. Pitanja o tome šta kupac danas radi i plaća otkrivaju stvarno ponašanje, a ono je mnogo bolji pokazatelj od namjere.',
    },
  },

  // ─────────────────────────────── 2
  {
    title: 'Upoznajte svog kupca',
    subtitle: 'Dok je kupac apstraktna grupa, svaka odluka je pogađanje. Kada postane konkretna osoba, odluke se donose same.',
    body: (
      <>
        <P>Razlika između {em('„žene od 25 do 45 godina”')} i {em('„Amra, 32, vlasnica frizerskog salona u Mostaru, nema vremena za društvene mreže”')} nije u stilu pisanja. Prva vam ne govori ništa o tome gdje da se oglašavate ni šta da napišete. Druga vam govori oboje.</P>

        <P>Kupca opisujemo kroz četiri dimenzije. Kliknite svaku da vidite šta konkretno istražiti:</P>

        <RevealGrid
          title="Četiri dimenzije kupca"
          hint="Kliknite svaki blok"
          blocks={[
            { title: 'Demografija', desc: 'Dob, spol, prihod, obrazovanje, veličina domaćinstva. Osnovni okvir — ali sam po sebi nedovoljan.' },
            { title: 'Geografija', desc: 'Gdje živi i radi. Grad, naselje, koliko je spreman putovati do vas.' },
            { title: 'Psihografija', desc: 'Vrijednosti, stil života, interesi. Zašto bira ono što bira.' },
            { title: 'Ponašanje', desc: 'Gdje i koliko često kupuje, šta pokreće kupovinu, koliko je lojalan i šta bi ga natjeralo da promijeni dobavljača.', span: 3 },
          ]}
        />

        <P>Od te četiri, {b('ponašanje je najkorisnije, a najčešće preskočeno.')} Dvoje ljudi istih godina i prihoda mogu se ponašati potpuno različito — jedan kupuje unaprijed i planski, drugi u zadnji čas. Prodajete im na različit način.</P>

        <h3 style={h3}>Napravite profil</h3>
        <P>Sada to primijenite. Zamislite jednu stvarnu osobu — ne prosjek, nego nekog koga možete opisati. Kartica desno se popunjava dok pišete i ostaje sačuvana:</P>

        <PersonaBuilder />

        <P>Kada profil bude gotov, provjerite ga jednim pitanjem: {b('možete li navesti ime nekoga koga poznajete, a ko odgovara ovom opisu?')} Ako možete, profil je stvaran. Ako ne možete nikoga sjetiti, vjerovatno ste opisali kupca kakvog biste željeli, a ne kakav postoji.</P>

        <Example label="Koliko profila?">Za početak jedan, najviše dva. Većina malih biznisa ima jednu glavnu grupu kupaca koja donosi najveći dio prihoda. Tri i više profila obično znači da odluka o ciljanju još nije donesena.</Example>
      </>
    ),
    check: {
      q: 'Koja od četiri dimenzije kupca najviše govori o tome kako ćete mu prodavati?',
      options: [
        'Demografija — dob i prihod određuju kupovnu moć',
        'Ponašanje — kada, gdje i zašto kupuje',
        'Geografija — udaljenost od vaše lokacije',
      ],
      answer: 1,
      why: 'Dvoje ljudi istih godina i prihoda mogu kupovati na potpuno različite načine. Ponašanje vam govori kada ga uhvatiti, gdje ga naći i šta ga pokreće — a to su odluke koje pravite svaki dan.',
    },
  },

  // ─────────────────────────────── 3
  {
    title: 'Business Model Canvas',
    subtitle: 'Jedna stranica koja pokazuje kako biznis zarađuje — i gdje puca ako nešto ne štima.',
    body: (
      <>
        <P>Canvas je alat koji cijeli poslovni model svodi na devet polja. Popularan je jer natjera da se sve vidi odjednom, pa se nelogičnosti same pokažu: obećavate ličnu uslugu svakom kupcu, a u resursima imate jednog zaposlenog i pet hiljada kupaca mjesečno.</P>

        <P>Devet blokova dijeli se na dvije strane. {b('Desna strana je tržište')} — kupci, vrijednost koju im dajete, kako do njih dolazite i kako naplaćujete. {b('Lijeva strana je pogon')} — šta vam treba, šta radite i s kim sarađujete da biste to isporučili. Na dnu se sve svodi na troškove i prihode.</P>

        <h3 style={h3}>Redoslijed je važan</h3>
        <P>Canvas se ne popunjava slijeva nadesno. Počinje se od {b('bloka 1 i 2 — kupca i vrijednosne ponude')}, jer oni određuju sve ostalo. Ako promijenite kupca, mijenjaju se i kanali, i resursi, i struktura troškova. Zato brojevi u alatu ispod idu redom kojim treba razmišljati, a ne redom kojim polja stoje na stranici.</P>

        <P>Kliknite blok da ga popunite. Ako zapnete, prebacite se na primjer pekare i pogledajte kako izgleda popunjen Canvas, pa se vratite na svoj:</P>

        <CanvasBuilder />

        <h3 style={h3}>Dva bloka koja se najčešće popune pogrešno</h3>
        <P>{b('Vrijednosna ponuda')} nije opis proizvoda. To je razlog zbog kojeg kupac bira vas. {em('„Domaći hljeb”')} je proizvod; {em('„topao hljeb od šest ujutro, bez aditiva, na dvije minute hoda”')} je vrijednost.</P>
        <P>{b('Ključni partneri')} nisu spisak svih s kim sarađujete. To su oni bez kojih model ne radi — dobavljač bez kojeg staje proizvodnja, kafić koji uzima polovinu vaše dnevne proizvodnje. Ako partnera možete zamijeniti za dan, nije ključan.</P>

        <Example label="Provjera na kraju">Pročitajte Canvas naglas kao jednu priču: {em('„Za ove kupce rješavamo ovo, dolazimo do njih ovako, naplaćujemo ovako, a da bismo to mogli, treba nam ovo.”')} Ako priča ima rupu, vidjet ćete je odmah.</Example>
      </>
    ),
    check: {
      q: 'Zašto se Business Model Canvas popunjava počevši od korisničkih segmenata i vrijednosne ponude?',
      options: [
        'Zato što su to prva dva polja na standardnom obrascu',
        'Zato što su to blokovi koje banke najviše gledaju',
        'Zato što kupac i vrijednost određuju sve ostalo — kanale, resurse, troškove i prihode',
      ],
      answer: 2,
      why: 'Promijenite li kupca, mijenja se i način na koji do njega dolazite, šta vam treba i koliko košta. Zato se ta dva bloka rješavaju prvi, a ostatak se gradi oko njih.',
    },
  },

  // ─────────────────────────────── 4
  {
    title: 'Analiza konkurencije',
    subtitle: 'Konkurent nije samo onaj ko radi isto što i vi. To je svako ko rješava isti problem istom kupcu.',
    body: (
      <>
        <P>Kada preduzetnik kaže {em('„mi nemamo konkurenciju”')}, to skoro nikad ne znači da je tržište prazno. Obično znači da je krug gledanja postavljen preusko — brojali su samo firme koje rade potpuno isto.</P>

        <P>Kupac ne razmišlja u kategorijama djelatnosti. On ima problem i bira između svih načina da ga riješi. Zato konkurenciju dijelimo na tri kruga:</P>

        <Tabs tabs={[
          { label: 'Direktni', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Ista ponuda, isti kupci.')} Druga pekara u vašoj ulici.</p>
            <p style={{ margin: 0 }}>Ovo su konkurenti koje svi navedu. Kod njih se poredite po cijeni, kvalitetu, lokaciji i radnom vremenu — i tu se najlakše izgubi marža, jer je poređenje direktno.</p>
          </> },
          { label: 'Indirektni', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Isti problem, drugi format.')} Supermarket s pekarskim odjelom, benzinska pumpa s pecivima.</p>
            <p style={{ margin: 0 }}>Njih se najčešće zaboravi, a često odnose najveći dio kupaca — jer nude usput ono po što bi kupac inače morao posebno ići.</p>
          </> },
          { label: 'Zamjene', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Potpuno drugo rješenje iste potrebe.')} Kućna mašina za hljeb, ili doručak od žitarica umjesto peciva.</p>
            <p style={{ margin: 0 }}>Zamjene su najopasnije jer se pojave niotkuda i mijenjaju naviku. Kad se navika promijeni, cijelo tržište se smanji, bez obzira koliko ste dobri u odnosu na direktnu konkurenciju.</p>
          </> },
        ]} />

        <P>Razvrstajte konkurente jedne pekare u prava tri kruga. Prevucite stavku u kolonu — na mobitelu dodirnite stavku pa kolonu:</P>

        <SortBuckets
          title="Razvrstajte konkurente pekare"
          hint="Pogrešan izbor objasni zašto ne pripada tu"
          buckets={[
            { id: 'dir', label: 'Direktni', color: T.red, wash: T.redWash },
            { id: 'ind', label: 'Indirektni', color: T.goldDeep, wash: T.goldWash },
            { id: 'zam', label: 'Zamjene', color: T.blue, wash: T.blueWash },
          ]}
          items={[
            { text: 'Pekara u istoj ulici', bucket: 'dir', why: 'Ista ponuda istim kupcima — to je direktni konkurent.' },
            { text: 'Supermarket s pekarskim odjelom', bucket: 'ind', why: 'Nije pekara, ali kupcu rješava isti problem — indirektni konkurent.' },
            { text: 'Mašina za pečenje hljeba kod kuće', bucket: 'zam', why: 'Sasvim drugi način da se dođe do hljeba — to je zamjena.' },
            { text: 'Pekara u susjednom naselju', bucket: 'dir', why: 'Ista ponuda, samo malo dalje — i dalje direktni konkurent.' },
            { text: 'Benzinska pumpa koja prodaje peciva', bucket: 'ind', why: 'Prodaje peciva usput — isti problem, drugi format.' },
            { text: 'Doručak od žitarica umjesto peciva', bucket: 'zam', why: 'Zadovoljava istu potrebu bez hljeba — zamjena.' },
          ]}
        />

        <h3 style={h3}>Šta konkretno gledati kod konkurenta</h3>
        <P>Za svakog direktnog konkurenta zabilježite pet stvari: {b('cijene, radno vrijeme, lokaciju, šta kupci hvale i šta kupci kritikuju.')} Zadnje dvije su najvrednije, a nalaze se besplatno — u Google recenzijama i komentarima na društvenim mrežama. Ono na šta se kupci žale kod konkurencije je gotova lista vaših prilika.</P>

        <Example label="Praktično">Otvorite Google Maps, nađite tri najbliža konkurenta i pročitajte njihove recenzije sa dvije zvjezdice. Tu piše šta tržište traži, a ne dobija.</Example>
      </>
    ),
    check: {
      q: 'Otvarate pekaru. Supermarket u komšiluku prodaje hljeb na svom pekarskom odjelu. Kakav je to konkurent?',
      options: [
        'Direktni — prodaje isti proizvod',
        'Indirektni — rješava isti problem kupca, ali drugim formatom',
        'Nije konkurent jer mu pekarstvo nije osnovna djelatnost',
      ],
      answer: 1,
      why: 'Kupac ne bira po djelatnosti nego po tome gdje će riješiti potrebu. Supermarket mu nudi hljeb usput, pa vam odnosi kupce iako nije pekara.',
    },
  },

  // ─────────────────────────────── 5
  {
    title: 'Tržišna praznina i strategija razlikovanja',
    subtitle: 'Kad znate kupca i konkurenciju, ostaje pitanje gdje se tačno smještate između njih.',
    body: (
      <>
        <P>Tržišna praznina je prostor koji konkurencija ne pokriva dobro, a kupcima nedostaje. Ne mora biti nešto što niko ne radi — dovoljno je da postojeća ponuda tu radi loše.</P>

        <P>Prazninu najlakše pronađete presjekom dvije stvari koje ste već uradili: {b('onoga na šta se kupci žale u recenzijama konkurencije')} i {b('onoga što vi možete uraditi bolje od njih.')} Ako se ljudi žale da niko ne radi nedjeljom, a vi možete, to je praznina.</P>

        <h3 style={h3}>Tri načina da se razlikujete</h3>
        <P>U osnovi postoje tri strategije i {b('teško je voditi više od jedne istovremeno')} — jer se međusobno isključuju. Najjeftiniji i najkvalitetniji istovremeno obično znači da ste ni jedno ni drugo. Odaberite onu koja najbolje opisuje vaš slučaj:</P>

        <ScenarioPicker
          title="Vaša strategija razlikovanja"
          options={[
            { id: 'kvalitet', label: 'Kvalitet', icon: BigIcons.star, advice: <><strong>Strategija kvaliteta.</strong> Nudite bolje i naplaćujete više. Radi kada kupac razliku može osjetiti i kada mu je važna. U planu morate pokazati po čemu ste konkretno bolji — sastojci, materijal, iskustvo, garancija — jer sama tvrdnja „mi smo kvalitetniji” ne uvjerava nikoga. Rizik: uska grupa kupaca spremnih platiti više.</> },
            { id: 'cijena', label: 'Cijena', icon: BigIcons.coin, advice: <><strong>Strategija cijene.</strong> Ista vrijednost, jeftinije. Zahtijeva stvarno niže troškove — jeftiniju nabavku, manje režije, efikasniji proces. Ako nižu cijenu plaćate iz svoje marže umjesto iz nižih troškova, to nije strategija nego odgađanje problema. Za male firme najrizičnija, jer veći uvijek mogu izdržati duže.</> },
            { id: 'nisa', label: 'Niša', icon: BigIcons.target, advice: <><strong>Strategija niše.</strong> Fokus na usku grupu koju veliki zanemaruju — bezglutenski proizvodi, oprema za jednu djelatnost, usluga na jeziku koji drugi ne nude. Tržište je manje, ali konkurencija slabija, veza s kupcima jača, a cijena obično viša. Za mali biznis najčešće najbolji izbor.</> },
          ]}
        />

        <P>Šta god odabrali, to mora biti vidljivo kroz cijeli plan. Strategija niše koja u marketingu cilja svakoga, ili strategija kvaliteta s najjeftinijim dobavljačem — to su nesklad koje čitalac primijeti odmah.</P>

        <Example label="Veza s ostatkom plana">Ono što ste zaključili u ovom modulu ulazi direktno u Modul 3: praznine i prijetnje koje ste uočili postaju prilike i prijetnje u SWOT analizi, a konkurenti koje ste popisali ulaze u Porterovu analizu.</Example>
      </>
    ),
    check: {
      q: 'Preduzetnik u planu piše da je istovremeno najjeftiniji na tržištu i da nudi najviši kvalitet. Zašto je to slabost plana?',
      options: [
        'Zato što su to strategije koje se međusobno isključuju — niža cijena traži niže troškove, viši kvalitet ih podiže',
        'Zato što se u planu smije navesti samo jedna prednost',
        'Zato što kupci ne obraćaju pažnju na cijenu',
      ],
      answer: 0,
      why: 'Obje tvrdnje zajedno obično znače da nijedna nije istinita. Čitalac to prepozna i posumnja u ostatak plana, pa je bolje odabrati jednu strategiju i dosljedno je provesti.',
    },
  },
]

const EXAM: ExamQuestion[] = [
  { lesson: 0, q: 'Koji je najčešći razlog propasti malog biznisa?', options: ['Previsoki troškovi zakupa', 'Premalo ljudi treba proizvod dovoljno da bi ga platili', 'Nedovoljno zaposlenih'], answer: 1 },
  { lesson: 0, q: 'Koje pitanje potencijalnom kupcu daje najupotrebljiviji odgovor?', options: ['Biste li ovo kupili?', 'Sviđa li vam se ova ideja?', 'Kako danas rješavate taj problem i koliko vas to košta?'], answer: 2 },
  { lesson: 0, q: 'Šta znači realno procijeniti veličinu tržišta za pekaru u naselju?', options: ['Broj stanovnika cijele države', 'Broj domaćinstava koja realno mogu doći do vas', 'Broj svih pekara u zemlji'], answer: 1 },
  { lesson: 1, q: 'Koja dimenzija kupca najviše govori o tome kako ćete mu prodavati?', options: ['Ponašanje — kada, gdje i zašto kupuje', 'Demografija — dob i prihod', 'Geografija — udaljenost'], answer: 0 },
  { lesson: 1, q: 'Kako provjeriti je li profil kupca stvaran?', options: ['Provjeriti odgovara li statističkom prosjeku', 'Sjetiti se konkretne osobe koja odgovara opisu', 'Uporediti ga s profilom konkurencije'], answer: 1 },
  { lesson: 1, q: 'Koliko profila kupca je dovoljno za mali biznis na početku?', options: ['Jedan, najviše dva', 'Najmanje pet', 'Po jedan za svaki proizvod'], answer: 0 },
  { lesson: 2, q: 'Od kojih blokova se počinje popunjavati Business Model Canvas?', options: ['Od strukture troškova', 'Od korisničkih segmenata i vrijednosne ponude', 'Od ključnih partnera'], answer: 1 },
  { lesson: 2, q: 'Šta je vrijednosna ponuda?', options: ['Opis proizvoda i njegovih osobina', 'Razlog zbog kojeg kupac bira vas', 'Spisak cijena'], answer: 1 },
  { lesson: 2, q: 'Ko spada u ključne partnere?', options: ['Svi s kim ste ikada sarađivali', 'Oni bez kojih poslovni model ne funkcioniše', 'Isključivo dobavljači sirovina'], answer: 1 },
  { lesson: 3, q: 'Supermarket koji prodaje hljeb je za pekaru:', options: ['Direktni konkurent', 'Indirektni konkurent', 'Nije konkurent'], answer: 1 },
  { lesson: 3, q: 'Gdje najlakše saznate na šta se kupci žale kod konkurencije?', options: ['U njihovim finansijskim izvještajima', 'U recenzijama na Googleu i komentarima na mrežama', 'Kroz zvaničnu statistiku'], answer: 1 },
  { lesson: 4, q: 'Zašto tvrdnja da ste istovremeno najjeftiniji i najkvalitetniji slabi plan?', options: ['Zato što su to strategije koje se međusobno isključuju', 'Zato što se smije navesti samo jedna prednost', 'Zato što kupci ne gledaju cijenu'], answer: 0 },
]

export default function Module2() {
  return (
    <LessonModule
      moduleId={2}
      n={2}
      title="Analiza tržišta"
      desc="Prije nego uložite vrijeme i novac, morate razumjeti tržište: ko su kupci, ko je konkurencija i kako vaš biznis stvara i naplaćuje vrijednost."
      meta={[
        { icon: Icons.clock, text: '~30 minuta' },
        { icon: Icons.book, text: '5 lekcija' },
        { icon: Icons.tool, text: 'Canvas i profil kupca' },
      ]}
      goals={[
        'Zašto se analiza tržišta radi prije ulaganja i kako je uraditi bez budžeta',
        'Kako od apstraktne grupe napraviti konkretan profil kupca',
        'Kako popuniti svih devet blokova Business Model Canvasa i kojim redom',
        'Kako prepoznati direktnu, indirektnu i zamjensku konkurenciju',
        'Kako pronaći tržišnu prazninu i odabrati strategiju razlikovanja',
      ]}
      lessons={LESSONS}
      exam={EXAM}
      taskTitle="Vaš zadatak"
      taskIntro="Prije sljedećeg modula pripremite ove elemente (napredak se čuva):"
      tasks={[
        'Procijenio/la sam koliko je moje tržište realno veliko',
        'Razgovarao/la sam s najmanje pet potencijalnih kupaca',
        'Napravio/la sam profil idealnog kupca i mogu se sjetiti stvarne osobe koja mu odgovara',
        'Popunio/la sam svih 9 blokova Canvasa',
        'Popisao/la sam 3 direktna i 2 indirektna konkurenta',
        'Pročitao/la sam recenzije konkurencije i zapisao/la na šta se kupci žale',
        'Odabrao/la sam strategiju razlikovanja: kvalitet, cijena ili niša',
      ]}
      nextN={3}
      nextTitle="Strateška analiza"
    />
  )
}
