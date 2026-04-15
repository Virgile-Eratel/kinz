'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'motion/react';
import Image from 'next/image';

const LOSING_HAND = [
  { id: 1, image: '/cartes/260322_Cartes-dig_+15.png' },
  { id: 2, image: '/cartes/260322_Cartes-dig_-3.png' },
  { id: 3, image: '/cartes/260322_Cartes-dig_-1.png' },
  { id: 4, image: '/cartes/260322_Cartes-dig_+5.png' },
  { id: 5, image: '/cartes/260322_Cartes-dig-passe-tour.png' },
];

const WINNING_HAND = [
  { id: 1, image: '/cartes/260322_Cartes-dig_+6.png' },
  { id: 2, image: '/cartes/260322_Cartes-dig_+8.png' },
  { id: 3, image: '/cartes/260322_Cartes-dig_-3.png' },
  { id: 4, image: '/cartes/260322_Cartes-dig_+0.png' },
  { id: 5, image: '/cartes/260322_Cartes-dig_+4.png' },
];

const RULES = [
  { parts: ['5 cartes', ' par main'], accentIndex: 0 },
  { parts: ['Si le total fait ', '15', ", c'est gagné"], accentIndex: 1 },
  { parts: ['Attention, pas de ', 'cartes actions', ' dans votre main à la fin'], accentIndex: 1 },
];

export default function CardsShowcaseMobile() {
  const prefersReducedMotion = useReducedMotion();
  const handsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: handsRef,
    offset: ['start start', 'end end'],
  });

  // Fade to charbon at the very end so it blends into the next section
  const charbonOverlay = useTransform(scrollYProgress, [0.90, 1.0], [0, 1]);

  const fadeUp = prefersReducedMotion
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      aria-label="Règles du jeu KINZ"
      className="relative bg-background"
    >
      {/* Title */}
      <div className="px-6 pt-20 pb-8 text-center">
        <motion.h2
          {...fadeUp}
          className="text-6xl sm:text-7xl font-bold uppercase tracking-tight text-primary leading-[0.9]"
        >
          Objectif <span className="text-accent">15</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-5 text-base text-foreground/70 max-w-md mx-auto"
        >
          Un jeu de cartes simple, rapide et malin.
        </motion.p>
      </div>

      {/* Rules — editorial style */}
      <div className="relative px-8 pb-20 pt-4 max-w-lg mx-auto">
        {RULES.map((rule, i) => (
          <motion.div
            key={i}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative py-8"
          >
            <div className="absolute left-0 right-0 top-0 flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-accent">
                {String(i + 1).padStart(2, '0')} / {String(RULES.length).padStart(2, '0')}
              </span>
              <div className="h-px flex-1 bg-foreground/15" />
            </div>
            <p className="text-[1.65rem] leading-[1.15] font-semibold tracking-tight text-foreground">
              {rule.parts.map((part, j) =>
                j === rule.accentIndex ? (
                  <span key={j} className="text-accent">
                    {part}
                  </span>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </p>
          </motion.div>
        ))}
        <div className="h-px w-full bg-foreground/15" />
      </div>

      {/* Sticky scroll-driven hand showcase */}
      <div ref={handsRef} className="relative" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HandScene
            cards={WINNING_HAND}
            tone="success"
            label="Ça gagne !"
            description="Le total fait 15 pile — victoire."
            scrollYProgress={scrollYProgress}
            cardsIn={[0.0, 0.1]}
            labelIn={[0.12, 0.2]}
            exitRange={[0.3, 0.4]}
            circleRange={[0.13, 0.2]}
            iconRange={[0.18, 0.24]}
          />
          <HandScene
            cards={LOSING_HAND}
            tone="error"
            label="Perdu"
            description="Une carte action reste en main, la manche est perdue."
            scrollYProgress={scrollYProgress}
            cardsIn={[0.45, 0.55]}
            labelIn={[0.57, 0.65]}
            exitRange={[0.78, 0.88]}
            circleRange={[0.58, 0.65]}
            iconRange={[0.63, 0.69]}
          />

          {/* Charbon overlay — fades in at end for transition to next section */}
          <motion.div
            aria-hidden
            style={{ opacity: charbonOverlay }}
            className="absolute inset-0 bg-charbon pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}

interface HandSceneProps {
  cards: { id: number; image: string }[];
  tone: 'success' | 'error';
  label: string;
  description: string;
  scrollYProgress: MotionValue<number>;
  cardsIn: [number, number];
  labelIn: [number, number];
  exitRange: [number, number];
  circleRange: [number, number];
  iconRange: [number, number];
}

function HandScene({
  cards,
  tone,
  label,
  description,
  scrollYProgress,
  cardsIn,
  labelIn,
  exitRange,
  circleRange,
  iconRange,
}: HandSceneProps) {
  const color = tone === 'success' ? '#00ACAC' : '#FF38B8';
  const labelClass = tone === 'success' ? 'text-lagoon-pop' : 'text-scarlet-pop';
  const glowClass = tone === 'success' ? 'bg-lagoon-pop/30' : 'bg-scarlet-pop/30';

  // Cards: fade in, stay, fade out
  const cardsOpacity = useTransform(
    scrollYProgress,
    [cardsIn[0], cardsIn[1], exitRange[0], exitRange[1]],
    [0, 1, 1, 0]
  );
  const cardsY = useTransform(scrollYProgress, [cardsIn[0], cardsIn[1]], [80, 0]);
  const cardsExitX = useTransform(
    scrollYProgress,
    [exitRange[0], exitRange[1]],
    [0, tone === 'success' ? 260 : -260]
  );

  // Label + indicator + description: fade in later, exit with cards
  const labelOpacity = useTransform(
    scrollYProgress,
    [labelIn[0], labelIn[1], exitRange[0], exitRange[1]],
    [0, 1, 1, 0]
  );
  const labelY = useTransform(scrollYProgress, [labelIn[0], labelIn[1]], [24, 0]);

  // Indicator SVG path drawing
  const circleLength = useTransform(scrollYProgress, circleRange, [0, 1]);
  const iconLength = useTransform(scrollYProgress, iconRange, [0, 1]);

  return (
    <div className="absolute inset-0 flex flex-col items-center px-3 pt-16 pointer-events-none">
      {/* Top: indicator + label */}
      <motion.div
        style={{ opacity: labelOpacity, y: labelY }}
        className="relative flex flex-col items-center gap-3"
      >
        {/* Soft glow */}
        <div
          aria-hidden
          className={`absolute top-2 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full ${glowClass} blur-3xl`}
        />
        <svg viewBox="0 0 100 100" fill="none" className="relative h-24 w-24">
          <motion.circle
            cx={50}
            cy={50}
            r={42}
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
            style={{ pathLength: circleLength }}
          />
          {tone === 'success' ? (
            <motion.path
              d="M 28 52 L 42 66 L 72 34"
              stroke={color}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ pathLength: iconLength }}
            />
          ) : (
            <>
              <motion.path
                d="M 33 33 L 67 67"
                stroke={color}
                strokeWidth={5}
                strokeLinecap="round"
                fill="none"
                style={{ pathLength: iconLength }}
              />
              <motion.path
                d="M 67 33 L 33 67"
                stroke={color}
                strokeWidth={5}
                strokeLinecap="round"
                fill="none"
                style={{ pathLength: iconLength }}
              />
            </>
          )}
        </svg>
        <p className={`relative text-6xl sm:text-6xl font-bold uppercase tracking-tight ${labelClass}`}>
          {label}
        </p>
      </motion.div>

      {/* Card fan — big, placed right below the label */}
      <motion.div
        style={{ opacity: cardsOpacity, y: cardsY, x: cardsExitX }}
        className="relative mt-6 flex h-[44vh] w-full items-end justify-center"
      >
        {cards.map((card, index) => {
          const centerOffset = index - (cards.length - 1) / 2;
          return (
            <div
              key={card.id}
              className="absolute bottom-4"
              style={{
                transform: `rotate(${centerOffset * 7}deg) translateX(${centerOffset * 44}px)`,
                transformOrigin: 'bottom center',
                zIndex: index,
              }}
            >
              <div className="relative w-[38vw] max-w-[180px] overflow-hidden rounded-2xl shadow-2xl shadow-charbon/40">
                <Image
                  src={card.image}
                  alt="Carte KINZ"
                  width={300}
                  height={450}
                  className="block h-auto w-full object-cover"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Description — anchored to bottom of viewport */}
      <motion.p
        style={{ opacity: labelOpacity, y: labelY }}
        className="absolute inset-x-6 bottom-10 mx-auto max-w-xs text-center text-base font-medium text-foreground/80"
      >
        {description}
      </motion.p>
    </div>
  );
}
