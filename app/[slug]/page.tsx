import { notFound } from 'next/navigation';
import Link from 'next/link';
import EditableContent from '@/components/editable-content';
import KnowledgeCardsSection from '@/components/KnowledgeCardsSection';
import { supabase } from '@/utils/supabase';
import { KnowledgeCardType } from '@/types';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const nextSection: Record<string, { href: string; label: string }> = {
  'quantum-1': { href: '/quantum-2', label: '2. Hardware a materiály' },
  'quantum-2': { href: '/quantum-3', label: '3. Senzorika a metrologie' },
  'quantum-3': { href: '/quantum-4', label: '4. Komunikace a bezpečnost' },
  'quantum-4': { href: '/quantum-5', label: '5. Výpočty a simulace' },
  'quantum-5': { href: '/quantum-6', label: '6. Strojové učení (QML)' },
  'quantum-6': { href: '/test', label: 'Závěrečná zkouška' },
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const { data: pageData, error: pageError } = await supabase
    .from('pages')
    .select('title, content')
    .eq('slug', slug)
    .single();

  if (pageError || !pageData) {
    notFound();
  }

  const { data: cardsData } = await supabase
    .from('knowledge_cards')
    .select('*')
    .eq('page_slug', slug)
    .order('order_index');

  const cards: KnowledgeCardType[] = cardsData || [];
  const next = nextSection[slug];

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Sekce</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          {pageData.title}
        </h1>
      </header>

      <EditableContent slug={slug} initialContent={pageData.content ?? ''} />

      {cards.length > 0 && (
        <KnowledgeCardsSection cards={cards} />
      )}

      {/* Next section navigation */}
      {next && (
        <div className="mt-16 pt-10 border-t border-slate-200">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">Další sekce</p>
          <Link
            href={next.href}
            className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3.5 rounded-xl transition-colors group"
          >
            <span>{next.label}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      )}
    </article>
  );
}
