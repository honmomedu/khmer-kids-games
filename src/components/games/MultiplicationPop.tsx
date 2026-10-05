import React, { useState } from 'react';
import { generateMultiplicationQuestion, BalloonQuestion } from '../../data/multiplicationData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { Flame } from 'lucide-react';
import { KhmerCorner } from '../ui/KhmerKbach';

interface Props {
  onAddStars: (amount: number) => void;
}

const BALLOON_COLORS = [
  'bg-red-500 hover:bg-red-600',
  'bg-sky-500 hover:bg-sky-600',
  'bg-amber-500 hover:bg-amber-600',
  'bg-emerald-500 hover:bg-emerald-600',
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
    <div className="max-w-4xl mx-auto space-y-3 sm:space-y-5">
      {/* Header */}
      <div className="relative bg-white rounded-3xl p-3.5 sm:p-5 shadow-md border-2 border-rose-300 flex flex-col sm:flex-row items-center justify-between gap-2.5 overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none">
          <KhmerCorner className="w-6 h-6 text-rose-500/70" />
        </div>
        <div className="absolute top-0 right-0 pointer-events-none rotate-90">
          <KhmerCorner className="w-6 h-6 text-rose-500/70" />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 z-10 w-full sm:w-auto">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl sm:text-3xl border border-rose-300 flex-shrink-0">
            🎈
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-800 leading-tight">
              វាយប៉េងប៉ោងមេលេខគុណ
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-500">ចុចបំបែកប៉េងប៉ោងដែលមានចម្លើយត្រឹមត្រូវ</p>
          </div>
        </div>

        <div className="flex items-center gap-2 z-10 self-end sm:self-auto">
          <div className="flex items-center gap-1 px-2.5 py-1 bg-orange-50 border border-orange-200 text-orange-600 font-extrabold rounded-full text-xs">
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" /> {streak}
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-600 font-extrabold rounded-full text-xs">
            💥 {poppedCount}
          </div>
        </div>
      </div>

      {/* Table Selector (Swipeable horizontally on mobile) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
        <button
          onClick={() => {
            sound.playClick();
            setSelectedTable(undefined);
            handleNewQuestion(undefined);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap active:scale-95 ${
            selectedTable === undefined
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          លាយគ្នា
        </button>
        {[2, 3, 4, 5, 6, 7, 8, 9].map((tbl) => (
          <button
            key={tbl}
            onClick={() => {
              sound.playClick();
              setSelectedTable(tbl);
              handleNewQuestion(tbl);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap active:scale-95 ${
              selectedTable === tbl
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            មេ {tbl}
          </button>
        ))}
      </div>

      {/* Balloon Stage (Scaled for mobile) */}
      <div className="relative min-h-[340px] sm:min-h-[400px] bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50 rounded-3xl p-4 sm:p-6 shadow-inner border-2 border-sky-300 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-2 left-4 text-3xl opacity-40 select-none">☁️</div>
        <div className="absolute top-8 right-6 text-4xl opacity-40 select-none">☁️</div>

        {/* Math Question */}
        <div className="relative z-10 self-center bg-white/95 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 rounded-3xl shadow-md border-2 border-rose-300 text-center">
          <p className="text-[10px] sm:text-xs font-bold text-rose-500 uppercase tracking-wider mb-0.5">
            គណនាផលគុណ
          </p>
          <div className="text-3xl sm:text-5xl font-black text-slate-800 tracking-wider">
            {question.factorA} {question.operation} {question.factorB} = ?
          </div>
        </div>

        {/* Floating Balloons (2x2 on mobile, 4 in row on tablet/desktop) */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 my-auto pt-3">
          {question.options.map((opt, idx) => {
            const isTargetPopped = poppedOption === opt;
            const isRight = opt === question.answer;

            if (isTargetPopped && isRight) {
              return (
                <div key={idx} className="flex flex-col items-center justify-center h-32 sm:h-44 animate-pop">
                  <span className="text-5xl sm:text-6xl">💥</span>
                  <span className="text-emerald-600 font-black text-lg mt-1">អស្ចារ្យ!</span>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="flex flex-col items-center cursor-pointer transition transform active:scale-90 hover:scale-105 animate-float"
                style={{ animationDelay: `${idx * 0.3}s` }}
                onClick={() => handlePop(opt)}
              >
                <div
                  className={`w-24 h-28 sm:w-32 sm:h-36 rounded-full ${
                    BALLOON_COLORS[idx % BALLOON_COLORS.length]
                  } text-white flex items-center justify-center text-3xl sm:text-4xl font-black shadow-lg relative border border-white/30`}
                >
                  <div className="absolute top-2.5 left-3 w-5 h-8 bg-white/30 rounded-full rotate-[-30deg]"></div>
                  {opt}
                </div>
                <div className="w-2 h-1.5 bg-slate-700 -mt-0.5 rounded-sm"></div>
                <div className="w-0.5 h-8 sm:h-10 bg-slate-400"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
