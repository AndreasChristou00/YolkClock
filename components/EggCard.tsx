"use client";

import { useState } from "react";
import type { EggConfig } from "@/data/eggs";
import PixelEgg from "./PixelEgg";

type EggCardProps = {
  egg: EggConfig;
  onSelect: (egg: EggConfig) => void;
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
      className={`card-pixel flex w-full max-w-[140px] flex-col items-center gap-2 px-3 py-4 sm:max-w-[150px] sm:px-4 sm:py-5 ${
        pressed ? "pressed" : ""
      }`}
      onClick={handleActivate}
      aria-label={`Start ${egg.name} egg timer, ${egg.label}`}
    >
      <PixelEgg type={egg.id} size={72} className="sm:hidden" />
      <PixelEgg type={egg.id} size={88} className="hidden sm:block" />

      <span className="mt-1 text-[10px] leading-none tracking-wide text-ink sm:text-xs">
        {egg.name}
      </span>

      <span className="text-[9px] leading-none text-ink-soft sm:text-[10px]">
        {egg.label}
      </span>
    </button>
  );
}