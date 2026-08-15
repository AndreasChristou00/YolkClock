"use client";

import type { EggConfig } from "@/data/eggs";
import PixelEgg from "./PixelEgg";

type FinishedScreenProps = {
  egg: EggConfig;
  onBack: () => void;
};

export default function FinishedScreen({
  egg,
  onBack,
}: FinishedScreenProps) {
  return (
    <div className="screen-fade flex w-full max-w-lg flex-col items-center px-4 py-6 sm:py-10">
      <div className="frame w-full px-4 py-10 text-center sm:px-10 sm:py-12">
        
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="sparkle text-sm" aria-hidden>
            ✦
          </span>

          <h1 className="text-2xl tracking-wide text-soft-orange sm:text-4xl">
            DING!
          </h1>

          <span className="sparkle text-sm" aria-hidden>
            ✦
          </span>
        </div>

        <div className="relative mb-6 inline-flex items-center justify-center">
          <span
            className="sparkle absolute -left-6 -top-2 text-xs"
            aria-hidden
          >
            ◆
          </span>

          <span
            className="sparkle absolute -right-5 top-0 text-xs"
            aria-hidden
          >
            ✦
          </span>

          <PixelEgg type={egg.id} size={128} />
        </div>

        <p className="mb-8 text-[10px] tracking-wide text-ink sm:text-xs">
          YOUR EGG IS READY!
        </p>

        <button
          type="button"
          className="btn-pixel btn-pixel-primary px-5 py-3 text-[10px] sm:px-8 sm:text-xs"
          onClick={onBack}
        >
          BACK TO MENU
        </button>

      </div>
    </div>
  );
}