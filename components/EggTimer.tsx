"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EggConfig } from "@/data/eggs";
import { formatTime } from "@/data/eggs";
import PixelEgg from "./PixelEgg";
import {
  playTick,
  startLofi,
  stopLofi,
} from "@/lib/sound";

type EggTimerProps = {
  egg: EggConfig;
  onHome: () => void;
  onFinished: () => void;
};

export default function EggTimer({
  egg,
  onHome,
  onFinished,
}: EggTimerProps) {
  const [remaining, setRemaining] = useState(egg.seconds);
  const [paused, setPaused] = useState(false);

  const remainingRef = useRef(egg.seconds);
  const pausedRef = useRef(false);
  const finishedRef = useRef(false);

  // Keep remaining ref updated
  useEffect(() => {
    remainingRef.current = remaining;
  }, [remaining]);

  // Keep paused ref updated
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // Reset timer whenever a different egg is selected
  useEffect(() => {
    setRemaining(egg.seconds);
    remainingRef.current = egg.seconds;

    setPaused(false);
    pausedRef.current = false;

    finishedRef.current = false;
  }, [egg.id, egg.seconds]);

  // Start lofi + countdown
  useEffect(() => {
    startLofi();

    const id = window.setInterval(() => {
      if (pausedRef.current || finishedRef.current) {
        return;
      }

      const current = remainingRef.current;

      // Timer finished
      if (current <= 1) {
        finishedRef.current = true;

        setRemaining(0);
        remainingRef.current = 0;

        stopLofi();

        // page.tsx will play the final ding
        onFinished();

        return;
      }

      // Stronger ticking during final 5 seconds
      playTick(current <= 5);

      setRemaining((r) => {
        const next = r - 1;
        remainingRef.current = next;
        return next;
      });
    }, 1000);

    return () => {
      window.clearInterval(id);
      stopLofi();
    };
  }, [onFinished]);

  // RESET
  const handleReset = useCallback(() => {
    finishedRef.current = false;

    setRemaining(egg.seconds);
    remainingRef.current = egg.seconds;

    setPaused(false);
    pausedRef.current = false;

    stopLofi();
    startLofi();
  }, [egg.seconds]);

  // PAUSE / RESUME
  const handlePauseToggle = useCallback(() => {
    if (pausedRef.current) {
      // RESUME
      pausedRef.current = false;
      setPaused(false);

      startLofi();
    } else {
      // PAUSE
      pausedRef.current = true;
      setPaused(true);

      stopLofi();
    }
  }, []);

  // HOME
  const handleHome = useCallback(() => {
    stopLofi();
    onHome();
  }, [onHome]);

  return (
    <div className="screen-fade flex w-full max-w-lg flex-col items-center px-4 py-6 sm:py-10">
      <div className="frame w-full px-4 py-8 sm:px-10 sm:py-12">

        <div className="mb-4 flex items-center justify-center gap-2 text-[11px] text-ink sm:text-sm">
          <span aria-hidden className="text-egg-gold">
            ◆
          </span>

          <h1 className="tracking-wide">
            {egg.name}
          </h1>

          <span aria-hidden className="text-egg-gold">
            ◆
          </span>
        </div>

        <div className="mb-6 flex justify-center sm:mb-8">
          <PixelEgg
            type={egg.id}
            size={72}
          />
        </div>

        <p
          className="timer-digits mb-8 text-center text-4xl text-ink sm:mb-10 sm:text-6xl md:text-7xl"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
        >
          {formatTime(remaining)}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">

          {/* RESET */}
          <button
            type="button"
            className="btn-pixel px-3 py-2.5 text-[9px] sm:px-4 sm:text-[10px]"
            onClick={handleReset}
          >
            RESET
          </button>

          {/* PAUSE / RESUME */}
          <button
            type="button"
            className="btn-pixel btn-pixel-primary px-3 py-2.5 text-[9px] sm:px-4 sm:text-[10px]"
            onClick={handlePauseToggle}
          >
            {paused ? "RESUME" : "PAUSE"}
          </button>

          {/* HOME */}
          <button
            type="button"
            className="btn-pixel px-3 py-2.5 text-[9px] sm:px-4 sm:text-[10px]"
            onClick={handleHome}
          >
            HOME
          </button>

        </div>

        {/* Status */}
        <div className="mt-6 text-center">
          <p className="text-[7px] tracking-wider text-ink-soft sm:text-[8px]">
            {paused ? "PAUSED" : "♪ COOKING... ♪"}
          </p>
        </div>

      </div>
    </div>
  );
}