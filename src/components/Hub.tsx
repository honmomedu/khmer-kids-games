import React, { useState } from 'react';
import { GAMES_LIST } from '../data/gamesList';
import { Category } from '../types/game';
import { sound } from '../utils/audio';
import { Play, Sparkles, Trophy, BookOpen, Calculator, Brain, Disc } from 'lucide-react';
import { KhmerCorner, KhmerDivider, KhmerLotus } from './ui/KhmerKbach';

interface HubProps {
  onSelectGame: (gameId: string) => void;
  stars: number;
}

export const Hub: React.FC<HubProps> = ({ onSelectGame, stars }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredGames = GAMES_LIST.filter((game) => {
    if (selectedCategory === 'all') return true;
    return game.category === selectedCategory;
  });

  const categories: { id: Category; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'all', label: 'ទាំងអស់ (១០)', icon: <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, color: 'bg-amber-600 text-white' },
    { id: 'khmer', label: 'ភាសាខ្មែរ (៣)', icon: <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, color: 'bg-emerald-600 text-white' },
    { id: 'math', label: 'គណិតវិទ្យា (៣)', icon: <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, color: 'bg-blue-600 text-white' },
    { id: 'wheel', label: 'បង្វិលកង (១)', icon: <Disc className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, color: 'bg-fuchsia-600 text-white' },
    { id: 'brain', label: 'អភិវឌ្ឍខួរក្បាល (៣)', icon: <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, color: 'bg-rose-600 text-white' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-6 space-y-4 sm:space-y-6">
      {/* Traditional Khmer Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-yellow-700 to-indigo-900 p-5 sm:p-8 text-white shadow-xl border-2 border-amber-300">
        {/* Khmer Traditional 4-Corner Kbach */}
        <div className="absolute top-1 left-1 pointer-events-none z-10">
          <KhmerCorner className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300/80" />
        </div>
        <div className="absolute top-1 right-1 pointer-events-none z-10 rotate-90">
          <KhmerCorner className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300/80" />
        </div>
        <div className="absolute bottom-1 right-1 pointer-events-none z-10 rotate-180">
          <KhmerCorner className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300/80" />
        </div>
        <div className="absolute bottom-1 left-1 pointer-events-none z-10 -rotate-90">
          <KhmerCorner className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300/80" />
        </div>

        {/* Ambient background glows */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/25 backdrop-blur-md rounded-full text-xs font-bold text-amber-200 border border-amber-300/40">
              <KhmerLotus className="w-4 h-4 text-amber-300" />
              <span>ល្បែងសិក្សាជាតិកម្ពុជាសម្រាប់កុមារ</span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug">
              រៀនផង លេងផង ឆ្លាតវៃជានិច្ច! 🚀
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
              ប្រមូលផ្ដុំល្បែងសិក្សាចំនួន ១០ មុខវិជ្ជាភាសាខ្មែរ គណិតវិទ្យា បង្វិលកង និងល្បែងបញ្ញា ស្របតាមកម្មវិធីបឋមសិក្សាកម្ពុជា។
            </p>
          </div>

          {/* Quick Score Badge for Mobile/Desktop */}
          <div className="flex md:flex-col items-center justify-center py-2 px-4 sm:p-4 bg-black/30 backdrop-blur-lg rounded-2xl border border-amber-300/40 text-center w-full md:w-auto gap-3 md:gap-1">
            <span className="text-2xl sm:text-3xl">🌟</span>
            <div className="text-left md:text-center">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-200 font-extrabold block">
                ផ្កាយសរុប
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white leading-none">
                {stars}
              </span>
            </div>
            <span className="text-[11px] text-amber-200/90 ml-auto md:ml-0 font-medium hidden sm:inline">
              បន្តប្រមូលផ្កាយទៀតណា៎!
            </span>
          </div>
        </div>

        {/* Traditional Khmer Divider at bottom of banner */}
        <KhmerDivider className="mt-4 opacity-70 text-amber-300" />
      </div>

      {/* Category Filter Pills (Mobile friendly swipeable bar) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 pt-1 -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shadow-sm active:scale-95 ${
                isActive
                  ? `${cat.color} ring-2 ring-amber-400 scale-105 shadow-md`
                  : 'bg-white hover:bg-amber-50/50 text-slate-700 border border-slate-200'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 10 Games Grid (1 col on tiny mobile, 2 cols on tablet, 3 cols on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {filteredGames.map((game) => (
          <button
            key={game.id}
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectGame(game.id);
            }}
            className="group relative bg-white rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-xl border-2 border-amber-200/70 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between cursor-pointer transform active:scale-98 sm:hover:-translate-y-1 text-left w-full focus:outline-none overflow-hidden"
          >
            {/* Top-Right and Bottom-Left Corner Kbach accent */}
            <div className="absolute top-0 right-0 pointer-events-none opacity-40 group-hover:opacity-100 transition rotate-90">
              <KhmerCorner className="w-6 h-6 text-amber-500" />
            </div>
            <div className="absolute bottom-0 left-0 pointer-events-none opacity-40 group-hover:opacity-100 transition -rotate-90">
              <KhmerCorner className="w-6 h-6 text-amber-500" />
            </div>

            {/* Top row: badge & game number */}
            <div className="w-full relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 bg-amber-50 group-hover:bg-amber-100 text-amber-800 font-black text-[11px] sm:text-xs rounded-full border border-amber-300 transition">
                  App {game.number}
                </span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold text-[10px] sm:text-[11px] rounded-full border border-slate-200">
                  {game.badge}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-3 mb-2">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${game.gradient} flex items-center justify-center text-2xl sm:text-3xl shadow-sm group-hover:scale-105 transition duration-300 flex-shrink-0 border border-white/40`}
                >
                  {game.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-800 group-hover:text-amber-700 transition leading-snug truncate">
                    {game.titleKhmer}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-400 truncate">
                    {game.titleEn}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mt-1">
                {game.descriptionKhmer}
              </p>
            </div>

            {/* Play Button Row */}
            <div className="mt-3.5 pt-3 border-t border-amber-100 flex items-center justify-between w-full relative z-10">
              <span className="text-xs font-bold text-amber-700 group-hover:text-amber-800 flex items-center gap-1">
                👉 ចុចដើម្បីលេង
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-100 group-hover:bg-amber-600 text-amber-700 group-hover:text-white flex items-center justify-center transition shadow-xs">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
