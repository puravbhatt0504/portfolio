"use client";

import { useAudioLayer } from "@/components/providers/audio-provider";

export function useMotionSound() {
  const { play, muted, toggleMute } = useAudioLayer();

  return { play, muted, toggleMute };
}
