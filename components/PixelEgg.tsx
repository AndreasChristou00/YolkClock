import type { EggId } from "@/data/eggs";

type PixelEggProps = {
  type: EggId;
  size?: number;
  className?: string;
  "aria-hidden"?: boolean;
};

export default function PixelEgg({
  type,
  size = 96,
  className = "",
  "aria-hidden": ariaHidden = true,
}: PixelEggProps) {
  const yolk = yolkLayers(type);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden={ariaHidden}
      shapeRendering="crispEdges"
      style={{ imageRendering: "pixelated" }}
    >
      <path
        fill="#2A2118"
        d="M12 2h8v1h2v1h2v2h1v2h1v4h1v6h-1v4h-1v2h-1v2h-2v1h-2v1h-8v-1h-2v-1h-2v-2h-1v-2h-1v-4h-1v-6h1v-4h1v-2h1v-2h2v-1h2v-1z"
      />

      <path
        fill="#FFF8E8"
        d="M12 3h8v1h2v1h1v2h1v2h1v4h1v6h-1v4h-1v2h-1v1h-2v1h-8v-1h-2v-1h-1v-2h-1v-4h-1v-6h1v-4h1v-2h1v-1h2v-1h2v-1z"
      />

      <rect x="11" y="6" width="3" height="4" fill="#FFFFFF" opacity="0.7" />
      <rect x="10" y="8" width="2" height="5" fill="#FFFFFF" opacity="0.45" />

      {yolk}

      <path
        fill="#E8DCC0"
        opacity="0.55"
        d="M11 24h10v1h-1v1h-8v-1h-1z"
      />
    </svg>
  );
}

function yolkLayers(type: EggId) {
  switch (type) {
    case "soft":
      return (
        <g>
          <ellipse cx="16" cy="16" rx="7" ry="8" fill="#E8913A" />
          <ellipse cx="16" cy="16" rx="5.5" ry="6.5" fill="#F0A030" />
          <ellipse cx="16" cy="17" rx="4" ry="5" fill="#FFB84A" />
          <ellipse cx="14" cy="13.5" rx="2" ry="2.2" fill="#FFD080" opacity="0.9" />
        </g>
      );

    case "jammy":
      return (
        <g>
          <ellipse cx="16" cy="16" rx="6.5" ry="7.5" fill="#D4782A" />
          <ellipse cx="16" cy="16" rx="5" ry="6" fill="#E8913A" />
          <ellipse cx="16" cy="16.5" rx="3.5" ry="4.2" fill="#F5A832" />
        </g>
      );

    case "medium":
      return (
        <g>
          <ellipse cx="16" cy="16.5" rx="5.5" ry="6" fill="#E8A838" />
          <ellipse cx="16" cy="16.5" rx="4" ry="4.5" fill="#F5C542" />
          <ellipse cx="16" cy="17" rx="2.5" ry="3" fill="#F0D060" />
        </g>
      );

    case "hard":
      return (
        <g>
          <ellipse cx="16" cy="16.5" rx="6" ry="6.5" fill="#E8D078" />
          <ellipse cx="16" cy="16.5" rx="5" ry="5.5" fill="#F0D878" />
        </g>
      );
  }
}

export function TinyEgg() {
  return (
    <svg width={18} height={22} viewBox="0 0 12 16" aria-hidden>
      <path
        fill="#2A2118"
        d="M4 0h4v1h1v1h1v2h1v3h-1v3h-1v2h-1v1h-4v-1h-1v-2h-1v-3h-1v-3h1v-2h1v-1h1z"
      />
      <path
        fill="#FFF8E8"
        d="M4 1h4v1h1v2h1v3h-1v3h-1v1h-4v-1h-1v-3h-1v-3h1v-2h1z"
      />
      <ellipse cx="6" cy="8" rx="2.2" ry="2.6" fill="#F5C542" />
    </svg>
  );
}