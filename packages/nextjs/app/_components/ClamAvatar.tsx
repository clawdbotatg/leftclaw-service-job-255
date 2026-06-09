import { CLAM_CHARACTERS } from "~~/app/_constants/clams";

type ClamCharacter = (typeof CLAM_CHARACTERS)[number];

export const ClamAvatar = ({ char, size = 60 }: { char: ClamCharacter; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60">
    {/* Shell */}
    <ellipse cx="30" cy="35" rx="25" ry="20" fill={char.shellColor} />
    <ellipse cx="30" cy="30" rx="22" ry="18" fill={char.shellColor} opacity="0.8" />
    {/* Pearl highlight */}
    <circle cx="30" cy="32" r="6" fill={char.accent} opacity="0.7" />
    {/* Face */}
    <circle cx="30" cy="20" r="12" fill={char.hairColor} opacity="0.9" />
    <circle cx="27" cy="18" r="2" fill="white" />
    <circle cx="33" cy="18" r="2" fill="white" />
    <path d="M 26 23 Q 30 26 34 23" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);
