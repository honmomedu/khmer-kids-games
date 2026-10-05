import React, { useState, useEffect } from 'react';
import { ANIMAL_MEMORY_PAIRS, MATH_MEMORY_PAIRS, MemoryPair } from '../../data/memoryCardsData';
import { sound } from '../../utils/audio';
import { fireBigConfetti } from '../../utils/confetti';
import { RotateCcw } from 'lucide-react';
import { KhmerCorner, KhmerLotus } from '../ui/KhmerKbach';

interface Card {
  instanceId: string;
  pairId: string;
  text: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface Props {
  onAddStars: (amount: number) => void;
}

export const MemoryMatch: React.FC<Props> = ({ onAddStars }) => {
  const [deckType, setDeckType] = useState<'animals' | 'math'>('animals');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initGame = (type: 'animals' | 'math') => {
    const rawPairs = type === 'animals' ? ANIMAL_MEMORY_PAIRS.slice(0, 6) : MATH_MEMORY_PAIRS.slice(0, 6);
    const deck: Card[] = [];

    rawPairs.forEach((pair) => {
      deck.push({
        instanceId: `${pair.id}-A`,
        pairId: pair.id,
        text: pair.itemA.text,
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        instanceId: `${pair.id}-B`,
        pairId: pair.id,
        text: pair.itemB.text,
        isFlipped: false,
        isMatched: false,
      });
    });

    deck.sort(() => 0.5 - Math.random());

    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame(deckType);
  }, [deckType]);

  const handleCardClick = (card: Card) => {
    if (card.isFlipped || card.isMatched || flippedCards.length === 2) return;

    sound.playPop();

    const updatedCards = cards.map((c) =>
      c.instanceId === card.instanceId ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);

      if (newFlipped[0].pairId === newFlipped[1].pairId) {
        sound.playCorrect();
        onAddStars(2);

        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === newFlipped[0].pairId ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
          setMatches((matchCount) => {
            const nextMatchCount = matchCount + 1;
            if (nextMatchCount >= 6) {
              setIsWon(true);
              sound.playFanfare();
              fireBigConfetti();
              onAddStars(5);
            }
            return nextMatchCount;
          });
        }, 500);
      } else {
        sound.playWrong();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.instanceId === newFlipped[0].instanceId || c.instanceId === newFlipped[1].instanceId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-md border-2 border-indigo-300 flex flex-col sm:flex-row items-center justify-between gap-3 overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none">
          <KhmerCorner className="w-6 h-6 text-indigo-500/70" />
        </div>
        <div className="absolute top-0 right-0 pointer-events-none rotate-90">
          <KhmerCorner className="w-6 h-6 text-indigo-500/70" />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 z-10 w-full sm:w-auto">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl sm:text-3xl border border-indigo-300 flex-shrink-0">
            🃏
          </div>
          <div>
            <h2 className="text-base sm:text-2xl font-black text-slate-800 leading-tight">
              កាតចងចាំផ្គូផ្គង
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">បើកផ្គូផ្គងកាតដែលមានន័យដូចគ្នា</p>
          </div>
        </div>

        <div className="flex items-center gap-2 z-10 self-end sm:self-auto">
          <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => { sound.playClick(); setDeckType('animals'); }}
              className={`px-3 py-1.5 rounded-xl transition ${
                deckType === 'animals' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              🐾 សត្វ
            </button>
            <button
              onClick={() => { sound.playClick(); setDeckType('math'); }}
              className={`px-3 py-1.5 rounded-xl transition ${
                deckType === 'math' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              🔢 គណិត
            </button>
          </div>

          <button
            onClick={() => { sound.playClick(); initGame(deckType); }}
            className="p-2 sm:p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition active:scale-95"
            title="លេងឡើងវិញ"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex justify-between items-center px-2 text-xs sm:text-sm font-bold text-slate-600">
        <span className="bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
          ផ្គូផ្គងបាន៖ <b className="text-indigo-600">{matches} / 6 គូ</b>
        </span>
        <span className="bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
          បើក៖ <b className="text-amber-600">{moves} លើក</b>
        </span>
      </div>

      {/* Victory Banner */}
      {isWon ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-2 border-emerald-300 text-center space-y-4 animate-pop">
          <div className="text-6xl sm:text-7xl">🏆🌟🎉</div>
          <h3 className="text-xl sm:text-3xl font-black text-slate-800">
            អស្ចារ្យណាស់! ប្អូនបានផ្គូផ្គងជោគជ័យទាំងអស់!
          </h3>
          <p className="text-xs sm:text-base text-slate-600">
            ប្រើអស់ត្រឹមតែ {moves} លើកប៉ុណ្ណោះ! ទទួលបាន +៥ ផ្កាយបន្ថែម!
          </p>
          <button
            onClick={() => { sound.playClick(); initGame(deckType); }}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition text-sm sm:text-base"
          >
            លេងម្ដងទៀត 🔄
          </button>
        </div>
      ) : (
        /* Cards Grid (3 cols on small phone, 4 cols on desktop) */
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-4">
          {cards.map((card) => {
            return (
              <div
                key={card.instanceId}
                onClick={() => handleCardClick(card)}
                className={`h-24 sm:h-32 md:h-36 rounded-2xl sm:rounded-3xl cursor-pointer flex items-center justify-center text-center transition-all duration-300 transform select-none ${
                  card.isMatched
                    ? 'bg-emerald-500 text-white shadow-sm scale-95 opacity-90 border-2 border-emerald-400'
                    : card.isFlipped
                    ? 'bg-white border-2 border-indigo-400 text-indigo-900 shadow-md scale-100'
                    : 'bg-gradient-to-br from-indigo-700 via-indigo-600 to-amber-700 hover:from-indigo-800 text-white shadow-md active:scale-95 border-2 border-amber-400/80'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <div className="animate-pop p-1">
                    <span className="text-xl sm:text-3xl md:text-4xl font-black">{card.text}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center opacity-90">
                    <KhmerLotus className="w-7 h-7 sm:w-10 sm:h-10 text-amber-300 drop-shadow" />
                    <span className="text-[9px] sm:text-[10px] text-amber-200 font-bold mt-0.5">កាតខ្មែរ</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
