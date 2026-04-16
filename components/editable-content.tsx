'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const paragraphs = useMemo(() => splitParagraphs(initialContent), [initialContent]);

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
    <section>
      <div className="space-y-4 text-base leading-7 text-slate-800" onClick={handleLinkClick}>
        {paragraphs.map((paragraph, index) => (
          <p key={`${slug}-p-${index}`}>{renderParagraph(paragraph)}</p>
        ))}
        {paragraphs.length === 0 && (
          <p className="italic text-slate-500">No content available yet.</p>
        )}
      </div>
    </section>
  );
}
