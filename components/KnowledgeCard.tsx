"use client";

import { useState } from "react";
import { KnowledgeCardType } from "@/types";
import { Check, X } from "lucide-react";

export default function KnowledgeCard({ card }: { card: KnowledgeCardType }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    // Prevent changing answer after selection
    if (selectedOption !== null) return;
    setSelectedOption(option);
  };

  const isCorrect = selectedOption === card.correct_answer;

  return (
    <div className="w-full max-w-3xl mx-auto my-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header / Hook */}
      <div className="p-6 sm:p-8 pb-0">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
          {card.title}
        </h3>
        <p className="text-lg italic text-slate-600 border-l-4 border-indigo-200 pl-4 mb-6">
          &quot;{card.hook}&quot;
        </p>
      </div>

      {/* MENTÁLNÍ MODEL */}
      <div className="bg-gradient-to-br from-indigo-50/50 to-emerald-50/50 px-6 sm:px-8 py-6 mb-2 border-y border-slate-100">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-800 mb-2 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-500"></span>
          MENTÁLNÍ MODEL
        </h4>
        <p className="text-slate-800 leading-relaxed">
          {card.mental_model}
        </p>
      </div>

      {/* Deep Dive */}
      <div className="px-6 sm:px-8 py-6">
        <p className="text-slate-700 leading-relaxed">
          {card.deep_dive}
        </p>
      </div>

      {/* Ověření znalostí / Interactive Section */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 sm:px-8 py-6 sm:py-8">
        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
          Ověření znalostí
        </h4>
        <p className="font-medium text-slate-800 mb-5">
          {card.checkpoint_question}
        </p>
        
        <div className="space-y-3">
          {card.checkpoint_options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isOptionCorrect = option === card.correct_answer;
            
            // Determine button styling based on state
            let buttonStyles = "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700";
            
            if (selectedOption !== null) {
              if (isSelected && isCorrect) {
                 buttonStyles = "border-emerald-500 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500";
              } else if (isSelected && !isCorrect) {
                 buttonStyles = "border-rose-500 bg-rose-50 text-rose-800 ring-1 ring-rose-500";
              } else if (isOptionCorrect) {
                 // Highlight the correct answer even if they guessed wrong
                 buttonStyles = "border-emerald-500 bg-white text-emerald-700";
              } else {
                 buttonStyles = "border-slate-200 bg-white/50 text-slate-400 opacity-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center justify-between ${buttonStyles}`}
              >
                <span className="block pr-4">{option}</span>
                
                {/* Status Icons */}
                {selectedOption !== null && isSelected && isCorrect && (
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {selectedOption !== null && isSelected && !isCorrect && (
                  <X className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                {selectedOption !== null && !isSelected && isOptionCorrect && (
                  <Check className="w-5 h-5 text-emerald-500 shrink-0 opacity-50" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Message */}
        {selectedOption !== null && (
          <div className="mt-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {isCorrect ? (
              <p className="text-emerald-700 font-medium text-sm flex items-center gap-1.5 bg-emerald-100/50 px-4 py-2 rounded-lg inline-flex">
                <Check className="w-4 h-4" /> Správně!
              </p>
            ) : (
              <p className="text-rose-700 font-medium text-sm flex items-center gap-1.5 bg-rose-100/50 px-4 py-2 rounded-lg inline-flex">
                <X className="w-4 h-4" /> Špatně. Správná odpověď je: {card.correct_answer}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
