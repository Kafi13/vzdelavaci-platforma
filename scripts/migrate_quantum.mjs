import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Chybí proměnné prostředí pro Supabase');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log('Spouštím migraci pro rozdělení Quantum lekcí...');

    // 1. Získání původních karet z 'quantum'
    const { data: cards, error: fetchError } = await supabase
        .from('knowledge_cards')
        .select('id, title, order_index, deep_dive')
        .eq('page_slug', 'quantum')
        .order('order_index');

    if (fetchError || !cards) {
        console.error('Chyba při načítání karet:', fetchError);
        process.exit(1);
    }

    console.log(`Nalezeno ${cards.length} karet v modulu quantum.`);

    // 2. Pro každou kartu:
    //    a) Vytvořit nový záznam v tabulce `pages`
    //    b) Aktualizovat kartu v `knowledge_cards`, aby měla nový `page_slug`
    for (const card of cards) {
        const newSlug = `quantum-${card.order_index}`;
        // Odebrat "X. " z názvu lekce
        const newTitle = card.title.replace(/^\d+\.\s*/, '');

        // a) Vložit / Upravit stránku (upsertuje podle slug)
        const { error: pageError } = await supabase
            .from('pages')
            .upsert({
                slug: newSlug,
                title: newTitle,
                content: `## ${card.title}\nVítejte v lekci zaměřené na ${newTitle.toLowerCase()}. Prohlédněte si níže interaktivní výukovou kartu.`
            }, { onConflict: 'slug' });

        if (pageError) {
            console.error(`Chyba při vytváření stránky ${newSlug}:`, pageError);
            continue;
        }

        // b) Přepojit kartu na nový slug (a vymazat / zarovnat order_index na 1)
        const { error: updateError } = await supabase
            .from('knowledge_cards')
            .update({
                page_slug: newSlug,
                order_index: 1 // Na každé nové podstránce bude jedna karta
            })
            .eq('id', card.id);

        if (updateError) {
            console.error(`Chyba při aktualizaci karty s id ${card.id}:`, updateError);
        } else {
            console.log(`Lekce ${card.order_index} (${newTitle}) byla úspěšně přesunuta na slug /${newSlug}`);
        }
    }

    // 3. Upravit hlavní Quantum stránku, aby sloužila jako rozcestník
    const { error: rootPageError } = await supabase
        .from('pages')
        .update({
            content: 'Projděte si 6 základních lekcí Kvantových technologií, které najdete v menu.'
        })
        .eq('slug', 'quantum');

    if (rootPageError) {
        console.error('Nepodařilo se upravit hlavní stránku quantum:', rootPageError);
    } else {
        console.log('Hlavní stránka /quantum byla úspěšně upravena.');
    }

    console.log('Migrace databáze je hotová.');
}

main().catch(console.error);
