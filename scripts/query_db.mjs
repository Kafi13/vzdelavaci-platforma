import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
    const { data: pages, error } = await supabase.from('pages').select('*');
    if (error) {
        console.error('Error fetching pages:', error);
    } else {
        console.log('Pages:', pages);
    }

    const { data: kc, error: kcError } = await supabase.from('knowledge_cards').select('id, page_slug, title, order_index').eq('page_slug', 'quantum').order('order_index');
    if (kcError) {
        console.error('Error fetching knowledge cards:', kcError);
    } else {
        console.log('Quantum Knowledge Cards:', kc);
    }
}

main();
