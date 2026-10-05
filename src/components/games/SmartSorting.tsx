import React, { useState } from 'react';
import { SORT_LEVELS, SortLevel, SortItem } from '../../data/sortingData';
import { sound } from '../../utils/audio';
import { fireBigConfetti } from '../../utils/confetti';
import { RotateCcw, ArrowRight } from 'lucide-react';
import { KhmerCorner, KhmerDivider } from '../ui/KhmerKbach';

interface Props {
  onAddStars: (amount: number) => void;
}

export const SmartSorting: React.FC<Props> = ({ onAddStars }) => {
  const [levelIdx, setLevelIdx] = useState(0);
  const currentLevel = SORT_LEVELS[levelIdx % SORT_LEVELS.length];

  const [remainingItems, setRemainingItems] = useState<SortItem[]>(currentLevel.items);
  const [basketAItems, setBasketAItems] = useState<SortItem[]>([]);
  const [basketBItems, setBasketBItems] = useState<SortItem[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const currentItem = remainingItems[0] || null;

  const handleSortInto = (targetCategory: string) => {
    if (!currentItem) return;

    if (currentItem.category === targetCategory) {
      sound.playCorrect();
      onAddStars(2);
      setStatusMessage('ត្រឹមត្រូវហើយ! 👍');

      if (targetCategory === currentLevel.categoryA.id) {
        setBasketAItems([...basketAItems, currentItem]);
      } else {
        setBasketBItems([...basketBItems, currentItem]);
      }

      const nextRemaining = remainingItems.slice(1);
      setRemainingItems(nextRemaining);

      if (nextRemaining.length === 0) {
        sound.playFanfare();
        fireBigConfetti();
        onAddStars(5);
        setStatusMessage('អបអរសាទរ! បានបញ្ចប់កម្រិតនេះជោគជ័យ! 🎉');
      }
    } else {
      sound.playWrong();
      setStatusMessage('មិនទាន់ត្រឹមត្រូវទេ! សូមពិនិត្យមើលម្ដងទៀត 🤔');
    }
  };

  const handleNextLevel = () => {
    sound.playClick();
    const nextIdx = (levelIdx + 1) % SORT_LEVELS.length;
    setLevelIdx(nextIdx);
    setRemainingItems(SORT_LEVELS[nextIdx].items);
    setBasketAItems([]);
    setBasketBItems([]);
    setStatusMessage(null);
  };

  const handleRestartCurrent = () => {
    sound.playClick();
    setRemainingItems(currentLevel.items);
    setBasketAItems([]);
    setBasketBItems([]);
    setStatusMessage(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-md border-2 border-sky-300 flex items-center justify-between overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none">
          <KhmerCorner className="w-6 h-6 text-sky-500/70" />
        </div>
        <div className="absolute top-0 right-0 pointer-events-none rotate-90">
          <KhmerCorner className="w-6 h-6 text-sky-500/70" />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 z-10">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl sm:text-3xl border border-sky-300 flex-shrink-0">
            📦
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-800 leading-tight">
              ល្បែងចាត់ថ្នាក់ និងបែងចែកក្រុម
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">{currentLevel.title}</p>
          </div>
        </div>

        <button
          onClick={handleRestartCurrent}
          className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition active:scale-95 z-10"
          title="ចាប់ផ្ដើមឡើងវិញ"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Main Sorting Arena */}
      <div className="relative bg-white rounded-3xl p-4 sm:p-7 shadow-lg border-2 border-sky-200 text-center space-y-4 sm:space-y-6 overflow-hidden">
        {currentItem ? (
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-50 rounded-3xl border border-slate-200">
            <span className="text-[10px] sm:text-xs uppercase font-extrabold text-slate-400 mb-1">
              វត្ថុត្រូវចាត់ថ្នាក់ (នៅសល់ {remainingItems.length})
            </span>
            <div className="text-7xl sm:text-8xl my-1 animate-float">
              {currentItem.emoji}
            </div>
            <span className="text-xl sm:text-2xl font-black text-slate-800">
              « {currentItem.name} »
            </span>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
              តើវត្ថុនេះស្ថិតក្នុងក្រុមណា? សូមចុចលើធុងខាងក្រោម៖
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 bg-emerald-50 rounded-3xl border border-emerald-200 text-center space-y-3 animate-pop">
            <div className="text-6xl sm:text-7xl">🏆🌟🎉</div>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-800">
              អស្ចារ្យណាស់! ចាត់ថ្នាក់បានត្រឹមត្រូវទាំងអស់!
            </h3>
            <button
              onClick={handleNextLevel}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              កម្រិតបន្ទាប់ <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}

        {statusMessage && (
          <p className="text-xs sm:text-sm font-extrabold text-sky-700 animate-fadeIn bg-sky-50 py-1.5 px-3 rounded-full inline-block border border-sky-200">
            {statusMessage}
          </p>
        )}

        <KhmerDivider className="opacity-40" />

        {/* 2 Baskets / Categories (Big thumb-friendly touch pads on mobile) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {/* Basket A */}
          <button
            disabled={!currentItem}
            onClick={() => handleSortInto(currentLevel.categoryA.id)}
            className="p-3.5 sm:p-6 rounded-3xl border-2 border-dashed border-amber-400 bg-gradient-to-b from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-all transform active:scale-95 shadow-xs text-center flex flex-col items-center justify-between min-h-[160px] sm:min-h-[190px]"
          >
            <div>
              <span className="text-3xl sm:text-4xl">{currentLevel.categoryA.icon}</span>
              <h4 className="text-xs sm:text-lg font-black text-amber-900 mt-1 leading-tight">
                {currentLevel.categoryA.name}
              </h4>
            </div>

            <div className="flex gap-1 flex-wrap justify-center mt-2">
              {basketAItems.map((it) => (
                <span key={it.id} className="text-lg sm:text-2xl p-1 bg-white rounded-xl shadow-2xs">
                  {it.emoji}
                </span>
              ))}
              {basketAItems.length === 0 && (
                <span className="text-[10px] sm:text-xs text-amber-700/60 font-semibold">ទទេ</span>
              )}
            </div>
          </button>

          {/* Basket B */}
          <button
            disabled={!currentItem}
            onClick={() => handleSortInto(currentLevel.categoryB.id)}
            className="p-3.5 sm:p-6 rounded-3xl border-2 border-dashed border-sky-400 bg-gradient-to-b from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 transition-all transform active:scale-95 shadow-xs text-center flex flex-col items-center justify-between min-h-[160px] sm:min-h-[190px]"
          >
            <div>
              <span className="text-3xl sm:text-4xl">{currentLevel.categoryB.icon}</span>
              <h4 className="text-xs sm:text-lg font-black text-sky-900 mt-1 leading-tight">
                {currentLevel.categoryB.name}
              </h4>
            </div>

            <div className="flex gap-1 flex-wrap justify-center mt-2">
              {basketBItems.map((it) => (
                <span key={it.id} className="text-lg sm:text-2xl p-1 bg-white rounded-xl shadow-2xs">
                  {it.emoji}
                </span>
              ))}
              {basketBItems.length === 0 && (
                <span className="text-[10px] sm:text-xs text-sky-700/60 font-semibold">ទទេ</span>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
