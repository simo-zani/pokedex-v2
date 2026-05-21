import { useState, useEffect } from "react";
import type { Pokemon } from "../../lib/types";
import { useTheme } from "../../hooks/useTheme";
import { getSpriteUrl, type GameVersion } from "../../lib/sprites";
import TransparentSprite from "./TransparentSprite";

const OLD_GAMES: GameVersion[] = ["red-blue", "yellow", "gold", "silver", "crystal"];

interface SpriteViewerProps {
  pokemon: Pokemon;
  gameVersion: GameVersion;
  shiny: boolean;
  gender: "male" | "female";
}

function SparkleExplosion() {
  return (
    <>
      <style>{`
        @keyframes sparkle-burst-0 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; transform: translate(-50%, -50%) translate(0, -45px) scale(1.2) rotate(45deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(0, -70px) scale(0) rotate(90deg); }
        }
        @keyframes sparkle-burst-1 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; transform: translate(-50%, -50%) translate(32px, -32px) scale(1.2) rotate(45deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(50px, -50px) scale(0) rotate(90deg); }
        }
        @keyframes sparkle-burst-2 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; transform: translate(-50%, -50%) translate(45px, 0) scale(1.2) rotate(45deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(70px, 0) scale(0) rotate(90deg); }
        }
        @keyframes sparkle-burst-3 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; transform: translate(-50%, -50%) translate(32px, 32px) scale(1.2) rotate(45deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(50px, 50px) scale(0) rotate(90deg); }
        }
        @keyframes sparkle-burst-4 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; transform: translate(-50%, -50%) translate(0, 45px) scale(1.2) rotate(45deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(0, 70px) scale(0) rotate(90deg); }
        }
        @keyframes sparkle-burst-5 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; transform: translate(-50%, -50%) translate(-32px, 32px) scale(1.2) rotate(45deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(-50px, 50px) scale(0) rotate(90deg); }
        }
        @keyframes sparkle-burst-6 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; transform: translate(-50%, -50%) translate(-45px, 0) scale(1.2) rotate(45deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(-70px, 0) scale(0) rotate(90deg); }
        }
        @keyframes sparkle-burst-7 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; transform: translate(-50%, -50%) translate(-32px, -32px) scale(1.2) rotate(45deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(-50px, -50px) scale(0) rotate(90deg); }
        }
        
        .sparkle-particle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 50;
        }
        .sparkle-particle-0 { animation: sparkle-burst-0 0.8s cubic-bezier(0.15, 0.85, 0.35, 1) forwards; }
        .sparkle-particle-1 { animation: sparkle-burst-1 0.8s cubic-bezier(0.15, 0.85, 0.35, 1) forwards; }
        .sparkle-particle-2 { animation: sparkle-burst-2 0.8s cubic-bezier(0.15, 0.85, 0.35, 1) forwards; }
        .sparkle-particle-3 { animation: sparkle-burst-3 0.8s cubic-bezier(0.15, 0.85, 0.35, 1) forwards; }
        .sparkle-particle-4 { animation: sparkle-burst-4 0.8s cubic-bezier(0.15, 0.85, 0.35, 1) forwards; }
        .sparkle-particle-5 { animation: sparkle-burst-5 0.8s cubic-bezier(0.15, 0.85, 0.35, 1) forwards; }
        .sparkle-particle-6 { animation: sparkle-burst-6 0.8s cubic-bezier(0.15, 0.85, 0.35, 1) forwards; }
        .sparkle-particle-7 { animation: sparkle-burst-7 0.8s cubic-bezier(0.15, 0.85, 0.35, 1) forwards; }
      `}</style>
      {Array.from({ length: 8 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`sparkle-particle sparkle-particle-${i} w-6 h-6 text-yellow-300 fill-current drop-shadow-[0_0_4px_rgba(250,204,21,0.9)]`}
        >
          <path d="M 12 2 Q 12 12 22 12 Q 12 12 12 22 Q 12 12 2 12 Q 12 12 12 2" />
        </svg>
      ))}
    </>
  );
}

export default function SpriteViewer({ pokemon, gameVersion, shiny, gender }: SpriteViewerProps) {
  const { isRetro } = useTheme();
  const [isSparkling, setIsSparkling] = useState(false);

  const normalUrl = getSpriteUrl(pokemon, { view: "front", shiny: false, gender, gameVersion });
  const shinyUrl = getSpriteUrl(pokemon, { view: "front", shiny: true, gender, gameVersion });
  const hasShinyVariant = !!shinyUrl && shinyUrl !== normalUrl;

  // Trigger sparkle animation when shiny turns true
  useEffect(() => {
    if (shiny && hasShinyVariant) {
      setIsSparkling(true);
      const timer = setTimeout(() => setIsSparkling(false), 800);
      return () => clearTimeout(timer);
    }
  }, [shiny, hasShinyVariant]);

  const frontUrl = getSpriteUrl(pokemon, { view: "front", shiny, gender, gameVersion });
  const backUrl = getSpriteUrl(pokemon, { view: "back", shiny, gender, gameVersion });
  const isOldSprite = !isRetro && OLD_GAMES.includes(gameVersion);

  return (
    <div className="relative w-full flex items-center justify-center min-h-[170px] py-1">
      {/* Centered Sprites Wrapper */}
      <div className={`relative flex gap-4 items-center justify-center ${isRetro ? "bg-gb-bg p-2" : ""}`}>
        {frontUrl && (
          <div className="relative inline-block">
            {isOldSprite ? (
              <TransparentSprite
                src={frontUrl}
                alt={`${pokemon.name}`}
                className="object-contain select-none"
                width={isRetro ? 128 : 160}
                height={isRetro ? 128 : 160}
              />
            ) : (
              <img
                src={frontUrl}
                alt={`${pokemon.name}`}
                className={`object-contain select-none ${isRetro ? "gb-sprite-filter" : "drop-shadow-md"}`}
                width={isRetro ? 128 : 160}
                height={isRetro ? 128 : 160}
              />
            )}
          </div>
        )}
        {backUrl && (
          <div className="relative inline-block">
            {isOldSprite ? (
              <TransparentSprite
                src={backUrl}
                alt={`${pokemon.name}`}
                className="object-contain select-none"
                width={isRetro ? 128 : 160}
                height={isRetro ? 128 : 160}
              />
            ) : (
              <img
                src={backUrl}
                alt={`${pokemon.name}`}
                className={`object-contain select-none ${isRetro ? "gb-sprite-filter" : "drop-shadow-md"}`}
                width={isRetro ? 128 : 160}
                height={isRetro ? 128 : 160}
              />
            )}
          </div>
        )}
        {isSparkling && <SparkleExplosion />}
      </div>
    </div>
  );
}
