"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GitHubRepo } from "@/types/github";
import { VideoModal } from "@/components/ui/video-modal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TextShimmer, FloatingParticles, MagneticWrap } from "@/components/ui/motion-effects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Projects3DProps = {
  repos: GitHubRepo[];
};

const DEMO_VIDEO_PATH = "/employee-manager-demo.mp4";

function isEmployeeManager(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "").includes("employeemanager");
}

// Unique spotlight color per card
const CARD_COLORS = [
  "rgba(236,72,153,0.10)",
  "rgba(139,92,246,0.10)",
  "rgba(59,130,246,0.10)",
  "rgba(249,115,22,0.10)",
  "rgba(16,185,129,0.10)",
  "rgba(236,72,153,0.08)",
];

export function Projects3D({ repos }: Projects3DProps) {
  const topRepos = repos.slice(0, 6);
  const container = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
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
  }, { scope: container });

  return (
    <>
      <section ref={container} id="work" className="min-h-screen flex flex-col justify-center px-4 md:px-20 py-20 relative z-10">
        <FloatingParticles count={8} seed={263} colors={["bg-pink-400/15", "bg-violet-400/15", "bg-orange-400/10"]} />

        <div className="max-w-7xl mx-auto w-full">
          <h2 
            ref={headline}
            className="font-heading text-5xl md:text-8xl font-extrabold mb-20 text-center tracking-tight text-slate-900"
          >
            Selected <TextShimmer className="drop-shadow-sm text-5xl md:text-8xl font-extrabold font-heading tracking-tight">Works</TextShimmer>
          </h2>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {topRepos.map((repo, index) => {
              const hasDemo = isEmployeeManager(repo.name);

              return (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 60, scale: 0.9, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{
                    duration: 0.8,
                    delay: (index % 3) * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full"
                >
                  <SpotlightCard
                    className="h-full"
                    spotlightColor={CARD_COLORS[index % CARD_COLORS.length]}
                  >
                    <div className="flex flex-col h-full">
                      {/* Gradient orb decoration */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-orange-400/10 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150 group-hover:rotate-12" />
                      
                      <h3 className="font-heading text-3xl font-bold text-slate-800 mb-4 group-hover:text-violet-600 transition-colors drop-shadow-sm">
                        {repo.name}
                      </h3>
                      <p className="text-slate-600 font-medium mb-8 flex-grow text-lg">
                        {repo.name.toLowerCase().includes("grindflow") 
                          ? "A scalable, AI-powered knowledge exchange platform with a robust TypeScript backend and intelligent matching algorithms."
                          : repo.name.toLowerCase().includes("simulation")
                          ? "An advanced agent-based modeling system simulating complex urban policy and traffic dynamics with AI-driven behaviors."
                          : repo.name.toLowerCase().includes("employee-manager")
                          ? "A comprehensive, cross-platform enterprise solution for managing employee attendance and administrative workflows."
                          : repo.description || "Building the next generation of web experiences."}
                      </p>
                      
                      {/* Demo Video Button */}
                      {hasDemo && (
                        <MagneticWrap strength={0.1} className="w-full mb-6">
                          <button
                            type="button"
                            onClick={() => setShowDemo(true)}
                            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold text-base shadow-[0_6px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_12px_32px_rgba(139,92,246,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                          >
                            <motion.svg
                              width="20" height="20" viewBox="0 0 20 20" fill="none"
                              animate={{ scale: [1, 1.15, 1] }}
                              transition={{ type: "tween", duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <path d="M6.5 4.5L15.5 10L6.5 15.5V4.5Z" fill="white" />
                            </motion.svg>
                            Watch Demo
                          </button>
                        </MagneticWrap>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200">
                        <div className="flex gap-4 text-sm font-semibold text-slate-500 font-mono">
                          {repo.language && (
                            <span className="flex items-center gap-2">
                              <motion.span
                                className="w-3 h-3 rounded-full bg-orange-400 shadow-sm"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ type: "tween", duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-violet-500">
                            ★ {repo.stargazers_count}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {(repo.homepage || repo.name.toLowerCase().includes("grindflow")) && (
                            <MagneticWrap strength={0.3}>
                              <a
                                href={repo.name.toLowerCase().includes("grindflow") ? "https://grindflow.vercel.app/" : (repo.homepage ?? undefined)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 text-sm font-semibold hover:text-blue-600 transition-colors"
                              >
                                Live Demo ↗
                              </a>
                            </MagneticWrap>
                          )}
                          <MagneticWrap strength={0.3}>
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-500 font-bold hover:text-violet-600 transition-all"
                            >
                              Code →
                            </a>
                          </MagneticWrap>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
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
