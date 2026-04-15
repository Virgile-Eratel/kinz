'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Image from 'next/image';

export default function HeroParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* ── Parallax Y offsets — background scrolls out, foreground stays ── */
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '-150%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-120%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const y1 = useTransform(scrollYProgress, [0, 1], ['55%', '-40%']);
  const bgOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0]);

  if (prefersReducedMotion) {
    return (
      <section className="relative w-full h-screen bg-[#FFE3C7]" aria-label="Parallax hero">
        <Image
          src="/parallaxe/Parallaxe-01.png"
          alt="Cartes KINZ"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full pointer-events-none"
      style={{ height: '130vh' }}
      aria-label="Parallax hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Beige background — fades out to reveal next section */}
        <motion.div
          className="absolute inset-0 bg-[#FFE3C7]"
          style={{ opacity: bgOpacity }}
        />

        {/* Layer 4 — Background (farthest, leaves first) */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{ y: y4 }}
        >
          <Image
            src="/parallaxe/Parallaxe-04.png"
            alt="Fond de cartes KINZ"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Layer 3 */}
        <motion.div
          className="absolute inset-0 z-[2]"
          style={{ y: y3 }}
        >
          <Image
            src="/parallaxe/Parallaxe-03.png"
            alt="Cartes arrière-plan"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </motion.div>

        {/* Layer 2 */}
        <motion.div
          className="absolute inset-0 z-[3]"
          style={{ y: y2 }}
        >
          <Image
            src="/parallaxe/Parallaxe-02.png"
            alt="Cartes plan moyen"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </motion.div>

        {/* Layer 1 — Foreground (closest, stays for transition) */}
        <motion.div
          className="absolute inset-0 z-[4]"
          style={{ y: y1 }}
        >
          <Image
            src="/parallaxe/Parallaxe-01.png"
            alt="Cartes premier plan"
            fill
            sizes="100vw"
            className="object-contain object-bottom"
          />
        </motion.div>
      </div>
    </section>
  );
}
