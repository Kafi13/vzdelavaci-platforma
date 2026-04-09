import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual loading of .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1);
        }
        env[key] = value;
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Chybí proměnné prostředí NEXT_PUBLIC_SUPABASE_URL nebo SUPABASE_SERVICE_ROLE_KEY v .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const quantumData = [
    {
        slug: 'quantum-1',
        title: 'Základní principy: Úvod do druhé revoluce',
        pageContent: 'V této lekci se dozvíte, čím se liší „staré“ kvantové technologie (jako lasery) od těch moderních, které přicházejí právě teď.',
        cards: [
            {
                order_index: 1,
                title: 'Druhá kvantová revoluce',
                hook: 'Už nepoužíváme kvantovou fyziku jen jako „šum“, ale jako precizní nástroj.',
                mental_model: 'První revoluce byla jako sledování davu z dálky. Druhá revoluce je jako možnost mluvit s každým člověkem v davu zvlášť.',
                deep_dive: 'V první revoluci (20. století) jsme využívali kvantové jevy hromadně (lasery, tranzistory). V té druhé se učíme ovládat jednotlivé atomy, fotony a elektrony. To nám otevírá dveře k úplně novým výpočetním možnostem.',
                checkpoint_question: 'Jaký je hlavní rozdíl mezi první a druhou kvantovou revolucí?',
                checkpoint_options: [
                    'První revoluce byla o teorii, druhá je o praxi.',
                    'V první jsme využívali jevy hromadně, ve druhé ovládáme jednotlivé částice.',
                    'První revoluce vynalezla elektřinu, druhá vynalezla internet.',
                    'Mezi revolucemi není žádný podstatný rozdíl.'
                ],
                correct_answer: 'V první jsme využívali jevy hromadně, ve druhé ovládáme jednotlivé částice.'
            }
        ]
    },
    {
        slug: 'quantum-2',
        title: 'Hardware: Jak postavit kvantový stroj?',
        pageContent: 'Zjistěte, z čeho se vlastně skládá kvantový počítač a proč je tak těžké ho udržet v chodu.',
        cards: [
            {
                order_index: 1,
                title: 'Dekoherence: Nepřítel číslo jedna',
                hook: 'Kvantové stavy jsou křehčí než dům z karet v bouři.',
                mental_model: 'Udržet kvantový stav je jako snažit se nést plnou sklenici vody po palubě lodi v bouři. Jakýkoliv otřes (teplo, vibrace) vše pokazí.',
                deep_dive: 'Tento jev se jmenuje dekoherence. Kvantové informace se při kontaktu s okolím (teplo, magnetismus) „rozpijí“ do okolí a zmizí. Proto musíme qubity chladit na teploty blízké absolutní nule.',
                checkpoint_question: 'Co je to dekoherence?',
                checkpoint_options: [
                    'Způsob, jakým se kvantové počítače nabíjejí.',
                    'Proces, při kterém kvantový systém ztrácí své vlastnosti kvůli kontaktu s okolím.',
                    'Speciální typ kvantového algoritmu pro šifrování.',
                    'Zrychlení výpočtu díky provázání částic.'
                ],
                correct_answer: 'Proces, při kterém kvantový systém ztrácí své vlastnosti kvůli kontaktu s okolím.'
            }
        ]
    }
];

async function sync() {
    console.log('Synchronizuji obsah do Supabase...');

    for (const page of quantumData) {
        // Update page
        const { error: pageError } = await supabase
            .from('pages')
            .upsert({
                slug: page.slug,
                title: page.title,
                content: page.pageContent
            }, { onConflict: 'slug' });

        if (pageError) {
            console.error(`Chyba u stránky ${page.slug}:`, pageError);
            continue;
        }

        // Delete old cards for this page
        await supabase.from('knowledge_cards').delete().eq('page_slug', page.slug);

        // Insert new cards
        for (const card of page.cards) {
            const { error: cardError } = await supabase
                .from('knowledge_cards')
                .insert({
                    page_slug: page.slug,
                    order_index: card.order_index,
                    title: card.title,
                    hook: card.hook,
                    mental_model: card.mental_model,
                    deep_dive: card.deep_dive,
                    checkpoint_question: card.checkpoint_question,
                    checkpoint_options: card.checkpoint_options,
                    correct_answer: card.correct_answer
                });

            if (cardError) {
                console.error(`Chyba u karty ${card.title}:`, cardError);
            }
        }
        console.log(`Stránka ${page.slug} synchronizována.`);
    }
    console.log('Hotovo.');
}

sync();
