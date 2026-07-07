"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TextShimmer, FloatingParticles } from "@/components/ui/motion-effects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Skills3D() {
  const container = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(headline.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  }, { scope: container });

  const techCategories = [
    {
      title: "Languages",
      color: "rgba(249,115,22,0.10)",
      skills: [
        { name: "TypeScript", icon: "ts" },
        { name: "JavaScript", icon: "js" },
        { name: "Python", icon: "py" },
        { name: "Dart", icon: "dart" },
        { name: "HTML5", icon: "html" },
        { name: "CSS3", icon: "css" },
      ]
    },
    {
      title: "Frameworks & Libraries",
      color: "rgba(139,92,246,0.10)",
      skills: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "next" },
        { name: "Flutter", icon: "flutter" },
        { name: "Flask", icon: "flask" },
        { name: "TailwindCSS", icon: "tailwind" },
        { name: "Vite", icon: "vite" },
      ]
    },
    {
      title: "Backend & Infrastructure",
      color: "rgba(59,130,246,0.10)",
      skills: [
        { name: "Supabase", icon: "supabase" },
        { name: "Firebase", icon: "firebase" },
        { name: "PostgreSQL", icon: "postgres" },
        { name: "Vercel", icon: "vercel" },
        { name: "Git", icon: "git" },
      ]
    }
  ];

  return (
    <section ref={container} id="skills" className="min-h-screen flex flex-col justify-center px-4 md:px-20 py-20 relative z-10">
      <FloatingParticles count={10} seed={137} colors={["bg-blue-400/15", "bg-violet-400/15", "bg-orange-400/10", "bg-fuchsia-400/10"]} />

      <div className="max-w-6xl mx-auto w-full">
        <h2 
          ref={headline}
          className="font-heading text-4xl md:text-7xl font-extrabold mb-20 text-center text-slate-900"
        >
          Tech & <TextShimmer className="drop-shadow-sm text-4xl md:text-7xl font-extrabold font-heading">Tools</TextShimmer>
        </h2>

        <div className="space-y-16">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: -60, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.9,
                delay: catIndex * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <SpotlightCard spotlightColor={category.color}>
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-slate-800 border-b border-slate-200/60 pb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBubble
                      key={skill.name}
                      skill={skill}
                      index={skillIndex}
                      catDelay={catIndex * 0.15}
                    />
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Individual Skill Bubble ─── */
function SkillBubble({
  skill,
  index,
  catDelay,
}: {
  skill: { name: string; icon: string };
  index: number;
  catDelay: number;
}) {
  return (
    <motion.div
      className="skill-icon flex flex-col items-center gap-3 group cursor-default"
      initial={{ opacity: 0, scale: 0, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{
        delay: catDelay + index * 0.06 + 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <motion.div
        className="relative w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 overflow-hidden"
        whileHover={{
          scale: 1.18,
          y: -8,
          rotate: -3,
          boxShadow: "0 16px 40px rgba(139,92,246,0.15), 0 0 0 2px rgba(139,92,246,0.1)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {/* Shimmer overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <img 
          src={`https://skillicons.dev/icons?i=${skill.icon}`} 
          alt={`${skill.name} logo`} 
          className="w-12 h-12 relative z-10"
        />
      </motion.div>
      <motion.span
        className="text-sm font-medium text-slate-600 transition-colors duration-300 group-hover:text-violet-600"
        whileHover={{ scale: 1.05 }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );
}
