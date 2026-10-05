import React, { useState, useRef, useEffect } from 'react';
import { DEFAULT_WHEEL_SLICES, WHEEL_QUESTIONS, WheelSlice, WheelQuestion } from '../../data/luckyWheelData';
import { sound } from '../../utils/audio';
import { fireBigConfetti, fireConfetti } from '../../utils/confetti';
import { Play, Sparkles, RotateCw, Users } from 'lucide-react';
import { KhmerCorner, KhmerDivider } from '../ui/KhmerKbach';

interface Props {
  onAddStars: (amount: number) => void;
}

export const LuckyWheel: React.FC<Props> = ({ onAddStars }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSlice, setSelectedSlice] = useState<WheelSlice | null>(null);
  const [questionModal, setQuestionModal] = useState<WheelQuestion | null>(null);
  const [taskModal, setTaskModal] = useState<string | null>(null);
  const [bonusModal, setBonusModal] = useState<number | null>(null);

  const [isClassMode, setIsClassMode] = useState(false);
  const [students, setStudents] = useState<string[]>([
    'ចរិយា', 'សុខា', 'វិចិត្រ', 'កល្យាណ', 'សុវណ្ណ', 'រចនា', 'ដារ៉ូ', 'ធីតា'
  ]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentSlices = isClassMode
    ? students.map((name, i) => ({
        label: name,
        type: 'student' as const,
        color: ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6', '#06b6d4', '#eab308', '#f97316'][i % 8],
      }))
    : DEFAULT_WHEEL_SLICES;

  // Draw the Wheel on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numSlices = currentSlices.length;
    const sliceAngle = (2 * Math.PI) / numSlices;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = centerX - 12;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Outer golden Khmer ornamental rim
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.stroke();

    currentSlices.forEach((slice, idx) => {
      const angle = idx * sliceAngle;
      ctx.beginPath();
      ctx.fillStyle = slice.color;
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + sliceAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // Border line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text label
      ctx.save();
      ctx.translate(centerX, centerY);
      const midAngle = angle + sliceAngle / 2;
      ctx.rotate(midAngle);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px "Kantumruy Pro", sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;
      ctx.textBaseline = 'middle';

      if (midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2) {
        ctx.rotate(Math.PI);
        ctx.textAlign = 'left';
        ctx.fillText(slice.label, -(radius - 22), 0);
      } else {
        ctx.textAlign = 'right';
        ctx.fillText(slice.label, radius - 22, 0);
      }
      ctx.restore();
    });

    // Center Golden Peg
    ctx.beginPath();
    ctx.arc(centerX, centerY, 22, 0, 2 * Math.PI);
    ctx.fillStyle = '#fef3c7';
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Central jewel
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#d97706';
    ctx.fill();
  }, [currentSlices, isClassMode]);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedSlice(null);
    setQuestionModal(null);
    setTaskModal(null);
    setBonusModal(null);
    setSelectedStudent(null);

    sound.playClick();

    const fullRotations = 5 + Math.floor(Math.random() * 4);
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalAddedRotation = fullRotations * 360 + extraDegrees;
    const newRotation = rotation + totalAddedRotation;
    setRotation(newRotation);

    let tickCount = 0;
    const tickInterval = setInterval(() => {
      sound.playTick();
      tickCount++;
      if (tickCount > 24) clearInterval(tickInterval);
    }, 120);

    setTimeout(() => {
      setIsSpinning(false);
      clearInterval(tickInterval);

      const finalAngle = (newRotation % 360);
      const effectiveAngle = (360 - (finalAngle % 360) + 270) % 360;
      const sliceSize = 360 / currentSlices.length;
      const winningIdx = Math.floor(effectiveAngle / sliceSize) % currentSlices.length;
      const winner = currentSlices[winningIdx];

      if (isClassMode) {
        setSelectedStudent(winner.label);
        sound.playFanfare();
        fireBigConfetti();
      } else {
        const standardWinner = winner as WheelSlice;
        setSelectedSlice(standardWinner);

        if (standardWinner.type === 'bonus') {
          sound.playFanfare();
          fireBigConfetti();
          setBonusModal(standardWinner.points || 5);
          onAddStars(standardWinner.points || 5);
        } else if (standardWinner.type === 'task') {
          sound.playCorrect();
          setTaskModal(standardWinner.label);
        } else if (standardWinner.type === 'question') {
          sound.playPop();
          const qList = WHEEL_QUESTIONS.filter((q) => q.category === standardWinner.category);
          const chosenQ = qList[Math.floor(Math.random() * qList.length)] || WHEEL_QUESTIONS[0];
          setQuestionModal(chosenQ);
        }
      }
    }, 3500);
  };

  const handleAnswerQuestion = (opt: string) => {
    if (!questionModal) return;
    if (opt === questionModal.answer) {
      sound.playFanfare();
      fireConfetti();
      onAddStars(3);
      alert('ចម្លើយត្រឹមត្រូវ! អស្ចារ្យណាស់ 🌟 (+៣ ផ្កាយ)');
    } else {
      sound.playWrong();
      alert(`មិនទាន់ត្រូវទេ! ចម្លើយត្រឹមត្រូវគឺ៖ ${questionModal.answer}`);
    }
    setQuestionModal(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-md border-2 border-fuchsia-300 flex flex-col sm:flex-row items-center justify-between gap-3 overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none">
          <KhmerCorner className="w-6 h-6 text-fuchsia-500/70" />
        </div>
        <div className="absolute top-0 right-0 pointer-events-none rotate-90">
          <KhmerCorner className="w-6 h-6 text-fuchsia-500/70" />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 z-10 w-full sm:w-auto">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center text-2xl sm:text-3xl border border-fuchsia-300 flex-shrink-0">
            🎡
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-800 leading-tight">
              កងបង្វិលសំណួរមហាសំណាង
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">បង្វិលកងចៃដន្យ ឬប្ដូរជាហៅឈ្មោះសិស្ស</p>
          </div>
        </div>

        {/* Mode Toggle Button */}
        <button
          onClick={() => {
            sound.playClick();
            setIsClassMode(!isClassMode);
          }}
          className={`w-full sm:w-auto px-4 py-2 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 z-10 ${
            isClassMode
              ? 'bg-fuchsia-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          {isClassMode ? 'របៀបសិស្សក្នុងថ្នាក់' : 'របៀបសំណួរទូទៅ'}
        </button>
      </div>

      {/* Spinner Stage (Mobile optimized) */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-lg border-2 border-fuchsia-200 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Top Pointer */}
        <div className="z-20 -mb-3 text-3xl sm:text-4xl filter drop-shadow-md">
          🔻
        </div>

        {/* Scaled Wheel for mobile */}
        <div className="relative p-1 max-w-full flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={310}
            height={310}
            className="rounded-full shadow-2xl transition-transform duration-[3500ms] w-[270px] h-[270px] sm:w-[310px] sm:h-[310px]"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionTimingFunction: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
            }}
          />
        </div>

        {/* Big Touch-Friendly Spin Button */}
        <div className="mt-5 sm:mt-8 w-full max-w-xs">
          <button
            disabled={isSpinning}
            onClick={handleSpin}
            className={`w-full py-3.5 sm:py-4 rounded-3xl text-lg sm:text-xl font-black text-white shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 border-2 border-white/40 ${
              isSpinning
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:scale-105 shadow-pink-300'
            }`}
          >
            <RotateCw className={`w-5 h-5 sm:w-6 sm:h-6 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'កំពុងបង្វិល...' : 'ចុចបង្វិលកង!'}
          </button>
        </div>

        {/* Winner Student Popup */}
        {selectedStudent && (
          <div className="mt-5 p-4 sm:p-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-3xl border-2 border-amber-300 text-center animate-pop max-w-sm w-full">
            <span className="text-3xl sm:text-4xl">🎉</span>
            <p className="text-[11px] uppercase font-bold text-amber-700 mt-1">សូមអបអរសាទរ!</p>
            <h4 className="text-xl sm:text-2xl font-black text-amber-900 mt-0.5">
              សិស្សឈ្មោះ « {selectedStudent} »
            </h4>
            <p className="text-xs text-amber-800 mt-1">សូមអញ្ជើញឡើងមកឆ្លើយសំណួរ ឬសម្ដែង!</p>
          </div>
        )}

        {/* Bonus Stars Modal */}
        {bonusModal && (
          <div className="mt-5 p-4 sm:p-6 bg-emerald-100 rounded-3xl border-2 border-emerald-300 text-center animate-pop max-w-sm w-full">
            <span className="text-3xl sm:text-4xl">🌟</span>
            <h4 className="text-xl sm:text-2xl font-black text-emerald-800 mt-1">
              ទទួលបាន +{bonusModal} ផ្កាយ!
            </h4>
            <p className="text-xs text-emerald-700 mt-0.5">សំណាងធំមែនទែន!</p>
          </div>
        )}

        {/* Fun Task Modal */}
        {taskModal && (
          <div className="mt-5 p-4 sm:p-6 bg-pink-100 rounded-3xl border-2 border-pink-300 text-center animate-pop max-w-sm w-full">
            <span className="text-3xl sm:text-4xl">🎶</span>
            <p className="text-[11px] uppercase font-bold text-pink-700 mt-1">ភារកិច្ចកម្សាន្ត</p>
            <h4 className="text-lg sm:text-xl font-black text-pink-800 mt-0.5">« {taskModal} »</h4>
          </div>
        )}
      </div>

      {/* Question Modal Dialog */}
      {questionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-lg w-full shadow-2xl space-y-4 animate-pop text-center relative border-2 border-amber-300">
            <span className="text-3xl sm:text-4xl">❓</span>
            <h3 className="text-lg sm:text-2xl font-black text-slate-800">
              {questionModal.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
              {questionModal.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswerQuestion(opt)}
                  className="p-3.5 rounded-2xl border-2 border-slate-200 hover:border-fuchsia-400 hover:bg-fuchsia-50 font-black text-slate-800 transition active:scale-95 text-center text-base sm:text-lg min-h-[48px]"
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={() => setQuestionModal(null)}
              className="text-xs text-slate-400 font-bold hover:underline block mx-auto pt-2"
            >
              រំលងសំណួរនេះ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
