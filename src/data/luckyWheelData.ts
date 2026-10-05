export interface WheelSlice {
  label: string;
  type: 'question' | 'bonus' | 'task';
  color: string;
  category?: 'khmer' | 'math' | 'general' | 'science';
  points?: number;
}

export const DEFAULT_WHEEL_SLICES: WheelSlice[] = [
  { label: 'ភាសាខ្មែរ', type: 'question', color: '#f59e0b', category: 'khmer' },
  { label: 'ផ្កាយ +5 ⭐', type: 'bonus', color: '#10b981', points: 5 },
  { label: 'គណិតវិទ្យា', type: 'question', color: '#3b82f6', category: 'math' },
  { label: 'ចំណេះដឹងទូទៅ', type: 'question', color: '#8b5cf6', category: 'general' },
  { label: 'ច្រៀងមួយបទ 🎶', type: 'task', color: '#ec4899' },
  { label: 'វិទ្យាសាស្ត្រ', type: 'question', color: '#06b6d4', category: 'science' },
  { label: 'ផ្កាយ +10 🌟', type: 'bonus', color: '#eab308', points: 10 },
  { label: 'ធ្វើកាយវិការសត្វ 🐒', type: 'task', color: '#f97316' },
];

export interface WheelQuestion {
  category: 'khmer' | 'math' | 'general' | 'science';
  question: string;
  options: string[];
  answer: string;
}

export const WHEEL_QUESTIONS: WheelQuestion[] = [
  {
    category: 'khmer',
    question: 'តើព្យញ្ជនៈខ្មែរមានទាំងអស់ចំនួនប៉ុន្មានតួ?',
    options: ['៣១ តួ', '៣៣ តួ', '៣៥ តួ', '៣៧ តួ'],
    answer: '៣៣ តួ'
  },
  {
    category: 'khmer',
    question: 'តើតួអក្សរណាជាព្យញ្ជនៈទីមួយក្នុងភាសាខ្មែរ?',
    options: ['ខ', 'គ', 'ក', 'អ'],
    answer: 'ក'
  },
  {
    category: 'math',
    question: 'គណនា៖ ៩ + ៨ = ?',
    options: ['១៦', '១៧', '១៨', '១៩'],
    answer: '១៧'
  },
  {
    category: 'math',
    question: 'គណនា៖ ៦ x ៧ = ?',
    options: ['៤០', '៤២', '៤៤', '៤៨'],
    answer: '៤២'
  },
  {
    category: 'general',
    question: 'តើប្រាសាទអង្គរវត្តមានទីតាំងស្ថិតនៅក្នុងខេត្តណា?',
    options: ['សៀមរាប', 'បាត់ដំបង', 'កំពង់ធំ', 'ភ្នំពេញ'],
    answer: 'សៀមរាប'
  },
  {
    category: 'general',
    question: 'តើទង់ជាតិកម្ពុជាមានប៉ុន្មានពណ៌?',
    options: ['២ ពណ៌', '៣ ពណ៌', '៤ ពណ៌', '៥ ពណ៌'],
    answer: '៣ ពណ៌'
  },
  {
    category: 'science',
    question: 'តើដើមឈើបញ្ចេញឧស្ម័នអ្វីសម្រាប់ឱ្យមនុស្សដកដង្ហើម?',
    options: ['អុកស៊ីសែន', 'កាបូនិច', 'អ៊ីដ្រូសែន', 'អាសូត'],
    answer: 'អុកស៊ីសែន'
  },
  {
    category: 'science',
    question: 'តើសត្វណាខ្លះដែលជាសត្វរស់ក្នុងទឹក?',
    options: ['មាន់ និងទា', 'ត្រី និងបង្កង', 'គោ និងក្របី', 'ស្វា និងខ្លា'],
    answer: 'ត្រី និងបង្កង'
  }
];
