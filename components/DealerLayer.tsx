'use client';

import { useTransform, MotionValue } from 'motion/react';
import { DealerCard } from './CardDeck';

const DECK_CARDS = [
  { id: 1, image: "/carteKinzPlusDix.jpg" },
  { id: 2, image: "/carteKinzPlusHuit.jpg" },
  { id: 3, image: "/carteKinzMoinsTrois.jpg" },
  { id: 4, image: "/carteKinzPlusZero.jpg" },
  { id: 5, image: "/carteKinzPasseTour.jpg" },
];

interface DealerLayerProps {
  scrollYProgress: MotionValue<number>;
}

export default function DealerLayer({ scrollYProgress }: DealerLayerProps) {
  const dealerProgress = useTransform(scrollYProgress, [0.30, 0.95], [0, 1]);

  return (
    <div className="absolute inset-0 z-30 flex h-full items-center justify-center">
      <div className="relative flex items-end justify-center h-[40vh]">
        {DECK_CARDS.map((card, index) => (
          <DealerCard
            key={card.id}
            card={card}
            index={index}
            scrollProgress={dealerProgress}
          />
        ))}
      </div>
    </div>
  );
}
