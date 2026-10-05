import React, { useState, useRef, useEffect } from 'react';
import { DEFAULT_WHEEL_SLICES, WHEEL_QUESTIONS, WheelSlice, WheelQuestion } from '../../data/luckyWheelData';
import { sound } from '../../utils/audio';
import { fireBigConfetti, fireConfetti } from '../../utils/confetti';
import { Play, Sparkles, CheckCircle2, RotateCw, Users } from 'lucide-react';

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

  // Classroom student names mode
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
    const radius = centerX - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      ctx.lineWidth = 3;
      ctx.stroke();

      // Text label
      ctx.save();
      ctx.translate(centerX, centerY);
      const midAngle = angle + sliceAngle / 2;
      ctx.rotate(midAngle);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px "Kantumruy Pro", sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.textBaseline = 'middle';

      // Always orient text so it is upright and easy to read
      if (midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2) {
        ctx.rotate(Math.PI);
        ctx.textAlign = 'left';
        ctx.fillText(slice.label, -(radius - 25), 0);
      } else {
        ctx.textAlign = 'right';
        ctx.fillText(slice.label, radius - 25, 0);
      }
      ctx.restore();
    });

    // Center peg
    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.stroke();
  }, [currentSlices, isClassMode]);

  // Spin execution
  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedSlice(null);
    setQuestionModal(null);
    setTaskModal(null);
    setBonusModal(null);
    setSelectedStudent(null);

    sound.playClick();

    const fullRotations = 5 + Math.floor(Math.random() * 4); // 5 to 8 turns
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalAddedRotation = fullRotations * 360 + extraDegrees;
    const newRotation = rotation + totalAddedRotation;
    setRotation(newRotation);

    // Audio ticking simulation
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      sound.playTick();
      tickCount++;
      if (tickCount > 24) clearInterval(tickInterval);
    }, 120);

    // Wheel stops after 3.5s
    setTimeout(() => {
      setIsSpinning(false);
      clearInterval(tickInterval);

      // Determine which slice won
      // Canvas draws slice 0 from 0 to sliceAngle (right side, 3 o'clock).
      // Pointer is at the top (12 o'clock, which is -90 deg or 270 deg).
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

  // Answer question modal
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center text-3xl">
            🎡
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              កងបង្វិលសំណួរមហាសំណាង
            </h2>
            <p className="text-xs text-slate-500">បង្វិលកងចៃដន្យដើម្បីឆ្លើយសំណួរ ឬហៅឈ្មោះសិស្ស</p>
          </div>
        </div>

        {/* Mode Toggle Button */}
        <button
          onClick={() => {
            sound.playClick();
            setIsClassMode(!isClassMode);
          }}
          className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition ${
            isClassMode
              ? 'bg-fuchsia-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          {isClassMode ? 'របៀបសិស្សក្នុងថ្នាក់' : 'របៀបសំណួរទូទៅ'}
        </button>
      </div>

      {/* Spinner Stage */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Top Pointer Indicator */}
        <div className="z-20 -mb-4 text-4xl filter drop-shadow-md">
          🔻
        </div>

        {/* Wheel Canvas Container */}
        <div className="relative p-2">
          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            className="rounded-full shadow-2xl transition-transform duration-[3500ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionTimingFunction: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
            }}
          />
        </div>

        {/* Spin Button */}
        <div className="mt-8">
          <button
            disabled={isSpinning}
            onClick={handleSpin}
            className={`px-10 py-4 rounded-3xl text-xl font-black text-white shadow-xl transition-all transform active:scale-95 flex items-center gap-2 ${
              isSpinning
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:scale-105 hover:shadow-pink-300'
            }`}
          >
            <RotateCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'កំពុងបង្វិល...' : 'ចុចបង្វិលកង!'}
          </button>
        </div>

        {/* Winner Student Popup */}
        {selectedStudent && (
          <div className="mt-6 p-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-3xl border-2 border-amber-300 text-center animate-pop max-w-sm">
            <span className="text-4xl">🎉</span>
            <p className="text-xs uppercase font-bold text-amber-700 mt-1">សូមអបអរសាទរ!</p>
            <h4 className="text-2xl font-black text-amber-900 mt-1">
              សិស្សឈ្មោះ « {selectedStudent} »
            </h4>
            <p className="text-xs text-amber-800 mt-1">សូមអញ្ជើញឡើងមកឆ្លើយសំណួរ ឬសម្ដែង!</p>
          </div>
        )}

        {/* Bonus Stars Modal */}
        {bonusModal && (
          <div className="mt-6 p-6 bg-emerald-100 rounded-3xl border-2 border-emerald-300 text-center animate-pop max-w-sm">
            <span className="text-4xl">🌟</span>
            <h4 className="text-2xl font-black text-emerald-800 mt-1">
              ទទួលបាន +{bonusModal} ផ្កាយ!
            </h4>
            <p className="text-xs text-emerald-700 mt-1">សំណាងធំមែនទែន!</p>
          </div>
        )}

        {/* Fun Task Modal */}
        {taskModal && (
          <div className="mt-6 p-6 bg-pink-100 rounded-3xl border-2 border-pink-300 text-center animate-pop max-w-sm">
            <span className="text-4xl">🎶</span>
            <p className="text-xs uppercase font-bold text-pink-700 mt-1">ភារកិច្ចកម្សាន្ត</p>
            <h4 className="text-xl font-black text-pink-800 mt-1">« {taskModal} »</h4>
          </div>
        )}
      </div>

      {/* Question Modal Dialog */}
      {questionModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-pop text-center">
            <span className="text-4xl">❓</span>
            <h3 className="text-xl md:text-2xl font-black text-slate-800">
              {questionModal.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {questionModal.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswerQuestion(opt)}
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 font-black text-slate-800 transition active:scale-95 text-center text-lg"
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={() => setQuestionModal(null)}
              className="text-xs text-slate-400 font-bold hover:underline"
            >
              រំលងសំណួរនេះ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
