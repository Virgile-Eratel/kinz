'use client';

import { motion } from 'motion/react';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'TikTok', href: '#' },
    { name: 'Discord', href: '#' },
    { name: 'Twitter', href: '#' },
  ];

  return (
    <footer className="relative bg-background py-16 md:py-24" aria-label="Pied de page">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h4 className="text-xs uppercase tracking-[0.2em] text-gray-400">
              Navigation
            </h4>
            <ul className="mt-6 space-y-4">
              {['Règles', 'Cartes', 'Communauté', 'FAQ'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-outfit text-sm text-[#1a1a1a]/60 transition-colors hover:text-[#1a1a1a]"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4 className="text-xs uppercase tracking-[0.2em] text-gray-400">
              Suivez-nous
            </h4>
            <ul className="mt-6 space-y-4">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row"
        >
          <p className="text-xs text-gray-400">
            © 2026 KINZ. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="/about" className="text-xs text-gray-500 hover:text-gray-900">
              Mentions légales
            </a>
            <a href="/privacy" className="text-xs text-gray-500 hover:text-gray-900">
              Confidentialité
            </a>
          </div>
        </motion.div>
      </div>

    </footer>
  );
}
