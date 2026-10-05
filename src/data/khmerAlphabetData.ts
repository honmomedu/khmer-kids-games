export interface AlphabetItem {
  char: string;
  name: string;
  word: string;
  emoji: string;
  group: 'consonant' | 'vowel';
}

export const KHMER_ALPHABET: AlphabetItem[] = [
  { char: 'ក', name: 'ក ក្អែក', word: 'ក្អែក', emoji: '🦅', group: 'consonant' },
  { char: 'ខ', name: 'ខ ខ្លា', word: 'ខ្លា', emoji: '🐯', group: 'consonant' },
  { char: 'គ', name: 'គ គោ', word: 'គោ', emoji: '🐮', group: 'consonant' },
  { char: 'ឃ', name: 'ឃ ឃ្មុំ', word: 'ឃ្មុំ', emoji: '🐝', group: 'consonant' },
  { char: 'ង', name: 'ង ងាវ', word: 'ងាវ', emoji: '🐚', group: 'consonant' },
  { char: 'ច', name: 'ច ចាប', word: 'ចាប', emoji: '🐦', group: 'consonant' },
  { char: 'ឆ', name: 'ឆ ឆ្មា', word: 'ឆ្មា', emoji: '🐱', group: 'consonant' },
  { char: 'ជ', name: 'ជ ជើង', word: 'ជើង', emoji: '🦶', group: 'consonant' },
  { char: 'ឈ', name: 'ឈ ឈើ', word: 'ឈើ', emoji: '🪵', group: 'consonant' },
  { char: 'ញ', name: 'ញ ញញួរ', word: 'ញញួរ', emoji: '🔨', group: 'consonant' },
  { char: 'ដ', name: 'ដ ដំរី', word: 'ដំរី', emoji: '🐘', group: 'consonant' },
  { char: 'ឋ', name: 'ឋ ឋានសួគ៌', word: 'ឋាន', emoji: '☁️', group: 'consonant' },
  { char: 'ឌ', name: 'ឌ ឌុកឌឿ', word: 'ឌុកឌឿ', emoji: '🐛', group: 'consonant' },
  { char: 'ឍ', name: 'ឍ ឍរ', word: 'កញ្ជ្រោង', emoji: '🦊', group: 'consonant' },
  { char: 'ណ', name: 'ណ ណែន', word: 'ណែន', emoji: '📦', group: 'consonant' },
  { char: 'ត', name: 'ត តោ', word: 'តោ', emoji: '🦁', group: 'consonant' },
  { char: 'ថ', name: 'ថ ថូផ្កា', word: 'ថូផ្កា', emoji: '🏺', group: 'consonant' },
  { char: 'ទ', name: 'ទ ទា', word: 'ទា', emoji: '🦆', group: 'consonant' },
  { char: 'ធ', name: 'ធ ធុង', word: 'ធុងទឹក', emoji: '🪣', group: 'consonant' },
  { char: 'ន', name: 'ន នាឡិកា', word: 'នាឡិកា', emoji: '⏰', group: 'consonant' },
  { char: 'ប', name: 'ប បាល់', word: 'បាល់', emoji: '⚽', group: 'consonant' },
  { char: 'ផ', name: 'ផ ផ្កា', word: 'ផ្កា', emoji: '🌸', group: 'consonant' },
  { char: 'ព', name: 'ព ពពែ', word: 'ពពែ', emoji: '🐐', group: 'consonant' },
  { char: 'ភ', name: 'ភ ភ្នំ', word: 'ភ្នំ', emoji: '⛰️', group: 'consonant' },
  { char: 'ម', name: 'ម មាន់', word: 'មាន់', emoji: '🐔', group: 'consonant' },
  { char: 'យ', name: 'យ យន្តហោះ', word: 'យន្តហោះ', emoji: '✈️', group: 'consonant' },
  { char: 'រ', name: 'រ រទេះ', word: 'រទេះ', emoji: '🛒', group: 'consonant' },
  { char: 'ល', name: 'ល លា', word: 'លា', emoji: '🐴', group: 'consonant' },
  { char: 'វ', name: 'វ វ៉ែនតា', word: 'វ៉ែនតា', emoji: '👓', group: 'consonant' },
  { char: 'ស', name: 'ស សេះ', word: 'សេះ', emoji: '🐎', group: 'consonant' },
  { char: 'ហ', name: 'ហ ហង្ស', word: 'ហង្ស', emoji: '🦢', group: 'consonant' },
  { char: 'ឡ', name: 'ឡ ឡាន', word: 'ឡាន', emoji: '🚗', group: 'consonant' },
  { char: 'អ', name: 'អ អណ្ដើក', word: 'អណ្ដើក', emoji: '🐢', group: 'consonant' },
];

export const KHMER_VOWELS = [
  { char: 'ា', name: 'ស្រៈ អា', example: 'កា' },
  { char: 'ិ', name: 'ស្រៈ អិ', example: 'កិ' },
  { char: 'ី', name: 'ស្រៈ អី', example: 'កី' },
  { char: 'ឹ', name: 'ស្រៈ អloggedឹ', example: 'កឹ' },
  { char: 'ឺ', name: 'ស្រៈ អឺ', example: 'កឺ' },
  { char: 'ុ', name: 'ស្រៈ អុ', example: 'កុ' },
  { char: 'ូ', name: 'ស្រៈ អូ', example: 'កូ' },
  { char: 'ួ', name: 'ស្រៈ អួ', example: 'កួ' },
  { char: 'ើ', name: 'ស្រៈ អើ', example: 'កើ' },
  { char: 'ឿ', name: 'ស្រៈ អឿ', example: 'កឿ' },
  { char: 'ៀ', name: 'ស្រៈ អៀ', example: 'កៀ' },
  { char: 'េ', name: 'ស្រៈ អេ', example: 'កេ' },
  { char: 'ែ', name: 'ស្រៈ អែ', example: 'កែ' },
  { char: 'ៃ', name: 'ស្រៈ អៃ', example: 'កៃ' },
  { char: 'ោ', name: 'ស្រៈ អោ', example: 'កោ' },
  { char: 'ៅ', name: 'ស្រៈ អៅ', example: 'កៅ' },
  { char: 'ុំ', name: 'ស្រៈ អុំ', example: 'កុំ' },
  { char: 'ំ', name: 'ស្រៈ អំ', example: 'កំ' },
  { char: 'ាំ', name: 'ស្រៈ អាំ', example: 'កាំ' },
  { char: 'ះ', name: 'ស្រៈ អះ', example: 'កះ' },
];
