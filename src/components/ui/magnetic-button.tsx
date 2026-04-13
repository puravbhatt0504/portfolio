"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

import { cn } from "@/lib/cn";
import { useMotionSound } from "@/hooks/use-motion-sound";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
};

export function MagneticButton({
  href,
  children,
  className,
  target,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 16 });
  const springY = useSpring(y, { stiffness: 200, damping: 16 });

  const { play } = useMotionSound();

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;

        x.set((event.clientX - centerX) * 0.2);
        y.set((event.clientY - centerY) * 0.2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onMouseEnter={(event) => {
        const pan = (event.clientX / window.innerWidth) * 2 - 1;
        play(420, 0.02, pan);
      }}
      data-cursor="interactive"
      className="inline-flex"
    >
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-cyan-200/40 bg-zinc-900/70 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100 transition duration-300 hover:border-emerald-300/70 hover:bg-emerald-400/15",
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
