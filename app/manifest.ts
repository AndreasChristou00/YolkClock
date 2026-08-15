import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yolk Clock",
    short_name: "YolkClock",
    description: "A cozy retro egg timer.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5E6C8",
    theme_color: "#F5E6C8",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}