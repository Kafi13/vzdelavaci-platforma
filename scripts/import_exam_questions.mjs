
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const chapterOrder = [
    'Úvod do kvantových technologií_ Skripta.md',
    'Kvantové materiály_ Základ kvantových technologií.md',
    'Kvantová senzorika_ Principy a Aplikace.md',
    'Kvantová komunikace a bezpečnost_ Nové základy.md',
    'Kvantové Počítače_ Principy, Aplikace, Limity.md',
    'Kvantové a hybridní algoritmy_ Kapitola 7.md',
    'Kvantové strojové učení_ Budoucnost AI.md',
];

async function main() {
    const rawData = fs.readFileSync('quantum_exam_questions.json', 'utf8');
    const questions = JSON.parse(rawData).sort((a, b) => {
        const aIndex = chapterOrder.indexOf(a.chapter_id);
        const bIndex = chapterOrder.indexOf(b.chapter_id);
        return aIndex - bIndex;
    });

    console.log(`Importuji ${questions.length} otázek do knowledge_cards...`);

    const formattedCards = questions.map((q, index) => ({
        page_slug: 'quantum_exam', // Speciální slug pro zkouškové otázky
        order_index: index,
        title: `Zkoušková otázka ${index + 1}`,
        hook: q.chapter_id, // Uložíme si název kapitoly pro info
        mental_model: 'Zkoušková otázka',
        deep_dive: 'Tato karta slouží pouze pro generování zkoušky.',
        checkpoint_question: q.question_text,
        checkpoint_options: q.options,
        correct_answer: q.options[q.correct_option_index]
    }));

    // Smažeme staré zkouškové otázky, pokud existují
    const { error: deleteError } = await supabase
        .from('knowledge_cards')
        .delete()
        .eq('page_slug', 'quantum_exam');

    if (deleteError) {
        console.error('Chyba při mazání starých otázek:', deleteError);
    }

    // Vložíme nové
    const { error: insertError } = await supabase
        .from('knowledge_cards')
        .insert(formattedCards);

    if (insertError) {
        console.error('Chyba při vkládání:', insertError);
    } else {
        console.log(`Všech ${questions.length} otázek bylo úspěšně naimportováno!`);
    }
}

main();
