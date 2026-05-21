# 📚 Fase 6 — Contenuti del Dettaglio (Evoluzioni, Forme, Stats animate, Flavor, Lingue)

> **Obiettivo della fase**: completare la pagina di dettaglio Pokémon con TUTTI i contenuti informativi. Catena evolutiva con condizioni, forme alternative (Mega/Gmax/regionali), barre statistiche animate, flavor text con selettore gioco, e selettore lingua per nome + descrizione.

📄 Spec di riferimento: `POKEDEX_WEBAPP_SPEC.md` — sezioni "Catena Evolutiva", "Forme Alternative", "Statistiche", "Descrizione Pokédex (Flavor Text)", "Nomi Multilingua".

---

## ✅ Checklist Fase 6

### 🔤 Lingue e Nomi

- [x] **Hook `useLanguage`** (`src/hooks/useLanguage.ts`)
  - [x] Stato: `language: string` (es. `'it'`, `'en'`, `'ja-Hrkt'`)
  - [x] Default: `'it'`
  - [x] Persistere in `localStorage` (`pokedex_language`)
  - [x] Funzione `setLanguage(code)`

- [x] **Costanti lingue** (`src/lib/constants.ts`)
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

- [x] **LanguageSelector** (`src/components/pokemon/LanguageSelector.tsx`)
  - [x] Pulsante bandierina nell'header del Pokémon
  - [x] Al tap: dropdown con tutte le bandiere
  - [x] Al cambio: aggiorna `language` globale → nome e flavor text si aggiornano

- [x] **Funzione utility per nome localizzato**
  - [x] `getLocalizedName(species, language)` → cerca in `species.names[]` la entry con `language.name === language`, fallback su inglese, fallback ulteriore su `species.name`

### 📊 Statistiche Animate

- [x] **StatBar component** (`src/components/pokemon/StatBar.tsx`)
  - [x] Riceve: `label` (HP, Atk, ecc.), `value` (numerico, es. 80), `maxValue` (default 255)
  - [x] In modalità retro:
    - Barra a "blocchi": divisa in N segmenti (es. 16), riempiti proporzionalmente
    - Colore: verde scuro su sfondo verde chiaro
    - Animazione: i blocchi si riempiono uno per uno con stagger (a scatto, 50ms ciascuno)
  - [x] In modalità moderna:
    - Barra continua con gradient rosso → giallo → verde
    - Animazione: width da 0 a `(value/maxValue)*100%` con Framer Motion `transition: { duration: 0.8, ease: "easeOut" }`
  - [x] Valore numerico mostrato a destra
  - [x] Label localizzata in italiano (HP, Atk, Dif, AtkSp, DifSp, Vel) — definire mapping

- [x] **StatsPanel** (`src/components/pokemon/StatsPanel.tsx`)
  - [x] Lista delle 6 stats (HP, Attack, Defense, Sp.Atk, Sp.Def, Speed)
  - [x] Totale stats in fondo
  - [x] Trigger animazione: ad ogni montaggio (quando si apre il Pokémon)
  - [x] Reset animazione al cambio Pokémon

### 🧬 Catena Evolutiva

- [x] **Hook `useEvolutionChain`** (`src/hooks/useEvolutionChain.ts`)
  - [x] Riceve l'URL della evolution_chain (da `species.evolution_chain.url`)
  - [x] Fetcha la chain
  - [x] React Query con cache permanente

- [x] **Utility parsing chain** (`src/lib/evolution.ts`)
  - [x] Funzione ricorsiva `parseEvolutionChain(chain)` → struttura piatta o ad albero
  - [x] Per ogni nodo: `{ speciesName, speciesId, evolutionDetails, children: [] }`
  - [x] `speciesId` estratto dall'URL della species

- [x] **EvolutionChain component** (`src/components/pokemon/EvolutionChain.tsx`)
  - [x] Layout orizzontale: `[sprite] →cond→ [sprite] →cond→ [sprite]`
  - [x] Ogni sprite è cliccabile → naviga al dettaglio di quel Pokémon
  - [x] Mostra il nome (localizzato) sotto la sprite
  - [x] Per evoluzioni ramificate (Eevee → 8 forme): layout a griglia 2x4 o a ventaglio
  - [x] Se nessuna evoluzione: scritta "Questo Pokémon non si evolve" (modificato: non renderizzato nulla)

- [x] **EvolutionArrow component** (`src/components/pokemon/EvolutionArrow.tsx`)
  - [x] Freccia tra due stadi evolutivi
  - [x] Sopra la freccia: condizione visualizzata in base ai `evolution_details`
  - [x] Logica condizioni (vedi spec):
    | Trigger | Visualizzazione |
    |---------|----------------|
    | `level-up` + `min_level` | Badge "Lv. 16" |
    | `use-item` + `item` | Sprite oggetto + nome (italiano) |
    | `trade` | Icona 🔄 / cavo link |
    | `trade` + `held_item` | Icona 🔄 + sprite oggetto |
    | `min_happiness` | ❤️ + "Felicità" |
    | `known_move` | 📖 + nome mossa |
    | `time_of_day: day` | ☀️ |
    | `time_of_day: night` | 🌙 |
    | `location` | 📍 + nome luogo |
    | Multipli | Combinati in colonna |

- [x] **Sprite oggetti evoluzione**
  - [x] URL pattern: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/{item-name}.png`
  - [x] L'`item.name` lo prendi da `evolution_details[].item.name` (es. `"fire-stone"`)

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

- [x] Funzione `getFlavorTextEntry` — filtro per lingua + gioco, nessun fallback inglese
- [x] **FlavorTextPopup** — modale con descrizione + label gioco sotto (non in grassetto), senza selettore gioco interno
- [x] Pulsante "i" condizionale (visibile solo se esiste flavor text nella lingua selezionata)
- [x] Reset al cambio lingua

> **Deviazioni dalla spec**: nessun selettore gioco dentro il popup (usa la game version dello sprite viewer). Nessun fallback inglese — pulsante "i" nascosto se non c'è testo in quella lingua.

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
9. ✅ Cliccando uno stadio della catena evolutiva si naviga al suo dettaglio
10. ⬜ **FORME ALTERNATIVE** — `FormsPanel` con tabs per Mega/Gmax/regionali — **Prossimo step**

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
