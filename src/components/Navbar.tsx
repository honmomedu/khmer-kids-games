import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, ArrowLeft, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left Side: Back button or Brand */}
        <div className="flex items-center gap-3">
          {activeGameId ? (
            <button
              onClick={() => {
                sound.playClick();
                onBackToHub();
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-full transition shadow-sm"
              title="ត្រឡប់ទៅទំព័រដើម"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm md:text-base">ទំព័រដើម</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBackToHub}>
              <span className="text-3xl animate-bounceSlow">🎈</span>
              <div>
                <h1 className="text-lg md:text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  KhmerKids Games
                </h1>
                <p className="text-xs text-slate-500 hidden sm:block">
                  ល្បែងសិក្សាកម្សាន្តសម្រាប់សិស្សបឋមសិក្សា
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Stars, Sound, Fullscreen */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Star counter */}
          <div className="flex items-center gap-1.5 bg-amber-100/90 border border-amber-300 px-3 py-1.5 rounded-full shadow-inner">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
            <span className="font-extrabold text-amber-800 text-base md:text-lg">
              {stars}
            </span>
            <span className="text-xs font-semibold text-amber-700 hidden sm:inline">ពិន្ទុ</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition ${
              isMuted
                ? 'bg-slate-100 border-slate-300 text-slate-400'
                : 'bg-emerald-50 border-emerald-300 text-emerald-600 shadow-sm'
            }`}
            title={isMuted ? 'បើកសំឡេង' : 'បិទសំឡេង'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition shadow-sm hidden sm:block"
            title="ពេញអេក្រង់"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
