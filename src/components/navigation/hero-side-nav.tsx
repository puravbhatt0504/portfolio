"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";

import { useMotionSound } from "@/hooks/use-motion-sound";
import { cn } from "@/lib/cn";

/* ─── Bubble Configuration ─── */
// side: "left" | "right" — which side of the hero name the bubble sits on
// offset: fine-tune vertical & horizontal positioning
const NAV_BUBBLES = [
  {
    id: "hero",
    label: "Home",
    icon: HomeIcon,
    side: "left" as const,
    size: "lg" as const,
    floatDelay: 0,
    position: { top: "18%", offsetX: 60 },
  },
  {
    id: "about",
    label: "About",
    icon: AboutIcon,
    side: "left" as const,
    size: "md" as const,
    floatDelay: 1.2,
    position: { top: "48%", offsetX: 40 },
  },
  {
    id: "contact",
    label: "Contact",
    icon: ContactIcon,
    side: "left" as const,
    size: "sm" as const,
    floatDelay: 2.8,
    position: { top: "76%", offsetX: 70 },
  },
  {
    id: "skills",
    label: "Skills",
    icon: SkillsIcon,
    side: "right" as const,
    size: "md" as const,
    floatDelay: 0.6,
    position: { top: "22%", offsetX: 55 },
  },
  {
    id: "work",
    label: "Work",
    icon: WorkIcon,
    side: "right" as const,
    size: "lg" as const,
    floatDelay: 1.8,
    position: { top: "52%", offsetX: 35 },
  },
] as const;

const SIZE_MAP = {
  sm: { bubble: "w-14 h-14", icon: "w-3.5 h-3.5", text: "text-[9px]", ring: 56 },
  md: { bubble: "w-[4.5rem] h-[4.5rem]", icon: "w-4 h-4", text: "text-[10px]", ring: 72 },
  lg: { bubble: "w-20 h-20", icon: "w-5 h-5", text: "text-[11px]", ring: 80 },
};

/* ─── Main Component ─── */
export function HeroSideNav() {
  const pathname = usePathname();
  const { play } = useMotionSound();
  const [activeSection, setActiveSection] = useState("hero");
  const isHomePage = pathname === "/";

  // Track which section is currently in view via IntersectionObserver
  useEffect(() => {
    if (!isHomePage) return;

    const observers: IntersectionObserver[] = [];

    NAV_BUBBLES.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [isHomePage]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!isHomePage) return null;

  const leftBubbles = NAV_BUBBLES.filter((b) => b.side === "left");
  const rightBubbles = NAV_BUBBLES.filter((b) => b.side === "right");

  return (
    <>
      {/* Desktop: Floating bubbles on both sides */}
      <div className="fixed inset-0 z-[110] pointer-events-none hidden md:block" aria-label="Section navigation">
        {/* Left bubbles */}
        {leftBubbles.map((bubble) => (
          <NavBubble
            key={bubble.id}
            bubble={bubble}
            isActive={activeSection === bubble.id}
            onNavigate={(id) => {
              scrollToSection(id);
            }}
            onHoverSound={(event) => {
              const pan = (event.clientX / window.innerWidth) * 2 - 1;
              play(360, 0.015, pan);
            }}
            onClickSound={(event) => {
              const pan = (event.clientX / window.innerWidth) * 2 - 1;
              play(520, 0.02, pan);
            }}
            style={{
              top: bubble.position.top,
              left: `${bubble.position.offsetX}px`,
            }}
          />
        ))}

        {/* Right bubbles */}
        {rightBubbles.map((bubble) => (
          <NavBubble
            key={bubble.id}
            bubble={bubble}
            isActive={activeSection === bubble.id}
            onNavigate={(id) => {
              scrollToSection(id);
            }}
            onHoverSound={(event) => {
              const pan = (event.clientX / window.innerWidth) * 2 - 1;
              play(360, 0.015, pan);
            }}
            onClickSound={(event) => {
              const pan = (event.clientX / window.innerWidth) * 2 - 1;
              play(520, 0.02, pan);
            }}
            style={{
              top: bubble.position.top,
              right: `${bubble.position.offsetX}px`,
            }}
          />
        ))}
      </div>

      {/* Mobile: Compact bottom bubble bar */}
      <nav
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[120] flex md:hidden"
        aria-label="Section navigation"
      >
        <div className="rounded-full border-2 border-ink/10 bg-paper-white shadow-lg p-1.5 flex items-center gap-1">
          {NAV_BUBBLES.map((bubble) => {
            const isActive = activeSection === bubble.id;
            const Icon = bubble.icon;
            return (
              <button
                key={bubble.id}
                type="button"
                onClick={() => scrollToSection(bubble.id)}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer",
                  isActive ? "text-paper-white scale-110" : "text-ink/40"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-bubble-active"
                    className="absolute inset-0 rounded-full bg-coral z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative z-10">
                  <Icon className="w-4 h-4" />
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

/* ─── Individual Floating Bubble ─── */
type BubbleConfig = (typeof NAV_BUBBLES)[number];

type NavBubbleProps = {
  bubble: BubbleConfig;
  isActive: boolean;
  onNavigate: (id: string) => void;
  onHoverSound: (event: React.MouseEvent) => void;
  onClickSound: (event: React.MouseEvent) => void;
  style: React.CSSProperties;
};

function NavBubble({
  bubble,
  isActive,
  onNavigate,
  onHoverSound,
  onClickSound,
  style,
}: NavBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const sizes = SIZE_MAP[bubble.size];
  const Icon = bubble.icon;

  // Magnetic hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const magnetX = useSpring(useTransform(mouseX, (v) => v * 0.25), {
    stiffness: 180,
    damping: 14,
  });
  const magnetY = useSpring(useTransform(mouseY, (v) => v * 0.25), {
    stiffness: 180,
    damping: 14,
  });

  // Spotlight
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  // Unique float animation per bubble
  const floatY = {
    y: [0, -8, 0, 6, 0],
    x: [0, 4, 0, -3, 0],
    rotate: [0, 2, 0, -1.5, 0],
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      className="absolute pointer-events-auto cursor-pointer group"
      style={{ ...style, x: magnetX, y: magnetY }}
      // Entrance animation
      initial={{ opacity: 0, scale: 0, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{
        delay: bubble.floatDelay * 0.4 + 0.3,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      onMouseMove={(event) => {
        if (!ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        const cx = bounds.left + bounds.width / 2;
        const cy = bounds.top + bounds.height / 2;
        mouseX.set(event.clientX - cx);
        mouseY.set(event.clientY - cy);
        spotX.set(event.clientX - bounds.left);
        spotY.set(event.clientY - bounds.top);
      }}
      onMouseEnter={(event) => {
        setIsHovered(true);
        onHoverSound(event);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onClick={(event) => {
        onNavigate(bubble.id);
        onClickSound(event);
      }}
      data-cursor="interactive"
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={floatY}
        transition={{
          type: "tween",
          duration: 5 + bubble.floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: bubble.floatDelay,
        }}
        className="relative"
      >
        {/* Outer glow ring on active */}
        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn(
                "absolute -inset-1.5 rounded-full",
                "bg-coral/20 blur-[4px]"
              )}
            />
          )}
        </AnimatePresence>

        {/* Pulse ring on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: [1, 1.3, 1.5], opacity: [0.4, 0.15, 0] }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween", duration: 1.2, repeat: Infinity, ease: "easeOut" }}
              className={cn(sizes.bubble, "absolute inset-0 rounded-full border-2 border-coral/40")}
            />
          )}
        </AnimatePresence>

        {/* Main bubble body */}
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : 1,
            boxShadow: isHovered
              ? "0 8px 24px rgba(244, 63, 94, 0.25), 0 0 0 2px rgba(244, 63, 94, 0.15)"
              : isActive
                ? "0 6px 20px rgba(244, 63, 94, 0.18), 0 0 0 2px rgba(244, 63, 94, 0.12)"
                : "0 4px 12px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className={cn(
            sizes.bubble,
            "rounded-full flex flex-col items-center justify-center gap-1 relative overflow-hidden",
            "border-2 transition-colors duration-300",
            isActive
              ? "bg-coral border-coral shadow-md"
              : "bg-paper-white border-ink/10 hover:bg-ink/5 hover:border-ink/20 shadow-sm"
          )}
        >
          {/* Spotlight glow */}
          <SpotlightGlow isHovered={isHovered} spotX={spotX} spotY={spotY} />

          {/* Gradient sheen overlay */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, transparent 50%, rgba(244, 63, 94, 0.04) 100%)",
            }}
          />

          {/* Icon */}
          <motion.span
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 8 : 0,
              y: isHovered ? -1 : 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="relative z-10"
          >
            <Icon
              className={cn(
                sizes.icon,
                "transition-colors duration-300",
                isActive
                  ? "text-paper-white"
                  : "text-ink/40 group-hover:text-ink/80"
              )}
            />
          </motion.span>

          {/* Label */}
          <motion.span
            animate={{
              opacity: isHovered || isActive ? 1 : 0.55,
              y: isHovered ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              sizes.text,
              "relative z-10 font-bold uppercase tracking-[0.18em] whitespace-nowrap",
              isActive ? "text-paper-white" : "text-ink/40 group-hover:text-ink/80"
            )}
          >
            {bubble.label}
          </motion.span>
        </motion.div>

        {/* Active dot indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-coral shadow-[0_0_8px_rgba(244,63,94,0.6)]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

/* ─── Spotlight Glow ─── */
function SpotlightGlow({
  isHovered,
  spotX,
  spotY,
}: {
  isHovered: boolean;
  spotX: MotionValue<number>;
  spotY: MotionValue<number>;
}) {
  const bg = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(60px circle at ${x}px ${y}px, rgba(244, 63, 94, 0.15), transparent 70%)`
  );

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 rounded-full pointer-events-none z-[1]"
          style={{ background: bg }}
        />
      )}
    </AnimatePresence>
  );
}

/* ─── SVG Icons ─── */
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function AboutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SkillsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function WorkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function ContactIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
