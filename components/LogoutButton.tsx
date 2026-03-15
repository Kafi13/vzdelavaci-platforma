"use client";

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full text-left rounded-md px-3 py-2 mt-2 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors"
        >
            Odhlásit se
        </button>
    );
}
