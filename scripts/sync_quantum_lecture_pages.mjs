import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const lecturePages = [
  {
    slug: 'quantum-1',
    title: '1. Úvod do kvantových technologií',
    content: `
**Proč se o kvantových technologiích vůbec bavíme**

Kvantové technologie nejsou „jen rychlejší počítače“. Jde o celou skupinu přístupů, které využívají zvláštní chování částic na mikroskopické úrovni. Díky tomu umíme měřit přesněji, komunikovat bezpečněji a v budoucnu i řešit problémy, které jsou pro běžné počítače extrémně těžké.

**První a druhá kvantová revoluce**

První kvantová revoluce přinesla technologie jako tranzistory, lasery nebo magnetickou rezonanci. Tyto objevy využívaly kvantovou fyziku spíše nepřímo a ve velkých souborech částic.

Druhá kvantová revoluce je jiná. Snažíme se řídit jednotlivé kvantové stavy přímo. To je zásadní rozdíl: místo „využití průměrného efektu“ chceme aktivně pracovat s jedním fotonem, jedním atomem nebo jedním qubitem.

**Tři pojmy, bez kterých se dál nepohneme**

**Superpozice** znamená, že kvantový systém nemusí být jen v jednom stavu. Dokud ho neměříme, může být v kombinaci více možností současně.

**Provázání** znamená, že dva kvantové systémy se mohou chovat jako jeden propojený celek. Změna nebo měření jednoho systému ovlivní informaci o druhém.

**Interference** je mechanismus, kterým kvantové algoritmy nebo experimenty zvýrazňují „správné“ možnosti a potlačují ty nepodstatné.

**Kde se to používá**

V praxi dnes mluvíme hlavně o třech oblastech: kvantové senzorice, kvantové komunikaci a kvantových výpočtech. Senzorika je už dnes poměrně praktická. Komunikace se rychle rozvíjí. Univerzální kvantové počítače jsou zatím technologicky nejtěžší část celého oboru.

**Co je na tom nejtěžší**

Největší problém je křehkost kvantových stavů. Jakmile na systém působí teplo, vibrace nebo elektromagnetický šum, velmi snadno ztratí své kvantové vlastnosti. Tento jev se nazývá dekoherence.

Právě proto kvantové technologie nejsou jen o teorii. Jsou stejně tak o materiálech, chlazení, izolaci, optice, elektronice a přesném řízení experimentu.

**Jak o oboru přemýšlet**

Nejlepší je nevnímat kvantové technologie jako jednu věc. Jde spíš o nový technologický ekosystém. Některé jeho části už fungují dnes. Jiné jsou stále ve vývoji. Společné ale mají to, že využívají fyziku mikrosvěta vědomě a cíleně.

**Co si z kapitoly odnést**

Kvantové technologie stojí na tom, že umíme řídit kvantové stavy mnohem přesněji než dřív. To otevírá cestu k novým typům senzorů, bezpečné komunikaci i výpočetním metodám, které se od klasických zásadně liší.
`.trim(),
  },
  {
    slug: 'quantum-2',
    title: '2. Kvantové materiály',
    content: `
**Proč jsou materiály pro kvantové technologie klíčové**

V kvantových technologiích nestačí mít dobrý algoritmus nebo chytrý nápad. Pokud materiál kolem qubitu nebo senzoru vytváří příliš mnoho šumu, celý systém přestane fungovat. Materiál tedy není „obal“ technologie. Je to její základ.

**Co přesně materiál kazí**

Kvantový stav je extrémně citlivý na okolí. Vadí mu teplo, vibrace, chemické nečistoty, nábojový šum i magnetické fluktuace. V klasické elektronice to často nevadí. V kvantové technologii to může znamenat okamžitou ztrátu informace.

**Izotopová čistota a proč na ní záleží**

U některých platforem, například u spinových qubitů v křemíku, je důležité i to, jaké izotopy materiál obsahuje. Některé izotopy vytvářejí jaderný spinový šum, který ruší chování elektronu používaného jako qubit. Proto se používají extrémně čisté materiály, které jsou na první pohled „stejné“, ale z kvantového hlediska se chovají mnohem lépe.

**Supravodiče jako dnešní tahoun kvantových procesorů**

Velká část současných kvantových procesorů stojí na supravodivých obvodech. Jejich výhoda je, že se dají vyrábět relativně škálovatelně a navazují na zkušenosti z mikroelektroniky.

Nevýhoda je zřejmá: vyžadují velmi hluboké chlazení a pečlivou ochranu před vnějším rušením. Jakmile systém ztratí koherenci, výpočet se rozpadá.

**Diamant, NV centra a další speciální platformy**

V senzorice se často používají diamantové struktury s takzvanými NV centry. Jde o řízené defekty v krystalové mřížce, které jsou překvapivě užitečné. Umožňují velmi citlivé měření magnetického pole nebo teploty a přitom mohou fungovat i za pokojové teploty.

To je dobrý příklad toho, že v kvantových technologiích není defekt vždy problém. Někdy je naopak záměrně vytvořenou součástí zařízení.

**Materiály nejsou jen pro počítače**

Kvantové materiály nejsou důležité jen pro qubity. Potřebujeme je také pro stabilní fotonické součástky, přesné senzory, kvantové komunikační prvky nebo nové typy detektorů. Materiálová věda je tedy společným jmenovatelem celého oboru.

**Hlavní inženýrská výzva**

Cílem není najít „dokonalý materiál“. Cílem je najít takovou kombinaci materiálu, geometrie, teploty a řízení, která udrží kvantový stav dostatečně dlouho na to, aby technologie byla užitečná.

**Co si z kapitoly odnést**

Kvantové technologie stojí na materiálech, které minimalizují šum a dovolují stabilní práci s kvantovým stavem. Bez mimořádně čistých a přesně navržených struktur by kvantové senzory, komunikace ani počítače nemohly fungovat.
`.trim(),
  },
  {
    slug: 'quantum-3',
    title: '3. Kvantová senzorika a metrologie',
    content: `
**Proč je senzorika dnes nejpraktičtější část kvantových technologií**

Kvantové počítače jsou stále náročné a drahé. Kvantová senzorika je ale v mnoha případech už dnes použitelná. Důvod je jednoduchý: místo dlouhého udržení složitého výpočtu často stačí přesně změřit malou změnu v okolí kvantového systému.

**Dekoherence jako problém i výhoda**

U kvantových počítačů je dekoherence nepřítel. U senzorů je to částečně naopak. Kvantový systém je citlivý na vnější pole, a právě tuto citlivost využíváme k měření.

Jinými slovy: to, co výpočet ruší, může být v senzorice zdrojem signálu.

**Co všechno lze měřit**

Kvantové senzory se používají pro přesné měření času, gravitace, magnetického pole, polohy, zrychlení nebo teploty. Často dosahují citlivosti, kterou je klasickými metodami velmi těžké překonat.

**Atomové hodiny**

Jedním z nejznámějších příkladů jsou atomové hodiny. Ty dnes tvoří základ navigačních systémů a přesné synchronizace sítí. Novější optické atomové hodiny jdou ještě dál a umožňují měřit čas s extrémní přesností.

Tak přesné měření času není jen akademická disciplína. Má přímý dopad na GPS, telekomunikace, vědecké experimenty i geodézii.

**Magnetometrie a biomedicína**

Kvantová senzorika se uplatňuje i v medicíně, například při měření velmi slabých magnetických polí. Díky tomu lze sledovat aktivitu mozku nebo hledat jemné fyzikální signály v biologických systémech.

NV centra v diamantu jsou zde obzvlášť zajímavá, protože kombinují vysokou citlivost s relativně praktickým provozem.

**Gravimetrie a navigace**

Další důležitá oblast je kvantová gravimetrie. Pomocí atomových interferometrů lze velmi přesně měřit gravitační změny. To je důležité třeba pro geologický průzkum, navigaci bez GPS nebo sledování podzemních struktur.

**Co je na kvantových senzorech silné**

Jejich největší síla spočívá v tom, že měří přímo fyzikální realitu velmi blízko jejím limitům. Nejde jen o „lepší čidlo“. Jde o jiný princip měření, který vychází z kvantové mechaniky samotné.

**Co si z kapitoly odnést**

Kvantová senzorika je dnes nejzralejší větev oboru. Využívá extrémní citlivost kvantových stavů k přesnému měření času, pole, gravitace nebo biologických signálů a v řadě aplikací už překračuje možnosti klasických přístupů.
`.trim(),
  },
  {
    slug: 'quantum-4',
    title: '4. Kvantová komunikace a bezpečnost',
    content: `
**Proč je kvantová komunikace důležitá**

Dnešní digitální bezpečnost stojí hlavně na tom, že některé matematické úlohy jsou pro běžné počítače příliš těžké. Kvantové počítače ale mohou tuto rovnováhu změnit. To znamená, že část dnešních šifrovacích metod nebude do budoucna dostatečná.

**Q-Day a co ten pojem znamená**

Q-Day označuje okamžik, kdy bude existovat dostatečně silný kvantový počítač schopný prakticky ohrozit dnešní asymetrickou kryptografii. Nejde jen o teoretický problém. Už dnes dává smysl připravovat infrastrukturu na období, kdy klasické zabezpečení nebude stačit.

**Harvest now, decrypt later**

Velká hrozba spočívá v tom, že útočník může data zachytit už dnes a rozšifrovat je až v budoucnu. To je zvlášť problematické u informací, které mají dlouhou životnost: státní dokumenty, výzkumná data, citlivé firemní materiály nebo zdravotní záznamy.

**Co přináší kvantová distribuce klíče**

Kvantová distribuce klíče, často označovaná jako QKD, nestaví bezpečnost na obtížnosti výpočtu. Staví ji na fyzikálních zákonech.

Pokud se někdo pokusí kvantově přenášený signál odposlouchávat, samotným měřením ho změní. Oprávnění účastníci tak mohou odhalit, že do komunikace někdo zasahoval.

**Teorém o zákazu klonování**

Jeden z klíčových principů říká, že neznámý kvantový stav nelze dokonale zkopírovat. To je zásadní rozdíl proti klasickému světu, kde se data běžně kopírují bez narušení originálu.

Právě tato vlastnost dává kvantové komunikaci její bezpečnostní sílu.

**QKD není jediné řešení**

Vedle kvantové komunikace se rozvíjí i post-kvantová kryptografie. Ta nevyužívá kvantovou fyziku přímo, ale zavádí nové matematické algoritmy, které mají odolat i kvantovým útokům.

Prakticky tedy budoucnost nebude stát jen na jedné technologii. Spíše půjde o kombinaci post-kvantové kryptografie a kvantové distribuce klíčů tam, kde je potřeba nejvyšší úroveň zabezpečení.

**Evropa a svět**

Kvantová komunikace už není čistě laboratorní téma. Budují se národní a nadnárodní sítě, experimentuje se se satelity a vznikají projekty, které mají propojit kritickou infrastrukturu novým bezpečnostním způsobem.

**Co si z kapitoly odnést**

Kvantová komunikace mění bezpečnostní logiku: místo důvěry v „těžkou matematiku“ využívá fyzikální vlastnosti kvantových stavů. To z ní dělá jednu z nejstrategičtějších částí celého oboru.
`.trim(),
  },
  {
    slug: 'quantum-5',
    title: '5. Kvantové výpočty a simulace',
    content: `
**Čím se kvantový počítač liší od klasického**

Kvantový počítač není jen silnější verze notebooku nebo serveru. Nepracuje s bity, ale s qubity. Ty mohou být v superpozici a mohou být mezi sebou provázané. Díky tomu se celý výpočet neorganizuje jako klasické postupné zpracování jedné možnosti za druhou.

**Častý omyl: „zkouší všechny odpovědi naráz“**

Tohle tvrzení je zjednodušené a zavádějící. Kvantový počítač není kouzelná krabička, která prostě paralelně projde všechny varianty a vybere správnou. Jeho síla je spíš v tom, že pomocí interference zvýrazní správné směry výpočtu a potlačí slepé cesty.

**Superpozice, provázání a interference ve výpočtu**

Superpozice rozšiřuje prostor možných stavů. Provázání spojuje qubity tak, že se systém chová jako celek. Interference pak určuje, které výpočetní výsledky se zesílí a které se naopak vyruší.

Právě tato kombinace je jádrem kvantové výpočetní výhody.

**Kvantová hradla a obvody**

Podobně jako klasické počítače používají logická hradla, i kvantové počítače používají své operace nad qubity. Důležité je, že kvantová hradla mění stav systému řízeným a vratným způsobem. Celý algoritmus je pak posloupnost takových kroků.

**Proč jsou simulace tak důležité**

Jedna z nejsilnějších motivací pro kvantové počítání není kancelářský software, ale simulace přírody. Molekuly, materiály a chemické reakce jsou samy o sobě kvantové systémy. Klasické počítače je umějí aproximovat, ale rychle narážejí na složitost.

Kvantový počítač má potenciál simulovat takové systémy přirozeněji a efektivněji.

**Známé algoritmy**

Groverův algoritmus ukazuje, jak lze zrychlit vyhledávání v nestrukturovaném prostoru. Shorův algoritmus je známý tím, že ohrožuje část dnešní kryptografie. Tyto algoritmy jsou důležité hlavně proto, že ukazují, kde se kvantový přístup zásadně liší od klasického.

**NISQ éra a realita dneška**

Současná zařízení stále spadají do takzvané NISQ éry. To znamená, že jsou už zajímavá, ale stále hlučná, omezená a citlivá na chyby. Proto se dnes hodně pracuje s hybridními přístupy a s úlohami, kde kvantová část doplňuje klasický výpočet.

**Co si z kapitoly odnést**

Kvantové výpočty nejsou univerzální náhradou klasických počítačů. Jejich síla spočívá ve specifických typech úloh, zejména v simulacích a ve strukturách, kde lze využít superpozici, provázání a interferenci lépe než v klasickém světě.
`.trim(),
  },
  {
    slug: 'quantum-6',
    title: '6. Kvantové strojové učení (QML)',
    content: `
**Proč se spojuje kvantová fyzika a AI**

Strojové učení pracuje s velkými daty, vysokou dimenzionalitou a složitými vztahy mezi proměnnými. Kvantové systémy jsou přirozeně schopné pracovat ve velmi bohatých stavových prostorech. Proto se nabízí otázka, jestli by kvantové výpočty mohly některé úlohy strojového učení urychlit nebo zpřesnit.

**Co je QML**

Quantum Machine Learning je obor na pomezí kvantových výpočtů a umělé inteligence. Typicky jde o hybridní přístup: část úlohy běží klasicky a část se řeší pomocí kvantového obvodu nebo kvantového modelu.

Není to tedy „AI běžící celá na kvantovém počítači“, ale spíš chytré propojení obou světů.

**Kde je hlavní příslib**

Teoretická výhoda se objevuje hlavně tam, kde pracujeme s velmi složitými strukturami dat, komplikovanými optimalizačními úlohami nebo s reprezentacemi, které se klasicky škálují špatně. Kvantový systém může některé takové prostory reprezentovat přirozeněji.

**Největší problém: načtení dat**

Velké omezení dnešního QML je v tom, že data vznikají klasicky, ale kvantový počítač je potřebuje zakódovat do kvantového stavu. Tento krok bývá náročný a může smazat část teoretické výhody.

Jinými slovy: nestačí mít rychlý kvantový model. Musíme ještě efektivně dostat data dovnitř.

**Hybridní modely**

Proto dnes dávají největší smysl hybridní architektury. Klasický počítač zpracuje to, co dělá dobře, a kvantová část řeší úzký výpočetní krok, kde může být přínosná. To je mnohem realističtější než představa čistě kvantové AI.

**Kde může mít QML smysl**

Mluví se o aplikacích v chemii, farmacii, materiálovém výzkumu, optimalizaci, finančních modelech nebo vybraných klasifikačních úlohách. Důležité ale je nepodlehnout hype. V mnoha úlohách dnes klasické modely stále dominují.

**Jak se na QML dívat střízlivě**

QML je slibný směr, ale je potřeba ho hodnotit realisticky. Ne každá úloha z AI se zlepší jen tím, že ji přesuneme na kvantový hardware. Přínos bude pravděpodobně selektivní a bude záviset na konkrétním problému i kvalitě budoucího hardwaru.

**Co si z kapitoly odnést**

Kvantové strojové učení je zajímavé hlavně jako hybridní disciplína. Má potenciál pomoci u vybraných složitých úloh, ale jeho skutečná hodnota bude záviset na tom, zda se podaří překonat omezení dnešního hardwaru a efektivně pracovat s daty.
`.trim(),
  },
  {
    slug: 'quantum-7',
    title: '7. Kvantové a hybridní algoritmy',
    content: `
**Proč nestačí říct, že kvantový počítač je jen „rychlejší klasický“**

Kvantový algoritmus nefunguje tak, že prostě vyzkouší všechny možnosti najednou a potom z nich vybere správnou. To je časté zjednodušení, ale ve skutečnosti je klíčem něco jiného: práce s amplitudami pravděpodobnosti a s interferencí.

Kvantový výpočet tedy nestojí jen na množství paralelně reprezentovaných stavů, ale hlavně na tom, jak algoritmus zesiluje užitečné výsledky a potlačuje ty špatné.

**Klasický versus kvantový přístup**

Klasický algoritmus postupuje přes jasně definované kroky a stavy. Kvantový algoritmus pracuje s qubity v superpozici a během výpočtu manipuluje s jejich fází. To znamená, že návrh algoritmu je víc podobný řízení vlnění než skládání běžného programu s podmínkami a cykly.

Jádrem kvantového návrhu je zajistit, aby správné cesty vedly ke konstruktivní interferenci a chybné cesty se naopak vzájemně vyrušily.

**Co je kvantové orákulum**

V mnoha slavných kvantových algoritmech se objevuje takzvané orákulum. Je to speciální část obvodu, která umí označit správné řešení, aniž by ho rovnou „prozradila“. Typicky to udělá tak, že změní fázi stavu odpovídajícího správné odpovědi.

Tato změna sama o sobě ještě nic nevyřeší. Smysl dostane až v dalších krocích algoritmu, kde právě díky interferenci začne růst pravděpodobnost správného výsledku.

**Proč jsou čistě teoretické algoritmy v praxi problém**

Na papíře může orákulum vypadat elegantně. V reálném hardwaru ale bývá jeho konstrukce velmi náročná. Čím složitější funkci chceme realizovat, tím delší a křehčí je celý kvantový obvod.

To je zásadní problém dnešní éry hlučných zařízení. Pokud je obvod příliš dlouhý, systém ztratí koherenci dřív, než výpočet dokončíme.

**Proč dnes dominují hybridní algoritmy**

Právě kvůli omezením současného hardwaru se dnes prosazují hybridní přístupy. Klasický počítač řídí optimalizaci, vyhodnocuje výsledky a spravuje většinu logiky. Kvantový procesor mezitím řeší jen úzký, ale výpočetně zajímavý krok.

Je to praktický kompromis: místo jednoho dlouhého kvantového výpočtu používáme mnoho krátkých běhů, mezi nimiž klasická část upravuje parametry dalšího pokusu.

**VQE: chemie, materiály a základní energie**

Jedním z nejdůležitějších hybridních algoritmů je VQE. Používá se hlavně tam, kde chceme odhadnout základní energetický stav molekul nebo materiálů. To je důležité pro chemii, návrh léčiv, katalyzátorů nebo bateriových materiálů.

Smyslem VQE je postupně ladit parametrizovaný kvantový obvod tak, aby měřená energie klesala co nejníže. Klasická část výpočtu hledá lepší parametry, kvantová část měří výsledek.

**QAOA: optimalizace v logistice a kombinatorice**

Dalším klíčovým hybridním algoritmem je QAOA. Ten cílí na kombinatorické optimalizační úlohy, kde existuje obrovské množství možných řešení a my hledáme to nejlepší nebo velmi dobré.

Typickými příklady jsou plánování tras, rozvrhování, optimalizace zdrojů nebo logistické problémy. QAOA nefunguje jako zázračné univerzální řešení všech NP-těžkých úloh, ale ukazuje, jak lze kvantové a klasické metody rozumně spojit při hledání kvalitních aproximací.

**Frameworky a vývojářská praxe**

Dnešní kvantové algoritmy se nevyvíjejí „ručně od nuly“ na hardwaru. Klíčovou roli hrají softwarové frameworky jako Qiskit, PennyLane nebo Cirq. Umožňují navrhovat obvody, simulovat je klasicky, ladit parametry a teprve potom je posílat na reálné kvantové procesory.

To je důležité i prakticky: většina vývoje dnes probíhá v hybridním workflow, kde se střídá simulace, klasická optimalizace a omezené běhy na skutečném zařízení.

**Co si z kapitoly odnést**

Kapitola ukazuje, že skutečná síla kvantových algoritmů neleží v jednoduché představě „všechno najednou“, ale v přesném řízení interference. Zároveň vysvětluje, proč dnešní praxe stojí hlavně na hybridních algoritmech jako VQE a QAOA, které propojují kvantový procesor s klasickou optimalizací a dávají smysl už na současném hardwaru.
`.trim(),
  },
];

async function syncPages() {
  for (const page of lecturePages) {
    const { error } = await supabase
      .from('pages')
      .upsert(
        {
          slug: page.slug,
          title: page.title,
          content: page.content,
        },
        { onConflict: 'slug' }
      );

    if (error) {
      console.error(`Failed to sync ${page.slug}:`, error.message);
      process.exitCode = 1;
      continue;
    }

    console.log(`Synced ${page.slug}`);
  }
}

syncPages().catch((error) => {
  console.error(error);
  process.exit(1);
});
