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
  isolationProgress?: MotionValue<number>;
  lastWordX?: MotionValue<string>;
  lastWordY?: MotionValue<string>;
  lastWordExitOpacity?: MotionValue<number>;
}

export default function KeywordsReveal({ scroll, slideX, slideOpacity, isolationProgress, lastWordX, lastWordY, lastWordExitOpacity }: KeywordsRevealProps) {
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
          isolationProgress={isolationProgress}
          isLastWord={i === WORDS.length - 1}
          lastWordX={lastWordX}
          lastWordY={lastWordY}
          lastWordExitOpacity={lastWordExitOpacity}
        />
      ))}
    </motion.div>
  );
}

function WordLine({ word, color, index, total, scroll, isolationProgress, isLastWord, lastWordX, lastWordY, lastWordExitOpacity }: {
  word: string;
  color: string;
  index: number;
  total: number;
  scroll: MotionValue<number>;
  isolationProgress?: MotionValue<number>;
  isLastWord: boolean;
  lastWordX?: MotionValue<string>;
  lastWordY?: MotionValue<string>;
  lastWordExitOpacity?: MotionValue<number>;
}) {
  // Each word gets its spotlight moment spread across [0.2, 0.8]
  const range = 0.6; // 0.8 - 0.2
  const step = range / total;
  const start = 0.2 + index * step;
  const peak = start + step / 2;
  const end = start + step;

  // For the last word with isolation: rise to 1 and stay (no dim back before isolation kicks in)
  // For others: normal spotlight cycle (dim → bright → dim)
  const spotlightRise = useTransform(scroll, [start, peak], [0.2, 1]);
  const spotlightCycle = useTransform(scroll, [start, peak, end], [0.2, 1, 0.2]);
  const useRise = isLastWord && !!isolationProgress;

  const opacity = useTransform(
    [spotlightRise, spotlightCycle, isolationProgress ?? spotlightCycle, lastWordExitOpacity ?? spotlightCycle],
    ([rise, cycle, isolation, exit]: number[]) => {
      const spotlight = useRise ? rise : cycle;
      if (!isolationProgress) return spotlight;
      if (isLastWord) {
        const base = Math.max(spotlight, isolation);
        return lastWordExitOpacity ? base * exit : base;
      }
      return spotlight * (1 - isolation);
    }
  );

  return (
    <motion.h2
      style={{
        opacity,
        x: isLastWord ? lastWordX : undefined,
        y: isLastWord ? lastWordY : undefined,
      }}
      className={`text-6xl md:text-8xl font-bold uppercase tracking-tight ${color}`}
    >
      {word}
    </motion.h2>
  );
}
