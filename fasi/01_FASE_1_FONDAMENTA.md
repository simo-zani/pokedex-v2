# 🏗️ Fase 1 — Fondamenta

> **Obiettivo della fase**: avere un'app funzionante minima, online su Vercel, con la lista di tutti i Pokémon ricercabile e una pagina di dettaglio essenziale. Niente shell decorativa, niente temi: solo lo scheletro tecnico solido su cui costruire tutto il resto.

📄 Spec di riferimento: `POKEDEX_WEBAPP_SPEC.md` — sezioni "Stack Tecnico", "Fonte Dati — PokéAPI", "Struttura Cartelle".

---

## ✅ Checklist Fase 1

- [ ] **Setup progetto**
  - [ ] `npm create vite@latest pokedex -- --template react-ts`
  - [ ] Installare: `tailwindcss`, `postcss`, `autoprefixer` (init `npx tailwindcss init -p`)
  - [ ] Installare: `react-router-dom@6`
  - [ ] Installare: `@tanstack/react-query`
  - [ ] Installare: `react-virtuoso` (per la lista virtualizzata)
  - [ ] Configurare `tailwind.config.ts` con i path corretti (`./index.html`, `./src/**/*.{ts,tsx}`)
  - [ ] Creare `src/styles/globals.css` con `@tailwind base/components/utilities`
  - [ ] Configurare TypeScript strict mode

- [ ] **Struttura cartelle**
  ```
  src/
  ├── pages/        (HomePage.tsx, PokemonPage.tsx)
  ├── components/   (pokemon/PokemonCard.tsx, search/SearchBar.tsx, common/)
  ├── hooks/        (usePokemonList.ts, usePokemon.ts)
  ├── lib/          (pokeapi.ts, types.ts, constants.ts)
  └── styles/       (globals.css)
  ```

- [ ] **Routing**
  - [ ] `App.tsx` con `<BrowserRouter>` + `<QueryClientProvider>`
  - [ ] Route `/` → `HomePage`
  - [ ] Route `/pokemon/:id` → `PokemonPage`
  - [ ] Catch-all 404 → redirect a `/`

- [ ] **Client PokéAPI** (`src/lib/pokeapi.ts`)
  - [ ] Funzione `fetchPokemonList()` → GET `/pokemon?limit=2000&offset=0`
  - [ ] Funzione `fetchPokemon(idOrName)` → GET `/pokemon/{id}`
  - [ ] Funzione `fetchPokemonSpecies(id)` → GET `/pokemon-species/{id}`
  - [ ] Tipi TypeScript essenziali in `src/lib/types.ts` (PokemonListItem, Pokemon, PokemonSpecies)
  - [ ] **NON** definire ancora tutti i tipi nel dettaglio — solo il minimo per la Fase 1 (id, name, types, stats, sprites.front_default)

- [ ] **Hook React Query**
  - [ ] `usePokemonList()` → `useQuery` con `staleTime: Infinity`, `gcTime: Infinity`
  - [ ] `usePokemon(id)` → `useQuery` con stesso cache config
  - [ ] QueryClient con default `staleTime: Infinity` per evitare refetch

- [ ] **HomePage**
  - [ ] Barra di ricerca in cima (input testo)
  - [ ] Ricerca client-side per **nome** (case-insensitive, contains) e **numero** (esatto o startsWith)
  - [ ] Griglia/lista di Pokémon usando `react-virtuoso`
  - [ ] Card semplice: `#001`, sprite `front_default` (da `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png` per evitare di fetchare 1025 dettagli), nome
  - [ ] Click sulla card → navigate a `/pokemon/{id}`
  - [ ] Estrarre l'id dall'URL della list item (es. `/pokemon/25/` → `25`)

- [ ] **PokemonPage (versione minima)**
  - [ ] Fetch dettaglio + species in parallelo (`useQueries` o due `useQuery`)
  - [ ] Mostrare: numero, nome (inglese, default da `species.name`), sprite `front_default`
  - [ ] Badge tipi (semplici, senza colori per tipo ancora — usiamo solo `bg-gray-200`)
  - [ ] Stats numeriche in lista semplice (HP, Atk, Def, SpAtk, SpDef, Spe)
  - [ ] Bottone "← Indietro" che torna alla Home
  - [ ] Loading state e error state minimi

- [ ] **Deploy su Vercel**
  - [ ] Creare `vercel.json` con il rewrite per SPA:
    ```json
    { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
    ```
  - [ ] Push su un nuovo repo GitHub
  - [ ] Collegare il repo a Vercel → auto-deploy
  - [ ] Verificare che l'URL `pokedex-xyz.vercel.app` funzioni
  - [ ] Verificare che il refresh su `/pokemon/25` NON dia 404

---

## 🎯 Definition of Done — Fase 1

La fase è completa quando:

1. ✅ Aprendo l'URL Vercel vedo la lista di tutti i ~1025 Pokémon
2. ✅ La barra di ricerca filtra istantaneamente per nome e numero
3. ✅ Cliccando un Pokémon arrivo alla sua pagina di dettaglio
4. ✅ Vedo sprite, nome, tipi (semplici), stats numeriche
5. ✅ Posso tornare indietro alla lista
6. ✅ Il refresh su una pagina di dettaglio non rompe niente (SPA rewrite OK)
7. ✅ La lista non lagga scrollando (virtualizzata)

---

## ⚠️ Cosa NON fare in questa fase

- ❌ Niente shell decorativa (PokedexShell, ButtonBar, LED, Power button)
- ❌ Niente tema retro/moderno — solo Tailwind di default
- ❌ Niente Framer Motion
- ❌ Niente audio
- ❌ Niente evoluzioni, forme, flavor text, lingue multiple
- ❌ Niente shiny, gender, selettore gioco
- ❌ Niente sprite back

Tutto questo arriva nelle fasi successive. **L'obiettivo è solo avere lo scheletro online**.

---

## 💡 Suggerimenti tecnici

- **Sprite della lista**: per non fare 1025 chiamate al dettaglio, usa l'URL pattern degli sprite ufficiali: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png` — l'id lo estrai dalla URL della list response.
- **Estrazione ID dall'URL**: regex `/\/pokemon\/(\d+)\//` sull'URL della list item.
- **Virtuoso**: usa `<Virtuoso>` con `totalCount`, `itemContent={(index) => <Card ... />}`. Per griglia (più colonne) usa `<VirtuosoGrid>`.
- **React Query devtools**: installa `@tanstack/react-query-devtools` durante lo sviluppo per ispezionare la cache.
- **Strict mode**: con StrictMode in dev, React esegue gli effect due volte → non spaventarsi se vedi due fetch nella prima render in dev (in prod non succede).

---

## ➡️ Prossima fase

Quando la Fase 1 è ✅ completata, aggiorna `00_AVANZAMENTO_PROGETTO.md` e passa a `02_FASE_2_SHELL_E_POWER.md`.
