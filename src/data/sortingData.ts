export interface SortItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

export interface SortLevel {
  title: string;
  categoryA: { id: string; name: string; color: string; icon: string };
  categoryB: { id: string; name: string; color: string; icon: string };
  items: SortItem[];
}

export const SORT_LEVELS: SortLevel[] = [
  {
    title: 'កម្រិត ១៖ សត្វគោក និង សត្វទឹក',
    categoryA: { id: 'land', name: 'សត្វគោក', color: 'from-amber-400 to-orange-500', icon: '🦁' },
    categoryB: { id: 'water', name: 'សត្វទឹក', color: 'from-cyan-400 to-blue-500', icon: '🐬' },
    items: [
      { id: 's1', name: 'ដំរី', emoji: '🐘', category: 'land' },
      { id: 's2', name: 'ត្រីឆ្លាម', emoji: '🦈', category: 'water' },
      { id: 's3', name: 'តោ', emoji: '🦁', category: 'land' },
      { id: 's4', name: 'មឹក', emoji: '🦑', category: 'water' },
      { id: 's5', name: 'សេះបង្កង់', emoji: '🦓', category: 'land' },
      { id: 's6', name: 'ក្ដាម', emoji: '🦀', category: 'water' },
    ]
  },
  {
    title: 'កម្រិត ២៖ លេខគូ និង លេខសេស',
    categoryA: { id: 'even', name: 'លេខគូ (Even)', color: 'from-emerald-400 to-green-600', icon: '✌️' },
    categoryB: { id: 'odd', name: 'លេខសេស (Odd)', color: 'from-rose-400 to-pink-600', icon: '☝️' },
    items: [
      { id: 'n1', name: '២', emoji: '2️⃣', category: 'even' },
      { id: 'n2', name: '៥', emoji: '5️⃣', category: 'odd' },
      { id: 'n3', name: '៨', emoji: '8️⃣', category: 'even' },
      { id: 'n4', name: '៧', emoji: '7️⃣', category: 'odd' },
      { id: 'n5', name: '៤', emoji: '4️⃣', category: 'even' },
      { id: 'n6', name: '៩', emoji: '9️⃣', category: 'odd' },
    ]
  },
  {
    title: 'កម្រិត ៣៖ ផ្លែឈើ និង បន្លែ',
    categoryA: { id: 'fruit', name: 'ផ្លែឈើ', color: 'from-red-400 to-rose-500', icon: '🍎' },
    categoryB: { id: 'veggie', name: 'បន្លែ', color: 'from-lime-400 to-emerald-600', icon: '🥦' },
    items: [
      { id: 'f1', name: 'ផ្លែប៉ោម', emoji: '🍎', category: 'fruit' },
      { id: 'f2', name: 'ការ៉ុត', emoji: '🥕', category: 'veggie' },
      { id: 'f3', name: 'ចេក', emoji: '🍌', category: 'fruit' },
      { id: 'f4', name: 'ផ្កាខាត់ណា', emoji: '🥦', category: 'veggie' },
      { id: 'f5', name: 'ឪឡឹក', emoji: '🍉', category: 'fruit' },
      { id: 'f6', name: 'ពោត', emoji: '🌽', category: 'veggie' },
    ]
  }
];
