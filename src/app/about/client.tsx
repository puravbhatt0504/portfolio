"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { MagneticWrap } from "@/components/ui/motion-effects";

type SiteConfigSubset = {
  availability: string;
  resumeUrl: string;
};

const CARD_COLORS = [
  "rgba(139,92,246,0.10)",
  "rgba(236,72,153,0.10)",
  "rgba(59,130,246,0.10)",
  "rgba(249,115,22,0.10)",
];

type AboutPageClientProps = {
  principles: string[];
  siteConfig: SiteConfigSubset;
};

export function AboutPageClient({ principles, siteConfig }: AboutPageClientProps) {
  return (
    <>
      {/* Professional Bio */}
      <section className="mx-auto w-full max-w-6xl px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard spotlightColor="rgba(139,92,246,0.08)">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-800 mb-6 group-hover:text-violet-700 transition-colors">
              Background
            </h2>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-medium">
              <p>
                I&apos;m a full-stack product developer focused on building polished, production-grade 
                applications using <span className="text-slate-800 font-semibold">Next.js, TypeScript, Flutter, and Supabase</span>. 
                I work across the entire stack — from interactive frontends with GSAP and Three.js 
                to backend systems with PostgreSQL and real-time APIs.
              </p>
              <p>
                My recent work includes an <span className="text-slate-800 font-semibold">employee management platform</span> for 
                City Fire Services (dual Flutter apps + Next.js admin portal with live GPS tracking), 
                an <span className="text-slate-800 font-semibold">AI-powered knowledge exchange platform</span>, 
                and several client-facing web products deployed on Vercel.
              </p>
              <p>
                I care about motion design, interaction quality, and building systems that feel 
                premium — not just functional. Every project I ship prioritizes performance, 
                accessibility, and maintainability alongside visual polish.
              </p>
            </div>

            {/* Availability */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/60">
                <motion.span
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ type: "tween", duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-sm font-medium text-emerald-700 font-mono">{siteConfig.availability}</span>
              </div>
              <MagneticWrap strength={0.15}>
                <a 
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200/60 text-sm font-semibold text-slate-600 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200/60 transition-all"
                >
                  Download Resume →
                </a>
              </MagneticWrap>
            </div>
          </SpotlightCard>
        </motion.div>
      </section>

      {/* Design Principles */}
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 md:grid-cols-2 md:px-12">
        {principles.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <SpotlightCard spotlightColor={CARD_COLORS[index % CARD_COLORS.length]} as="article">
              <p className="text-xs uppercase tracking-label text-violet-500/90 font-semibold font-mono">
                Principle {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-heading text-2xl text-slate-800 font-bold group-hover:text-violet-700 transition-colors">{item}</h2>
            </SpotlightCard>
          </motion.div>
        ))}
      </section>
    </>
  );
}
