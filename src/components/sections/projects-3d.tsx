"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GitHubRepo } from "@/types/github";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Projects3DProps = {
  repos: GitHubRepo[];
};

export function Projects3D({ repos }: Projects3DProps) {
  const topRepos = repos.slice(0, 6);
  const container = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const projectsGrid = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headline.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    });

    if (projectsGrid.current) {
      const cards = gsap.utils.toArray(projectsGrid.current.children);
      
      cards.forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: (i % 3) * 0.15,
          ease: "power2.out"
        });
      });
    }
  }, { scope: container });

  return (
    <section ref={container} className="min-h-screen flex flex-col justify-center px-4 md:px-20 py-20 relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        <h2 
          ref={headline}
          className="text-5xl md:text-8xl font-black mb-20 text-center tracking-tight text-slate-900"
        >
          Selected <span className="text-pink-500 drop-shadow-sm">Works</span>
        </h2>

        <div ref={projectsGrid} className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {topRepos.map((repo) => (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={repo.id}
              className="block group h-full [perspective:1000px]"
            >
              <div className="bg-white/80 border border-white/40 rounded-3xl p-8 h-full backdrop-blur-xl relative overflow-hidden flex flex-col shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] transition-transform duration-500 hover:scale-105 hover:rotate-x-2 hover:rotate-y-2">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-orange-400/10 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150" />
                
                <h3 className="text-3xl font-black text-slate-800 mb-4 group-hover:text-pink-500 transition-colors drop-shadow-sm">
                  {repo.name}
                </h3>
                <p className="text-slate-600 font-medium mb-8 flex-grow text-lg">
                  {repo.description || "Building the next generation of web experiences."}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200">
                  <div className="flex gap-4 text-sm font-bold text-slate-500">
                    {repo.language && (
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-400 shadow-sm" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-blue-500">
                      ★ {repo.stargazers_count}
                    </span>
                  </div>
                  <span 
                    className="text-pink-500 opacity-0 group-hover:opacity-100 transition-all font-black group-hover:translate-x-1"
                  >
                    Explore →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
