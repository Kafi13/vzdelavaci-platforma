import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { PDFParse } from 'pdf-parse';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const lectures = [
  {
    slug: 'ml-1',
    title: '1. AI revoluce v materiálovém inženýrství',
    file: '1. přednáška - AI revoluce v materiálovém inženýrství.pdf',
  },
  {
    slug: 'ml-2',
    title: '2. Data a featurizace',
    file: '2. přednáška - AI v materiálovém inženýrství_ Data a featurizace.pdf',
  },
  {
    slug: 'ml-3',
    title: '3. Příprava dat pro AI v materiálech',
    file: '3. přednáška - Příprava dat pro AI v materiálech.pdf',
  },
  {
    slug: 'ml-4',
    title: '4. Trénink a validace modelů',
    file: '4. přednáška - AI v materiálech_ Trénink a validace modelů.pdf',
  },
  {
    slug: 'ml-5',
    title: '5. Základní modely a explorace dat',
    file: '5. přednáška - AI v materiálech_ Základní modely a explorace.pdf',
  },
  {
    slug: 'ml-6',
    title: '6. Ansámblové metody a XAI',
    file: '6. přednáška - Ansámblové metody a XAI v materiálových vědách.pdf',
  },
  {
    slug: 'ml-7',
    title: '7. Pokročilé techniky a nasazení klasického ML',
    file: '7. přednáška - Klasické ML_ Pokročilé techniky a nasazení.pdf',
  },
  {
    slug: 'ml-8',
    title: '8. Úvod do neuronových sítí a hlubokého učení',
    file: '8. přednáška - Úvod do neuronových sítí a hlubokého učení.pdf',
  },
  {
    slug: 'ml-9',
    title: '9. Konvoluční sítě a augmentace dat',
    file: '9. přednáška - Konvoluční sítě a augmentace dat.pdf',
  },
  {
    slug: 'ml-10',
    title: '10. GNN pro materiálové simulace a MLIPs',
    file: '10. přednáška - GNN pro materiálové simulace a MLIPs.pdf',
  },
  {
    slug: 'ml-11',
    title: '11. Sekvenční data, RNN a Transformery',
    file: '11. přednáška - Sekvenční data_ RNN, Transformery, Transfer Learni....pdf',
  },
  {
    slug: 'ml-12',
    title: '12. PINNs a kvantifikace nejistoty',
    file: '12. přednáška - AI v materiálovém inženýrství_ PINNs a nejistota.pdf',
  },
  {
    slug: 'ml-13',
    title: '13. Inverzní návrh a generativní AI',
    file: '13. přednáška - AI v materiálovém inženýrství_ Inverzní návrh.pdf',
  },
];

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function isPageMarker(line) {
  return /^--\s*\d+\s*of\s*\d+\s*--$/i.test(line) || /^\d+$/.test(line);
}

function looksLikeHeading(line) {
  if (/^(Kapitola|Část|Přednáška)\b/.test(line)) {
    return true;
  }

  if (/^\d+\.\s/.test(line)) {
    return true;
  }

  return line.length <= 90 && !/[.!?]$/.test(line);
}

function extractParagraphs(text) {
  const lines = text
    .replace(/\u0000/g, '')
    .replace(/\r/g, '\n')
    .replace(/--\s*\d+\s*of\s*\d+\s*--/gi, '\n')
    .split('\n')
    .map((line) => line.trim());

  const paragraphs = [];
  let current = [];

  const flush = () => {
    const paragraph = normalizeWhitespace(current.join(' '));
    if (paragraph) {
      paragraphs.push(paragraph);
    }
    current = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line || isPageMarker(line)) {
      flush();
      continue;
    }

    if (looksLikeHeading(line) && current.length === 0) {
      const headingLines = [line];

      while (index + 1 < lines.length) {
        const nextLine = lines[index + 1];
        if (!nextLine || isPageMarker(nextLine)) {
          break;
        }

        if (!looksLikeHeading(nextLine)) {
          break;
        }

        headingLines.push(nextLine);
        index += 1;
      }

      paragraphs.push(normalizeWhitespace(headingLines.join(' ')));
      continue;
    }

    current.push(line);
  }

  flush();

  return paragraphs.filter((paragraph, index) => paragraph !== paragraphs[index - 1]);
}

function formatParagraphs(paragraphs) {
  return paragraphs
    .map((paragraph) => (looksLikeHeading(paragraph) ? `**${paragraph}**` : paragraph))
    .join('\n\n');
}

async function readLectureContent(file) {
  const filePath = path.join(process.cwd(), 'ML', file);
  const buffer = await fs.readFile(filePath);
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();

  const paragraphs = extractParagraphs(result.text);
  return formatParagraphs(paragraphs);
}

async function syncPages() {
  for (const lecture of lectures) {
    const content = await readLectureContent(lecture.file);

    const { error } = await supabase
      .from('pages')
      .upsert(
        {
          slug: lecture.slug,
          title: lecture.title,
          content,
        },
        { onConflict: 'slug' }
      );

    if (error) {
      console.error(`Failed to sync ${lecture.slug}:`, error.message);
      process.exitCode = 1;
      continue;
    }

    console.log(`Synced ${lecture.slug}`);
  }
}

syncPages().catch((error) => {
  console.error(error);
  process.exit(1);
});
