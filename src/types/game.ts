export type Category = 'all' | 'khmer' | 'math' | 'wheel' | 'brain';

export interface GameInfo {
  id: string;
  number: number;
  titleKhmer: string;
  titleEn: string;
  descriptionKhmer: string;
  category: 'khmer' | 'math' | 'wheel' | 'brain';
  icon: string; // emoji or icon identifier
  color: string;
  gradient: string;
  badge: string;
}
