import React, { useState, useEffect } from 'react';
import { generateMultiplicationQuestion, BalloonQuestion } from '../../data/multiplicationData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { Sparkles, Flame, RotateCcw } from 'lucide-react';

interface Props {
  onAddStars: (amount: number) => void;
}

const BALLOON_COLORS = [
  'bg-red-500 hover:bg-red-600',
  'bg-sky-500 hover:bg-sky-600',
  'bg-amber-500 hover:bg-amber-600',
  'bg-emerald-500 hover:bg-emerald-600',
  'bg-purple-500 hover:bg-purple-600',
  'bg-pink-500 hover:bg-pink-600',
];

export const MultiplicationPop: React.FC<Props> = ({ onAddStars }) => {
  const [selectedTable, setSelectedTable] = useState<number | undefined>(undefined);
  const [question, setQuestion] = useState<BalloonQuestion>(() => generateMultiplicationQuestion());
  const [poppedOption, setPoppedOption] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [poppedCount, setPoppedCount] = useState(0);

  const handleNewQuestion = (table?: number) => {
    setQuestion(generateMultiplicationQuestion(table));
    setPoppedOption(null);
  };

  const handlePop = (opt: number) => {
    if (poppedOption !== null) return;
    setPoppedOption(opt);

    if (opt === question.answer) {
      sound.playPop();
      sound.playCorrect();
      setStreak((s) => s + 1);
      setPoppedCount((c) => c + 1);
      onAddStars(2);
      fireConfetti();

      // Delay to show next question
      setTimeout(() => {
        handleNewQuestion(selectedTable);
      }, 900);
    } else {
      sound.playWrong();
      setStreak(0);
      setTimeout(() => {
        setPoppedOption(null);
      }, 700);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-3xl">
            🎈
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              វាយប៉េងប៉ោងមេលេខគុណ
            </h2>
            <p className="text-xs text-slate-500">ចុចបំបែកប៉េងប៉ោងដែលមានចម្លើយត្រឹមត្រូវ</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 text-orange-600 font-extrabold rounded-full text-xs">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" /> Streak: {streak}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-600 font-extrabold rounded-full text-xs">
            💥 ផ្ទុះបាន៖ {poppedCount}
          </div>
        </div>
      </div>

      {/* Table Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 mr-1 whitespace-nowrap">រើសមេលេខ៖</span>
        <button
          onClick={() => {
            sound.playClick();
            setSelectedTable(undefined);
            handleNewQuestion(undefined);
          }}
          className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            selectedTable === undefined
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          លាយគ្នា (Mixed)
        </button>
        {[2, 3, 4, 5, 6, 7, 8, 9].map((tbl) => (
          <button
            key={tbl}
            onClick={() => {
              sound.playClick();
              setSelectedTable(tbl);
              handleNewQuestion(tbl);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              selectedTable === tbl
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            មេ {tbl}
          </button>
        ))}
      </div>

      {/* Balloon Game Stage */}
      <div className="relative min-h-[380px] bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50 rounded-3xl p-6 shadow-inner border border-sky-300 flex flex-col justify-between overflow-hidden">
        {/* Sky Clouds */}
        <div className="absolute top-4 left-6 text-4xl opacity-50 select-none">☁️</div>
        <div className="absolute top-10 right-10 text-5xl opacity-50 select-none">☁️</div>

        {/* Current Math Question Display */}
        <div className="relative z-10 self-center bg-white/90 backdrop-blur-md px-8 py-4 rounded-3xl shadow-lg border-2 border-indigo-200 text-center">
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">
            គណនាផលគុណ
          </p>
          <div className="text-4xl md:text-5xl font-black text-slate-800 tracking-wider">
            {question.factorA} {question.operation} {question.factorB} = ?
          </div>
        </div>

        {/* Floating Balloons */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 my-auto pt-6">
          {question.options.map((opt, idx) => {
            const isTargetPopped = poppedOption === opt;
            const isRight = opt === question.answer;

            if (isTargetPopped && isRight) {
              return (
                <div key={idx} className="flex flex-col items-center justify-center h-44 animate-pop">
                  <span className="text-6xl">💥</span>
                  <span className="text-emerald-600 font-black text-xl mt-1">អស្ចារ្យ!</span>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="flex flex-col items-center cursor-pointer transition transform hover:scale-105 active:scale-95 animate-float"
                style={{ animationDelay: `${idx * 0.4}s` }}
                onClick={() => handlePop(opt)}
              >
                {/* Balloon Body */}
                <div
                  className={`w-28 h-32 md:w-32 md:h-36 rounded-full ${
                    BALLOON_COLORS[idx % BALLOON_COLORS.length]
                  } text-white flex items-center justify-center text-3xl md:text-4xl font-black shadow-lg relative`}
                >
                  {/* Balloon reflection highlight */}
                  <div className="absolute top-3 left-4 w-6 h-10 bg-white/30 rounded-full rotate-[-30deg]"></div>
                  {opt}
                </div>
                {/* Balloon knot and string */}
                <div className="w-2.5 h-2 bg-slate-700 -mt-1 rounded-sm"></div>
                <div className="w-0.5 h-10 bg-slate-400"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
