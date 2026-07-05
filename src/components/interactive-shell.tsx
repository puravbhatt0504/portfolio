"use client";


import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Hero3D } from "./sections/hero-3d";
import { Skills3D } from "./sections/skills-3d";
import { Projects3D } from "./sections/projects-3d";
import { Contact3D } from "./sections/contact-3d";
import { GitHubPortfolioData } from "@/types/github";

type InteractiveShellProps = {
  data: GitHubPortfolioData;
};

export function InteractiveShell({ data }: InteractiveShellProps) {
  return (
    <SmoothScrollProvider>
      <div className="relative w-full h-full min-h-screen overflow-hidden">
        {/* Scrollable HTML Overlay */}
        <div className="relative z-10 w-full h-full text-slate-900 pointer-events-none">
          <div className="pointer-events-auto">
            <Hero3D user={data.user} stats={data.stats} />
            <Skills3D />
            <Projects3D repos={data.repos} />
            <Contact3D
              githubUrl={data.user.html_url}
              websiteUrl={data.user.blog}
              location={data.user.location}
            />
          </div>
        </div>
      </div>
    </SmoothScrollProvider>
  );
}
