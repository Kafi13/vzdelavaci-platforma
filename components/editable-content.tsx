'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/utils/supabase';
import { isAdminEmail } from '@/utils/admin';

type EditableContentProps = {
  slug: string;
  initialContent: string;
};

const splitParagraphs = (content: string) =>
  content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const TOKEN_REGEX = /(\*\*\[[^\]]+\]\([^)]+\)\*\*|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;

const renderParagraph = (text: string): React.ReactNode[] => {
  return text.split(TOKEN_REGEX).filter(Boolean).map((part, index) => {
    const boldLinkMatch = part.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/);
    if (boldLinkMatch) {
      const [, label, href] = boldLinkMatch;
      return (
        <a
          key={index}
          href={href}
          className="font-bold text-indigo-600 underline decoration-indigo-300 underline-offset-4 hover:text-indigo-700"
        >
          {label}
        </a>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      return (
        <a
          key={index}
          href={href}
          className="font-bold text-indigo-600 underline decoration-indigo-300 underline-offset-4 hover:text-indigo-700"
        >
          {label}
        </a>
      );
    }

    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return <strong key={index}>{boldMatch[1]}</strong>;
    }

    return part;
  });
};

export default function EditableContent({ slug, initialContent }: EditableContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [draft, setDraft] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canEdit, setCanEdit] = useState(false);
  const router = useRouter();

  const paragraphs = useMemo(() => splitParagraphs(content), [content]);

  useEffect(() => {
    const supabase = getSupabaseClient();

    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError) {
        return;
      }

      setCanEdit(isAdminEmail(data.user?.email));
    });
  }, []);

  const handleSave = async () => {
    if (!canEdit) return;

    setSaving(true);
    setError(null);
    const supabase = getSupabaseClient();

    const { error: updateError } = await supabase
      .from('pages')
      .update({ content: draft })
      .eq('slug', slug);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setContent(draft);
    setIsEditing(false);
    setSaving(false);
    router.refresh();
  };

  const handleToggle = () => {
    if (!canEdit) return;

    if (!isEditing) {
      setDraft(content);
    }
    setIsEditing((prev) => !prev);
    setError(null);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    const href = link?.getAttribute('href');

    if (href && href.startsWith('/')) {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <section className="space-y-6">
      {!isEditing ? (
        <div 
          className="space-y-4 text-base leading-7 text-slate-800"
          onClick={handleLinkClick}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={`${slug}-p-${index}`}>{renderParagraph(paragraph)}</p>
          ))}
          {paragraphs.length === 0 && (
            <p className="italic text-slate-500">No content available yet.</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="min-h-[240px] w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleToggle}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {canEdit && (
        <div className="border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={handleToggle}
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            {isEditing ? 'Close Edit Mode' : 'Edit Content'}
          </button>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      )}
    </section>
  );
}
