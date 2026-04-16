import Link from "next/link";
import { ArrowRight } from "lucide-react";

const chapterCards = [
  {
    href: "/ml-1",
    kicker: "Přednáška 1",
    title: "AI revoluce v materiálovém inženýrství",
    text: "Proč se AI stala novým způsobem objevování materiálů a jak mění celé výzkumné paradigma.",
  },
  {
    href: "/ml-2",
    kicker: "Přednáška 2",
    title: "Data a featurizace",
    text: "Jak převést materiálový problém do číselné reprezentace, se kterou umí model skutečně pracovat.",
  },
  {
    href: "/ml-3",
    kicker: "Přednáška 3",
    title: "Příprava dat",
    text: "Čištění dat, redukce dimenze a praktické zvládnutí prokletí dimensionality.",
  },
  {
    href: "/ml-4",
    kicker: "Přednáška 4",
    title: "Trénink a validace modelů",
    text: "Jak modely správně učit, rozdělit data a vyhodnocovat výkon bez falešného optimismu.",
  },
  {
    href: "/ml-5",
    kicker: "Přednáška 5",
    title: "Základní modely a explorace dat",
    text: "Regrese, klasifikace, clustering a první orientace v datech i prediktivních úlohách.",
  },
  {
    href: "/ml-6",
    kicker: "Přednáška 6",
    title: "Ansámblové metody a XAI",
    text: "Random Forest, boosting a nástroje pro vysvětlitelnost modelů v materiálových datech.",
  },
  {
    href: "/ml-7",
    kicker: "Přednáška 7",
    title: "Pokročilé techniky a nasazení",
    text: "Jak klasické ML dostat od experimentu až k nasaditelné a robustní inženýrské praxi.",
  },
  {
    href: "/ml-8",
    kicker: "Přednáška 8",
    title: "Neuronové sítě a hluboké učení",
    text: "Základní logika hlubokých modelů, jejich tréninku a důvod, proč jsou dnes tak silné.",
  },
  {
    href: "/ml-9",
    kicker: "Přednáška 9",
    title: "Konvoluční sítě a augmentace dat",
    text: "CNN pro obrazová a mikrostrukturní data, včetně augmentace a práce s prostorem.",
  },
  {
    href: "/ml-10",
    kicker: "Přednáška 10",
    title: "GNN a materiálové simulace",
    text: "Grafové neuronové sítě pro atomární reprezentace, interakce a ML interatomární potenciály.",
  },
  {
    href: "/ml-11",
    kicker: "Přednáška 11",
    title: "Sekvenční data, RNN a Transformery",
    text: "Modely pro pořadí, kontext a textová data včetně NLP nad materiálovou literaturou.",
  },
  {
    href: "/ml-12",
    kicker: "Přednáška 12",
    title: "PINNs a nejistota",
    text: "Fyzikálně informované modely a metody, které umí přiznat nejistotu i zvýšit důvěru v predikce.",
  },
  {
    href: "/ml-13",
    kicker: "Přednáška 13",
    title: "Inverzní návrh a generativní AI",
    text: "Jak se posunout od predikce k aktivnímu návrhu nových materiálů a struktur.",
  },
];

export default function MlEducationPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Vzdělávací Sekce
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            ML v materiálovém inženýrství
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            Třináct přednášek od základního datového workflow až po PINNs, GNN,
            transformery a inverzní návrh materiálů.
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
              Otevřít přednášku
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
