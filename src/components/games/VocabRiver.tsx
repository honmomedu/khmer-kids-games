import React, { useState } from 'react';
import { VOCAB_QUESTIONS, VocabQuestion } from '../../data/khmerVocabRiverData';
import { sound } from '../../utils/audio';
import { fireBigConfetti } from '../../utils/confetti';
import { Sparkles, Trophy, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';

interface Props {
  onAddStars: (amount: number) => void;
}

export const VocabRiver: React.FC<Props> = ({ onAddStars }) => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0 to 5 steps across the river
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-3xl">
            🐸
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              ឆ្លងស្ទឹងរើសពាក្យផ្ទុយ & ន័យដូច
            </h2>
            <p className="text-xs text-slate-500">ជួយកូនកង្កែបលោតឆ្លងស្លឹកឈូកទៅត្រើយម្ខាង</p>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition"
          title="ចាប់ផ្ដើមឡើងវិញ"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* River Simulation Track */}
      <div className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 rounded-3xl p-6 shadow-lg text-white relative overflow-hidden">
        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-cyan-100 flex justify-between">
          <span>ច្រាំងចាប់ផ្ដើម 🏝️</span>
          <span>ចម្ងាយឆ្លងស្ទឹង៖ {progress} / 5 ស្លឹកឈូក</span>
          <span>ត្រើយសុវត្ថិភាព 🏰</span>
        </div>

        {/* River Track */}
        <div className="flex items-center justify-between relative py-6 px-4">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/30 -translate-y-1/2"></div>
          {[0, 1, 2, 3, 4, 5].map((step) => {
            const isCurrent = progress === step;
            const isPassed = progress > step;
            return (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                    isCurrent
                      ? 'bg-amber-300 ring-4 ring-white shadow-xl scale-125'
                      : isPassed
                      ? 'bg-emerald-400 text-white'
                      : 'bg-white/40 text-white/80'
                  }`}
                >
                  {isCurrent ? '🐸' : isPassed ? '🪷' : '🍃'}
                </div>
                <span className="text-[10px] mt-1 font-bold text-white/90">
                  {step === 0 ? 'ចាប់ផ្ដើម' : step === 5 ? 'ដល់ត្រើយ' : `ជំហាន ${step}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Winner Screen or Question Box */}
      {won ? (
        <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 text-center space-y-4 animate-pop">
          <div className="text-7xl mb-2">🎉🏆🐸</div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-800">
            អបអរសាទរ! កង្កែបឆ្លងស្ទឹងបានជោគជ័យហើយ!
          </h3>
          <p className="text-slate-600 max-w-md mx-auto">
            ប្អូនពូកែភាសាខ្មែរខ្លាំងណាស់ ឆ្លើយត្រូវគ្រប់សំណួរទាំងអស់! ទទួលបាន +៥ ផ្កាយបន្ថែម!
          </p>
          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold rounded-2xl shadow-lg hover:scale-105 transition"
          >
            លេងម្ដងទៀត 🔄
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-100 space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 font-bold text-xs rounded-full border border-cyan-200">
              {currentQ.type === 'antonym' ? '🔍 សំណួរពាក្យផ្ទុយ' : '📖 សំណួរពាក្យន័យដូច'}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-slate-800">
              {currentQ.question}
            </h3>
          </div>

          {/* 4 River Lily Pads (Options) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isRight = opt === currentQ.correctAnswer;

              let style = 'bg-slate-50 hover:bg-cyan-50 border-2 border-slate-200 text-slate-800';
              if (selectedOption !== null) {
                if (isRight) {
                  style = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-md scale-105';
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
                  className={`py-4 px-6 rounded-2xl text-lg md:text-xl font-black transition-all transform active:scale-95 shadow-sm flex items-center justify-between ${style}`}
                >
                  <span>🪷 {opt}</span>
                  {selectedOption !== null && isRight && <CheckCircle2 className="w-5 h-5 text-white" />}
                </button>
              );
            })}
          </div>

          {/* Result explanation & next */}
          {selectedOption !== null && (
            <div className="pt-2 flex flex-col items-center gap-3 text-center animate-fadeIn">
              <p className="text-sm font-semibold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200 max-w-md">
                💡 {currentQ.explanation}
              </p>

              <button
                onClick={handleNextQuestion}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold rounded-2xl shadow-lg hover:scale-105 transition flex items-center gap-2"
              >
                សំណួរបន្ទាប់ <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
