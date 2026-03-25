'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';

const mainLinks = [
  { name: 'Accueil', href: '#' },
  { name: 'Cartes', href: '#cards' },
  { name: 'Règles', href: '#rules' },
  { name: 'Équipe', href: '#team' },
  { name: 'Acheter', href: '#buy' },
];

const secondaryLinks = [
  { name: 'Mentions légales', href: '/about' },
  { name: 'Confidentialité', href: '/privacy' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [useLightLogo, setUseLightLogo] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  // Logo starts huge & centered, then shrinks and moves to top on scroll
  const logoHeight = useTransform(scrollY, [0, 400], [500, 60]);
  const logoY = useTransform(scrollY, [0, 400], ['25vh', '0vh']);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Detect dark sections behind logo to swap logo color
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If ANY dark section is in the top strip → use light logo
        const anyDarkVisible = entries.some((e) => e.isIntersecting);
        // But we need to check all observed elements, not just changed ones
        // Re-check from scratch: query all dark sections currently intersecting
        const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
        let darkInView = false;
        darkSections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          // Section overlaps the top 80px of the viewport (where the logo lives)
          if (rect.top < 80 && rect.bottom > 0) {
            darkInView = true;
          }
        });
        setUseLightLogo(darkInView);
      },
      {
        // Observe the top strip of the viewport where the logo is
        rootMargin: '0px 0px -90% 0px',
        threshold: 0,
      }
    );

    // Observe all dark-background sections
    const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
    darkSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Also listen to scroll for more responsive switching
  useEffect(() => {
    const checkBackground = () => {
      const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
      let darkInView = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < 80 && rect.bottom > 0) {
          darkInView = true;
        }
      });
      setUseLightLogo(darkInView);
    };

    window.addEventListener('scroll', checkBackground, { passive: true });
    checkBackground(); // initial check
    return () => window.removeEventListener('scroll', checkBackground);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, closeMenu]);

  // Escape to close
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, closeMenu]);

  // Lock body scroll on mobile menu
  useEffect(() => {
    if (isMenuOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Burger bar color: dark on light bg, light on dark bg
  const burgerColor = useLightLogo ? 'bg-sable' : 'bg-charbon';

  return (
    <>
      {/* ===== FLOATING CENTERED LOGO (desktop) ===== */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden items-center justify-center pt-3 md:flex">
        <a href="#" className="pointer-events-auto">
          <motion.div style={{ height: logoHeight, y: logoY }} className="relative">
            {/* Dark logo (on light backgrounds) */}
            <Image
              src="/logo/logo_noir.png"
              alt="KINZ"
              width={200}
              height={200}
              className="h-full w-auto transition-opacity duration-300"
              style={{ opacity: useLightLogo ? 0 : 1 }}
              priority
            />
            {/* Light logo (on dark backgrounds) */}
            <Image
              src="/logo/logo_blanc.png"
              alt="KINZ"
              width={200}
              height={200}
              className="absolute inset-0 h-full w-auto transition-opacity duration-300"
              style={{ opacity: useLightLogo ? 1 : 0 }}
              priority
            />
          </motion.div>
        </a>
      </div>

      {/* ===== FLOATING BURGER (desktop) ===== */}
      <button
        ref={burgerRef}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="fixed right-6 top-6 z-50 hidden h-10 w-10 flex-col items-center justify-center gap-1.5 md:right-12 md:flex"
        aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isMenuOpen}
      >
        <motion.span
          animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`h-px w-6 transition-colors duration-300 ${isMenuOpen ? 'bg-sable' : burgerColor}`}
        />
        <motion.span
          animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
          className={`h-px w-6 transition-colors duration-300 ${isMenuOpen ? 'bg-sable' : burgerColor}`}
        />
        <motion.span
          animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`h-px w-6 transition-colors duration-300 ${isMenuOpen ? 'bg-sable' : burgerColor}`}
        />
      </button>

      {/* Desktop dropdown menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ transformOrigin: 'top right' }}
            className="fixed right-6 top-16 z-50 hidden w-56 rounded-xl border border-sable/10 bg-charbon shadow-2xl shadow-black/30 md:right-12 md:block"
            role="menu"
          >
            <div className="p-3">
              {mainLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-2 text-base font-medium text-sable/70 transition-colors duration-200 hover:text-pumpkin-pop"
                  role="menuitem"
                >
                  {link.name}
                </a>
              ))}
              <div className="my-2 border-t border-sable/10" />
              {secondaryLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-2 text-sm text-sable/50 transition-colors duration-200 hover:text-pumpkin-pop"
                  role="menuitem"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MOBILE: floating logo + burger ===== */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-3 md:hidden">
        <a href="#" className="pointer-events-auto">
          {/* Dark logo */}
          <div className="relative h-12">
            <Image
              src="/logo/logo_noir.png"
              alt="KINZ"
              width={120}
              height={120}
              className="h-12 w-auto transition-opacity duration-300"
              style={{ opacity: useLightLogo ? 0 : 1 }}
              priority
            />
            <Image
              src="/logo/logo_blanc.png"
              alt="KINZ"
              width={120}
              height={120}
              className="absolute inset-0 h-12 w-auto transition-opacity duration-300"
              style={{ opacity: useLightLogo ? 1 : 0 }}
              priority
            />
          </div>
        </a>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="pointer-events-auto flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`h-px w-6 transition-colors duration-300 ${isMenuOpen ? 'bg-sable' : burgerColor}`}
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className={`h-px w-6 transition-colors duration-300 ${isMenuOpen ? 'bg-sable' : burgerColor}`}
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`h-px w-6 transition-colors duration-300 ${isMenuOpen ? 'bg-sable' : burgerColor}`}
          />
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-charbon md:hidden"
          >
            <div className="flex items-center justify-center px-6 pt-20">
              <Image
                src="/logo/logo_blanc.png"
                alt="KINZ"
                width={80}
                height={80}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
              {mainLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.05 + index * 0.08, duration: 0.3, ease: 'easeOut' },
                  }}
                  exit={{ opacity: 0, x: 40, transition: { duration: 0.15 } }}
                  className="text-4xl font-bold text-sable transition-colors hover:text-pumpkin-pop"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <div className="flex flex-col items-center gap-6 pb-12">
              <div className="flex items-center gap-3 text-sm text-sable/50">
                {secondaryLinks.map((link, i) => (
                  <span key={link.name} className="flex items-center gap-3">
                    {i > 0 && <span>·</span>}
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="transition-colors hover:text-pumpkin-pop"
                    >
                      {link.name}
                    </a>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sable/60 transition-colors hover:text-pumpkin-pop" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="#" className="text-sable/60 transition-colors hover:text-pumpkin-pop" aria-label="TikTok">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z" /></svg>
                </a>
                <a href="#" className="text-sable/60 transition-colors hover:text-pumpkin-pop" aria-label="Discord">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                </a>
                <a href="#" className="text-sable/60 transition-colors hover:text-pumpkin-pop" aria-label="Twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
