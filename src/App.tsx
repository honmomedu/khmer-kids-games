import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hub } from './components/Hub';
import { AlphabetSafari } from './components/games/AlphabetSafari';
import { WordBuilder } from './components/games/WordBuilder';
import { VocabRiver } from './components/games/VocabRiver';
import { MathSafari } from './components/games/MathSafari';
import { MultiplicationPop } from './components/games/MultiplicationPop';
import { ShapeBuilder } from './components/games/ShapeBuilder';
import { LuckyWheel } from './components/games/LuckyWheel';
import { MemoryMatch } from './components/games/MemoryMatch';
import { MysteryBox } from './components/games/MysteryBox';
import { SmartSorting } from './components/games/SmartSorting';
import { sound } from './utils/audio';

export function App() {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('khmer_kids_stars');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('khmer_kids_stars', stars.toString());
  }, [stars]);

  const handleAddStars = (amount: number) => {
    setStars((prev) => prev + amount);
    sound.playCoin();
  };

  const renderActiveGame = () => {
    switch (activeGameId) {
      case 'khmer-alphabet':
        return <AlphabetSafari onAddStars={handleAddStars} />;
      case 'khmer-word-builder':
        return <WordBuilder onAddStars={handleAddStars} />;
      case 'khmer-vocab-river':
        return <VocabRiver onAddStars={handleAddStars} />;
      case 'math-safari':
        return <MathSafari onAddStars={handleAddStars} />;
      case 'math-multiplication':
        return <MultiplicationPop onAddStars={handleAddStars} />;
      case 'math-shapes':
        return <ShapeBuilder onAddStars={handleAddStars} />;
      case 'lucky-wheel':
        return <LuckyWheel onAddStars={handleAddStars} />;
      case 'memory-match':
        return <MemoryMatch onAddStars={handleAddStars} />;
      case 'mystery-box':
        return <MysteryBox onAddStars={handleAddStars} />;
      case 'smart-sorting':
        return <SmartSorting onAddStars={handleAddStars} />;
      default:
        return <Hub onSelectGame={(id) => setActiveGameId(id)} stars={stars} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50/60 via-sky-50/50 to-pink-50/60">
      <Navbar
        activeGameId={activeGameId}
        onBackToHub={() => setActiveGameId(null)}
        stars={stars}
      />

      <main className="flex-1 p-4 md:p-6">
        {renderActiveGame()}
      </main>

      <footer className="py-6 border-t border-slate-200/80 bg-white/70 backdrop-blur-sm text-center text-xs text-slate-500 font-medium">
        <p>
          កម្មវិធីល្បែងសិក្សាកុមារបឋមសិក្សា KhmerKids Games 🇰🇭 • រចនាឡើងសម្រាប់លើកកម្ពស់ការអប់រំនៅកម្ពុជា
        </p>
        <p className="mt-1 text-slate-400">
          Hosting រួចរាល់សម្រាប់ Vercel • គាំទ្រលើទូរសព្ទ iPad និងកុំព្យូទ័រ
        </p>
      </footer>
    </div>
  );
}

export default App;
