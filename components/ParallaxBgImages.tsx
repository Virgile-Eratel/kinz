'use client';

import { motion, useTransform, MotionValue } from 'motion/react';
import Image from 'next/image';

interface BgImage {
  src: string;
  alt: string;
  side: 'left' | 'right';
  startY: number;        // starting Y position in vh (off-screen bottom = 110+)
  endY: number;          // ending Y position in vh (off-screen top = -60-)
  sideOffset: string;
  rotation: number;
  width: string;
  fadeIn: [number, number];
  fadeOut: [number, number];
}

const BG_IMAGES: BgImage[] = [
  {
    src: '/imagesBg/DSCF4147_11zon.jpg',
    alt: 'Boite KINZ dans la verdure',
    side: 'left', startY: 120, endY: -80,
    sideOffset: '-4vw',
    rotation: -5, width: '18vw',
    fadeIn: [0.12, 0.20], fadeOut: [0.70, 0.78],
  },
  {
    src: '/imagesBg/DSCF4177_11zon.jpg',
    alt: 'Carte 15 gros plan',
    side: 'right', startY: 140, endY: -60,
    sideOffset: '-3vw',
    rotation: 6, width: '16vw',
    fadeIn: [0.16, 0.24], fadeOut: [0.68, 0.76],
  },
  {
    src: '/imagesBg/DSCF4191_11zon.jpg',
    alt: 'Joueurs avec cartes en main',
    side: 'left', startY: 160, endY: -70,
    sideOffset: '-2vw',
    rotation: 4, width: '17vw',
    fadeIn: [0.20, 0.28], fadeOut: [0.72, 0.80],
  },
];

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function ParallaxBgImages({ scrollYProgress }: Props) {
  return (
    <div className="absolute inset-0 z-[-1] pointer-events-none hidden md:block overflow-hidden">
      {BG_IMAGES.map((img, i) => (
        <ParallaxImage key={i} image={img} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

function ParallaxImage({ image, scrollYProgress }: { image: BgImage; scrollYProgress: MotionValue<number> }) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${image.startY}vh`, `${image.endY}vh`]
  );

  const opacity = useTransform(
    scrollYProgress,
    [image.fadeIn[0], image.fadeIn[1], image.fadeOut[0], image.fadeOut[1]],
    [0, 0.12, 0.12, 0]
  );

  const positionStyle = image.side === 'left'
    ? { left: image.sideOffset }
    : { right: image.sideOffset };

  return (
    <motion.div
      style={{ top: 0, y, opacity, rotate: image.rotation, ...positionStyle }}
      className="absolute rounded-2xl overflow-hidden"
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={600}
        height={400}
        className="object-cover grayscale-[50%] blur-[2px]"
        style={{ width: image.width, height: 'auto' }}
        loading="lazy"
        sizes="20vw"
      />
    </motion.div>
  );
}
