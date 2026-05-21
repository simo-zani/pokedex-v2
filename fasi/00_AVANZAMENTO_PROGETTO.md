# 📊 Avanzamento Progetto Pokédex Webapp

> **Istruzioni per Claude**: leggi PRIMA questo file per capire a che fase sono arrivato, POI apri il file della fase corrispondente (`01_FASE_1_FONDAMENTA.md`, `02_FASE_2_SHELL_E_POWER.md`, ecc.) e lavora SOLO su quella fase. Quando completiamo una fase, aggiorna lo stato qui sotto da `🔲 Da fare` a `✅ Completata` e indica la data.

---

## 🎯 Riepilogo Progetto

**Nome**: Pokédex Webapp (v3)
**Stack**: Vite + React 18 + TypeScript + Tailwind + React Router + TanStack Query + Framer Motion
**Fonte dati**: PokéAPI (https://pokeapi.co/api/v2/)
**Hosting**: Vercel (statico, free tier)
**Repo**: GitHub
**Pokémon totali**: ~1025 (tutte le generazioni)
# 📊 Avanzamento Progetto Pokédex Webapp

> **Istruzioni per Claude**: leggi PRIMA questo file per capire a che fase sono arrivato, POI apri il file della fase corrispondente (`01_FASE_1_FONDAMENTA.md`, `02_FASE_2_SHELL_E_POWER.md`, ecc.) e lavora SOLO su quella fase. Quando completiamo una fase, aggiorna lo stato qui sotto da `🔲 Da fare` a `✅ Completata` e indica la data.

---

## 🎯 Riepilogo Progetto

**Nome**: Pokédex Webapp (v3)
**Stack**: Vite + React 18 + TypeScript + Tailwind + React Router + TanStack Query + Framer Motion
**Fonte dati**: PokéAPI (https://pokeapi.co/api/v2/)
**Hosting**: Vercel (statico, free tier)
**Repo**: GitHub
**Pokémon totali**: ~1025 (tutte le generazioni)
**Modalità visive**: Retro (Game Boy) + Moderna

📄 **Spec completa di riferimento**: `POKEDEX_WEBAPP_SPEC.md`

---

## 📍 Fase Corrente

> **Aggiorna qui sotto la fase su cui stiamo lavorando.**

**Fase attiva**: `Fase 6 — Contenuti Dettaglio`
**File da aprire**: `06_FASE_6_CONTENUTI_DETTAGLIO.md`
**Note**: Fasi 1, 2, 3 e 4 completate il 20/05/2026. Fase 5 completata il 21/05/2026. Progetto su GitHub: https://github.com/simo-zani/pokedex-v2
**Prossimo step**: Punto 5 della Fase 6 (Forme Alternative), poi Fase 7 e resto.

---

## ✅ Stato delle Fasi

| # | Fase | File | Stato | Data completamento |
|   |------|------|-------|-------------------|
| 1 | Fondamenta | `01_FASE_1_FONDAMENTA.md` | ✅ Completata | 20/05/2026 |
| 2 | Shell e Power | `02_FASE_2_SHELL_E_POWER.md` | ✅ Completata | 20/05/2026 |
| 3 | Modalità Retro | `03_FASE_3_MODALITA_RETRO.md` | ✅ Completata | 20/05/2026 |
| 4 | Modalità Moderna + Switch | `04_FASE_4_MODALITA_MODERNA_E_SWITCH.md` | ✅ Completata | 20/05/2026 |
| 5 | Sprite System Completo | `05_FASE_5_SPRITE_SYSTEM.md` | ✅ Completata | 21/05/2026 |
| 6 | Contenuti Dettaglio | `06_FASE_6_CONTENUTI_DETTAGLIO.md` | 🟡 In corso | — |
| 7 | Audio e Polish | `07_FASE_7_AUDIO_E_POLISH.md` | 🔲 Da fare | — |
| 8 | Extra (opzionali) | `08_FASE_8_EXTRA.md` | 🔲 Da fare | — |
| 9 | Deploy finale e QA | `09_FASE_9_DEPLOY_E_QA.md` | 🔲 Da fare | — |
- 🔲 Da fare
- 🟡 In corso
- ✅ Completata
- ⏸️ In pausa
- ⏭️ Saltata (opzionale)

---

## 🗒️ Note di sviluppo / decisioni prese in corso d'opera

> Spazio libero per appuntare scelte tecniche, modifiche alla spec, problemi incontrati, ecc.

- **20/05/2026**: Progetto inizializzato con Vite + React 19 + TypeScript strict + Tailwind 3 + React Router 6 + TanStack Query 5 + React Virtuoso 4
- **20/05/2026**: React 19 (non 18 come nella spec originale) — nessun problema di compatibilità
- **20/05/2026**: Fase 1 completata — lista 1025 Pokémon con ricerca client-side, griglia virtualizzata, pagina dettaglio con stats/tipi/sprite, SPA rewrite per Vercel
- **20/05/2026**: Fase 2 completata — scocca rossa Pokédex fullscreen su mobile (100dvh), LED blu con glow, PowerButton con animazione boot/shutdown stile Game Boy, ButtonBar con prev/next funzionanti + keyboard arrows, HOME funzionante, MODE/GEN/FAV placeholder
- **20/05/2026**: Fase 3 completata — aggiunta tavolozza monocromatica Game Boy (CSS variables + config Tailwind), impostato font pixelato "Press Start 2P", caricamento e filtraggio sprite retro (Gen I gray per <=151, filtro CSS verde per >151), aggiunte scanlines ed effetto glow allo schermo, scocca Pokédex modificata in grigio (#8B8B8B), LED rosso e pulsanti squadrati a scatto, create visualizzazioni retro per statistiche e tipi.
- **20/05/2026**: Repo GitHub: https://github.com/simo-zani/pokedex-v2
- **20/05/2026**: Fase 5 iniziata — create utility sprites (`src/lib/sprites.ts`), costanti ordine giochi in `constants.ts`, componente SpriteViewer con front+back affiancati, shiny toggle (3 stelline), gender toggle, selettore gioco (solo moderna). Retro: sprite per generazione (come lista). Moderna: default Official Artwork.
- **21/05/2026**: Fase 6 — Completati punti 1 (lingue), 2 (stats), 3 (catena evolutiva), 6 (flavor text). Unificata colonna destra controlli (gameboy, flag, info, shiny, gender) con stato sollevato in PokemonPage. Tutti i pulsanti a 25×25px. Retro mode: cerchi rimossi da lingua e info, sprite catena evolutiva con filtro verde dedicato (`.gb-evo-filter`). Nomi oggetti evoluzione in italiano (Pietratuono, ecc.). Spessore tracce uniformato a 1.5px. Build funzionante. **Mancante**: punto 5 — Forme Alternative (Mega, Gmax, regionali).

---

## 🔗 Link Utili

- **PokéAPI docs**: https://pokeapi.co/docs/v2
- **PokéAPI cries**: https://github.com/PokeAPI/cries
- **PokéAPI sprites**: https://github.com/PokeAPI/sprites
- **Tailwind**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **TanStack Query**: https://tanstack.com/query/latest
- **React Virtuoso**: https://virtuoso.dev/

---

## 🛠️ Come usare questi file con Claude

Quando apri una nuova chat con Claude per lavorare al progetto:

1. Carica/incolla questo file `00_AVANZAMENTO_PROGETTO.md`
2. Carica anche il file della fase corrente (es. `01_FASE_1_FONDAMENTA.md`)
3. Carica (se serve contesto completo) anche `POKEDEX_WEBAPP_SPEC.md`
4. Dì a Claude: *"Stiamo lavorando alla [fase X]. Procedi seguendo il file della fase."*

Alla fine della sessione, aggiorna lo stato della fase e salva il file.
