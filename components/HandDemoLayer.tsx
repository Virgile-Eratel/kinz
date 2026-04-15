'use client';

import { motion, useTransform, MotionValue } from 'motion/react';
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

const CARD_SPACING = 90;
const ROTATION_FACTOR = 12;
const TOTAL = 5;

interface HandDemoLayerProps {
  scrollYProgress: MotionValue<number>;
}

export default function HandDemoLayer({ scrollYProgress }: HandDemoLayerProps) {
  // Losing hand
  const losingProgress = useTransform(scrollYProgress, [0.36, 0.52], [0, 1]);
  const losingOpacity = useTransform(scrollYProgress, [0.52, 0.58], [1, 0]);
  const losingSlideX = useTransform(scrollYProgress, [0.52, 0.58], [0, 400]);

  // Winning hand
  const winningProgress = useTransform(scrollYProgress, [0.58, 0.74], [0, 1]);
  const winningOpacity = useTransform(scrollYProgress, [0.74, 0.82], [1, 0]);

  return (
    <div className="absolute right-0 top-0 h-full w-[65%] z-20 flex items-center justify-center pointer-events-none">
      {/* Losing hand */}
      <motion.div
        style={{ opacity: losingOpacity, x: losingSlideX }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <HandFan
          cards={LOSING_HAND}
          resultType="error"
          progress={losingProgress}
        />
      </motion.div>

      {/* Winning hand */}
      <motion.div
        style={{ opacity: winningOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <HandFan
          cards={WINNING_HAND}
          resultType="success"
          progress={winningProgress}
        />
      </motion.div>
    </div>
  );
}

// ── HandFan ──

interface HandFanProps {
  cards: { id: number; image: string }[];
  resultType: 'success' | 'error';
  progress: MotionValue<number>;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function HandFan({ cards, resultType, progress }: HandFanProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Animated result indicator above fan */}
      <div className="absolute -top-40 md:-top-52">
        <ResultIndicator type={resultType} progress={progress} />
      </div>

      {/* Card fan */}
      <div className="relative h-[35vh] flex items-end justify-center">
        {cards.map((card, index) => (
          <FanCard key={card.id} card={card} index={index} progress={progress} />
        ))}
      </div>
    </div>
  );
}

// ── ResultIndicator — animated SVG success/error ──

function ResultIndicator({ type, progress }: { type: 'success' | 'error'; progress: MotionValue<number> }) {
  const indicatorScale = useTransform(progress, [0.42, 0.55], [0.6, 1]);
  const indicatorOpacity = useTransform(progress, [0.42, 0.48], [0, 1]);
  const circleLength = useTransform(progress, [0.42, 0.56], [0, 1]);
  const iconLength = useTransform(progress, [0.54, 0.68], [0, 1]);
  const glowOpacity = useTransform(progress, [0.48, 0.62], [0, 0.5]);

  const isSuccess = type === 'success';
  const color = isSuccess ? '#00ACAC' : '#FF38B8';
  const glowColor = isSuccess ? 'bg-lagoon-pop/25' : 'bg-scarlet-pop/25';

  return (
    <div className="relative flex items-center justify-center">
      {/* Soft glow */}
      <motion.div
        style={{ opacity: glowOpacity, scale: indicatorScale }}
        className={`absolute rounded-full ${glowColor} blur-3xl w-44 h-44 md:w-60 md:h-60`}
      />

      {/* SVG circle + icon */}
      <motion.div style={{ opacity: indicatorOpacity, scale: indicatorScale }}>
        <svg viewBox="0 0 100 100" fill="none" className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44">
          {/* Circle outline */}
          <motion.circle
            cx={50} cy={50} r={42}
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ pathLength: circleLength }}
          />

          {isSuccess ? (
            /* Checkmark */
            <motion.path
              d="M 28 52 L 42 66 L 72 34"
              stroke={color}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: iconLength }}
            />
          ) : (
            /* Cross — two strokes */
            <>
              <motion.path
                d="M 33 33 L 67 67"
                stroke={color}
                strokeWidth={4}
                strokeLinecap="round"
                style={{ pathLength: iconLength }}
              />
              <motion.path
                d="M 67 33 L 33 67"
                stroke={color}
                strokeWidth={4}
                strokeLinecap="round"
                style={{ pathLength: iconLength }}
              />
            </>
          )}
        </svg>
      </motion.div>
    </div>
  );
}

// ── FanCard ──

function FanCard({ card, index, progress }: {
  card: { id: number; image: string };
  index: number;
  progress: MotionValue<number>;
}) {
  const centerOffset = index - (TOTAL - 1) / 2;
  const fanX = centerOffset * CARD_SPACING;
  const fanRotation = centerOffset * ROTATION_FACTOR;
  const fanArc = Math.abs(centerOffset) * 20;
  const staggerDelay = index * 0.05;

  const cardOpacity = useTransform(progress, (p) => {
    if (p < staggerDelay) return 0;
    if (p < staggerDelay + 0.02) return (p - staggerDelay) / 0.02;
    return 1;
  });

  const cardX = useTransform(progress, (p) => {
    if (p < staggerDelay) return 0;
    if (p < 0.35) {
      const t = Math.min((p - staggerDelay) / (0.35 - staggerDelay), 1);
      return fanX * easeOut(t);
    }
    return fanX;
  });

  const cardY = useTransform(progress, (p) => {
    if (p < staggerDelay) return 800;
    if (p < 0.35) {
      const t = Math.min((p - staggerDelay) / (0.35 - staggerDelay), 1);
      const eased = easeOut(t);
      return 800 * (1 - eased) + fanArc * eased;
    }
    return fanArc;
  });

  const cardRotation = useTransform(progress, (p) => {
    if (p < staggerDelay) return 0;
    if (p < 0.35) {
      const t = Math.min((p - staggerDelay) / (0.35 - staggerDelay), 1);
      const eased = easeOut(t);
      const initialTilt = index % 2 === 0 ? 3 : -3;
      return initialTilt * (1 - eased) + fanRotation * eased;
    }
    return fanRotation;
  });

  const cardScale = useTransform(progress, (p) => {
    if (p < staggerDelay) return 0.85;
    if (p < 0.35) {
      const t = Math.min((p - staggerDelay) / (0.35 - staggerDelay), 1);
      return 0.85 + 0.15 * easeOut(t);
    }
    return 1;
  });

  return (
    <motion.div
      style={{
        x: cardX,
        y: cardY,
        rotate: cardRotation,
        scale: cardScale,
        opacity: cardOpacity,
        transformOrigin: 'bottom center',
        zIndex: index,
      }}
      className="absolute bottom-0"
    >
      <div className="relative w-[12vw] max-w-[180px] shadow-2xl rounded-xl overflow-hidden">
        <Image
          src={card.image}
          alt="Carte KINZ"
          width={400}
          height={600}
          className="w-full h-auto object-cover block"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
