'use client';

import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: 'Accueil', href: '#' },
    { name: 'Caractéristiques', href: '#features' },
    { name: 'Règles', href: '#rules' },
    { name: 'Acheter', href: '#buy' },
    { name: 'Equipe', href: '#team' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed left-0 right-0 top-0 z-50 bg-background backdrop-blur-md"
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <a href="#" className="flex items-center">
            <Image src="/logo_noir.png" alt="KINZ" width={100} height={100} className="h-8 w-auto" />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-500 transition-colors hover:text-gray-900"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-[#1a1a1a]"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-px w-6 bg-[#1a1a1a]"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-[#1a1a1a]"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-background md:hidden"
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={isMenuOpen ? { opacity: 1, y: 0, transition: { delay: index * 0.1 } } : { opacity: 0, y: 20 }}
              className="text-3xl"
            >
              {link.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
