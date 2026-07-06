"use client";

import { LayoutGroup, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import { useMotionSound } from "@/hooks/use-motion-sound";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function FloatingNav() {
  const pathname = usePathname();
  const { play } = useMotionSound();
  const [activeSection, setActiveSection] = useState("hero");
  const isHomePage = pathname === "/";

  // Track which section is currently in view via IntersectionObserver
  useEffect(() => {
    if (!isHomePage) return;

    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [isHomePage]);

  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  // On non-home pages, don't render the nav (or redirect to home with hash)
  if (!isHomePage) return null;

  return (
    <LayoutGroup>
      <nav className="fixed left-1/2 top-6 z-[120] -translate-x-1/2 rounded-full border border-slate-200/50 bg-white/80 p-2 backdrop-blur-xl shadow-sm">
        <ul className="flex items-center gap-1">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={(event) => {
                    scrollToSection(section.id);
                    const pan = (event.clientX / window.innerWidth) * 2 - 1;
                    play(520, 0.02, pan);
                  }}
                  onMouseEnter={(event) => {
                    const pan = (event.clientX / window.innerWidth) * 2 - 1;
                    play(360, 0.015, pan);
                  }}
                  className={cn(
                    "relative block rounded-full px-5 py-2 text-xs uppercase tracking-label transition font-semibold cursor-pointer",
                    isActive ? "text-white" : "text-slate-500 hover:text-slate-900",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-pink-500 shadow-[0_4px_12px_rgba(236,72,153,0.3)]"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  ) : null}
                  <span className="relative z-10">{section.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </LayoutGroup>
  );
}

