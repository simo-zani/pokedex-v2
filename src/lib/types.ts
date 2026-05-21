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
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown?: {
      front_default: string | null;
      front_shiny: string | null;
      back_default: string | null;
      back_shiny: string | null;
    };
    home?: {
      front_default: string | null;
      front_shiny: string | null;
      back_default: string | null;
      back_shiny: string | null;
    };
  };
  versions?: {
    "generation-i"?: {
      "red-blue"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        back_gray: string | null;
        front_gray: string | null;
      };
      yellow?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        back_gray: string | null;
        front_gray: string | null;
      };
    };
    "generation-ii"?: {
      gold?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      silver?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      crystal?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    "generation-iii"?: {
      "ruby-sapphire"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      emerald?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      "fire-red-leaf-green"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    "generation-iv"?: {
      "diamond-pearl"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        back_female: string | null;
        front_female: string | null;
      };
      platinum?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      "heart-gold-soul-silver"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    "generation-v"?: {
      "black-white"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      "black-2-white-2"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    "generation-vi"?: {
      "x-y"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      "omegaruby-alphasapphire"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    "generation-vii"?: {
      "sun-moon"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      "ultra-sun-ultra-moon"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      "lets-go-pikachu-lets-go-eevee"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    "generation-viii"?: {
      "sword-shield"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      "brilliant-diamond-shining-pearl"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      "legends-arceus"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    "generation-ix"?: {
      "scarlet-violet"?: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
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

export interface FlavorTextEntry {
  flavor_text: string;
  language: { name: string; url: string };
  version: { name: string; url: string };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  names: PokemonSpeciesName[];
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: { url: string };
}

// === Evolution chain types ===

export interface EvolutionChainResponse {
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  species: { name: string; url: string };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionDetail {
  min_level: number | null;
  trigger: { name: string; url: string };
  item: { name: string; url: string } | null;
  held_item: { name: string; url: string } | null;
  known_move: { name: string; url: string } | null;
  min_happiness: number | null;
  time_of_day: string;
  location: { name: string; url: string } | null;
  min_affection: number | null;
  gender: number | null;
  relative_physical_stats: number | null;
  needs_overworld_rain: boolean;
  turn_upside_down: boolean;
}

// === Derived helpers ===

export interface PokemonListItemWithId extends PokemonListItem {
  id: number;
}
