'use client'
import React from 'react'
import { P, Example, Tabs, Accordion, Icons, T } from '../LearnComponents'
import { LessonModule, Lesson, ExamQuestion } from '../LessonModule'
import { BreakEvenCalc, CashFlowSim, RiskMatrix, SortBuckets } from '../LearnWidgets'

const b = (t: string) => <strong style={{ color: T.navy }}>{t}</strong>
const em = (t: string) => <em style={{ fontStyle: 'italic', color: T.navy }}>{t}</em>
const h3: React.CSSProperties = { fontSize: '17px', fontWeight: 700, margin: '28px 0 8px' }

const LESSONS: Lesson[] = [
  // ─────────────────────────────── 1
  {
    title: 'Tri broja koja morate znati',
    subtitle: 'Finansije zvuče strašno, ali se sve svodi na tri pojma koja ljudi stalno miješaju.',
    body: (
      <>
        <P>Ne morate biti računovođa da biste napisali finansijski dio plana. Morate razumjeti nekoliko pojmova i biti pošteni prema brojkama. Računovođa dolazi kasnije; procjene i odluke su vaše.</P>

        <P>Počinjemo od tri pojma koja se u razgovoru stalno zamjenjuju, a znače potpuno različite stvari:</P>

        <Tabs tabs={[
          { label: 'Prihod', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Sav novac koji uđe od prodaje.')} Prodate 100 komada po 20 KM — prihod je 2.000 KM.</p>
            <p style={{ margin: 0 }}>Ovo je broj kojim se ljudi hvale i koji najmanje govori. Prihod ne kaže ništa o tome jeste li zaradili ili izgubili.</p>
          </> },
          { label: 'Trošak', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Sve što platite da biste poslovali')} — materijal, najam, plate, struja, gorivo, knjigovođa, kamate.</p>
            <p style={{ margin: 0 }}>Troškovi se dijele na fiksne i varijabilne, i ta podjela je toliko važna da joj je posvećena cijela sljedeća lekcija.</p>
          </> },
          { label: 'Zarada', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Ono što ostane: prihod minus troškovi.')} Jedini broj koji zaista govori posluje li biznis.</p>
            <p style={{ margin: 0 }}>Može biti i negativna — tada je gubitak. U prvoj godini gubitak nije neuobičajen, ali plan mora pokazati kada i kako prelazi u plus.</p>
          </> },
        ]} />

        <h3 style={h3}>Zašto visok prihod ne znači uspjeh</h3>
        <P>Firma s prihodom od 200.000 KM i troškovima od 210.000 KM posluje lošije od firme s prihodom od 60.000 KM i troškovima od 45.000 KM. Prva zvuči ozbiljnije i gubi novac; druga zvuči skromno i zarađuje.</P>
        <P>Zato u planu nikad ne navodite samo prihod. {b('Prihod bez troškova pored njega je broj bez značenja')} — i svaki iskusan čitalac plana to zna.</P>

        <h3 style={h3}>Tri pravila za procjene</h3>
        <P>{b('Prihode procijenite pesimistično, troškove optimistično.')} Stvarnost gotovo uvijek donese manje prihoda i više troškova nego prva procjena.</P>
        <P>{b('Svaku brojku morate umjeti objasniti.')} Ako vas neko pita odakle vam procjena od 3.000 KM mjesečno, odgovor {em('„tako sam procijenio”')} ruši povjerenje u cijeli plan.</P>
        <P>{b('Ostavite rezervu.')} Deset do dvadeset posto na ukupna ulaganja, za ono čega se sada ne možete sjetiti. Uvijek se nešto pojavi.</P>
      </>
    ),
    check: {
      q: 'Firma A ima prihod 200.000 KM i troškove 210.000 KM. Firma B prihod 60.000 KM i troškove 45.000 KM. Koja posluje bolje?',
      options: [
        'Firma A, jer ima veći prihod i veći promet',
        'Firma B, jer joj nakon troškova ostaje 15.000 KM',
        'Podjednako, jer se posluju u različitim veličinama',
      ],
      answer: 1,
      why: 'Firma A gubi 10.000 KM, firma B zarađuje 15.000 KM. Prihod pokazuje veličinu prometa, a ne uspjeh — o uspjehu govori tek ono što ostane.',
    },
  },

  // ─────────────────────────────── 2
  {
    title: 'Fiksni i varijabilni troškovi',
    subtitle: 'Podjela na kojoj počiva sve ostalo — prag rentabilnosti, cijena i planiranje rasta.',
    body: (
      <>
        <P>Svi troškovi se dijele na dvije grupe po jednom pitanju: {b('mijenja li se ovaj trošak kada prodam više ili manje?')}</P>

        <Accordion items={[
          { num: 'F', title: 'Fiksni troškovi', body: <>
            <p style={{ margin: '0 0 10px' }}>Ne mijenjaju se s količinom prodaje. Plaćate ih i kad ne prodate ništa: najam, fiksne plate, osiguranje, knjigovođa, pretplate, amortizacija.</p>
            <p style={{ margin: '0 0 10px' }}>Fiksni troškovi su razlog zašto je prvih nekoliko mjeseci najteže — teku od prvog dana, a prodaja se tek razvija.</p>
            <p style={{ margin: 0 }}>Po komadu se smanjuju kako rastete: 2.000 KM najma na 100 komada je 20 KM po komadu, na 1.000 komada je 2 KM. To je cijeli smisao rasta.</p>
          </> },
          { num: 'V', title: 'Varijabilni troškovi', body: <>
            <p style={{ margin: '0 0 10px' }}>Rastu sa svakom prodanom jedinicom: materijal, roba, ambalaža, dostava, provizije na kartično plaćanje.</p>
            <p style={{ margin: '0 0 10px' }}>Ako ne proizvodite, njih nema. Po komadu ostaju otprilike isti, osim kad veća nabavka donese popust.</p>
            <p style={{ margin: 0 }}>Njih morate znati precizno, jer određuju maržu po komadu — broj s kojim ste se upoznali u Modulu 1.</p>
          </> },
        ]} />

        <P>Razvrstajte troškove jednog kafića. Prevucite stavku u kolonu — na mobitelu dodirnite stavku pa kolonu:</P>

        <SortBuckets
          title="Razvrstajte troškove jednog kafića"
          hint="Pitanje je uvijek isto: mijenja li se ovaj trošak ako prodate više?"
          buckets={[
            { id: 'f', label: 'Fiksni', color: T.navy, wash: '#eceff5' },
            { id: 'v', label: 'Varijabilni', color: T.goldDeep, wash: T.goldWash },
          ]}
          items={[
            { text: 'Najam prostora', bucket: 'f', why: 'Najam je isti bez obzira na broj gostiju — fiksni trošak.' },
            { text: 'Kafa u zrnu', bucket: 'v', why: 'Više prodanih kafa znači više potrošenih zrna — varijabilni trošak.' },
            { text: 'Plata konobara', bucket: 'f', why: 'Fiksna mjesečna plata ne zavisi od prometa — fiksni trošak.' },
            { text: 'Mlijeko i šećer', bucket: 'v', why: 'Troši se sa svakom prodanom kafom — varijabilni trošak.' },
            { text: 'Osiguranje lokala', bucket: 'f', why: 'Isto svaki mjesec — fiksni trošak.' },
            { text: 'Čaše za poneti', bucket: 'v', why: 'Svaka kafa za poneti troši jednu čašu — varijabilni trošak.' },
            { text: 'Pretplata za fiskalnu kasu', bucket: 'f', why: 'Ista bez obzira na promet — fiksni trošak.' },
            { text: 'Provizija za plaćanje karticom', bucket: 'v', why: 'Raste sa svakom transakcijom — varijabilni trošak.' },
          ]}
        />

        <Example label="Granični slučajevi">Neki troškovi su djelimično oba. Struja ima fiksni dio i dio koji raste s proizvodnjom; plaćeni prekovremeni sati rastu s prometom. Za biznis plan je dovoljno svrstati ih tamo gdje pripada veći dio — nemojte se zaglaviti na tome.</Example>
      </>
    ),
    check: {
      q: 'Koje pitanje razlikuje fiksni od varijabilnog troška?',
      options: [
        'Je li trošak velik ili mali',
        'Mijenja li se trošak kada prodate više ili manje',
        'Plaća li se trošak mjesečno ili godišnje',
      ],
      answer: 1,
      why: 'Iznos i dinamika plaćanja nisu bitni. Bitno je da li trošak prati obim prodaje: najam ne prati, materijal prati.',
    },
  },

  // ─────────────────────────────── 3
  {
    title: 'Prag rentabilnosti',
    subtitle: 'Koliko morate prodati da biste došli na nulu — i je li to uopšte realno.',
    body: (
      <>
        <P>Prag rentabilnosti je broj jedinica na kojem prihod tačno pokriva sve troškove. Ispod njega gubite, iznad zarađujete. To je vjerovatno najkorisniji jedan broj u cijelom planu.</P>

        <P>Računa se jednostavno: {b('fiksni troškovi podijeljeni s maržom po komadu.')} Ako su fiksni troškovi 3.000 KM, cijena 25 KM, a varijabilni trošak 10 KM, marža je 15 KM, pa je prag 3.000 ÷ 15 = 200 komada mjesečno.</P>

        <P>Isprobajte s vlastitim brojkama. Upišite i očekivanu prodaju da vidite gdje stojite u odnosu na prag:</P>

        <BreakEvenCalc />

        <h3 style={h3}>Kako pročitati rezultat</h3>
        <P>{b('Ako je prag daleko iznad onoga što tržište može podnijeti,')} plan ne štima — i bolje je to znati sada. Tri su izlaza: podići cijenu, sniziti varijabilni trošak ili smanjiti fiksne troškove. Četvrtog nema.</P>
        <P>{b('Ako je prag blizu vaše očekivane prodaje,')} posao je riskantan. Mali pad prodaje vas gura u minus. U tom slučaju u planu obavezno opišite šta radite u tom scenariju.</P>
        <P>{b('Ako je prag znatno ispod očekivane prodaje,')} imate prostora — i to je jak argument u planu, jer pokazuje da posao podnosi lošiji mjesec.</P>

        <h3 style={h3}>Ograničenje koje treba znati</h3>
        <P>Prag u komadima ima smisla kad prodajete jednu vrstu proizvoda ili nekoliko sličnih. Ako prodajete i proizvode i usluge s različitim maržama, broj komada gubi značenje. Tada se prag računa {b('u prihodu')}: fiksni troškovi podijeljeni s prosječnim procentom marže.</P>

        <Example label="Za plan">Napišite prag u obje varijante ako možete — {em('„prag je 200 komada, odnosno oko 5.000 KM prihoda mjesečno”')}. Čitaocu je odmah jasno je li to realno u vašoj djelatnosti.</Example>
      </>
    ),
    check: {
      q: 'Fiksni troškovi su 4.000 KM, cijena 30 KM, varijabilni trošak 10 KM. Koliki je prag rentabilnosti?',
      options: ['133 komada', '200 komada', '400 komada'],
      answer: 1,
      why: 'Marža po komadu je 30 − 10 = 20 KM. Prag je 4.000 ÷ 20 = 200 komada mjesečno.',
    },
  },

  // ─────────────────────────────── 4
  {
    title: 'Novčani tok',
    subtitle: 'Profitabilan biznis može propasti. Ovo je razlog i ovdje se vidi na grafikonu.',
    body: (
      <>
        <P>Zarada i gotovina nisu isto. Zarada se računa kad je posao obavljen; gotovina postoji tek kad novac stvarno sjedne na račun. Između to dvoje zna proći mjesec i po — a u tom razmaku račune ipak treba platiti.</P>

        <P>Klasičan slučaj: isporučite robu u januaru, kupac plati u martu. U međuvremenu ste platili materijal, plate i najam. Na papiru ste u plusu, na računu nemate ništa.</P>

        <P>Pomjerite rok plaćanja i gledajte šta se dešava s računom kroz šest mjeseci:</P>

        <CashFlowSim />

        <h3 style={h3}>Šta se na ovom grafikonu vidi</h3>
        <P>{b('Zarada na papiru ostaje ista')} bez obzira na rok plaćanja — jer prodaja i troškovi se ne mijenjaju. {b('Stanje na računu se drastično mijenja.')} To je cijela poenta razlike između bilansa uspjeha i novčanog toka.</P>
        <P>Broj koji vas zanima je {b('najniže stanje na računu')}. Ako je negativno, toliko novca morate obezbijediti unaprijed — kroz vlastita sredstva, kredit ili dogovoreni minus — inače posao staje usred uspješne godine.</P>

        <h3 style={h3}>Četiri stvari koje popravljaju novčani tok</h3>
        <P>{b('Tražite avans')} ili dio plaćanja unaprijed, posebno kod većih narudžbi.</P>
        <P>{b('Skratite rok naplate')} i pratite ko kasni. Faktura koja nikog ne podsjeća često se ne plati na vrijeme.</P>
        <P>{b('Produžite rok plaćanja dobavljačima')} ako možete dogovoriti — to je najjeftiniji izvor obrtnog kapitala.</P>
        <P>{b('Ne držite više zaliha nego što treba.')} Zaliha je novac koji leži na polici umjesto na računu.</P>

        <Example label="Pravilo koje vrijedi zapamtiti">Rezerva za tri do šest mjeseci fiksnih troškova nije luksuz nego uslov opstanka. Banke i komisije to prepoznaju kao znak da razumijete kako posao funkcioniše.</Example>
      </>
    ),
    check: {
      q: 'Zašto biznis koji na papiru zarađuje može ostati bez novca?',
      options: [
        'Jer se zarada računa kad je posao obavljen, a gotovina stiže tek kad kupac plati',
        'Jer se zarada oporezuje prije naplate',
        'Jer banke blokiraju račune novim firmama',
      ],
      answer: 0,
      why: 'Između obavljenog posla i naplate prolazi vrijeme, a troškove plaćate odmah. Taj jaz mora biti pokriven rezervom, inače posao staje usred profitabilne godine.',
    },
  },

  // ─────────────────────────────── 5
  {
    title: 'Analiza rizika',
    subtitle: 'Nije pitanje hoće li nešto poći po zlu, nego jeste li na to spremni.',
    body: (
      <>
        <P>Preduzetnici često misle da nabrajanje rizika slabi plan. Dešava se suprotno. Plan bez rizika djeluje naivno, a plan koji rizike imenuje i nudi mjere djeluje kao da ga je pisao neko ko zna šta radi.</P>

        <P>Rizike ocjenjujemo po dvije stvari: {b('koliko su vjerovatni')} i {b('koliko bi vas pogodili')}. Množenjem te dvije ocjene dobijete prioritet. Rizik koji je vjerovatan i težak traži plan; rizik koji je malo vjerovatan i blag samo treba imati na umu.</P>

        <P>Dodajte svoje rizike, ocijenite ih i upišite mjeru. Mapa ispod se crta dok radite:</P>

        <RiskMatrix />

        <h3 style={h3}>Četiri grupe rizika koje vrijedi proći</h3>
        <P>{b('Tržišni')} — manja potražnja nego planirana, novi konkurent, pad kupovne moći.</P>
        <P>{b('Operativni')} — kvar opreme, zastoj dobavljača, odlazak ključnog radnika, bolest vlasnika. Ova zadnja se u malim firmama gotovo nikad ne spomene, a najteže pogađa.</P>
        <P>{b('Finansijski')} — kupci kasne s plaćanjem, rast cijena sirovina, rast kamata, nedostatak obrtnog kapitala.</P>
        <P>{b('Pravni i regulatorni')} — promjena propisa, problemi s dozvolama, izmjene poreskih stopa.</P>

        <h3 style={h3}>Mjera mora biti konkretna</h3>
        <P>{em('„Pratit ćemo situaciju”')} nije mjera. Mjera je radnja koju možete opisati i koja nešto košta ili nešto mijenja:</P>
        <P>{em('„Za rizik zastoja dobavljača: ugovoriti rezervnog dobavljača i držati zalihu za dvije sedmice.”')}</P>
        <P>{em('„Za rizik kašnjenja naplate: avans 30% na narudžbe preko 1.000 KM i podsjetnik nakon 15 dana.”')}</P>

        <Example label="Posljednja veza">Mjere iz ove tabele skoro uvijek imaju cijenu — rezervna zaliha veže novac, osiguranje je mjesečni trošak. Zato se analiza rizika radi prije nego što finalizirate projekcije, a ne poslije.</Example>

        <P>Time je krug zatvoren. Ideja iz Modula 1 prošla je kroz tržište, strategiju, marketing i brojke, i sada ima obranu za slučaj da nešto pođe naopako. To je biznis plan.</P>
      </>
    ),
    check: {
      q: 'Koja od ovih je prava mjera za rizik zastoja dobavljača?',
      options: [
        'Pratit ćemo situaciju na tržištu sirovina',
        'Ugovoriti rezervnog dobavljača i držati zalihu za dvije sedmice',
        'Nadati se da do zastoja neće doći',
      ],
      answer: 1,
      why: 'Mjera mora biti radnja koju možete opisati i koja nešto mijenja ili košta. Praćenje situacije ne mijenja ništa kada se rizik ostvari.',
    },
  },
]

const EXAM: ExamQuestion[] = [
  { lesson: 0, q: 'Šta je zarada?', options: ['Sav novac od prodaje', 'Prihod minus troškovi', 'Novac na računu na kraju mjeseca'], answer: 1 },
  { lesson: 0, q: 'Kako treba praviti procjene u planu?', options: ['Prihode pesimistično, troškove optimistično', 'Prihode optimistično, troškove pesimistično', 'Oboje što povoljnije, da plan bolje izgleda'], answer: 0 },
  { lesson: 0, q: 'Kolika rezerva se preporučuje na ukupna ulaganja?', options: ['Rezerva nije potrebna ako je plan detaljan', '10 do 20 posto', 'Najmanje 50 posto'], answer: 1 },
  { lesson: 1, q: 'Koji trošak se NE mijenja s količinom prodaje?', options: ['Fiksni trošak', 'Varijabilni trošak', 'Trošak ambalaže'], answer: 0 },
  { lesson: 1, q: 'Provizija za plaćanje karticom je koji trošak?', options: ['Fiksni', 'Varijabilni', 'Ne smatra se troškom'], answer: 1 },
  { lesson: 1, q: 'Šta se dešava s fiksnim troškom po komadu kada prodaja raste?', options: ['Smanjuje se', 'Raste', 'Ostaje isti'], answer: 0 },
  { lesson: 2, q: 'Fiksni troškovi 3.000 KM, cijena 25 KM, varijabilni trošak 10 KM. Prag rentabilnosti je:', options: ['120 komada', '200 komada', '300 komada'], answer: 1 },
  { lesson: 2, q: 'Prag rentabilnosti je previsok za vaše tržište. Koja su rješenja?', options: ['Podići cijenu, sniziti varijabilni trošak ili smanjiti fiksne troškove', 'Povećati broj zaposlenih', 'Produžiti radno vrijeme bez drugih promjena'], answer: 0 },
  { lesson: 2, q: 'Kada prag u komadima gubi smisao?', options: ['Kada prodajete različite proizvode i usluge s različitim maržama', 'Kada imate više od jednog zaposlenog', 'Kada poslujete duže od godinu dana'], answer: 0 },
  { lesson: 3, q: 'Zašto profitabilan biznis može ostati bez novca?', options: ['Jer troškove plaća prije nego što kupci plate njemu', 'Jer se profit isplaćuje vlasniku odmah', 'Jer banke zadržavaju uplate'], answer: 0 },
  { lesson: 3, q: 'Koji broj iz projekcije novčanog toka govori koliko rezerve trebate?', options: ['Ukupan godišnji prihod', 'Najniže stanje na računu', 'Prosječna mjesečna zarada'], answer: 1 },
  { lesson: 4, q: 'Kako se određuje prioritet rizika?', options: ['Prema tome koliko je lako opisati', 'Prema vjerovatnoći pomnoženoj s utjecajem', 'Prema redoslijedu kojim su nabrojani'], answer: 1 },
]

export default function Module5() {
  return (
    <LessonModule
      moduleId={5}
      n={5}
      title="Finansije i rizici"
      desc="Brojke pokazuju može li vaša ideja opstati. Ne morate biti računovođa — dovoljno je razumjeti nekoliko pojmova i biti pošteni prema procjenama."
      meta={[
        { icon: Icons.clock, text: '~30 minuta' },
        { icon: Icons.book, text: '5 lekcija' },
        { icon: Icons.tool, text: '3 kalkulatora uživo' },
      ]}
      goals={[
        'Razliku između prihoda, troška i zarade — i zašto prihod sam ne znači ništa',
        'Kako razlikovati fiksne i varijabilne troškove i zašto je to temelj svega',
        'Kako izračunati i pročitati prag rentabilnosti',
        'Zašto profitabilan biznis može ostati bez novca i kako to spriječiti',
        'Kako procijeniti rizike i napisati mjere koje nešto znače',
      ]}
      lessons={LESSONS}
      exam={EXAM}
      taskTitle="Vaš zadatak"
      taskIntro="Da završite pripremu biznis plana:"
      tasks={[
        'Razdvojio/la sam fiksne i varijabilne troškove',
        'Znam svoju maržu po jednom komadu ili usluzi',
        'Izračunao/la sam prag rentabilnosti i provjerio/la je li realan',
        'Procijenio/la sam novčani tok za prvih 6 mjeseci',
        'Znam koliko mi rezerve treba prema najnižem stanju na računu',
        'Imam matricu s najmanje 5 rizika i konkretnim mjerama',
        'Provjerio/la sam da mjere iz analize rizika ulaze u troškove',
      ]}
      nextN={null}
      nextTitle={null}
    />
  )
}
