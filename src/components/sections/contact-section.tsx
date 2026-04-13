"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { siteConfig } from "@/lib/site";

type ContactSectionProps = {
  githubUrl: string;
  websiteUrl?: string | null;
  location?: string | null;
};

function normalizeWebsite(url?: string | null) {
  if (!url) {
    return "";
  }

  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function ContactSection({
  githubUrl,
  websiteUrl,
  location,
}: ContactSectionProps) {
  const externalWebsite = normalizeWebsite(websiteUrl);

  return (
    <section className="relative flex min-h-screen items-center px-6 py-20 lg:snap-start md:px-14">
      <motion.div
        className="mx-auto w-full max-w-6xl rounded-[2.5rem] border border-cyan-200/20 bg-linear-to-br from-zinc-900/80 via-zinc-900/70 to-cyan-500/10 p-10 backdrop-blur-xl md:p-16"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs uppercase tracking-[0.45em] text-cyan-200/70">
          Contact / Collaborate
        </p>
        <h2 className="mt-4 max-w-3xl font-heading text-4xl text-zinc-100 md:text-6xl">
          Let&apos;s build something clients remember for the right reasons.
        </h2>

        <p className="mt-6 max-w-2xl text-zinc-300/90">
          {siteConfig.availability}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {["Portfolio refreshes", "Internal tools", "Product UI", location]
            .filter(Boolean)
            .map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-200/80"
              >
                {item}
              </span>
            ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton href="/work">Browse More Work</MagneticButton>
          <MagneticButton href={githubUrl} target="_blank">
            Follow On GitHub
          </MagneticButton>
          {externalWebsite ? (
            <MagneticButton
              href={externalWebsite}
              target="_blank"
              className="border-emerald-300/40"
            >
              Visit Website
            </MagneticButton>
          ) : null}
        </div>

        <div className="mt-8 text-sm text-zinc-400">
          Prefer context first? Start with the curated work on{" "}
          <Link href="/work" className="text-cyan-200 transition hover:text-cyan-100">
            the work page
          </Link>
          .
        </div>
      </motion.div>
    </section>
  );
}
