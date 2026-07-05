"use client";

import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMotionSound } from "@/hooks/use-motion-sound";
import { cn } from "@/lib/cn";

const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/lab", label: "Lab" },
];

export function FloatingNav() {
  const pathname = usePathname();
  const { play } = useMotionSound();

  return (
    <LayoutGroup>
      <nav className="fixed left-1/2 top-6 z-[120] -translate-x-1/2 rounded-full border border-slate-200/50 bg-white/80 p-2 backdrop-blur-xl shadow-sm">
        <ul className="flex items-center gap-1">
          {ROUTES.map((route) => {
            const isActive = pathname === route.href;

            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "relative block rounded-full px-5 py-2 text-xs uppercase tracking-[0.28em] transition font-bold",
                    isActive ? "text-white" : "text-slate-500 hover:text-slate-900",
                  )}
                  onMouseEnter={(event) => {
                    const pan = (event.clientX / window.innerWidth) * 2 - 1;
                    play(360, 0.015, pan);
                  }}
                  onClick={(event) => {
                    const pan = (event.clientX / window.innerWidth) * 2 - 1;
                    play(520, 0.02, pan);
                  }}
                  data-cursor="interactive"
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-pink-500 shadow-[0_4px_12px_rgba(236,72,153,0.3)]"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  ) : null}
                  <span className="relative z-10">{route.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </LayoutGroup>
  );
}
