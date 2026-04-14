
"use client";

import { useState, useEffect } from "react";
import { Loader2, GraduationCap, Mail, Search } from "lucide-react";

export default function AdminResultsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/admin/results');
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Nepodařilo se načíst administrativní přehled.");
        setData([]);
        return;
      }

      if (Array.isArray(json)) {
        setData(json);
      }
    } catch (err) {
      console.error(err);
      setError("Nepodařilo se načíst administrativní přehled.");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(s => 
    s.full_name.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-slate-500 font-medium">Načítám výsledky všech studentů...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4 text-center">
        <GraduationCap className="w-12 h-12 text-slate-300" />
        <p className="text-lg font-semibold text-slate-900">Přístup odepřen</p>
        <p className="text-slate-500 max-w-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Přehled studentů</h1>
          <p className="text-slate-500 text-lg">Správa zkoušek a semestrálních prací - Kvantové technologie.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Hledat studenta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-80 shadow-sm"
          />
        </div>
      </header>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Student</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500">Semestrální práce</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500 text-center">Zkouška</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Pokusů</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold shrink-0">
                        {s.full_name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{s.full_name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {s.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 max-w-md">
                    <div className="group relative">
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {s.semester_project}
                      </p>
                      <div className="hidden group-hover:block absolute z-20 top-full left-0 mt-2 p-4 bg-slate-900 text-white text-xs rounded-xl shadow-2xl w-80">
                         {s.semester_project}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl font-black text-xl border-2
                      ${s.best_score >= 80 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 
                        s.best_score >= 50 ? 'bg-amber-50 border-amber-100 text-amber-600' : 
                        s.best_score > 0 ? 'bg-rose-50 border-rose-100 text-rose-600' : 
                        'bg-slate-50 border-slate-100 text-slate-300'}
                    `}>
                      {s.best_score > 0 ? `${s.best_score}%` : '—'}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                      {s.attempts}x
                    </span>
                    {s.last_attempt && (
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">
                        Poslední: {new Date(s.last_attempt).toLocaleDateString()}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="py-20 text-center">
            <GraduationCap className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">Nebyli nalezeni žádní studenti.</p>
          </div>
        )}
      </div>
    </div>
  );
}
