'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import Image from 'next/image';

// Configuration
const CARDS = [
  { id: 1, image: "/carteKinzPlusDix.jpg" },
  { id: 2, image: "/carteKinzPlusHuit.jpg" },
  { id: 3, image: "/carteKinzMoinsTrois.jpg" },
  { id: 4, image: "/carteKinzPlusZero.jpg" },
  { id: 5, image: "/carteKinzPasseTour.jpg" },
];

const WORDS = [
  { text: "Simple", color: "text-primary" },
  { text: "Rapide", color: "text-accent" },
  { text: "Convivial", color: "text-accent" },
  { text: "Objectif 15", color: "text-primary" },
];

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- PHASE 1 : TEXTE ---
  // Le texte reste visible pendant les premiers 40%
  // On ne bouge pas X/Y, on joue sur l'opacité globale et le blur pour un effet "cinématique"
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0.3, 0.45], [1, 0.8]);
  const textBlur = useTransform(scrollYProgress, [0.3, 0.45], ["0px", "10px"]);

  // --- PHASE 2 : CARTES ---
  // L'éventail commence à s'ouvrir AVANT que le texte ait totalement disparu (Overlap à 0.35)
  // C'est ça qui crée la fluidité.
  const fanProgress = useTransform(scrollYProgress, [0.35, 0.8], [0, 1]);

  // Apparition globale du paquet de cartes (fade in + légère montée)
  const deckOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const deckY = useTransform(scrollYProgress, [0.35, 0.6], [100, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">

        {/* CONTAINER TEXTE */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, filter: `blur(${textBlur})` }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          {WORDS.map((word, i) => (
            <TextLine key={word.text} word={word.text} color={word.color} index={i} total={WORDS.length} scroll={scrollYProgress} />
          ))}
        </motion.div>

        {/* CONTAINER CARTES (L'Éventail) */}
        <motion.div
          style={{ opacity: deckOpacity, y: deckY }}
          className="relative z-10 flex items-end justify-center perspective-1000"
        >
          {CARDS.map((card, index) => {
            // Calcul mathématique de la rotation et position pour chaque carte
            // Pas de valeurs magiques, tout est relatif à l'index (centré autour de 0)
            const centerOffset = index - (CARDS.length - 1) / 2; // -2, -1, 0, 1, 2

            return (
              <CardItem
                key={card.id}
                card={card}
                index={index}
                centerOffset={centerOffset}
                progress={fanProgress}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// Sous-composant pour isoler la logique de chaque mot (plus propre)
function TextLine({ word, color, index, total, scroll }: { word: string, color: string, index: number, total: number, scroll: MotionValue<number> }) {
  // Séquençage simple : chaque mot a son moment de gloire entre 0 et 0.3
  const step = 0.3 / total;
  const start = index * step;
  const end = start + step;

  // Opacité active seulement durant son créneau, sinon tamisée
  const opacity = useTransform(scroll,
    [start, start + step / 2, end],
    [0.2, 1, 0.2] // Le mot actif est à 1, les autres à 0.2 (Focus effect)
  );

  return (
    <motion.h1 style={{ opacity }} className={`text-6xl md:text-8xl font-bold uppercase tracking-tight transition-colors ${color}`}>
      {word}
    </motion.h1>
  )
}

interface Card {
  id: number;
  image: string;
}

interface CardItemProps {
  card: Card;
  index: number;
  centerOffset: number;
  progress: MotionValue<number>;
}

function CardItem({ card, index, centerOffset, progress }: CardItemProps) {
  // --- Animation Logic ---
  const rotation = useTransform(progress, [0, 1], [0, centerOffset * 15]);

  // J'ai augmenté l'écartement (150 vs 120) pour que les cartes respirent mieux sans tailles fixes
  const xPosition = useTransform(progress, [0, 1], [0, centerOffset * 150]);

  const yPosition = useTransform(progress, [0, 1], [0, Math.abs(centerOffset) * 20]);

  return (
    <motion.div
      style={{
        rotate: rotation,
        x: xPosition,
        y: yPosition,
        transformOrigin: "bottom center",
        zIndex: index,
        // 2. Suppression de la margin négative "hacky". 
        // Comme on est en absolute au même endroit, elles s'empilent naturellement.
        // C'est le xPosition qui va créer l'espace.
      }}
      className="absolute bottom-0"
    >
      {/* 3. Gestion de la taille responsive SANS bruteforce pixel.
         On définit une largeur relative à l'écran (vw) ou max-width.
         La hauteur s'adapte toute seule grâce au ratio de l'image.
      */}
      <div className="relative w-[40vw] max-w-[300px] shadow-2xl rounded-xl overflow-hidden border border-white/10">

        {/* 4. Retrait du layout="fill".
           On met width/height pour définir le ratio original de ton image (ex: 300x450).
           "h-auto" assure que l'image n'est jamais déformée.
        */}
        <Image
          src={card.image}
          alt="Carte KINZ"
          width={400} // Mets ici la largeur réelle approximative de ton image source
          height={600} // Mets ici la hauteur réelle approximative
          className="w-full h-auto object-cover block" // block pour éviter les espaces fantômes sous l'image
          draggable={false} // UX: évite de "prendre" l'image en scrollant
        />
      </div>
    </motion.div>
  );
}