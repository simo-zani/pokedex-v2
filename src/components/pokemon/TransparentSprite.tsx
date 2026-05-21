import { useRef, useEffect, useState } from "react";

interface TransparentSpriteProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * Renders a sprite image with white background pixels removed.
 * Loads the image onto an offscreen canvas, converts near-white pixels
 * to transparent, and displays the cleaned result.
 */
export default function TransparentSprite({
  src,
  alt,
  width,
  height,
  className = "",
}: TransparentSpriteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Threshold: pixels with R, G, B all above this value are considered "white"
      const threshold = 240;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r !== undefined && g !== undefined && b !== undefined) {
          if (r >= threshold && g >= threshold && b >= threshold) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setLoaded(true);
    };
    img.onerror = () => {
      // On error, just show nothing — the canvas stays blank
      setLoaded(false);
    };
    img.src = src;
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={alt}
      style={{
        width,
        height,
        objectFit: "contain",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.15s ease-in",
      }}
    />
  );
}
