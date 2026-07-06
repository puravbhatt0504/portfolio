"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { siteConfig } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function About3D() {
  const container = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const bioCard = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

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

    gsap.from(bioCard.current, {
      scrollTrigger: {
        trigger: bioCard.current,
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    if (principlesRef.current) {
      const cards = gsap.utils.toArray(principlesRef.current.children);
      cards.forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power2.out",
        });
      });
    }
  }, { scope: container });

  const PRINCIPLES = [
    { title: "Code as choreography", desc: "Every interaction is deliberate and sequenced." },
    { title: "Interaction before decoration", desc: "Usability drives the design, not the other way around." },
    { title: "Performance as a feature", desc: "Speed and responsiveness are non-negotiable." },
    { title: "Design systems with personality", desc: "Consistent yet distinctive across every surface." },
  ];

  return (
    <section
      ref={container}
      id="about"
      className="min-h-screen flex flex-col justify-center px-4 md:px-20 py-20 relative z-10"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2
          ref={headline}
          className="font-heading text-4xl md:text-7xl font-extrabold mb-16 text-center text-slate-900"
        >
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 drop-shadow-sm">Me</span>
        </h2>

        {/* Bio Card */}
        <div
          ref={bioCard}
          className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] mb-12"
        >
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

        {/* Principles Grid */}
        <div ref={principlesRef} className="grid md:grid-cols-2 gap-5">
          {PRINCIPLES.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-pink-500/15 bg-white/60 backdrop-blur p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-heading text-xl font-bold text-slate-800">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-500 font-medium text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
