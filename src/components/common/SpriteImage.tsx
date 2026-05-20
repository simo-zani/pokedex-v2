import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

interface SpriteImageProps {
  pokemonId: number;
  sprites: any;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function SpriteImage({
  pokemonId,
  sprites,
  alt,
  className = "",
  width,
  height,
}: SpriteImageProps) {
  const [errorCount, setErrorCount] = useState(0);
  const { isRetro } = useTheme();

  // Build ordered list of candidate URLs
  const candidates: string[] = [];

  if (isRetro && pokemonId <= 151) {
    // Retro Gen I: gray sprite first, then default
    const gray = sprites?.versions?.["generation-i"]?.["red-blue"]?.front_gray;
    if (gray) candidates.push(gray);
    if (sprites?.front_default) candidates.push(sprites.front_default);
  } else if (!isRetro) {
    // Modern: official artwork HD → showdown animated → home → default
    const artwork = sprites?.other?.["official-artwork"]?.front_default;
    const showdown = sprites?.other?.showdown?.front_default;
    const home = sprites?.other?.home?.front_default;
    if (artwork) candidates.push(artwork);
    if (showdown) candidates.push(showdown);
    if (home) candidates.push(home);
    if (sprites?.front_default) candidates.push(sprites.front_default);
  } else {
    // Retro > 151: just default
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

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      onError={() => setErrorCount((c) => c + 1)}
      className={`${isRetro ? "gb-sprite-filter" : ""} ${className}`}
      style={isRetro ? undefined : { imageRendering: "auto" }}
    />
  );
}
