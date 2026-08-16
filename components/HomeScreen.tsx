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
    <div className="screen-fade flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 md:px-10">
      <div className="frame w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14 lg:px-16">
        <header className="text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span
              className="text-egg-gold text-[10px] sm:text-xs md:text-sm"
              aria-hidden
            >
              ◆
            </span>

            <h1 className="text-2xl tracking-wide text-ink sm:text-3xl md:text-4xl lg:text-5xl">
              YOLK CLOCK
            </h1>

            <span
              className="text-egg-gold text-[10px] sm:text-xs md:text-sm"
              aria-hidden
            >
              ◆
            </span>
          </div>

          <div className="pixel-divider mx-auto mt-5 mb-7 max-w-md" aria-hidden>
            <span className="text-[8px] text-egg-gold">◆</span>
          </div>

          <p className="text-[9px] tracking-[0.14em] text-ink-soft sm:text-[10px] md:text-[11px]">
            HOW DO YOU LIKE YOUR EGGS?
          </p>
        </header>

        <div
          className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-2 gap-4 sm:gap-5 md:mt-12 md:grid-cols-4 md:gap-6"
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

        <footer className="mt-10 flex flex-col items-center gap-4 sm:mt-12 md:mt-14">
          <div className="flex items-center gap-3 text-ink-soft" aria-hidden>
            <span className="text-[8px]">◆</span>
            <TinyEgg />
            <span className="text-[8px]">◆</span>
          </div>

          <p className="text-center text-[8px] tracking-[0.14em] text-ink-soft sm:text-[9px]">
            CLICK AN EGG TO START
          </p>
        </footer>
      </div>
    </div>
  );
}