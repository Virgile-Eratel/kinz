'use client';

import { motion, useTransform, MotionValue } from 'motion/react';

interface RulesPanelProps {
  scrollYProgress: MotionValue<number>;
}

const RULES = [
  { text: ['5 cartes', ' par main'], accentIndex: 0, range: [0.30, 0.35] as const },
  { text: ['Si le total fait ', '15', ", c'est gagné"], accentIndex: 1, range: [0.32, 0.37] as const },
  { text: ['Attention, pas de ', 'cartes actions', ' dans votre main à la fin'], accentIndex: 1, range: [0.34, 0.39] as const },
];

export default function RulesPanel({ scrollYProgress }: RulesPanelProps) {
  // Panel exit
  const panelOpacity = useTransform(scrollYProgress, [0.74, 0.82], [1, 0]);
  const panelY = useTransform(scrollYProgress, [0.74, 0.82], [0, -20]);

  return (
    <motion.div
      style={{ opacity: panelOpacity, y: panelY }}
      className="absolute left-0 top-0 h-full w-[35%] z-20 flex flex-col justify-center px-8 md:px-12 pointer-events-none"
    >
      {/* Invisible spacer — "Objectif 15" heading comes from KeywordsReveal via movement */}
      <div className="text-6xl md:text-8xl font-bold uppercase tracking-tight mb-8 md:mb-12 invisible" aria-hidden="true">
        Objectif 15
      </div>

      {/* Rules */}
      <div className="space-y-6 md:space-y-8">
        {RULES.map((rule, i) => (
          <RuleLine
            key={i}
            parts={rule.text}
            accentIndex={rule.accentIndex}
            scrollYProgress={scrollYProgress}
            range={rule.range}
          />
        ))}
      </div>
    </motion.div>
  );
}

function RuleLine({ parts, accentIndex, scrollYProgress, range }: {
  parts: string[];
  accentIndex: number;
  scrollYProgress: MotionValue<number>;
  range: readonly [number, number];
}) {
  const opacity = useTransform(scrollYProgress, [range[0], range[1]], [0, 1]);
  const y = useTransform(scrollYProgress, [range[0], range[1]], [20, 0]);
  const blur = useTransform(scrollYProgress, [range[0], range[1]], [8, 0]);
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.p
      style={{ opacity, y, filter: filterBlur }}
      className="text-lg md:text-2xl text-foreground/80 leading-relaxed"
    >
      {parts.map((part, i) => (
        i === accentIndex ? (
          <span key={i} className="text-accent font-semibold">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </motion.p>
  );
}
