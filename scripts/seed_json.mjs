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

async function seedCards(cards) {
    console.log(`Seeding ${cards.length} cards...`);
    
    // 1. Delete existing cards for the slugs we are about to update to avoid duplicates
    const slugs = [...new Set(cards.map(c => c.page_slug))];
    const { error: deleteError } = await supabase
        .from('knowledge_cards')
        .delete()
        .in('page_slug', slugs);

    if (deleteError) {
        console.error('Error deleting existing cards:', deleteError);
        return;
    }

    // 2. Insert new cards
    const { error: insertError } = await supabase
        .from('knowledge_cards')
        .insert(cards);

    if (insertError) {
        console.error('Error inserting cards:', insertError);
    } else {
        console.log('Successfully seeded cards!');
    }
}

// If JSON file path is provided as argument
const jsonPath = process.argv[2];
if (jsonPath) {
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const cards = JSON.parse(rawData);
    seedCards(cards).catch(console.error);
}

export { seedCards };
