"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/cn";

/**
 * SpotlightCard — Aceternity-style card with:
 * - Mouse-tracking radial spotlight glow
 * - 3D tilt on hover
 * - Animated gradient border
 * - Scale up on hover
 */
type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  as?: "div" | "article";
};

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(139,92,246,0.10)",
  as: Tag = "div",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Spotlight tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { damping: 20, stiffness: 150 });
  const smoothRotateY = useSpring(rotateY, { damping: 20, stiffness: 150 });

  const spotlight = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(350px circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`
  );

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative rounded-3xl overflow-hidden transform-gpu",
        className
      )}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(event) => {
        if (!ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        mouseX.set(event.clientX - bounds.left);
        mouseY.set(event.clientY - bounds.top);

        const cx = bounds.left + bounds.width / 2;
        const cy = bounds.top + bounds.height / 2;
        const ox = (event.clientX - cx) / (bounds.width / 2);
        const oy = (event.clientY - cy) / (bounds.height / 2);
        rotateX.set(oy * -4);
        rotateY.set(ox * 5);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      data-cursor="interactive"
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-400/0 via-transparent to-fuchsia-400/0 opacity-0 group-hover:from-violet-400/30 group-hover:to-fuchsia-400/20 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0" />

      {/* Card body */}
      <Tag className="relative z-10 rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 group-hover:bg-white/80 group-hover:border-violet-200/30 group-hover:shadow-[0_12px_40px_rgba(139,92,246,0.1)]">
        {/* Spotlight overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlight }}
        />

        {/* Content */}
        <div className="relative z-10 [transform:translateZ(30px)]">
          {children}
        </div>
      </Tag>
    </motion.div>
  );
}
