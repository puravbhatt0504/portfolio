"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { GitHubPortfolioData } from "@/types/github";

type PortfolioShellProps = {
  data: GitHubPortfolioData;
};

export function PortfolioShell({ data }: PortfolioShellProps) {
  useEffect(() => {
    document.body.dataset.portfolioHome = "true";

    return () => {
      delete document.body.dataset.portfolioHome;
    };
  }, []);

  return (
    <SmoothScrollProvider>
      <motion.main
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9 }}
        className="relative overflow-hidden"
      >
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-[10%] top-[5%] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-[10%] right-[12%] h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute left-1/2 top-[38%] h-96 w-96 -translate-x-1/2 rounded-full bg-white/6 blur-3xl" />
        </div>

        <div className="lg:h-screen lg:snap-y lg:snap-mandatory lg:overflow-y-auto">
          <HeroSection user={data.user} stats={data.stats} />
          <ImpactSection stats={data.stats} />
          <SkillsSection languages={data.languages} topTopics={data.stats.topTopics} />
          <ProjectsSection repos={data.repos} />
          <TimelineSection />
          <ContactSection
            githubUrl={data.user.html_url}
            websiteUrl={data.user.blog}
            location={data.user.location}
          />
        </div>
      </motion.main>
    </SmoothScrollProvider>
  );
}
