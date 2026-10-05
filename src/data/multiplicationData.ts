export interface BalloonQuestion {
  factorA: number;
  factorB: number;
  operation: '×' | '÷';
  answer: number;
  options: number[];
}

export function generateMultiplicationQuestion(table?: number): BalloonQuestion {
  const factorA = table && table >= 2 ? table : Math.floor(Math.random() * 8) + 2; // 2 to 9
  const factorB = Math.floor(Math.random() * 9) + 2; // 2 to 10
  const answer = factorA * factorB;

  // Generate 3 clever distractors
  const distractors = new Set<number>();
  while (distractors.size < 3) {
    const offset = (Math.floor(Math.random() * 5) - 2) * factorA || (Math.floor(Math.random() * 7) + 1);
    const candidate = answer + offset;
    if (candidate > 0 && candidate !== answer) {
      distractors.add(candidate);
    }
  }

  const options = Array.from(distractors);
  const insertIdx = Math.floor(Math.random() * (options.length + 1));
  options.splice(insertIdx, 0, answer);

  return {
    factorA,
    factorB,
    operation: '×',
    answer,
    options
  };
}
