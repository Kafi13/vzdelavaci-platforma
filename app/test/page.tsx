"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { KnowledgeCardType } from "@/types";
import { Check, X, Loader2, Trophy, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";

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
    // Fetch all cards that have questions
    const { data, error } = await supabase
      .from("knowledge_cards")
      .select("*")
      .not("checkpoint_question", "is", null);

    if (data) {
      // Shuffle and take up to 15
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 15));
    }
    setLoading(false);
  };

  const handleStart = () => {
    setCurrentIdx(0);
    setAnswers({});
    setShowResult(false);
  };

  const handleAnswer = (option: string) => {
    setAnswers({ ...answers, [currentIdx]: option });
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
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

  // START SCREEN
  if (currentIdx === -1) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
        <div className="bg-indigo-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto text-indigo-600">
          <Trophy className="w-10 h-10" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Závěrečná zkouška</h1>
          <p className="text-slate-600 text-lg">
            Prověřte své znalosti z absolvovaných lekcí. Čeká vás náhodný výběr až 15 otázek.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-left space-y-4">
          <h3 className="font-semibold text-slate-900">Pravidla testu:</h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Náhodný výběr z databáze znalostí.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Na každou otázku je pouze jedna správná odpověď.
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Po dokončení uvidíte své celkové skóre.
            </li>
          </ul>
        </div>
        <button
          onClick={handleStart}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          Spustit zkoušku
        </button>
      </div>
    );
  }

  // RESULT SCREEN
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

        <div className="grid grid-cols-1 gap-4 text-left">
           {questions.map((q, idx) => (
             <div key={idx} className={`p-4 rounded-lg border ${answers[idx] === q.correct_answer ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                <p className="font-semibold text-slate-800 text-sm mb-1">{idx + 1}. {q.checkpoint_question}</p>
                <p className="text-xs text-slate-600">Vaše odpověď: <span className={answers[idx] === q.correct_answer ? 'text-emerald-700' : 'text-rose-700'}>{answers[idx]}</span></p>
                {answers[idx] !== q.correct_answer && (
                  <p className="text-xs text-emerald-700 font-medium">Správně: {q.correct_answer}</p>
                )}
             </div>
           ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleStart}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Zkusit znovu
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-bold transition-all"
          >
            Zpět na mapu
          </Link>
        </div>
      </div>
    );
  }

  // QUESTION SCREEN
  const q = questions[currentIdx];
  const hasAnswered = answers[currentIdx] !== undefined;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      <div className="flex items-center justify-between text-sm font-medium text-slate-500">
        <span>Otázka {currentIdx + 1} z {questions.length}</span>
        <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">{q.checkpoint_question}</h2>
        
        <div className="space-y-3">
          {q.checkpoint_options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              disabled={hasAnswered}
              className={`w-full text-left px-6 py-5 rounded-xl border-2 transition-all flex items-center justify-between group
                ${answers[currentIdx] === opt 
                  ? 'border-indigo-600 bg-indigo-50/30' 
                  : 'border-slate-100 hover:border-slate-300 bg-white'
                }
                ${hasAnswered && opt === q.correct_answer && opt !== answers[currentIdx] ? 'border-emerald-500/50 bg-emerald-50/20' : ''}
              `}
            >
              <span className={`font-medium ${answers[currentIdx] === opt ? 'text-indigo-900' : 'text-slate-700'}`}>
                {opt}
              </span>
              {answers[currentIdx] === opt && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={nextQuestion}
          disabled={!hasAnswered}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all
            ${hasAnswered 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          {currentIdx === questions.length - 1 ? 'Dokončit test' : 'Další otázka'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
