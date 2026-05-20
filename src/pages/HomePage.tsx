import { useState, useMemo, useEffect } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { usePokemonList } from "../hooks/usePokemonList";
import { useTheme } from "../hooks/useTheme";
import SearchBar from "../components/search/SearchBar";
import PokemonCard from "../components/pokemon/PokemonCard";
import LoadingScreen from "../components/common/LoadingScreen";
import ErrorMessage from "../components/common/ErrorMessage";
import type { PokemonListItemWithId } from "../lib/types";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { data: pokemonList, isLoading, isError } = usePokemonList();
  const [scrollParent, setScrollParent] = useState<HTMLElement | undefined>(undefined);
  const { isRetro } = useTheme();

  useEffect(() => {
    const el = document.getElementById("screen-scroll-container");
    if (el) {
      setScrollParent(el);

      const savedPos = sessionStorage.getItem("pokedex-scroll-pos");
      if (savedPos) {
        setTimeout(() => {
          el.scrollTop = parseInt(savedPos, 10);
        }, 50);
      }

      const handleScroll = () => {
        sessionStorage.setItem("pokedex-scroll-pos", String(el.scrollTop));
      };

      el.addEventListener("scroll", handleScroll, { passive: true });
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const filtered = useMemo(() => {
    if (!pokemonList) return [];
    const q = search.trim().toLowerCase();
    if (!q) return pokemonList;

    return pokemonList.filter((p) => {
      if (p.name.toLowerCase().includes(q)) return true;
      const numStr = String(p.id);
      if (numStr === q || numStr.startsWith(q)) return true;
      if (q.startsWith("#")) {
        const numQuery = q.slice(1);
        if (numStr === numQuery || numStr.startsWith(numQuery)) return true;
        const padded = numStr.padStart(numQuery.length, "0");
        if (padded === numQuery) return true;
      }
      return false;
    });
  }, [pokemonList, search]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorMessage message="Errore nel caricamento della lista Pokémon." />;

  return (
    <div className={`pb-4 transition-colors duration-500 ${isRetro ? "bg-gb-bg" : "bg-white"}`}>
      {/* Counter */}
      <p className={`text-center pt-2 uppercase tracking-widest ${
        isRetro
          ? "text-[8px] text-gb-dark font-retro"
          : "text-xs text-gray-400 font-medium"
      }`}>
        {filtered.length} Pokémon
      </p>

      <SearchBar value={search} onChange={setSearch} />

      <div className="px-2 pb-4">
        {scrollParent && (
          <VirtuosoGrid
            customScrollParent={scrollParent}
            totalCount={filtered.length}
            listClassName="grid grid-cols-3 gap-2"
            itemContent={(index) => {
              const pokemon = filtered[index] as PokemonListItemWithId | undefined;
              if (!pokemon) return null;
              return <PokemonCard pokemon={pokemon} />;
            }}
          />
        )}
      </div>
    </div>
  );
}
