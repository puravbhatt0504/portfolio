"use client";

import { motion } from "framer-motion";

import { MagneticButton } from "@/components/ui/magnetic-button";

type ContactSectionProps = {
  githubUrl: string;
};

export function ContactSection({ githubUrl }: ContactSectionProps) {
  return (
    <section className="relative flex min-h-screen snap-start items-center px-6 py-20 md:px-14">
      <motion.div
        className="mx-auto w-full max-w-6xl rounded-[2.5rem] border border-cyan-200/20 bg-zinc-900/50 p-10 backdrop-blur-xl md:p-16"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs uppercase tracking-[0.45em] text-cyan-200/70">
          Contact / Collaborate
        </p>
        <h2 className="mt-4 max-w-3xl font-heading text-4xl text-zinc-100 md:text-6xl">
          Let&apos;s craft something impossible-to-ignore.
        </h2>

        <p className="mt-6 max-w-2xl text-zinc-300/90">
          Open to product partnerships, experimental interfaces, and bold engineering challenges.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton href="https://github.com/puravbhatt0504" target="_blank">
            @puravbhatt0504
          </MagneticButton>
          <MagneticButton href={githubUrl} target="_blank">
            Follow On GitHub
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
