import './globals.css';
import type { ReactNode } from 'react';
import SocraticTutor from '@/components/SocraticTutor';
import SidebarNav from '@/components/SidebarNav';
import { createClient } from '@/utils/supabase/server';
import LogoutButton from '@/components/LogoutButton';
import { isAdminEmail } from '@/utils/admin';

export const metadata = {
  title: 'Vzdělávací platforma',
  description: 'Minimalisticka vzdelavaci platforma pro AI, ML a kvantove technologie.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = isAdminEmail(user?.email);
  return (
    <html lang="cs">
      <body className="font-sans">
        <div className="min-h-screen bg-paper text-ink">
          <aside className="fixed inset-y-0 left-0 flex w-64 flex-col border-r border-slate-800 bg-slate-950 px-6 py-8 text-slate-100">
            <div className="mb-10 shrink-0">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Platforma</p>
              <p className="mt-2 text-lg font-semibold tracking-wide">Studijni Portal</p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <SidebarNav isAdmin={isAdmin} />
            </div>
            <div className="mt-6 shrink-0 pt-6">
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
