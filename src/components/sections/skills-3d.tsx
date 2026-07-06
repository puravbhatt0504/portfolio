"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LanguageStat } from "@/types/github";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Skills3DProps = {
  languages: LanguageStat[];
  topTopics: string[];
};

export function Skills3D() {
  const container = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

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

    if (categoriesRef.current) {
      const categories = gsap.utils.toArray(categoriesRef.current.children);
      categories.forEach((category: any, i) => {
        gsap.from(category, {
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power2.out"
        });
        
        // Animate the icons within the category
        const icons = category.querySelectorAll(".skill-icon");
        if (icons.length > 0) {
          gsap.from(icons, {
            scrollTrigger: {
              trigger: category,
              start: "top 85%",
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            delay: (i * 0.2) + 0.3,
            ease: "back.out(1.7)"
          });
        }
      });
    }
  }, { scope: container });

  const techCategories = [
    {
      title: "Languages",
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
      <div className="max-w-6xl mx-auto w-full">
        <h2 
          ref={headline}
          className="font-heading text-4xl md:text-7xl font-extrabold mb-20 text-center text-slate-900"
        >
          Tech & <span className="text-blue-500 drop-shadow-sm">Tools</span>
        </h2>

        <div ref={categoriesRef} className="space-y-16">
          {techCategories.map((category) => (
            <div key={category.title} className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-slate-800 border-b border-slate-200/60 pb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                {category.skills.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="skill-icon flex flex-col items-center gap-3 group"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-lg overflow-hidden">
                      <img 
                        src={`https://skillicons.dev/icons?i=${skill.icon}`} 
                        alt={`${skill.name} logo`} 
                        className="w-12 h-12"
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-600 transition-colors duration-300 group-hover:text-blue-500">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
