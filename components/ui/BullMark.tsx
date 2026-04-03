interface BullMarkProps {
  /** "light" = black mark (for light backgrounds) | "dark" = white mark (for dark backgrounds) */
  variant?: "light" | "dark";
  size?: number;
  className?: string;
}

export function BullMark({ variant = "light", size = 40, className }: BullMarkProps) {
  const head  = variant === "dark" ? "#FAFAFA" : "#0A0A0A";
  const cut   = variant === "dark" ? "#0A0A0A" : "#FAFAFA";

  const h = size;
  const w = Math.round((size / 220) * 200);

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Nalla Labs"
    >
      <polygon points="14,10 54,68 66,72"             fill={head} />
      <polygon points="186,10 146,68 134,72"           fill={head} />
      <polygon points="55,72 145,72 158,106 138,162 62,162 42,106" fill={head} />
      <polygon points="65,96 78,83 91,96 78,109"        fill={cut} />
      <polygon points="109,96 122,83 135,96 122,109"    fill={cut} />
      <rect    x="64" y="137" width="72" height="25"   fill={cut} />
      <circle  cx="81"  cy="149" r="7"                 fill={head} />
      <circle  cx="119" cy="149" r="7"                 fill={head} />
      <line x1="100" y1="72"  x2="100" y2="137" stroke={cut} strokeWidth="1.2" />
      <line x1="100" y1="83"  x2="68"  y2="95"  stroke={cut} strokeWidth="1.2" />
      <line x1="100" y1="83"  x2="132" y2="95"  stroke={cut} strokeWidth="1.2" />
      <line x1="42"  y1="106" x2="64"  y2="137" stroke={cut} strokeWidth="1.2" />
      <line x1="158" y1="106" x2="136" y2="137" stroke={cut} strokeWidth="1.2" />
    </svg>
  );
}
