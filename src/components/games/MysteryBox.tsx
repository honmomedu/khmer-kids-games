import React, { useState, useEffect } from 'react';
import { MYSTERY_BOXES, MysteryBoxQuestion } from '../../data/mysteryBoxData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { CheckCircle2, RotateCcw, Clock, Sparkles } from 'lucide-react';

interface Props {
  onAddStars: (amount: number) => void;
}

export const MysteryBox: React.FC<Props> = ({ onAddStars }) => {
  const [openedBoxes, setOpenedBoxes] = useState<Set<number>>(new Set());
  const [activeBox, setActiveBox] = useState<MysteryBoxQuestion | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Timer countdown
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl">
            🎁
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              ប្រអប់អាថ៌កំបាំងសំណួររហ័ស
            </h2>
            <p className="text-xs text-slate-500">បើកប្រអប់លេខ ១ ដល់ ១២ ដើម្បីឆ្លើយសំណួរប្រជែងពេលវេលា</p>
          </div>
        </div>

        <button
          onClick={handleResetAll}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition"
          title="ចាប់ផ្ដើមឡើងវិញ"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">
          ប្រអប់ដែលបានបើករួច៖ <b className="text-amber-600">{openedBoxes.size} / {MYSTERY_BOXES.length}</b>
        </span>
        <div className="w-48 bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(openedBoxes.size / MYSTERY_BOXES.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 12 Boxes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {MYSTERY_BOXES.map((box) => {
          const isOpened = openedBoxes.has(box.boxNumber);

          return (
            <div
              key={box.boxNumber}
              onClick={() => handleOpenBox(box)}
              className={`p-6 rounded-3xl border-2 transition-all transform flex flex-col items-center justify-center cursor-pointer ${
                isOpened
                  ? 'bg-slate-100 border-slate-200 opacity-60 cursor-default'
                  : 'bg-white border-amber-300 hover:border-amber-500 hover:shadow-xl hover:-translate-y-1.5 active:scale-95'
              }`}
            >
              <span className="text-5xl mb-2 animate-bounceSlow">{isOpened ? '✅' : box.icon}</span>
              <span className="text-xl font-black text-slate-800">ប្រអប់ទី {box.boxNumber}</span>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mt-1">
                {box.category}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Question Modal */}
      {activeBox && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-pop text-center relative">
            {/* Header of Modal */}
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full font-bold text-xs">
                ប្រអប់ទី {activeBox.boxNumber} • {activeBox.category}
              </span>

              {/* Timer Pill */}
              <div
                className={`flex items-center gap-1 font-bold text-sm px-3 py-1 rounded-full ${
                  timeLeft <= 5 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'
                }`}
              >
                <Clock className="w-4 h-4" /> {timeLeft} វិនាទី
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-xl md:text-2xl font-black text-slate-800">
              {activeBox.question}
            </h3>

            {/* 4 Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {activeBox.options.map((opt) => {
                const isSelected = selectedOption === opt;
                const isRight = opt === activeBox.answer;

                let style = 'bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 text-slate-800';
                if (selectedOption !== null) {
                  if (isRight) {
                    style = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-md';
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
                    className={`p-4 rounded-2xl font-black transition-all active:scale-95 text-center text-lg ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Result & Close button */}
            {selectedOption !== null && (
              <div className="pt-2 flex flex-col items-center gap-3">
                {isCorrect ? (
                  <p className="text-emerald-600 font-black text-base flex items-center gap-1">
                    <CheckCircle2 className="w-5 h-5" /> ចម្លើយត្រឹមត្រូវ! ទទួលបាន +៣ ផ្កាយ 🌟
                  </p>
                ) : (
                  <p className="text-rose-500 font-bold text-sm">
                    {selectedOption === '__TIMEOUT__'
                      ? `អស់ពេលហើយ! ចម្លើយត្រឹមត្រូវគឺ៖ ${activeBox.answer}`
                      : `មិនទាន់ត្រូវទេ! ចម្លើយត្រឹមត្រូវគឺ៖ ${activeBox.answer}`}
                  </p>
                )}

                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-slate-900 transition"
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
