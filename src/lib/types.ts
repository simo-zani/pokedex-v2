// === List endpoint types ===

export interface PokemonListResponse {
  count: number;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

// === Detail endpoint types ===

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
  other?: {
    "official-artwork"?: { front_default: string | null };
    showdown?: { front_default: string | null };
    home?: { front_default: string | null };
  };
  versions?: {
    "generation-i"?: {
      "red-blue"?: { front_gray: string | null };
    };
  };
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

// === Species endpoint types ===

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
