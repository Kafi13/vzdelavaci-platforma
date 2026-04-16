'use client';

import Link from 'next/link';
import { ArrowRight, BrainCircuit, GraduationCap } from 'lucide-react';

const primaryLinks = [
  { href: '/quantum', label: 'Studijní sekce' },
  { href: '/quantum-practice', label: 'Procvičování' },
  { href: '/test', label: 'Závěrečná zkouška' },
];

const chapters = [
  { href: '/quantum-1', label: '1. Úvod do kvantových technologií' },
  { href: '/quantum-2', label: '2. Kvantové materiály' },
  { href: '/quantum-3', label: '3. Senzorika a metrologie' },
  { href: '/quantum-4', label: '4. Komunikace a bezpečnost' },
  { href: '/quantum-5', label: '5. Kvantové výpočty a simulace' },
  { href: '/quantum-6', label: '6. Kvantové strojové učení' },
  { href: '/quantum-7', label: '7. Kvantové a hybridní algoritmy' },
];

export default function DomainMap() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-3">
        {primaryLinks.map((link, index) => {
          const Icon = index === 1 ? BrainCircuit : index === 2 ? GraduationCap : ArrowRight;

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

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid gap-3">
          {chapters.map((chapter) => (
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
      </section>
    </div>
  );
}
