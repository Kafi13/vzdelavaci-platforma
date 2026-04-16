"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();

    useEffect(() => {
        const confirmed = searchParams.get('confirmed');
        const errorDescription = searchParams.get('error_description');

        if (confirmed === '1') {
            setMessage('E-mail byl úspěšně potvrzen. Teď se můžete přihlásit.');
            setError(null);
        } else if (errorDescription) {
            setError(decodeURIComponent(errorDescription));
            setMessage(null);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setIsLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // Redirect on success
                router.push('/');
                router.refresh();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    }
                });
                if (error) throw error;
                setMessage('Registrace proběhla úspěšně. Pro dokončení klikněte na potvrzovací odkaz, který byl zaslán na váš e-mail.');
            }
        } catch (err: any) {
            // Translate common Supabase Auth errors to Czech
            let errorMessage = err.message;
            if (errorMessage.includes('Invalid login credentials')) {
                errorMessage = 'Špatný e-mail nebo heslo.';
            } else if (errorMessage.includes('User already registered')) {
                errorMessage = 'Uživatel s tímto e-mailem již existuje.';
            } else if (errorMessage.toLowerCase().includes('password should be at least')) {
                errorMessage = 'Heslo musí mít alespoň 6 znaků.';
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    {isLogin ? 'Přihlášení do portálu' : 'Vytvořit nový účet'}
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Vzdělávací platforma pro AI, ML a kvantové technologie
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-slate-900 py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-slate-800">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-md bg-red-900/50 border border-red-500/50 p-4">
                                <div className="text-sm text-red-200">{error}</div>
                            </div>
                        )}
                        {message && (
                            <div className="rounded-md bg-green-900/50 border border-green-500/50 p-4">
                                <div className="text-sm text-green-200">{message}</div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                E-mailová adresa
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-md shadow-sm placeholder-slate-400 bg-slate-800 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="student@univerzita.cz"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                Heslo
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-md shadow-sm placeholder-slate-400 bg-slate-800 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                            {isLogin && (
                                <div className="mt-2 text-right">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/forgot-password')}
                                        className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                    >
                                        Zapomněli jste heslo?
                                    </button>
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    isLogin ? 'Přihlásit se' : 'Zaregistrovat se'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-900 text-slate-400">Nebo</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError(null);
                                    setMessage(null);
                                }}
                                className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                {isLogin ? 'Ještě nemáte účet? Zaregistrujte se.' : 'Již máte účet? Přihlaste se.'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
