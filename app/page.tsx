"use client";

import { useCallback, useState } from "react";
import type { EggConfig } from "@/data/eggs";
import HomeScreen from "@/components/HomeScreen";
import EggTimer from "@/components/EggTimer";
import FinishedScreen from "@/components/FinishedScreen";
import { playDing, unlockAudio } from "@/lib/sound";

type View = "home" | "timer" | "finished";

export default function Page() {
  const [view, setView] = useState<View>("home");
  const [selected, setSelected] = useState<EggConfig | null>(null);

  const handleSelect = useCallback((egg: EggConfig) => {
    unlockAudio();
    setSelected(egg);
    setView("timer");
  }, []);

  const handleHome = useCallback(() => {
    setView("home");
    setSelected(null);
  }, []);

  const handleFinished = useCallback(() => {
    void playDing();
    setView("finished");
  }, []);

  const handleBackToMenu = useCallback(() => {
    setView("home");
    setSelected(null);
  }, []);

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      {view === "home" && <HomeScreen onSelect={handleSelect} />}

      {view === "timer" && selected && (
        <EggTimer
          egg={selected}
          onHome={handleHome}
          onFinished={handleFinished}
        />
      )}

      {view === "finished" && selected && (
        <FinishedScreen
          egg={selected}
          onBack={handleBackToMenu}
        />
      )}
    </main>
  );
}