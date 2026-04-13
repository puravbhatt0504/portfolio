"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isActive, setIsActive] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 22, stiffness: 250 });
  const springY = useSpring(mouseY, { damping: 22, stiffness: 250 });

  const trailX = useSpring(mouseX, { damping: 16, stiffness: 140 });
  const trailY = useSpring(mouseY, { damping: 16, stiffness: 140 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const activate = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const interactiveTarget = target.closest("a, button, [data-cursor='interactive']");
      setIsActive(Boolean(interactiveTarget));
    };

    const deactivate = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget;

      if (relatedTarget instanceof Element) {
        const stillInteractive = relatedTarget.closest(
          "a, button, [data-cursor='interactive']",
        );

        if (stillInteractive) {
          return;
        }
      }

      setIsActive(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", activate);
    document.addEventListener("mouseout", deactivate);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", activate);
      document.removeEventListener("mouseout", deactivate);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/70 md:block"
        style={{
          x: springX,
          y: springY,
          scale: isActive ? 1.65 : 1,
          boxShadow: isActive
            ? "0 0 45px rgba(34,211,238,0.45)"
            : "0 0 20px rgba(16,185,129,0.35)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[998] hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-xl md:block"
        style={{
          x: trailX,
          y: trailY,
          scale: isActive ? 1.25 : 1,
        }}
      />
    </>
  );
}
