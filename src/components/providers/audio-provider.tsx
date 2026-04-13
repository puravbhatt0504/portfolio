"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type PlayFunction = (frequency?: number, duration?: number, pan?: number) => void;

type AudioContextValue = {
  play: PlayFunction;
  muted: boolean;
  toggleMute: () => void;
};

const SONIC_THEME_OFFSETS: Record<string, number> = {
  "/": 0,
  "/about": 36,
  "/work": 70,
  "/lab": 110,
};

const AudioLayerContext = createContext<AudioContextValue | null>(null);

function clampPan(pan: number) {
  return Math.min(1, Math.max(-1, pan));
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const contextRef = useRef<AudioContext | null>(null);
  const themeOffsetRef = useRef(0);
  const ambientRef = useRef<{
    oscillatorA: OscillatorNode;
    oscillatorB: OscillatorNode;
    gain: GainNode;
  } | null>(null);

  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem("portfolio-audio-muted") === "1";
  });

  useEffect(() => {
    const nextOffset = SONIC_THEME_OFFSETS[pathname] ?? 12;
    themeOffsetRef.current = nextOffset;

    const ambient = ambientRef.current;
    const context = contextRef.current;

    if (!ambient || !context) {
      return;
    }

    ambient.oscillatorA.frequency.setTargetAtTime(
      42 + nextOffset * 0.2,
      context.currentTime,
      0.45,
    );
    ambient.oscillatorB.frequency.setTargetAtTime(
      75 + nextOffset * 0.28,
      context.currentTime,
      0.45,
    );
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const initializeAmbient = () => {
      if (ambientRef.current) {
        return;
      }

      const context =
        contextRef.current ??
        new AudioContext({
          latencyHint: "interactive",
        });

      contextRef.current = context;

      const gain = context.createGain();
      const oscillatorA = context.createOscillator();
      const oscillatorB = context.createOscillator();

      oscillatorA.type = "sine";
      oscillatorB.type = "triangle";
      oscillatorA.frequency.value = 42 + themeOffsetRef.current * 0.2;
      oscillatorB.frequency.value = 75 + themeOffsetRef.current * 0.28;

      gain.gain.value = muted ? 0.0001 : 0.012;

      oscillatorA.connect(gain);
      oscillatorB.connect(gain);
      gain.connect(context.destination);

      oscillatorA.start();
      oscillatorB.start();

      ambientRef.current = {
        oscillatorA,
        oscillatorB,
        gain,
      };
    };

    window.addEventListener("pointerdown", initializeAmbient, { once: true });

    return () => {
      window.removeEventListener("pointerdown", initializeAmbient);
    };
  }, [muted]);

  useEffect(() => {
    const ambient = ambientRef.current;
    const context = contextRef.current;

    if (!ambient || !context) {
      return;
    }

    ambient.gain.gain.setTargetAtTime(
      muted ? 0.0001 : 0.012,
      context.currentTime,
      0.18,
    );
  }, [muted]);

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      window.localStorage.setItem("portfolio-audio-muted", next ? "1" : "0");
      return next;
    });
  }, []);

  const play = useCallback<PlayFunction>((frequency = 320, duration = 0.03, pan = 0) => {
    if (typeof window === "undefined" || muted) {
      return;
    }

    const context =
      contextRef.current ??
      new AudioContext({
        latencyHint: "interactive",
      });

    contextRef.current = context;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const panner = context.createStereoPanner();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(
      frequency + themeOffsetRef.current,
      context.currentTime,
    );

    panner.pan.setValueAtTime(clampPan(pan), context.currentTime);

    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.04, context.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + duration,
    );

    oscillator.connect(gain);
    gain.connect(panner);
    panner.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  }, [muted]);

  const value = useMemo(
    () => ({
      play,
      muted,
      toggleMute,
    }),
    [play, muted, toggleMute],
  );

  useEffect(() => {
    return () => {
      const ambient = ambientRef.current;

      if (ambient) {
        ambient.oscillatorA.stop();
        ambient.oscillatorB.stop();
        ambientRef.current = null;
      }

      contextRef.current?.close();
      contextRef.current = null;
    };
  }, []);

  return (
    <AudioLayerContext.Provider value={value}>{children}</AudioLayerContext.Provider>
  );
}

export function useAudioLayer() {
  const context = useContext(AudioLayerContext);

  if (!context) {
    return {
      play: () => undefined,
      muted: true,
      toggleMute: () => undefined,
    };
  }

  return context;
}
