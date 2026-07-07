"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * GlowingBorderCard — Card with animated glowing conic-gradient border
 * that rotates continuously, and spotlights on hover.
 */
type GlowingBorderCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColors?: string;
};

export function GlowingBorderCard({
  children,
  className,
  glowColors = "from-violet-500 via-fuchsia-500 to-pink-500",
}: GlowingBorderCardProps) {
  return (
    <div className={cn("group relative rounded-3xl p-px overflow-hidden", className)}>
      {/* Rotating gradient border */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-3xl bg-gradient-conic opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm",
          glowColors
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ background: `conic-gradient(from 0deg, #8b5cf6, #d946ef, #ec4899, #f97316, #8b5cf6)` }}
      />

      {/* Static subtle border fallback */}
      <div className="absolute inset-0 rounded-3xl border border-white/30 group-hover:border-transparent transition-colors duration-500" />

      {/* Card body */}
      <div className="relative z-10 rounded-3xl bg-white/70 backdrop-blur-xl p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}

/**
 * TextShimmer — Text with animated gradient shimmer effect
 */
type TextShimmerProps = {
  children: string;
  className?: string;
};

export function TextShimmer({ children, className }: TextShimmerProps) {
  return (
    <motion.span
      className={cn(
        "bg-clip-text text-transparent bg-[length:200%_100%] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600",
        className
      )}
      animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}

/**
 * MagneticWrap — Wraps any element to give it magnetic cursor-following behavior
 */
type MagneticWrapProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function MagneticWrap({ children, className, strength = 0.2 }: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        if (!ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        const cx = bounds.left + bounds.width / 2;
        const cy = bounds.top + bounds.height / 2;
        x.set((event.clientX - cx) * strength);
        y.set((event.clientY - cy) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FloatingParticles — Decorative animated dots/orbs that float in a container
 * Uses a deterministic seeded PRNG to avoid SSR/client hydration mismatches.
 */
type FloatingParticlesProps = {
  count?: number;
  className?: string;
  colors?: string[];
  seed?: number;
};

// Simple deterministic pseudo-random (mulberry32)
function seededRandom(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function FloatingParticles({
  count = 6,
  className,
  colors = ["bg-violet-400/20", "bg-fuchsia-400/15", "bg-pink-400/20", "bg-blue-400/15"],
  seed = 42,
}: FloatingParticlesProps) {
  const rand = seededRandom(seed);
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 4 + rand() * 12,
    x: rand() * 100,
    y: rand() * 100,
    delay: rand() * 3,
    duration: 4 + rand() * 4,
    color: colors[i % colors.length],
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={cn("absolute rounded-full blur-sm", p.color)}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, 0, -8, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            type: "tween",
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * StaggerReveal — Reveals children with staggered animation
 * Each direct child gets a cascading delay
 */
type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
};

export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.06,
}: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerChildVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};
