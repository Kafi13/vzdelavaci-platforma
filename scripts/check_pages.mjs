import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Chybí proměnné prostředí NEXT_PUBLIC_SUPABASE_URL nebo SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    const { data: pages, error } = await supabase.from('pages').select('slug, title');
    if (error) {
        console.error('Error fetching pages:', error);
    } else {
        console.log('Available Slugs:', pages.map(p => p.slug));
    }
}

main();
