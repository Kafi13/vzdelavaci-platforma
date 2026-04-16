import Link from "next/link";
import { ArrowRight } from "lucide-react";

const chapterCards = [
  {
    href: "/gen-ai-1",
    kicker: "Kapitola 1",
    title: "Jak správně promptovat",
    text: "Praktická pravidla pro zadávání úloh tak, aby model vracel přesné, použitelné a kontrolovatelné výstupy.",
  },
  {
    href: "/gen-ai-2",
    kicker: "Kapitola 2",
    title: "AI Act",
    text: "Stručný přehled evropské regulace AI, rizikových kategorií a dopadů na používání i nasazení modelů.",
  },
];

export default function GenAiEducationPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Vzdělávací Sekce
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Generativní AI
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            Dvě základní kapitoly: jak správně zadávat prompty a jak se orientovat v AI Actu.
          </p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {chapterCards.map((chapter) => (
          <Link
            key={chapter.href}
            href={chapter.href}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              {chapter.kicker}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">{chapter.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{chapter.text}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">
              Otevřít kapitolu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
