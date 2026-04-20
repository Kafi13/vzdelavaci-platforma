import { notFound } from 'next/navigation';
import Link from 'next/link';
import EditableContent from '@/components/editable-content';
import { getSupabaseClient } from '@/utils/supabase';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

type LessonPage = {
  title: string;
  content: string | null;
};

const nextSection: Record<string, { href: string; label: string }> = {
  'gen-ai-1': { href: '/gen-ai-2', label: '2. AI Act' },
  'gen-ai-2': { href: '/gen-ai', label: 'Zpět na Gen AI sekci' },
  'quantum-1': { href: '/quantum-2', label: '2. Kvantové materiály' },
  'quantum-2': { href: '/quantum-3', label: '3. Kvantová senzorika a metrologie' },
  'quantum-3': { href: '/quantum-4', label: '4. Komunikace a bezpečnost' },
  'quantum-4': { href: '/quantum-5', label: '5. Kvantové výpočty a simulace' },
  'quantum-5': { href: '/quantum-6', label: '6. Kvantové a hybridní algoritmy' },
  'quantum-6': { href: '/quantum-7', label: '7. Strojové učení (QML)' },
  'quantum-7': { href: '/quantum-practice', label: 'Procvičování všech otázek' },
  'ml-1': { href: '/ml-2', label: '2. Data a featurizace' },
  'ml-2': { href: '/ml-3', label: '3. Příprava dat pro AI v materiálech' },
  'ml-3': { href: '/ml-4', label: '4. Trénink a validace modelů' },
  'ml-4': { href: '/ml-5', label: '5. Základní modely a explorace dat' },
  'ml-5': { href: '/ml-6', label: '6. Ansámblové metody a XAI' },
  'ml-6': { href: '/ml-7', label: '7. Pokročilé techniky a nasazení klasického ML' },
  'ml-7': { href: '/ml-8', label: '8. Úvod do neuronových sítí a hlubokého učení' },
  'ml-8': { href: '/ml-9', label: '9. Konvoluční sítě a augmentace dat' },
  'ml-9': { href: '/ml-10', label: '10. GNN pro materiálové simulace a MLIPs' },
  'ml-10': { href: '/ml-11', label: '11. Sekvenční data, RNN a Transformery' },
  'ml-11': { href: '/ml-12', label: '12. PINNs a kvantifikace nejistoty' },
  'ml-12': { href: '/ml-13', label: '13. Inverzní návrh a generativní AI' },
  'ml-13': { href: '/ml', label: 'Zpět na ML sekci' },
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const supabase = getSupabaseClient();

  const { data: pageData, error: pageError } = await supabase
    .from('pages')
    .select('title, content')
    .eq('slug', slug)
    .single();

  if (pageError || !pageData) {
    notFound();
  }

  const page = pageData as LessonPage;

  const next = nextSection[slug];

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Sekce</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          {page.title}
        </h1>
      </header>

      <EditableContent slug={slug} initialContent={page.content ?? ''} />

      {/* Next section navigation */}
      {next && (
        <div className="mt-16 pt-10 border-t border-slate-200">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">Další sekce</p>
          <Link
            href={next.href}
            className="flex sm:inline-flex items-center justify-between sm:justify-start gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3.5 rounded-xl transition-colors group"
          >
            <span>{next.label}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      )}
    </article>
  );
}
