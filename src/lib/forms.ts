export interface FormInfo {
  title: string;
  subtitle: string;
}

const SUFFIX_LABELS: Record<string, string> = {
  "mega": "Mega evoluzione",
  "mega-x": "Mega evoluzione",
  "mega-y": "Mega evoluzione",
  "gmax": "Gigantamax",
  "attack": "Forma Attacco",
  "defense": "Forma Difesa",
  "speed": "Forma Velocità",
  "heat": "Forma Calore",
  "wash": "Forma Lavaggio",
  "frost": "Forma Gelo",
  "fan": "Forma Ventilatore",
  "mow": "Forma Taglio",
  "origin": "Forma Originale",
  "sky": "Forma Cielo",
  "altered": "Forma Alterata",
  "land": "Forma Terra",
  "normal": "Forma Normale",
  "plant": "Forma Pianta",
  "sandy": "Forma Sabbia",
  "trash": "Forma Scarto",
  "red-striped": "Forma Stripe Rosse",
  "blue-striped": "Forma Stripe Blu",
  "standard": "Forma Standard",
  "zen": "Forma Zen",
  "incarnate": "Forma Incarnazione",
  "therian": "Forma Animale",
  "dusk": "Forma Crepuscolo",
  "dawn": "Forma Aurora",
  "ultra": "Ultra",
  "eternamax": "Eternamax",
  "10": "Forma 10%",
  "50": "Forma 50%",
  "complete": "Forma Completa",
  "unbound": "Forma Libera",
  "primal": "Primordial",
};

export function getFormInfo(formName: string, baseSpeciesName: string, baseItalianName: string): FormInfo {
  const suffix = formName.replace(baseSpeciesName, "").replace(/^-/, "");
  const label = SUFFIX_LABELS[suffix];

  if (suffix === "mega" || suffix === "mega-x" || suffix === "mega-y") {
    const suffixLabel = suffix === "mega-x" ? " X" : suffix === "mega-y" ? " Y" : "";
    return {
      title: `Mega${suffixLabel} ${baseItalianName}`,
      subtitle: `Mega evoluzione di ${baseItalianName}`,
    };
  }

  if (suffix === "gmax") {
    return {
      title: `Gigantamax ${baseItalianName}`,
      subtitle: `Gigantamax ${baseItalianName}`,
    };
  }

  if (suffix === "primal") {
    return {
      title: `${baseItalianName} ${label}`,
      subtitle: `${label} di ${baseItalianName}`,
    };
  }

  if (label) {
    return {
      title: `${baseItalianName} (${label})`,
      subtitle: `${label} di ${baseItalianName}`,
    };
  }

  return {
    title: `${baseItalianName} (${suffix})`,
    subtitle: `Forma alternativa di ${baseItalianName}`,
  };
}

export function isAltForm(pokemonName: string, varieties: { is_default: boolean; pokemon: { name: string } }[]): boolean {
  const defaultName = varieties.find(v => v.is_default)?.pokemon.name;
  return !!defaultName && pokemonName !== defaultName;
}

const COSTUME_SUFFIXES = new Set([
  "rock-star", "belle", "pop-star", "phd", "libre", "cosplay",
  "original-cap", "hoenn-cap", "sinnoh-cap", "unova-cap", "kalos-cap",
  "alola-cap", "partner-cap", "world-cap", "starter",
]);

export function isCostumeForm(pokemonName: string): boolean {
  const suffix = pokemonName.split("-").slice(1).join("-");
  return COSTUME_SUFFIXES.has(suffix);
}
