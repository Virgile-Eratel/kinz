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

const SECONDARY_CARDS = [
  // Top-left corner
  {
    src: '/carteKinzPlusDix.jpg',
    alt: 'Carte KINZ Plus Dix',
    position: { top: '2vh', left: '3vw' } as const,
    exit: { x: '-50vw', y: '-60vh' },
    rotation: { start: -12, end: -30 },
    floatClass: 'animate-float-slow',
  },
  // Top-right corner
  {
    src: '/carteKinzPlusHuit.jpg',
    alt: 'Carte KINZ Plus Huit',
    position: { top: '5vh', right: '5vw' } as const,
    exit: { x: '50vw', y: '-55vh' },
    rotation: { start: 15, end: 35 },
    floatClass: 'animate-float-fast',
  },
  // Bottom-left corner
  {
    src: '/carteKinzMoinsTrois.jpg',
    alt: 'Carte KINZ Moins Trois',
    position: { bottom: '3vh', left: '4vw' } as const,
    exit: { x: '-55vw', y: '50vh' },
    rotation: { start: -14, end: -40 },
    floatClass: 'animate-float-slow',
  },
  // Bottom-right corner
  {
    src: '/carteKinzPlusZero.jpg',
    alt: 'Carte KINZ Plus Zero',
    position: { bottom: '2vh', right: '3vw' } as const,
    exit: { x: '55vw', y: '45vh' },
    rotation: { start: 10, end: 28 },
    floatClass: 'animate-float-fast',
  },
  // Top center
  {
    src: '/carteKinzPasseTour.jpg',
    alt: 'Carte KINZ Passe Tour',
    position: { top: '1vh', left: '42vw' } as const,
    exit: { x: '10vw', y: '-70vh' },
    rotation: { start: 5, end: 18 },
    floatClass: 'animate-float-mid',
  },
  // Left center
  {
    src: '/carteKinzBase.jpg',
    alt: 'Carte KINZ Base',
    position: { top: '38vh', left: '1vw' } as const,
    exit: { x: '-70vw', y: '-10vh' },
    rotation: { start: -6, end: -22 },
    floatClass: 'animate-float-fast',
  },
  // Right center
  {
    src: '/carteKinzPlusDix.jpg',
    alt: 'Carte KINZ Plus Dix',
    position: { top: '35vh', right: '1vw' } as const,
    exit: { x: '70vw', y: '10vh' },
    rotation: { start: 8, end: 25 },
    floatClass: 'animate-float-slow',
  },
  // Bottom center
  {
    src: '/carteKinzPlusHuit.jpg',
    alt: 'Carte KINZ Plus Huit',
    position: { bottom: '1vh', left: '44vw' } as const,
    exit: { x: '-15vw', y: '65vh' },
    rotation: { start: -4, end: -15 },
    floatClass: 'animate-float-mid',
  },
  // Mid top-left
  {
    src: '/carteKinzMoinsTrois.jpg',
    alt: 'Carte KINZ Moins Trois',
    position: { top: '12vh', left: '18vw' } as const,
    exit: { x: '-65vw', y: '-40vh' },
    rotation: { start: -18, end: -45 },
    floatClass: 'animate-float-mid',
  },
  // Mid top-right
  {
    src: '/carteKinzPlusZero.jpg',
    alt: 'Carte KINZ Plus Zero',
    position: { top: '10vh', right: '16vw' } as const,
    exit: { x: '60vw', y: '-35vh' },
    rotation: { start: 20, end: 42 },
    floatClass: 'animate-float-slow',
  },
  // Mid bottom-right
  {
    src: '/carteKinzBase.jpg',
    alt: 'Carte KINZ Base',
    position: { bottom: '10vh', right: '15vw' } as const,
    exit: { x: '75vw', y: '30vh' },
    rotation: { start: 13, end: 32 },
    floatClass: 'animate-float-fast',
  },
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

  // ── Secondary scatter cards (phase 0.00–0.30) ──
  // Card 0: top-left corner
  const sec0X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '-50vw']);
  const sec0Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '-60vh']);
  const sec0Rot = useTransform(scrollYProgress, [0, 0.30], [-12, -30]);
  const sec0Sc = useTransform(scrollYProgress, [0, 0.30], [1, 1.15]);
  // Card 1: top-right corner
  const sec1X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '50vw']);
  const sec1Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '-55vh']);
  const sec1Rot = useTransform(scrollYProgress, [0, 0.30], [15, 35]);
  const sec1Sc = useTransform(scrollYProgress, [0, 0.30], [1, 1.15]);
  // Card 2: bottom-left corner
  const sec2X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '-55vw']);
  const sec2Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '50vh']);
  const sec2Rot = useTransform(scrollYProgress, [0, 0.30], [-14, -40]);
  const sec2Sc = useTransform(scrollYProgress, [0, 0.30], [1, 1.15]);
  // Card 3: bottom-right corner
  const sec3X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '55vw']);
  const sec3Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '45vh']);
  const sec3Rot = useTransform(scrollYProgress, [0, 0.30], [10, 28]);
  const sec3Sc = useTransform(scrollYProgress, [0, 0.30], [1, 1.15]);
  // Card 4: top center
  const sec4X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '10vw']);
  const sec4Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '-70vh']);
  const sec4Rot = useTransform(scrollYProgress, [0, 0.30], [5, 18]);
  const sec4Sc = useTransform(scrollYProgress, [0, 0.30], [1, 1.15]);
  // Card 5: left center
  const sec5X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '-70vw']);
  const sec5Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '-10vh']);
  const sec5Rot = useTransform(scrollYProgress, [0, 0.30], [-6, -22]);
  const sec5Sc = useTransform(scrollYProgress, [0, 0.30], [1, 1.15]);
  // Card 6: right center
  const sec6X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '70vw']);
  const sec6Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '10vh']);
  const sec6Rot = useTransform(scrollYProgress, [0, 0.30], [8, 25]);
  const sec6Sc = useTransform(scrollYProgress, [0, 0.30], [1, 1.15]);
  // Card 7: bottom center
  const sec7X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '-15vw']);
  const sec7Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '65vh']);
  const sec7Rot = useTransform(scrollYProgress, [0, 0.30], [-4, -15]);
  const sec7Sc = useTransform(scrollYProgress, [0, 0.30], [1, 1.15]);
  // Card 8: far top-left
  const sec8X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '-65vw']);
  const sec8Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '-40vh']);
  const sec8Rot = useTransform(scrollYProgress, [0, 0.30], [-18, -45]);
  const sec8Sc = useTransform(scrollYProgress, [0, 0.30], [1, 1.15]);
  // Card 9: far top-right
  const sec9X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '60vw']);
  const sec9Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '-35vh']);
  const sec9Rot = useTransform(scrollYProgress, [0, 0.30], [20, 42]);
  const sec9Sc = useTransform(scrollYProgress, [0, 0.30], [1, 1.15]);
  // Card 10: far bottom-right
  const sec10X = useTransform(scrollYProgress, [0, 0.30], ['0vw', '75vw']);
  const sec10Y = useTransform(scrollYProgress, [0, 0.30], ['0vh', '30vh']);
  const sec10Rot = useTransform(scrollYProgress, [0, 0.30], [13, 32]);
  const sec10Sc = useTransform(scrollYProgress, [0, 0.30], [1, 1.15]);

  const secTransforms = [
    { x: sec0X, y: sec0Y, rotate: sec0Rot, scale: sec0Sc },
    { x: sec1X, y: sec1Y, rotate: sec1Rot, scale: sec1Sc },
    { x: sec2X, y: sec2Y, rotate: sec2Rot, scale: sec2Sc },
    { x: sec3X, y: sec3Y, rotate: sec3Rot, scale: sec3Sc },
    { x: sec4X, y: sec4Y, rotate: sec4Rot, scale: sec4Sc },
    { x: sec5X, y: sec5Y, rotate: sec5Rot, scale: sec5Sc },
    { x: sec6X, y: sec6Y, rotate: sec6Rot, scale: sec6Sc },
    { x: sec7X, y: sec7Y, rotate: sec7Rot, scale: sec7Sc },
    { x: sec8X, y: sec8Y, rotate: sec8Rot, scale: sec8Sc },
    { x: sec9X, y: sec9Y, rotate: sec9Rot, scale: sec9Sc },
    { x: sec10X, y: sec10Y, rotate: sec10Rot, scale: sec10Sc },
  ];

  // ── Layer 2: KeywordsReveal (phase 0.00–0.45) ──
  // Remap [0, 0.30] → [0, 0.85] so keywords stay fully visible at end (textOpacity=1 at 0.85)
  const keywordsInternalProgress = useTransform(scrollYProgress, [0, 0.30], [0, 0.85]);

  // Slide-out left (phase 0.30–0.45)
  const keywordsSlideX = useTransform(scrollYProgress, [0.30, 0.45], ['0vw', '-120vw']);
  const keywordsSlideOpacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0]);

  // ── Layer 3: CardDeck dealer (phase 0.30–0.95) ──
  // Remap so DealerCard's internal 0→1 timing maps to this window
  // Starts at 0.30 — synced with keywordsSlideX so cards arrive as keywords exit
  const dealerProgress = useTransform(scrollYProgress, [0.30, 0.95], [0, 1]);

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

        {/* Layer 0: Secondary cards — full viewport positioning */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {SECONDARY_CARDS.map((card, i) => (
            <motion.div
              key={`sec-${i}`}
              className="absolute"
              style={{
                ...card.position,
                x: secTransforms[i].x,
                y: secTransforms[i].y,
                rotate: secTransforms[i].rotate,
                scale: secTransforms[i].scale,
              }}
            >
              <div className={card.floatClass}>
                <div className="relative w-[15vw] max-w-[110px] md:w-[10vw] md:max-w-[130px] shadow-xl rounded-lg overflow-hidden">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={400}
                    height={600}
                    className="w-full h-auto object-cover block"
                    draggable={false}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Layer 1: Main ScatterCards */}
        <div className="relative z-10">
          {/* Card 2 — back */}
          <motion.div
            className="absolute"
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

          {/* Card 1 — front */}
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

      </div>
    </section>
  );
}

