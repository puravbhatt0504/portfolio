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
      <nav className="fixed left-1/2 top-6 z-[120] -translate-x-1/2 rounded-full border border-cyan-200/25 bg-zinc-900/70 p-2 backdrop-blur-xl">
        <ul className="flex items-center gap-1">
          {ROUTES.map((route) => {
            const isActive = pathname === route.href;

            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={cn(
                    "relative block rounded-full px-5 py-2 text-xs uppercase tracking-[0.28em] transition",
                    isActive ? "text-zinc-900" : "text-cyan-100/75 hover:text-cyan-100",
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
                      className="absolute inset-0 rounded-full bg-cyan-200"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  ) : null}
                  <span className="relative">{route.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </LayoutGroup>
  );
}
