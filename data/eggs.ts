export type EggId = "soft" | "jammy" | "medium" | "hard";

export type EggConfig = {
  id: EggId;
  name: string;
  seconds: number;
  label: string;
};

export const EGGS: EggConfig[] = [
  { id: "soft", name: "SOFT", seconds: 300, label: "5:00" },
  { id: "jammy", name: "JAMMY", seconds: 390, label: "6:30" },
  { id: "medium", name: "MEDIUM", seconds: 480, label: "8:00" },
  { id: "hard", name: "HARD", seconds: 600, label: "10:00" },
];

export function getEggById(id: EggId): EggConfig {
  const egg = EGGS.find((e) => e.id === id);
  if (!egg) throw new Error(`Unknown egg: ${id}`);
  return egg;
}

export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;

  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}