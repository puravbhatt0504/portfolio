import type { Metadata } from "next";

import { RouteHero } from "@/components/sections/route-hero";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

const PRINCIPLES = [
  "Code as choreography",
  "Interaction before decoration",
  "Performance as a feature",
  "Design systems with personality",
];

export const metadata: Metadata = {
  title: "About",
  description:
    "How Purav Bhatt approaches interaction design, systems thinking, and product engineering.",
};

export default function AboutPage() {
  return (
    <main className="pb-20">
      <RouteHero
        eyebrow="About / Philosophy"
        title="I design interfaces that behave like living systems."
        description="My process blends systems thinking, motion design, and product engineering to create interfaces users can feel, not just use."
      />

      {/* Professional Bio */}
      <section className="mx-auto w-full max-w-6xl px-6 md:px-12 mb-16">
        <Reveal>
          <div className="rounded-3xl border border-slate-200/40 bg-white/70 p-8 md:p-12 backdrop-blur shadow-sm">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-800 mb-6">
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
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-emerald-700 font-mono">{siteConfig.availability}</span>
              </div>
              <a 
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200/60 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Download Resume →
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Design Principles */}
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 md:grid-cols-2 md:px-12">
        {PRINCIPLES.map((item, index) => (
          <Reveal key={item} delay={index * 0.06}>
            <article className="rounded-3xl border border-pink-500/20 bg-white/70 p-6 backdrop-blur shadow-sm hover:shadow-md transition">
              <p className="text-xs uppercase tracking-label text-pink-500/90 font-semibold font-mono">
                Principle {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-heading text-2xl text-slate-800 font-bold">{item}</h2>
            </article>
          </Reveal>
        ))}
      </section>
    </main>
  );
}

