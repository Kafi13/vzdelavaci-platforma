'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

type EditableContentProps = {
  slug: string;
  initialContent: string;
};

const splitParagraphs = (content: string) =>
  content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

export default function EditableContent({ slug, initialContent }: EditableContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [draft, setDraft] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const paragraphs = useMemo(() => splitParagraphs(content), [content]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

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
    if (!isEditing) {
      setDraft(content);
    }
    setIsEditing((prev) => !prev);
    setError(null);
  };

  return (
    <section className="space-y-6">
      {!isEditing ? (
        <div className="space-y-4 text-base leading-7 text-slate-800">
          {paragraphs.map((paragraph, index) => (
            <p key={`${slug}-p-${index}`}>{paragraph}</p>
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
    </section>
  );
}
