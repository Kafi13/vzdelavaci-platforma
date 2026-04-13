"use client";

import { useState } from "react";
import KnowledgeCard from "@/components/KnowledgeCard";
import { KnowledgeCardType } from "@/types";
import { CheckCircle2, Circle } from "lucide-react";

interface Props {
  cards: KnowledgeCardType[];
}

export default function KnowledgeCardsSection({ cards }: Props) {
  const [answeredCards, setAnsweredCards] = useState<Set<string>>(new Set());

  const handleCardAnswered = (cardId: string) => {
    setAnsweredCards((prev) => new Set(prev).add(cardId));
  };

  const answeredCount = answeredCards.size;
  const totalCount = cards.length;
  const allDone = answeredCount === totalCount;
  const progressPct = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;

  return (
    <section className="mt-16 border-t border-slate-200 pt-12">
      {/* Section header + progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Znalostní karty
          </h2>
          <span className="text-xs text-slate-400 tabular-nums">
            {answeredCount} / {totalCount} zodpovězeno
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Card dots */}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {cards.map((card, i) => (
            answeredCards.has(card.id) ? (
              <CheckCircle2 key={card.id} className="w-4 h-4 text-indigo-500" />
            ) : (
              <Circle key={card.id} className="w-4 h-4 text-slate-300" />
            )
          ))}
        </div>

        {/* All done banner */}
        {allDone && (
          <div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            Výborně! Prošel jsi všechny znalostní karty v této sekci.
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="space-y-12">
        {cards.map((card, index) => (
          <KnowledgeCard
            key={card.id}
            card={card}
            index={index + 1}
            total={totalCount}
            onAnswered={() => handleCardAnswered(card.id)}
          />
        ))}
      </div>
    </section>
  );
}
