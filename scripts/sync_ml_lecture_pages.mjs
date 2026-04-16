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
    slug: 'ml-1',
    title: '1. AI revoluce v materiálovém inženýrství',
    content: `
**Proč se AI v materiálech prosazuje**

Materiálový výzkum je tradičně pomalý, drahý a silně závislý na kombinaci zkušenosti, intuice a opakovaných experimentů. Umělá inteligence do tohoto procesu vstupuje jako nástroj, který umí rychleji hledat vzory v datech a zúžit prostor možných řešení.

**Od pokusů k datově řízenému návrhu**

Hlavní změna nespočívá jen v rychlejším výpočtu. AI mění samotný způsob práce. Místo slepého testování velkého množství kandidátů lze využít modely, které předem odhadnou, které složení, struktury nebo procesní podmínky mají největší šanci uspět.

**Co je materiálová informatika**

Jde o propojení materiálového inženýrství, datové analýzy a strojového učení. Cílem je převést znalosti o materiálu do formy, se kterou lze počítat, a pak pomocí modelů hledat vztahy mezi strukturou, zpracováním a výslednými vlastnostmi.

**Kde už to dnes dává smysl**

Typické aplikace zahrnují predikci vlastností materiálů, návrh nových slitin, optimalizaci výrobních parametrů nebo rychlejší vyhodnocení experimentů a simulací.

**Co si z kapitoly odnést**

AI v materiálovém inženýrství není módní doplněk, ale praktický posun od pomalého pokusného přístupu k cílenějšímu a datově řízenému návrhu materiálů.
`.trim(),
  },
  {
    slug: 'ml-2',
    title: '2. Data a featurizace',
    content: `
**Proč samotná data nestačí**

Model neumí pracovat s materiálem jako fyzikálním objektem. Potřebuje číselný popis. Proto je klíčové rozhodnout, jak převést složení, strukturu nebo mikrostrukturu do reprezentace, která zachytí podstatné informace.

**Co je featurizace**

Featurizace je převod materiálového problému do sady deskriptorů. Může jít o chemické složení, atomární vlastnosti, geometrické parametry, obrazové charakteristiky nebo výstupy simulací.

**Dobrý deskriptor není náhoda**

Příznaky mají být informačně užitečné a zároveň rozumně stabilní. Pokud zachytí šum místo podstaty, model bude sice trénovat, ale nebude dobře zobecňovat.

**Různé úlohy, různé reprezentace**

Tabulková data, obrazová data, grafové struktury nebo sekvence vyžadují jinou reprezentaci. Už v této fázi se tedy rozhoduje, jaký typ modelu bude později dávat smysl.

**Co si z kapitoly odnést**

Kvalita AI v materiálech začíná u toho, jak problém reprezentujeme. Dobrá featurizace je často stejně důležitá jako volba samotného modelu.
`.trim(),
  },
  {
    slug: 'ml-3',
    title: '3. Příprava dat pro AI v materiálech',
    content: `
**Proč je příprava dat rozhodující**

I dobrý model selže, pokud dostane nekonzistentní nebo špatně připravená data. V materiálových úlohách bývají běžné chybějící hodnoty, rozdílné jednotky, extrémy i vysoká dimenze popisu.

**Čištění a sjednocení**

Nejprve je potřeba odstranit zjevné chyby, sjednotit formát dat a zkontrolovat, zda jednotlivé záznamy opravdu reprezentují srovnatelné materiály nebo experimenty.

**Škálování a výběr znaků**

Některé algoritmy jsou citlivé na velikost hodnot, jiné na redundanci mezi příznaky. Proto se často používá normalizace, standardizace a redukce dimenze.

**Prokletí dimensionality**

S rostoucím počtem příznaků roste i riziko, že model zachytí náhodné vztahy místo skutečné struktury problému. Příliš bohatý popis bez dostatečného množství dat bývá spíš problém než výhoda.

**Co si z kapitoly odnést**

Příprava dat není technická formalita. Je to fáze, která zásadně ovlivňuje, jestli bude pozdější model užitečný, nebo jen klamně přesný na trénovacích datech.
`.trim(),
  },
  {
    slug: 'ml-4',
    title: '4. Trénink a validace modelů',
    content: `
**Co znamená model opravdu otestovat**

Nestačí model natrénovat a podívat se, jak vyšel na datech, která už viděl. Smyslem je zjistit, zda bude fungovat i na nových materiálech nebo nových experimentech.

**Rozdělení dat**

Základní krok je oddělit trénovací a testovací část. Ještě důležitější je rozumět tomu, zda jsou data skutečně nezávislá a zda test neobsahuje příliš podobné vzorky jako trénink.

**Křížová validace a ladění**

Křížová validace pomáhá odhadnout stabilitu modelu a brání tomu, aby výsledek závisel jen na jednom šťastném rozdělení dat. Současně umožňuje rozumně ladit hyperparametry.

**Metody hodnocení**

Volba metriky závisí na úloze. U regrese jde často o velikost chyby, u klasifikace o správnost rozlišení tříd. Důležité je, aby metrika odpovídala praktickému cíli.

**Co si z kapitoly odnést**

Dobrá validace je ochrana proti sebeklamu. Teprve ona ukáže, zda model skutečně chápe problém, nebo jen memoruje data, která už jednou viděl.
`.trim(),
  },
  {
    slug: 'ml-5',
    title: '5. Základní modely a explorace dat',
    content: `
**Proč začínat jednoduše**

Základní modely bývají dobrým výchozím bodem. Umožňují rychle ověřit, zda v datech vůbec existuje využitelný signál, a často slouží jako rozumná baseline pro složitější přístupy.

**Regrese, klasifikace a clustering**

Regresní modely odhadují spojité vlastnosti, klasifikace rozděluje materiály do kategorií a shlukování pomáhá hledat strukturu v datech bez explicitních štítků.

**Explorace před modelováním**

Než začne samotný trénink, má smysl podívat se na rozložení hodnot, korelace, odlehlé body a základní vztahy mezi příznaky. Často se tím odhalí problémy, které by jinak model jen zakryl.

**Interpretace jednoduchých modelů**

Výhodou lineárních a dalších základních přístupů je, že se z nich lépe čte, které faktory mají vliv a jakým směrem působí.

**Co si z kapitoly odnést**

Jednoduché modely nejsou slabé jen proto, že jsou jednoduché. Často jsou nejrychlejší cestou k tomu pochopit, co data skutečně říkají.
`.trim(),
  },
  {
    slug: 'ml-6',
    title: '6. Ansámblové metody a XAI',
    content: `
**Proč jeden model často nestačí**

Jednotlivé modely mohou být nestabilní nebo příliš citlivé na konkrétní rozdělení dat. Ansámblové metody tento problém zmírňují tím, že skládají více modelů dohromady.

**Bagging a boosting**

Bagging snižuje varianci tím, že kombinuje více částečně odlišných modelů. Boosting naopak skládá modely postupně tak, aby každý další opravoval chyby předchozích.

**Proč jsou v tabulkových datech silné**

V mnoha materiálových úlohách nad strukturovanými daty patří ansámblové přístupy k nejpraktičtějším. Často dávají silný výkon bez extrémních nároků na množství dat.

**XAI jako most k interpretaci**

S rostoucí složitostí modelu klesá jeho čitelnost. Proto nastupují metody vysvětlitelné AI, které pomáhají určit, které příznaky nejvíce ovlivnily konkrétní predikci nebo chování modelu jako celku.

**Co si z kapitoly odnést**

Ansámblové modely často zvyšují výkon, ale zároveň vytvářejí tlak na interpretaci. XAI je proto důležitá hlavně tam, kde nechceme jen predikovat, ale i rozumět.
`.trim(),
  },
  {
    slug: 'ml-7',
    title: '7. Pokročilé techniky a nasazení klasického ML',
    content: `
**Co následuje po dobrém modelu**

Úspěšný experiment v notebooku ještě neznamená použitelný nástroj. Reálné nasazení vyžaduje stabilní workflow, sledování kvality dat a schopnost model průběžně vyhodnocovat.

**Ladění a robustnost**

Pokročilejší klasické ML zahrnuje promyšlené ladění hyperparametrů, práci s nerovnováhou tříd, prevenci přeučení a kontrolu citlivosti modelu na změny ve vstupu.

**Pipeline a reprodukovatelnost**

Celý proces od předzpracování po predikci má být opakovatelný. Právě pipeline pomáhá zajistit, že se při nasazení neztratí kroky, které fungovaly během vývoje.

**Kde se klasické ML vyplatí**

Na tabulkových datech s omezeným počtem vzorků bývá klasické ML stále velmi silné. Ne každá úloha potřebuje hluboké sítě.

**Co si z kapitoly odnést**

Hodnota modelu se ukáže až ve chvíli, kdy je možné ho spolehlivě použít mimo laboratorní demo. Nasazení je proto součástí návrhu, ne až jeho dodatek.
`.trim(),
  },
  {
    slug: 'ml-8',
    title: '8. Úvod do neuronových sítí a hlubokého učení',
    content: `
**Proč vůbec přecházet k neuronovým sítím**

Některé problémy mají složitější vztahy, než jaké se dají dobře zachytit ručně navrženými příznaky a klasickými modely. Neuronové sítě umožňují učit se reprezentaci i rozhodovací pravidla společně.

**Základní princip**

Síť skládá více vrstev transformací, které postupně převádějí vstup do užitečnější reprezentace. Tím vzniká schopnost modelovat nelineární a složité vztahy.

**Trénink a ztrátová funkce**

Model se učí upravováním vah tak, aby minimalizoval chybu mezi predikcí a cílem. Klíčové jsou gradienty, optimalizace a volba vhodné architektury.

**Výhody i rizika**

Hluboké modely mohou být velmi silné, ale obvykle potřebují více dat, výpočetního výkonu i pečlivější regulaci než klasické přístupy.

**Co si z kapitoly odnést**

Neuronové sítě dávají smysl hlavně tam, kde je problém příliš složitý pro jednoduchou ruční reprezentaci a kde se vyplatí učit i samotný popis dat.
`.trim(),
  },
  {
    slug: 'ml-9',
    title: '9. Konvoluční sítě a augmentace dat',
    content: `
**Proč obrazy potřebují jiný model**

U obrazových dat nestačí každý pixel vnímat izolovaně. Důležitá je lokální struktura, opakující se vzory a prostorové uspořádání.

**Co dělá CNN**

Konvoluční síť používá filtry, které se opakovaně posouvají přes obraz a hledají charakteristické vzory. Díky tomu je vhodná pro mikrostruktury, mapy polí i další prostorová data.

**Hierarchie znaků**

Nižší vrstvy obvykle zachytí jednoduché tvary a hrany, vyšší vrstvy složitější textury nebo strukturální motivy. Síť si tak postupně vytváří vlastní reprezentaci obrazu.

**Proč je důležitá augmentace**

U malých datasetů pomáhá rozšířit variabilitu tréninku pomocí rotací, ořezů nebo jiných transformací. Cílem není vytvořit nová data uměle, ale pomoci modelu zobecnit.

**Co si z kapitoly odnést**

CNN jsou silné tehdy, když problém skutečně stojí na prostorovém vzoru. U obrazových a mikrostrukturních dat často dávají mnohem přirozenější řešení než klasické tabulkové modely.
`.trim(),
  },
  {
    slug: 'ml-10',
    title: '10. GNN pro materiálové simulace a MLIPs',
    content: `
**Proč grafy sedí na atomární svět**

Molekuly a krystalové struktury nejsou přirozeně mřížka pixelů ani obyčejná tabulka. Lépe je vystihuje graf, kde uzly reprezentují atomy a hrany jejich vazby nebo interakce.

**Co dělá GNN**

Grafová neuronová síť šíří informaci mezi sousedními uzly a postupně skládá lokální interakce do bohatší reprezentace celé struktury.

**Vztah k materiálovým simulacím**

Právě díky této reprezentaci jsou GNN silné pro predikci energií, sil, stabilit nebo jiných vlastností na atomární úrovni.

**MLIPs v praxi**

Strojově učené meziatomové potenciály se snaží přiblížit přesnost dražších metod při výrazně nižších nákladech. To otevírá cestu k rychlejším simulacím větších systémů.

**Co si z kapitoly odnést**

GNN dávají v materiálech smysl proto, že respektují relační povahu atomárních struktur. Nejde jen o moderní architekturu, ale o vhodnější jazyk pro daný typ dat.
`.trim(),
  },
  {
    slug: 'ml-11',
    title: '11. Sekvenční data, RNN a Transformery',
    content: `
**Kde v materiálech vznikají sekvence**

Sekvenční charakter mají texty, časové řady, spektra i některé zápisy chemických struktur. V těchto úlohách záleží nejen na obsahu, ale i na pořadí a kontextu.

**RNN a práce s historií**

Rekurentní sítě byly navržené tak, aby si nesly informaci z předchozích kroků. Jsou přirozené pro data, kde význam závisí na tom, co přišlo dřív.

**Transformery a pozornost**

Transformery posouvají práci se sekvencemi dál tím, že se nespoléhají jen na postupné zpracování, ale dokáží přímo vyhodnocovat vztahy mezi různými částmi vstupu.

**Proč je to důležité**

V materiálové vědě to otevírá cestu k lepší práci s literaturou, databázemi textových záznamů i dalšími sekvenčními zdroji.

**Co si z kapitoly odnést**

Když problém stojí na pořadí a kontextu, je potřeba architektura, která to umí reprezentovat. Právě proto mají RNN a hlavně transformery své místo i v tomto oboru.
`.trim(),
  },
  {
    slug: 'ml-12',
    title: '12. PINNs a kvantifikace nejistoty',
    content: `
**Proč samotná přesnost nestačí**

V inženýrských úlohách je důležité nejen to, jakou predikci model vrátí, ale i zda jí lze důvěřovat a zda není v rozporu s fyzikální realitou.

**PINNs jako spojení dat a rovnic**

Fyzikálně informované neuronové sítě vkládají do učení omezení daná známými rovnicemi nebo zákonitostmi. Tím pomáhají vytvářet modely, které nejsou jen statisticky přesné, ale i fyzikálně konzistentní.

**Nejistota není slabost**

Model, který umí přiznat nejistotu, je v praxi užitečnější než model, který sebevědomě chybuje. Rozlišuje se nejistota daná šumem v datech a nejistota daná tím, že model problém dostatečně nezná.

**Kde to pomáhá**

Tyto přístupy jsou důležité tam, kde pracujeme s malými datasety, drahými experimenty nebo kritickými rozhodnutími.

**Co si z kapitoly odnést**

PINNs a kvantifikace nejistoty posouvají AI blíž k vědeckému nástroji, kterému lze rozumně věřit i mimo čistě benchmarkové úlohy.
`.trim(),
  },
  {
    slug: 'ml-13',
    title: '13. Inverzní návrh a generativní AI',
    content: `
**Od predikce k návrhu**

Prediktivní model odpovídá na otázku, jaké vlastnosti bude mít daný materiál. Inverzní návrh obrací směr a ptá se, jaký materiál nebo strukturu potřebujeme, abychom dosáhli požadovaného chování.

**Proč je to zásadní změna**

Místo hodnocení kandidátů po jednom lze cílit přímo na návrhový prostor a hledat řešení, která splní zadané požadavky na pevnost, stabilitu, vodivost nebo jiné vlastnosti.

**Role generativních modelů**

Generativní AI může navrhovat nové struktury, složení nebo reprezentace kandidátů, které pak následně vyhodnotí prediktivní nebo fyzikální modely.

**Potřeba omezení a validace**

Takový návrh musí stále respektovat fyziku, vyrobitelnost i reálné limity experimentu. Generace bez kontroly je zajímavá jen na papíře.

**Co si z kapitoly odnést**

Inverzní návrh je logický vrchol celé studijní osy. Ukazuje, jak se AI může posunout od analýzy existujících dat k aktivnímu vytváření nových materiálových řešení.
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
