'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const frontDistance = 360;
  const frontStartOffset = 200;

  // L'image descend de 200px au début, et remonte jusqu'à -160px à la fin
  const frontY = useTransform(
    scrollYProgress,
    [0, 1],
    [frontStartOffset, frontStartOffset - frontDistance]
  );

  // CORRECTION : Le cache est esclave de frontY.
  // Math.max(0, -y) assure que le cache n'apparaît que quand l'image dépasse son point d'origine vers le haut.
  const coverHeight = useTransform(frontY, (y) => Math.max(0, -y));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background"
      aria-label="Parallax hero"
    >
      {/* Arrière-plan (z-0 par défaut) */}
      <motion.div className="absolute inset-0 will-change-transform">
        <Image
          src="/parallax0.jpg"
          alt="Décor en arrière-plan"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </motion.div>

      {/* Cache blanc (Doit être entre le fond et le premier plan) */}
      {/* Utilisation de z-10 ici */}
      <motion.div
        style={{ height: coverHeight }}
        className="absolute bottom-0 left-0 right-0 z-10 bg-background pointer-events-none"
      />

      {/* Premier plan (Doit être au-dessus du cache) */}
      {/* Utilisation de z-20 pour garantir la superposition */}
      <motion.div
        style={{ y: frontY }}
        className="absolute inset-0 z-20 will-change-transform"
      >
        <div className="relative h-full w-full">
          <Image
            src="/parallax1.png"
            alt="Élément au premier plan"
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      </motion.div>
    </section>
  );
}