import React, { useState } from 'react';
import { KHMER_ALPHABET, KHMER_VOWELS, AlphabetItem } from '../../data/khmerAlphabetData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { CheckCircle2, RotateCcw, Volume2, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  onAddStars: (amount: number) => void;
}

export const AlphabetSafari: React.FC<Props> = ({ onAddStars }) => {
  const [tab, setTab] = useState<'quiz' | 'grid' | 'vowels'>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  // Generate question
  const currentItem = KHMER_ALPHABET[currentIndex % KHMER_ALPHABET.length];

  // Pick 4 options including correct
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
    if (selectedChar !== null) return; // prevent spam
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game Header */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl">
            🦁
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              ដំណើរផ្សងព្រេងព្យញ្ជនៈ & ស្រៈ
            </h2>
            <p className="text-xs text-slate-500">ស្គាល់ព្យញ្ជនៈខ្មែរ ៣៣ តួ និងស្រៈនិស្ស័យ</p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs md:text-sm font-bold">
          <button
            onClick={() => { sound.playClick(); setTab('quiz'); }}
            className={`px-4 py-2 rounded-xl transition ${
              tab === 'quiz' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            🎯 ផ្គូផ្គងរូបភាព
          </button>
          <button
            onClick={() => { sound.playClick(); setTab('grid'); }}
            className={`px-4 py-2 rounded-xl transition ${
              tab === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            🔤 ព្យញ្ជនៈ ៣៣
          </button>
          <button
            onClick={() => { sound.playClick(); setTab('vowels'); }}
            className={`px-4 py-2 rounded-xl transition ${
              tab === 'vowels' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            ✨ ស្រៈនិស្ស័យ
          </button>
        </div>
      </div>

      {/* Mode 1: Quiz */}
      {tab === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100 text-center space-y-6">
          <div className="flex justify-between items-center text-sm font-bold text-slate-500">
            <span>សំណួរទី {currentIndex + 1} / {KHMER_ALPHABET.length}</span>
            <span className="text-amber-600 flex items-center gap-1">
              <Sparkles className="w-4 h-4 fill-amber-400" /> ពិន្ទុ៖ {score}
            </span>
          </div>

          {/* Visual Target */}
          <div className="py-6 flex flex-col items-center justify-center">
            <div className="text-8xl mb-3 animate-float drop-shadow-md">
              {currentItem.emoji}
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-800 tracking-wide">
              {currentItem.word}
            </p>
            <p className="text-sm font-medium text-slate-500 mt-1">
              តើពាក្យនេះចាប់ផ្ដើមដោយព្យញ្ជនៈណា?
            </p>

            <button
              onClick={() => handleSpeak(currentItem.name)}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold rounded-full text-xs transition"
            >
              <Volume2 className="w-4 h-4" /> ស្ដាប់សំឡេង
            </button>
          </div>

          {/* 4 Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
            {options.map((char) => {
              const isSelected = selectedChar === char;
              const isTheCorrectOne = char === currentItem.char;

              let btnStyle = 'bg-white hover:bg-indigo-50 border-2 border-slate-200 text-slate-800';
              if (selectedChar !== null) {
                if (isTheCorrectOne) {
                  btnStyle = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg scale-105 animate-pulseGlow';
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
                  className={`py-6 rounded-3xl text-4xl md:text-5xl font-black transition-all transform active:scale-95 shadow-sm ${btnStyle}`}
                >
                  {char}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {selectedChar !== null && (
            <div className="pt-4 flex flex-col items-center gap-3">
              {isCorrect ? (
                <div className="text-emerald-600 font-extrabold text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" /> ត្រឹមត្រូវហើយ! អស្ចារ្យណាស់ 🌟 (+២ ផ្កាយ)
                </div>
              ) : (
                <div className="text-rose-500 font-extrabold text-base">
                  មិនទាន់ត្រូវទេ! ចម្លើយត្រឹមត្រូវគឺ « {currentItem.char} » ({currentItem.name})
                </div>
              )}

              <button
                onClick={handleNext}
                className="mt-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-indigo-300 hover:scale-105 transition"
              >
                សំណួរបន្ទាប់ ➡️
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: 33 Consonants Grid */}
      {tab === 'grid' && (
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
          <div className="text-center mb-6">
            <h3 className="text-lg font-black text-slate-800">ព្យញ្ជនៈខ្មែរទាំង ៣៣ តួ (ក ដល់ អ)</h3>
            <p className="text-xs text-slate-500">ចុចលើព្យញ្ជនៈនីមួយៗដើម្បីស្ដាប់ការបញ្ចេញសំឡេង</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
            {KHMER_ALPHABET.map((item) => (
              <button
                key={item.char}
                onClick={() => {
                  sound.playPop();
                  handleSpeak(item.name);
                }}
                className="p-3 bg-gradient-to-b from-white to-slate-50 border-2 border-slate-200 hover:border-amber-400 hover:shadow-md rounded-2xl flex flex-col items-center justify-center transition group active:scale-95"
              >
                <span className="text-2xl group-hover:scale-125 transition">{item.emoji}</span>
                <span className="text-2xl font-black text-slate-800 my-1">{item.char}</span>
                <span className="text-[11px] font-bold text-slate-500 text-center">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mode 3: Vowels Grid */}
      {tab === 'vowels' && (
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
          <div className="text-center mb-6">
            <h3 className="text-lg font-black text-slate-800">ស្រៈនិស្ស័យខ្មែរ (២៣ តួ)</h3>
            <p className="text-xs text-slate-500">ចុចដើម្បីរៀនអានស្រៈនីមួយៗ</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {KHMER_VOWELS.map((v) => (
              <button
                key={v.char}
                onClick={() => {
                  sound.playPop();
                  handleSpeak(v.name);
                }}
                className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-purple-200 hover:border-purple-400 hover:shadow-md rounded-2xl flex flex-col items-center justify-center transition active:scale-95"
              >
                <span className="text-3xl font-black text-purple-700 my-1">{v.char}</span>
                <span className="text-xs font-bold text-slate-700">{v.name}</span>
                <span className="text-[10px] text-purple-500 mt-1">ឧទាហរណ៍៖ {v.example}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
