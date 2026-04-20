'use client';

import Link from 'next/link';
import { ArrowRight, BrainCircuit, GraduationCap } from 'lucide-react';

const primaryLinks = [
  { href: '/quantum', label: 'Kvantové technologie' },
  { href: '/ml', label: 'ML v materiálovém inženýrství' },
  { href: '/quantum-practice', label: 'Procvičování' },
  { href: '/test', label: 'Závěrečná zkouška' },
];

const quantumChapters = [
  { href: '/quantum-1', label: '1. Úvod do kvantových technologií' },
  { href: '/quantum-2', label: '2. Kvantové materiály' },
  { href: '/quantum-3', label: '3. Senzorika a metrologie' },
  { href: '/quantum-4', label: '4. Komunikace a bezpečnost' },
  { href: '/quantum-5', label: '5. Kvantové výpočty a simulace' },
  { href: '/quantum-6', label: '6. Kvantové a hybridní algoritmy' },
  { href: '/quantum-7', label: '7. Kvantové strojové učení' },
];

const mlChapters = [
  { href: '/ml-1', label: '1. AI revoluce v materiálovém inženýrství' },
  { href: '/ml-2', label: '2. Data a featurizace' },
  { href: '/ml-3', label: '3. Příprava dat pro AI v materiálech' },
  { href: '/ml-4', label: '4. Trénink a validace modelů' },
  { href: '/ml-5', label: '5. Základní modely a explorace dat' },
  { href: '/ml-6', label: '6. Ansámblové metody a XAI' },
  { href: '/ml-7', label: '7. Pokročilé techniky a nasazení klasického ML' },
  { href: '/ml-8', label: '8. Úvod do neuronových sítí a hlubokého učení' },
  { href: '/ml-9', label: '9. Konvoluční sítě a augmentace dat' },
  { href: '/ml-10', label: '10. GNN pro materiálové simulace a MLIPs' },
  { href: '/ml-11', label: '11. Sekvenční data, RNN a Transformery' },
  { href: '/ml-12', label: '12. PINNs a kvantifikace nejistoty' },
  { href: '/ml-13', label: '13. Inverzní návrh a generativní AI' },
];

export default function DomainMap() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {primaryLinks.map((link, index) => {
          const Icon =
            index === 2 ? BrainCircuit : index === 3 ? GraduationCap : ArrowRight;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <span>{link.label}</span>
              <Icon className="h-4 w-4 text-slate-500" />
            </Link>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="mb-4 text-sm font-semibold text-slate-500">Kvantové technologie</p>
          <div className="grid gap-3">
            {quantumChapters.map((chapter) => (
              <Link
                key={chapter.href}
                href={chapter.href}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span>{chapter.label}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="mb-4 text-sm font-semibold text-slate-500">ML v materiálovém inženýrství</p>
          <div className="grid gap-3">
            {mlChapters.map((chapter) => (
              <Link
                key={chapter.href}
                href={chapter.href}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <span>{chapter.label}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
