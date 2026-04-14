import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const lecturePages = [
  {
    slug: 'quantum-1',
    title: '1. Úvod do kvantových technologií',
    file: 'Úvod do kvantových technologií_ Skripta.md',
  },
  {
    slug: 'quantum-2',
    title: '2. Kvantové materiály',
    file: 'Kvantové materiály_ Základ kvantových technologií.md',
  },
  {
    slug: 'quantum-3',
    title: '3. Kvantová senzorika a metrologie',
    file: 'Kvantová senzorika_ Principy a Aplikace.md',
  },
  {
    slug: 'quantum-4',
    title: '4. Kvantová komunikace a bezpečnost',
    file: 'Kvantová komunikace a bezpečnost_ Nové základy.md',
  },
  {
    slug: 'quantum-5',
    title: '5. Kvantové výpočty a simulace',
    file: 'Kvantové Počítače_ Principy, Aplikace, Limity.md',
  },
  {
    slug: 'quantum-6',
    title: '6. Kvantové strojové učení (QML)',
    file: 'Kvantové strojové učení_ Budoucnost AI.md',
  },
];

function sanitizeMarkdown(raw) {
  let content = raw;

  content = content.split(/\n#### \*\*Citovaná díla\*\*[\s\S]*$/m)[0];
  content = content.replace(/^\[image[^\]]*]:.*$/gm, '');
  content = content.replace(/\[image:[^\]]*]/g, '');
  content = content.replace(/!\[\]\[image[^\]]*]/g, '');
  content = content.replace(/^\|.*$/gm, '');
  content = content.replace(/^##\s+---\s*$/gm, '');
  content = content.replace(/^---\s*$/gm, '');

  content = content.replace(/^###\s+\*\*(.*?)\*\*\s*$/gm, '**$1**');
  content = content.replace(/^##\s+\*\*(.*?)\*\*\s*$/gm, '**$1**');
  content = content.replace(/^#\s+\*\*(.*?)\*\*\s*$/gm, '**$1**');
  content = content.replace(/^###\s+(.*?)\s*$/gm, '**$1**');
  content = content.replace(/^##\s+(.*?)\s*$/gm, '**$1**');
  content = content.replace(/^#\s+(.*?)\s*$/gm, '**$1**');

  content = content.replace(/[ \t]+\n/g, '\n');
  content = content.replace(/\n{3,}/g, '\n\n');

  return content.trim();
}

async function syncPages() {
  const baseDir = path.join(process.cwd(), 'Kvantum md');

  for (const page of lecturePages) {
    const filePath = path.join(baseDir, page.file);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const content = sanitizeMarkdown(rawContent);

    const { error } = await supabase
      .from('pages')
      .upsert(
        {
          slug: page.slug,
          title: page.title,
          content,
        },
        { onConflict: 'slug' }
      );

    if (error) {
      console.error(`Failed to sync ${page.slug}:`, error.message);
      process.exitCode = 1;
      continue;
    }

    console.log(`Synced ${page.slug} from ${page.file}`);
  }
}

syncPages().catch((error) => {
  console.error(error);
  process.exit(1);
});
