// === List endpoint types ===

export interface PokemonListResponse {
  count: number;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

// === Detail endpoint types (minimal for Phase 1) ===

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string | null;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
  height: number;
  weight: number;
}

// === Species endpoint types (minimal) ===

export interface PokemonSpeciesName {
  language: { name: string; url: string };
  name: string;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  names: PokemonSpeciesName[];
}

// === Derived helpers ===

export interface PokemonListItemWithId extends PokemonListItem {
  id: number;
}
