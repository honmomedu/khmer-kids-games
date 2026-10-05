import React, { useState } from 'react';
import { GAMES_LIST } from '../data/gamesList';
import { Category } from '../types/game';
import { sound } from '../utils/audio';
import { Play, Sparkles, Trophy, BookOpen, Calculator, Brain, Disc } from 'lucide-react';

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
    { id: 'all', label: 'ទាំងអស់ (១០ App)', icon: <Trophy className="w-4 h-4" />, color: 'bg-indigo-600 text-white' },
    { id: 'khmer', label: 'ភាសាខ្មែរ (៣)', icon: <BookOpen className="w-4 h-4" />, color: 'bg-amber-500 text-white' },
    { id: 'math', label: 'គណិតវិទ្យា (៣)', icon: <Calculator className="w-4 h-4" />, color: 'bg-emerald-600 text-white' },
    { id: 'wheel', label: 'បង្វិលកង (១)', icon: <Disc className="w-4 h-4" />, color: 'bg-fuchsia-600 text-white' },
    { id: 'brain', label: 'អភិវឌ្ឍខួរក្បាល (៣)', icon: <Brain className="w-4 h-4" />, color: 'bg-sky-600 text-white' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 md:p-10 text-white shadow-xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-yellow-400/20 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-yellow-300">
              <Sparkles className="w-4 h-4" /> ល្បែងសិក្សាជាតិកម្ពុជាសម្រាប់កុមារ
            </div>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-snug">
              រៀនផង លេងផង ឆ្លាតវៃជានិច្ច! 🚀
            </h2>
            <p className="text-sm md:text-base text-indigo-100 max-w-xl">
              ប្រមូលផ្ដុំល្បែងសិក្សាចំនួន ១០ មុខវិជ្ជាភាសាខ្មែរ គណិតវិទ្យា បង្វិលកង និងល្បែងបញ្ញា សម្រាប់សិស្សបឋមសិក្សា។
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-white/15 backdrop-blur-lg rounded-2xl border border-white/20 text-center min-w-[160px]">
            <span className="text-3xl mb-1">⭐</span>
            <span className="text-xs uppercase tracking-wider text-yellow-300 font-bold">ពិន្ទុផ្កាយសរុប</span>
            <span className="text-3xl md:text-4xl font-black text-white">{stars}</span>
            <span className="text-[11px] text-white/80">បន្តប្រមូលផ្កាយទៀតណា៎!</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 shadow-sm ${
                isActive
                  ? `${cat.color} ring-4 ring-indigo-200 scale-105`
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 10 Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <button
            key={game.id}
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectGame(game.id);
            }}
            className="group relative bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border-2 border-slate-100 hover:border-indigo-400 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1.5 text-left w-full focus:outline-none focus:ring-4 focus:ring-indigo-100"
          >
            {/* Top row: badge & game number */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-slate-100 group-hover:bg-indigo-50 text-indigo-700 font-extrabold text-xs rounded-full border border-slate-200 group-hover:border-indigo-200 transition">
                  App {game.number}
                </span>
                <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-200">
                  {game.badge}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-3">
                <div
                  className={`w-14 h-14 rounded-2xl ${game.gradient} flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition duration-300 flex-shrink-0`}
                >
                  {game.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition leading-snug">
                    {game.titleKhmer}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400">
                    {game.titleEn}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed mt-2 line-clamp-2">
                {game.descriptionKhmer}
              </p>
            </div>

            {/* Play Button */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between w-full">
              <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:underline">
                ចុចដើម្បីលេង
              </span>
              <div className="w-9 h-9 rounded-full bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center transition shadow-sm">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
