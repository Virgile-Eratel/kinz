'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

export const AMAZON_URL =
  'https://www.amazon.fr/M%C3%A9tallique-soci%C3%A9t%C3%A9-cartes-famille-joueurs/dp/B08WKF5HZR';

export default function BuySection() {
  const prefersReducedMotion = useReducedMotion();

  const fromLeft = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: -60 };
  const fromRight = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: 60 };
  const settled = { opacity: 1, x: 0 };

  return (
    <section
      id="buy"
      className="relative overflow-hidden bg-charbon py-24 md:py-32"
    >
      {/* Glow d'accent en arrière-plan */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-pumpkin-pop/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image */}
          <motion.div
            initial={fromLeft}
            whileInView={settled}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/40 md:aspect-[4/5]"
          >
            <Image
              src="/imagesBg/DSCF4147_11zon.jpg"
              alt="Boîte KINZ posée dans la verdure"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-charbon/40 via-transparent to-transparent"
            />
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={fromRight}
            whileInView={settled}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-pumpkin-pop/30 bg-pumpkin-pop/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pumpkin-pop">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pumpkin-pop" />
              Disponible maintenant
            </span>

            <h2 className="text-4xl font-bold leading-[1.05] text-sable md:text-5xl lg:text-6xl">
              Emportez <span className="text-pumpkin-pop">KINZ</span>
              <br />
              chez vous.
            </h2>

            <p className="max-w-md text-base text-sable/70 md:text-lg">
              Un jeu de cartes malin, rapide et accessible. Commandez la boîte
              officielle et rassemblez vos proches autour de la table dès
              demain.
            </p>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-pumpkin-pop px-8 py-4 text-base font-semibold text-charbon transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-pumpkin-pop/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pumpkin-pop"
              >
                Acheter sur Amazon
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="text-sm text-sable/40">
                Livraison rapide · Paiement sécurisé
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
