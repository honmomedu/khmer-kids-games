import React, { useState, useEffect } from 'react';
import { MYSTERY_BOXES, MysteryBoxQuestion } from '../../data/mysteryBoxData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { CheckCircle2, RotateCcw, Clock } from 'lucide-react';
import { KhmerCorner, KhmerDivider } from '../ui/KhmerKbach';

interface Props {
  onAddStars: (amount: number) => void;
}

export const MysteryBox: React.FC<Props> = ({ onAddStars }) => {
  const [openedBoxes, setOpenedBoxes] = useState<Set<number>>(new Set());
  const [activeBox, setActiveBox] = useState<MysteryBoxQuestion | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (!activeBox || selectedOption !== null) return;
    if (timeLeft <= 0) {
      sound.playWrong();
      setIsCorrect(false);
      setSelectedOption('__TIMEOUT__');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeBox, timeLeft, selectedOption]);

  const handleOpenBox = (box: MysteryBoxQuestion) => {
    if (openedBoxes.has(box.boxNumber)) return;
    sound.playPop();
    setActiveBox(box);
    setTimeLeft(20);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleAnswer = (opt: string) => {
    if (selectedOption !== null || !activeBox) return;
    setSelectedOption(opt);

    if (opt === activeBox.answer) {
      setIsCorrect(true);
      sound.playCorrect();
      fireConfetti();
      onAddStars(3);
      setOpenedBoxes(new Set(openedBoxes).add(activeBox.boxNumber));
    } else {
      setIsCorrect(false);
      sound.playWrong();
    }
  };

  const handleCloseModal = () => {
    sound.playClick();
    setActiveBox(null);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleResetAll = () => {
    sound.playClick();
    setOpenedBoxes(new Set());
    setActiveBox(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-md border-2 border-amber-300 flex items-center justify-between overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none">
          <KhmerCorner className="w-6 h-6 text-amber-500/70" />
        </div>
        <div className="absolute top-0 right-0 pointer-events-none rotate-90">
          <KhmerCorner className="w-6 h-6 text-amber-500/70" />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 z-10">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl sm:text-3xl border border-amber-300 flex-shrink-0">
            🎁
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-800 leading-tight">
              ប្រអប់អាថ៌កំបាំងសំណួររហ័ស
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">ឆ្លើយសំណួរចំណេះដឹងទូទៅ និង IQ</p>
          </div>
        </div>

        <button
          onClick={handleResetAll}
          className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition active:scale-95 z-10"
          title="ចាប់ផ្ដើមឡើងវិញ"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Progress Bar (Mobile responsive) */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xs border-2 border-amber-200 flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-600">
          បើករួច៖ <b className="text-amber-700">{openedBoxes.size} / {MYSTERY_BOXES.length}</b>
        </span>
        <div className="flex-1 max-w-[180px] bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${(openedBoxes.size / MYSTERY_BOXES.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 12 Boxes Grid (3 cols on small phones, 4 cols on tablet/desktop) */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-4">
        {MYSTERY_BOXES.map((box) => {
          const isOpened = openedBoxes.has(box.boxNumber);

          return (
            <div
              key={box.boxNumber}
              onClick={() => handleOpenBox(box)}
              className={`p-3 sm:p-5 rounded-2xl sm:rounded-3xl border-2 transition-all transform flex flex-col items-center justify-center cursor-pointer select-none ${
                isOpened
                  ? 'bg-slate-100 border-slate-200 opacity-60 cursor-default'
                  : 'bg-white border-amber-300 hover:border-amber-500 shadow-xs hover:shadow-md active:scale-95'
              }`}
            >
              <span className="text-3xl sm:text-5xl mb-1">{isOpened ? '✅' : box.icon}</span>
              <span className="text-sm sm:text-lg font-black text-slate-800">ទី {box.boxNumber}</span>
              <span className="text-[9px] sm:text-[11px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-full mt-0.5 truncate max-w-full">
                {box.category}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Question Modal */}
      {activeBox && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-4 sm:p-7 max-w-lg w-full shadow-2xl space-y-4 animate-pop text-center relative border-2 border-amber-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 rounded-full font-bold text-[11px] border border-amber-200">
                ប្រអប់ទី {activeBox.boxNumber} • {activeBox.category}
              </span>

              <div
                className={`flex items-center gap-1 font-bold text-xs sm:text-sm px-2.5 py-1 rounded-full ${
                  timeLeft <= 5 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5" /> {timeLeft} វិនាទី
              </div>
            </div>

            <h3 className="text-base sm:text-xl font-black text-slate-800 leading-snug">
              {activeBox.question}
            </h3>

            <KhmerDivider className="opacity-40" />

            {/* 4 Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              {activeBox.options.map((opt) => {
                const isSelected = selectedOption === opt;
                const isRight = opt === activeBox.answer;

                let style = 'bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 text-slate-800';
                if (selectedOption !== null) {
                  if (isRight) {
                    style = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-sm';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-500 border-2 border-rose-600 text-white';
                  } else {
                    style = 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt}
                    disabled={selectedOption !== null}
                    onClick={() => handleAnswer(opt)}
                    className={`p-3 sm:p-4 rounded-2xl font-black transition-all active:scale-95 text-center text-sm sm:text-base min-h-[46px] ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="pt-1 flex flex-col items-center gap-2">
                {isCorrect ? (
                  <p className="text-emerald-600 font-black text-sm flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> ចម្លើយត្រឹមត្រូវ! ទទួលបាន +៣ ផ្កាយ 🌟
                  </p>
                ) : (
                  <p className="text-rose-500 font-bold text-xs">
                    {selectedOption === '__TIMEOUT__'
                      ? `អស់ពេលហើយ! ចម្លើយត្រឹមត្រូវគឺ៖ ${activeBox.answer}`
                      : `មិនទាន់ត្រូវទេ! ចម្លើយត្រឹមត្រូវគឺ៖ ${activeBox.answer}`}
                  </p>
                )}

                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-slate-900 transition active:scale-95"
                >
                  បិទផ្ទាំងនេះ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
