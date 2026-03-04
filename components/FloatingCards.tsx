'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';
import KeywordsReveal from './KeywordsReveal';

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

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-background"
      aria-hidden="true"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="relative">
          {/* Card 2 — back (rendered first = behind) */}
          <motion.div
            className="absolute z-10"
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

          {/* Card 1 — front (rendered second = on top) */}
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
