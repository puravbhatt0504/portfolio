"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
    <section ref={container} className="min-h-screen flex flex-col justify-center px-4 md:px-20 py-20 relative z-10 [perspective:1000px]">
      <div className="max-w-4xl mx-auto w-full text-center">
        <div
          ref={card}
          className="bg-white/80 border border-white/40 p-12 md:p-24 rounded-[3rem] backdrop-blur-2xl relative overflow-hidden shadow-[0_20px_50px_rgba(31,38,135,0.05)] transform-style-3d"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-blue-500/10 pointer-events-none" />
          
          <h2 className="text-6xl md:text-8xl font-black mb-8 relative z-10 tracking-tighter text-slate-900">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 drop-shadow-sm">Connect</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">
            Ready to build something immersive? Whether it's a new project or just saying hi, I'm always open to connecting.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-full bg-slate-900 text-white font-black text-xl transition-all shadow-[0_10px_20px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_30px_rgba(15,23,42,0.3)] hover:scale-105 active:scale-95"
            >
              GitHub Profile
            </a>
            {websiteUrl && (
              <a 
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 rounded-full bg-white/60 border border-white/40 text-slate-800 font-bold text-xl hover:bg-white/80 transition-colors backdrop-blur-md hover:scale-105 active:scale-95 shadow-sm"
              >
                Personal Website
              </a>
            )}
          </div>

          {location && (
            <p className="mt-16 text-slate-500 text-lg relative z-10 font-mono font-medium">
              Based in <span className="text-slate-800 font-bold">{location}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
