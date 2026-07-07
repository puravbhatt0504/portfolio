"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { siteConfig } from "@/lib/site";
import { TextShimmer, FloatingParticles, MagneticWrap } from "@/components/ui/motion-effects";
import { SpotlightCard } from "@/components/ui/spotlight-card";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Contact3DProps = {
  githubUrl: string;
  websiteUrl: string | null;
  location: string | null;
};

export function Contact3D({ githubUrl, websiteUrl, location }: Contact3DProps) {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // main card is now handled by framer-motion
  }, { scope: container });

  return (
    <section ref={container} id="contact" className="min-h-screen flex flex-col justify-center px-4 md:px-20 py-20 relative z-10">
      <FloatingParticles count={12} seed={389} colors={["bg-violet-400/20", "bg-fuchsia-400/15", "bg-pink-400/20", "bg-blue-400/10", "bg-orange-400/10"]} />

      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 60, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpotlightCard spotlightColor="rgba(139,92,246,0.06)">
            <div className="p-6 md:p-16">
              {/* Gradient bg effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-blue-500/5 pointer-events-none rounded-3xl" />

              {/* Availability Badge */}
              <motion.div
                className="relative z-10 mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200/60"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ type: "tween", duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-sm font-medium text-emerald-700 font-mono">{siteConfig.availability}</span>
              </motion.div>
              
              <h2 className="font-heading text-6xl md:text-8xl font-extrabold mb-8 relative z-10 tracking-display text-slate-900">
                Let&apos;s{" "}
                <TextShimmer className="text-6xl md:text-8xl font-extrabold font-heading tracking-display">Connect</TextShimmer>
              </h2>
              
              <motion.p
                className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Interested in working together? I&apos;m always open to discussing new opportunities, projects, and collaborations.
              </motion.p>

              {/* Primary CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4 relative z-10 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                <MagneticWrap strength={0.12}>
                  <motion.a 
                    href={`mailto:${siteConfig.email}`}
                    className="px-10 py-5 rounded-full bg-slate-900 text-white font-bold text-xl transition-all shadow-[0_10px_20px_rgba(15,23,42,0.2)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.3)] active:scale-95 inline-block"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    data-cursor="interactive"
                  >
                    Email Me
                  </motion.a>
                </MagneticWrap>
                <MagneticWrap strength={0.12}>
                  <motion.a 
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-5 rounded-full bg-white/60 border border-white/40 text-slate-800 font-bold text-xl hover:bg-white/80 transition-colors backdrop-blur-md shadow-sm inline-block"
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    data-cursor="interactive"
                  >
                    Download Resume
                  </motion.a>
                </MagneticWrap>
              </motion.div>

              {/* Secondary Links */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 relative z-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                {[
                  { label: "LinkedIn", href: siteConfig.linkedin, hoverBg: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200/60" },
                  { label: "GitHub", href: githubUrl, hoverBg: "hover:bg-slate-50 hover:text-slate-800" },
                  ...(websiteUrl ? [{ label: "Website", href: websiteUrl, hoverBg: "hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200/60" }] : []),
                ].map((link) => (
                  <MagneticWrap key={link.label} strength={0.2}>
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-3 rounded-full border border-slate-200/60 text-slate-600 font-semibold text-base transition-all ${link.hoverBg}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      data-cursor="interactive"
                    >
                      {link.label}
                    </motion.a>
                  </MagneticWrap>
                ))}
              </motion.div>

              {/* Email + Location */}
              <motion.div
                className="mt-12 relative z-10 space-y-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <p className="text-slate-500 text-base font-mono font-medium">
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-violet-500 transition-colors" data-cursor="interactive">
                    {siteConfig.email}
                  </a>
                </p>
                {location && (
                  <p className="text-slate-400 text-sm font-mono font-medium">
                    Based in <span className="text-slate-600 font-semibold">{location}</span>
                  </p>
                )}
              </motion.div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
