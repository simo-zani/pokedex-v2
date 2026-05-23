# 💾 Fase 10 — Offline e Salvataggio Dati

> **Obiettivo della fase**: rendere l'app indipendente da PokéAPI, funzionante anche offline o con API chiuse, salvando tutto localmente.

📄 **Riferimenti**: discussioni con Claude — strategie offline.

---

## 🎯 Lista delle feature

### 📦 10.1 — Static Dump Pokémon in Build

Script che a `npm run build` scarica e salva in `public/data/` tutto il necessario.

- [ ] **Script di dump** (`scripts/dump-pokedex.ts` o `dump-pokedex.mjs`)
  - [ ] Fetch `pokemon/{id}` per id 1–1025 (con limit rate)
  - [ ] Fetch `pokemon-species/{id}` per id 1–1025
  - [ ] Fetch `evolution-chain/{id}` per tutte le catene
  - [ ] Salva in file JSON: `public/data/pokemon/{id}.json`, `public/data/species/{id}.json`, `public/data/evolutions.json`
  - [ ] Eventuale merge in un unico `pokedex.db.json` per ridurre richieste HTTP

- [ ] **Hook con fallback** (`src/hooks/usePokemon.ts`)
  - [ ] Modificare `usePokemon(id)` e `usePokemonSpecies(id)`:
    1. Prima cerca in `public/data/` (fetch locale)
    2. Se non trovato, casca su PokéAPI
    3. Per forme alternative (id > 10000): cerca sempre su API o genera da forma base

- [ ] **Script integrato in build**
  - [ ] `package.json`: `"prebuild": "tsx scripts/dump-pokedex.ts"`
  - [ ] Se il dump è già stato fatto, skippa (cache con `.lastdump` timestamp)
  - [ ] Dump incrementale: solo nuovi Pokémon se `id > savedMax`

### 🗄️ 10.2 — TanStack Query Persistent Cache

Persistere la cache delle query in IndexedDB, così dopo il primo caricamento non serve più chiamare API.

- [ ] **Installare**: `@tanstack/query-persist-client-core` + `@tanstack/react-query-persist-client`
- [ ] **Configurare persist** in `main.tsx`:
  ```typescript
  import { persistQueryClient } from "@tanstack/react-query-persist-client";
  import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
  // oppure createIndexedDBPersister
  ```
- [ ] **`staleTime: Infinity`** già impostato — persisterà all'infinito finché non si fa `invalidateQueries` o clear manuale

### 📸 10.3 — Service Worker per Sprite e Cries

Cache first su sprite (CDN GitHub) e cries (CDN PokeAPI).

- [ ] **Installare**: `vite-plugin-pwa`
- [ ] **Configurare Service Worker**:
  ```typescript
  // vite.config.ts
  import { VitePWA } from "vite-plugin-pwa";

  VitePWA({
    strategies: "injectManifest",
    srcDir: "src",
    filename: "sw.ts",
    registerType: "autoUpdate",
  })
  ```
- [ ] **Cache first** per sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/**`
- [ ] **Cache first** per cries: `https://raw.githubusercontent.com/PokeAPI/cries/**`
- [ ] **Network first** per API (con fallback a cache se offline)

### ⚙️ 10.4 — Modalità Offline

- [ ] **Rilevamento stato offline** (`src/hooks/useOffline.ts`)
  - [ ] `navigator.onLine` + eventi `online`/`offline`
  - [ ] Espone `isOnline: boolean`

- [ ] **Banner "Offline" nella UI**
  - [ ] In retro: barra lampeggiante "OFFLINE" in alto
  - [ ] In moderna: snackbar stile Material "Stai navigando in modalità offline"

- [ ] **Disabilitare interazioni** che richiedono rete (se non c'è cache)

---

## 🎯 Definition of Done — Fase 10

1. ✅ L'app funziona senza PokéAPI per i Pokémon 1–1025 (dati base, species, evoluzioni)
2. ✅ Le sprite e i cries sono cached dopo il primo caricamento
3. ✅ Build produce anche il dump locale dei dati
4. ✅ Se offline, l'app mostra un banner ma continua a funzionare (con dati cached)
5. ✅ Se PokéAPI dovesse chiudere, basta un ultimo dump e l'app è eterna

---

## 💡 Suggerimenti tecnici

- **Rate limiting dump**: PokéAPI non ha rate limit ufficiale ma è buona norma mettere 100ms tra una richiesta e l'altra.
- **Dimensione dump**: ~1025 pokémon × 2 file = ~2000 richieste, ~50-100MB di dati. Salvare in file separati o in un unico JSON compresso.
- **Git**: mettere `public/data/` in `.gitignore`? O committare il dump per avere tutto nel repo? Seconda opzione: così il dump è versionato.
- **Sprite sono 1025 × ~50 immagini ciascuna** → impossibile salvarle tutte. Il CDN GitHub di PokeAPI è molto stabile; il Service Worker è sufficiente.
