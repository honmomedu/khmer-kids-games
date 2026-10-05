import React, { useState } from 'react';
import { SHAPES_LIST, SHAPE_QUIZZES, ShapeInfo } from '../../data/shapesData';
import { sound } from '../../utils/audio';
import { fireConfetti } from '../../utils/confetti';
import { CheckCircle2, RotateCcw, Sparkles, Shapes, ArrowRight } from 'lucide-react';

interface Props {
  onAddStars: (amount: number) => void;
}

export const ShapeBuilder: React.FC<Props> = ({ onAddStars }) => {
  const [activeTab, setActiveTab] = useState<'explore' | 'quiz' | 'build'>('explore');
  const [selectedShape, setSelectedShape] = useState<ShapeInfo>(SHAPES_LIST[0]);

  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Build state (House assembly)
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-3xl">
            📐
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              ជាងសំណង់រូបធរណីមាត្រ
            </h2>
            <p className="text-xs text-slate-500">ស្គាល់ជ្រុង កំពូល និងផ្គុំបំណែកបង្កើតរូបរាង</p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs md:text-sm font-bold">
          <button
            onClick={() => { sound.playClick(); setActiveTab('explore'); }}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'explore' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            🔍 ស្វែងយល់
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('quiz'); }}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'quiz' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            ❓ សំណួរតេស្ត
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('build'); }}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'build' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            🏠 ផ្គុំផ្ទះ
          </button>
        </div>
      </div>

      {/* Tab 1: Explore */}
      {activeTab === 'explore' && (
        <div className="space-y-6">
          {/* Shape selector carousel */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {SHAPES_LIST.map((shape) => (
              <button
                key={shape.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedShape(shape);
                }}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center min-w-[100px] transition ${
                  selectedShape.id === shape.id
                    ? 'border-purple-600 bg-purple-50 shadow-md scale-105'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <span className="text-4xl mb-1">{shape.icon}</span>
                <span className="text-sm font-black text-slate-800">{shape.nameKhmer}</span>
              </button>
            ))}
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 text-center space-y-6">
            <div className="text-8xl animate-float">{selectedShape.icon}</div>
            <h3 className="text-3xl font-black text-slate-800">{selectedShape.nameKhmer}</h3>
            <p className="text-slate-600 max-w-md mx-auto text-base">
              {selectedShape.description}
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                <span className="block text-xs font-bold text-purple-600 uppercase">ចំនួនជ្រុង</span>
                <span className="text-3xl font-black text-purple-900">{selectedShape.sides}</span>
              </div>
              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200">
                <span className="block text-xs font-bold text-indigo-600 uppercase">ចំនួនកំពូល</span>
                <span className="text-3xl font-black text-indigo-900">{selectedShape.corners}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Quiz */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 space-y-6 text-center">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
            សំណួរទី {quizIdx + 1} / {SHAPE_QUIZZES.length}
          </span>
          <h3 className="text-2xl font-black text-slate-800">{currentQuiz.question}</h3>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4">
            {currentQuiz.options.map((opt) => {
              const isSelected = selectedOpt === opt;
              const isRight = opt === currentQuiz.answer;

              let style = 'bg-slate-50 hover:bg-purple-50 border-2 border-slate-200 text-slate-800';
              if (selectedOpt !== null) {
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
                  disabled={selectedOpt !== null}
                  onClick={() => handleSelectQuizOpt(opt)}
                  className={`py-4 px-6 rounded-2xl text-lg font-black transition-all active:scale-95 ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <div className="pt-4 flex flex-col items-center gap-3 animate-fadeIn">
              <p className="text-sm font-semibold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                💡 {currentQuiz.explanation}
              </p>
              <button
                onClick={handleNextQuiz}
                className="px-8 py-3 bg-purple-600 text-white font-extrabold rounded-2xl shadow-lg hover:scale-105 transition flex items-center gap-2"
              >
                សំណួរបន្ទាប់ <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: House Tangram Build */}
      {activeTab === 'build' && (
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 text-center space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-800">ផ្គុំរូបផ្ទះដោយប្រើរូបធរណីមាត្រ</h3>
            <p className="text-xs text-slate-500">
              ចុចលើប៊ូតុងខាងក្រោមដើម្បីដំឡើងផ្នែកនីមួយៗនៃផ្ទះ
            </p>
          </div>

          {/* Construction Blueprint Stage */}
          <div className="w-64 h-64 mx-auto bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 relative flex flex-col items-center justify-end p-4 overflow-hidden">
            {/* Roof (Triangle) */}
            <div
              className={`w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[60px] transition-all duration-500 ${
                builtParts.roof ? 'border-b-amber-500 scale-100 opacity-100' : 'border-b-slate-200 scale-90 opacity-40'
              }`}
            ></div>

            {/* House Body (Square) */}
            <div
              className={`w-32 h-28 flex items-end justify-center rounded-b-lg transition-all duration-500 ${
                builtParts.body ? 'bg-sky-500 shadow-md' : 'bg-slate-200 border-2 border-dashed border-slate-300'
              }`}
            >
              {/* Door (Rectangle) */}
              <div
                className={`w-10 h-16 rounded-t-md transition-all duration-500 ${
                  builtParts.door ? 'bg-amber-800 shadow-inner' : 'bg-slate-300 border border-dashed border-slate-400'
                }`}
              ></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => toggleBuildPart('roof')}
              className={`px-4 py-2.5 rounded-2xl font-bold text-sm border transition ${
                builtParts.roof ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              🔺 ដំបូលផ្ទះ (ត្រីកោណ)
            </button>
            <button
              onClick={() => toggleBuildPart('body')}
              className={`px-4 py-2.5 rounded-2xl font-bold text-sm border transition ${
                builtParts.body ? 'bg-sky-500 text-white border-sky-600' : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              🟦 ជញ្ជាំងផ្ទះ (ការ៉េ)
            </button>
            <button
              onClick={() => toggleBuildPart('door')}
              className={`px-4 py-2.5 rounded-2xl font-bold text-sm border transition ${
                builtParts.door ? 'bg-amber-800 text-white border-amber-900' : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              🚪 ទ្វារផ្ទះ (ចតុកោណកែង)
            </button>
          </div>

          {builtParts.roof && builtParts.body && builtParts.door && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-700 font-black animate-pop">
              🎉 ផ្ទះបានផ្គុំរួចរាល់ហើយ! ប្អូនជាវិស្វករដ៏ឆ្លាតវៃ! 🌟 (+៣ ផ្កាយ)
            </div>
          )}
        </div>
      )}
    </div>
  );
};
