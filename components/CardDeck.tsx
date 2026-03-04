'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import Image from 'next/image';

const CARDS = [
  { id: 1, image: "/carteKinzPlusDix.jpg" },
  { id: 2, image: "/carteKinzPlusHuit.jpg" },
  { id: 3, image: "/carteKinzMoinsTrois.jpg" },
  { id: 4, image: "/carteKinzPlusZero.jpg" },
  { id: 5, image: "/carteKinzPasseTour.jpg" },
];

const CARD_SPACING = 80;
const ROTATION_FACTOR = 15;
const TOTAL = CARDS.length;

export default function CardDeck() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="relative flex items-end justify-center">
          {CARDS.map((card, index) => (
            <DealerCard
              key={card.id}
              card={card}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Card {
  id: number;
  image: string;
}

interface DealerCardProps {
  card: Card;
  index: number;
  scrollProgress: MotionValue<number>;
}

export function DealerCard({ card, index, scrollProgress }: DealerCardProps) {
  const arrivalStart = index * 0.15;
  const arrivalEnd = arrivalStart + 0.15;

  // Continuous card count — no Math.floor, so cards glide into new positions
  const getSmoothedN = (progress: number) => {
    const arrivedSmooth = Math.min(progress / 0.15, TOTAL);
    return Math.max(arrivedSmooth, index + 1);
  };

  // Ease-out cubic for smooth deceleration on entry
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const opacity = useTransform(
    scrollProgress,
    [arrivalStart, arrivalStart + 0.02],
    [0, 1]
  );

  const entryScale = useTransform(
    scrollProgress,
    [arrivalStart, arrivalEnd],
    [0.85, 1]
  );

  // X: card targets its correct fan position from the start of entry
  const cardX = useTransform(scrollProgress, (progress) => {
    if (progress < arrivalStart) return 0;

    const currentN = getSmoothedN(progress);
    const centerOffset = index - (currentN - 1) / 2;
    const targetX = centerOffset * CARD_SPACING;

    if (progress < arrivalEnd) {
      const t = (progress - arrivalStart) / 0.15;
      return targetX * easeOut(t);
    }

    return targetX;
  });

  // Rotation: smooth blend from entry tilt to progressive fan rotation
  const rotation = useTransform(scrollProgress, (progress) => {
    if (progress < arrivalStart) return 0;

    const currentN = getSmoothedN(progress);
    const centerOffset = index - (currentN - 1) / 2;
    const amplification = Math.min(currentN / TOTAL, 1);
    const targetRotation = centerOffset * ROTATION_FACTOR * amplification;

    if (progress < arrivalEnd) {
      const t = (progress - arrivalStart) / 0.15;
      const eased = easeOut(t);
      const initialTilt = index % 2 === 0 ? 3 : -3;
      return initialTilt * (1 - eased) + targetRotation * eased;
    }

    return targetRotation;
  });

  // Y: single transform combining entry slide-up + fan arc
  const cardY = useTransform(scrollProgress, (progress) => {
    if (progress < arrivalStart) return 1200;

    const currentN = getSmoothedN(progress);
    const centerOffset = index - (currentN - 1) / 2;
    const fanArc = Math.abs(centerOffset) * 20;

    if (progress < arrivalEnd) {
      const t = (progress - arrivalStart) / 0.15;
      const eased = easeOut(t);
      return 1200 * (1 - eased) + fanArc * eased;
    }

    return fanArc;
  });

  return (
    <motion.div
      style={{
        rotate: rotation,
        x: cardX,
        y: cardY,
        scale: entryScale,
        opacity,
        transformOrigin: "bottom center",
        zIndex: index,
      }}
      className="absolute bottom-0"
    >
      <div className="relative w-[40vw] max-w-[300px] shadow-2xl rounded-xl overflow-hidden border border-white/10">
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
