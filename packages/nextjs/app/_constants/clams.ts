export const CLAM_CHARACTERS = [
  { name: "Pearl", shellColor: "#E8D5B7", hairColor: "#8B4513", accent: "#FF69B4" },
  { name: "Marina", shellColor: "#87CEEB", hairColor: "#4169E1", accent: "#00CED1" },
  { name: "Coral", shellColor: "#FF7F7F", hairColor: "#DC143C", accent: "#FF4500" },
  { name: "Sandy", shellColor: "#F4D03F", hairColor: "#D4AC0D", accent: "#FF8C00" },
  { name: "Shelly", shellColor: "#98FB98", hairColor: "#228B22", accent: "#00FF7F" },
  { name: "Azure", shellColor: "#ADD8E6", hairColor: "#1E90FF", accent: "#00BFFF" },
  { name: "Ruby", shellColor: "#E74C3C", hairColor: "#8B0000", accent: "#FFD700" },
  { name: "Violet", shellColor: "#DDA0DD", hairColor: "#8B008B", accent: "#FF00FF" },
  { name: "Jade", shellColor: "#3CB371", hairColor: "#006400", accent: "#7CFC00" },
  { name: "Amber", shellColor: "#FFBF00", hairColor: "#B8860B", accent: "#FF6347" },
  { name: "Misty", shellColor: "#B0C4DE", hairColor: "#778899", accent: "#E0E0E0" },
  { name: "Scarlet", shellColor: "#FF2400", hairColor: "#800000", accent: "#FFA500" },
  { name: "Opal", shellColor: "#FFEFD5", hairColor: "#DEB887", accent: "#FF91A4" },
  { name: "Iris", shellColor: "#5D3FD3", hairColor: "#4B0082", accent: "#EE82EE" },
  { name: "Goldie", shellColor: "#FFD700", hairColor: "#B8860B", accent: "#DAA520" },
  { name: "Rosie", shellColor: "#FFB6C1", hairColor: "#FF69B4", accent: "#DB7093" },
  { name: "Luna", shellColor: "#C0C0C0", hairColor: "#808080", accent: "#E8E8E8" },
  { name: "Sapphire", shellColor: "#0F52BA", hairColor: "#003153", accent: "#4169E1" },
  { name: "Tansy", shellColor: "#FFA500", hairColor: "#FF8C00", accent: "#FFDAB9" },
  { name: "Celeste", shellColor: "#B2FFFF", hairColor: "#20B2AA", accent: "#7FFFD4" },
  { name: "Crimson", shellColor: "#DC143C", hairColor: "#8B0000", accent: "#FF6347" },
  { name: "Topaz", shellColor: "#FFC87C", hairColor: "#D2691E", accent: "#FFDAB9" },
  { name: "Indigo", shellColor: "#4B0082", hairColor: "#2E0854", accent: "#9370DB" },
  { name: "Coral", shellColor: "#FF6B6B", hairColor: "#B22222", accent: "#FF4500" },
  { name: "Nova", shellColor: "#9932CC", hairColor: "#4B0082", accent: "#FF00FF" },
] as const;

export type ClamCharacter = (typeof CLAM_CHARACTERS)[number];

// Number of clams eliminated per round (8 rounds total). After round 7 only the
// contestant's held clam plus one other remain for the final reveal.
export const CLAMS_PER_ROUND = [6, 5, 4, 3, 2, 1, 1, 1] as const;

export const TOTAL_ROUNDS = CLAMS_PER_ROUND.length;

export const CLAWD_DECIMALS = 18;

// ENTRY_FEE = 1000 CLAWD
export const ENTRY_FEE = 1000n * 10n ** 18n;

export const FORFEIT_TIMEOUT_SECONDS = 86400n;
