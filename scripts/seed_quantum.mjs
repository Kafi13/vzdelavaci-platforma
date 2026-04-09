import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Chybí proměnné prostředí NEXT_PUBLIC_SUPABASE_URL nebo SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

// Inicializace Supabase s použitím Service Role klíče (obchází RLS)
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log('Spouštím seed skript pro přidání Lekce 6 do modulu Quantum...');

    // 1. NEPROVÁDÍME MAZÁNÍ - Pouze přidáváme další data

    // 2. INSERT příkaz s novými daty za použití Service Role Key
    const { error: insertError } = await supabase
        .from('knowledge_cards')
        .insert([
            {
                page_slug: 'quantum',
                order_index: 6,
                title: '6. Kvantové strojové učení (QML)',
                hook: 'Synergie dvou největších technologických revolucí současnosti. Kvantové systémy pomáhají umělé inteligenci překonat energetické a výpočetní limity klasických architektur.',
                mental_model: 'QML (Quantum Machine Learning), Trénování modelů, Energetické limity klasické AI, Synergie.',
                deep_dive: '## Synergie dvou revolucí\nZatímco umělá inteligence (AI) a klasické strojové učení (ML) fundamentálně přetvářejí naše životy, narážejí na neúprosné limity klasických výpočetních architektur. Trénování a provoz rozsáhlých jazykových či multimodálních modelů vyžaduje exponenciálně rostoucí množství energie a masivní distribuované výpočetní klastry.\n\n## Kvantové strojové učení (QML)\nParalelně s AI dospívají kvantové technologie do fáze, kdy opouštějí laboratoře a začínají řešit reálné problémy. Průnik těchto dvou domén dává vzniknout oboru Kvantového strojového učení (QML). Nejde jen o pragmatické spojení; vychází z fundamentální matematické podstaty obou disciplín. Kvantové systémy slibují, že dokážou zpracovávat masivní, multidimenzionální datové sady a trénovat komplexní modely mnohem efektivněji a s nesrovnatelně nižší energetickou náročností.',
                checkpoint_question: 'Proč dochází ke spojení kvantových technologií a umělé inteligence do oboru QML?',
                checkpoint_options: [
                    'Klasická AI naráží na energetické a výpočetní limity, které mohou kvantové počítače pomoci efektivně překonat.',
                    'Kvantové počítače neumí fungovat bez asistence velkých jazykových modelů.',
                    'QML je pouze marketingový termín pro běžné cloudové výpočty.'
                ],
                correct_answer: 'Klasická AI naráží na energetické a výpočetní limity, které mohou kvantové počítače pomoci efektivně překonat.'
            }
        ]);

    if (insertError) {
        console.error('Chyba při vkládání nových dat:', insertError);
        process.exit(1);
    }

    console.log("Úspěch: Lekce 6 do modulu Kvantové technologie byla úspěšně přidána!");
}

main().catch(console.error);
