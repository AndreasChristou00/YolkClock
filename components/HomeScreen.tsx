"use client";

import type { EggConfig } from "@/data/eggs";
import { EGGS } from "@/data/eggs";
import EggCard from "./EggCard";
import { TinyEgg } from "./PixelEgg";

type HomeScreenProps = {
  onSelect: (egg: EggConfig) => void;
};

export default function HomeScreen({ onSelect }: HomeScreenProps) {
  return (
    <div className="screen-fade flex w-full max-w-3xl flex-col items-center px-4 py-6 sm:py-10">
      <div className="frame w-full px-4 py-8 sm:px-8 sm:py-10 md:px-12">
        <header className="mb-6 text-center sm:mb-8">
          <div className="mb-3 flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-egg-gold text-[10px] sm:text-xs" aria-hidden>
              ◆
            </span>

            <h1 className="text-base tracking-wide text-ink sm:text-2xl md:text-3xl">
              YOLK CLOCK 
            </h1>

            <span className="text-egg-gold text-[10px] sm:text-xs" aria-hidden>
              ◆
            </span>
          </div>

          <div className="pixel-divider mb-5" aria-hidden>
            <span className="text-[8px] text-egg-gold">◆</span>
          </div>

          <p className="text-[9px] leading-relaxed tracking-wide text-ink-soft sm:text-[11px]">
            HOW DO YOU LIKE YOUR EGGS?
          </p>
        </header>

        <div
          className="mx-auto grid w-full max-w-xl grid-cols-2 justify-items-center gap-3 sm:gap-4 md:grid-cols-4 md:gap-3"
          role="list"
          aria-label="Egg doneness options"
        >
          {EGGS.map((egg) => (
            <div
              key={egg.id}
              role="listitem"
              className="flex w-full justify-center"
            >
              <EggCard egg={egg} onSelect={onSelect} />
            </div>
          ))}
        </div>

        <footer className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
          <div className="flex items-center gap-2 text-ink-soft" aria-hidden>
            <span className="text-[8px]">◆</span>
            <TinyEgg />
            <span className="text-[8px]">◆</span>
          </div>

          <p className="text-center text-[8px] leading-relaxed tracking-wide text-ink-soft sm:text-[9px]">
            CLICK AN EGG TO START
          </p>
        </footer>
      </div>
    </div>
  );
}