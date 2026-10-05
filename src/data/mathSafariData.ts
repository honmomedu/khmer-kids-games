export interface MathProblem {
  id: string;
  type: 'count' | 'add' | 'subtract';
  question: string;
  emoji: string;
  num1: number;
  num2?: number;
  answer: number;
  options: number[];
}

export const MATH_SAFARI_PROBLEMS: MathProblem[] = [
  {
    id: 'm1',
    type: 'count',
    question: 'តើមានសត្វស្វាចំនួនប៉ុន្មានក្បាល?',
    emoji: '🐒',
    num1: 5,
    answer: 5,
    options: [3, 4, 5, 6]
  },
  {
    id: 'm2',
    type: 'count',
    question: 'តើមានផ្លែចេកចំនួនប៉ុន្មានផ្លែ?',
    emoji: '🍌',
    num1: 8,
    answer: 8,
    options: [6, 7, 8, 9]
  },
  {
    id: 'm3',
    type: 'add',
    question: 'តើផ្លែប៉ោមទាំងអស់មានចំនួនសរុបប៉ុន្មាន?',
    emoji: '🍎',
    num1: 4,
    num2: 3,
    answer: 7,
    options: [6, 7, 8, 9]
  },
  {
    id: 'm4',
    type: 'add',
    question: 'ដំរី ៥ ក្បាល ជួបដំរី ៤ ក្បាលទៀត តើសរុបមានប៉ុន្មាន?',
    emoji: '🐘',
    num1: 5,
    num2: 4,
    answer: 9,
    options: [8, 9, 10, 11]
  },
  {
    id: 'm5',
    type: 'add',
    question: 'តារាមានស្ករគ្រាប់ ៦ គ្រាប់ ម៉ាក់ឱ្យថែម ៦ គ្រាប់ទៀត តើសរុបប៉ុន្មាន?',
    emoji: '🍬',
    num1: 6,
    num2: 6,
    answer: 12,
    options: [10, 11, 12, 13]
  },
  {
    id: 'm6',
    type: 'subtract',
    question: 'មានការ៉ុត ៧ មើម ទន្សាយស៊ីអស់ ៣ មើម តើនៅសល់ប៉ុន្មាន?',
    emoji: '🥕',
    num1: 7,
    num2: 3,
    answer: 4,
    options: [3, 4, 5, 6]
  },
  {
    id: 'm7',
    type: 'subtract',
    question: 'មានបក្សី ៩ ក្បាល ហើរចេញបាត់ ៤ ក្បាល តើនៅសល់ប៉ុន្មាន?',
    emoji: '🦜',
    num1: 9,
    num2: 4,
    answer: 5,
    options: [4, 5, 6, 7]
  },
  {
    id: 'm8',
    type: 'subtract',
    question: 'មានត្រី ១០ ក្បាល ហែលចេញ ៥ ក្បាល តើនៅសល់ប៉ុន្មាន?',
    emoji: '🐠',
    num1: 10,
    num2: 5,
    answer: 5,
    options: [3, 4, 5, 6]
  },
  {
    id: 'm9',
    type: 'add',
    question: 'តោ ៧ ក្បាល បូកនឹង តោ ៨ ក្បាល តើសរុបមានប៉ុន្មាន?',
    emoji: '🦁',
    num1: 7,
    num2: 8,
    answer: 15,
    options: [13, 14, 15, 16]
  },
  {
    id: 'm10',
    type: 'subtract',
    question: 'មានដូង ១២ ផ្លែ ធ្លាក់បែកអស់ ៤ ផ្លែ តើនៅសល់ប៉ុន្មាន?',
    emoji: '🥥',
    num1: 12,
    num2: 4,
    answer: 8,
    options: [6, 7, 8, 9]
  }
];
