import type { Pokemon } from "./types";

export type SpriteView = "front" | "back";
export type SpriteGender = "male" | "female";
export type GameVersion =
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
  | "scarlet-violet"
  | "official-artwork"
  | "showdown"
  | "home"
  | "default";

export interface SpriteOptions {
  view: SpriteView;
  shiny: boolean;
  gender: SpriteGender;
  gameVersion: GameVersion;
}

export interface GameInfo {
  key: GameVersion;
  label: string;
  generation: number;
  hasFront: boolean;
  hasBack: boolean;
}

type GenerationKey = `generation-i` | `generation-ii` | `generation-iii` | `generation-iv` | `generation-v` | `generation-vi` | `generation-vii` | `generation-viii` | `generation-ix`;

const GAME_VERSION_LABELS: Record<GameVersion, string> = {
  "red-blue": "Red/Blue",
  yellow: "Yellow",
  gold: "Gold",
  silver: "Silver",
  crystal: "Crystal",
  "ruby-sapphire": "Ruby/Sapphire",
  emerald: "Emerald",
  "fire-red-leaf-green": "FireRed/LeafGreen",
  "diamond-pearl": "Diamond/Pearl",
  platinum: "Platinum",
  "heart-gold-soul-silver": "HeartGold/SoulSilver",
  "black-white": "Black/White",
  "black-2-white-2": "Black 2/White 2",
  "x-y": "X/Y",
  "omegaruby-alphasapphire": "Omega Ruby/Alpha Sapphire",
  "sun-moon": "Sun/Moon",
  "ultra-sun-ultra-moon": "Ultra Sun/Ultra Moon",
  "lets-go-pikachu-lets-go-eevee": "Let's Go Pikachu/Eevee",
  "sword-shield": "Sword/Shield",
  "brilliant-diamond-shining-pearl": "Brilliant Diamond/Shining Pearl",
  "legends-arceus": "Legends: Arceus",
  "scarlet-violet": "Scarlet/Violet",
  "official-artwork": "Official Artwork",
  showdown: "Showdown (animato)",
  home: "Home",
  default: "Default",
};

const GAME_VERSION_GENERATION: Record<GameVersion, number> = {
  "red-blue": 1,
  yellow: 1,
  gold: 2,
  silver: 2,
  crystal: 2,
  "ruby-sapphire": 3,
  emerald: 3,
  "fire-red-leaf-green": 3,
  "diamond-pearl": 4,
  platinum: 4,
  "heart-gold-soul-silver": 4,
  "black-white": 5,
  "black-2-white-2": 5,
  "x-y": 6,
  "omegaruby-alphasapphire": 6,
  "sun-moon": 7,
  "ultra-sun-ultra-moon": 7,
  "lets-go-pikachu-lets-go-eevee": 7,
  "sword-shield": 8,
  "brilliant-diamond-shining-pearl": 8,
  "legends-arceus": 8,
  "scarlet-violet": 9,
  "official-artwork": 0,
  showdown: 0,
  home: 0,
  default: 0,
};

function mapGameVersionToSpritePath(gameVersion: GameVersion): { gen: GenerationKey; game: string; type: string } | null {
  const map: Record<string, { gen: GenerationKey; game: string; type: string }> = {
    "red-blue": { gen: "generation-i", game: "red-blue", type: "gray" },
    yellow: { gen: "generation-i", game: "yellow", type: "gray" },
    gold: { gen: "generation-ii", game: "gold", type: "normal" },
    silver: { gen: "generation-ii", game: "silver", type: "normal" },
    crystal: { gen: "generation-ii", game: "crystal", type: "normal" },
    "ruby-sapphire": { gen: "generation-iii", game: "ruby-sapphire", type: "normal" },
    emerald: { gen: "generation-iii", game: "emerald", type: "normal" },
    "fire-red-leaf-green": { gen: "generation-iii", game: "fire-red-leaf-green", type: "normal" },
    "diamond-pearl": { gen: "generation-iv", game: "diamond-pearl", type: "normal" },
    platinum: { gen: "generation-iv", game: "platinum", type: "normal" },
    "heart-gold-soul-silver": { gen: "generation-iv", game: "heart-gold-soul-silver", type: "normal" },
    "black-white": { gen: "generation-v", game: "black-white", type: "normal" },
    "black-2-white-2": { gen: "generation-v", game: "black-2-white-2", type: "normal" },
    "x-y": { gen: "generation-vi", game: "x-y", type: "normal" },
    "omegaruby-alphasapphire": { gen: "generation-vi", game: "omegaruby-alphasapphire", type: "normal" },
    "sun-moon": { gen: "generation-vii", game: "sun-moon", type: "normal" },
    "ultra-sun-ultra-moon": { gen: "generation-vii", game: "ultra-sun-ultra-moon", type: "normal" },
    "lets-go-pikachu-lets-go-eevee": { gen: "generation-vii", game: "lets-go-pikachu-lets-go-eevee", type: "normal" },
    "sword-shield": { gen: "generation-viii", game: "sword-shield", type: "normal" },
    "brilliant-diamond-shining-pearl": { gen: "generation-viii", game: "brilliant-diamond-shining-pearl", type: "normal" },
    "legends-arceus": { gen: "generation-viii", game: "legends-arceus", type: "normal" },
    "scarlet-violet": { gen: "generation-ix", game: "scarlet-violet", type: "normal" },
  };
  return map[gameVersion] || null;
}

function buildVersionSpriteUrl(
  pokemon: Pokemon,
  gen: GenerationKey,
  game: string,
  type: string,
  view: SpriteView,
  shiny: boolean
): string | null {
  const genData = pokemon.sprites.versions?.[gen];
  if (!genData) return null;

  const gameData = (genData as any)[game];
  if (!gameData) return null;

  let spriteUrl: string | null = null;

  if (shiny) {
    if (view === "front") {
      spriteUrl = (gameData as any).front_shiny ?? null;
      if (!spriteUrl && type === "gray") {
        spriteUrl = (gameData as any).front_gray ?? null;
      }
    } else {
      spriteUrl = (gameData as any).back_shiny ?? null;
      if (!spriteUrl && type === "gray") {
        spriteUrl = (gameData as any).back_gray ?? null;
      }
    }
  } else {
    if (view === "front") {
      spriteUrl = (gameData as any).front_default ?? null;
      if (!spriteUrl && type === "gray") {
        spriteUrl = (gameData as any).front_gray ?? null;
      }
    } else {
      spriteUrl = (gameData as any).back_default ?? null;
      if (!spriteUrl && type === "gray") {
        spriteUrl = (gameData as any).back_gray ?? null;
      }
    }
  }

  return spriteUrl;
}

export function getSpriteUrl(pokemon: Pokemon, options: SpriteOptions): string | null {
  const { view, shiny, gender, gameVersion } = options;

  if (gameVersion === "showdown") {
    const showdown = pokemon.sprites.other?.showdown;
    if (!showdown) return null;
    if (view === "front") {
      return shiny ? (showdown.front_shiny ?? showdown.front_default) : showdown.front_default;
    }
    return null;
  }

  if (gameVersion === "official-artwork") {
    const artwork = pokemon.sprites.other?.["official-artwork"];
    if (!artwork) return null;
    if (view === "front") {
      return shiny ? (artwork.front_shiny ?? artwork.front_default) : artwork.front_default;
    }
    return null;
  }

  if (gameVersion === "home") {
    const home = pokemon.sprites.other?.home;
    if (!home) return null;
    if (view === "front") {
      return shiny ? (home.front_shiny ?? home.front_default) : home.front_default;
    }
    return null;
  }

  if (gameVersion === "default") {
    const baseSprite = view === "front"
      ? (gender === "female" ? pokemon.sprites.front_female : null) ?? pokemon.sprites.front_default
      : pokemon.sprites.back_default;

    if (shiny) {
      const shinySprite = view === "front"
        ? (gender === "female" ? pokemon.sprites.front_shiny_female : null) ?? pokemon.sprites.front_shiny
        : pokemon.sprites.back_shiny;
      return shinySprite ?? baseSprite;
    }
    return baseSprite;
  }

  const pathInfo = mapGameVersionToSpritePath(gameVersion);
  if (!pathInfo) return null;

  const { gen, game, type } = pathInfo;
  const baseUrl = buildVersionSpriteUrl(pokemon, gen, game, type, view, shiny);

  if (gender === "female" && view === "front") {
    const femaleUrl = buildVersionSpriteUrl(pokemon, gen, game, type, view, shiny);
    if (femaleUrl) return femaleUrl;
  }

  return baseUrl;
}

export function hasGenderSprite(pokemon: Pokemon): boolean {
  return pokemon.sprites.front_female !== null;
}

export function getDefaultRetroGame(id: number): GameVersion {
  if (id <= 151) return "red-blue";
  if (id <= 251) return "gold";
  if (id <= 386) return "ruby-sapphire";
  if (id <= 493) return "diamond-pearl";
  if (id <= 649) return "black-white";
  if (id <= 721) return "x-y";
  if (id <= 809) return "ultra-sun-ultra-moon";
  return "default";
}

export function getAvailableGames(pokemon: Pokemon, mode: "retro" | "modern"): GameInfo[] {
  const games: GameInfo[] = [];
  const versions = pokemon.sprites.versions;

  const gameVersionMap: Array<{ key: GameVersion; gen: GenerationKey; gameKey: string; label: string }> = [
    { key: "red-blue", gen: "generation-i", gameKey: "red-blue", label: GAME_VERSION_LABELS["red-blue"] },
    { key: "yellow", gen: "generation-i", gameKey: "yellow", label: GAME_VERSION_LABELS.yellow },
    { key: "gold", gen: "generation-ii", gameKey: "gold", label: GAME_VERSION_LABELS.gold },
    { key: "silver", gen: "generation-ii", gameKey: "silver", label: GAME_VERSION_LABELS.silver },
    { key: "crystal", gen: "generation-ii", gameKey: "crystal", label: GAME_VERSION_LABELS.crystal },
    { key: "ruby-sapphire", gen: "generation-iii", gameKey: "ruby-sapphire", label: GAME_VERSION_LABELS["ruby-sapphire"] },
    { key: "emerald", gen: "generation-iii", gameKey: "emerald", label: GAME_VERSION_LABELS.emerald },
    { key: "fire-red-leaf-green", gen: "generation-iii", gameKey: "fire-red-leaf-green", label: GAME_VERSION_LABELS["fire-red-leaf-green"] },
    { key: "diamond-pearl", gen: "generation-iv", gameKey: "diamond-pearl", label: GAME_VERSION_LABELS["diamond-pearl"] },
    { key: "platinum", gen: "generation-iv", gameKey: "platinum", label: GAME_VERSION_LABELS.platinum },
    { key: "heart-gold-soul-silver", gen: "generation-iv", gameKey: "heart-gold-soul-silver", label: GAME_VERSION_LABELS["heart-gold-soul-silver"] },
    { key: "black-white", gen: "generation-v", gameKey: "black-white", label: GAME_VERSION_LABELS["black-white"] },
    { key: "black-2-white-2", gen: "generation-v", gameKey: "black-2-white-2", label: GAME_VERSION_LABELS["black-2-white-2"] },
    { key: "x-y", gen: "generation-vi", gameKey: "x-y", label: GAME_VERSION_LABELS["x-y"] },
    { key: "omegaruby-alphasapphire", gen: "generation-vi", gameKey: "omegaruby-alphasapphire", label: GAME_VERSION_LABELS["omegaruby-alphasapphire"] },
    { key: "sun-moon", gen: "generation-vii", gameKey: "sun-moon", label: GAME_VERSION_LABELS["sun-moon"] },
    { key: "ultra-sun-ultra-moon", gen: "generation-vii", gameKey: "ultra-sun-ultra-moon", label: GAME_VERSION_LABELS["ultra-sun-ultra-moon"] },
    { key: "lets-go-pikachu-lets-go-eevee", gen: "generation-vii", gameKey: "lets-go-pikachu-lets-go-eevee", label: GAME_VERSION_LABELS["lets-go-pikachu-lets-go-eevee"] },
    { key: "sword-shield", gen: "generation-viii", gameKey: "sword-shield", label: GAME_VERSION_LABELS["sword-shield"] },
    { key: "brilliant-diamond-shining-pearl", gen: "generation-viii", gameKey: "brilliant-diamond-shining-pearl", label: GAME_VERSION_LABELS["brilliant-diamond-shining-pearl"] },
    { key: "legends-arceus", gen: "generation-viii", gameKey: "legends-arceus", label: GAME_VERSION_LABELS["legends-arceus"] },
    { key: "scarlet-violet", gen: "generation-ix", gameKey: "scarlet-violet", label: GAME_VERSION_LABELS["scarlet-violet"] },
  ];

  for (const { key, gen, gameKey, label } of gameVersionMap) {
    const genData = versions?.[gen] as any;
    const gameData = genData?.[gameKey];

    if (gameData) {
      const hasFront = gameData.front_default !== null || gameData.front_shiny !== null || gameData.front_gray !== null;
      const hasBack = gameData.back_default !== null || gameData.back_shiny !== null || gameData.back_gray !== null;

      if (hasFront || hasBack) {
        games.push({
          key,
          label,
          generation: GAME_VERSION_GENERATION[key],
          hasFront,
          hasBack,
        });
      }
    }
  }

  if (mode === "modern") {
    const artwork = pokemon.sprites.other?.["official-artwork"];
    if (artwork?.front_default) {
      games.push({
        key: "official-artwork",
        label: GAME_VERSION_LABELS["official-artwork"],
        generation: 0,
        hasFront: true,
        hasBack: false,
      });
    }

    const showdown = pokemon.sprites.other?.showdown;
    if (showdown?.front_default) {
      games.push({
        key: "showdown",
        label: GAME_VERSION_LABELS.showdown,
        generation: 0,
        hasFront: true,
        hasBack: false,
      });
    }

    const home = pokemon.sprites.other?.home;
    if (home?.front_default) {
      games.push({
        key: "home",
        label: GAME_VERSION_LABELS.home,
        generation: 0,
        hasFront: true,
        hasBack: false,
      });
    }
  }

  return games;
}