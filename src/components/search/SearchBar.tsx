import { useTheme } from "../../hooks/useTheme";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { isRetro } = useTheme();

  return (
    <div className={`px-4 py-3 transition-colors duration-500 ${
      isRetro ? "bg-gb-bg" : "bg-white"
    }`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isRetro ? "CERCA..." : "Cerca Pokémon..."}
        className={`w-full max-w-md mx-auto block px-3 py-2 focus:outline-none transition-all duration-500 ${
          isRetro
            ? "rounded-none border-2 border-gb-darkest text-[10px] font-retro bg-gb-lightest text-gb-darkest placeholder:text-gb-dark focus:ring-2 focus:ring-gb-dark focus:border-transparent"
            : "rounded-xl border border-gray-300 text-sm bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-red-400 focus:border-transparent shadow-sm"
        }`}
      />
    </div>
  );
}
