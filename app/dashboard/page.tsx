
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Trophy, FileText, Play, Loader2, CheckCircle, AlertCircle, User } from "lucide-react";
import Link from "next/link";
import { isMissingTableError, readExamResults, readStudentProfile } from "@/utils/user-metadata";

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [projectDesc, setProjectDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      setUser(user);
      const metadataProfile = readStudentProfile(user);
      const metadataResults = readExamResults(user);
      
      const { data: prof, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      
      if (prof) {
        setFullName(prof.full_name || "");
        setProjectDesc(prof.semester_project_desc || "");
      } else if (!profileError || isMissingTableError(profileError?.message)) {
        setFullName(metadataProfile.full_name || "");
        setProjectDesc(metadataProfile.semester_project_desc || "");
      }

      const { data: res, error: resultsError } = await supabase
        .from("exam_results")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (res) {
        setResults(res);
      } else if (!resultsError || isMissingTableError(resultsError?.message)) {
        setResults(metadataResults);
      }
    }
    setLoading(false);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: fullName,
        semester_project_desc: projectDesc,
        updated_at: new Date().toISOString()
      });

    if (error && !isMissingTableError(error.message)) {
      console.error("Save error:", error);
      setMessage({ type: 'error', text: "Nepodařilo se uložit profil. Zkuste to znovu." });
    } else {
      if (error && isMissingTableError(error.message)) {
        const { data, error: metadataError } = await supabase.auth.updateUser({
          data: {
            ...user.user_metadata,
            student_profile: {
              full_name: fullName,
              semester_project_desc: projectDesc,
            },
          },
        });

        if (metadataError) {
          console.error("Metadata save error:", metadataError);
          setMessage({ type: 'error', text: "Nepodařilo se uložit profil. Zkuste to znovu." });
          setSaving(false);
          return;
        }

        if (data.user) {
          setUser(data.user);
        }
      }

      setMessage({ type: 'success', text: "Profil byl úspěšně uložen!" });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-slate-500 font-medium">Načítám váš profil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Pro přístup se musíte přihlásit</h1>
        <Link href="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold">Přihlásit se</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-2">Můj Profil</h1>
        <p className="text-slate-500 text-lg">Vítejte zpět, {fullName || user.email}. Zde spravujete svou práci a zkoušky.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* SEMESTRALNI PRACE A PROFIL */}
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Osobní údaje</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Jméno a Příjmení</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Např. Jan Novák"
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <label className="block text-sm font-bold text-slate-700">Semestrální práce (téma a popis)</label>
                </div>
                <textarea
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Např. Implementace kvantového algoritmu pro optimalizaci logistiky..."
                  className="w-full h-40 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 leading-relaxed"
                />
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-indigo-100"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Uložit profil a práci"}
              </button>

              {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  <span className="font-medium">{message.text}</span>
                </div>
              )}
            </div>
          </section>

          {/* VYSLEDKY ZKOUSKY */}
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                <Trophy className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Historie zkoušek</h2>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl">
                <p className="text-slate-400 font-medium">Zatím jste neabsolvovali žádnou zkoušku.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800 text-lg">{new Date(res.created_at).toLocaleDateString('cs-CZ')}</p>
                      <p className="text-sm text-slate-500">Závěrečný test</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-indigo-600">{Math.round((res.score / res.total_questions) * 100)}%</p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{res.score}/{res.total_questions} SPRÁVNĚ</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* SIDEBAR: ZKOUSKA */}
        <div className="space-y-8">
          <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-2xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Play className="w-5 h-5" /> Kvantová Zkouška
              </h3>
              <p className="text-indigo-100 mb-8 text-sm leading-relaxed">
                Spusťte test složený z 15 náhodných otázek. Výsledek se automaticky uloží do vašeho profilu.
              </p>
              <Link
                href="/test"
                className="block w-full text-center bg-white text-indigo-700 py-4 rounded-xl font-black hover:bg-indigo-50 transition-all active:scale-95 shadow-lg"
              >
                Spustit test
              </Link>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
               <Trophy size={120} />
            </div>
          </section>

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-3 uppercase text-xs tracking-widest">Důležité info</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Práci můžete upravovat do konce semestru.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Učitel vidí vaše nejlepší skóre i téma práce.</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
