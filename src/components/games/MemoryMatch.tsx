import React, { useState, useEffect } from 'react';
import { ANIMAL_MEMORY_PAIRS, MATH_MEMORY_PAIRS, MemoryPair } from '../../data/memoryCardsData';
import { sound } from '../../utils/audio';
import { fireBigConfetti } from '../../utils/confetti';
import { RotateCcw, Sparkles, Trophy } from 'lucide-react';

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

  // Initialize deck
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

    // Shuffle
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

    // Flip card
    const updatedCards = cards.map((c) =>
      c.instanceId === card.instanceId ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);

      // Check match
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl">
            🃏
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              កាតចងចាំផ្គូផ្គង
            </h2>
            <p className="text-xs text-slate-500">បើកផ្គូផ្គងកាតដែលមានន័យដូចគ្នា</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Deck selector */}
          <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => { sound.playClick(); setDeckType('animals'); }}
              className={`px-3 py-1.5 rounded-xl transition ${
                deckType === 'animals' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              🐾 សត្វ
            </button>
            <button
              onClick={() => { sound.playClick(); setDeckType('math'); }}
              className={`px-3 py-1.5 rounded-xl transition ${
                deckType === 'math' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              🔢 គណិត
            </button>
          </div>

          <button
            onClick={() => { sound.playClick(); initGame(deckType); }}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition"
            title="លេងឡើងវិញ"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Score and Stats */}
      <div className="flex justify-between items-center px-4 text-sm font-bold text-slate-600">
        <span>ចំនួនផ្គូផ្គងបាន៖ <b className="text-indigo-600">{matches} / 6 គូ</b></span>
        <span>លើកបើក៖ <b className="text-amber-600">{moves} លើក</b></span>
      </div>

      {/* Victory Banner */}
      {isWon ? (
        <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 text-center space-y-4 animate-pop">
          <div className="text-7xl">🏆🌟🎉</div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-800">
            អស្ចារ្យណាស់! ប្អូនបានផ្គូផ្គងជោគជ័យទាំងអស់!
          </h3>
          <p className="text-slate-600">
            ប្រើអស់ត្រឹមតែ {moves} លើកប៉ុណ្ណោះ! ទទួលបាន +៥ ផ្កាយបន្ថែម!
          </p>
          <button
            onClick={() => { sound.playClick(); initGame(deckType); }}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold rounded-2xl shadow-lg hover:scale-105 transition"
          >
            លេងម្ដងទៀត 🔄
          </button>
        </div>
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
          {cards.map((card) => {
            return (
              <div
                key={card.instanceId}
                onClick={() => handleCardClick(card)}
                className={`h-28 sm:h-32 md:h-36 rounded-3xl cursor-pointer perspective flex items-center justify-center text-center transition-all duration-300 transform select-none ${
                  card.isMatched
                    ? 'bg-emerald-500 text-white shadow-md scale-95 opacity-90'
                    : card.isFlipped
                    ? 'bg-white border-2 border-indigo-400 text-indigo-900 shadow-lg scale-100'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:scale-105 active:scale-95'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <div className="animate-pop">
                    <span className="text-2xl md:text-4xl font-black">{card.text}</span>
                  </div>
                ) : (
                  <span className="text-3xl font-black opacity-80">❓</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
