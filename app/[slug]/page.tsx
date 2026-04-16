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
  'quantum-1': { href: '/quantum-2', label: '2. Kvantové materiály' },
  'quantum-2': { href: '/quantum-3', label: '3. Kvantová senzorika a metrologie' },
  'quantum-3': { href: '/quantum-4', label: '4. Komunikace a bezpečnost' },
  'quantum-4': { href: '/quantum-5', label: '5. Kvantové výpočty a simulace' },
  'quantum-5': { href: '/quantum-6', label: '6. Strojové učení (QML)' },
  'quantum-6': { href: '/quantum-7', label: '7. Kvantové a hybridní algoritmy' },
  'quantum-7': { href: '/quantum-practice', label: 'Procvičování všech otázek' },
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
