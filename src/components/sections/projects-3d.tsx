"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VideoModal } from "@/components/ui/video-modal";
import { featuredProjects } from "@/lib/site";

export function Projects3D() {
  const container = useRef<HTMLElement>(null);
  const [demo, setDemo] = useState<{ src: string; title: string } | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <section ref={container} id="work" className="relative z-10 px-6 md:px-20 py-16">
        <div className="section-divider mb-12" />

        <div className="text-center mb-16 relative z-20">
          <p className="font-mono text-[11px] uppercase tracking-widest text-blue mb-4">
            Selected Work
          </p>
          <h2 className="font-heading text-5xl sm:text-6xl font-bold text-ink mb-4">
            Scrapbook of <br />
            <span className="text-coral italic font-serif">Creations</span>
          </h2>
          <div className="absolute top-0 right-1/4 hidden lg:block opacity-50 -rotate-12">
            <img src="/icons/stamp-1.png" alt="" className="w-16 h-16 opacity-30" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col gap-20 relative">
          {/* Animated Sideways Connecting Line */}
          <div className="absolute left-1/2 top-32 bottom-32 w-full max-w-[800px] -translate-x-1/2 pointer-events-none hidden md:block z-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path 
                 d="M 50 0 C 100 11, 100 22, 50 33 C 0 44, 0 55, 50 66 C 100 77, 100 88, 50 100" 
                 fill="none" 
                 stroke="currentColor" 
                 strokeWidth="1" 
                 strokeDasharray="2 2" 
                 className="text-ink/10"
                 vectorEffect="non-scaling-stroke"
               />
               <motion.path 
                 d="M 50 0 C 100 11, 100 22, 50 33 C 0 44, 0 55, 50 66 C 100 77, 100 88, 50 100" 
                 fill="none" 
                 stroke="var(--coral)" 
                 strokeWidth="2" 
                 strokeDasharray="2 2"
                 vectorEffect="non-scaling-stroke"
                 style={{ pathLength: scrollYProgress }}
               />
            </svg>
          </div>
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="flex flex-col md:flex-row-reverse items-center gap-8 lg:gap-16 relative z-10"
              >
                {/* Visual / Polaroid side */}
                <div className="w-full md:w-1/2 flex justify-center relative perspective-[1000px]">
                  <motion.div 
                    whileHover={{ scale: 1.02, rotateX: 5, rotateY: isEven ? -5 : 5 }}
                    className={`polaroid w-full max-w-[360px] shadow-2xl relative bg-paper-white cursor-pointer ${isEven ? "-rotate-2" : "rotate-2"}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <span className={`tape -top-3 ${isEven ? "left-8 rotate-[-5deg]" : "right-8 rotate-[5deg]"} w-16 h-5`} />
                    <div className="relative aspect-video w-full overflow-hidden bg-ink/5 border border-ink/5 group">
                      {/* Number Overlay */}
                      <div className="absolute top-3 left-3 z-20 bg-paper-white text-ink rounded-full w-8 h-8 flex items-center justify-center font-heading text-sm font-bold shadow-md border border-ink/10">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      
                      <img src={project.image} alt={`${project.name} screenshot`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0 object-top" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--ink)_1px,_transparent_1px)] bg-[size:10px_10px] opacity-[0.03] z-10 pointer-events-none" />
                      
                      {/* Fake preview overlay */}
                      <div className="absolute bottom-4 left-4 right-4 h-24 bg-paper-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-ink/5 p-4 flex flex-col justify-center transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all z-20">
                         <span className="font-mono text-[10px] uppercase text-blue">Preview</span>
                         <div className="w-2/3 h-2 bg-ink/10 rounded-full mt-2" />
                         <div className="w-1/2 h-2 bg-ink/10 rounded-full mt-1" />
                      </div>
                    </div>
                    <div className="pt-3 flex justify-between items-center px-2">
                       <span className="font-hand text-lg text-ink/80 line-clamp-1 mr-2">{project.name}</span>
                    </div>
                  </motion.div>

                  {/* Scribble decoration */}
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
                     <svg viewBox="0 0 200 200" fill="none" stroke="var(--coral)" strokeWidth="2" className="w-[120%] h-[120%] -ml-[10%] -mt-[10%]">
                        <path d="M10 100 Q 50 10 100 100 T 190 100" strokeDasharray="5,5" />
                     </svg>
                  </div>
                </div>

                {/* Text / Details side */}
                <div className="w-full md:w-1/2 space-y-4 bg-paper/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-[0_0_40px_20px_var(--paper)]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ink/10 bg-paper-white">
                     <span className="w-2 h-2 rounded-full bg-blue" />
                     <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink/60">{project.tag}</span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-ink flex items-center gap-4">
                    <div className="bg-paper-white text-coral/80 rounded-full w-10 h-10 flex shrink-0 items-center justify-center font-mono text-lg font-light shadow-md border border-ink/10">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    {project.name}
                  </h3>

                  <p className="text-base sm:text-lg text-ink/80 leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    {project.demoVideo && (
                      <button
                        type="button"
                        onClick={() => setDemo({ src: project.demoVideo!, title: project.name })}
                        className="sticker px-6 py-2.5 text-sm font-bold flex items-center gap-2 hover:text-coral transition-colors"
                      >
                        <span className="text-coral">▶</span> Play Demo
                      </button>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sticker px-6 py-2.5 text-sm font-bold flex items-center gap-2 hover:text-blue transition-colors"
                      >
                        Live Site ↗
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 text-sm font-bold font-mono text-ink/50 hover:text-ink transition-colors flex items-center gap-2 underline decoration-wavy underline-offset-4"
                      >
                        Code Repo →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <VideoModal
        isOpen={demo !== null}
        onClose={() => setDemo(null)}
        src={demo?.src ?? ""}
        title={demo?.title ?? ""}
      />
    </>
  );
}
