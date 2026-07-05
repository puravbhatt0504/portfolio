"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { GitHubUser, PortfolioStats } from "@/types/github";

gsap.registerPlugin(useGSAP);

type Hero3DProps = {
  user: GitHubUser;
  stats: PortfolioStats;
};

export function Hero3D({ user, stats }: Hero3DProps) {
  const container = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const subheadline = useRef<HTMLParagraphElement>(null);
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
    .from(subheadline.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .from(cards.current?.children || [], {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.4");
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 overflow-hidden">


      {/* Content Layer */}
      <div className="relative z-20 text-center w-full max-w-5xl">
        <h1
          ref={headline}
          className="text-6xl md:text-9xl font-black mb-6 tracking-tighter text-slate-900"
          style={{ textShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
        >
          {user.name || user.login}
        </h1>
        
        <p
          ref={subheadline}
          className="text-xl md:text-3xl text-slate-700 font-light max-w-2xl mx-auto mb-12"
        >
          {user.bio || "Building immersive and dynamic digital experiences."}
        </p>
        
        <div ref={cards} className="flex flex-wrap justify-center gap-6">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 transition-all shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:-translate-y-2 hover:scale-105 duration-300 cursor-default">
            <h3 className="text-4xl font-black text-pink-500 drop-shadow-sm">{stats.totalStars}</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Stars</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 transition-all shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:-translate-y-2 hover:scale-105 duration-300 cursor-default">
            <h3 className="text-4xl font-black text-blue-600 drop-shadow-sm">{stats.totalRepos}</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Repos</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 transition-all shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:-translate-y-2 hover:scale-105 duration-300 cursor-default">
            <h3 className="text-4xl font-black text-orange-500 drop-shadow-sm">{stats.recentActivityCount}</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Activity</p>
          </div>
        </div>
      </div>
    </section>
  );
}
