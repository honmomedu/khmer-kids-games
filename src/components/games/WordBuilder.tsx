import React, { useState } from 'react';
import { KHMER_WORDS, WordItem } from '../../data/khmerWordBuilderData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { CheckCircle2, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react';
import { KhmerCorner, KhmerDivider } from '../ui/KhmerKbach';

interface Props {
  onAddStars: (amount: number) => void;
}

export const WordBuilder: React.FC<Props> = ({ onAddStars }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = KHMER_WORDS[wordIndex % KHMER_WORDS.length];

  const [availableParts, setAvailableParts] = useState<{ id: string; char: string }[]>(() => {
    return currentWord.parts
      .map((char, idx) => ({ id: `${char}-${idx}`, char }))
      .sort(() => 0.5 - Math.random());
  });

  const [placedParts, setPlacedParts] = useState<{ id: string; char: string }[]>([]);
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong'>('playing');
  const [showHint, setShowHint] = useState(false);

  const loadWord = (index: number) => {
    const nextWord = KHMER_WORDS[index % KHMER_WORDS.length];
    setWordIndex(index);
    setPlacedParts([]);
    setStatus('playing');
    setShowHint(false);
    setAvailableParts(
      nextWord.parts
        .map((char, idx) => ({ id: `${char}-${idx}`, char }))
        .sort(() => 0.5 - Math.random())
    );
  };

  const handlePickPart = (item: { id: string; char: string }) => {
    if (status === 'correct') return;
    sound.playPop();

    const newPlaced = [...placedParts, item];
    setPlacedParts(newPlaced);
    setAvailableParts(availableParts.filter((p) => p.id !== item.id));

    if (newPlaced.length === currentWord.parts.length) {
      const assembledWord = newPlaced.map((p) => p.char).join('');
      if (assembledWord === currentWord.parts.join('')) {
        setStatus('correct');
        sound.playFanfare();
        fireConfetti();
        onAddStars(3);
      } else {
        setStatus('wrong');
        sound.playWrong();
      }
    }
  };

  const handleRemovePart = (item: { id: string; char: string }) => {
    if (status === 'correct') return;
    sound.playClick();
    setPlacedParts(placedParts.filter((p) => p.id !== item.id));
    setAvailableParts([...availableParts, item]);
    setStatus('playing');
  };

  const handleResetCurrent = () => {
    sound.playClick();
    loadWord(wordIndex);
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
            🧩
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-800 leading-tight">
              ល្បែងផ្សំប្រកបពាក្យខ្មែរ
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">តម្រៀបតួអក្សរ និងស្រៈដើម្បីផ្គុំជាពាក្យត្រឹមត្រូវ</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 z-10">
          <button
            onClick={() => setShowHint(!showHint)}
            className="p-2 sm:p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold rounded-2xl border border-amber-300 transition active:scale-95"
            title="ជំនួយ"
          >
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleResetCurrent}
            className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl border border-slate-200 transition active:scale-95"
            title="រៀបចំឡើងវិញ"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Game Card */}
      <div className="relative bg-white rounded-3xl p-5 sm:p-8 shadow-lg border-2 border-emerald-200 text-center space-y-5 sm:space-y-6 overflow-hidden">
        <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-400">
          <span className="bg-slate-100 px-2.5 py-1 rounded-full text-slate-600">
            ពាក្យទី {wordIndex + 1} / {KHMER_WORDS.length}
          </span>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-[11px]">
            {currentWord.category}
          </span>
        </div>

        {/* Big Illustration */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-7xl sm:text-8xl mb-1 animate-float">
            {currentWord.emoji}
          </div>
          {showHint && (
            <p className="text-xs sm:text-sm font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 animate-fadeIn mt-2">
              💡 ជំនួយ៖ {currentWord.hint}
            </p>
          )}
        </div>

        <KhmerDivider className="opacity-40" />

        {/* Word Slots */}
        <div>
          <p className="text-[11px] sm:text-xs font-bold text-slate-400 mb-2">
            ចុចលើប្រអប់ដើម្បីដកតួអក្សរចេញវិញ
          </p>
          <div className="flex justify-center items-center gap-2 flex-wrap min-h-[64px] sm:min-h-[72px] p-2.5 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl">
            {placedParts.length === 0 ? (
              <span className="text-slate-400 text-xs sm:text-sm font-semibold">
                សូមជ្រើសរើសតួអក្សរនៅខាងក្រោម...
              </span>
            ) : (
              placedParts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleRemovePart(item)}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-emerald-600 text-white text-2xl sm:text-3xl font-black shadow-md hover:bg-rose-500 transition-transform active:scale-95 flex items-center justify-center border-2 border-emerald-500"
                >
                  {item.char}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Scrambled Pieces */}
        <div>
          <p className="text-xs font-bold text-slate-500 mb-2">
            តួអក្សរសម្រាប់ជ្រើសរើស៖
          </p>
          <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap">
            {availableParts.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePickPart(item)}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-300 text-emerald-800 text-2xl sm:text-3xl font-black shadow-sm transition transform active:scale-90 flex items-center justify-center"
              >
                {item.char}
              </button>
            ))}
          </div>
        </div>

        {/* Status result */}
        {status === 'correct' && (
          <div className="pt-2 flex flex-col items-center gap-2 animate-pop">
            <div className="text-emerald-600 font-black text-base sm:text-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> ត្រឹមត្រូវហើយ! « {currentWord.word} » 🌟 (+៣ ផ្កាយ)
            </div>
            <button
              onClick={() => {
                sound.playClick();
                loadWord(wordIndex + 1);
              }}
              className="mt-1 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition flex items-center gap-2 text-sm sm:text-base"
            >
              ពាក្យបន្ទាប់ <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}

        {status === 'wrong' && (
          <div className="pt-2 flex flex-col items-center gap-1.5 animate-pop">
            <p className="text-rose-500 font-bold text-xs sm:text-sm">
              មិនទាន់ត្រូវតាមលំដាប់ពាក្យទេ! សូមសាកល្បងម្ដងទៀត។
            </p>
            <button
              onClick={handleResetCurrent}
              className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition active:scale-95"
            >
              រៀបចំឡើងវិញ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
