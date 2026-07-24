"use client";

import { motion } from "framer-motion";

import { useAudioLayer } from "@/components/providers/audio-provider";
import { useIsScrolling } from "@/hooks/use-is-scrolling";
import { cn } from "@/lib/cn";

export function SoundToggle() {
  const { muted, toggleMute, play } = useAudioLayer();
  const isScrolling = useIsScrolling(200);

  return (
    <motion.button
      onClick={() => {
        toggleMute();
        play(480, 0.02, 0);
      }}
      onMouseEnter={(event) => {
        const pan = (event.clientX / window.innerWidth) * 2 - 1;
        play(360, 0.015, pan);
      }}
      className={cn(
        "fixed bottom-5 right-5 z-[130] sticker px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ink/50 transition hover:text-coral cursor-pointer bg-paper-white mix-blend-multiply transition-opacity duration-300",
        isScrolling ? "opacity-20 pointer-events-none" : "opacity-100 pointer-events-auto hover:-translate-y-1"
      )}
      whileTap={{ scale: 0.95 }}
      data-cursor="interactive"
      type="button"
      aria-label={muted ? "Unmute interface sound" : "Mute interface sound"}
    >
      {muted ? "Sound Off" : "Sound On"}
    </motion.button>
  );
}
