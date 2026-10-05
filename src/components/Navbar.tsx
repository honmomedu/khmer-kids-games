import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, ArrowLeft, Sparkles, Home } from 'lucide-react';
import { sound } from '../utils/audio';
import { KhmerLotus, KhmerCorner } from './ui/KhmerKbach';

interface NavbarProps {
  activeGameId: string | null;
  onBackToHub: () => void;
  stars: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeGameId, onBackToHub, stars }) => {
  const [isMuted, setIsMuted] = useState(!sound.enabled);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setIsMuted(!sound.enabled);
    if (sound.enabled) {
      sound.playClick();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-amber-300 shadow-sm px-3 sm:px-4 py-2 sm:py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left Side: Back button or Khmer Logo */}
        <div className="flex items-center gap-2">
          {activeGameId ? (
            <button
              onClick={() => {
                sound.playClick();
                onBackToHub();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 active:from-amber-600 active:to-amber-700 text-white font-extrabold rounded-2xl shadow-sm transition transform active:scale-95 text-xs sm:text-sm min-h-[42px] border border-amber-400"
              title="ត្រឡប់ទៅទំព័រដើម"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>ទំព័រដើម</span>
            </button>
          ) : (
            <div
              className="flex items-center gap-2 cursor-pointer py-1"
              onClick={onBackToHub}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-md p-1 border border-amber-200">
                <KhmerLotus className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-2xl font-black bg-gradient-to-r from-amber-700 via-purple-700 to-pink-600 bg-clip-text text-transparent leading-tight flex items-center gap-1">
                  <span>KhmerKids</span>
                  <span className="text-[11px] sm:text-xs font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-md border border-amber-300 hidden xs:inline">កម្ពុជា 🇰🇭</span>
                </h1>
                <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">
                  ល្បែងសិក្សាបែបកម្សាន្តសម្រាប់សិស្សបឋមសិក្សា
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Stars counter, Sound toggle, Fullscreen */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Star counter with golden Khmer rim */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-amber-50 to-yellow-100 border-2 border-amber-300 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-inner min-h-[38px]">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 fill-amber-400 animate-pulse" />
            <span className="font-black text-amber-900 text-sm sm:text-lg">
              {stars}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-amber-700 hidden sm:inline">ពិន្ទុ</span>
          </div>

          {/* Sound Toggle (Big finger touch area for mobile) */}
          <button
            onClick={toggleSound}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border-2 flex items-center justify-center transition active:scale-95 ${
              isMuted
                ? 'bg-slate-100 border-slate-300 text-slate-400'
                : 'bg-emerald-50 border-emerald-400 text-emerald-600 shadow-sm'
            }`}
            title={isMuted ? 'បើកសំឡេង' : 'បិទសំឡេង'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Fullscreen Toggle (hidden on small phones) */}
          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition shadow-sm hidden md:flex items-center justify-center active:scale-95"
            title="ពេញអេក្រង់"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
