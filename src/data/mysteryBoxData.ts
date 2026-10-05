export interface MysteryBoxQuestion {
  boxNumber: number;
  icon: string;
  category: string;
  question: string;
  options: string[];
  answer: string;
  points: number;
}

export const MYSTERY_BOXES: MysteryBoxQuestion[] = [
  {
    boxNumber: 1,
    icon: '🎁',
    category: 'ចំណេះដឹងទូទៅ',
    question: 'តើភ្នំដែលខ្ពស់ជាងគេនៅប្រទេសកម្ពុជាឈ្មោះអ្វី?',
    options: ['ភ្នំឱរ៉ាល់', 'ភ្នំបូកគោ', 'ភ្នំគូលែន', 'ភ្នំដងរែក'],
    answer: 'ភ្នំឱរ៉ាល់',
    points: 10
  },
  {
    boxNumber: 2,
    icon: '📦',
    category: 'ភាសាខ្មែរ',
    question: 'តើពាក្យ «សិស្ស» មានព្យញ្ជនៈដើមជាអ្វី?',
    options: ['ស', 'ិ', 'ស្ស', 'សិ'],
    answer: 'ស',
    points: 10
  },
  {
    boxNumber: 3,
    icon: '💎',
    category: 'គណិតវិទ្យា',
    question: 'ក្នុងមួយសប្ដាហ៍មាន ៧ ថ្ងៃ តើ ៣ សប្ដាហ៍មានប៉ុន្មានថ្ងៃ?',
    options: ['១៤ ថ្ងៃ', '២០ ថ្ងៃ', '២១ ថ្ងៃ', '២៤ ថ្ងៃ'],
    answer: '២១ ថ្ងៃ',
    points: 15
  },
  {
    boxNumber: 4,
    icon: '⭐',
    category: 'វិទ្យាសាស្ត្រ',
    question: 'តើសត្វណាជាស្ដេចនៃព្រៃព្រឹក្សា?',
    options: ['ដំរី', 'តោ', 'ទន្សាយ', 'ក្ដាន់'],
    answer: 'តោ',
    points: 10
  },
  {
    boxNumber: 5,
    icon: '🏆',
    category: 'ប្រវត្តិសាស្ត្រ',
    question: 'តើព្រះមហាក្សត្រអង្គណាដែលកសាងប្រាសាទបាយ័ន?',
    options: ['ព្រះបាទជ័យវរ្ម័នទី ៧', 'ព្រះបាទសូរ្យវរ្ម័នទី ២', 'ព្រះបាទជ័យវរ្ម័នទី ២', 'ព្រះបាទនរោត្តម'],
    answer: 'ព្រះបាទជ័យវរ្ម័នទី ៧',
    points: 20
  },
  {
    boxNumber: 6,
    icon: '🎉',
    category: 'គណិតវិទ្យា',
    question: 'តើលេខ ៥០ បូក ៥០ ស្មើនឹងប៉ុន្មាន?',
    options: ['៨០', '៩០', '១០០', '១២០'],
    answer: '១០០',
    points: 10
  },
  {
    boxNumber: 7,
    icon: '🎀',
    category: 'ភាសាខ្មែរ',
    question: 'តើពាក្យផ្ទុយនៃពាក្យ «ឧស្សាហ៍» គឺអ្វី?',
    options: ['ខ្ជិល', 'ឆ្លាត', 'ស្ងប់ស្ងាត់', 'ក្លាហាន'],
    answer: 'ខ្ជិល',
    points: 10
  },
  {
    boxNumber: 8,
    icon: '🌟',
    category: 'សុខភាព',
    question: 'មុនពេលញ៉ាំអាហារ តើយើងគួរធ្វើអ្វីមុនគេ?',
    options: ['លាងដៃឱ្យស្អាតនឹងសាប៊ូ', 'ផឹកទឹកកក', 'រត់លេង', 'ដេក'],
    answer: 'លាងដៃឱ្យស្អាតនឹងសាប៊ូ',
    points: 10
  },
  {
    boxNumber: 9,
    icon: '🎈',
    category: 'គណិតវិទ្យា',
    question: 'តើលេខសេសក្នុងចំណោមលេខទាំងនេះគឺលេខណា?',
    options: ['២', '៤', '៦', '៧'],
    answer: '៧',
    points: 15
  },
  {
    boxNumber: 10,
    icon: '🎖️',
    category: 'បរិស្ថាន',
    question: 'តើយើងគួរចោលសម្រាមនៅកន្លែងណា?',
    options: ['ក្នុងធុងសម្រាម', 'លើផ្លូវថ្នល់', 'ក្នុងទឹកស្ទឹង', 'ក្រោមតុ'],
    answer: 'ក្នុងធុងសម្រាម',
    points: 10
  },
  {
    boxNumber: 11,
    icon: '🚀',
    category: 'វិទ្យាសាស្ត្រ',
    question: 'តើភពផែនដីរបស់យើងវិលជុំវិញអ្វី?',
    options: ['ព្រះអាទិត្យ', 'ព្រះចន្ទ', 'ផ្កាយព្រឹក', 'ភពអង្គារ'],
    answer: 'ព្រះអាទិត្យ',
    points: 20
  },
  {
    boxNumber: 12,
    icon: '👑',
    category: 'សំណួរពិសេស',
    question: 'តើកម្ពុជាចូលជាសមាជិកអាស៊ាន (ASEAN) នៅឆ្នាំណា?',
    options: ['១៩៩៣', '១៩៩៧', '១៩៩៩', '២០០៤'],
    answer: '១៩៩៩',
    points: 25
  },
];
