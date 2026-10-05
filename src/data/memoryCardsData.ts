export interface MemoryPair {
  id: string;
  itemA: { text: string; sub?: string };
  itemB: { text: string; sub?: string };
}

export const ANIMAL_MEMORY_PAIRS: MemoryPair[] = [
  { id: 'p1', itemA: { text: '🐘' }, itemB: { text: 'ដំរី' } },
  { id: 'p2', itemA: { text: '🦁' }, itemB: { text: 'តោ' } },
  { id: 'p3', itemA: { text: '🐒' }, itemB: { text: 'ស្វា' } },
  { id: 'p4', itemA: { text: '🐢' }, itemB: { text: 'អណ្ដើក' } },
  { id: 'p5', itemA: { text: '🦋' }, itemB: { text: 'មេអំបៅ' } },
  { id: 'p6', itemA: { text: '🐬' }, itemB: { text: 'ត្រីផ្សោត' } },
  { id: 'p7', itemA: { text: '🐯' }, itemB: { text: 'ខ្លា' } },
  { id: 'p8', itemA: { text: '🦅' }, itemB: { text: 'ឥន្ទ្រី' } },
];

export const MATH_MEMORY_PAIRS: MemoryPair[] = [
  { id: 'm1', itemA: { text: '៤ + ៤' }, itemB: { text: '៨' } },
  { id: 'm2', itemA: { text: '៥ + ៧' }, itemB: { text: '១២' } },
  { id: 'm3', itemA: { text: '៩ + ៦' }, itemB: { text: '១៥' } },
  { id: 'm4', itemA: { text: '១០ - ៣' }, itemB: { text: '៧' } },
  { id: 'm5', itemA: { text: '២ x ៥' }, itemB: { text: '១០' } },
  { id: 'm6', itemA: { text: '៣ x ៦' }, itemB: { text: '១៨' } },
  { id: 'm7', itemA: { text: '២០ - ៦' }, itemB: { text: '១៤' } },
  { id: 'm8', itemA: { text: '៤ x ៤' }, itemB: { text: '១៦' } },
];
