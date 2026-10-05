import React, { useState } from 'react';
import { KHMER_WORDS, WordItem } from '../../data/khmerWordBuilderData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { CheckCircle2, RotateCcw, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface Props {
  onAddStars: (amount: number) => void;
}

export const WordBuilder: React.FC<Props> = ({ onAddStars }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = KHMER_WORDS[wordIndex % KHMER_WORDS.length];

  // Scrambled pieces available to pick
  const [availableParts, setAvailableParts] = useState<{ id: string; char: string }[]>(() => {
    return currentWord.parts
      .map((char, idx) => ({ id: `${char}-${idx}`, char }))
      .sort(() => 0.5 - Math.random());
  });

  // Placed pieces
  const [placedParts, setPlacedParts] = useState<{ id: string; char: string }[]>([]);
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong'>('playing');
  const [showHint, setShowHint] = useState(false);

  // Reset when word changes
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

    // If all parts placed, check result
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl">
            🧩
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              ល្បែងផ្សំប្រកបពាក្យខ្មែរ
            </h2>
            <p className="text-xs text-slate-500">តម្រៀបតួអក្សរ និងស្រៈដើម្បីផ្គុំជាពាក្យត្រឹមត្រូវ</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold rounded-2xl border border-amber-200 transition"
            title="ជំនួយ"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <button
            onClick={handleResetCurrent}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl border border-slate-200 transition"
            title="រៀបចំឡើងវិញ"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Game Card */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100 text-center space-y-8">
        <div className="flex justify-between items-center text-sm font-bold text-slate-400">
          <span>ពាក្យទី {wordIndex + 1} / {KHMER_WORDS.length}</span>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-xs">
            {currentWord.category}
          </span>
        </div>

        {/* Big Illustration */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-8xl mb-2 animate-float">
            {currentWord.emoji}
          </div>
          {showHint && (
            <p className="text-sm font-semibold text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200 animate-fadeIn">
              💡 ជំនួយ៖ {currentWord.hint}
            </p>
          )}
        </div>

        {/* Word Slots (Placed Pieces) */}
        <div>
          <p className="text-xs font-bold text-slate-400 mb-3">
            ចុចលើប្រអប់ដើម្បីដកតួអក្សរចេញវិញ
          </p>
          <div className="flex justify-center items-center gap-2 md:gap-3 flex-wrap min-h-[72px] p-3 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
            {placedParts.length === 0 ? (
              <span className="text-slate-400 text-sm font-semibold">
                សូមជ្រើសរើសតួអក្សរនៅខាងក្រោម...
              </span>
            ) : (
              placedParts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleRemovePart(item)}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-indigo-600 text-white text-2xl md:text-3xl font-black shadow-md hover:bg-rose-500 transition-transform active:scale-95 flex items-center justify-center"
                >
                  {item.char}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Scrambled Pieces */}
        <div>
          <p className="text-xs font-bold text-slate-500 mb-3">
            តួអក្សរសម្រាប់ជ្រើសរើស៖
          </p>
          <div className="flex justify-center items-center gap-3 flex-wrap">
            {availableParts.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePickPart(item)}
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white hover:bg-indigo-50 border-2 border-indigo-200 text-indigo-700 text-2xl md:text-3xl font-black shadow-sm hover:shadow-md transition transform hover:-translate-y-1 active:scale-95 flex items-center justify-center"
              >
                {item.char}
              </button>
            ))}
          </div>
        </div>

        {/* Status result */}
        {status === 'correct' && (
          <div className="pt-4 flex flex-col items-center gap-3 animate-pop">
            <div className="text-emerald-600 font-extrabold text-xl flex items-center gap-2">
              <CheckCircle2 className="w-7 h-7" /> ត្រឹមត្រូវហើយ! « {currentWord.word} » 🌟 (+៣ ផ្កាយ)
            </div>
            <button
              onClick={() => {
                sound.playClick();
                loadWord(wordIndex + 1);
              }}
              className="mt-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-emerald-300 hover:scale-105 transition flex items-center gap-2"
            >
              ពាក្យបន្ទាប់ <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {status === 'wrong' && (
          <div className="pt-4 flex flex-col items-center gap-2 animate-pop">
            <p className="text-rose-500 font-extrabold text-base">
              មិនទាន់ត្រូវតាមលំដាប់ពាក្យទេ! សូមសាកល្បងម្ដងទៀត។
            </p>
            <button
              onClick={handleResetCurrent}
              className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition"
            >
              រៀបចំឡើងវិញ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
