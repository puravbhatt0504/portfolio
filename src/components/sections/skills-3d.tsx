"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const ALL_SKILLS = [
  { name: "TypeScript", icon: "ts" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "next" },
  { name: "Python", icon: "py" },
  { name: "Flutter", icon: "flutter" },
  { name: "Tailwind", icon: "tailwind" },
  { name: "JavaScript", icon: "js" },
  { name: "Vite", icon: "vite" },
  { name: "Supabase", icon: "supabase" },
  { name: "Firebase", icon: "firebase" },
  { name: "PostgreSQL", icon: "postgres" },
  { name: "Git", icon: "git" },
];

export function Skills3D() {
  const container = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="skills" className="relative px-6 md:px-20 py-12 z-10 overflow-hidden flex flex-col items-center">
      <div className="section-divider mb-8" />

      <div className="text-center mb-8 relative z-20">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-ink mb-4">
          My Toolkit
        </h2>
        <p className="font-hand text-xl text-coral/80 -rotate-2">
          (drag 'em around!)
        </p>
      </div>

      <div ref={container} className="relative w-full max-w-4xl h-[250px] flex flex-wrap justify-center content-center gap-4 z-20">
        {mounted && ALL_SKILLS.map((skill, i) => {
          // Generate a somewhat random but deterministic rotation and offset for the initial scatter
          const randomRotate = (i % 3 === 0 ? -1 : 1) * ((i % 5) * 2 + 2);
          const randomY = (i % 2 === 0 ? 1 : -1) * ((i % 3) * 10);
          
          return (
            <motion.div
              key={skill.name}
              drag
              dragConstraints={container}
              dragElastic={0.2}
              whileDrag={{ scale: 1.1, rotate: 0, zIndex: 50, cursor: "grabbing" }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                damping: 12, 
                stiffness: 150, 
                delay: i * 0.05 
              }}
              style={{ rotate: randomRotate, y: randomY }}
              className="sticker flex items-center gap-3 px-4 py-2 cursor-grab select-none hover:border-coral/30 hover:shadow-lg transition-colors group bg-paper-white"
            >
              <span className="tape -top-2 left-1/2 -translate-x-1/2 w-8 h-3 -rotate-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src={`https://skillicons.dev/icons?i=${skill.icon}`}
                alt={skill.name}
                className="w-6 h-6 pointer-events-none"
                draggable={false}
              />
              <span className="text-sm font-bold text-ink/80 pointer-events-none whitespace-nowrap font-mono">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>
      
      {/* Decorative doodle in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-[0.03] pointer-events-none flex items-center justify-center">
         <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full max-w-md">
            <path d="M100 0C44.8 0 0 44.8 0 100s44.8 100 100 100 100-44.8 100-100S155.2 0 100 0zm0 180c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" />
            <path d="M100 40c-33.1 0-60 26.9-60 60s26.9 60 60 60 60-26.9 60-60-26.9-60-60-60zm0 100c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z" />
         </svg>
      </div>
    </section>
  );
}
