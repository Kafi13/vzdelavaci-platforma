import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, GraduationCap } from "lucide-react";

const chapterCards = [
  {
    href: "/quantum-1",
    kicker: "Kapitola 1",
    title: "Základní koncepty",
    text: "Druhá kvantová revoluce, superpozice, provázání a základní slovník kvantových technologií.",
  },
  {
    href: "/quantum-2",
    kicker: "Kapitola 2",
    title: "Kvantové materiály",
    text: "Izotopově čistý křemík, supravodivé obvody, NV centra, topologické stavy a materiálové limity kvantového hardwaru.",
  },
  {
    href: "/quantum-3",
    kicker: "Kapitola 3",
    title: "Kvantová senzorika a metrologie",
    text: "Atomové hodiny, gravimetrie, kvantové magnetometry a přesná měření na hraně fyzikálních limitů.",
  },
  {
    href: "/quantum-4",
    kicker: "Kapitola 4",
    title: "Komunikace a bezpečnost",
    text: "QKD, kvantové sítě, bezpečnostní dopady a přechod na postkvantovou kryptografii.",
  },
  {
    href: "/quantum-5",
    kicker: "Kapitola 5",
    title: "Kvantové výpočty a simulace",
    text: "Qubity, interference, kvantové obvody, simulace molekul, Grover, Shor a reálné limity NISQ systémů.",
  },
  {
    href: "/quantum-6",
    kicker: "Kapitola 6",
    title: "Strojové učení (QML)",
    text: "Hybridní algoritmy, kvantové feature spaces a realistické hodnocení přínosů pro AI.",
  },
];

export default function QuantumEducationPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Vzdělávací Sekce
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Kvantové technologie
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            Tato část je teď oddělená od otázek. Slouží čistě jako výuková osa předmětu:
            nejprve studium šesti kapitol, potom samostatné procvičování a až nakonec
            závěrečná zkouška z patnácti náhodně vybraných otázek.
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

      <section className="grid gap-5 md:grid-cols-2">
        <Link
          href="/quantum-practice"
          className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center gap-3 text-emerald-700">
            <BrainCircuit className="h-6 w-6" />
            <p className="text-lg font-black">Procvičování</p>
          </div>
          <p className="mt-3 text-sm leading-7 text-emerald-900/80">
            Všechny otázky jsou soustředěné zde. Můžete procházet celý fond, opakovat slabší místa a budovat si progres napříč zařízeními.
          </p>
        </Link>

        <Link
          href="/test"
          className="rounded-3xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center gap-3 text-indigo-700">
            <GraduationCap className="h-6 w-6" />
            <p className="text-lg font-black">Závěrečná zkouška</p>
          </div>
          <p className="mt-3 text-sm leading-7 text-indigo-900/80">
            Test vždy vybere 15 náhodných otázek ze stejného kvantového poolu jako procvičování, takže výuka a ověřování už nejsou obsahově oddělené.
          </p>
        </Link>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center gap-3 text-slate-700">
          <BookOpen className="h-5 w-5" />
          <p className="font-bold">Další krok pro obsah</p>
        </div>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          V repozitáři už máte šest zdrojových markdown přednášek v adresáři `Kvantum md`. Struktura je teď připravená tak, aby šlo každou kapitolu dál rozšířit o mnohem bohatší text právě z těchto materiálů.
        </p>
      </section>
    </div>
  );
}
