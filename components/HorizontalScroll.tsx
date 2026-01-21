'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';

const words = [
  "Simple",
  "Rapide", 
  "Convivial",
  "Objectif 15"
];

// Card data - will be replaced with actual images later
const cards = [
  { id: 1, image: "/kinzCardTest.png", rotation: -20 },
  { id: 2, image: "/kinzCardTest.png", rotation: -10 },
  { id: 3, image: "/kinzCardTest.png", rotation: 0 },
  { id: 4, image: "/kinzCardTest.png", rotation: 10 },
  { id: 5, image: "/kinzCardTest.png", rotation: 20 },
];

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Words opacity - each word appears sequentially
  const word1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.35, 0.45], [0, 1, 1, 0]);
  const word2Opacity = useTransform(scrollYProgress, [0.05, 0.12, 0.35, 0.45], [0, 1, 1, 0]);
  const word3Opacity = useTransform(scrollYProgress, [0.12, 0.20, 0.35, 0.45], [0, 1, 1, 0]);
  const word4Opacity = useTransform(scrollYProgress, [0.20, 0.28, 0.35, 0.45], [0, 1, 1, 0]);
  
  // Words Y position - slide up into view
  const word1Y = useTransform(scrollYProgress, [0, 0.08], [60, 0]);
  const word2Y = useTransform(scrollYProgress, [0.05, 0.15], [60, 0]);
  const word3Y = useTransform(scrollYProgress, [0.12, 0.22], [60, 0]);
  const word4Y = useTransform(scrollYProgress, [0.20, 0.30], [60, 0]);

  const wordOpacities = [word1Opacity, word2Opacity, word3Opacity, word4Opacity];
  const wordYs = [word1Y, word2Y, word3Y, word4Y];


  // Words X position - slide left before cards appear (staggered)
  const word1X = useTransform(scrollYProgress, [0.30, 0.38], [0, -300]);
  const word2X = useTransform(scrollYProgress, [0.32, 0.40], [0, -300]);
  const word3X = useTransform(scrollYProgress, [0.34, 0.42], [0, -300]);
  const word4X = useTransform(scrollYProgress, [0.36, 0.44], [0, -300]);

  const wordXs = [word1X, word2X, word3X, word4X];

  // Cards appear from bottom one by one (40% - 80%)
  const card1Y = useTransform(scrollYProgress, [0.4, 0.52], [400, 0]);
  const card2Y = useTransform(scrollYProgress, [0.46, 0.58], [400, 0]);
  const card3Y = useTransform(scrollYProgress, [0.52, 0.64], [400, 0]);
  const card4Y = useTransform(scrollYProgress, [0.58, 0.70], [400, 0]);
  const card5Y = useTransform(scrollYProgress, [0.64, 0.76], [400, 0]);
  
  const card1Opacity = useTransform(scrollYProgress, [0.4, 0.52], [0, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.46, 0.58], [0, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.52, 0.64], [0, 1]);
  const card4Opacity = useTransform(scrollYProgress, [0.58, 0.70], [0, 1]);
  const card5Opacity = useTransform(scrollYProgress, [0.64, 0.76], [0, 1]);

  const cardYs = [card1Y, card2Y, card3Y, card4Y, card5Y];
  const cardOpacities = [card1Opacity, card2Opacity, card3Opacity, card4Opacity, card5Opacity];

  // Cards container opacity (appears when words fade)
  const cardsContainerOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[400vh] bg-background"
      aria-label="Caractéristiques du jeu"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-2 md:gap-4">
            {words.map((word, index) => (
              <motion.div
                key={word}
                style={{ 
                  opacity: wordOpacities[index],
                  y: wordYs[index],
                  x: wordXs[index]

                }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tight">
                  {word}
                </h1>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cards in fan formation - centered, large */}
        <motion.div 
          style={{ opacity: cardsContainerOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative flex items-end justify-center">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                style={{
                  y: cardYs[index],
                  opacity: cardOpacities[index],
                  rotate: card.rotation,
                  zIndex: index === 2 ? 10 : 5 - Math.abs(index - 2),
                }}
                className="relative -ml-12 first:ml-0 md:-ml-16 lg:-ml-20 origin-bottom"
              >
                <CardItem image={card.image} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gray-800 rounded-full"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Card component - just the image, no overlay
function CardItem({ image }: { image: string }) {
  return (
    <div className="relative w-[180px] h-[252px] md:w-[240px] md:h-[336px] lg:w-[300px] lg:h-[420px]">
      <Image
        src={image}
        alt="Carte KINZ"
        fill
        className="object-fit object-scale-down"
        sizes="(max-width: 768px) 180px, (max-width: 1024px) 240px, 300px"
      />
    </div>
  );
}
