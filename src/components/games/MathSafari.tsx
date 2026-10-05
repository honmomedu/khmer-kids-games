import React, { useState } from 'react';
import { MATH_SAFARI_PROBLEMS, MathProblem } from '../../data/mathSafariData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { CheckCircle2, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl">
            🐒
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              សួនសត្វរាប់លេខ & បូកដក
            </h2>
            <p className="text-xs text-slate-500">រៀនរាប់ចំនួន និងគិតលេខបូកដករហ័សជាមួយសត្វព្រៃ</p>
          </div>
        </div>

        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
          លំហាត់ {problemIndex + 1} / {MATH_SAFARI_PROBLEMS.length}
        </span>
      </div>

      {/* Math Arena */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100 text-center space-y-6">
        <h3 className="text-xl md:text-2xl font-black text-slate-800">
          {currentProblem.question}
        </h3>

        {/* Visual Animal/Item Counters */}
        <div className="p-6 bg-amber-50/60 rounded-3xl border border-amber-200/70 space-y-4">
          <p className="text-xs text-amber-700 font-semibold">
            👇 ប្អូនអាចចុចលើរូបដើម្បីជួយរាប់បាន៖
          </p>

          {currentProblem.type === 'count' && (
            <div className="flex justify-center items-center gap-3 flex-wrap max-w-md mx-auto">
              {Array.from({ length: currentProblem.num1 }).map((_, i) => {
                const isCounted = countedSet.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => toggleCountItem(i)}
                    className={`w-14 h-14 rounded-2xl text-3xl flex items-center justify-center transition transform active:scale-90 ${
                      isCounted
                        ? 'bg-amber-300 ring-4 ring-amber-400 scale-110 shadow-md'
                        : 'bg-white shadow-sm hover:scale-105'
                    }`}
                  >
                    {currentProblem.emoji}
                  </button>
                );
              })}
            </div>
          )}

          {currentProblem.type === 'add' && (
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* Group 1 */}
              <div className="flex gap-1.5 p-3 bg-white rounded-2xl shadow-sm border border-amber-100">
                {Array.from({ length: currentProblem.num1 }).map((_, i) => (
                  <span key={i} className="text-3xl">{currentProblem.emoji}</span>
                ))}
              </div>

              <span className="text-3xl font-black text-amber-600">➕</span>

              {/* Group 2 */}
              <div className="flex gap-1.5 p-3 bg-white rounded-2xl shadow-sm border border-amber-100">
                {Array.from({ length: currentProblem.num2 || 0 }).map((_, i) => (
                  <span key={i} className="text-3xl">{currentProblem.emoji}</span>
                ))}
              </div>
            </div>
          )}

          {currentProblem.type === 'subtract' && (
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* Total Group */}
              <div className="flex gap-1.5 p-3 bg-white rounded-2xl shadow-sm border border-amber-100 flex-wrap justify-center">
                {Array.from({ length: currentProblem.num1 }).map((_, i) => {
                  const isCrossed = i >= currentProblem.num1 - (currentProblem.num2 || 0);
                  return (
                    <span
                      key={i}
                      className={`text-3xl relative ${
                        isCrossed ? 'opacity-40 grayscale line-through' : ''
                      }`}
                    >
                      {currentProblem.emoji}
                      {isCrossed && (
                        <span className="absolute inset-0 text-red-600 font-black text-2xl flex items-center justify-center">
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

        {/* 4 Choices */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
          {currentProblem.options.map((opt) => {
            const isSelected = selectedAnswer === opt;
            const isRight = opt === currentProblem.answer;

            let style = 'bg-white hover:bg-emerald-50 border-2 border-slate-200 text-slate-800';
            if (selectedAnswer !== null) {
              if (isRight) {
                style = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg scale-105';
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
                className={`py-5 rounded-2xl text-3xl font-black transition-all transform active:scale-95 shadow-sm ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Next Question */}
        {selectedAnswer !== null && (
          <div className="pt-4 flex flex-col items-center gap-3">
            {isCorrect ? (
              <div className="text-emerald-600 font-extrabold text-lg flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" /> ពូកែគិតលេខមែនទែន! ត្រឹមត្រូវហើយ 🌟 (+២ ផ្កាយ)
              </div>
            ) : (
              <div className="text-rose-500 font-extrabold text-base">
                មិនទាន់ត្រូវទេ! ចម្លើយត្រឹមត្រូវគឺ៖ {currentProblem.answer}
              </div>
            )}

            <button
              onClick={handleNext}
              className="mt-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-extrabold rounded-2xl shadow-lg hover:scale-105 transition flex items-center gap-2"
            >
              លំហាត់បន្ទាប់ <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
