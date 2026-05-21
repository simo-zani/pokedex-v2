import type { EvolutionChainLink, EvolutionDetail } from "./types";

export interface EvolveNode {
  speciesName: string;
  speciesId: number;
  details: EvolutionDetail[];
  children: EvolveNode[];
}

export function parseEvolutionChain(chain: EvolutionChainLink): EvolveNode {
  const speciesId = parseInt(chain.species.url.split("/").filter(Boolean).pop()!, 10);
  return {
    speciesName: chain.species.name,
    speciesId,
    details: chain.evolution_details,
    children: chain.evolves_to.map(parseEvolutionChain),
  };
}

export function getItemSpriteUrl(itemName: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemName}.png`;
}

const ITEM_NAME_IT: Record<string, string> = {
  "thunder-stone": "Pietratuono",
  "fire-stone": "Pietrafocaia",
  "water-stone": "Pietraidrica",
  "leaf-stone": "Pietrafoglia",
  "moon-stone": "Pietralunare",
  "sun-stone": "Pietrasolare",
  "dusk-stone": "Pietratarda",
  "dawn-stone": "Pietrauruora",
  "shiny-stone": "Pietrasplendente",
  "ice-stone": "Pietragelo",
  "king-s-rock": "Rocciareale",
  "metal-coat": "Metalcoperta",
  "dragon-scale": "Squamadrago",
  "up-grade": "Aggiornamento",
  "dubious-disc": "Discodubbio",
  "protector": "Protettore",
  "electirizer": "Elettroaggregatore",
  "magmarizer": "Magmatizzatore",
  "razor-fang": "Zannaffilata",
  "razor-claw": "Artiglioffilato",
  "prism-scale": "Scagliaprisma",
  "reaper-cloth": "Tessutomorto",
  "sachet": "Profumino",
  "whipped-dream": "Pannamontata",
  "linking-cord": "Cordalegame",
  "sweet-apple": "Meladolce",
  "tart-apple": "Melaaspra",
  "cracked-pot": "Pentolarotta",
  "galarica-cuff": "Bracciale di Galar",
  "galarica-wreath": "Ghirlanda di Galar",
  "black-augite": "Augitenera",
  "peat-block": "Blocchetto",
  "masterpiece-teacup": "Tazzamagnifica",
};

export function formatEvolutionCondition(details: EvolutionDetail[]): {
  label: string;
  icon: string | null;
  itemName: string | null;
}[] {
  return details.map((d): { label: string; icon: string | null; itemName: string | null } => {
    if (d.trigger.name === "level-up" && d.min_level !== null) {
      return { label: `Lv. ${d.min_level}`, icon: null, itemName: null };
    }
    if (d.trigger.name === "use-item" && d.item) {
      return { label: ITEM_NAME_IT[d.item.name] ?? d.item.name.replace(/-/g, " "), icon: null, itemName: d.item.name };
    }
    if (d.trigger.name === "trade") {
      if (d.held_item) {
        return { label: `Scambio (${ITEM_NAME_IT[d.held_item.name] ?? d.held_item.name.replace(/-/g, " ")})`, icon: "🔄", itemName: d.held_item.name };
      }
      return { label: "Scambio", icon: "🔄", itemName: null };
    }
    if (d.trigger.name === "level-up" && d.min_happiness !== null) {
      return { label: "Felicità", icon: "❤️", itemName: null };
    }
    if (d.trigger.name === "level-up" && d.known_move) {
      return { label: d.known_move.name.replace(/-/g, " "), icon: "📖", itemName: null };
    }
    if (d.time_of_day === "day") {
      return { label: "Giorno", icon: "☀️", itemName: null };
    }
    if (d.time_of_day === "night") {
      return { label: "Notte", icon: "🌙", itemName: null };
    }
    if (d.location) {
      return { label: d.location.name.replace(/-/g, " "), icon: "📍", itemName: null };
    }
    if (d.trigger.name === "level-up" && d.relative_physical_stats !== null) {
      const stats = ["ATK < DEF", "ATK = DEF", "ATK > DEF"][d.relative_physical_stats + 1] ?? "ATK = DEF";
      return { label: stats, icon: "💪", itemName: null };
    }
    if (d.needs_overworld_rain) {
      return { label: "Pioggia", icon: "🌧️", itemName: null };
    }
    if (d.turn_upside_down) {
      return { label: "Capovolgi", icon: "🔄", itemName: null };
    }
    if (d.min_affection !== null) {
      return { label: "Affetto", icon: "💖", itemName: null };
    }
    return { label: d.trigger.name, icon: null, itemName: null };
  });
}
