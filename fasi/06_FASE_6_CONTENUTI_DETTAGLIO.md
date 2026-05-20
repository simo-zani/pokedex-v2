# 📚 Fase 6 — Contenuti del Dettaglio (Evoluzioni, Forme, Stats animate, Flavor, Lingue)

> **Obiettivo della fase**: completare la pagina di dettaglio Pokémon con TUTTI i contenuti informativi. Catena evolutiva con condizioni, forme alternative (Mega/Gmax/regionali), barre statistiche animate, flavor text con selettore gioco, e selettore lingua per nome + descrizione.

📄 Spec di riferimento: `POKEDEX_WEBAPP_SPEC.md` — sezioni "Catena Evolutiva", "Forme Alternative", "Statistiche", "Descrizione Pokédex (Flavor Text)", "Nomi Multilingua".

---

## ✅ Checklist Fase 6

### 🔤 Lingue e Nomi

- [ ] **Hook `useLanguage`** (`src/hooks/useLanguage.ts`)
  - [ ] Stato: `language: string` (es. `'it'`, `'en'`, `'ja-Hrkt'`)
  - [ ] Default: `'it'`
  - [ ] Persistere in `localStorage` (`pokedex_language`)
  - [ ] Funzione `setLanguage(code)`

- [ ] **Costanti lingue** (`src/lib/constants.ts`)
  ```typescript
  export const LANGUAGES = [
    { code: "it", flag: "🇮🇹", label: "Italiano" },
    { code: "en", flag: "🇬🇧", label: "English" },
    { code: "de", flag: "🇩🇪", label: "Deutsch" },
    { code: "fr", flag: "🇫🇷", label: "Français" },
    { code: "es", flag: "🇪🇸", label: "Español" },
    { code: "ja-Hrkt", flag: "🇯🇵", label: "日本語 (kana)" },
    { code: "ja", flag: "🇯🇵", label: "日本語 (kanji)" },
    { code: "ko", flag: "🇰🇷", label: "한국어" },
    { code: "zh-Hant", flag: "🇹🇼", label: "繁體中文" },
    { code: "zh-Hans", flag: "🇨🇳", label: "简体中文" },
  ];
  ```

- [ ] **LanguageSelector** (`src/components/pokemon/LanguageSelector.tsx`)
  - [ ] Pulsante bandierina nell'header del Pokémon
  - [ ] Al tap: dropdown con tutte le bandiere
  - [ ] Al cambio: aggiorna `language` globale → nome e flavor text si aggiornano

- [ ] **Funzione utility per nome localizzato**
  - [ ] `getLocalizedName(species, language)` → cerca in `species.names[]` la entry con `language.name === language`, fallback su inglese, fallback ulteriore su `species.name`

### 📊 Statistiche Animate

- [ ] **StatBar component** (`src/components/pokemon/StatBar.tsx`)
  - [ ] Riceve: `label` (HP, Atk, ecc.), `value` (numerico, es. 80), `maxValue` (default 255)
  - [ ] In modalità retro:
    - Barra a "blocchi": divisa in N segmenti (es. 16), riempiti proporzionalmente
    - Colore: verde scuro su sfondo verde chiaro
    - Animazione: i blocchi si riempiono uno per uno con stagger (a scatto, 50ms ciascuno)
  - [ ] In modalità moderna:
    - Barra continua con gradient rosso → giallo → verde
    - Animazione: width da 0 a `(value/maxValue)*100%` con Framer Motion `transition: { duration: 0.8, ease: "easeOut" }`
  - [ ] Valore numerico mostrato a destra
  - [ ] Label localizzata in italiano (HP, Atk, Dif, AtkSp, DifSp, Vel) — definire mapping

- [ ] **StatsPanel** (`src/components/pokemon/StatsPanel.tsx`)
  - [ ] Lista delle 6 stats (HP, Attack, Defense, Sp.Atk, Sp.Def, Speed)
  - [ ] Totale stats in fondo
  - [ ] Trigger animazione: ad ogni montaggio (quando si apre il Pokémon)
  - [ ] Reset animazione al cambio Pokémon

### 🧬 Catena Evolutiva

- [ ] **Hook `useEvolutionChain`** (`src/hooks/useEvolutionChain.ts`)
  - [ ] Riceve l'URL della evolution_chain (da `species.evolution_chain.url`)
  - [ ] Fetcha la chain
  - [ ] React Query con cache permanente

- [ ] **Utility parsing chain** (`src/lib/evolution.ts`)
  - [ ] Funzione ricorsiva `parseEvolutionChain(chain)` → struttura piatta o ad albero
  - [ ] Per ogni nodo: `{ speciesName, speciesId, evolutionDetails, children: [] }`
  - [ ] `speciesId` estratto dall'URL della species

- [ ] **EvolutionChain component** (`src/components/pokemon/EvolutionChain.tsx`)
  - [ ] Layout orizzontale: `[sprite] →cond→ [sprite] →cond→ [sprite]`
  - [ ] Ogni sprite è cliccabile → naviga al dettaglio di quel Pokémon
  - [ ] Mostra il nome (localizzato) sotto la sprite
  - [ ] Per evoluzioni ramificate (Eevee → 8 forme): layout a griglia 2x4 o a ventaglio
  - [ ] Se nessuna evoluzione: scritta "Questo Pokémon non si evolve"

- [ ] **EvolutionArrow component** (`src/components/pokemon/EvolutionArrow.tsx`)
  - [ ] Freccia tra due stadi evolutivi
  - [ ] Sopra la freccia: condizione visualizzata in base ai `evolution_details`
  - [ ] Logica condizioni (vedi spec):
    | Trigger | Visualizzazione |
    |---------|----------------|
    | `level-up` + `min_level` | Badge "Lv. 16" |
    | `use-item` + `item` | Sprite oggetto + nome |
    | `trade` | Icona 🔄 / cavo link |
    | `trade` + `held_item` | Icona 🔄 + sprite oggetto |
    | `min_happiness` | ❤️ + "Felicità" |
    | `known_move` | 📖 + nome mossa |
    | `time_of_day: day` | ☀️ |
    | `time_of_day: night` | 🌙 |
    | `location` | 📍 + nome luogo |
    | Multipli | Combinati in colonna |

- [ ] **Sprite oggetti evoluzione**
  - [ ] URL pattern: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/{item-name}.png`
  - [ ] L'`item.name` lo prendi da `evolution_details[].item.name` (es. `"fire-stone"`)

### 🎭 Forme Alternative

- [ ] **Hook `usePokemonForms`** (`src/hooks/usePokemonForms.ts`)
  - [ ] Riceve la lista `varieties[]` dalla species
  - [ ] Filtra escludendo la varietà default (è il Pokémon base)
  - [ ] Per ogni varietà non-default: fetcha `/pokemon/{varietyId}` on-demand (lazy, solo quando si clicca la tab)

- [ ] **FormsPanel** (`src/components/pokemon/FormsPanel.tsx`)
  - [ ] Visibile solo se `species.varieties.length > 1`
  - [ ] Tab/chip cliccabili: `[Base] [Mega X] [Mega Y] [Gmax] [Alola] [Galar] ...`
  - [ ] Estrarre il nome della forma dal `pokemon.name` (es. `"charizard-mega-x"` → "Mega X")
  - [ ] Al click su una tab: carica i dati della forma, aggiorna sprite + tipi + stats
  - [ ] L'intera vista del Pokémon (sprite, tipi, stats) si aggiorna alla forma selezionata
  - [ ] Indicare la tab attiva
  - [ ] Nota: la catena evolutiva e il flavor text restano legati alla species, non cambiano

### 📜 Flavor Text

- [ ] **Hook `useGameVersion`** (`src/hooks/useGameVersion.ts`)
  - [ ] Stato locale alla `PokemonPage`: `flavorGameVersion: string`
  - [ ] Default:
    - Retro mode → versione più vecchia disponibile nella lingua
    - Moderna mode → versione più recente disponibile nella lingua
  - [ ] Reset al cambio Pokémon, al cambio lingua, al cambio modalità

- [ ] **FlavorText component** (`src/components/pokemon/FlavorText.tsx`)
  - [ ] Riceve `species` e `language` corrente
  - [ ] Filtra `species.flavor_text_entries` per la lingua selezionata
  - [ ] Estrae i giochi disponibili (dedup di `version.name`)
  - [ ] Ordina cronologicamente con `GAME_VERSIONS_ORDERED`
  - [ ] Dropdown sopra il testo per scegliere la versione
  - [ ] Mostra il flavor text della versione selezionata
  - [ ] Sostituire i caratteri di controllo (`\f`, `\n`, `\u000c`) con spazi
  - [ ] Se NESSUNA entry nella lingua selezionata → fallback inglese con nota "(testo in inglese)"

- [ ] **Reset al cambio lingua**: quando l'utente cambia bandierina, il flavor text e il dropdown gioco si aggiornano (nuova lista di giochi disponibili in quella lingua)

---

## 🎯 Definition of Done — Fase 6

1. ✅ Il pulsante bandierina cambia il nome del Pokémon nella lingua selezionata
2. ✅ Il flavor text si aggiorna nella lingua selezionata
3. ✅ Il dropdown gioco del flavor text mostra solo i giochi disponibili in quella lingua
4. ✅ Le barre delle stats sono animate (riempimento da 0 al valore)
5. ✅ La catena evolutiva mostra le sprite cliccabili dei Pokémon
6. ✅ Tra ogni stadio evolutivo è visibile la condizione (livello, oggetto, scambio, ecc.)
7. ✅ Per evoluzioni con oggetto: icona dell'oggetto visibile (es. Pietra Fuoco per Vulpix)
8. ✅ Eevee mostra le 8 eeveelutions in layout a griglia/ventaglio
9. ✅ Per i Pokémon con forme alternative (Charizard, Mewtwo, Kyogre, ecc.): tabs visibili
10. ✅ Cliccando una tab di forma → sprite, tipi, stats si aggiornano
11. ✅ Cliccando uno stadio della catena evolutiva si naviga al suo dettaglio

---

## ⚠️ Cosa NON fare in questa fase

- ❌ Niente audio (Fase 7)
- ❌ Niente pagina Generazioni dedicata (Fase 7)
- ❌ Niente preferiti, confronto, easter eggs (Fase 8)

---

## 💡 Suggerimenti tecnici

- **Caratteri di controllo nel flavor text**: la PokéAPI inserisce `\f` (form feed) e `\n` per andare a capo nelle vecchie versioni del Pokédex. Usa `.replace(/[\f\n\u000c]/g, ' ').replace(/\s+/g, ' ')`.
- **Parsing evolution chain**: la struttura è ricorsiva. Una funzione che esplora `chain` → `evolves_to[]` → `evolves_to[]` ricorsivamente. Per Eevee, `chain.evolves_to` ha 8 elementi.
- **Forme alternative — varietà default**: la prima varietà in `varieties[]` è quella `is_default: true` (il Pokémon base). Saltala quando costruisci le tab.
- **Forme — nome leggibile**: il `pokemon.name` per le forme è tipo `"charizard-mega-x"`. Per il label della tab, fai `name.split('-').slice(1).join(' ')` → `"mega x"`, poi capitalizza.
- **Lingua giapponese kana vs kanji**: in PokéAPI, `ja-Hrkt` è katakana/hiragana (più comune per nomi), `ja` è kanji (rari per Pokémon vecchi, esistono per alcuni).
- **Item names mapping**: alcuni nomi item potrebbero avere caratteri strani (es. `"thunder-stone"` → URL ok, `"prism-scale"` → ok). In caso di 404 sull'immagine, mostra solo il testo.
- **Caching evolution chain**: 1 catena è condivisa tra tutti i Pokémon della catena (es. Bulbasaur, Ivysaur e Venusaur usano la stessa chain). Cachare per `evolution_chain.url`.

---

## 🧪 Test manuali da fare

- Bulbasaur (#1): nome cambia in italiano "Bulbasaur" (uguale), in giapponese "フシギダネ"
- Charmander (#4): catena → Lv.16 → Charmeleon → Lv.36 → Charizard
- Vulpix (#37): catena → Pietra Fuoco (con icona oggetto) → Ninetales
- Eevee (#133): catena ramificata con 8 evoluzioni e condizioni diverse
- Charizard (#6): forme tab → Base, Mega X, Mega Y, Gmax — sprite e tipi cambiano (Mega X diventa Fuoco/Drago)
- Mewtwo (#150): forme → Base, Mega X, Mega Y
- Vulpix di Alola (#37): la sua varietà ha tipo Ghiaccio, non Fuoco
- Cambio lingua a tedesco: il flavor text si aggiorna a tedesco se disponibile
- Cambio gioco nel flavor: si vedono le descrizioni cronologiche
- Stat di Magikarp (Spe=80, tutto il resto basso) → barre disuguali, animate
- Stat di Shuckle (Def=230, HP=20) → barra Def piena, HP corta

---

## ➡️ Prossima fase

Quando la Fase 6 è ✅ completata, aggiorna `00_AVANZAMENTO_PROGETTO.md` e passa a `07_FASE_7_AUDIO_E_POLISH.md`.
