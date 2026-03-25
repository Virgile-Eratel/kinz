'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import FloatingCardsLayer from './FloatingCardsLayer';
import RulesPanel from './RulesPanel';
import HandDemoLayer from './HandDemoLayer';

const WINNING_CARDS = [
  { id: 1, image: "/cartes/260322_Cartes-dig_+6.png" },
  { id: 2, image: "/cartes/260322_Cartes-dig_+8.png" },
  { id: 3, image: "/cartes/260322_Cartes-dig_-3.png" },
  { id: 4, image: "/cartes/260322_Cartes-dig_+0.png" },
  { id: 5, image: "/cartes/260322_Cartes-dig_+4.png" },
];

export default function CardsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Gradient sable → charbon
  const gradientOpacity = useTransform(scrollYProgress, [0.74, 0.90], [0, 1]);

  if (shouldReduceMotion) {
    return (
      <section className="relative bg-background">
        <div className="flex h-screen w-full items-center justify-center gap-12 px-8">
          {/* Rules */}
          <div className="w-[35%] space-y-5">
            <h2 className="text-5xl md:text-7xl font-bold uppercase text-primary tracking-tight">
              Objectif <span className="text-accent">15</span>
            </h2>
            <p className="text-base md:text-xl text-foreground/80">
              <span className="text-accent font-semibold">5 cartes</span> par main
            </p>
            <p className="text-base md:text-xl text-foreground/80">
              si le tout fait <span className="text-accent font-semibold">15</span> c&apos;est gagné
            </p>
            <p className="text-base md:text-xl text-foreground/80">
              attention pas de <span className="text-accent font-semibold">cartes actions</span> dans votre main à la fin
            </p>
          </div>
          {/* Winning hand static */}
          <div className="relative w-[65%] flex items-end justify-center h-[40vh]">
            {WINNING_CARDS.map((card, index) => {
              const centerOffset = index - (WINNING_CARDS.length - 1) / 2;
              return (
                <div
                  key={card.id}
                  className="absolute bottom-0"
                  style={{
                    transform: `rotate(${centerOffset * 12}deg) translateX(${centerOffset * 90}px)`,
                    transformOrigin: 'bottom center',
                    zIndex: index,
                  }}
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
                </div>
              );
            })}
            <p className="absolute -top-16 text-3xl md:text-5xl font-bold uppercase tracking-tight text-primary">
              Ça gagne !
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[900vh] bg-background"
      aria-hidden="true"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <FloatingCardsLayer scrollYProgress={scrollYProgress} />
        <RulesPanel scrollYProgress={scrollYProgress} />
        <HandDemoLayer scrollYProgress={scrollYProgress} />

        {/* Gradient sable → charbon */}
        <motion.div
          style={{ opacity: gradientOpacity }}
          className="absolute inset-0 z-50 pointer-events-none"
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent via-charbon/60 to-charbon" />
        </motion.div>
      </div>
    </section>
  );
}
