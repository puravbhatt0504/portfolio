"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/lib/site";

type Contact3DProps = {
  githubUrl: string;
  websiteUrl: string | null;
  location: string | null;
};

export function Contact3D({ githubUrl, websiteUrl, location }: Contact3DProps) {
  const container = useRef<HTMLElement>(null);
  const isInView = useInView(container, { once: true, margin: "-100px" });

  const SOCIALS = [
    { label: "Email", href: `mailto:${siteConfig.email}`, icon: "✉" },
    { label: "LinkedIn", href: siteConfig.linkedin, icon: "in" },
    { label: "GitHub", href: githubUrl, icon: "gh" },
    ...(websiteUrl ? [{ label: "Web", href: websiteUrl, icon: "◎" }] : []),
  ];

  return (
    <section ref={container} id="contact" className="relative px-6 md:px-20 py-32 pb-16 z-10 overflow-hidden">
      <div className="section-divider mb-20" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -5 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: -2 } : { opacity: 0, y: 30, rotate: -5 }}
          transition={{ type: "spring", damping: 15, stiffness: 100 }}
          className="sticker px-8 py-4 mb-12 shadow-xl inline-block"
        >
          <span className="tape -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rotate-3 bg-tape mix-blend-overlay" />
          <h2 className="font-hand text-5xl sm:text-6xl font-bold text-ink">
            Crafting digital experiences <br /> with soul.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-xl text-ink/70 font-medium max-w-lg mb-12"
        >
          Interested in working together? I'm always open to new opportunities, projects, and collaborations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="sticker px-8 py-4 font-bold text-lg text-ink hover:text-blue hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            <span className="text-ink/50 mr-2">Email:</span>
            {siteConfig.email}
            <span className="text-blue ml-1">↗</span>
          </a>

          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sticker px-8 py-4 font-bold text-lg text-ink hover:text-coral hover:-translate-y-1 transition-all flex items-center gap-2 -rotate-1"
          >
            <span className="text-coral">✦</span>
            Download Resume
          </a>
        </motion.div>

        {/* Social Icons scattered like small stamps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-6 pt-8 border-t-2 border-dashed border-ink/10 w-full max-w-lg justify-center"
        >
          {SOCIALS.map((social, i) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`w-12 h-12 flex items-center justify-center font-mono font-bold text-lg text-ink/50 hover:text-coral transition-colors sticker ${i % 2 === 0 ? 'rotate-3' : '-rotate-6'}`}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

        {/* Footer info */}
        <div className="mt-20 flex flex-col items-center">
          <p className="font-hand text-xl text-ink/40 mb-2">
            made with code and chaos
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink/30">
            next.js · framer motion · tailwind
          </p>
        </div>
      </div>
    </section>
  );
}
