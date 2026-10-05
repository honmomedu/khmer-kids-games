import React, { useState } from 'react';
import { VOCAB_QUESTIONS, VocabQuestion } from '../../data/khmerVocabRiverData';
import { sound } from '../../utils/audio';
import { fireBigConfetti } from '../../utils/confetti';
import { RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';
import { KhmerCorner, KhmerDivider } from '../ui/KhmerKbach';

interface Props {
  onAddStars: (amount: number) => void;
}

export const VocabRiver: React.FC<Props> = ({ onAddStars }) => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [won, setWon] = useState(false);

  const currentQ = VOCAB_QUESTIONS[questionIdx % VOCAB_QUESTIONS.length];

  const handleSelectAnswer = (option: string) => {
    if (selectedOption !== null || won) return;
    setSelectedOption(option);

    if (option === currentQ.correctAnswer) {
      setIsCorrect(true);
      sound.playCorrect();
      const newProgress = progress + 1;
      setProgress(newProgress);
      onAddStars(2);

      if (newProgress >= 5) {
        setWon(true);
        sound.playFanfare();
        fireBigConfetti();
        onAddStars(5);
      }
    } else {
      setIsCorrect(false);
      sound.playWrong();
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsCorrect(null);
    setQuestionIdx((prev) => (prev + 1) % VOCAB_QUESTIONS.length);
  };

  const handleRestart = () => {
    sound.playClick();
    setProgress(0);
    setWon(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setQuestionIdx(0);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-md border-2 border-cyan-300 flex items-center justify-between overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none">
          <KhmerCorner className="w-6 h-6 text-cyan-500/70" />
        </div>
        <div className="absolute top-0 right-0 pointer-events-none rotate-90">
          <KhmerCorner className="w-6 h-6 text-cyan-500/70" />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 z-10">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-2xl sm:text-3xl border border-cyan-300">
            🐸
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-800 leading-tight">
              ឆ្លងស្ទឹងរើសពាក្យផ្ទុយ & ន័យដូច
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">ជួយកូនកង្កែបលោតឆ្លងស្លឹកឈូកទៅត្រើយម្ខាង</p>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition active:scale-95 z-10"
          title="ចាប់ផ្ដើមឡើងវិញ"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* River Simulation Track (Mobile responsive) */}
      <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 rounded-3xl p-4 sm:p-6 shadow-lg text-white relative overflow-hidden border-2 border-cyan-300">
        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 text-cyan-100 flex justify-between">
          <span>🏝️ ចាប់ផ្ដើម</span>
          <span>ឆ្លងបាន {progress} / 5</span>
          <span>🏰 ដល់ត្រើយ</span>
        </div>

        <div className="flex items-center justify-between relative py-4 sm:py-6 px-1 sm:px-4">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/30 -translate-y-1/2"></div>
          {[0, 1, 2, 3, 4, 5].map((step) => {
            const isCurrent = progress === step;
            const isPassed = progress > step;
            return (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-xl font-bold transition-all duration-300 ${
                    isCurrent
                      ? 'bg-amber-300 ring-4 ring-white shadow-xl scale-110 sm:scale-125'
                      : isPassed
                      ? 'bg-emerald-400 text-white'
                      : 'bg-white/40 text-white/80'
                  }`}
                >
                  {isCurrent ? '🐸' : isPassed ? '🪷' : '🍃'}
                </div>
                <span className="text-[9px] sm:text-[10px] mt-1 font-bold text-white/90">
                  {step === 0 ? 'ដើម' : step === 5 ? 'ត្រើយ' : `${step}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Winner Screen or Question Box */}
      {won ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-2 border-emerald-300 text-center space-y-4 animate-pop">
          <div className="text-6xl sm:text-7xl mb-1">🎉🏆🐸</div>
          <h3 className="text-xl sm:text-3xl font-black text-slate-800">
            អបអរសាទរ! កង្កែបឆ្លងស្ទឹងបានជោគជ័យហើយ!
          </h3>
          <p className="text-xs sm:text-base text-slate-600 max-w-md mx-auto">
            ប្អូនពូកែភាសាខ្មែរខ្លាំងណាស់ ឆ្លើយត្រូវគ្រប់សំណួរទាំងអស់! ទទួលបាន +៥ ផ្កាយបន្ថែម!
          </p>
          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition text-sm sm:text-base"
          >
            លេងម្ដងទៀត 🔄
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-4 sm:p-7 shadow-lg border-2 border-cyan-200 space-y-4 sm:space-y-6">
          <div className="text-center space-y-1.5">
            <span className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 font-bold text-xs rounded-full border border-cyan-200">
              {currentQ.type === 'antonym' ? '🔍 សំណួរពាក្យផ្ទុយ' : '📖 សំណួរពាក្យន័យដូច'}
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-slate-800">
              {currentQ.question}
            </h3>
          </div>

          <KhmerDivider className="opacity-40" />

          {/* 4 River Lily Pads (Options) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 max-w-xl mx-auto">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isRight = opt === currentQ.correctAnswer;

              let style = 'bg-slate-50 hover:bg-cyan-50 border-2 border-slate-200 text-slate-800';
              if (selectedOption !== null) {
                if (isRight) {
                  style = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-md scale-102';
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
                  onClick={() => handleSelectAnswer(opt)}
                  className={`py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl text-base sm:text-xl font-black transition-all transform active:scale-95 shadow-sm flex items-center justify-between min-h-[52px] ${style}`}
                >
                  <span>🪷 {opt}</span>
                  {selectedOption !== null && isRight && <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="pt-1 flex flex-col items-center gap-2.5 text-center animate-fadeIn">
              <p className="text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 max-w-md">
                💡 {currentQ.explanation}
              </p>

              <button
                onClick={handleNextQuestion}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition flex items-center gap-2 text-sm sm:text-base"
              >
                សំណួរបន្ទាប់ <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
