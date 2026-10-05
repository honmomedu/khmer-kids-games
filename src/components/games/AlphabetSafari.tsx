import React, { useState } from 'react';
import { KHMER_ALPHABET, KHMER_VOWELS, AlphabetItem } from '../../data/khmerAlphabetData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { CheckCircle2, RotateCcw, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { KhmerCorner, KhmerDivider } from '../ui/KhmerKbach';

interface Props {
  onAddStars: (amount: number) => void;
}

export const AlphabetSafari: React.FC<Props> = ({ onAddStars }) => {
  const [tab, setTab] = useState<'quiz' | 'grid' | 'vowels'>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const currentItem = KHMER_ALPHABET[currentIndex % KHMER_ALPHABET.length];

  const options = React.useMemo(() => {
    const distractors = KHMER_ALPHABET
      .filter((i) => i.char !== currentItem.char)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((i) => i.char);
    const all = [...distractors, currentItem.char].sort(() => 0.5 - Math.random());
    return all;
  }, [currentItem]);

  const handleSelectOption = (char: string) => {
    if (selectedChar !== null) return;
    setSelectedChar(char);

    if (char === currentItem.char) {
      setIsCorrect(true);
      sound.playCorrect();
      setScore((s) => s + 1);
      onAddStars(2);
      fireConfetti();
    } else {
      setIsCorrect(false);
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    setSelectedChar(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => (prev + 1) % KHMER_ALPHABET.length);
  };

  const handleSpeak = (text: string) => {
    sound.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'km-KH';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Game Header with Khmer Kbach Frame */}
      <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-md border-2 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-3 overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none">
          <KhmerCorner className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500/80" />
        </div>
        <div className="absolute top-0 right-0 pointer-events-none rotate-90">
          <KhmerCorner className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500/80" />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 z-10 w-full sm:w-auto">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0 border border-amber-300">
            🦁
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-800 leading-tight">
              ដំណើរផ្សងព្រេងព្យញ្ជនៈ & ស្រៈ
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">ស្គាល់ព្យញ្ជនៈខ្មែរ ៣៣ តួ និងស្រៈនិស្ស័យ</p>
          </div>
        </div>

        {/* Tab switch (Mobile-friendly pills) */}
        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold w-full md:w-auto justify-between sm:justify-start gap-1 z-10">
          <button
            onClick={() => { sound.playClick(); setTab('quiz'); }}
            className={`flex-1 sm:flex-initial px-3 py-2 rounded-xl transition ${
              tab === 'quiz' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            🎯 ផ្គូផ្គង
          </button>
          <button
            onClick={() => { sound.playClick(); setTab('grid'); }}
            className={`flex-1 sm:flex-initial px-3 py-2 rounded-xl transition ${
              tab === 'grid' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            🔤 ព្យញ្ជនៈ
          </button>
          <button
            onClick={() => { sound.playClick(); setTab('vowels'); }}
            className={`flex-1 sm:flex-initial px-3 py-2 rounded-xl transition ${
              tab === 'vowels' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            ✨ ស្រៈ
          </button>
        </div>
      </div>

      {/* Mode 1: Quiz */}
      {tab === 'quiz' && (
        <div className="relative bg-white rounded-3xl p-5 sm:p-8 shadow-lg border-2 border-amber-200 text-center space-y-4 sm:space-y-6 overflow-hidden">
          <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-500">
            <span className="bg-slate-100 px-2.5 py-1 rounded-full">
              សំណួរទី {currentIndex + 1} / {KHMER_ALPHABET.length}
            </span>
            <span className="text-amber-600 flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" /> ពិន្ទុ៖ {score}
            </span>
          </div>

          {/* Visual Target */}
          <div className="py-2 sm:py-4 flex flex-col items-center justify-center">
            <div className="text-7xl sm:text-8xl mb-2 animate-float drop-shadow-md">
              {currentItem.emoji}
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-800 tracking-wide">
              {currentItem.word}
            </p>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
              តើពាក្យនេះចាប់ផ្ដើមដោយព្យញ្ជនៈណា?
            </p>

            <button
              onClick={() => handleSpeak(currentItem.name)}
              className="mt-3 inline-flex items-center gap-1 px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded-full text-xs transition border border-amber-200 active:scale-95"
            >
              <Volume2 className="w-4 h-4" /> ស្ដាប់សំឡេង
            </button>
          </div>

          <KhmerDivider className="opacity-40" />

          {/* 4 Large Touch-Friendly Options */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
            {options.map((char) => {
              const isSelected = selectedChar === char;
              const isTheCorrectOne = char === currentItem.char;

              let btnStyle = 'bg-white hover:bg-amber-50 border-2 border-slate-200 text-slate-800 active:border-amber-400';
              if (selectedChar !== null) {
                if (isTheCorrectOne) {
                  btnStyle = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg scale-105';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500 border-2 border-rose-600 text-white';
                } else {
                  btnStyle = 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60';
                }
              }

              return (
                <button
                  key={char}
                  disabled={selectedChar !== null}
                  onClick={() => handleSelectOption(char)}
                  className={`py-4 sm:py-6 rounded-2xl text-4xl sm:text-5xl font-black transition-all transform active:scale-95 shadow-sm min-h-[72px] flex items-center justify-center ${btnStyle}`}
                >
                  {char}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {selectedChar !== null && (
            <div className="pt-2 sm:pt-4 flex flex-col items-center gap-2.5 animate-pop">
              {isCorrect ? (
                <div className="text-emerald-600 font-black text-sm sm:text-base flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" /> ត្រឹមត្រូវហើយ! អស្ចារ្យណាស់ 🌟 (+២ ផ្កាយ)
                </div>
              ) : (
                <div className="text-rose-500 font-bold text-xs sm:text-sm">
                  មិនទាន់ត្រូវទេ! ចម្លើយត្រឹមត្រូវគឺ « {currentItem.char} » ({currentItem.name})
                </div>
              )}

              <button
                onClick={handleNext}
                className="mt-1 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition flex items-center gap-2 text-sm sm:text-base"
              >
                សំណួរបន្ទាប់ <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: 33 Consonants Grid */}
      {tab === 'grid' && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border-2 border-amber-200">
          <div className="text-center mb-4">
            <h3 className="text-base sm:text-lg font-black text-slate-800">ព្យញ្ជនៈខ្មែរទាំង ៣៣ តួ (ក ដល់ អ)</h3>
            <p className="text-[11px] sm:text-xs text-slate-500">ចុចលើព្យញ្ជនៈនីមួយៗដើម្បីស្ដាប់ការបញ្ចេញសំឡេង</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2 sm:gap-3">
            {KHMER_ALPHABET.map((item) => (
              <button
                key={item.char}
                onClick={() => {
                  sound.playPop();
                  handleSpeak(item.name);
                }}
                className="p-2 sm:p-3 bg-gradient-to-b from-white to-amber-50/40 border-2 border-slate-200 hover:border-amber-400 rounded-2xl flex flex-col items-center justify-center transition active:scale-90"
              >
                <span className="text-xl sm:text-2xl">{item.emoji}</span>
                <span className="text-xl sm:text-2xl font-black text-slate-800 my-0.5">{item.char}</span>
                <span className="text-[10px] font-bold text-slate-500 text-center truncate w-full">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mode 3: Vowels Grid */}
      {tab === 'vowels' && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border-2 border-amber-200">
          <div className="text-center mb-4">
            <h3 className="text-base sm:text-lg font-black text-slate-800">ស្រៈនិស្ស័យខ្មែរ (២៣ តួ)</h3>
            <p className="text-[11px] sm:text-xs text-slate-500">ចុចដើម្បីរៀនអានស្រៈនីមួយៗ</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {KHMER_VOWELS.map((v) => (
              <button
                key={v.char}
                onClick={() => {
                  sound.playPop();
                  handleSpeak(v.name);
                }}
                className="p-3 bg-gradient-to-br from-amber-50 to-pink-50 border-2 border-amber-200 hover:border-amber-400 rounded-2xl flex flex-col items-center justify-center transition active:scale-95"
              >
                <span className="text-2xl sm:text-3xl font-black text-amber-800 my-1">{v.char}</span>
                <span className="text-xs font-bold text-slate-700">{v.name}</span>
                <span className="text-[10px] text-amber-600 mt-0.5">ឧទាហរណ៍៖ {v.example}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
