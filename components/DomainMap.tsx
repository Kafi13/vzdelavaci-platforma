'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  GraduationCap,
  Orbit,
  Sparkles,
} from 'lucide-react';

type Chapter = {
  href: string;
  number: string;
  title: string;
  text: string;
};

const chapters: Chapter[] = [
  {
    href: '/quantum-1',
    number: '01',
    title: 'Úvod do kvantových technologií',
    text: 'Základní pojmy, druhá kvantová revoluce, superpozice, provázání a orientace v oboru.',
  },
  {
    href: '/quantum-2',
    number: '02',
    title: 'Kvantové materiály',
    text: 'Supravodiče, NV centra, izotopově čistý křemík a materiálové limity dnešního hardwaru.',
  },
  {
    href: '/quantum-3',
    number: '03',
    title: 'Senzorika a metrologie',
    text: 'Atomové hodiny, magnetometrie, gravimetrie a proč kvantová měření mění přesnost.',
  },
  {
    href: '/quantum-4',
    number: '04',
    title: 'Komunikace a bezpečnost',
    text: 'QKD, kvantové sítě, bezpečnostní dopady a přechod na postkvantovou kryptografii.',
  },
  {
    href: '/quantum-5',
    number: '05',
    title: 'Kvantové výpočty a simulace',
    text: 'Qubity, obvody, interference, simulace molekul a realistické limity NISQ systémů.',
  },
  {
    href: '/quantum-6',
    number: '06',
    title: 'Kvantové strojové učení',
    text: 'Hybridní modely, QML use-cases a střízlivé hodnocení přínosu pro AI.',
  },
  {
    href: '/quantum-7',
    number: '07',
    title: 'Kvantové a hybridní algoritmy',
    text: 'Interference, orákula, VQE, QAOA a praktický význam dnešních hybridních workflow.',
  },
];

const quickLinks = [
  {
    href: '/quantum',
    title: 'Přehled studijní sekce',
    text: 'Vstupní stránka kvantové části s kontextem a návazností kapitol.',
    icon: BookOpen,
    tone: 'border-slate-200 bg-white text-slate-900',
  },
  {
    href: '/quantum-practice',
    title: 'Procvičování',
    text: 'Samostatný trénink otázek se sledováním průběžného progresu.',
    icon: BrainCircuit,
    tone: 'border-emerald-200 bg-emerald-50 text-emerald-950',
  },
  {
    href: '/test',
    title: 'Závěrečná zkouška',
    text: 'Finální ověření znalostí nad stejným tematickým okruhem.',
    icon: GraduationCap,
    tone: 'border-indigo-200 bg-indigo-50 text-indigo-950',
  },
];

export default function DomainMap() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_28%)]" />
        <div className="relative grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-10">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
              <Orbit className="h-3.5 w-3.5" />
              Studijní Rozcestník
            </div>
            <div className="space-y-4">
              <h2 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Přehled studia na jednom místě.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Nejprve kapitoly, potom procvičování a nakonec zkouška.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => router.push('/quantum')}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Otevřít studijní sekci
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => router.push('/quantum-practice')}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                Přejít na procvičování
              </button>
            </div>
          </div>

          <div className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <div className="mt-0.5 rounded-xl bg-slate-950 p-2 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">Doporučený postup</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Přehled sekce → Kapitoly 1 až 7 → Procvičování → Zkouška
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {quickLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md ${link.tone}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white/80 p-2 shadow-sm">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-black">{link.title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-6 opacity-80">{link.text}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-7 text-white shadow-xl shadow-slate-300/30 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
              Hlavní Trasa
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              Šest kapitol, které dávají smysl v pořadí.
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
              Místo rozházených uzlů je tady jasná studijní osa. Každá kapitola vede k další,
              takže student okamžitě chápe, kde začít a kam pokračovat.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            7 kapitol • 1 procvičování • 1 zkouška
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {chapters.map((chapter, index) => (
            <Link
              key={chapter.href}
              href={chapter.href}
              className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                    Kapitola {chapter.number}
                  </p>
                  <h4 className="mt-2 text-xl font-bold text-white">{chapter.title}</h4>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">
                  {index < chapters.length - 1 ? `→ ${chapters[index + 1].number}` : '→ Procvič.'}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{chapter.text}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
                Otevřít kapitolu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
