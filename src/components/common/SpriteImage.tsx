import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

interface SpriteImageProps {
  sprites: any;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function SpriteImage({
  sprites,
  alt,
  className = "",
  width,
  height,
}: SpriteImageProps) {
  const [errorCount, setErrorCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { isRetro } = useTheme();

  // Build ordered list of candidate URLs
  const candidates: string[] = [];

  if (isRetro) {
    // Retro: Traverse generations from oldest to newest to find the oldest available sprite
    const retroGenerations = [
      { gen: "generation-i", games: ["red-blue", "yellow"], fields: ["front_gray", "front_default"] },
      { gen: "generation-ii", games: ["gold", "silver", "crystal"], fields: ["front_default"] },
      { gen: "generation-iii", games: ["ruby-sapphire", "emerald", "firered-leafgreen"], fields: ["front_default"] },
      { gen: "generation-iv", games: ["diamond-pearl", "platinum", "heartgold-soulsilver"], fields: ["front_default"] },
      { gen: "generation-v", games: ["black-white"], fields: ["front_default"] },
      { gen: "generation-vi", games: ["x-y", "omegaruby-alphasapphire"], fields: ["front_default"] },
      { gen: "generation-vii", games: ["ultra-sun-ultra-moon"], fields: ["front_default"] },
      { gen: "generation-viii", games: ["sword-shield"], fields: ["front_default"] }
    ];

    let found = false;
    for (const g of retroGenerations) {
      const genData = sprites?.versions?.[g.gen];
      if (!genData) continue;
      for (const game of g.games) {
        const gameData = genData[game];
        if (!gameData) continue;
        for (const field of g.fields) {
          const url = gameData[field];
          if (url) {
            candidates.push(url);
            found = true;
          }
        }
      }
      if (found) break;
    }

    // Always append top-level front_default as a fallback
    if (sprites?.front_default) {
      candidates.push(sprites.front_default);
    }
  } else {
    // Modern: official artwork HD → showdown animated → home → default
    const artwork = sprites?.other?.["official-artwork"]?.front_default;
    const showdown = sprites?.other?.showdown?.front_default;
    const home = sprites?.other?.home?.front_default;
    if (artwork) candidates.push(artwork);
    if (showdown) candidates.push(showdown);
    if (home) candidates.push(home);
    if (sprites?.front_default) candidates.push(sprites.front_default);
  }

  const src = candidates[errorCount] ?? "";

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center ${
          isRetro ? "font-retro text-gb-dark bg-gb-bg" : "text-gray-400 bg-gray-100"
        } ${className}`}
        style={{ width: width || 80, height: height || 80 }}
      >
        ?
      </div>
    );
  }

  // Modern: fade-in on load. Retro: instant.
  const fadeStyle = isRetro
    ? undefined
    : {
        imageRendering: "auto" as const,
        opacity: loaded ? 1 : 0,
        transition: "opacity 300ms ease-in",
      };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => {
        setLoaded(false);
        setErrorCount((c) => c + 1);
      }}
      className={`${isRetro ? "gb-sprite-filter" : ""} ${className}`}
      style={fadeStyle}
    />
  );
}
