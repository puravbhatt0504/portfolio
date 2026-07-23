"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function About3D() {
  const container = useRef<HTMLElement>(null);
  const isInView = useInView(container, { once: true, margin: "-100px" });

  const PRINCIPLES = [
    { title: "Code as choreography", icon: "✦" },
    { title: "Interaction before decoration", icon: "✧" },
    { title: "Performance as a feature", icon: "⚡" },
    { title: "Systems with soul", icon: "♡" },
  ];

  const spring = { type: "spring" as const, damping: 15, stiffness: 100 };

  return (
    <section ref={container} id="about" className="relative px-6 md:px-20 py-24 z-10 overflow-hidden">
      <div className="section-divider mb-20" />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 items-start">
        
        {/* Main Text */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ ...spring, delay: 0.1 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-blue mb-4">
              Scrapbook / About
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink leading-tight">
              A little bit about <br className="hidden sm:block" />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-paper-white">my journey</span>
                <span className="absolute inset-0 bg-blue -rotate-1 scale-[1.05] z-0 shadow-sm" style={{ clipPath: "polygon(0 5%, 100% 0, 95% 95%, 5% 100%)" }} />
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ ...spring, delay: 0.2 }}
            className="font-cursive text-xl sm:text-2xl text-ink/80 leading-relaxed max-w-xl pt-4"
          >
            I'm a full-stack product developer focused on building polished, production-grade applications. I work across the entire stack — from interactive frontends with <span className="font-bold text-ink">Framer Motion</span> to complex backends with <span className="font-bold text-ink">PostgreSQL</span> and <span className="font-bold text-ink">AI</span> integrations.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ ...spring, delay: 0.3 }}
            className="font-cursive text-xl sm:text-2xl text-ink/80 leading-relaxed max-w-xl"
          >
            Currently, I'm working on <strong className="font-hand text-2xl text-coral tracking-wide">Simulation Sys</strong>, a complex tool for modeling urban policy decisions using Agent-Based Modeling and AI scenario generation.
          </motion.p>
        </div>

        {/* Polaroids / Principles */}
        <motion.div 
          className="relative pt-12 md:pt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ ...spring, delay: 0.4 }}
        >
          <div className="sticker bg-paper-white p-6 rotate-[3deg] shadow-lg max-w-sm mx-auto w-full">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 w-16 h-5 -rotate-2" />
            <h3 className="font-hand text-2xl text-ink mb-4 -rotate-1 text-center">Core Principles</h3>
            <ul className="space-y-4">
              {PRINCIPLES.map((p, i) => (
                <li key={i} className="flex items-center gap-3 font-mono text-xs text-ink/80 border-b border-ink/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-coral">{p.icon}</span>
                  {p.title}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
