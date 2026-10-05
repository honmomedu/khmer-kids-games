import React, { useState } from 'react';
import { SHAPES_LIST, SHAPE_QUIZZES, ShapeInfo } from '../../data/shapesData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { ArrowRight } from 'lucide-react';
import { KhmerCorner, KhmerDivider } from '../ui/KhmerKbach';

interface Props {
  onAddStars: (amount: number) => void;
}

export const ShapeBuilder: React.FC<Props> = ({ onAddStars }) => {
  const [activeTab, setActiveTab] = useState<'explore' | 'quiz' | 'build'>('explore');
  const [selectedShape, setSelectedShape] = useState<ShapeInfo>(SHAPES_LIST[0]);

  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [builtParts, setBuiltParts] = useState<{ roof: boolean; body: boolean; door: boolean }>({
    roof: false,
    body: false,
    door: false,
  });

  const currentQuiz = SHAPE_QUIZZES[quizIdx % SHAPE_QUIZZES.length];

  const handleSelectQuizOpt = (opt: string) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(opt);

    if (opt === currentQuiz.answer) {
      setIsCorrect(true);
      sound.playCorrect();
      onAddStars(2);
      fireConfetti();
    } else {
      setIsCorrect(false);
      sound.playWrong();
    }
  };

  const handleNextQuiz = () => {
    sound.playClick();
    setSelectedOpt(null);
    setIsCorrect(null);
    setQuizIdx((prev) => (prev + 1) % SHAPE_QUIZZES.length);
  };

  const toggleBuildPart = (part: 'roof' | 'body' | 'door') => {
    sound.playPop();
    const updated = { ...builtParts, [part]: !builtParts[part] };
    setBuiltParts(updated);

    if (updated.roof && updated.body && updated.door) {
      sound.playFanfare();
      fireConfetti();
      onAddStars(3);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-md border-2 border-purple-300 flex flex-col sm:flex-row items-center justify-between gap-3 overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none">
          <KhmerCorner className="w-6 h-6 text-purple-500/70" />
        </div>
        <div className="absolute top-0 right-0 pointer-events-none rotate-90">
          <KhmerCorner className="w-6 h-6 text-purple-500/70" />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 z-10 w-full sm:w-auto">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl sm:text-3xl border border-purple-300 flex-shrink-0">
            📐
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-800 leading-tight">
              ជាងសំណង់រូបធរណីមាត្រ
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">ស្គាល់ជ្រុង កំពូល និងផ្គុំបំណែកបង្កើតរូបរាង</p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold w-full sm:w-auto justify-between sm:justify-start gap-1 z-10">
          <button
            onClick={() => { sound.playClick(); setActiveTab('explore'); }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl transition ${
              activeTab === 'explore' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            🔍 ស្វែងយល់
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('quiz'); }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl transition ${
              activeTab === 'quiz' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            ❓ សំណួរ
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('build'); }}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl transition ${
              activeTab === 'build' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            🏠 ផ្គុំផ្ទះ
          </button>
        </div>
      </div>

      {/* Tab 1: Explore */}
      {activeTab === 'explore' && (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
            {SHAPES_LIST.map((shape) => (
              <button
                key={shape.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedShape(shape);
                }}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center min-w-[85px] sm:min-w-[100px] transition active:scale-95 ${
                  selectedShape.id === shape.id
                    ? 'border-purple-600 bg-purple-50 shadow-md scale-102'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-3xl sm:text-4xl mb-0.5">{shape.icon}</span>
                <span className="text-xs sm:text-sm font-black text-slate-800">{shape.nameKhmer}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border-2 border-purple-200 text-center space-y-4">
            <div className="text-7xl sm:text-8xl animate-float">{selectedShape.icon}</div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">{selectedShape.nameKhmer}</h3>
            <p className="text-xs sm:text-base text-slate-600 max-w-md mx-auto">
              {selectedShape.description}
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto pt-2">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
                <span className="block text-[10px] font-bold text-purple-600 uppercase">ចំនួនជ្រុង</span>
                <span className="text-2xl sm:text-3xl font-black text-purple-900">{selectedShape.sides}</span>
              </div>
              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
                <span className="block text-[10px] font-bold text-indigo-600 uppercase">ចំនួនកំពូល</span>
                <span className="text-2xl sm:text-3xl font-black text-indigo-900">{selectedShape.corners}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Quiz */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border-2 border-purple-200 space-y-4 text-center">
          <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            សំណួរទី {quizIdx + 1} / {SHAPE_QUIZZES.length}
          </span>
          <h3 className="text-lg sm:text-2xl font-black text-slate-800">{currentQuiz.question}</h3>

          <KhmerDivider className="opacity-40" />

          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-md mx-auto pt-2">
            {currentQuiz.options.map((opt) => {
              const isSelected = selectedOpt === opt;
              const isRight = opt === currentQuiz.answer;

              let style = 'bg-slate-50 hover:bg-purple-50 border-2 border-slate-200 text-slate-800';
              if (selectedOpt !== null) {
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
                  disabled={selectedOpt !== null}
                  onClick={() => handleSelectQuizOpt(opt)}
                  className={`py-3.5 px-4 rounded-2xl text-base sm:text-lg font-black transition-all active:scale-95 min-h-[50px] ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <div className="pt-2 flex flex-col items-center gap-2 animate-fadeIn">
              <p className="text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                💡 {currentQuiz.explanation}
              </p>
              <button
                onClick={handleNextQuiz}
                className="px-8 py-3 bg-purple-600 text-white font-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition flex items-center gap-2 text-sm sm:text-base"
              >
                សំណួរបន្ទាប់ <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: House Tangram Build */}
      {activeTab === 'build' && (
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border-2 border-purple-200 text-center space-y-5">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-800">ផ្គុំរូបផ្ទះដោយប្រើរូបធរណីមាត្រ</h3>
            <p className="text-[11px] sm:text-xs text-slate-500">
              ចុចលើប៊ូតុងខាងក្រោមដើម្បីដំឡើងផ្នែកនីមួយៗ
            </p>
          </div>

          <div className="w-56 h-56 sm:w-64 sm:h-64 mx-auto bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 relative flex flex-col items-center justify-end p-4 overflow-hidden">
            {/* Roof */}
            <div
              className={`w-0 h-0 border-l-[50px] sm:border-l-[60px] border-l-transparent border-r-[50px] sm:border-r-[60px] border-r-transparent border-b-[50px] sm:border-b-[60px] transition-all duration-500 ${
                builtParts.roof ? 'border-b-amber-500 scale-100 opacity-100' : 'border-b-slate-200 scale-90 opacity-40'
              }`}
            ></div>

            {/* Body */}
            <div
              className={`w-28 h-24 sm:w-32 sm:h-28 flex items-end justify-center rounded-b-lg transition-all duration-500 ${
                builtParts.body ? 'bg-sky-500 shadow-md' : 'bg-slate-200 border-2 border-dashed border-slate-300'
              }`}
            >
              {/* Door */}
              <div
                className={`w-9 h-14 sm:w-10 sm:h-16 rounded-t-md transition-all duration-500 ${
                  builtParts.door ? 'bg-amber-800 shadow-inner' : 'bg-slate-300 border border-dashed border-slate-400'
                }`}
              ></div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => toggleBuildPart('roof')}
              className={`px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm border transition active:scale-95 ${
                builtParts.roof ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              🔺 ដំបូល (ត្រីកោណ)
            </button>
            <button
              onClick={() => toggleBuildPart('body')}
              className={`px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm border transition active:scale-95 ${
                builtParts.body ? 'bg-sky-500 text-white border-sky-600' : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              🟦 ជញ្ជាំង (ការ៉េ)
            </button>
            <button
              onClick={() => toggleBuildPart('door')}
              className={`px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm border transition active:scale-95 ${
                builtParts.door ? 'bg-amber-800 text-white border-amber-900' : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              🚪 ទ្វារ (ចតុកោណកែង)
            </button>
          </div>

          {builtParts.roof && builtParts.body && builtParts.door && (
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-700 font-black animate-pop text-xs sm:text-sm">
              🎉 ផ្ទះបានផ្គុំរួចរាល់ហើយ! ប្អូនជាវិស្វករដ៏ឆ្លាតវៃ! 🌟 (+៣ ផ្កាយ)
            </div>
          )}
        </div>
      )}
    </div>
  );
};
