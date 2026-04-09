import './globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import SocraticTutor from '@/components/SocraticTutor';
import { createClient } from '@/utils/supabase/server';
import LogoutButton from '@/components/LogoutButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Vzdělávací platforma',
  description: 'Minimalisticka vzdelavaci platforma pro AI, ML a kvantove technologie.',
};

interface NavItem {
  href: string;
  label: string;
  subItems?: { href: string; label: string }[];
}

const navItems: NavItem[] = [
  { href: '/uvod', label: 'Uvod' },
  { href: '/gen-ai', label: 'Gen AI' },
  { href: '/ml', label: 'ML' },
  {
    href: '/quantum',
    label: 'Quantum',
    subItems: [
      { href: '/quantum-1', label: '1. Základní koncepty' },
      { href: '/quantum-2', label: '2. Hardware a materiály' },
      { href: '/quantum-3', label: '3. Senzorika a metrologie' },
      { href: '/quantum-4', label: '4. Komunikace a bezpečnost' },
      { href: '/quantum-5', label: '5. Výpočty a simulace' },
      { href: '/quantum-6', label: '6. Strojové učení (QML)' },
    ]
  },
  { href: '/test', label: '🎯 Závěrečná zkouška' },
];

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <html lang="cs">
      <body className={inter.className}>
        <div className="min-h-screen bg-paper text-ink">
          <aside className="fixed inset-y-0 left-0 w-64 border-r border-slate-800 bg-slate-950 px-6 py-8 text-slate-100">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Platforma</p>
              <p className="mt-2 text-lg font-semibold tracking-wide">Studijni Portal</p>
            </div>
            <nav className="space-y-3 text-sm">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-slate-200 transition hover:bg-slate-800 hover:text-white"
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <div className="mt-1 flex flex-col space-y-1 border-l border-slate-800 ml-4 pl-3">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block rounded-md px-2 py-1.5 text-xs text-slate-400 transition hover:bg-slate-800/50 hover:text-slate-200"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-auto pt-10">
              {user ? (
                <div className="border-t border-slate-800 pt-4">
                  <p className="text-xs text-slate-400 truncate px-3">Přihlášen jako:</p>
                  <p className="text-sm font-medium text-slate-200 truncate px-3">{user.email}</p>
                  <LogoutButton />
                </div>
              ) : (
                <div className="text-xs text-slate-500">
                  Aktualizace obsahu v rezimu editace.
                </div>
              )}
            </div>
          </aside>
          <main className="ml-64 min-h-screen px-10 py-12">
            <div className="mx-auto w-full max-w-3xl">{children}</div>
          </main>
        </div>
        <SocraticTutor />
      </body>
    </html>
  );
}
