"use client";

import { motion } from "framer-motion";

import { useAudioLayer } from "@/components/providers/audio-provider";

export function SoundToggle() {
  const { muted, toggleMute, play } = useAudioLayer();

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
      className="fixed bottom-5 right-5 z-[130] rounded-full border border-cyan-200/30 bg-zinc-900/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100/80 backdrop-blur-md transition hover:border-emerald-300/60 hover:text-emerald-100"
      whileTap={{ scale: 0.95 }}
      data-cursor="interactive"
      type="button"
      aria-label={muted ? "Unmute interface sound" : "Mute interface sound"}
    >
      {muted ? "Sound Off" : "Sound On"}
    </motion.button>
  );
}
