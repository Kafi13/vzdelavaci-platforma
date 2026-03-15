import { notFound } from 'next/navigation';
import EditableContent from '@/components/editable-content';
import KnowledgeCard from '@/components/KnowledgeCard';
import { supabase } from '@/utils/supabase';
import { KnowledgeCardType } from '@/types';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Fetch page data
  const { data: pageData, error: pageError } = await supabase
    .from('pages')
    .select('title, content')
    .eq('slug', slug)
    .single();

  if (pageError || !pageData) {
    notFound();
  }

  // Fetch knowledge cards
  const { data: cardsData, error: cardsError } = await supabase
    .from('knowledge_cards')
    .select('*')
    .eq('page_slug', slug)
    .order('order_index');

  const cards: KnowledgeCardType[] = cardsData || [];

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Sekce</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          {pageData.title}
        </h1>
      </header>
      
      <EditableContent slug={slug} initialContent={pageData.content ?? ''} />

      {/* Render Knowledge Cards if they exist */}
      {cards.length > 0 && (
        <section className="mt-16 border-t border-slate-200 pt-16">
          <div className="space-y-12">
            {cards.map((card) => (
              <KnowledgeCard key={card.id} card={card} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
