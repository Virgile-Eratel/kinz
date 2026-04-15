'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const IMAGES = [
  { src: '/imagesBg/DSCF4147_11zon.jpg', alt: 'Boite KINZ dans la verdure' },
  { src: '/imagesBg/DSCF4158_11zon.jpg', alt: 'Main tenant des cartes KINZ' },
  { src: '/imagesBg/DSCF4174_11zon.jpg', alt: 'Cartes KINZ sur galets' },
  { src: '/imagesBg/DSCF4177_11zon.jpg', alt: 'Carte 15 gros plan' },
  { src: '/imagesBg/DSCF4181_11zon.jpg', alt: 'Carte KINZ sur baby-foot' },
  { src: '/imagesBg/DSCF4191_11zon.jpg', alt: 'Joueurs avec cartes en main' },
];

function MarqueeRow({ direction, speed }: { direction: 'left' | 'right'; speed: number }) {
  const items = [...IMAGES, ...IMAGES];

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-6 shrink-0"
        animate={{ x: direction === 'left' ? '-50%' : '0%' }}
        initial={{ x: direction === 'left' ? '0%' : '-50%' }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {items.map((img, i) => (
          <div
            key={i}
            className="relative w-[280px] h-[190px] md:w-[340px] md:h-[230px] shrink-0 rounded-2xl overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="340px"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function ImageMarquee() {
  return (
    <section className="relative bg-charbon overflow-hidden">
      {/* Top fade — blends from charbon gradient above */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-b from-charbon to-transparent z-10 pointer-events-none" />

      <div className="py-20 md:py-28 -rotate-2 scale-105">
        <div className="flex flex-col gap-6">
          <MarqueeRow direction="left" speed={30} />
          <MarqueeRow direction="right" speed={35} />
        </div>
      </div>

      {/* Bottom fade — blends into charbon for TeamSection */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-charbon to-transparent z-10 pointer-events-none" />

      {/* Side fades — smooth left/right edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-charbon to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-charbon to-transparent z-10 pointer-events-none" />
    </section>
  );
}
