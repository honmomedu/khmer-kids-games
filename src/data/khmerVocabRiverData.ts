export interface VocabQuestion {
  id: string;
  type: 'antonym' | 'synonym';
  word: string;
  question: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

export const VOCAB_QUESTIONS: VocabQuestion[] = [
  {
    id: 'v1',
    type: 'antonym',
    word: 'ធំ',
    question: 'តើពាក្យណាជាពាក្យផ្ទុយនឹងពាក្យ «ធំ» ?',
    correctAnswer: 'តូច',
    options: ['តូច', 'ខ្ពស់', 'វែង', 'ទាប'],
    explanation: '«ធំ» ផ្ទុយនឹង «តូច» (Big ↔ Small)'
  },
  {
    id: 'v2',
    type: 'antonym',
    word: 'ខ្ពស់',
    question: 'តើពាក្យណាជាពាក្យផ្ទុយនឹងពាក្យ «ខ្ពស់» ?',
    correctAnswer: 'ទាប',
    options: ['វែង', 'ទាប', 'ខ្លី', 'ស្ដើង'],
    explanation: '«ខ្ពស់» ផ្ទុយនឹង «ទាប» (Tall ↔ Short)'
  },
  {
    id: 'v3',
    type: 'antonym',
    word: 'សប្បាយ',
    question: 'តើពាក្យណាជាពាក្យផ្ទុយនឹងពាក្យ «សប្បាយ» ?',
    correctAnswer: 'កើតទុក្ខ',
    options: ['រីករាយ', 'ញញឹម', 'កើតទុក្ខ', 'ខឹង'],
    explanation: '«សប្បាយ» ផ្ទុយនឹង «កើតទុក្ខ» (Happy ↔ Sad)'
  },
  {
    id: 'v4',
    type: 'antonym',
    word: 'លឿន',
    question: 'តើពាក្យណាជាពាក្យផ្ទុយនឹងពាក្យ «លឿន» ?',
    correctAnswer: 'យឺត',
    options: ['យឺត', 'រហ័ស', 'ឈប់', 'ដើរ'],
    explanation: '«លឿន» ផ្ទុយនឹង «យឺត» (Fast ↔ Slow)'
  },
  {
    id: 'v5',
    type: 'antonym',
    word: 'ក្ដៅ',
    question: 'តើពាក្យណាជាពាក្យផ្ទុយនឹងពាក្យ «ក្ដៅ» ?',
    correctAnswer: 'ត្រជាក់',
    options: ['ក្ដៅស្អុះ', 'ត្រជាក់', 'រងារ', 'ក្តៅឧណ្ហៗ'],
    explanation: '«ក្ដៅ» ផ្ទុយនឹង «ត្រជាក់» (Hot ↔ Cold)'
  },
  {
    id: 'v6',
    type: 'antonym',
    word: 'ស្អាត',
    question: 'តើពាក្យណាជាពាក្យផ្ទុយនឹងពាក្យ «ស្អាត» ?',
    correctAnswer: 'កខ្វក់',
    options: ['ភ្លឺ', 'ស្រស់', 'កខ្វក់', 'ល្អ'],
    explanation: '«ស្អាត» ផ្ទុយនឹង «កខ្វក់» (Clean ↔ Dirty)'
  },
  {
    id: 'v7',
    type: 'antonym',
    word: 'ងងឹត',
    question: 'តើពាក្យណាជាពាក្យផ្ទុយនឹងពាក្យ «ងងឹត» ?',
    correctAnswer: 'ភ្លឺ',
    options: ['ភ្លឺ', 'យប់', 'ស្រមោល', 'ខ្មៅ'],
    explanation: '«ងងឹត» ផ្ទុយនឹង «ភ្លឺ» (Dark ↔ Bright)'
  },
  {
    id: 'v8',
    type: 'synonym',
    word: 'ព្រះអាទិត្យ',
    question: 'តើពាក្យណាមានន័យដូចពាក្យ «ព្រះអាទិត្យ» ?',
    correctAnswer: 'សុរិយា',
    options: ['ចន្ទ្រា', 'សុរិយា', 'ពពក', 'តារា'],
    explanation: '«ព្រះអាទិត្យ» មានន័យដូចពាក្យ «សុរិយា / ទិនករ»'
  },
  {
    id: 'v9',
    type: 'synonym',
    word: 'ទឹក',
    question: 'តើពាក្យណាមានន័យដូចពាក្យ «ទឹក» ?',
    correctAnswer: 'គង្គា',
    options: ['គង្គា', 'អគ្គិ', 'វាយោ', 'បឋវី'],
    explanation: '«ទឹក» មានន័យដូចពាក្យ «គង្គា / វារី»'
  },
  {
    id: 'v10',
    type: 'synonym',
    word: 'ភ្នែក',
    question: 'តើពាក្យណាមានន័យដូចពាក្យ «ភ្នែក» ?',
    correctAnswer: 'នេត្រា',
    options: ['ហត្ថា', 'នេត្រា', 'កេសា', 'ទន្ត'],
    explanation: '«ភ្នែក» មានន័យដូចពាក្យ «នេត្រា / ចក្ខុ»'
  }
];
