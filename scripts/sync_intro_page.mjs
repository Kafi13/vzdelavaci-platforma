import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const introPage = {
  slug: 'uvod',
  title: 'Úvod a organizace',
  content: `
**Kontakt**

Vyučující: **mkaufman@fst.zcu.cz**

**Výuka**

Každé pondělí 12:00-14:00.

**Zápočet**

Kontrola průběžného postupu na osobním projektu.

**Zkouška**

Obhajoba osobního projektu a kroužkovací test pro ověření znalostí kvantových technologií na této platformě.
`.trim(),
};

async function syncPage() {
  const { error } = await supabase
    .from('pages')
    .upsert(introPage, { onConflict: 'slug' });

  if (error) {
    console.error(`Failed to sync ${introPage.slug}:`, error.message);
    process.exit(1);
  }

  console.log(`Synced ${introPage.slug}`);
}

syncPage().catch((error) => {
  console.error(error);
  process.exit(1);
});
