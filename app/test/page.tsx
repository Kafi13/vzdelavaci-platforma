
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { KnowledgeCardType } from "@/types";
import { Loader2, Trophy, ArrowRight, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { isMissingTableError, readExamResults } from "@/utils/user-metadata";

export default function ExamPage() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<KnowledgeCardType[]>([]);
  const [currentIdx, setCurrentIdx] = useState(-1); // -1 is start screen
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("knowledge_cards")
      .select("*")
      .eq("page_slug", "quantum_exam")
      .not("checkpoint_question", "is", null);

    if (data && data.length > 0) {
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 15));
    } else {
      console.error("No exam questions found!", error);
    }
    setLoading(false);
  };

  const saveResult = async (score: number, total: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const resultPayload = {
      user_id: user.id,
      score: score,
      total_questions: total,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("exam_results").insert(resultPayload);

    if (error && isMissingTableError(error.message)) {
      const existingResults = readExamResults(user);
      await supabase.auth.updateUser({
        data: {
          ...user.user_metadata,
          exam_results: [resultPayload, ...existingResults],
        },
      });
    }
  };

  const handleStart = () => {
    setCurrentIdx(0);
    setAnswers({});
    setShowResult(false);
  };

  const handleAnswer = (option: string) => {
    if (answers[currentIdx] !== undefined) return; // Prevent re-answering
    setAnswers({ ...answers, [currentIdx]: option });
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      const correctCount = questions.reduce((acc, q, idx) => {
        return answers[idx] === q.correct_answer ? acc + 1 : acc;
      }, 0);
      saveResult(correctCount, questions.length);
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-slate-500 font-medium">Připravuji zkušební test...</p>
      </div>
    );
  }

  if (currentIdx === -1) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
        <div className="bg-indigo-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
          <Trophy className="w-10 h-10" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Kvantová zkouška</h1>
          <p className="text-slate-600 text-lg">
            Prověřte své znalosti z kvantových technologií. Test vybírá 15 náhodných otázek ze stejného fondu jako procvičování.
          </p>
        </div>
        <button
          onClick={handleStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          Spustit test
        </button>
      </div>
    );
  }

  if (showResult) {
    const correctCount = questions.reduce((acc, q, idx) => {
      return answers[idx] === q.correct_answer ? acc + 1 : acc;
    }, 0);
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-slate-900">Výsledek testu</h1>
          <div className="text-6xl font-black text-indigo-600">{percentage}%</div>
          <p className="text-slate-600 text-lg">
            Správně jste odpověděli na <span className="font-bold text-slate-900">{correctCount}</span> z <span className="font-bold text-slate-900">{questions.length}</span> otázek.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <button onClick={handleStart} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold"><RefreshCw size={18}/>Zkusit znovu</button>
          <Link href="/dashboard" className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold">Zpět na profil</Link>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  const userAnswer = answers[currentIdx];
  const isAnswered = userAnswer !== undefined;
  const isCorrect = userAnswer === q.correct_answer;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 px-4">
      <div className="flex items-center justify-between text-sm font-bold text-slate-400 uppercase tracking-widest">
        <span>Otázka {currentIdx + 1} / {questions.length}</span>
        <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">{q.checkpoint_question}</h2>
        
        <div className="space-y-3">
          {q.checkpoint_options.map((opt, idx) => {
            const isSelected = userAnswer === opt;
            const isOptionCorrect = opt === q.correct_answer;
            
            let btnClass = "border-slate-100 bg-white hover:border-slate-300";
            if (isAnswered) {
              if (isOptionCorrect) btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500";
              else if (isSelected) btnClass = "border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500";
              else btnClass = "border-slate-100 bg-white opacity-50";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                disabled={isAnswered}
                className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${btnClass}`}
              >
                <span className="font-semibold">{opt}</span>
                {isAnswered && isOptionCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {isAnswered && isSelected && !isOptionCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 ${isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
          {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span className="font-bold">{isCorrect ? "Správná odpověď!" : `Špatně. Správná odpověď je: ${q.correct_answer}`}</span>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <button
          onClick={nextQuestion}
          disabled={!isAnswered}
          className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-black transition-all ${isAnswered ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
        >
          {currentIdx === questions.length - 1 ? 'Dokončit test' : 'Další otázka'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
