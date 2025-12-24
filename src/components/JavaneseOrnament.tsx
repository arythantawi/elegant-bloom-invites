interface JavaneseOrnamentProps {
  position: "top" | "bottom" | "frame";
  className?: string;
}

const JavaneseOrnament = ({ position, className = "" }: JavaneseOrnamentProps) => {
  if (position === "frame") {
    return (
      <svg
        viewBox="0 0 400 100"
        className={`w-full h-auto ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Baroque/Javanese ornate frame top */}
        <path
          d="M0 100 C20 100 40 90 60 80 C80 70 100 60 120 55 C140 50 160 48 180 47 C190 46.5 195 46 200 45 C205 46 210 46.5 220 47 C240 48 260 50 280 55 C300 60 320 70 340 80 C360 90 380 100 400 100"
          stroke="currentColor"
          strokeWidth="2"
          className="text-burgundy"
        />
        {/* Decorative scrollwork */}
        <path
          d="M150 60 C160 55 170 50 180 48 M220 48 C230 50 240 55 250 60"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-burgundy/60"
        />
        {/* Center ornament */}
        <ellipse cx="200" cy="35" rx="25" ry="12" stroke="currentColor" strokeWidth="2" className="text-burgundy" />
        <ellipse cx="200" cy="35" rx="18" ry="8" fill="currentColor" className="text-burgundy/30" />
        {/* Side flourishes */}
        <path
          d="M100 70 Q90 65 85 55 Q80 45 90 40 Q100 35 105 45"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-burgundy/50"
        />
        <path
          d="M300 70 Q310 65 315 55 Q320 45 310 40 Q300 35 295 45"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-burgundy/50"
        />
      </svg>
    );
  }

  if (position === "top") {
    return (
      <svg
        viewBox="0 0 400 150"
        className={`w-full h-auto ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Temple silhouette */}
        <path
          d="M180 150 L180 100 L190 90 L200 70 L210 90 L220 100 L220 150"
          fill="currentColor"
          className="text-burgundy/20"
        />
        <path
          d="M160 150 L160 110 L175 95 L175 150"
          fill="currentColor"
          className="text-burgundy/15"
        />
        <path
          d="M225 150 L225 110 L240 95 L240 150"
          fill="currentColor"
          className="text-burgundy/15"
        />
        {/* Ornate arch */}
        <path
          d="M80 150 C80 80 120 40 200 30 C280 40 320 80 320 150"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-burgundy"
        />
        <path
          d="M100 150 C100 90 135 55 200 45 C265 55 300 90 300 150"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-burgundy/50"
        />
        {/* Crown ornament */}
        <path
          d="M185 30 L190 20 L200 10 L210 20 L215 30"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-burgundy"
        />
        <circle cx="200" cy="8" r="4" fill="currentColor" className="text-gold-accent/60" />
      </svg>
    );
  }

  // Bottom ornament
  return (
    <svg
      viewBox="0 0 400 100"
      className={`w-full h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tropical flowers and leaves */}
      <g className="text-turquoise/60">
        <ellipse cx="50" cy="50" rx="15" ry="8" transform="rotate(-30 50 50)" fill="currentColor" />
        <ellipse cx="55" cy="60" rx="12" ry="6" transform="rotate(20 55 60)" fill="currentColor" />
        <ellipse cx="350" cy="50" rx="15" ry="8" transform="rotate(30 350 50)" fill="currentColor" />
        <ellipse cx="345" cy="60" rx="12" ry="6" transform="rotate(-20 345 60)" fill="currentColor" />
      </g>
      {/* Orchid flowers */}
      <g className="text-dusty-pink">
        <circle cx="80" cy="40" r="8" fill="currentColor" />
        <circle cx="75" cy="35" r="6" fill="currentColor" opacity="0.8" />
        <circle cx="85" cy="35" r="6" fill="currentColor" opacity="0.8" />
        <circle cx="320" cy="40" r="8" fill="currentColor" />
        <circle cx="315" cy="35" r="6" fill="currentColor" opacity="0.8" />
        <circle cx="325" cy="35" r="6" fill="currentColor" opacity="0.8" />
      </g>
      {/* Leaves */}
      <g className="text-sage-green/50">
        <path d="M30 70 Q40 50 60 60 Q40 65 30 70" fill="currentColor" />
        <path d="M370 70 Q360 50 340 60 Q360 65 370 70" fill="currentColor" />
      </g>
      {/* Center scrollwork */}
      <path
        d="M150 80 C170 70 190 65 200 65 C210 65 230 70 250 80"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="text-burgundy/40"
      />
    </svg>
  );
};

export default JavaneseOrnament;