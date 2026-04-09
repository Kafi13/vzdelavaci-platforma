import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const jsonDir = 'tmp_json';
    const files = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));
    
    let allCards = [];
    for (const file of files) {
        const rawData = fs.readFileSync(path.join(jsonDir, file), 'utf8');
        const cards = JSON.parse(rawData);
        allCards = allCards.concat(cards);
    }

    console.log(`Total cards to seed: ${allCards.length}`);

    const slugs = [...new Set(allCards.map(c => c.page_slug))];
    console.log(`Updating slugs: ${slugs.join(', ')}`);

    // Delete existing cards for these slugs
    const { error: deleteError } = await supabase
        .from('knowledge_cards')
        .delete()
        .in('page_slug', slugs);

    if (deleteError) {
        console.error('Error deleting existing cards:', deleteError);
        return;
    }

    // Insert all new cards
    const { error: insertError } = await supabase
        .from('knowledge_cards')
        .insert(allCards);

    if (insertError) {
        console.error('Error inserting cards:', insertError);
    } else {
        console.log('Successfully seeded all cards!');
    }
}

main().catch(console.error);
