import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const pageData = {
  "quantum-1": {
    title: "1. Úvod do kvantových technologií",
    content: "Vítejte v první lekci zaměřené na základy druhé kvantové revoluce. Tato lekce představuje přechod od hromadného využívání částic k preciznímu ovládání jednotlivých kvantových stavů. Vysvětluje základní pilíře jako superpozice a provázání, které otevírají cestu k revolučním senzorům, neprolomitelné komunikaci a výkonným počítačům. Je to ideální úvod pro pochopení, jak kvantová fyzika zásadně mění možnosti moderní techniky. Prohlédněte si níže interaktivní výukové karty."
  },
  "quantum-2": {
    title: "2. Kvantové Počítače: Principy a aplikace",
    content: "Tento průvodce vysvětluje, že kvantové počítače nejsou jen výkonnější verzí těch klasických, ale pracují na zcela jiném principu vlnové interference pravděpodobností. Popisuje architekturu kvantových obvodů a zaměřuje se na praktické simulace v chemii či materiálových vědách, které jsou pro dnešní superpočítače neřešitelné. Nechybí ani pohled na aktuální inženýrské výzvy spojené s křehkostí kvantové informace a dekoherencí. Prohlédněte si níže interaktivní výukové karty."
  },
  "quantum-3": {
    title: "3. Kvantová senzorika a metrologie",
    content: "Kvantová senzorika revolučním způsobem mění měření fyzikálních veličin tím, že využívá extrémní citlivost subatomárních částic na vnější vlivy. Tato lekce popisuje technologie od optických atomových hodin pro přesnou navigaci až po kvantové senzory schopné mapovat aktivitu mozku nebo sledovat procesy uvnitř živých buněk. Ukazuje, jak se dříve nežádoucí citlivost kvantových stavů stává v metrologii největší technologickou výhodou. Prohlédněte si níže interaktivní výukové karty."
  },
  "quantum-4": {
    title: "4. Kvantová komunikace a bezpečnost",
    content: "Tato kapitola rozebírá rizika, která kvantové počítače představují pro současnou kyberbezpečnost, a nabízí řešení v podobě fyzikálně garantované ochrany dat. Vysvětluje principy neprolomitelné kvantové distribuce klíčů (QKD), která znemožňuje jakýkoliv skrytý odposlech díky zákonům mikrosvěta. Čtenář se dozví, jak kvantová mechanika nejen boří staré šifry, ale staví základy pro novou éru absolutně bezpečné komunikace. Prohlédněte si níže interaktivní výukové karty."
  },
  "quantum-5": {
    title: "5. Kvantové materiály: Základ technologií",
    content: "Tato lekce se zaměřuje na materiálový základ kvantových technologií, bez kterého by kvantové algoritmy zůstaly jen teoretickým konceptem. Rozebírá vývoj supravodivých obvodů, izotopově čistého křemíku a speciálních diamantových struktur, které slouží jako stabilní úložiště pro kvantové bity. Hlavním cílem je vytvořit prostředí, které dokáže odstínit vnější šum a udržet křehkou kvantovou informaci v chodu. Prohlédněte si níže interaktivní výukové karty."
  },
  "quantum-6": {
    title: "6. Kvantové strojové učení (QML)",
    content: "Tato část zkoumá propojení kvantových výpočtů s umělou inteligencí a strojovým učením, které přináší nové možnosti v analýze komplexních dat. Popisuje hybridní algoritmy pro současné procesory a vysvětluje, jak kvantové systémy nativně pracují v obrovských výpočetních prostorech nedostupných klasickému hardwaru. Zároveň kriticky hodnotí aktuální překážky, jako je úzké hrdlo při přenosu dat mezi klasickým a kvantovým světem. Prohlédněte si níže interaktivní výukové karty."
  }
};

async function main() {
    for (const [slug, data] of Object.entries(pageData)) {
        console.log(`Updating page: ${slug}`);
        const { error } = await supabase
            .from('pages')
            .upsert({
                slug,
                title: data.title,
                content: data.content
            }, { onConflict: 'slug' });

        if (error) {
            console.error(`Error updating page ${slug}:`, error);
        }
    }
    console.log('All pages updated successfully!');
}

main().catch(console.error);
