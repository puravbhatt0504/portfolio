"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { GitHubUser, PortfolioStats } from "@/types/github";
import { siteConfig } from "@/lib/site";

gsap.registerPlugin(useGSAP);

type Hero3DProps = {
  user: GitHubUser;
  stats: PortfolioStats;
};

export function Hero3D({ user, stats }: Hero3DProps) {
  const container = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const subheadline = useRef<HTMLParagraphElement>(null);
  const ctaRow = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(headline.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      filter: "blur(10px)"
    })
    .from(roleRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.5")
    .from(subheadline.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .from(ctaRow.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(cards.current?.children || [], {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.3");
  }, { scope: container });

  return (
    <section ref={container} id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 overflow-hidden">

      {/* Content Layer */}
      <div className="relative z-20 text-center w-full max-w-5xl">
        <h1
          ref={headline}
          className="font-heading text-6xl md:text-9xl font-black mb-4 tracking-display text-slate-900 [text-shadow:0_10px_30px_rgba(0,0,0,0.1)]"
        >
          {user.name || user.login}
        </h1>

        <p
          ref={roleRef}
          className="text-lg md:text-2xl font-mono font-medium text-pink-500/90 tracking-tight mb-6"
        >
          {siteConfig.role}
        </p>
        
        <p
          ref={subheadline}
          className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {user.bio || "Building production-grade apps with Next.js, TypeScript, and Flutter."}
        </p>

        {/* CTA Row */}
        <div ref={ctaRow} className="flex flex-wrap justify-center gap-4 mb-14">
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-base transition-all shadow-[0_8px_20px_rgba(15,23,42,0.2)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.3)] hover:scale-105 active:scale-95"
            data-cursor="interactive"
          >
            Download Resume
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="px-8 py-3.5 rounded-full bg-white/70 border border-slate-200/60 text-slate-800 font-bold text-base hover:bg-white/90 transition-all backdrop-blur-md hover:scale-105 active:scale-95 shadow-sm"
            data-cursor="interactive"
          >
            Get in Touch
          </a>
        </div>
        
        <div ref={cards} className="flex flex-wrap justify-center gap-6">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 transition-all shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:-translate-y-2 hover:scale-105 duration-300 cursor-default">
            <h3 className="font-heading text-4xl font-extrabold text-pink-500 drop-shadow-sm">{stats.totalStars}</h3>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-label mt-1 font-mono">Stars</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 transition-all shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:-translate-y-2 hover:scale-105 duration-300 cursor-default">
            <h3 className="font-heading text-4xl font-extrabold text-blue-600 drop-shadow-sm">{stats.totalRepos}</h3>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-label mt-1 font-mono">Repos</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 transition-all shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:-translate-y-2 hover:scale-105 duration-300 cursor-default">
            <h3 className="font-heading text-4xl font-extrabold text-orange-500 drop-shadow-sm">{stats.recentActivityCount}</h3>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-label mt-1 font-mono">Activity</p>
          </div>
        </div>
      </div>
    </section>
  );
}

