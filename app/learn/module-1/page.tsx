'use client'
import React from 'react'
import { P, Example, Tabs, Accordion, Icons, BigIcons, T } from '../LearnComponents'
import { LessonModule, Lesson } from '../LessonModule'
import { ProfitSim, ScenarioPicker, RevealGrid, DragMatch, IdeaSentence } from '../LearnWidgets'

const b = (t: string) => <strong style={{ color: T.navy }}>{t}</strong>
const em = (t: string) => <em style={{ fontStyle: 'italic', color: T.navy }}>{t}</em>

const LESSONS: Lesson[] = [
  // ─────────────────────────────── 1
  {
    title: 'Šta je biznis plan i zašto ga trebate?',
    subtitle: 'Prije nego napišete ijednu stranicu, korisno je znati čemu taj dokument zapravo služi i ko će ga čitati.',
    body: (
      <>
        <P>Biznis plan je dokument u kojem opisujete šta namjeravate raditi, za koga, koliko vam novca treba i šta očekujete da ćete time postići. Nije to formalnost koju ispunjavate zato što neko traži — to je prvi put da vašu ideju morate provjeriti brojkama i konkretnim odgovorima umjesto osjećajem.</P>

        <P>Većina ljudi misli da se plan piše {b('za banku')}. Tačno je da ga banke traže, ali najveća korist je obično na drugoj strani. Dok ga pišete, otkrivate rupe u vlastitoj ideji: da niste razmislili ko tačno kupuje, da cijena ne pokriva trošak, da vam treba dvostruko više novca nego što ste mislili. Bolje je to otkriti na papiru nego nakon šest mjeseci poslovanja.</P>

        <P>Svaki dobar plan, bez obzira na formu, odgovara na četiri pitanja: {b('šta nudite, kome, koliko vam treba i kakva je korist.')} Ako plan ne odgovara jasno na sva četiri, čitalac će ga ostaviti sa strane bez obzira koliko stranica ima.</P>

        <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '28px 0 8px' }}>Isti plan, četiri različita čitaoca</h3>
        <P>Ovo je dio koji preduzetnici najčešće promaše. Plan koji oduševi investitora može biti odbijen u banci, i obrnuto — jer traže suprotne stvari. Kliknite kroz kartice da vidite šta svako od njih traži:</P>

        <Tabs tabs={[
          { label: 'Banka', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Pitanje koje banka postavlja: možete li vratiti kredit?')}</p>
            <p style={{ margin: '0 0 10px' }}>Banku ne zanima koliko vaš biznis može narasti. Zanima je hoće li svakog mjeseca na računu biti dovoljno novca za ratu. Zato najpažljivije gleda projekciju novčanog toka, kolateral i to da li su vaše brojke realne ili prenapuhane.</p>
            <p style={{ margin: 0 }}>Optimistične projekcije ovdje rade protiv vas. Ako napišete da ćete u prvom mjesecu imati promet kakav konkurencija ima nakon tri godine, referent to prepozna i cijeli plan izgubi kredibilitet.</p>
          </> },
          { label: 'Investitor', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Pitanje koje investitor postavlja: koliko ovo može narasti?')}</p>
            <p style={{ margin: '0 0 10px' }}>Investitor ulaže novac da bi ga umnožio, pa ga zanima veličina tržišta, brzina rasta i to može li se biznis širiti bez da troškovi rastu jednako brzo. Sigurnost ga zanima manje nego banku — prihvata rizik, ali traži potencijal.</p>
            <p style={{ margin: 0 }}>Njemu je i tim često važniji od same ideje. Ideje se mijenjaju; ljudi koji ih izvode ostaju.</p>
          </> },
          { label: 'Grant komisija', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Pitanje koje komisija postavlja: kakva je korist za zajednicu?')}</p>
            <p style={{ margin: '0 0 10px' }}>Komisije koje dodjeljuju bespovratna sredstva imaju svoje ciljeve — nova radna mjesta, zapošljavanje mladih ili žena, razvoj nerazvijenih područja, zelena tranzicija. Plan ocjenjuju prema tome koliko doprinosi baš tim ciljevima.</p>
            <p style={{ margin: 0 }}>Zato se plan za grant uvijek piše uz javni poziv pored sebe. Ako poziv traži tri nova radna mjesta, to mora biti vidljivo u planu, a ne skriveno u nekoj tabeli.</p>
          </> },
          { label: 'Vi sami', content: <>
            <p style={{ margin: '0 0 10px' }}>{b('Pitanje koje vi postavljate: ima li ovo smisla?')}</p>
            <p style={{ margin: '0 0 10px' }}>Ovo je jedini čitalac koji vam uvijek ostaje, čak i ako nikad ne tražite kredit. Pisanje plana vas prisiljava da donesete odluke koje ste odgađali: koliko ćete naplaćivati, koliko komada morate prodati, šta radite ako prvih šest mjeseci ide lošije nego što ste planirali.</p>
            <p style={{ margin: 0 }}>Plan koji ste napisali sami sebi kasnije služi kao mjerilo. Nakon godinu dana ga otvorite i vidite gdje ste pogriješili u procjeni — i sljedeći put procijenite bolje.</p>
          </> },
        ]} />

        <Example label="Najčešća greška">Jedan plan poslan na sve strane. Osnova jeste ista, ali sažetak i naglasci se prilagođavaju onome ko čita. Za banku naglasite sigurnost otplate, za grant društveni učinak, za investitora potencijal rasta.</Example>

        <P>Još nešto o dužini: plan se ne ocjenjuje po broju stranica. Sažetak na početku je dio koji se sigurno pročita, a često i jedini. Ako on ne uvjeri, ostatak niko ne otvara. Zato se sažetak piše zadnji, kada već znate šta piše u planu.</P>
      </>
    ),
    check: {
      q: 'Zašto isti biznis plan treba prilagoditi različitim čitaocima?',
      options: [
        'Zato što banke, investitori i grant komisije traže različite stvari',
        'Zato što svaka institucija propisuje svoj obavezni format',
        'Zato što je duži plan uvijek bolje ocijenjen',
      ],
      answer: 0,
      why: 'Banku zanima da li možete vratiti kredit, investitora koliko biznis može narasti, a komisiju kakav je društveni učinak. Osnova plana ostaje ista — mijenjaju se sažetak i naglasci.',
    },
  },

  // ─────────────────────────────── 2
  {
    title: 'Četiri elementa dobre poslovne ideje',
    subtitle: 'Svaka ideja koju vrijedi finansirati može se razložiti na četiri dijela. Ako bilo koji nedostaje, plan ima rupu.',
    body: (
      <>
        <P>Kada preduzetnik opisuje svoju ideju, obično priča o proizvodu — kako izgleda, od čega je napravljen, šta sve može. To je razumljivo, jer je to dio na kojem je najviše radio. Ali čitaocu plana to je tek jedna četvrtina priče.</P>

        <P>Potpun opis ideje ima četiri elementa. Kliknite blokove da otkrijete šta svaki znači:</P>

        <RevealGrid
          title="Anatomija vaše ideje"
          hint="Kliknite svaki blok"
          blocks={[
            { title: 'Proizvod ili usluga', desc: 'Šta konkretno nudite i kakvu korist kupac time dobija. Ne opis osobina — opis rješenja.', span: 3 },
            { title: 'Ciljni kupac', desc: 'Ko tačno kupuje. Dob, mjesto, navike, koliko može potrošiti.' },
            { title: 'Problem', desc: 'Koju muku uklanjate i koliko je ta muka kupcu velika.' },
            { title: 'Prednost', desc: 'Zašto bi kupac izabrao vas, a ne nekog ko već postoji.' },
          ]}
        />

        <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '28px 0 8px' }}>Proizvod: korist, ne osobine</h3>
        <P>Razlika je u tome čija je perspektiva. {em('„Peć kapaciteta 120 kilograma dnevno”')} je osobina — govori o vama. {em('„Svjež hljeb na polici svako jutro u šest, i za vikend”')} je korist — govori o kupcu. Osobine trebaju stajati u planu, ali u dijelu o opremi. U opisu ideje ide korist.</P>

        <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '24px 0 8px' }}>Kupac: „svi” nije odgovor</h3>
        <P>Najčešći odgovor na pitanje ko su kupci glasi {em('„svi kojima treba naš proizvod”')}. To zvuči kao velika prilika, a zapravo znači da ne znate gdje da se oglašavate, koju cijenu da postavite i šta da naglasite u poruci. Kad kažete {em('„porodice s malom djecom u naselju u krugu od kilometar”')}, odjednom znate i gdje ćete dijeliti letke i u koliko sati morate biti otvoreni.</P>
        <P>Uže tržište nije slabija strana plana. Ono je znak da ste razmišljali.</P>

        <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '24px 0 8px' }}>Problem: koliko je velik?</h3>
        <P>Svaki proizvod rješava nekakav problem, ali ne vrijedi svaki problem toliko da bi neko za njega platio. Korisna provjera: {b('kako kupac danas rješava tu muku i koliko ga to košta — u novcu, vremenu ili živcima?')} Ako je odgovor „pa, nekako se snađe i ne smeta mu previše”, ideja se teško prodaje ma koliko dobra bila.</P>

        <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '24px 0 8px' }}>Prednost: zašto vi</h3>
        <P>Prednost ne mora biti izum. Može biti lokacija, radno vrijeme, cijena, brzina, poznavanje ljudi u kraju ili jednostavno to što ste jedini koji radi nedjeljom. Važno je da je {b('konkretna i da je kupac osjeti')}, a ne da je fraza tipa „kvalitet i povoljne cijene” koju piše svako.</P>

        <P>Sada provjerite razlikujete li ova četiri elementa u praksi. Prevucite pojam na primjer koji mu odgovara — na mobitelu dodirnite pojam pa primjer:</P>

        <DragMatch
          title="Spojite parove"
          hint="Pogrešan izbor se zatrese — pokušajte ponovo"
          pairs={[
            { id: 'proizvod', term: 'Proizvod', example: 'Aplikacija za dijeljenje bilješki' },
            { id: 'kupac', term: 'Ciljni kupac', example: 'Studenti od 18 do 25 godina u Sarajevu' },
            { id: 'problem', term: 'Problem', example: 'Studenti gube bilješke i vrijeme pred ispite' },
            { id: 'prednost', term: 'Prednost', example: 'Jedini smo besplatni i radimo bez interneta' },
          ]}
        />
      </>
    ),
    check: {
      q: 'Preduzetnik na pitanje o kupcima odgovara: „Svi kojima treba naš proizvod.” Zašto je to problem?',
      options: [
        'Zato što tako definisano tržište ne govori gdje se oglašavati ni koju cijenu postaviti',
        'Zato što je bolje imati što manje kupaca',
        'Zato što banke ne prihvataju planove sa više od jedne grupe kupaca',
      ],
      answer: 0,
      why: 'Konkretan kupac vam daje odluke: gdje ga naći, šta mu reći, koliko naplatiti. „Svi” ne daje nijednu od tih odluka, pa marketing postaje pogađanje.',
    },
  },

  // ─────────────────────────────── 3
  {
    title: 'Vaša ideja u jednoj rečenici',
    subtitle: 'Ako ideju ne možete objasniti u jednoj rečenici, ni čitalac plana je neće razumjeti iz dvadeset stranica.',
    body: (
      <>
        <P>Sada iste četiri elementa primijenite na svoj biznis. Cilj vježbe nije da napišete lijepu rečenicu — nego da otkrijete koji vam dio nedostaje. Ljudi obično lako popune proizvod, a zapnu na prednosti. To je koristan signal: znači da još niste odlučili po čemu ste drugačiji.</P>

        <P>Ova rečenica kasnije služi na više mjesta: kao prva rečenica sažetka u planu, kao odgovor kad vas neko pita čime se bavite, i kao tekst u opisu profila na društvenim mrežama. Zato vrijedi uložiti vrijeme.</P>

        <IdeaSentence />

        <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '28px 0 8px' }}>Tri provjere dobre rečenice</h3>
        <P>{b('Prva:')} pročitajte je nekome ko ne zna ništa o vašem poslu. Ako mora pitati potpitanje da bi shvatio šta radite, rečenica još nije gotova.</P>
        <P>{b('Druga:')} zamijenite svoje ime imenom konkurenta. Ako rečenica i dalje stoji jednako tačno, onda dio o prednosti ne radi svoj posao.</P>
        <P>{b('Treća:')} provjerite ima li u njoj brojeva ili konkretnih pojmova. {em('„Mladima pomažemo da lakše uče”')} je prazno. {em('„Studentima u Sarajevu koji gube bilješke”')} je konkretno.</P>

        <Example label="Savjet">Nemojte je previše dotjerivati u prvom pokušaju. Napišite grubu verziju, prođite ostale module, pa se vratite. Nakon što napravite analizu tržišta i finansije, rečenica se gotovo uvijek promijeni — i to nabolje.</Example>
      </>
    ),
    check: {
      q: 'Zamijenite u svojoj rečenici vlastito ime imenom konkurenta i rečenica i dalje stoji jednako tačno. Šta to znači?',
      options: [
        'Da je rečenica dobro napisana jer vrijedi za cijelu industriju',
        'Da dio o vašoj prednosti nije dovoljno konkretan',
        'Da trebate promijeniti ciljnog kupca',
      ],
      answer: 1,
      why: 'Ako opis jednako dobro opisuje i konkurenciju, onda ne govori zašto bi kupac izabrao baš vas. Prednost treba izoštriti dok rečenica ne postane vaša.',
    },
  },

  // ─────────────────────────────── 4
  {
    title: 'Preduzetnik: zašto vaša biografija ulazi u plan',
    subtitle: 'Ideje su lako dostupne. Ono što finansijer teže procjenjuje jeste može li ih baš ova osoba izvesti.',
    body: (
      <>
        <P>Kada dvoje ljudi predaju gotovo identičan plan, odluka se donosi na osnovu toga ko stoji iza njega. To nije nepravda — to je logika rizika. Ideja na papiru ne vraća kredit; vraća ga osoba koja svaki dan ustaje i vodi posao.</P>

        <P>Zato dio o preduzetniku nije formalnost koju popunjavate na brzinu. On odgovara na pitanje: {b('postoji li razlog vjerovati da ćete ovo izvesti?')} Odgovor gradite kroz tri stvari:</P>

        <Accordion items={[
          { num: 'A', title: 'Obrazovanje i radno iskustvo', body: <>
            <p style={{ margin: '0 0 10px' }}>Nabrajanje svega što ste ikada završili nema efekta. Efekat ima ono što je povezano s ovim konkretnim poslom.</p>
            <p style={{ margin: '0 0 10px' }}>Ako otvarate frizerski salon, tri godine rada u tuđem salonu vrijede više od diplome nevezane struke — jer ste vidjeli kako posao funkcioniše iznutra, koliko ljudi dolazi u kojim satima i gdje se gubi novac.</p>
            <p style={{ margin: 0 }}>Uključite i kurseve, obuke i certifikate, posebno one iz struke ili poslovanja. Ako iskustva u ovoj djelatnosti nemate, nemojte to prikrivati — napišite kako ćete tu prazninu pokriti: partnerom, zaposlenikom sa iskustvom ili mentorstvom.</p>
          </> },
          { num: 'B', title: 'Postignuća i potvrde sa strane', body: <>
            <p style={{ margin: '0 0 10px' }}>Ovdje idu stvari koje neko drugi može potvrditi: nagrade, uspješno završeni projekti, zadovoljni klijenti, preporuke, članstva.</p>
            <p style={{ margin: 0 }}>Razlog je jednostavan — sve što sami tvrdite o sebi čitalac uzima s rezervom. Sve što može provjeriti kod trećeg lica ima drugu težinu. Ako imate ranije klijente, preporuka na pola stranice vrijedi više od cijele stranice samoopisivanja.</p>
          </> },
          { num: 'C', title: 'Motivi: zašto baš ovo', body: <>
            <p style={{ margin: '0 0 10px' }}>Motiv objašnjava hoćete li izdržati kada bude teško, a bit će teško. Iskren motiv je uvjerljiviji od uglađenog.</p>
            <p style={{ margin: '0 0 10px' }}>Motivi su obično kombinacija nekoliko stvari: uočena prilika na tržištu, lična strast prema poslu, želja za samostalnošću, finansijski cilj ili društvena misija. Nijedan od njih nije „bolji” od drugog i ne trebate se praviti plemenitiji nego što jeste.</p>
            <p style={{ margin: 0 }}>Ono što se prepozna kao neuvjerljivo jeste motiv koji ne odgovara ostatku plana — na primjer priča o misiji u planu koji je cijeli izgrađen oko brze zarade.</p>
          </> },
        ]} />

        <Example label="Kratko pravilo">Za svaku tvrdnju o sebi zapitajte se: {em('„Može li ovo neko provjeriti?”')} Ako može — ostavite. Ako ne može, potkrijepite je primjerom ili izbacite.</Example>
      </>
    ),
    check: {
      q: 'Nemate radnog iskustva u djelatnosti koju pokrećete. Šta je najbolje uraditi u planu?',
      options: [
        'Izostaviti dio o iskustvu da ne skrene pažnju na prazninu',
        'Navesti nepovezano iskustvo kao da je relevantno',
        'Priznati prazninu i opisati kako je pokrivate — partnerom, zaposlenikom ili mentorstvom',
      ],
      answer: 2,
      why: 'Čitalac prazninu ionako primijeti. Plan koji je predviđa i nudi rješenje djeluje pouzdanije od onog koji je prikriva.',
    },
  },

  // ─────────────────────────────── 5
  {
    title: 'Cijena, trošak i zarada',
    subtitle: 'Prvi susret s brojkama. Bez formula — samo odnos koji odlučuje hoće li biznis preživjeti.',
    body: (
      <>
        <P>Finansije dolaze tek u Modulu 5, ali jedan odnos vrijedi razumjeti odmah, jer utiče na sve ostalo u planu: {b('razlika između cijene i troška po jednom komadu.')}</P>

        <P>Ta razlika se zove marža. Ako proizvod prodajete za 20 KM, a izrada vas košta 8 KM, na svakom komadu vam ostaje 12 KM. Iz tih 12 KM plaćate najam, struju, plate i sve ostalo — a tek ono što preteče je vaša zarada.</P>

        <P>Zato je pitanje {em('„koliko ću prodati?”')} manje važno od pitanja {em('„koliko mi ostaje po komadu?”')}. Biznis koji na svakom komadu zarađuje malo mora prodati ogromne količine da preživi. Isprobajte to sami — pomjerajte klizače i gledajte kako se stubovi mijenjaju:</P>

        <ProfitSim />

        <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '28px 0 8px' }}>Tri stvari koje se vide na ovom simulatoru</h3>
        <P>{b('Prvo:')} spustite cijenu ispod troška i zarada postaje crvena. Svaki prodani komad tada donosi gubitak — više prodaje znači veći minus. Zvuči očito, ali dešava se često kada neko postavi cijenu „kao konkurencija” ne izračunavši svoj trošak.</P>
        <P>{b('Drugo:')} mala promjena cijene mijenja zaradu jače nego velika promjena količine. Podizanje cijene sa 20 na 22 KM povećava zaradu po komadu za skoro 17%, a kupac tu razliku često i ne primijeti.</P>
        <P>{b('Treće:')} ovo su samo varijabilni troškovi — ono što trošite po komadu. Najam i plate dolaze povrh toga i plaćate ih čak i kada ne prodate ništa. Zbog toga stvarna nula nije tamo gdje cijena pokrije materijal, nego znatno više. Taj prag računamo u Modulu 5.</P>

        <Example label="Provjerite odmah">Uzmite jedan svoj proizvod ili uslugu i izračunajte koliko vam ostaje po komadu. Ako je odgovor „ne znam tačno” — to je prva stavka za vaš plan.</Example>

        <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '28px 0 10px' }}>Na šta pazi vaš tip biznisa</h3>
        <P>Gdje nastaje trošak i koliko brzo možete rasti razlikuje se od djelatnosti do djelatnosti. Odaberite šta najviše liči na vaš slučaj:</P>

        <ScenarioPicker
          title="Odaberite tip"
          options={[
            { id: 'proizvod', label: 'Proizvod', icon: BigIcons.tag, advice: <><strong>Proizvodnja.</strong> Najveći dio troška je materijal i zalihe, a novac vam stoji zarobljen u robi prije nego što se proda. U planu opišite ko su dobavljači, koliko traje nabavka i koliki je vaš mjesečni kapacitet — jer kapacitet ograničava koliko uopšte možete zaraditi.</> },
            { id: 'usluga', label: 'Usluga', icon: BigIcons.wrench, advice: <><strong>Usluge.</strong> Materijala je malo, pa je marža obično viša — ali ste ograničeni vremenom. Kapacitet vam je broj sati koje vi i vaš tim možete odraditi. U planu naglasite kvalifikacije i to koliko klijenata realno stižete opslužiti sedmično.</> },
            { id: 'trgovina', label: 'Trgovina', icon: BigIcons.coin, advice: <><strong>Trgovina.</strong> Marža je razlika nabavne i prodajne cijene i obično je tanka, pa sve zavisi od obrta — koliko puta mjesečno prodate i obnovite zalihu. U planu pokažite koje artikle držite i koliko dugo roba stoji na polici prije prodaje.</> },
          ]}
        />
      </>
    ),
    check: {
      q: 'Proizvod prodajete za 30 KM, a materijal po komadu košta 24 KM. Šta to znači za vaš biznis?',
      options: [
        'Po komadu ostaje 6 KM, pa vam treba velika količina da pokrijete najam i plate',
        'Zarada je 30 KM po komadu jer je to prodajna cijena',
        'Biznis je siguran jer je cijena veća od troška',
      ],
      answer: 0,
      why: '30 − 24 = 6 KM po komadu. Iz te razlike se tek plaćaju najam, plate i struja, pa uz tanku maržu morate prodati mnogo komada da biste uopšte došli na nulu.',
    },
  },
]

export default function Module1() {
  return (
    <LessonModule
      moduleId={1}
      n={1}
      title="Biznis ideja i preduzetnik"
      desc="Svaki dobar biznis plan počinje jasnom idejom i osobom koja stoji iza nje. U ovom modulu opisat ćete svoju ideju u jednoj rečenici, naučiti kako predstaviti sebe i prvi put pogledati odnos cijene i troška."
      meta={[
        { icon: Icons.clock, text: '~25 minuta' },
        { icon: Icons.book, text: '5 lekcija' },
        { icon: Icons.tool, text: 'Vježbe i simulator' },
      ]}
      goals={[
        'Čemu služi biznis plan i šta traži svaki od četiri tipa čitalaca',
        'Četiri elementa svake dobre poslovne ideje i kako ih razlikovati',
        'Kako svoju ideju sažeti u jednu jasnu rečenicu',
        'Kako predstaviti sebe: iskustvo, postignuća i motive',
        'Kako razlika između cijene i troška određuje sudbinu biznisa',
      ]}
      lessons={LESSONS}
      taskTitle="Vaš zadatak"
      taskIntro="Prije sljedećeg modula pripremite ove elemente (napredak se čuva):"
      tasks={[
        'Napisao/la sam svoju ideju u jednoj rečenici',
        'Znam ko je moj idealni kupac — konkretno, ne „svi”',
        'Zapisao/la sam koji problem rješavam i koliko je kupcu velik',
        'Znam svoju prednost i ona ne vrijedi jednako za konkurenciju',
        'Imam kratku biografiju s iskustvom, postignućima i motivima',
        'Izračunao/la sam koliko mi ostaje po jednom komadu ili usluzi',
      ]}
      nextN={2}
      nextTitle="Analiza tržišta"
    />
  )
}
