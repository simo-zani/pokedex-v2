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
  const [error, setError] = useState(false);
  const { isRetro } = useTheme();

  // Determine which sprite to use
  let src = "";

  if (isRetro && pokemonId <= 151) {
    // Retro: try Gen I gray sprite
    const graySprite = sprites?.versions?.["generation-i"]?.["red-blue"]?.front_gray;
    if (graySprite && !error) {
      src = graySprite;
    } else {
      src = sprites?.front_default || "";
    }
  } else {
    // Modern or > 151: use default color sprite
    src = sprites?.front_default || "";
  }

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
      onError={() => setError(true)}
      className={`${isRetro ? "gb-sprite-filter" : ""} ${className}`}
    />
  );
}
