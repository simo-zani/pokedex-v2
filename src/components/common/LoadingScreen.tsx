import { useTheme } from "../../hooks/useTheme";

export default function LoadingScreen() {
  const { isRetro } = useTheme();

  return (
    <div className={`flex-1 flex flex-col items-center justify-center h-full w-full transition-colors duration-500 ${
      isRetro ? "bg-gb-bg" : "bg-white"
    }`}>
      <div className={`animate-pulse ${
        isRetro
          ? "text-gb-darkest font-retro text-sm"
          : "text-gray-400 text-sm font-medium"
      }`}>
        {isRetro ? "LOADING..." : "Caricamento..."}
      </div>
    </div>
  );
}
