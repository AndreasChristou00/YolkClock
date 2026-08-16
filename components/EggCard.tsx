"use client";

import { useState } from "react";
import type { EggConfig } from "@/data/eggs";
import PixelEgg from "./PixelEgg";

type EggCardProps = {
  egg: EggConfig;
  onSelect: (egg: EggConfig) => void;
};

const tabClassByEgg: Record<EggConfig["id"], string> = {
  soft: "egg-tab-soft",
  jammy: "egg-tab-jammy",
  medium: "egg-tab-medium",
  hard: "egg-tab-hard",
};

export default function EggCard({ egg, onSelect }: EggCardProps) {
  const [pressed, setPressed] = useState(false);

  const handleActivate = () => {
    setPressed(true);

    window.setTimeout(() => {
      setPressed(false);
      onSelect(egg);
    }, 90);
  };

  return (
    <button
      type="button"
      className={`card-pixel group flex w-full flex-col overflow-hidden ${
        pressed ? "pressed" : ""
      }`}
      onClick={handleActivate}
      aria-label={`Start ${egg.name} egg timer, ${egg.label}`}
    >
      <div
        className={`w-full border-b-[3px] border-ink px-3 py-3 text-center ${tabClassByEgg[egg.id]}`}
      >
        <span className="text-[10px] tracking-[0.12em] text-ink sm:text-[11px]">
          {egg.name}
        </span>
      </div>

      <div className="flex min-h-[210px] w-full flex-col items-center justify-center px-4 py-6 sm:min-h-[240px]">
        <div className="transition-transform duration-150 group-hover:-translate-y-1">
          <PixelEgg
            type={egg.id}
            size={100}
            className="sm:hidden"
          />

          <PixelEgg
            type={egg.id}
            size={116}
            className="hidden sm:block"
          />
        </div>

        <span className="mt-5 text-[10px] tracking-[0.08em] text-ink-soft sm:text-[11px]">
          {egg.label}
        </span>
      </div>
    </button>
  );
}