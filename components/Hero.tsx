'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background"
      aria-label="Section d'accueil"
    >
      <div className="absolute inset-0 hidden md:block">
        <div className="relative w-full h-full">
          <Image
            src="/bgJeu1.jpeg"
            alt="KINZ"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* TODO mettre une image pour mobile */}
      <div className="absolute inset-0 block md:hidden">
        <div className="relative w-full h-full">
          <Image
            src="/bgJeu1.jpeg"
            alt="KINZ"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 "
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-white">Scroll</span>
          <div className="h-12 w-px bg-linear-to-b from-white to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
