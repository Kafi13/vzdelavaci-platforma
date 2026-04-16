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
    content: `
**Co tato sekce řeší**

Tato část se soustředí jen na dvě praktické oblasti. První je správné zadávání promptů, tedy jak s modelem komunikovat tak, aby vracel přesné a použitelné výstupy. Druhá je AI Act, tedy základní orientace v evropské regulaci umělé inteligence.
`.trim(),
  },
  {
    slug: 'gen-ai-1',
    title: '1. Jak správně promptovat',
    content: `
**Proč prompt rozhoduje o výsledku**

Model nečte záměr mezi řádky. Odpovídá na to, co opravdu dostane. Kvalita promptu proto zásadně ovlivňuje přesnost, strukturu i použitelnost výsledku.

**Co má dobrý prompt obsahovat**

Nejdůležitější je jasně říct, co má být výstupem, pro koho je určený a v jaké podobě ho chcete dostat. Pomáhá určit roli modelu, kontext úlohy, omezení a kritéria kvality.

**Buďte konkrétní**

Vágní zadání vede k vágní odpovědi. Pokud chcete shrnutí, uveďte délku. Pokud chcete tabulku, napište to. Pokud má model hodnotit varianty, definujte podle čeho.

**Rozdělení složité úlohy**

U náročnějších zadání bývá lepší rozdělit problém na menší kroky. Model pak méně tápe a snáz drží logiku postupu.

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

Některé praktiky jsou zakázané úplně. Jiná použití spadají do kategorie vysokého rizika a vyžadují přísnější dokumentaci, dohled, správu dat a kontrolu souladu.

**Generativní modely a povinnosti**

U generativní AI se řeší hlavně transparentnost, způsob označení výstupů, práce s obsahem a povinnosti poskytovatelů modelů nebo systémů, které na nich stojí.

**Proč je to důležité i pro uživatele**

AI Act není jen téma pro právníky. Dopadá i na školy, firmy a instituce, které AI nástroje používají nebo nasazují do vlastních procesů.

**Co si z kapitoly odnést**

AI Act je důležitý proto, že zavádí pravidla podle dopadu a rizika. Kdo AI používá vážně, musí rozumět nejen technice, ale i regulačnímu rámci.
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
