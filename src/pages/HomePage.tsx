import { useState, useMemo, useEffect } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import { useTheme } from "../hooks/useTheme";
import { getPokemonGeneration } from "../lib/sprites";
import { GENERATION_LABELS, GENERATION_NAMES } from "../lib/constants";
import SearchBar from "../components/search/SearchBar";
import PokemonCard from "../components/pokemon/PokemonCard";
import LoadingScreen from "../components/common/LoadingScreen";
import ErrorMessage from "../components/common/ErrorMessage";
import type { PokemonListItemWithId } from "../lib/types";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { data: pokemonList, isLoading, isError } = usePokemonList();
  const { isRetro } = useTheme();
  const [collapsedGens, setCollapsedGens] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = document.getElementById("screen-scroll-container");
    if (el) {
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

  const groups = useMemo(() => {
    const map = new Map<number, PokemonListItemWithId[]>();
    for (const p of filtered) {
      const gen = getPokemonGeneration(p.id);
      if (!map.has(gen)) map.set(gen, []);
      map.get(gen)!.push(p);
    }
    return map;
  }, [filtered]);

  const toggleGen = (gen: number) => {
    setCollapsedGens((prev) => {
      const next = new Set(prev);
      if (next.has(gen)) {
        next.delete(gen);
      } else {
        next.add(gen);
      }
      return next;
    });
  };

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorMessage message="Errore nel caricamento della lista Pokémon." />;

  return (
    <div className={`pb-4 transition-colors duration-500 ${isRetro ? "bg-gb-bg" : "bg-white"}`}>
      <p className={`sticky top-0 z-30 text-center pt-2 pb-1 uppercase tracking-widest ${
        isRetro
          ? "text-[8px] text-gb-dark font-retro bg-gb-bg"
          : "text-xs text-gray-400 font-medium bg-white"
      }`}>
        {filtered.length} Pokémon
      </p>

      <div className={`sticky z-20 ${
        isRetro ? "bg-gb-bg" : "bg-white"
      }`} style={{ top: "24px" }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="px-2 pb-4">
        {Array.from(groups.entries()).map(([gen, pokes]) => {
          const label = isRetro ? GENERATION_LABELS[gen] : GENERATION_NAMES[gen];
          const isCollapsed = collapsedGens.has(gen);

          const rows: PokemonListItemWithId[][] = [];
          for (let i = 0; i < pokes.length; i += 3) {
            rows.push(pokes.slice(i, i + 3));
          }

          return (
            <section key={gen}>
              <button
                onClick={() => toggleGen(gen)}
                className={`sticky z-10 w-full text-left ${
                  isRetro ? "bg-gb-bg" : "bg-white/95 backdrop-blur-sm"
                }`}
                style={{ top: "76px" }}
              >
                <div className={`flex items-center gap-2 py-2 ${isRetro ? "px-1" : "px-1"}`}>
                  <svg className={`${isRetro ? "w-2.5 h-2.5 text-gb-dark" : "w-3 h-3 text-gray-400"} transition-transform duration-200 ${isCollapsed ? "" : "rotate-180"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  <div className={`flex-1 h-px ${isRetro ? "bg-gb-dark" : "bg-gray-200"}`} />
                  <span className={`whitespace-nowrap uppercase tracking-widest ${
                    isRetro
                      ? "text-[7px] font-retro text-gb-darkest"
                      : "text-[10px] font-modern font-semibold text-gray-400"
                  }`}>
                    {label}
                  </span>
                  <div className={`flex-1 h-px ${isRetro ? "bg-gb-dark" : "bg-gray-200"}`} />
                  <svg className={`${isRetro ? "w-2.5 h-2.5 text-gb-dark" : "w-3 h-3 text-gray-400"} transition-transform duration-200 ${isCollapsed ? "" : "rotate-180"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>
              <div
                className="overflow-hidden transition-all duration-200 ease-in-out"
                style={{ maxHeight: isCollapsed ? 0 : 10000 }}
              >
                {rows.map((row, ri) => (
                  <div key={ri} className="grid grid-cols-3 gap-2">
                    {row.map((p) => (
                      <PokemonCard key={p.id} pokemon={p} />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
