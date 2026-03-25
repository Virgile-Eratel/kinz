'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion } from 'motion/react';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  roles: string[];
  photo: string;
  description: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: 'membre-1', name: 'Virgile Marty', roles: ['Développeur', 'UX/UI Designer'], photo: '/team/membre-virgile.png', description: 'Description du membre 1' },
  { id: 'membre-2', name: 'Philippe Cabel', roles: ['Responsable communication', 'Photographe'], photo: '/team/membre-Philippe.png', description: 'Description du membre 2' },
  { id: 'membre-3', name: 'Chloé Leray', roles: ['Responsable Marketing', 'Data analyste'], photo: '/team/membre-chloe.png', description: 'Description du membre 3' },
  { id: 'membre-4', name: 'Marie Caroff', roles: ['Directrice artistique'], photo: '/team/membre-marie.png', description: 'Description du membre 4' },
];

// Total horizontal travel: (N-1) slides worth of width
// Each slide is ~85vw on mobile, ~60vw on desktop
// We translate from 0 to -(N-1)*slideWidth
const SLIDE_COUNT = TEAM_MEMBERS.length;

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll → horizontal translation
  // 0% scroll → 0% translateX, 100% scroll → move to last slide
  const xPercent = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(SLIDE_COUNT - 1) * 100}%`]
  );

  // Progress bar driven by scrollYProgress
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="team"
      ref={containerRef}
      className="relative bg-charbon"
      style={{ height: `${SLIDE_COUNT * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* z-10: Portraits layer */}
        <motion.div
          style={{ x: prefersReducedMotion ? undefined : xPercent }}
          className="absolute inset-0 z-10 flex pointer-events-none"
        >
          {TEAM_MEMBERS.map((member, i) => (
            <PortraitSlide
              key={member.id}
              member={member}
              index={i}
              reducedMotion={prefersReducedMotion ?? false}
            />
          ))}
        </motion.div>

        {/* z-20: Gradient overlays */}
        <div className="absolute inset-x-0 bottom-0 z-20 h-[50%] pointer-events-none"
             style={{ background: 'linear-gradient(to top, #0C1415 0%, rgba(12,20,21,0.8) 40%, rgba(12,20,21,0) 100%)' }} />
        <div className="absolute inset-y-0 left-0 z-20 w-[30%] pointer-events-none"
             style={{ background: 'linear-gradient(to right, rgba(12,20,21,0.4) 0%, transparent 100%)' }} />

        {/* z-30: Names layer (scroll-driven) */}
        <motion.div
          style={{ x: prefersReducedMotion ? undefined : xPercent }}
          className="absolute inset-0 z-30 flex"
          aria-roledescription="carrousel"
          aria-label="Membres de l'equipe"
        >
          {TEAM_MEMBERS.map((member, i) => (
            <NameSlide
              key={member.id}
              member={member}
              index={i}
              isFirst={i === 0}
              reducedMotion={prefersReducedMotion ?? false}
            />
          ))}
        </motion.div>

        {/* z-40: Progress bar */}
        <div className="absolute bottom-8 left-6 right-6 z-40 h-1 bg-sable/10 rounded-full md:left-12 md:right-12">
          <motion.div
            className="h-full bg-pumpkin-pop rounded-full"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </section>
  );
}

function NameSlide({
  member,
  index,
  isFirst,
  reducedMotion,
}: {
  member: TeamMember;
  index: number;
  isFirst: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div
      className="relative min-w-[100vw] flex-shrink-0 flex flex-col justify-end px-6 pb-20 md:px-12 md:pb-28 lg:pb-32"
      role="group"
      aria-label={`Membre ${index + 1} sur ${TEAM_MEMBERS.length} : ${member.name}`}
      aria-roledescription="slide"
    >
      <span
        className="absolute bottom-6 right-6 text-7xl md:text-9xl font-bold text-sable/[0.04] select-none pointer-events-none md:right-12"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      >
        {isFirst && (
          <span className="text-xs uppercase tracking-[0.2em] text-pumpkin-pop mb-6 block font-semibold">
            Notre equipe
          </span>
        )}
        <h2 className="text-4xl md:text-7xl font-bold text-sable leading-none tracking-tight">
          {member.name}
        </h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {member.roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-sable/20 bg-sable/10 px-4 py-1.5 text-xs md:text-sm text-sable"
            >
              {role}
            </span>
          ))}
        </div>
        <p className="text-sable/70 mt-4 max-w-md text-sm leading-relaxed md:hidden">
          {member.description}
        </p>
      </motion.div>
    </div>
  );
}

function PortraitSlide({
  member,
  index,
  reducedMotion,
}: {
  member: TeamMember;
  index: number;
  reducedMotion: boolean;
}) {
  return (
    <div className="min-w-[100vw] flex-shrink-0 relative">
      {/* Glow behind portrait */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full bg-pumpkin-pop/10 blur-3xl pointer-events-none" />
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2, ease: 'easeOut' }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[85%] md:h-[92%] w-full max-w-2xl"
      >
        {/* Desktop: 3D tilt */}
        <div className="hidden md:block relative w-full h-full">
          <Portrait3D
            src={member.photo}
            alt={`Photo portrait de ${member.name}, ${member.roles.join(', ')}`}
            reducedMotion={reducedMotion}
          />
        </div>
        {/* Mobile: static image */}
        <div className="md:hidden relative w-full h-full">
          <Image
            src={member.photo}
            alt={`Photo portrait de ${member.name}, ${member.roles.join(', ')}`}
            fill
            className="object-contain object-bottom"
            sizes="100vw"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      </motion.div>
    </div>
  );
}

function Portrait3D({
  src,
  alt,
  reducedMotion,
}: {
  src: string;
  alt: string;
  reducedMotion: boolean;
}) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateY = useTransform(mouseX, [0, 1], [5, -5]);
  const rotateX = useTransform(mouseY, [0, 1], [-3, 3]);
  const translateX = useTransform(mouseX, [0, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div className="relative w-full h-full [perspective:800px] [transform-style:preserve-3d]">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={reducedMotion ? undefined : { rotateY, rotateX, translateX }}
        className="relative w-full h-full pointer-events-auto will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-bottom"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </motion.div>
    </div>
  );
}
