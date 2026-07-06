"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GitHubRepo } from "@/types/github";
import { VideoModal } from "@/components/ui/video-modal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Projects3DProps = {
  repos: GitHubRepo[];
};

const DEMO_VIDEO_PATH = "/employee-manager-demo.mp4";

function isEmployeeManager(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "").includes("employeemanager");
}

export function Projects3D({ repos }: Projects3DProps) {
  const topRepos = repos.slice(0, 6);
  const container = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const projectsGrid = useRef<HTMLDivElement>(null);
  const [showDemo, setShowDemo] = useState(false);

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
    <>
      <section ref={container} id="work" className="min-h-screen flex flex-col justify-center px-4 md:px-20 py-20 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <h2 
            ref={headline}
            className="font-heading text-5xl md:text-8xl font-extrabold mb-20 text-center tracking-tight text-slate-900"
          >
            Selected <span className="text-pink-500 drop-shadow-sm">Works</span>
          </h2>

          <div ref={projectsGrid} className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {topRepos.map((repo) => {
              const hasDemo = isEmployeeManager(repo.name);

              return (
                <div
                  key={repo.id}
                  className="block group h-full [perspective:1000px]"
                >
                  <div className="bg-white/80 border border-white/40 rounded-3xl p-8 h-full backdrop-blur-xl relative overflow-hidden flex flex-col shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] transition-transform duration-500 hover:scale-105 hover:rotate-x-2 hover:rotate-y-2">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-orange-400/10 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150" />
                    
                    <h3 className="font-heading text-3xl font-bold text-slate-800 mb-4 group-hover:text-pink-500 transition-colors drop-shadow-sm">
                      {repo.name}
                    </h3>
                    <p className="text-slate-600 font-medium mb-8 flex-grow text-lg">
                      {repo.description || "Building the next generation of web experiences."}
                    </p>
                    
                    {/* Demo Video Button — only for Employee Manager Final */}
                    {hasDemo && (
                      <button
                        type="button"
                        onClick={() => setShowDemo(true)}
                        className="mb-6 w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-base shadow-[0_6px_20px_rgba(236,72,153,0.25)] hover:shadow-[0_10px_28px_rgba(236,72,153,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.5 4.5L15.5 10L6.5 15.5V4.5Z" fill="white" />
                        </svg>
                        Watch Demo
                      </button>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200">
                      <div className="flex gap-4 text-sm font-semibold text-slate-500 font-mono">
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
                      <div className="flex items-center gap-3">
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-sm font-semibold hover:text-blue-600 transition-colors"
                          >
                            Live Demo ↗
                          </a>
                        )}
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-500 font-bold hover:text-pink-600 transition-all hover:translate-x-1"
                        >
                          Code →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
        src={DEMO_VIDEO_PATH}
        title="Employee Manager Final"
      />
    </>
  );
}

