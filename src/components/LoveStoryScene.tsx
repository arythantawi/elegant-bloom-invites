import React from "react";

interface LoveStorySceneProps {
  scene: 1 | 2 | 3 | 4;
  isActive: boolean;
}

const LoveStoryScene = ({ scene, isActive }: LoveStorySceneProps) => {
  // Scene 1: Café Meeting 2020
  const CafeScene = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="cafeWarmLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(45, 80%, 95%)" />
          <stop offset="100%" stopColor="hsl(35, 70%, 85%)" />
        </linearGradient>
        <linearGradient id="windowLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(50, 90%, 90%)" />
          <stop offset="100%" stopColor="hsl(40, 60%, 80%)" />
        </linearGradient>
      </defs>

      {/* Background - Café interior */}
      <rect width="400" height="300" fill="url(#cafeWarmLight)" />
      
      {/* Window with sunlight */}
      <rect x="250" y="20" width="120" height="100" rx="5" fill="url(#windowLight)" opacity="0.8" />
      <rect x="255" y="25" width="50" height="40" fill="hsl(200, 70%, 85%)" opacity="0.6" />
      <rect x="315" y="25" width="50" height="40" fill="hsl(200, 70%, 85%)" opacity="0.6" />
      
      {/* Sun rays animation */}
      <g className={`${isActive ? "animate-pulse" : ""}`} opacity="0.3">
        <line x1="370" y1="70" x2="390" y2="50" stroke="hsl(45, 90%, 70%)" strokeWidth="2" />
        <line x1="370" y1="70" x2="395" y2="70" stroke="hsl(45, 90%, 70%)" strokeWidth="2" />
        <line x1="370" y1="70" x2="390" y2="90" stroke="hsl(45, 90%, 70%)" strokeWidth="2" />
      </g>

      {/* Café Table */}
      <ellipse cx="200" cy="250" rx="100" ry="20" fill="hsl(25, 40%, 35%)" />
      <rect x="110" y="180" width="180" height="70" rx="5" fill="hsl(25, 45%, 40%)" />
      
      {/* Plant decorations */}
      <g transform="translate(50, 120)">
        <rect x="0" y="30" width="25" height="35" rx="3" fill="hsl(25, 30%, 50%)" />
        <ellipse cx="12" cy="25" rx="18" ry="25" fill="hsl(130, 35%, 45%)" />
        <ellipse cx="5" cy="30" rx="12" ry="18" fill="hsl(130, 40%, 40%)" />
        <ellipse cx="20" cy="28" rx="14" ry="20" fill="hsl(130, 30%, 50%)" />
      </g>

      {/* Oky Character - sitting at table */}
      <g transform="translate(140, 130)" className={`${isActive ? "animate-[bounceIn_0.8s_ease-out]" : ""}`}>
        {/* Body */}
        <rect x="15" y="40" width="40" height="50" rx="5" fill="hsl(220, 50%, 45%)" />
        {/* Head */}
        <circle cx="35" cy="25" r="22" fill="hsl(25, 40%, 75%)" />
        {/* Hair */}
        <path d="M15 20 Q35 0 55 20 Q55 10 35 8 Q15 10 15 20" fill="hsl(20, 30%, 20%)" />
        {/* Glasses */}
        <circle cx="28" cy="23" r="6" fill="none" stroke="hsl(0, 0%, 30%)" strokeWidth="1.5" />
        <circle cx="42" cy="23" r="6" fill="none" stroke="hsl(0, 0%, 30%)" strokeWidth="1.5" />
        <line x1="34" y1="23" x2="36" y2="23" stroke="hsl(0, 0%, 30%)" strokeWidth="1.5" />
        {/* Smile */}
        <path d="M30 32 Q35 36 40 32" fill="none" stroke="hsl(0, 50%, 60%)" strokeWidth="1.5" />
        {/* Laptop */}
        <rect x="5" y="85" width="60" height="8" rx="2" fill="hsl(0, 0%, 40%)" />
        <rect x="10" y="60" width="50" height="30" rx="2" fill="hsl(0, 0%, 50%)" transform="rotate(-10, 35, 75)" />
      </g>

      {/* Mita Character */}
      <g transform="translate(220, 130)" className={`${isActive ? "animate-[bounceIn_0.8s_ease-out_0.3s_both]" : ""}`}>
        {/* Body - casual dress */}
        <path d="M15 40 Q35 35 55 40 L50 90 Q35 95 20 90 Z" fill="hsl(10, 45%, 65%)" />
        {/* Head */}
        <circle cx="35" cy="25" r="22" fill="hsl(25, 45%, 78%)" />
        {/* Hair - long */}
        <path d="M10 25 Q20 0 35 0 Q50 0 60 25 Q65 50 55 60 Q45 55 35 55 Q25 55 15 60 Q5 50 10 25" fill="hsl(20, 35%, 15%)" />
        {/* Eyes */}
        <ellipse cx="28" cy="22" rx="3" ry="4" fill="hsl(20, 30%, 20%)" />
        <ellipse cx="42" cy="22" rx="3" ry="4" fill="hsl(20, 30%, 20%)" />
        {/* Smile */}
        <path d="M28 32 Q35 38 42 32" fill="none" stroke="hsl(0, 50%, 60%)" strokeWidth="1.5" />
        {/* Coffee cup */}
        <g transform="translate(50, 50)">
          <rect x="0" y="5" width="15" height="20" rx="3" fill="hsl(0, 0%, 95%)" />
          <path d="M15 10 Q25 12 25 18 Q25 24 15 20" fill="none" stroke="hsl(0, 0%, 90%)" strokeWidth="2" />
          {/* Steam */}
          <path d="M5 0 Q8 -5 5 -10" fill="none" stroke="hsl(0, 0%, 70%)" strokeWidth="1" className="animate-pulse" />
          <path d="M10 2 Q13 -3 10 -8" fill="none" stroke="hsl(0, 0%, 70%)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
        </g>
      </g>

      {/* Hearts floating */}
      {isActive && (
        <g className="animate-[float_3s_ease-in-out_infinite]">
          <path d="M195 100 C195 95 200 90 205 95 C210 90 215 95 215 100 C215 108 205 115 205 115 C205 115 195 108 195 100" 
                fill="hsl(350, 70%, 70%)" opacity="0.6" />
        </g>
      )}

      {/* Banner - Community Event */}
      <g transform="translate(30, 40)">
        <rect x="0" y="0" width="80" height="25" rx="3" fill="hsl(200, 40%, 50%)" opacity="0.7" />
        <text x="10" y="17" fontSize="8" fill="white" fontFamily="sans-serif">KOMUNITAS</text>
      </g>
    </svg>
  );

  // Scene 2: Park/Lake - Love Journey 2021
  const ParkScene = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="goldenHour" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(35, 85%, 80%)" />
          <stop offset="50%" stopColor="hsl(30, 80%, 75%)" />
          <stop offset="100%" stopColor="hsl(25, 70%, 70%)" />
        </linearGradient>
        <linearGradient id="lakeWater" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(200, 50%, 70%)" />
          <stop offset="100%" stopColor="hsl(210, 40%, 55%)" />
        </linearGradient>
      </defs>

      {/* Sky - Golden hour */}
      <rect width="400" height="180" fill="url(#goldenHour)" />
      
      {/* Sun setting */}
      <circle cx="350" cy="80" r="35" fill="hsl(40, 90%, 65%)" opacity="0.8" />
      <circle cx="350" cy="80" r="25" fill="hsl(45, 95%, 75%)" opacity="0.9" />

      {/* Distant mountains/trees */}
      <path d="M0 160 Q50 130 100 160 Q150 140 200 160 Q250 145 300 160 Q350 135 400 160 L400 180 L0 180 Z" 
            fill="hsl(130, 25%, 50%)" opacity="0.6" />

      {/* Lake */}
      <ellipse cx="200" cy="250" rx="180" ry="60" fill="url(#lakeWater)" opacity="0.8" />
      
      {/* Reflection shimmer */}
      <g className={`${isActive ? "animate-pulse" : ""}`} opacity="0.3">
        <ellipse cx="180" cy="240" rx="40" ry="5" fill="hsl(45, 80%, 80%)" />
        <ellipse cx="220" cy="250" rx="30" ry="4" fill="hsl(45, 80%, 80%)" />
      </g>

      {/* Grass/Ground */}
      <rect x="0" y="175" width="400" height="30" fill="hsl(100, 35%, 50%)" />
      
      {/* Trees */}
      <g transform="translate(30, 100)">
        <rect x="15" y="50" width="15" height="40" fill="hsl(25, 35%, 35%)" />
        <ellipse cx="22" cy="35" rx="30" ry="40" fill="hsl(120, 30%, 40%)" />
      </g>
      <g transform="translate(320, 110)">
        <rect x="15" y="40" width="12" height="35" fill="hsl(25, 35%, 35%)" />
        <ellipse cx="21" cy="25" rx="25" ry="35" fill="hsl(120, 35%, 45%)" />
      </g>

      {/* Bench with couple */}
      <g transform="translate(130, 155)">
        {/* Bench */}
        <rect x="0" y="25" width="100" height="8" rx="2" fill="hsl(25, 40%, 40%)" />
        <rect x="5" y="33" width="8" height="15" fill="hsl(25, 40%, 35%)" />
        <rect x="87" y="33" width="8" height="15" fill="hsl(25, 40%, 35%)" />
        <rect x="0" y="10" width="100" height="6" rx="2" fill="hsl(25, 40%, 45%)" />
        <rect x="0" y="10" width="4" height="25" fill="hsl(25, 40%, 35%)" />
        <rect x="96" y="10" width="4" height="25" fill="hsl(25, 40%, 35%)" />

        {/* Oky sitting */}
        <g transform="translate(25, -30)" className={`${isActive ? "animate-[bounceIn_0.8s_ease-out]" : ""}`}>
          <rect x="5" y="25" width="25" height="30" rx="3" fill="hsl(210, 45%, 50%)" />
          <circle cx="17" cy="12" r="14" fill="hsl(25, 40%, 75%)" />
          <path d="M5 8 Q17 -2 29 8 Q29 2 17 0 Q5 2 5 8" fill="hsl(20, 30%, 20%)" />
          <circle cx="12" cy="11" r="4" fill="none" stroke="hsl(0, 0%, 30%)" strokeWidth="1" />
          <circle cx="22" cy="11" r="4" fill="none" stroke="hsl(0, 0%, 30%)" strokeWidth="1" />
          <path d="M13 18 Q17 22 21 18" fill="none" stroke="hsl(0, 50%, 60%)" strokeWidth="1" />
        </g>

        {/* Mita sitting close */}
        <g transform="translate(50, -30)" className={`${isActive ? "animate-[bounceIn_0.8s_ease-out_0.3s_both]" : ""}`}>
          <path d="M5 25 Q17 22 29 25 L27 55 Q17 58 7 55 Z" fill="hsl(340, 50%, 70%)" />
          <circle cx="17" cy="12" r="14" fill="hsl(25, 45%, 78%)" />
          <path d="M0 12 Q10 -5 17 -5 Q24 -5 34 12 Q38 30 30 35 Q22 32 17 32 Q12 32 4 35 Q-4 30 0 12" 
                fill="hsl(20, 35%, 18%)" />
          <ellipse cx="12" cy="10" rx="2" ry="3" fill="hsl(20, 30%, 20%)" />
          <ellipse cx="22" cy="10" rx="2" ry="3" fill="hsl(20, 30%, 20%)" />
          <path d="M12 18 Q17 23 22 18" fill="none" stroke="hsl(0, 50%, 60%)" strokeWidth="1" />
        </g>
      </g>

      {/* Hearts and sparkles */}
      {isActive && (
        <>
          <g className="animate-[float_2.5s_ease-in-out_infinite]">
            <path d="M200 130 C200 125 205 120 210 125 C215 120 220 125 220 130 C220 138 210 145 210 145 C210 145 200 138 200 130" 
                  fill="hsl(350, 70%, 65%)" opacity="0.7" />
          </g>
          <g className="animate-[float_3s_ease-in-out_infinite_0.5s]">
            <path d="M185 140 C185 137 188 134 191 137 C194 134 197 137 197 140 C197 145 191 150 191 150 C191 150 185 145 185 140" 
                  fill="hsl(350, 60%, 75%)" opacity="0.5" />
          </g>
        </>
      )}
    </svg>
  );

  // Scene 3: Evening Reunion & Proposal 2024
  const ProposalScene = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="eveningGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(260, 40%, 30%)" />
          <stop offset="50%" stopColor="hsl(280, 35%, 25%)" />
          <stop offset="100%" stopColor="hsl(300, 30%, 20%)" />
        </linearGradient>
        <radialGradient id="warmLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(40, 80%, 70%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(40, 80%, 70%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Evening sky */}
      <rect width="400" height="300" fill="url(#eveningGlow)" />
      
      {/* Stars */}
      <g fill="white" opacity="0.6">
        <circle cx="50" cy="40" r="1.5" className="animate-pulse" />
        <circle cx="120" cy="60" r="1" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
        <circle cx="200" cy="30" r="1.5" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
        <circle cx="280" cy="50" r="1" className="animate-pulse" style={{ animationDelay: "0.9s" }} />
        <circle cx="350" cy="70" r="1.5" className="animate-pulse" style={{ animationDelay: "1.2s" }} />
        <circle cx="80" cy="90" r="1" className="animate-pulse" style={{ animationDelay: "0.4s" }} />
        <circle cx="320" cy="25" r="1" className="animate-pulse" style={{ animationDelay: "0.7s" }} />
      </g>

      {/* Moon */}
      <circle cx="320" cy="60" r="25" fill="hsl(50, 80%, 90%)" opacity="0.9" />
      <circle cx="315" cy="55" r="22" fill="url(#eveningGlow)" opacity="0.3" />

      {/* River/Riverside */}
      <path d="M0 250 Q100 230 200 250 Q300 270 400 250 L400 300 L0 300 Z" 
            fill="hsl(210, 40%, 35%)" opacity="0.8" />
      
      {/* Riverside path */}
      <rect x="0" y="200" width="400" height="60" fill="hsl(30, 20%, 40%)" />

      {/* Warm lamp light */}
      <circle cx="150" cy="150" r="80" fill="url(#warmLight)" />
      
      {/* Street lamp */}
      <g transform="translate(130, 100)">
        <rect x="8" y="20" width="4" height="100" fill="hsl(0, 0%, 25%)" />
        <circle cx="10" cy="25" r="12" fill="hsl(45, 90%, 70%)" opacity="0.9" />
        <circle cx="10" cy="25" r="8" fill="hsl(50, 95%, 85%)" />
        <path d="M0 25 Q10 35 20 25" fill="hsl(0, 0%, 25%)" />
      </g>

      {/* Oky kneeling */}
      <g transform="translate(170, 140)" className={`${isActive ? "animate-[bounceIn_0.8s_ease-out]" : ""}`}>
        {/* Body kneeling */}
        <path d="M10 30 L20 30 L25 60 L5 60 Z" fill="hsl(0, 0%, 20%)" />
        <ellipse cx="28" cy="65" rx="12" ry="8" fill="hsl(0, 0%, 20%)" />
        {/* Head */}
        <circle cx="17" cy="15" r="14" fill="hsl(25, 40%, 75%)" />
        <path d="M5 10 Q17 0 29 10 Q29 5 17 3 Q5 5 5 10" fill="hsl(20, 30%, 20%)" />
        <circle cx="12" cy="13" r="4" fill="none" stroke="hsl(0, 0%, 30%)" strokeWidth="1" />
        <circle cx="22" cy="13" r="4" fill="none" stroke="hsl(0, 0%, 30%)" strokeWidth="1" />
        {/* Hopeful smile */}
        <path d="M13 22 Q17 26 21 22" fill="none" stroke="hsl(0, 50%, 60%)" strokeWidth="1.5" />
        
        {/* Ring box */}
        <g transform="translate(25, 40)">
          <rect x="0" y="0" width="18" height="15" rx="2" fill="hsl(340, 60%, 40%)" />
          <rect x="2" y="2" width="14" height="8" rx="1" fill="hsl(340, 50%, 50%)" />
          {/* Ring */}
          <circle cx="9" cy="6" r="4" fill="none" stroke="hsl(45, 80%, 60%)" strokeWidth="2" />
          <circle cx="9" cy="3" r="2" fill="hsl(45, 90%, 75%)" className={`${isActive ? "animate-pulse" : ""}`} />
        </g>
      </g>

      {/* Mita standing, emotional */}
      <g transform="translate(230, 110)" className={`${isActive ? "animate-[bounceIn_0.8s_ease-out_0.3s_both]" : ""}`}>
        {/* Dress */}
        <path d="M10 35 Q25 30 40 35 L45 95 Q25 100 5 95 Z" fill="hsl(350, 45%, 55%)" />
        {/* Head */}
        <circle cx="25" cy="18" r="16" fill="hsl(25, 45%, 78%)" />
        {/* Hair */}
        <path d="M5 18 Q15 -5 25 -5 Q35 -5 45 18 Q50 40 40 50 Q30 45 25 45 Q20 45 10 50 Q0 40 5 18" 
              fill="hsl(20, 35%, 15%)" />
        {/* Eyes with tears of joy */}
        <ellipse cx="19" cy="15" rx="2.5" ry="3.5" fill="hsl(20, 30%, 20%)" />
        <ellipse cx="31" cy="15" rx="2.5" ry="3.5" fill="hsl(20, 30%, 20%)" />
        <ellipse cx="17" cy="22" rx="1" ry="2" fill="hsl(200, 60%, 70%)" opacity="0.7" />
        <ellipse cx="33" cy="22" rx="1" ry="2" fill="hsl(200, 60%, 70%)" opacity="0.7" />
        {/* Happy surprised expression */}
        <ellipse cx="25" cy="26" rx="4" ry="3" fill="hsl(0, 40%, 55%)" />
        {/* Hands to face */}
        <ellipse cx="8" cy="30" rx="5" ry="4" fill="hsl(25, 45%, 78%)" />
        <ellipse cx="42" cy="30" rx="5" ry="4" fill="hsl(25, 45%, 78%)" />
      </g>

      {/* Sparkles around ring */}
      {isActive && (
        <g className="animate-[sparkle_1.5s_ease-in-out_infinite]">
          <polygon points="220,185 222,190 227,192 222,194 220,199 218,194 213,192 218,190" fill="hsl(45, 90%, 75%)" />
          <polygon points="205,175 206,178 209,179 206,180 205,183 204,180 201,179 204,178" fill="hsl(45, 90%, 75%)" style={{ animationDelay: "0.5s" }} />
        </g>
      )}
    </svg>
  );

  // Scene 4: Wedding 2026
  const WeddingScene = () => (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="weddingGarden" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(180, 50%, 85%)" />
          <stop offset="100%" stopColor="hsl(120, 40%, 75%)" />
        </linearGradient>
        <radialGradient id="holyLight" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="hsl(50, 90%, 95%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(50, 90%, 95%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Garden background */}
      <rect width="400" height="300" fill="url(#weddingGarden)" />
      
      {/* Holy light from above */}
      <ellipse cx="200" cy="0" rx="200" ry="150" fill="url(#holyLight)" />

      {/* Fairy lights */}
      <g>
        {[30, 70, 110, 150, 190, 230, 270, 310, 350].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="20" x2={x + 10} y2="35" stroke="hsl(45, 50%, 60%)" strokeWidth="0.5" />
            <circle cx={x + 10} cy="38" r="4" fill="hsl(50, 90%, 80%)" 
                    className={`animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }} />
          </g>
        ))}
      </g>

      {/* Rose arch */}
      <g transform="translate(120, 40)">
        {/* Arch structure */}
        <path d="M0 200 L0 60 Q80 -20 160 60 L160 200" 
              fill="none" stroke="hsl(0, 0%, 95%)" strokeWidth="8" />
        {/* Roses on arch */}
        <g fill="hsl(350, 70%, 70%)">
          <circle cx="10" cy="70" r="8" />
          <circle cx="5" cy="90" r="6" />
          <circle cx="15" cy="110" r="7" />
          <circle cx="8" cy="130" r="5" />
          <circle cx="150" cy="70" r="8" />
          <circle cx="155" cy="90" r="6" />
          <circle cx="145" cy="110" r="7" />
          <circle cx="152" cy="130" r="5" />
          <circle cx="40" cy="25" r="7" />
          <circle cx="80" cy="10" r="8" />
          <circle cx="120" cy="25" r="7" />
        </g>
        {/* Leaves */}
        <g fill="hsl(120, 40%, 50%)" opacity="0.8">
          <ellipse cx="20" cy="80" rx="5" ry="10" transform="rotate(-30, 20, 80)" />
          <ellipse cx="140" cy="80" rx="5" ry="10" transform="rotate(30, 140, 80)" />
          <ellipse cx="60" cy="20" rx="4" ry="8" transform="rotate(-20, 60, 20)" />
          <ellipse cx="100" cy="20" rx="4" ry="8" transform="rotate(20, 100, 20)" />
        </g>
      </g>

      {/* Oky in suit */}
      <g transform="translate(155, 130)" className={`${isActive ? "animate-[bounceIn_0.8s_ease-out]" : ""}`}>
        {/* Suit */}
        <path d="M10 40 L30 35 L50 40 L55 100 L5 100 Z" fill="hsl(0, 0%, 15%)" />
        <path d="M20 40 L30 35 L40 40 L38 70 L22 70 Z" fill="hsl(0, 0%, 95%)" />
        <rect x="28" y="42" width="4" height="25" fill="hsl(350, 70%, 50%)" />
        {/* Head */}
        <circle cx="30" cy="20" r="18" fill="hsl(25, 40%, 75%)" />
        <path d="M14 15 Q30 2 46 15 Q46 8 30 5 Q14 8 14 15" fill="hsl(20, 30%, 20%)" />
        <circle cx="24" cy="18" r="4" fill="none" stroke="hsl(0, 0%, 30%)" strokeWidth="1" />
        <circle cx="36" cy="18" r="4" fill="none" stroke="hsl(0, 0%, 30%)" strokeWidth="1" />
        <path d="M25 28 Q30 34 35 28" fill="none" stroke="hsl(0, 50%, 60%)" strokeWidth="2" />
        {/* Boutonniere */}
        <circle cx="45" cy="50" r="4" fill="hsl(350, 60%, 65%)" />
      </g>

      {/* Mita in wedding gown */}
      <g transform="translate(210, 115)" className={`${isActive ? "animate-[bounceIn_0.8s_ease-out_0.3s_both]" : ""}`}>
        {/* Wedding gown */}
        <path d="M5 55 Q30 45 55 55 L70 120 Q30 130 -10 120 Z" fill="hsl(0, 0%, 98%)" />
        <path d="M0 120 Q30 135 60 120 Q70 160 60 180 L0 180 Q-10 160 0 120" fill="hsl(0, 0%, 95%)" />
        {/* Veil hint */}
        <ellipse cx="30" cy="20" rx="35" ry="25" fill="hsl(0, 0%, 100%)" opacity="0.3" />
        {/* Head */}
        <circle cx="30" cy="30" r="18" fill="hsl(25, 45%, 78%)" />
        {/* Hair with flowers */}
        <path d="M10 28 Q20 5 30 5 Q40 5 50 28 Q55 45 45 55 Q35 50 30 50 Q25 50 15 55 Q5 45 10 28" 
              fill="hsl(20, 35%, 15%)" />
        <circle cx="15" cy="18" r="4" fill="hsl(0, 0%, 98%)" />
        <circle cx="45" cy="18" r="4" fill="hsl(0, 0%, 98%)" />
        <circle cx="30" cy="8" r="3" fill="hsl(350, 60%, 75%)" />
        {/* Eyes */}
        <ellipse cx="24" cy="28" rx="2.5" ry="3.5" fill="hsl(20, 30%, 20%)" />
        <ellipse cx="36" cy="28" rx="2.5" ry="3.5" fill="hsl(20, 30%, 20%)" />
        {/* Radiant smile */}
        <path d="M24 38 Q30 45 36 38" fill="none" stroke="hsl(0, 50%, 60%)" strokeWidth="2" />
        {/* Bouquet */}
        <g transform="translate(15, 65)">
          <ellipse cx="15" cy="15" rx="12" ry="10" fill="hsl(350, 60%, 70%)" />
          <ellipse cx="10" cy="12" rx="8" ry="7" fill="hsl(350, 70%, 75%)" />
          <ellipse cx="20" cy="12" rx="8" ry="7" fill="hsl(350, 55%, 65%)" />
          <ellipse cx="15" cy="8" rx="6" ry="5" fill="hsl(0, 0%, 98%)" />
          <g fill="hsl(120, 40%, 50%)">
            <ellipse cx="5" cy="20" rx="3" ry="6" transform="rotate(-30, 5, 20)" />
            <ellipse cx="25" cy="20" rx="3" ry="6" transform="rotate(30, 25, 20)" />
          </g>
        </g>
      </g>

      {/* Holding hands */}
      <ellipse cx="210" cy="210" rx="8" ry="5" fill="hsl(25, 42%, 76%)" className={`${isActive ? "animate-pulse" : ""}`} />

      {/* Falling petals */}
      {isActive && (
        <g className="animate-[float_4s_ease-in-out_infinite]">
          <ellipse cx="100" cy="80" rx="4" ry="6" fill="hsl(350, 60%, 85%)" opacity="0.7" transform="rotate(30, 100, 80)" />
          <ellipse cx="300" cy="100" rx="3" ry="5" fill="hsl(350, 60%, 85%)" opacity="0.6" transform="rotate(-20, 300, 100)" />
          <ellipse cx="180" cy="60" rx="3" ry="4" fill="hsl(0, 0%, 98%)" opacity="0.8" transform="rotate(45, 180, 60)" />
          <ellipse cx="250" cy="90" rx="4" ry="5" fill="hsl(350, 60%, 85%)" opacity="0.7" transform="rotate(-30, 250, 90)" />
        </g>
      )}

      {/* Sparkles around couple */}
      {isActive && (
        <g>
          <polygon points="170,180 172,185 177,187 172,189 170,194 168,189 163,187 168,185" 
                   fill="hsl(50, 90%, 80%)" className="animate-sparkle" />
          <polygon points="280,170 281,173 284,174 281,175 280,178 279,175 276,174 279,173" 
                   fill="hsl(50, 90%, 80%)" className="animate-sparkle" style={{ animationDelay: "0.7s" }} />
          <polygon points="200,140 201,143 204,144 201,145 200,148 199,145 196,144 199,143" 
                   fill="hsl(50, 90%, 80%)" className="animate-sparkle" style={{ animationDelay: "1.2s" }} />
        </g>
      )}
    </svg>
  );

  const scenes = {
    1: <CafeScene />,
    2: <ParkScene />,
    3: <ProposalScene />,
    4: <WeddingScene />
  };

  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden transition-all duration-700 ${
      isActive ? "opacity-100 scale-100" : "opacity-60 scale-95"
    }`}>
      {scenes[scene]}
    </div>
  );
};

export default LoveStoryScene;