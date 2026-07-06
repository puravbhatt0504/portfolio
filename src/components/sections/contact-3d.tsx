"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { siteConfig } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Contact3DProps = {
  githubUrl: string;
  websiteUrl: string | null;
  location: string | null;
};

export function Contact3D({ githubUrl, websiteUrl, location }: Contact3DProps) {
  const container = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(card.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      scale: 0.9,
      rotationX: -10,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  }, { scope: container });

  return (
    <section ref={container} id="contact" className="min-h-screen flex flex-col justify-center px-4 md:px-20 py-20 relative z-10 [perspective:1000px]">
      <div className="max-w-4xl mx-auto w-full text-center">
        <div
          ref={card}
          className="bg-white/80 border border-white/40 p-12 md:p-24 rounded-[3rem] backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_50px_rgba(31,38,135,0.05)] transform-style-3d"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-blue-500/10 pointer-events-none" />

          {/* Availability Badge */}
          <div className="relative z-10 mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-700 font-mono">{siteConfig.availability}</span>
          </div>
          
          <h2 className="font-heading text-6xl md:text-8xl font-extrabold mb-8 relative z-10 tracking-display text-slate-900">
            Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 drop-shadow-sm">Connect</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">
            Interested in working together? I&apos;m always open to discussing new opportunities, projects, and collaborations.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10 mb-6">
            <a 
              href={`mailto:${siteConfig.email}`}
              className="px-10 py-5 rounded-full bg-slate-900 text-white font-bold text-xl transition-all shadow-[0_10px_20px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_30px_rgba(15,23,42,0.3)] hover:scale-105 active:scale-95"
              data-cursor="interactive"
            >
              Email Me
            </a>
            <a 
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-full bg-white/60 border border-white/40 text-slate-800 font-bold text-xl hover:bg-white/80 transition-colors backdrop-blur-md hover:scale-105 active:scale-95 shadow-sm"
              data-cursor="interactive"
            >
              Download Resume
            </a>
          </div>

          {/* Secondary Links */}
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-slate-200/60 text-slate-600 font-semibold text-base hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200/60 transition-all"
              data-cursor="interactive"
            >
              LinkedIn
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-slate-200/60 text-slate-600 font-semibold text-base hover:bg-slate-50 hover:text-slate-800 transition-all"
              data-cursor="interactive"
            >
              GitHub
            </a>
            {websiteUrl && (
              <a 
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-slate-200/60 text-slate-600 font-semibold text-base hover:bg-slate-50 hover:text-slate-800 transition-all"
                data-cursor="interactive"
              >
                Website
              </a>
            )}
          </div>

          {/* Email + Location */}
          <div className="mt-12 relative z-10 space-y-2">
            <p className="text-slate-500 text-base font-mono font-medium">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-pink-500 transition-colors" data-cursor="interactive">
                {siteConfig.email}
              </a>
            </p>
            {location && (
              <p className="text-slate-400 text-sm font-mono font-medium">
                Based in <span className="text-slate-600 font-semibold">{location}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

