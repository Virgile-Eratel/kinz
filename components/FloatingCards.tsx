'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';
import KeywordsReveal from './KeywordsReveal';

const secondaryCards = [
  // Top-left corner
  {
    src: '/carteKinzPlusDix.jpg',
    alt: 'Carte KINZ Plus Dix',
    position: { top: '2vh', left: '3vw' },
    exit: { x: '-50vw', y: '-60vh' },
    rotation: { start: -12, end: -30 },
    floatClass: 'animate-float-slow',
  },
  // Top-right corner
  {
    src: '/carteKinzPlusHuit.jpg',
    alt: 'Carte KINZ Plus Huit',
    position: { top: '5vh', right: '5vw' },
    exit: { x: '50vw', y: '-55vh' },
    rotation: { start: 15, end: 35 },
    floatClass: 'animate-float-fast',
  },
  // Bottom-left corner
  {
    src: '/carteKinzMoinsTrois.jpg',
    alt: 'Carte KINZ Moins Trois',
    position: { bottom: '3vh', left: '4vw' },
    exit: { x: '-55vw', y: '50vh' },
    rotation: { start: -14, end: -40 },
    floatClass: 'animate-float-slow',
  },
  // Bottom-right corner
  {
    src: '/carteKinzPlusZero.jpg',
    alt: 'Carte KINZ Plus Zero',
    position: { bottom: '2vh', right: '3vw' },
    exit: { x: '55vw', y: '45vh' },
    rotation: { start: 10, end: 28 },
    floatClass: 'animate-float-fast',
  },
  // Top center
  {
    src: '/carteKinzPasseTour.jpg',
    alt: 'Carte KINZ Passe Tour',
    position: { top: '1vh', left: '42vw' },
    exit: { x: '10vw', y: '-70vh' },
    rotation: { start: 5, end: 18 },
    floatClass: 'animate-float-mid',
  },
  // Left center
  {
    src: '/carteKinzBase.jpg',
    alt: 'Carte KINZ Base',
    position: { top: '38vh', left: '1vw' },
    exit: { x: '-70vw', y: '-10vh' },
    rotation: { start: -6, end: -22 },
    floatClass: 'animate-float-fast',
  },
  // Right center
  {
    src: '/carteKinzPlusDix.jpg',
    alt: 'Carte KINZ Plus Dix',
    position: { top: '35vh', right: '1vw' },
    exit: { x: '70vw', y: '10vh' },
    rotation: { start: 8, end: 25 },
    floatClass: 'animate-float-slow',
  },
  // Bottom center
  {
    src: '/carteKinzPlusHuit.jpg',
    alt: 'Carte KINZ Plus Huit',
    position: { bottom: '1vh', left: '44vw' },
    exit: { x: '-15vw', y: '65vh' },
    rotation: { start: -4, end: -15 },
    floatClass: 'animate-float-mid',
  },
  // Mid top-left
  {
    src: '/carteKinzMoinsTrois.jpg',
    alt: 'Carte KINZ Moins Trois',
    position: { top: '12vh', left: '18vw' },
    exit: { x: '-65vw', y: '-40vh' },
    rotation: { start: -18, end: -45 },
    floatClass: 'animate-float-mid',
  },
  // Mid top-right
  {
    src: '/carteKinzPlusZero.jpg',
    alt: 'Carte KINZ Plus Zero',
    position: { top: '10vh', right: '16vw' },
    exit: { x: '60vw', y: '-35vh' },
    rotation: { start: 20, end: 42 },
    floatClass: 'animate-float-slow',
  },
  // Mid bottom-right
  {
    src: '/carteKinzBase.jpg',
    alt: 'Carte KINZ Base',
    position: { bottom: '10vh', right: '15vw' },
    exit: { x: '75vw', y: '30vh' },
    rotation: { start: 13, end: 32 },
    floatClass: 'animate-float-fast',
  },
];

export default function FloatingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Card 1 (front) — exits left off-screen with CCW rotation, scales up
  const card1X = useTransform(scrollYProgress, [0, 1], ['0vw', '-80vw']);
  const card1Y = useTransform(scrollYProgress, [0, 1], ['0vh', '10vh']);
  const card1Rotate = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const card1Scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  // Card 2 (back) — exits right off-screen with CW rotation, scales up
  const card2X = useTransform(scrollYProgress, [0, 1], ['0vw', '80vw']);
  const card2Y = useTransform(scrollYProgress, [0, 1], ['0vh', '8vh']);
  const card2Rotate = useTransform(scrollYProgress, [0, 1], [5, 20]);
  const card2Scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  // Secondary cards scroll transforms
  const sec0X = useTransform(scrollYProgress, [0, 1], ['0vw', '-50vw']);
  const sec0Y = useTransform(scrollYProgress, [0, 1], ['0vh', '-60vh']);
  const sec0Rot = useTransform(scrollYProgress, [0, 1], [-12, -30]);
  const sec0Sc = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const sec1X = useTransform(scrollYProgress, [0, 1], ['0vw', '50vw']);
  const sec1Y = useTransform(scrollYProgress, [0, 1], ['0vh', '-55vh']);
  const sec1Rot = useTransform(scrollYProgress, [0, 1], [15, 35]);
  const sec1Sc = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const sec2X = useTransform(scrollYProgress, [0, 1], ['0vw', '-55vw']);
  const sec2Y = useTransform(scrollYProgress, [0, 1], ['0vh', '50vh']);
  const sec2Rot = useTransform(scrollYProgress, [0, 1], [-14, -40]);
  const sec2Sc = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const sec3X = useTransform(scrollYProgress, [0, 1], ['0vw', '55vw']);
  const sec3Y = useTransform(scrollYProgress, [0, 1], ['0vh', '45vh']);
  const sec3Rot = useTransform(scrollYProgress, [0, 1], [10, 28]);
  const sec3Sc = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const sec4X = useTransform(scrollYProgress, [0, 1], ['0vw', '10vw']);
  const sec4Y = useTransform(scrollYProgress, [0, 1], ['0vh', '-70vh']);
  const sec4Rot = useTransform(scrollYProgress, [0, 1], [5, 18]);
  const sec4Sc = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const sec5X = useTransform(scrollYProgress, [0, 1], ['0vw', '-70vw']);
  const sec5Y = useTransform(scrollYProgress, [0, 1], ['0vh', '-10vh']);
  const sec5Rot = useTransform(scrollYProgress, [0, 1], [-6, -22]);
  const sec5Sc = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const sec6X = useTransform(scrollYProgress, [0, 1], ['0vw', '70vw']);
  const sec6Y = useTransform(scrollYProgress, [0, 1], ['0vh', '10vh']);
  const sec6Rot = useTransform(scrollYProgress, [0, 1], [8, 25]);
  const sec6Sc = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const sec7X = useTransform(scrollYProgress, [0, 1], ['0vw', '-15vw']);
  const sec7Y = useTransform(scrollYProgress, [0, 1], ['0vh', '65vh']);
  const sec7Rot = useTransform(scrollYProgress, [0, 1], [-4, -15]);
  const sec7Sc = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const sec8X = useTransform(scrollYProgress, [0, 1], ['0vw', '-65vw']);
  const sec8Y = useTransform(scrollYProgress, [0, 1], ['0vh', '-40vh']);
  const sec8Rot = useTransform(scrollYProgress, [0, 1], [-18, -45]);
  const sec8Sc = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const sec9X = useTransform(scrollYProgress, [0, 1], ['0vw', '60vw']);
  const sec9Y = useTransform(scrollYProgress, [0, 1], ['0vh', '-35vh']);
  const sec9Rot = useTransform(scrollYProgress, [0, 1], [20, 42]);
  const sec9Sc = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const sec10X = useTransform(scrollYProgress, [0, 1], ['0vw', '75vw']);
  const sec10Y = useTransform(scrollYProgress, [0, 1], ['0vh', '30vh']);
  const sec10Rot = useTransform(scrollYProgress, [0, 1], [13, 32]);
  const sec10Sc = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

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

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-background"
      aria-hidden="true"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Layer 0: Secondary cards — full viewport positioning */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {secondaryCards.map((card, i) => (
            <motion.div
              key={`sec-${i}`}
              className="absolute"
              style={
                shouldReduceMotion
                  ? { ...card.position, rotate: card.rotation.start }
                  : {
                    ...card.position,
                    x: secTransforms[i].x,
                    y: secTransforms[i].y,
                    rotate: secTransforms[i].rotate,
                    scale: secTransforms[i].scale,
                  }
              }
            >
              <div className={shouldReduceMotion ? '' : card.floatClass}>
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
            style={
              shouldReduceMotion
                ? { right: '-15%', bottom: '-10%', rotate: 5 }
                : {
                  x: card2X,
                  y: card2Y,
                  rotate: card2Rotate,
                  scale: card2Scale,
                  right: '-15%',
                  bottom: '-10%',
                }
            }
          >
            <div className={shouldReduceMotion ? '' : 'animate-float-fast'}>
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
            style={
              shouldReduceMotion
                ? { left: '-10%', top: '-5%' }
                : {
                  x: card1X,
                  y: card1Y,
                  rotate: card1Rotate,
                  scale: card1Scale,
                  left: '-10%',
                  top: '-5%',
                }
            }
          >
            <div className={shouldReduceMotion ? '' : 'animate-float-slow'}>
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
      </div>
    </section>
  );
}
