"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { KnowledgeCardType } from "@/types";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  BrainCircuit, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  RotateCcw,
  SearchX
} from "lucide-react";

type QuestionProgress = {
  score: number;
  lastSeen: number;
};

type ProgressMap = Record<string, QuestionProgress>;
type PracticeStats = {
  date: string;
  answeredToday: number;
};

const EMPTY_STATS: PracticeStats = {
  date: "",
  answeredToday: 0,
};

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function QuantumPracticePage() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<KnowledgeCardType[]>([]);
  const [activeTab, setActiveTab] = useState<"practice" | "browse">("practice");
  
  // States pro prohlížeč (Browse)
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // States pro procvičování (Practice)
  const [progress, setProgress] = useState<ProgressMap>({});
  const [practiceStats, setPracticeStats] = useState<PracticeStats>(EMPTY_STATS);
  const [currentQuestion, setCurrentQuestion] = useState<KnowledgeCardType | null>(null);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [
      { data: authData },
      { data, error },
    ] = await Promise.all([
      supabase.auth.getUser(),
      supabase
      .from("knowledge_cards")
      .select("*")
      .like("page_slug", "quantum%")
      .not("checkpoint_question", "is", null),
    ]);

    const authUser = authData.user;
    setUser(authUser ?? null);

    const savedProgress = (authUser?.user_metadata?.quantum_practice_progress ?? {}) as ProgressMap;
    const savedStats = (authUser?.user_metadata?.quantum_practice_stats ?? EMPTY_STATS) as PracticeStats;

    setProgress(savedProgress);
    setPracticeStats(savedStats.date === getTodayKey() ? savedStats : EMPTY_STATS);

    if (data) {
      setQuestions(data);
      selectNextQuestion(data, savedProgress);
    }

    if (error) {
      console.error("Chyba při načítání kvantových otázek:", error);
    }

    setLoading(false);
  };

  // --- LOGIKA SRS (PROCVIČOVÁNÍ) ---

  const selectNextQuestion = (
    allQuestions: KnowledgeCardType[] = questions,
    currentProgress: ProgressMap = progress
  ) => {
    if (allQuestions.length === 0) return;

    let candidates = [...allQuestions];
    if (currentQuestion && allQuestions.length > 1) {
      candidates = candidates.filter(q => q.id !== currentQuestion.id);
    }

    const sorted = candidates.sort((a, b) => {
      const scoreA = currentProgress[a.id]?.score || 0;
      const scoreB = currentProgress[b.id]?.score || 0;
      return scoreA - scoreB;
    });

    const topCandidates = sorted.slice(0, Math.min(5, sorted.length));
    const selected = topCandidates[Math.floor(Math.random() * topCandidates.length)];
    
    setCurrentQuestion(selected);
    setUserAnswer(null);
  };

  const syncPracticeState = async (newProgress: ProgressMap, newStats: PracticeStats) => {
    if (!user) return;

    const { data, error } = await supabase.auth.updateUser({
      data: {
        ...user.user_metadata,
        quantum_practice_progress: newProgress,
        quantum_practice_stats: newStats,
      },
    });

    if (error) {
      console.error("Chyba při ukládání procvičování do Supabase:", error);
      return;
    }

    if (data.user) {
      setUser(data.user);
    }
  };

  const handleAnswer = async (option: string) => {
    if (!currentQuestion || userAnswer || !user) return;
    
    setUserAnswer(option);
    const isCorrect = option === currentQuestion.correct_answer;
    
    const currentProg = progress[currentQuestion.id] || { score: 0, lastSeen: 0 };
    const newScore = isCorrect ? currentProg.score + 1 : Math.max(0, currentProg.score - 1);
    
    const newProgress = {
      ...progress,
      [currentQuestion.id]: {
        score: newScore,
        lastSeen: Date.now()
      }
    };

    const today = getTodayKey();
    const newStats: PracticeStats = {
      date: today,
      answeredToday: practiceStats.date === today ? practiceStats.answeredToday + 1 : 1,
    };

    setProgress(newProgress);
    setPracticeStats(newStats);
    await syncPracticeState(newProgress, newStats);
  };

  // --- LOGIKA PROHLÍŽEČE (BROWSE) ---

  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return questions;
    const query = searchQuery.toLowerCase();
    return questions.filter(q => 
      q.checkpoint_question.toLowerCase().includes(query) ||
      q.title.toLowerCase().includes(query)
    );
  }, [questions, searchQuery]);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedIds(newExpanded);
  };

  const resetProgress = () => {
    if (confirm("Opravdu chcete smazat veškerý svůj postup v procvičování?")) {
      const resetStats = { ...EMPTY_STATS };
      setProgress({});
      setPracticeStats(resetStats);
      void syncPracticeState({}, resetStats);
      selectNextQuestion(questions, {});
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-slate-500 font-medium">Načítám kvantové otázky...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Kvantové otázky</h1>
          <p className="text-slate-500">Kompletní databáze {questions.length} otázek pro vaši přípravu.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setActiveTab("practice")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'practice' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <BrainCircuit size={18} /> Procvičování
          </button>
          <button 
            onClick={() => setActiveTab("browse")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'browse' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <BookOpen size={18} /> Prohlížeč
          </button>
        </div>
      </header>

      {activeTab === "practice" ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {currentQuestion ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">
                  Level: {progress[currentQuestion.id]?.score || 0}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  {currentQuestion.checkpoint_question}
                </h2>

                <div className="space-y-3">
                  {currentQuestion.checkpoint_options.map((opt, idx) => {
                    const isSelected = userAnswer === opt;
                    const isCorrect = opt === currentQuestion.correct_answer;
                    
                    let btnClass = "border-slate-100 bg-white hover:border-slate-300";
                    if (userAnswer) {
                      if (isCorrect) btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500";
                      else if (isSelected) btnClass = "border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500";
                      else btnClass = "border-slate-100 bg-white opacity-50";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(opt)}
                        disabled={!!userAnswer}
                        className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${btnClass}`}
                      >
                        <span className="font-semibold">{opt}</span>
                        {userAnswer && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        {userAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                      </button>
                    );
                  })}
                </div>

                {userAnswer && (
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 mt-6">
                    <div className={`flex items-center gap-2 font-bold ${userAnswer === currentQuestion.correct_answer ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {userAnswer === currentQuestion.correct_answer ? (
                        <>
                          <CheckCircle2 size={20} />
                          <span>Výborně!</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={20} />
                          <span>Správná odpověď byla: {currentQuestion.correct_answer}</span>
                        </>
                      )}
                    </div>
                    
                    <button
                      onClick={() => selectNextQuestion()}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95"
                    >
                      Další otázka <ArrowRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
               <p className="text-slate-500 font-medium">Žádné otázky k dispozici.</p>
            </div>
          )}

          <div className="flex items-center justify-between px-2">
            <div className="text-sm font-bold text-slate-400">
              Dnes procvičeno: <span className="text-slate-900">{practiceStats.answeredToday}</span>
            </div>
            <button 
              onClick={resetProgress}
              className="text-xs font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={14} /> Resetovat pokrok
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Hledat v otázkách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 shadow-sm"
            />
          </div>

          <div className="space-y-3">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => (
                <div key={q.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-colors shadow-sm">
                  <button 
                    onClick={() => toggleExpand(q.id)}
                    className="w-full text-left p-5 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-800 leading-snug">{q.checkpoint_question}</h3>
                    </div>
                    <div className="text-slate-300 mt-1 shrink-0">
                      {expandedIds.has(q.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>
                  
                  {expandedIds.has(q.id) && (
                    <div className="px-5 pb-5 pt-1 animate-in slide-in-from-top-2 duration-200">
                      <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Možnosti:</p>
                        <div className="space-y-2">
                          {q.checkpoint_options.map((opt, i) => (
                            <div key={i} className={`text-sm py-2 px-3 rounded-lg border ${opt === q.correct_answer ? 'bg-emerald-50 border-emerald-100 text-emerald-800 font-bold' : 'bg-white border-slate-100 text-slate-600'}`}>
                              {opt}
                              {opt === q.correct_answer && " ✓"}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-slate-400 space-y-4">
                <SearchX size={48} className="mx-auto opacity-20" />
                <p className="font-medium">Nenašli jsme žádnou otázku odpovídající vašemu hledání.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
