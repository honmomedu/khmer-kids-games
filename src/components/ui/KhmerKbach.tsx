import React from 'react';

// Ornate Khmer Traditional Corner (ក្បាច់កែងខ្មែរ)
export const KhmerCorner: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-amber-500' }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0 L40 0 C30 2 24 6 20 12 C16 18 14 26 14 40 L0 40 Z" opacity="0.15" />
    <path d="M2 2 L32 2 C26 5 20 9 17 15 C13 21 11 28 10 38 L2 38 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="6" cy="6" r="2.5" />
    <path d="M12 2 C10 8 8 10 2 12 C8 14 10 16 12 22 C14 16 16 14 22 12 C16 10 14 8 12 2 Z" />
    <path d="M20 2 C18 5 17 8 15 10 C18 12 20 15 22 18 C23 15 25 13 28 11 C24 10 22 7 20 2 Z" opacity="0.8" />
  </svg>
);

// Traditional Khmer Lotus & Kbach Floral Centerpiece (ក្បាច់ផ្កាច័ន្ទ / ភ្ញីទេស)
export const KhmerDivider: React.FC<{ className?: string }> = ({ className = 'h-5 text-amber-500' }) => (
  <div className={`flex items-center justify-center gap-2 my-2 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400 to-amber-600 opacity-60"></div>
    <svg viewBox="0 0 120 24" fill="currentColor" className="h-6 w-28 text-amber-500" xmlns="http://www.w3.org/2000/svg">
      {/* Central Lotus Petals */}
      <path d="M60 2 C56 8 54 14 60 22 C66 14 64 8 60 2 Z" />
      <path d="M60 22 C53 16 48 12 42 15 C46 9 52 11 60 22 Z" opacity="0.85" />
      <path d="M60 22 C67 16 72 12 78 15 C74 9 68 11 60 22 Z" opacity="0.85" />
      {/* Side Swirl Tendrils (ភ្ញី) */}
      <path d="M42 15 C34 18 26 14 20 18 C28 14 34 20 42 15 Z" />
      <path d="M78 15 C86 18 94 14 100 18 C92 14 86 20 78 15 Z" />
      {/* Decorative dots */}
      <circle cx="10" cy="18" r="2" />
      <circle cx="110" cy="18" r="2" />
      <circle cx="60" cy="9" r="1.5" fill="#ffffff" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-400 to-amber-600 opacity-60"></div>
  </div>
);

// Sacred Lotus Flower Motif (ផ្កាឈូកខ្មែរ)
export const KhmerLotus: React.FC<{ className?: string }> = ({ className = 'w-8 h-8 text-amber-500' }) => (
  <svg viewBox="0 0 36 36" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Center petal */}
    <path d="M18 3 C15 10 13 18 18 28 C23 18 21 10 18 3 Z" />
    {/* Left petal */}
    <path d="M18 28 C12 22 7 17 5 12 C9 11 14 16 18 28 Z" opacity="0.85" />
    {/* Right petal */}
    <path d="M18 28 C24 22 29 17 31 12 C27 11 22 16 18 28 Z" opacity="0.85" />
    {/* Base water lily pad */}
    <path d="M6 28 C12 32 24 32 30 28 C24 30 12 30 6 28 Z" />
    <circle cx="18" cy="14" r="1.8" fill="#ffffff" />
  </svg>
);

// Traditional Khmer Frame Header with Kbach ornaments
export const KhmerCardFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  badge?: string;
}> = ({ children, className = '', badge }) => {
  return (
    <div className={`relative bg-white rounded-3xl border-2 border-amber-300/80 shadow-md overflow-hidden ${className}`}>
      {/* 4 Corner Traditional Khmer Kbach */}
      <div className="absolute top-0 left-0 pointer-events-none z-10">
        <KhmerCorner className="w-8 h-8 text-amber-500/80" />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none z-10 rotate-90">
        <KhmerCorner className="w-8 h-8 text-amber-500/80" />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none z-10 rotate-180">
        <KhmerCorner className="w-8 h-8 text-amber-500/80" />
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none z-10 -rotate-90">
        <KhmerCorner className="w-8 h-8 text-amber-500/80" />
      </div>

      {children}
    </div>
  );
};
