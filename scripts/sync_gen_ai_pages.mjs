import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const pages = [
  {
    slug: 'gen-ai',
    title: 'Generativní AI',
    content: '',
  },
  {
    slug: 'gen-ai-1',
    title: '1. Jak správně promptovat',
    content: `
**Proč prompt rozhoduje o výsledku**

Model nečte záměr mezi řádky. Odpovídá na to, co opravdu dostane. Kvalita promptu proto zásadně ovlivňuje přesnost, strukturu i použitelnost výsledku.

**Co má dobrý prompt obsahovat**

Nejdůležitější je jasně říct, co má být výstupem, pro koho je určený a v jaké podobě ho chcete dostat. Pomáhá určit úkol, kontext, omezení, cílový formát a kritéria kvality.

**Buďte konkrétní**

Vágní zadání vede k vágní odpovědi. Pokud chcete shrnutí, uveďte délku. Pokud chcete tabulku, napište to. Pokud má model hodnotit varianty, definujte podle čeho.

**Oddělujte instrukce od vstupu**

U delších zadání pomáhá vizuálně oddělit instrukci od dat, například pomocí nadpisů, odrážek nebo bloků textu. Model pak lépe rozpozná, co je zadání a co je materiál ke zpracování.

**Ukažte požadovaný formát**

Když je výstup důležitý pro další práci, má smysl přímo ukázat cílovou strukturu. Například seznam polí, osnovu nebo vzor odpovědi. Tím se výrazně snižuje nejednoznačnost.

**Rozdělení složité úlohy**

U náročnějších zadání bývá lepší rozdělit problém na menší kroky. Model pak méně tápe a snáz drží logiku postupu.

**Začínejte jednoduše**

Prakticky se vyplatí postupovat od jednoduchého zadání ke složitějšímu. Nejdřív zkusit přímý prompt, pak doplnit příklady a teprve poté přidávat další pravidla nebo více kroků.

**Iterace místo jednorázového dotazu**

Promptování je často dialog. První odpověď nemusí být finální. Má smysl doplňovat kontext, zpřesňovat požadavky a opravovat směr.

**Kontrola výstupu**

Silný prompt neslouží jen k získání textu, ale i k omezení chyb. Užitečné je chtít zdůvodnění, strukturu, vyznačení nejistoty nebo oddělení faktů od odhadů.

**Co si z kapitoly odnést**

Správné promptování není trik, ale disciplína přesného zadání. Čím jasnější je úloha, tím spolehlivější bývá odpověď modelu.
`.trim(),
  },
  {
    slug: 'gen-ai-2',
    title: '2. AI Act',
    content: `
**Co je AI Act**

AI Act je evropský právní rámec pro regulaci systémů umělé inteligence. Jeho cílem není AI zakázat, ale rozdělit různé typy použití podle rizika a určit, jaké povinnosti z toho plynou.

**Rizikový přístup**

Základní logika regulace stojí na tom, že ne všechny AI systémy jsou stejně nebezpečné. Jiný režim platí pro běžné nástroje a jiný pro systémy, které mohou zasahovat do bezpečnosti, práv nebo přístupu ke službám.

**Zakázané a vysoce rizikové použití**

Některé praktiky jsou zakázané úplně, například určité manipulativní nebo nepřiměřeně invazivní způsoby použití AI. Jiná použití spadají do kategorie vysokého rizika a vyžadují přísnější dokumentaci, dohled, správu dat a kontrolu souladu.

**Generativní modely a GPAI**

AI Act řeší i obecné modely použitelné pro mnoho různých úloh. U těchto GPAI modelů se řeší hlavně technická dokumentace, politika k autorským právům a zveřejnění shrnutí tréninkového obsahu. U modelů se systémovým rizikem přibývá i řízení rizik, hlášení incidentů a bezpečnostní opatření.

**Kdy pravidla dopadají**

Pravidla se neuplatnila všechna najednou. Zákazy a část základních ustanovení se začaly používat od 2. února 2025. Povinnosti pro GPAI modely od 2. srpna 2025. Plná obecná použitelnost aktu má nastat od 2. srpna 2026, přičemž některé části mají vlastní harmonogram.

**Proč je to důležité i pro uživatele**

AI Act není jen téma pro právníky. Dopadá i na školy, firmy a instituce, které AI nástroje používají nebo nasazují do vlastních procesů. Rozdíl je mezi běžným použitím nástroje a vytvořením systému, který sám vstupuje do rozhodování o lidech, bezpečnosti nebo regulovaných službách.

**Co si z kapitoly odnést**

AI Act je důležitý proto, že zavádí pravidla podle dopadu a rizika. Kdo AI používá vážně, musí rozumět nejen technice, ale i tomu, jaké právní a provozní požadavky se na dané použití vztahují.
`.trim(),
  },
];

async function syncPages() {
  for (const page of pages) {
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
