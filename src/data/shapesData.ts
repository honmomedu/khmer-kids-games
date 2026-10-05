export interface ShapeInfo {
  id: string;
  nameKhmer: string;
  sides: number;
  corners: number;
  icon: string;
  color: string;
  description: string;
}

export const SHAPES_LIST: ShapeInfo[] = [
  {
    id: 'circle',
    nameKhmer: 'រង្វង់',
    sides: 0,
    corners: 0,
    icon: '⭕',
    color: 'bg-red-500',
    description: 'គ្មានជ្រុង និងគ្មានកំពូលទេ មានរាងមូល'
  },
  {
    id: 'triangle',
    nameKhmer: 'ត្រីកោណ',
    sides: 3,
    corners: 3,
    icon: '🔺',
    color: 'bg-amber-500',
    description: 'មានជ្រុង ៣ និងកំពូល ៣'
  },
  {
    id: 'square',
    nameKhmer: 'ការ៉េ',
    sides: 4,
    corners: 4,
    icon: '🟩',
    color: 'bg-emerald-500',
    description: 'មានជ្រុង ៤ ប្រវែងស្មើគ្នា និងមុំកែង ៤'
  },
  {
    id: 'rectangle',
    nameKhmer: 'ចតុកោណកែង',
    sides: 4,
    corners: 4,
    icon: '🟦',
    color: 'bg-blue-500',
    description: 'មានជ្រុង ៤ (ជ្រុងឈមគ្នាស្មើគ្នា) និងមុំកែង ៤'
  },
  {
    id: 'pentagon',
    nameKhmer: 'បញ្ចកោណ',
    sides: 5,
    corners: 5,
    icon: '⬟',
    color: 'bg-purple-500',
    description: 'មានជ្រុង ៥ និងកំពូល ៥'
  },
  {
    id: 'star',
    nameKhmer: 'ផ្កាយ',
    sides: 10,
    corners: 5,
    icon: '⭐',
    color: 'bg-yellow-400',
    description: 'មានចុងស្រួចចំនួន ៥'
  }
];

export interface ShapeQuiz {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export const SHAPE_QUIZZES: ShapeQuiz[] = [
  {
    question: 'តើរូបធរណីមាត្រណាដែលមានជ្រុងចំនួន ៣ ?',
    options: ['រង្វង់', 'ត្រីកោណ', 'ការ៉េ', 'ចតុកោណកែង'],
    answer: 'ត្រីកោណ',
    explanation: 'ត្រីកោណមានជ្រុង ៣ និងកំពូល ៣'
  },
  {
    question: 'តើរូបរង្វង់មានជ្រុងចំនួនប៉ុន្មាន?',
    options: ['០', '១', '២', '៤'],
    answer: '០',
    explanation: 'រង្វង់គ្មានជ្រុង និងគ្មានកំពូលឡើយ'
  },
  {
    question: 'តើរូបណាដែលមានជ្រុង ៤ ប្រវែងស្មើគ្នាទាំងអស់?',
    options: ['ការ៉េ', 'ត្រីកោណ', 'រង្វង់', 'ពងក្រពើ'],
    answer: 'ការ៉េ',
    explanation: 'ការ៉េមានជ្រុងទាំង ៤ ប្រវែងស្មើគ្នា'
  },
  {
    question: 'តើរូបបញ្ចកោណ មានជ្រុងចំនួនប៉ុន្មាន?',
    options: ['៤', '៥', '៦', '៨'],
    answer: '៥',
    explanation: 'បញ្ច ប្រែថា ប្រាំ (៥ ជ្រុង)'
  },
  {
    question: 'តើទ្វារផ្ទះ ឬទូទឹកកក មានរាងស្រដៀងនឹងរូបអ្វី?',
    options: ['ចតុកោណកែង', 'ត្រីកោណ', 'រង្វង់', 'ផ្កាយ'],
    answer: 'ចតុកោណកែង',
    explanation: 'ទ្វារ និងទូទឹកកកភាគច្រើនមានរាងចតុកោណកែង'
  }
];
