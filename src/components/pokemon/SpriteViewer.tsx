import { useState, useEffect } from "react";
import type { Pokemon } from "../../lib/types";
import { useTheme } from "../../hooks/useTheme";
import { getSpriteUrl, hasGenderSprite, type GameVersion } from "../../lib/sprites";
import TransparentSprite from "./TransparentSprite";

const OLD_GAMES: GameVersion[] = ["red-blue", "yellow", "gold", "silver", "crystal"];

interface SpriteViewerProps {
  pokemon: Pokemon;
  gameVersion: GameVersion;
  setGameVersion: (version: GameVersion) => void;
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

export default function SpriteViewer({ pokemon, gameVersion }: SpriteViewerProps) {
  const { isRetro } = useTheme();

  const [shiny, setShiny] = useState(false);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isSparkling, setIsSparkling] = useState(false);

  const showGender = hasGenderSprite(pokemon);

  // Determine if this game version has a shiny variant
  const normalUrl = getSpriteUrl(pokemon, { view: "front", shiny: false, gender, gameVersion });
  const shinyUrl = getSpriteUrl(pokemon, { view: "front", shiny: true, gender, gameVersion });
  const hasShinyVariant = !!shinyUrl && shinyUrl !== normalUrl;

  useEffect(() => {
    setShiny(false);
    setGender("male");
  }, [pokemon.id]);

  // Turn off shiny if the game version doesn't support it
  useEffect(() => {
    if (!hasShinyVariant) {
      setShiny(false);
    }
  }, [gameVersion, hasShinyVariant]);

  // Trigger sparkle animation when shiny turns true
  useEffect(() => {
    if (shiny) {
      setIsSparkling(true);
      const timer = setTimeout(() => setIsSparkling(false), 800);
      return () => clearTimeout(timer);
    }
  }, [shiny]);

  const frontUrl = getSpriteUrl(pokemon, { view: "front", shiny, gender, gameVersion });
  const backUrl = getSpriteUrl(pokemon, { view: "back", shiny, gender, gameVersion });
  const showGenderSelect = showGender && gameVersion === "default";
  const isOldSprite = !isRetro && OLD_GAMES.includes(gameVersion);

  const starFill = shiny ? "currentColor" : "none";
  const starStroke = shiny ? "none" : "currentColor";
  const starStrokeWidth = shiny ? "0" : "1.8";
  
  const starColorClass = isRetro
    ? shiny
      ? "text-gb-darkest"
      : "text-gb-dark opacity-40 hover:opacity-75"
    : shiny
      ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.85)] filter"
      : "text-gray-400 hover:text-gray-600 opacity-60 hover:opacity-100";

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

        {/* Absolutely positioned controls inside the sprites wrapper to align them at the top-right of the sprites */}
        {(hasShinyVariant || showGenderSelect) && (
          <div className="absolute right-[-48px] top-1 flex flex-col items-center gap-3">
            {hasShinyVariant && (
              <button
                onClick={() => setShiny((s) => !s)}
                className={`relative flex flex-col items-center justify-center bg-transparent border-0 p-1 cursor-pointer transition-all duration-200 active:scale-90 ${starColorClass}`}
                title={shiny ? "Rendi normale" : "Rendi shiny"}
              >
                <svg
                  viewBox="0 0 32 32"
                  className="w-9 h-9 select-none transition-transform"
                  fill={starFill}
                  stroke={starStroke}
                  strokeWidth={starStrokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Big central star */}
                  <path d="M 16 7 Q 16 16 25 16 Q 16 16 16 25 Q 16 16 7 16 Q 16 16 16 7" />
                  {/* Top-left medium star */}
                  <path d="M 7 2 Q 7 7 12 7 Q 7 7 7 12 Q 7 7 2 7 Q 7 7 7 2" />
                  {/* Top-right small star */}
                  <path d="M 26 5.5 Q 26 9 29.5 9 Q 26 9 26 12.5 Q 26 9 22.5 9 Q 26 9 26 5.5" />
                  {/* Bottom-right small star */}
                  <path d="M 22 25 Q 22 28.5 25.5 28.5 Q 22 28.5 22 32 Q 22 28.5 18.5 28.5 Q 22 28.5 22 25" />
                </svg>
              </button>
            )}

            {showGenderSelect && (
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setGender("male")}
                  className={`text-[10px] px-2 py-0.5 rounded ${
                    isRetro
                      ? gender === "male"
                        ? "bg-gb-darkest text-gb-lightest"
                        : "border border-gb-dark text-gb-dark"
                      : gender === "male"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  ♂
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`text-[10px] px-2 py-0.5 rounded ${
                    isRetro
                      ? gender === "female"
                        ? "bg-gb-darkest text-gb-lightest"
                        : "border border-gb-dark text-gb-dark"
                      : gender === "female"
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  ♀
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}