import React, { useState } from 'react';
import { MATH_SAFARI_PROBLEMS, MathProblem } from '../../data/mathSafariData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { KhmerCorner, KhmerDivider } from '../ui/KhmerKbach';

interface Props {
  onAddStars: (amount: number) => void;
}

export const MathSafari: React.FC<Props> = ({ onAddStars }) => {
  const [problemIndex, setProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [countedSet, setCountedSet] = useState<Set<number>>(new Set());

  const currentProblem = MATH_SAFARI_PROBLEMS[problemIndex % MATH_SAFARI_PROBLEMS.length];

  const handleSelectAnswer = (ans: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(ans);

    if (ans === currentProblem.answer) {
      setIsCorrect(true);
      sound.playCorrect();
      onAddStars(2);
      fireConfetti();
    } else {
      setIsCorrect(false);
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCountedSet(new Set());
    setProblemIndex((prev) => (prev + 1) % MATH_SAFARI_PROBLEMS.length);
  };

  const toggleCountItem = (index: number) => {
    sound.playPop();
    const nextSet = new Set(countedSet);
    if (nextSet.has(index)) {
      nextSet.delete(index);
    } else {
      nextSet.add(index);
    }
    setCountedSet(nextSet);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-md border-2 border-emerald-300 flex items-center justify-between overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none">
          <KhmerCorner className="w-6 h-6 text-emerald-500/70" />
        </div>
        <div className="absolute top-0 right-0 pointer-events-none rotate-90">
          <KhmerCorner className="w-6 h-6 text-emerald-500/70" />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 z-10">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl sm:text-3xl border border-emerald-300">
            🐒
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-800 leading-tight">
              សួនសត្វរាប់លេខ & បូកដក
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">រៀនរាប់ចំនួន និងគិតលេខបូកដករហ័ស</p>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200 z-10">
          {problemIndex + 1} / {MATH_SAFARI_PROBLEMS.length}
        </span>
      </div>

      {/* Math Arena */}
      <div className="relative bg-white rounded-3xl p-4 sm:p-8 shadow-lg border-2 border-emerald-200 text-center space-y-4 sm:space-y-6 overflow-hidden">
        <h3 className="text-lg sm:text-2xl font-black text-slate-800">
          {currentProblem.question}
        </h3>

        {/* Visual Animal/Item Counters */}
        <div className="p-4 sm:p-6 bg-amber-50/70 rounded-3xl border border-amber-200 space-y-3">
          <p className="text-[11px] sm:text-xs text-amber-800 font-bold">
            👇 ចុចលើរូបដើម្បីជួយរាប់៖
          </p>

          {currentProblem.type === 'count' && (
            <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap max-w-md mx-auto">
              {Array.from({ length: currentProblem.num1 }).map((_, i) => {
                const isCounted = countedSet.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => toggleCountItem(i)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-2xl sm:text-3xl flex items-center justify-center transition transform active:scale-90 ${
                      isCounted
                        ? 'bg-amber-300 ring-4 ring-amber-400 scale-105 shadow-md'
                        : 'bg-white shadow-xs hover:scale-105'
                    }`}
                  >
                    {currentProblem.emoji}
                  </button>
                );
              })}
            </div>
          )}

          {currentProblem.type === 'add' && (
            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <div className="flex gap-1 p-2 sm:p-3 bg-white rounded-2xl shadow-xs border border-amber-100 flex-wrap justify-center">
                {Array.from({ length: currentProblem.num1 }).map((_, i) => (
                  <span key={i} className="text-2xl sm:text-3xl">{currentProblem.emoji}</span>
                ))}
              </div>

              <span className="text-2xl sm:text-3xl font-black text-amber-600">➕</span>

              <div className="flex gap-1 p-2 sm:p-3 bg-white rounded-2xl shadow-xs border border-amber-100 flex-wrap justify-center">
                {Array.from({ length: currentProblem.num2 || 0 }).map((_, i) => (
                  <span key={i} className="text-2xl sm:text-3xl">{currentProblem.emoji}</span>
                ))}
              </div>
            </div>
          )}

          {currentProblem.type === 'subtract' && (
            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <div className="flex gap-1.5 p-2 sm:p-3 bg-white rounded-2xl shadow-xs border border-amber-100 flex-wrap justify-center">
                {Array.from({ length: currentProblem.num1 }).map((_, i) => {
                  const isCrossed = i >= currentProblem.num1 - (currentProblem.num2 || 0);
                  return (
                    <span
                      key={i}
                      className={`text-2xl sm:text-3xl relative ${
                        isCrossed ? 'opacity-40 grayscale line-through' : ''
                      }`}
                    >
                      {currentProblem.emoji}
                      {isCrossed && (
                        <span className="absolute inset-0 text-red-600 font-black text-xl flex items-center justify-center">
                          ❌
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <KhmerDivider className="opacity-40" />

        {/* 4 Choices (Touch-friendly 2x2 grid) */}
        <div className="grid grid-cols-2 gap-3 max-w-sm sm:max-w-md mx-auto">
          {currentProblem.options.map((opt) => {
            const isSelected = selectedAnswer === opt;
            const isRight = opt === currentProblem.answer;

            let style = 'bg-white hover:bg-emerald-50 border-2 border-slate-200 text-slate-800';
            if (selectedAnswer !== null) {
              if (isRight) {
                style = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg scale-102';
              } else if (isSelected && !isCorrect) {
                style = 'bg-rose-500 border-2 border-rose-600 text-white';
              } else {
                style = 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={opt}
                disabled={selectedAnswer !== null}
                onClick={() => handleSelectAnswer(opt)}
                className={`py-3.5 sm:py-5 rounded-2xl text-2xl sm:text-3xl font-black transition-all transform active:scale-95 shadow-sm min-h-[58px] ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Next Question */}
        {selectedAnswer !== null && (
          <div className="pt-2 flex flex-col items-center gap-2.5 animate-pop">
            {isCorrect ? (
              <div className="text-emerald-600 font-black text-sm sm:text-base flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5" /> ពូកែគិតលេខមែនទែន! ត្រឹមត្រូវហើយ 🌟 (+២ ផ្កាយ)
              </div>
            ) : (
              <div className="text-rose-500 font-bold text-xs sm:text-sm">
                មិនទាន់ត្រូវទេ! ចម្លើយត្រឹមត្រូវគឺ៖ {currentProblem.answer}
              </div>
            )}

            <button
              onClick={handleNext}
              className="mt-1 px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition flex items-center gap-2 text-sm sm:text-base"
            >
              លំហាត់បន្ទាប់ <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
