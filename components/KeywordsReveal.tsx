'use client';

import { motion, useTransform, useReducedMotion, MotionValue } from 'motion/react';

const WORDS = [
  { text: "Simple", color: "text-primary" },
  { text: "Rapide", color: "text-accent" },
  { text: "Convivial", color: "text-accent" },
  { text: "Objectif 15", color: "text-primary" },
];

interface KeywordsRevealProps {
  scroll: MotionValue<number>;
  slideX?: MotionValue<string>;
  slideOpacity?: MotionValue<number>;
}

export default function KeywordsReveal({ scroll, slideX, slideOpacity }: KeywordsRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // Global text container: fade in at 20%, stay visible, fade out at 85-100%
  const textOpacity = useTransform(scroll, [0.2, 0.35, 0.85, 1], [0, 1, 1, 0]);
  const textScale = useTransform(scroll, [0.85, 1], [1, 0.9]);

  // Combine internal opacity with slide-out opacity (min of both)
  const combinedOpacity = useTransform(
    [textOpacity, slideOpacity ?? textOpacity] as const,
    ([a, b]: number[]) => Math.min(a, b)
  );

  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 z-15 flex flex-col items-center justify-center pointer-events-none">
        {WORDS.map((word) => (
          <h2 key={word.text} className={`text-6xl md:text-8xl font-bold uppercase tracking-tight ${word.color}`}>
            {word.text}
          </h2>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      style={{
        opacity: slideOpacity ? combinedOpacity : textOpacity,
        scale: textScale,
        x: slideX,
      }}
      className="absolute inset-0 z-15 flex flex-col items-center justify-center pointer-events-none"
    >
      {WORDS.map((word, i) => (
        <WordLine
          key={word.text}
          word={word.text}
          color={word.color}
          index={i}
          total={WORDS.length}
          scroll={scroll}
        />
      ))}
    </motion.div>
  );
}

function WordLine({ word, color, index, total, scroll }: {
  word: string;
  color: string;
  index: number;
  total: number;
  scroll: MotionValue<number>;
}) {
  // Each word gets its spotlight moment spread across [0.2, 0.8]
  const range = 0.6; // 0.8 - 0.2
  const step = range / total;
  const start = 0.2 + index * step;
  const peak = start + step / 2;
  const end = start + step;

  const opacity = useTransform(scroll, [start, peak, end], [0.2, 1, 0.2]);

  return (
    <motion.h2
      style={{ opacity }}
      className={`text-6xl md:text-8xl font-bold uppercase tracking-tight ${color}`}
    >
      {word}
    </motion.h2>
  );
}
