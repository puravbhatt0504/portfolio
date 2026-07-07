"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { siteConfig } from "@/lib/site";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FloatingParticles, TextShimmer, MagneticWrap } from "@/components/ui/motion-effects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function About3D() {
  const container = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const bioCard = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headline.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
    });
  }, { scope: container });

  const PRINCIPLES = [
    { title: "Code as choreography", desc: "Every interaction is deliberate and sequenced.", color: "rgba(139,92,246,0.10)" },
    { title: "Interaction before decoration", desc: "Usability drives the design, not the other way around.", color: "rgba(236,72,153,0.10)" },
    { title: "Performance as a feature", desc: "Speed and responsiveness are non-negotiable.", color: "rgba(59,130,246,0.10)" },
    { title: "Design systems with personality", desc: "Consistent yet distinctive across every surface.", color: "rgba(249,115,22,0.10)" },
  ];

  return (
    <section
      ref={container}
      id="about"
      className="min-h-screen flex flex-col justify-center px-4 md:px-20 py-20 relative z-10"
    >
      {/* Floating particles decoration */}
      <FloatingParticles count={8} />

      <div className="max-w-6xl mx-auto w-full">
        <h2
          ref={headline}
          className="font-heading text-4xl md:text-7xl font-extrabold mb-16 text-center text-slate-900"
        >
          About <TextShimmer className="drop-shadow-sm text-4xl md:text-7xl font-extrabold font-heading">Me</TextShimmer>
        </h2>

        {/* Bio Card — SpotlightCard with 3D tilt + cursor glow */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard className="mb-12" spotlightColor="rgba(139,92,246,0.08)">
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-medium">
              <p>
                I&apos;m a full-stack product developer focused on building polished, production-grade
                applications using <span className="text-slate-800 font-semibold">Next.js, TypeScript, Flutter, and Python</span>.
                I work across the entire stack — from interactive frontends with GSAP and Three.js
                to complex backends with PostgreSQL, real-time APIs, and AI integrations.
              </p>
              <p>
                My latest project is <span className="text-slate-800 font-semibold">Simulation Sys</span> (Urban Policy Simulation) — a complex tool for modeling, simulating, and evaluating the impact of urban policy decisions before they are enacted using Agent-Based Modeling and AI scenario generation. 
              </p>
              <p>
                My recent work also includes an <span className="text-slate-800 font-semibold">employee management platform</span> for
                City Fire Services (dual Flutter apps + Next.js admin portal with live GPS tracking),
                and an <span className="text-slate-800 font-semibold">AI-powered knowledge exchange platform</span>.
              </p>
              <p>
                I care about motion design, interaction quality, and building systems that feel
                premium — not just functional. Every project I ship prioritizes performance,
                accessibility, and maintainability alongside visual polish.
              </p>
            </div>

            {/* Availability + Resume */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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

        {/* Principles Grid — Each with SpotlightCard */}
        <div className="grid md:grid-cols-2 gap-5">
          {PRINCIPLES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SpotlightCard spotlightColor={item.color}>
                <h3 className="font-heading text-xl font-bold text-slate-800 group-hover:text-violet-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-500 font-medium text-sm">
                  {item.desc}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
