import './globals.css';
import type { ReactNode } from 'react';
import SocraticTutor from '@/components/SocraticTutor';
import { createClient } from '@/utils/supabase/server';
import { isAdminEmail } from '@/utils/admin';
import ResponsiveLayout from '@/components/ResponsiveLayout';

export const metadata = {
  title: 'Vzdělávací platforma',
  description: 'Minimalistická vzdělávací platforma pro AI, ML a kvantové technologie.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = isAdminEmail(user?.email);

  return (
    <html lang="cs">
      <body className="font-sans antialiased">
        <ResponsiveLayout isAdmin={isAdmin} userEmail={user?.email}>
          {children}
        </ResponsiveLayout>
        <SocraticTutor />
      </body>
    </html>
  );
}
