import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotation: number;
  shape: "circle" | "rectangle" | "heart";
}

interface ConfettiEffectProps {
  isActive: boolean;
}

const ConfettiEffect = ({ isActive }: ConfettiEffectProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    "hsl(327, 89%, 94%)", // blush-pink
    "hsl(321, 81%, 89%)", // soft-rose
    "hsl(315, 74%, 84%)", // warm-blush
    "hsl(315, 74%, 70%)", // accent
    "hsl(10, 100%, 98%)", // cream-white
    "hsl(340, 80%, 85%)", // light pink
    "hsl(45, 100%, 90%)", // gold tint
  ];

  const shapes: ConfettiPiece["shape"][] = ["circle", "rectangle", "heart"];

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = [];
      const pieceCount = 80;

      for (let i = 0; i < pieceCount; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 0.8,
          duration: 2 + Math.random() * 2,
          size: 6 + Math.random() * 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }

      setPieces(newPieces);

      // Clear confetti after animation
      const timer = setTimeout(() => {
        setPieces([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[110] overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: "-20px",
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        >
          {piece.shape === "circle" && (
            <div
              className="rounded-full animate-confetti-spin"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                animationDuration: `${piece.duration * 0.5}s`,
              }}
            />
          )}
          {piece.shape === "rectangle" && (
            <div
              className="animate-confetti-spin"
              style={{
                width: piece.size * 0.6,
                height: piece.size,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg)`,
                animationDuration: `${piece.duration * 0.4}s`,
              }}
            />
          )}
          {piece.shape === "heart" && (
            <svg
              viewBox="0 0 24 24"
              className="animate-confetti-spin"
              style={{
                width: piece.size,
                height: piece.size,
                fill: piece.color,
                animationDuration: `${piece.duration * 0.6}s`,
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConfettiEffect;
