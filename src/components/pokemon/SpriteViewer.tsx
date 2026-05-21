import { useState, useEffect } from "react";
import type { Pokemon } from "../../lib/types";
import { useTheme } from "../../hooks/useTheme";
import { getSpriteUrl, getAvailableGames, hasGenderSprite, getDefaultRetroGame, type GameVersion } from "../../lib/sprites";

const OLD_GAMES: GameVersion[] = ["red-blue", "yellow", "gold", "silver", "crystal"];

interface SpriteViewerProps {
  pokemon: Pokemon;
}

export default function SpriteViewer({ pokemon }: SpriteViewerProps) {
  const { isRetro } = useTheme();

  const [shiny, setShiny] = useState(false);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [gameVersion, setGameVersion] = useState<GameVersion>("default");

  const showGender = hasGenderSprite(pokemon);
  const availableGames = isRetro ? [] : getAvailableGames(pokemon, "modern");

  useEffect(() => {
    setShiny(false);
    setGender("male");
    setGameVersion(isRetro ? getDefaultRetroGame(pokemon.id) : "official-artwork");
  }, [pokemon.id, isRetro]);

  const frontUrl = getSpriteUrl(pokemon, { view: "front", shiny, gender, gameVersion });
  const backUrl = getSpriteUrl(pokemon, { view: "back", shiny, gender, gameVersion });
  const showGenderSelect = showGender && gameVersion === "default";
  const isOldSprite = !isRetro && OLD_GAMES.includes(gameVersion);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-start justify-center gap-3">
        <div className={`flex gap-2 items-center ${isRetro ? "bg-gb-bg" : ""}`}>
          {frontUrl && (
            <img
              src={frontUrl}
              alt={`${pokemon.name}`}
              className={`object-contain select-none ${isRetro ? "gb-sprite-filter" : "drop-shadow-md"} ${isOldSprite ? "mix-blend-multiply" : ""}`}
              width={isRetro ? 128 : 160}
              height={isRetro ? 128 : 160}
            />
          )}
          {backUrl && (
            <img
              src={backUrl}
              alt={`${pokemon.name}`}
              className={`object-contain select-none ${isRetro ? "gb-sprite-filter" : "drop-shadow-md"} ${isOldSprite ? "mix-blend-multiply" : ""}`}
              width={isRetro ? 128 : 160}
              height={isRetro ? 128 : 160}
            />
          )}
        </div>

        <div className="flex flex-col items-center gap-2">
          <button onClick={() => setShiny((s) => !s)} className="relative flex flex-col items-center leading-none bg-transparent border-0 p-0 cursor-pointer">
            <span className={`${isRetro ? "text-[8px]" : "text-[10px]"} ${shiny ? (isRetro ? "text-gb-darkest" : "text-yellow-400") : (isRetro ? "text-gb-dark" : "text-gray-500")}`} style={{ transform: "translateY(-2px)" }}>⭐</span>
            <span className={`${isRetro ? "text-[14px]" : "text-lg"} ${shiny ? (isRetro ? "text-gb-darkest" : "text-yellow-400") : (isRetro ? "text-gb-dark" : "text-gray-500")}`}>⭐</span>
            <span className={`${isRetro ? "text-[10px]" : "text-sm"} ${shiny ? (isRetro ? "text-gb-darkest" : "text-yellow-400") : (isRetro ? "text-gb-dark" : "text-gray-500")}`} style={{ transform: "translateY(2px)" }}>⭐</span>
          </button>

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
      </div>

      {!isRetro && (
        <select
          value={gameVersion}
          onChange={(e) => setGameVersion(e.target.value as GameVersion)}
          className="text-[10px] px-2 py-1 rounded border bg-white border-gray-300 text-gray-700 font-modern"
        >
          {availableGames.map((g) => (
            <option key={g.key} value={g.key}>
              {g.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}