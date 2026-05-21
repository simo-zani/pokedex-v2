export const POKEAPI_BASE = "https://pokeapi.co/api/v2";

export const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

/** Total Pokémon to fetch from list (gen 1-9) */
export const POKEMON_LIST_LIMIT = 1025;

/** Extract numeric ID from a PokéAPI resource URL */
export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (!match?.[1]) throw new Error(`Cannot extract ID from URL: ${url}`);
  return parseInt(match[1], 10);
}

/** Format Pokémon number as #0001 */
export function formatPokemonNumber(id: number): string {
  return `#${String(id).padStart(4, "0")}`;
}

/** Get sprite URL for list display */
export function getListSpriteUrl(id: number): string {
  return `${SPRITE_BASE}/${id}.png`;
}

/** Get retro (oldest available) sprite URL. */
export function getRetroListSpriteUrl(id: number): string {
  if (id <= 151) {
    // Gen I: red-blue gray
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/gray/${id}.png`;
  }
  if (id <= 251) {
    // Gen II: gold
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/${id}.png`;
  }
  if (id <= 386) {
    // Gen III: ruby-sapphire
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/${id}.png`;
  }
  if (id <= 493) {
    // Gen IV: diamond-pearl
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/${id}.png`;
  }
  if (id <= 649) {
    // Gen V: black-white
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${id}.png`;
  }
  if (id <= 721) {
    // Gen VI: x-y
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/${id}.png`;
  }
  if (id <= 809) {
    // Gen VII: ultra-sun-ultra-moon
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${id}.png`;
  }
  // Gen VIII+ or fallback: standard sprite
  return `${SPRITE_BASE}/${id}.png`;
}

/** Stat display names */
export const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Atk",
  defense: "Def",
  "special-attack": "SpAtk",
  "special-defense": "SpDef",
  speed: "Spe",
};

export type GameVersionKey =
  | "red-blue"
  | "yellow"
  | "gold"
  | "silver"
  | "crystal"
  | "ruby-sapphire"
  | "emerald"
  | "fire-red-leaf-green"
  | "diamond-pearl"
  | "platinum"
  | "heart-gold-soul-silver"
  | "black-white"
  | "black-2-white-2"
  | "x-y"
  | "omegaruby-alphasapphire"
  | "sun-moon"
  | "ultra-sun-ultra-moon"
  | "lets-go-pikachu-lets-go-eevee"
  | "sword-shield"
  | "brilliant-diamond-shining-pearl"
  | "legends-arceus"
  | "scarlet-violet";

export const GAME_VERSIONS_ORDERED: GameVersionKey[] = [
  "red-blue",
  "yellow",
  "gold",
  "silver",
  "crystal",
  "ruby-sapphire",
  "emerald",
  "fire-red-leaf-green",
  "diamond-pearl",
  "platinum",
  "heart-gold-soul-silver",
  "black-white",
  "black-2-white-2",
  "x-y",
  "omegaruby-alphasapphire",
  "sun-moon",
  "ultra-sun-ultra-moon",
  "lets-go-pikachu-lets-go-eevee",
  "sword-shield",
  "brilliant-diamond-shining-pearl",
  "legends-arceus",
  "scarlet-violet",
];

/** Maps GameVersion to PokeAPI version names used in flavor_text_entries */
export function gameVersionToApiNames(gameVersion: string): string[] {
  const map: Record<string, string[]> = {
    "red-blue": ["red", "blue"],
    yellow: ["yellow"],
    gold: ["gold"],
    silver: ["silver"],
    crystal: ["crystal"],
    "ruby-sapphire": ["ruby", "sapphire"],
    emerald: ["emerald"],
    "fire-red-leaf-green": ["firered", "leafgreen"],
    "diamond-pearl": ["diamond", "pearl"],
    platinum: ["platinum"],
    "heart-gold-soul-silver": ["heartgold", "soulsilver"],
    "black-white": ["black", "white"],
    "black-2-white-2": ["black-2", "white-2"],
    "x-y": ["x", "y"],
    "omegaruby-alphasapphire": ["omega-ruby", "alpha-sapphire"],
    "sun-moon": ["sun", "moon"],
    "ultra-sun-ultra-moon": ["ultra-sun", "ultra-moon"],
    "lets-go-pikachu-lets-go-eevee": ["lets-go-pikachu", "lets-go-eevee"],
    "sword-shield": ["sword", "shield"],
    "brilliant-diamond-shining-pearl": ["brilliant-diamond", "shining-pearl"],
    "legends-arceus": ["legends-arceus"],
    "scarlet-violet": ["scarlet", "violet"],
  };
  return map[gameVersion] ?? [];
}

/** Maps PokeAPI version name to GameVersion key */
const apiNameToGameKey: Record<string, string> = {
  "red": "red-blue", "blue": "red-blue",
  "yellow": "yellow",
  "gold": "gold", "silver": "silver",
  "crystal": "crystal",
  "ruby": "ruby-sapphire", "sapphire": "ruby-sapphire",
  "emerald": "emerald",
  "firered": "fire-red-leaf-green", "leafgreen": "fire-red-leaf-green",
  "diamond": "diamond-pearl", "pearl": "diamond-pearl",
  "platinum": "platinum",
  "heartgold": "heart-gold-soul-silver", "soulsilver": "heart-gold-soul-silver",
  "black": "black-white", "white": "black-white",
  "black-2": "black-2-white-2", "white-2": "black-2-white-2",
  "x": "x-y", "y": "x-y",
  "omega-ruby": "omegaruby-alphasapphire", "alpha-sapphire": "omegaruby-alphasapphire",
  "sun": "sun-moon", "moon": "sun-moon",
  "ultra-sun": "ultra-sun-ultra-moon", "ultra-moon": "ultra-sun-ultra-moon",
  "lets-go-pikachu": "lets-go-pikachu-lets-go-eevee", "lets-go-eevee": "lets-go-pikachu-lets-go-eevee",
  "sword": "sword-shield", "shield": "sword-shield",
  "brilliant-diamond": "brilliant-diamond-shining-pearl", "shining-pearl": "brilliant-diamond-shining-pearl",
  "legends-arceus": "legends-arceus",
  "scarlet": "scarlet-violet", "violet": "scarlet-violet",
};

/** Given species data and language, returns the available GameVersion keys that have flavor text entries */
export function getAvailableFlavorGames(
  species: { flavor_text_entries: Array<{ language: { name: string }; version: { name: string } }> },
  language: string
): string[] {
  const keys = new Set<string>();
  for (const entry of species.flavor_text_entries) {
    if (entry.language.name === language) {
      const gameKey = apiNameToGameKey[entry.version.name];
      if (gameKey) keys.add(gameKey);
    }
  }
  return GAME_VERSIONS_ORDERED.filter((g) => keys.has(g));
}
