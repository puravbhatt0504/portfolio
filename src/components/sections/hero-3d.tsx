"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { GitHubUser, PortfolioStats } from "@/types/github";
import { siteConfig } from "@/lib/site";

type Hero3DProps = {
  user: GitHubUser;
  stats: PortfolioStats;
};

export function Hero3D({ user, stats }: Hero3DProps) {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Spring animations for load
  const springConfig = { type: "spring" as const, stiffness: 100, damping: 20 };
  
  // Custom cursor logic for tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const nameParts = (user.name || user.login || "Purav Bhatt").split(" ");

  return (
    <section ref={container} id="hero" className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 lg:px-16 overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1 relative z-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...springConfig }}
              className="text-coral font-mono text-[11px] uppercase tracking-widest mb-4"
            >
              portfolio — 2026
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...springConfig }}
              className="mb-6"
            >
              <h1 className="font-heading text-6xl sm:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-ink">
                {nameParts.join(" ")}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...springConfig }}
              className="font-cursive text-xl sm:text-2xl text-ink/80 max-w-md leading-relaxed mb-8"
            >
              Full-Stack Product Developer building polished Next.js, TypeScript, and Flutter experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...springConfig }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="#work" className="sticker group relative inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink hover:text-coral transition-colors rotate-[-2deg] hover:rotate-[1deg]">
                <span className="tape -top-2 left-1/2 w-8 h-3 -translate-x-1/2 rotate-3" />
                View Work ↘
              </a>
              <a href={`mailto:${siteConfig.email}`} className="text-ink/60 font-mono text-xs uppercase tracking-widest hover:text-blue transition-colors underline decoration-dotted underline-offset-4">
                Let's chat
              </a>
            </motion.div>
          </div>

          {/* Sticker / Card graphic */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end perspective-[1000px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ delay: 0.4, type: "spring", damping: 15, stiffness: 100 }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[400px] aspect-[4/5] polaroid cursor-pointer group"
            >
              <span className="tape -top-3 right-8 w-12 h-4 rotate-[-8deg] bg-tape shadow-sm border border-black/5" />
              
              <div className="relative w-full h-full overflow-hidden bg-ink/5 flex items-center justify-center">
                {/* Fallback pattern if no avatar, using Github avatar */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--ink)_2px,_transparent_2px)] bg-[size:16px_16px]" />
                
                <motion.img 
                  src={user.avatar_url} 
                  alt={user.name || "Avatar"} 
                  className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90 group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-500"
                />
              </div>

              <div className="pt-4 flex justify-between items-end">
                <p className="font-hand text-xl text-coral -rotate-2">hello world!</p>
                
                <div className="flex gap-3 bg-paper-white p-2 border border-ink/5 shadow-sm -rotate-1">
                  <div className="flex flex-col items-center px-2">
                    <span className="font-cursive text-xl font-bold text-ink">{user.public_repos}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-ink/40">Repos</span>
                  </div>
                  <div className="w-px h-6 bg-ink/10 self-center" />
                  <div className="flex flex-col items-center px-2">
                    <span className="font-cursive text-xl font-bold text-ink">{user.followers}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-ink/40">Followers</span>
                  </div>
                  <div className="w-px h-6 bg-ink/10 self-center" />
                  <div className="flex flex-col items-center px-2">
                    <span className="font-cursive text-xl font-bold text-coral">{stats.totalStars}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-coral/60">Stars</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating small sticker */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.7, type: "spring", bounce: 0.5 }}
              className="absolute -bottom-6 -left-6 lg:left-0 sticker z-30 rotate-[-12deg]"
            >
              <span className="tape -top-2 left-2 w-6 h-3 rotate-6" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-green">
                  Open to work
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
