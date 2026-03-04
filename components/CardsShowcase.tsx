'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import KeywordsReveal from './KeywordsReveal';
import { DealerCard } from './CardDeck';

const DECK_CARDS = [
  { id: 1, image: "/carteKinzPlusDix.jpg" },
  { id: 2, image: "/carteKinzPlusHuit.jpg" },
  { id: 3, image: "/carteKinzMoinsTrois.jpg" },
  { id: 4, image: "/carteKinzPlusZero.jpg" },
  { id: 5, image: "/carteKinzPasseTour.jpg" },
];

export default function CardsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Layer 1: ScatterCards (phase 0.00–0.30) ──
  // Card 1 (front) — exits left
  const card1X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '-80vw']);
  const card1Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '10vh']);
  const card1Rotate = useTransform(scrollYProgress, [0, 0.30], [0, -15]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.30], [1, 1.3]);

  // Card 2 (back) — exits right
  const card2X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '80vw']);
  const card2Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '8vh']);
  const card2Rotate = useTransform(scrollYProgress, [0, 0.30], [5, 20]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.30], [1, 1.3]);

  // ── Layer 2: KeywordsReveal (phase 0.00–0.45) ──
  // Remap [0, 0.30] → [0, 0.85] so keywords stay fully visible at end (textOpacity=1 at 0.85)
  const keywordsInternalProgress = useTransform(scrollYProgress, [0, 0.30], [0, 0.85]);

  // Slide-out left (phase 0.30–0.45)
  const keywordsSlideX = useTransform(scrollYProgress, [0.30, 0.45], ['0vw', '-120vw']);
  const keywordsSlideOpacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0]);

  // ── Layer 3: CardDeck dealer (phase 0.35–0.95) ──
  // Remap so DealerCard's internal 0→1 timing maps to this window
  const dealerProgress = useTransform(scrollYProgress, [0.35, 0.95], [0, 1]);

  if (shouldReduceMotion) {
    return (
      <section className="relative bg-background">
        <div className="flex h-screen w-full items-center justify-center">
          <div className="relative z-10 flex items-end justify-center">
            {DECK_CARDS.map((card, index) => {
              const centerOffset = index - (DECK_CARDS.length - 1) / 2;
              return (
                <div
                  key={card.id}
                  className="absolute bottom-0"
                  style={{
                    transform: `rotate(${centerOffset * 15}deg) translateX(${centerOffset * 150}px)`,
                    transformOrigin: 'bottom center',
                    zIndex: index,
                  }}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] bg-background"
      aria-hidden="true"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Layer 2: KeywordsReveal (z-15) */}
        <KeywordsReveal
          scroll={keywordsInternalProgress}
          slideX={keywordsSlideX}
          slideOpacity={keywordsSlideOpacity}
        />

        {/* Layer 1: ScatterCards */}
        <div className="relative">
          {/* Card 2 — back (z-10) */}
          <motion.div
            className="absolute z-10"
            style={{
              x: card2X,
              y: card2Y,
              rotate: card2Rotate,
              scale: card2Scale,
              right: '-15%',
              bottom: '-10%',
            }}
          >
            <div className="animate-float-fast">
              <div className="relative w-[50vw] max-w-[250px] md:w-[35vw] md:max-w-[300px] shadow-2xl rounded-xl overflow-hidden">
                <Image
                  src="/carteKinzPasseTour.jpg"
                  alt="Carte KINZ Passe Tour"
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover block"
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>

          {/* Card 1 — front (z-20) */}
          <motion.div
            className="relative z-20"
            style={{
              x: card1X,
              y: card1Y,
              rotate: card1Rotate,
              scale: card1Scale,
              left: '-10%',
              top: '-5%',
            }}
          >
            <div className="animate-float-slow">
              <div className="relative w-[50vw] max-w-[250px] md:w-[35vw] md:max-w-[300px] shadow-2xl rounded-xl overflow-hidden">
                <Image
                  src="/carteKinzBase.jpg"
                  alt="Carte KINZ Base"
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover block"
                  draggable={false}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Layer 3: CardDeck dealer (z-30) — cards arrive one by one from bottom */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="relative flex items-end justify-center">
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

      </div>
    </section>
  );
}

