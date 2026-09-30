'use client'
import React from 'react'
import { P, Example, Tabs, Icons, T } from '../LearnComponents'
import { LessonModule, Lesson, ExamQuestion } from '../LessonModule'
import { SwotBuilder, PorterForces, SortBuckets } from '../LearnWidgets'

const b = (t: string) => <strong style={{ color: T.navy }}>{t}</strong>
const em = (t: string) => <em style={{ fontStyle: 'italic', color: T.navy }}>{t}</em>
const h3: React.CSSProperties = { fontSize: '17px', fontWeight: 700, margin: '28px 0 8px' }

const LESSONS: Lesson[] = [
  // ─────────────────────────────── 1
  {
    title: 'Vizija, misija i SMART ciljevi',
    subtitle: 'Prije analiza treba znati kuda idete. Bez toga se analizira u prazno.',
    body: (
      <>
        <P>Vizija, misija i ciljevi zvuče kao tri riječi za istu stvar, i u većini planova zaista budu tri prazne rečenice koje niko ne pročita. Razlika je zapravo jednostavna i vrijedi je razumjeti, jer bez nje ostatak modula nema uporište.</P>

        <P>{b('Vizija')} je slika gdje želite biti za tri do pet godina. Ona je namjerno ambiciozna i ne mora biti mjerljiva. {em('„Biti pekara koju porodice u našem dijelu grada prvo pomisle kad im treba svjež hljeb.”')}</P>

        <P>{b('Misija')} je zašto postojite danas — za koga radite i šta im dajete. {em('„Svaki dan pravimo svjež hljeb po domaćim receptima za porodice u naselju.”')}</P>

        <P>{b('Ciljevi')} su koraci koji vas od misije vode ka viziji. Oni moraju biti mjerljivi, jer je cilj koji ne možete izmjeriti samo želja.</P>

        <h3 style={h3}>Zašto SMART, a ne „želim rasti”</h3>
        <P>Kada u planu piše {em('„želimo povećati prodaju”')}, čitalac ne zna ni koliko, ni dokad, ni kako ćete znati jeste li uspjeli. SMART je pet provjera koje cilj pretvaraju u nešto upotrebljivo. Kliknite kroz slova:</P>

        <Tabs tabs={[
          { label: 'S · Specifičan', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Šta tačno, bez uopštavanja.')}</p>
            <p style={{ margin: 0 }}>Umjesto {em('„poboljšati marketing”')} — {em('„pokrenuti Instagram profil i objavljivati tri puta sedmično”')}. Prvo se ne može uraditi, drugo može.</p>
          </> },
          { label: 'M · Mjerljiv', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Broj po kojem znate jeste li uspjeli.')}</p>
            <p style={{ margin: 0 }}>Bez broja se svaki ishod može proglasiti uspjehom. Broj vas drži pošteno — i pomaže kad tražite novac, jer finansijer vidi da mjerite ono što obećavate.</p>
          </> },
          { label: 'A · Ostvariv', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Realan s obzirom na resurse koje imate.')}</p>
            <p style={{ margin: 0 }}>Cilj koji zahtijeva tri puta više kapaciteta nego što imate nije ambiciozan nego neozbiljan. U planu se to odmah vidi jer se ne slaže s finansijama.</p>
          </> },
          { label: 'R · Relevantan', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Vodi ka viziji, a ne u stranu.')}</p>
            <p style={{ margin: 0 }}>Broj pratilaca na mrežama je relevantan samo ako se pretvara u kupce. Ako ne, mjerite nešto što lijepo izgleda, a ne pomjera biznis.</p>
          </> },
          { label: 'T · Vremenski', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Ima rok.')}</p>
            <p style={{ margin: 0 }}>Bez roka se cilj odgađa unedogled, jer nikad nije „kasno”. Rok stvara trenutak u kojem morate priznati jeste li ili niste.</p>
          </> },
        ]} />

        <Example label="Prije i poslije">Loš cilj: {em('„Želim više kupaca.”')} SMART cilj: {em('„Doći do 200 stalnih kupaca do 31. decembra, kroz Instagram oglase i program preporuka.”')} Drugi se može planirati, budžetirati i provjeriti.</Example>

        <P>Za biznis plan je dovoljno {b('tri do pet ciljeva za prvu godinu.')} Više od toga znači da nema prioriteta, a plan s petnaest ciljeva djeluje kao spisak želja.</P>
      </>
    ),
    check: {
      q: 'Koji od ovih ciljeva je SMART?',
      options: [
        'Postati vodeća pekara u gradu',
        'Značajno povećati prodaju tokom naredne godine',
        'Do 31.12. sklopiti ugovore o dnevnoj isporuci sa 5 kafića u naselju',
      ],
      answer: 2,
      why: 'Treći cilj ima broj (5 kafića), rok (31.12.) i jasnu aktivnost. Prva dva zvuče dobro, ali se ne mogu izmjeriti, pa se ne može ni reći jeste li ih ostvarili.',
    },
  },

  // ─────────────────────────────── 2
  {
    title: 'PEST analiza: šta se dešava oko vas',
    subtitle: 'Faktori na koje ne možete utjecati, ali koji mogu odlučiti sudbinu biznisa.',
    body: (
      <>
        <P>Do sada ste gledali sebe, kupce i konkurenciju. PEST gleda šire — na okolnosti koje nastaju bez vas i mijenjaju vam uslove poslovanja. Poskupi struja, promijeni se zakon, iseli se pola naselja, pojavi se nova tehnologija. Ništa od toga ne kontrolišete, ali sve utiče.</P>

        <P>Poenta PEST analize nije da nabrojite sve što se dešava u zemlji. Poenta je da izdvojite {b('nekoliko faktora koji konkretno pogađaju vaš biznis')} i da za svaki znate šta ćete ako se desi.</P>

        <Tabs tabs={[
          { label: 'Politički', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Zakoni, propisi, porezi, dozvole, subvencije, politička stabilnost.')}</p>
            <p style={{ margin: 0 }}>Za male firme ovdje su najčešće konkretne stvari: uslovi za registraciju djelatnosti, sanitarne i inspekcijske obaveze, stope doprinosa, dostupnost podsticaja. Promjena stope doprinosa direktno mijenja trošak plata u vašim projekcijama.</p>
          </> },
          { label: 'Ekonomski', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Inflacija, kupovna moć, kamate, nezaposlenost, kursevi.')}</p>
            <p style={{ margin: 0 }}>Ovi faktori određuju i koliko kupci mogu trošiti i koliko vas košta novac. Rast cijena sirovina stišće maržu odozdo, a pad kupovne moći sprečava vas da to prenesete na cijenu. To dvoje zajedno je najčešći razlog zašto plan prestane važiti.</p>
          </> },
          { label: 'Socijalni', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Demografija, navike, stil života, kulturni trendovi.')}</p>
            <p style={{ margin: 0 }}>U našem kontekstu iseljavanje i starenje stanovništva su faktor koji mnogi previde — a mijenja i broj kupaca i dostupnost radne snage. S druge strane, promjene navika stvaraju prilike: rast interesa za zdravu ishranu, dostavu, lokalne proizvode.</p>
          </> },
          { label: 'Tehnološki', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Nove tehnologije, digitalizacija, automatizacija, platni sistemi.')}</p>
            <p style={{ margin: 0 }}>Tehnologija je istovremeno prilika i prijetnja. Online naručivanje vam može otvoriti nove kupce, ali ako ga konkurencija uvede prva, postaje vaš problem. Za većinu malih biznisa ovdje su relevantne jednostavne stvari: plaćanje karticom, Google Maps, društvene mreže, softver za fakturisanje.</p>
          </> },
        ]} />

        <P>Provjerite razlikujete li kategorije. Prevucite svaki faktor u pravu kolonu:</P>

        <SortBuckets
          title="Razvrstajte faktore u PEST kategorije"
          hint="Pogrešan izbor objasni zašto ne pripada tu"
          buckets={[
            { id: 'p', label: 'Politički', color: T.navy, wash: '#eceff5' },
            { id: 'e', label: 'Ekonomski', color: T.goldDeep, wash: T.goldWash },
            { id: 's', label: 'Socijalni', color: T.green, wash: T.greenWash },
            { id: 't', label: 'Tehnološki', color: T.blue, wash: T.blueWash },
          ]}
          items={[
            { text: 'Izmjene zakona o PDV-u', bucket: 'p', why: 'Porezi i zakoni spadaju u političke i pravne faktore.' },
            { text: 'Rast inflacije', bucket: 'e', why: 'Inflacija mijenja troškove i kupovnu moć — ekonomski faktor.' },
            { text: 'Iseljavanje mladih', bucket: 's', why: 'Promjene u stanovništvu su socijalni faktor.' },
            { text: 'Širenje plaćanja karticom', bucket: 't', why: 'Način plaćanja je tehnološki faktor.' },
            { text: 'Novi uslovi za sanitarne dozvole', bucket: 'p', why: 'Dozvole i propisi su politički i pravni faktor.' },
            { text: 'Rast kamata na kredite', bucket: 'e', why: 'Kamata je cijena novca — ekonomski faktor.' },
            { text: 'Trend zdrave ishrane', bucket: 's', why: 'Navike i stil života su socijalni faktor.' },
            { text: 'Online naručivanje i dostava', bucket: 't', why: 'Nova tehnologija koja mijenja način prodaje — tehnološki faktor.' },
          ]}
        />

        <Example label="Kako ovo koristiti">Za svaki faktor koji ste izdvojili napišite jednu rečenicu: {em('„Ako se ovo desi, mi ćemo…”')} Bez tog dodatka PEST ostaje spisak vijesti. S njim postaje priprema.</Example>
      </>
    ),
    check: {
      q: 'Rast kamata na kredite u koju PEST kategoriju spada?',
      options: ['Politički faktor', 'Ekonomski faktor', 'Tehnološki faktor'],
      answer: 1,
      why: 'Kamata je cijena novca. Utiče na to koliko vas košta kredit i koliko kupci mogu trošiti — a to su ekonomski faktori.',
    },
  },

  // ─────────────────────────────── 3
  {
    title: 'Porterovih 5 sila: koliko je vaše tržište privlačno',
    subtitle: 'Dvije firme s istim proizvodom mogu imati potpuno različitu zaradu — zbog toga kakvo je tržište oko njih.',
    body: (
      <>
        <P>Postoje djelatnosti u kojima se pošteno zarađuje i one u kojima svi jedva preživljavaju, bez obzira koliko su dobri. Razlika nije u trudu nego u strukturi tržišta — u tome ko ima moć da diktira uslove.</P>

        <P>Porterov model tu strukturu razlaže na pet sila koje pritišću vašu maržu. Što je više njih jako, to je teže zarađivati.</P>

        <P>{b('Rivalitet konkurencije')} — koliko se firmi bori za istog kupca. Kad ih je mnogo i nude slično, jedini alat koji ostaje je cijena, a cjenovni rat ne dobija niko.</P>
        <P>{b('Prijetnja novih ulazaka')} — koliko lako neko može ući. Ako za pokretanje treba malo novca i nikakva dozvola, svaki vaš uspjeh privlači imitatore u roku od nekoliko mjeseci.</P>
        <P>{b('Prijetnja zamjena')} — može li kupac potrebu zadovoljiti sasvim drugačije. Ovu silu ljudi najčešće potcijene jer zamjena obično ne izgleda kao konkurencija.</P>
        <P>{b('Moć kupaca')} — koliko lako kupac ode drugome. Ako imate nekoliko velikih kupaca koji čine većinu prometa, oni diktiraju cijenu i rokove plaćanja.</P>
        <P>{b('Moć dobavljača')} — koliko lako vi mijenjate dobavljača. Ako postoji samo jedan koji ima ono što vam treba, on određuje uslove.</P>

        <h3 style={h3}>Ocijenite svoje tržište</h3>
        <P>Kliknite silu u dijagramu i procijenite koliko je jaka kod vas. Kada ocijenite svih pet, dobit ćete ukupnu ocjenu tržišta:</P>

        <PorterForces />

        <P>Ako ispadne da je tržište teško, to nije razlog da odustanete — većina malih biznisa posluje na teškim tržištima. To je razlog da u planu pokažete {b('kako ćete se nositi s najjačom silom.')} Ako je najjača moć kupaca, plan treba pokazati kako širite bazu da ne zavisite od dvojice. Ako je najjači rivalitet, plan treba pokazati po čemu izlazite iz poređenja po cijeni.</P>

        <Example label="Veza s prethodnim modulom">Konkurente koje ste popisali u Modulu 2 upotrijebite ovdje: direktni konkurenti određuju rivalitet, a zamjene koje ste naveli određuju silu prijetnje zamjena.</Example>
      </>
    ),
    check: {
      q: 'Vaš biznis ima dva kupca koji čine 80% ukupnog prometa. Koja je sila ovdje visoka?',
      options: [
        'Moć kupaca — oni mogu diktirati cijenu i rokove plaćanja',
        'Moć dobavljača — jer zavisite od nabavke',
        'Prijetnja novih ulazaka — jer tržište izgleda privlačno',
      ],
      answer: 0,
      why: 'Kada mali broj kupaca donosi većinu prihoda, gubitak jednog je udarac koji ne možete podnijeti — i oni to znaju. Zato imaju moć nad cijenom i uslovima.',
    },
  },

  // ─────────────────────────────── 4
  {
    title: 'SWOT analiza',
    subtitle: 'Alat koji svi znaju i malo ko koristi kako treba. Razlika je u tome šta uradite nakon što ga popunite.',
    body: (
      <>
        <P>SWOT spaja ono što ste do sada zaključili u jednu sliku. Dvije gornje kvadrante su {b('unutrašnje')} — snage i slabosti, stvari koje vi kontrolišete i možete mijenjati. Dvije donje su {b('vanjske')} — prilike i prijetnje, ono što dolazi izvana i na šta se možete samo pripremiti.</P>

        <P>Ta podjela je jedino pravilo koje se stalno krši. {em('„Jaka konkurencija”')} nije vaša slabost nego vanjska prijetnja. {em('„Nedostatak iskustva”')} nije prijetnja nego vaša slabost. Ako pomiješate kvadrante, izgubi se cijeli smisao — jer se snage i slabosti rješavaju drugačije nego prilike i prijetnje.</P>

        <h3 style={h3}>Odakle uzeti stavke</h3>
        <P>Ne izmišljajte ih. Sve su već tu:</P>
        <P>{b('Snage i slabosti')} dolaze iz Modula 1 — vaše iskustvo, kvalifikacije, resursi, prednost koju ste definisali, ali i praznine koje ste tamo priznali.</P>
        <P>{b('Prilike i prijetnje')} dolaze iz prethodne dvije lekcije — iz PEST faktora i iz Porterovih sila, te iz tržišne praznine koju ste našli u Modulu 2.</P>

        <P>Popunite sada svoja četiri kvadranta. Po jedna stavka u red, tri do pet po kvadrantu je sasvim dovoljno:</P>

        <SwotBuilder />

        <h3 style={h3}>Dio koji većina preskoči</h3>
        <P>Popunjena SWOT tabela sama po sebi nije analiza — to je spisak. Analiza nastaje kad se kvadranti ukrste i iz toga izvuku odluke. Zato se ispod tabele otvaraju četiri pitanja kad popunite sva četiri polja:</P>
        <P>{b('Snage + prilike')} daju vaš glavni potez — gdje ono u čemu ste dobri susreće ono što tržište traži. Tu ulažete prvo.</P>
        <P>{b('Slabosti + prilike')} pokazuju šta morate popraviti da ne propustite priliku.</P>
        <P>{b('Snage + prijetnje')} pokazuju čime se branite kad stvari krenu naopako.</P>
        <P>{b('Slabosti + prijetnje')} su vaša najranjivija tačka — kombinacija koju treba imati na umu i za analizu rizika u Modulu 5.</P>

        <Example label="Test dobre SWOT analize">Pokrijte naslov i dajte je nekome ko poznaje vašu djelatnost. Ako ne može pogoditi o kojoj se firmi radi, stavke su preopšte. {em('„Kvalitetna usluga”')} i {em('„jaka konkurencija”')} mogu stajati u bilo čijoj tabeli — a to znači da ne govore ništa.</Example>
      </>
    ),
    check: {
      q: 'Preduzetnik u kvadrant „Slabosti” upisuje: „Jaka konkurencija u naselju.” Gdje to zapravo spada?',
      options: [
        'Dobro je gdje jeste — konkurencija slabi našu poziciju',
        'U prijetnje — to je vanjski faktor koji ne kontrolišete',
        'U prilike — konkurencija znači da tržište postoji',
      ],
      answer: 1,
      why: 'Snage i slabosti su unutar firme i možete ih mijenjati. Konkurencija dolazi izvana, pa spada u prijetnje — a na prijetnje se pripremate, ne popravljate ih.',
    },
  },

  // ─────────────────────────────── 5
  {
    title: 'Od analize do odluke',
    subtitle: 'Tri analize su beskorisne ako iz njih ne izađu tri do četiri konkretne odluke.',
    body: (
      <>
        <P>Ovo je lekcija zbog koje modul postoji. Planovi puni tabela koje nigdje ne vode su najčešća zamka — analiza je uredno urađena, a strategija i dalje glasi {em('„radit ćemo dobro i nadati se”')}.</P>

        <P>Prevođenje analize u odluke ide u tri koraka.</P>

        <h3 style={h3}>Korak 1: izdvojite ono što je zaista važno</h3>
        <P>Iz svega što ste popunili izaberite {b('najviše pet stavki koje stvarno mijenjaju vaše poslovanje.')} Kriterij je jednostavan: ako se ovo desi ili ne desi, hoće li se moj plan promijeniti? Ako ne, stavka je zanimljiva ali nebitna.</P>
        <P>Obično to bude jedna sila iz Portera koja je visoka, jedan ili dva PEST faktora i dvije-tri stavke iz SWOT-a.</P>

        <h3 style={h3}>Korak 2: za svaku napišite šta radite</h3>
        <P>Svaka izdvojena stavka dobija rečenicu u obliku {b('„zato ćemo…”')}. Bez toga analiza ostaje opažanje.</P>
        <P>{em('„Moć kupaca je visoka jer dva kafića čine 60% prometa — zato ćemo u prvih šest mjeseci potpisati ugovore s još tri objekta.”')}</P>
        <P>{em('„Cijene brašna rastu — zato ćemo cijene ugovarati kvartalno i držati rezervu od mjesec dana potrošnje.”')}</P>
        <P>Primijetite da svaka od tih rečenica ima posljedicu u finansijama: novi kupci mijenjaju projekciju prihoda, zaliha veže obrtni kapital. Tako analiza ulazi u brojke u Modulu 5.</P>

        <h3 style={h3}>Korak 3: provjerite da se odluke ne poništavaju</h3>
        <P>Zadnja provjera je da li vaše odluke idu u istom smjeru. Strategija niše koja istovremeno planira masovno oglašavanje, ili strategija kvaliteta uz najjeftinijeg dobavljača — to su kontradikcije koje čitalac plana odmah uoči.</P>

        <P>Kada prođete ova tri koraka, imate ono što se u planu zove strateški dio: {b('nekoliko odluka koje se mogu obrazložiti i koje se vide u brojkama.')} To je sve što se od ovog poglavlja traži.</P>

        <Example label="Šta nosite dalje">U Modul 4 nosite strategiju razlikovanja i ciljeve — oni određuju marketinšku poruku i kanale. U Modul 5 nosite prijetnje i slabosti — one postaju stavke u analizi rizika i utiču na projekcije.</Example>
      </>
    ),
    check: {
      q: 'Šta razlikuje upotrebljivu stratešku analizu od spiska tabela u planu?',
      options: [
        'Broj analiza — što više alata je primijenjeno, to bolje',
        'Dužina — detaljnija analiza je uvjerljivija',
        'To što iz nje izlazi nekoliko konkretnih odluka koje se vide i u finansijama',
      ],
      answer: 2,
      why: 'Tabele same po sebi ne govore šta ćete uraditi. Vrijednost nastaje tek kad svaka važna stavka dobije rečenicu „zato ćemo…” koja ima posljedicu u planu i u brojkama.',
    },
  },
]

const EXAM: ExamQuestion[] = [
  { lesson: 0, q: 'Koja je razlika između vizije i misije?', options: ['Vizija je slika gdje želite biti za nekoliko godina, misija zašto postojite danas', 'Vizija je kratka, misija duga', 'Nema razlike, to su sinonimi'], answer: 0 },
  { lesson: 0, q: 'Koji je od ovih ciljeva SMART?', options: ['Postati vodeća pekara u gradu', 'Do 31.12. sklopiti ugovore o isporuci sa 5 kafića', 'Značajno povećati prodaju'], answer: 1 },
  { lesson: 0, q: 'Koliko ciljeva je dovoljno za prvu godinu u biznis planu?', options: ['Tri do pet', 'Najmanje petnaest', 'Jedan jedini'], answer: 0 },
  { lesson: 1, q: 'Rast kamata na kredite spada u koju PEST kategoriju?', options: ['Politički faktor', 'Ekonomski faktor', 'Socijalni faktor'], answer: 1 },
  { lesson: 1, q: 'Iseljavanje stanovništva iz vašeg kraja je koji faktor?', options: ['Socijalni', 'Tehnološki', 'Politički'], answer: 0 },
  { lesson: 1, q: 'Šta PEST analizu pretvara iz spiska vijesti u pripremu?', options: ['Što veći broj navedenih faktora', 'Rečenica „ako se ovo desi, mi ćemo…” uz svaki faktor', 'Podjela na tabele po godinama'], answer: 1 },
  { lesson: 2, q: 'Dva kupca čine 80% vašeg prometa. Koja je Porterova sila visoka?', options: ['Moć kupaca', 'Moć dobavljača', 'Prijetnja novih ulazaka'], answer: 0 },
  { lesson: 2, q: 'Kada je prijetnja novih ulazaka visoka?', options: ['Kada za ulazak treba malo novca i nikakva posebna dozvola', 'Kada je tržište već prezasićeno', 'Kada dobavljači diktiraju cijene'], answer: 0 },
  { lesson: 2, q: 'Šta znači ako Porterova analiza pokaže da je tržište teško?', options: ['Da treba odustati od ideje', 'Da u planu treba pokazati kako se nosite s najjačom silom', 'Da treba promijeniti pravni oblik'], answer: 1 },
  { lesson: 3, q: 'Gdje u SWOT-u spada „jaka konkurencija u naselju”?', options: ['U slabosti', 'U prijetnje', 'U prilike'], answer: 1 },
  { lesson: 3, q: 'Odakle dolaze prilike i prijetnje u SWOT analizi?', options: ['Iz vaših resursa i kvalifikacija', 'Iz PEST faktora, Porterovih sila i tržišne praznine', 'Iz finansijskih projekcija'], answer: 1 },
  { lesson: 4, q: 'Šta razlikuje upotrebljivu stratešku analizu od spiska tabela?', options: ['Broj primijenjenih alata', 'Dužina teksta', 'Nekoliko konkretnih odluka koje se vide i u finansijama'], answer: 2 },
]

export default function Module3() {
  return (
    <LessonModule
      moduleId={3}
      n={3}
      title="Strateška analiza"
      desc="Sada kad poznajete tržište, vrijeme je da postavite pravac. Vizija, ciljevi i tri analize koje vam pomažu da donesete odluke — i da ih odbranite pred bankom ili komisijom."
      meta={[
        { icon: Icons.clock, text: '~30 minuta' },
        { icon: Icons.book, text: '5 lekcija' },
        { icon: Icons.tool, text: 'PEST, Porter i SWOT' },
      ]}
      goals={[
        'Razliku između vizije, misije i ciljeva — i kako postaviti SMART cilj',
        'PEST analizu: vanjske faktore koje ne kontrolišete, ali morate predvidjeti',
        'Porterovih 5 sila i zašto su neka tržišta teža od drugih',
        'SWOT analizu i grešku koju svi prave pri popunjavanju',
        'Kako od tri analize doći do nekoliko konkretnih odluka',
      ]}
      lessons={LESSONS}
      exam={EXAM}
      taskTitle="Vaš zadatak"
      taskIntro="Prije sljedećeg modula pripremite ove elemente (napredak se čuva):"
      tasks={[
        'Napisao/la sam viziju i misiju, svaku u jednoj rečenici',
        'Postavio/la sam 3 do 5 SMART ciljeva za prvu godinu',
        'Izdvojio/la sam PEST faktore koji konkretno pogađaju moj biznis',
        'Ocijenio/la sam svih 5 Porterovih sila za svoje tržište',
        'Popunio/la sam SWOT i provjerio/la da su stavke konkretne, ne opšte',
        'Odgovorio/la sam na četiri pitanja strategije ispod SWOT tabele',
        'Zapisao/la sam 3 do 5 odluka u obliku „zato ćemo…”',
      ]}
      nextN={4}
      nextTitle="Marketing i operacije"
    />
  )
}
