"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/cn";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function TiltCard({ children, className }: TiltCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, { damping: 22, stiffness: 160 });
  const smoothRotateY = useSpring(rotateY, { damping: 22, stiffness: 160 });

  return (
    <motion.div
      className={cn("relative transform-gpu", className)}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;

        const offsetX = (event.clientX - centerX) / (bounds.width / 2);
        const offsetY = (event.clientY - centerY) / (bounds.height / 2);

        rotateX.set(offsetY * -8);
        rotateY.set(offsetX * 10);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      data-cursor="interactive"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-emerald-500/5 to-transparent opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
      <div className="relative" style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
