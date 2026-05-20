# 🖼️ Fase 5 — Sprite System Completo

> **Obiettivo della fase**: trasformare l'area sprite della PokemonPage in qualcosa di ricco e interattivo. Front + back affiancati, shiny toggle con animazione sparkle, gender toggle per i Pokémon con sprite differenziate, selettore gioco per vedere le sprite cronologiche, e popup fullscreen.

📄 Spec di riferimento: `POKEDEX_WEBAPP_SPEC.md` — sezioni "Area Sprite", "Popup Sprite Fullscreen", "Sprite — Struttura Completa dalla PokéAPI".

---

## ✅ Checklist Fase 5

- [ ] **Utility sprite** (`src/lib/sprites.ts`)
  - [ ] Funzione `getSpriteUrl(pokemon, options)` con options:
    - `view: 'front' | 'back'`
    - `shiny: boolean`
    - `gender: 'male' | 'female'`
    - `gameVersion: string` (es. `'red-blue'`, `'gold'`, `'x-y'`, oppure `'default'` / `'official-artwork'` / `'showdown'`)
  - [ ] Mappa il `gameVersion` al path corretto in `sprites.versions[generation][game][...]`
  - [ ] Mappa "showdown" a `sprites.other.showdown.{view}_{shiny?}` (GIF animate)
  - [ ] Mappa "official-artwork" a `sprites.other['official-artwork'].front_{default|shiny}` (solo front)
  - [ ] Restituisce `null` se la sprite non esiste
  - [ ] Funzione `getAvailableGames(pokemon)` → lista di `{key, label, hasFront, hasBack}` ordinati cronologicamente
  - [ ] Funzione `hasGenderSprite(pokemon)` → boolean (true se `sprites.front_female` non è null)

- [ ] **Costanti ordine giochi** (`src/lib/constants.ts`)
  - [ ] `GAME_VERSIONS_ORDERED` dalla spec (red, blue, yellow, ..., scarlet, violet)
  - [ ] Mapping da `gameKey` a `versions.generation-X.gameKey` path nella struttura sprites

- [ ] **SpriteViewer component** (`src/components/pokemon/SpriteViewer.tsx`)
  - [ ] Riceve `pokemon` (oggetto completo dalla API)
  - [ ] Stati locali:
    - `shiny: boolean` (default false)
    - `gender: 'male' | 'female'` (default 'male')
    - `gameVersion: string` (default: in retro = primo gioco disponibile, in moderna = 'official-artwork' o ultimo gioco)
  - [ ] Layout:
    ```
             ⭐ (stelline shiny in alto)
    ┌────────────────────────────────┐
    │  [FRONT sprite] [BACK sprite]  │  ← affiancate
    └────────────────────────────────┘
        ♂/♀ (se gender differenziato)
       [▼ Selettore gioco ▼]
    ```
  - [ ] Se non c'è back sprite per il gioco selezionato → mostra solo front

- [ ] **ShinyToggle** (`src/components/pokemon/ShinyToggle.tsx`)
  - [ ] Stelline ⭐ in alto sopra le sprite
  - [ ] Default: stelline spente (outline grigio, no fill)
  - [ ] Al tap: stelline si illuminano (giallo oro `#FFD700`)
  - [ ] Animazione sparkle: 3-5 stelline che appaiono in random + fade out
    ```tsx
    <motion.span
      initial={{ scale: 0, opacity: 1, rotate: 0 }}
      animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0], rotate: 360 }}
      transition={{ duration: 0.8 }}
    >✨</motion.span>
    ```
  - [ ] Ri-tap: stelline si spengono, animazione inversa
  - [ ] Le sprite cambiano a `front_shiny` / `back_shiny`
  - [ ] In modalità retro: stelline pixel-art, animazione a scatto
  - [ ] In modalità moderna: stelline lisce, animazione fluida

- [ ] **GenderToggle** (`src/components/pokemon/GenderToggle.tsx`)
  - [ ] Visibile solo se `hasGenderSprite(pokemon)` è true
  - [ ] Toggle compatto ♂/♀ sotto le sprite
  - [ ] Stato attivo evidenziato (background colorato)
  - [ ] Al tap: switcha il gender, le sprite si aggiornano a `front_female` / `back_female`
  - [ ] Nota: per la maggior parte dei Pokémon `front_female === null` → il toggle NON appare

- [ ] **GameSelector** (`src/components/pokemon/GameSelector.tsx`)
  - [ ] Dropdown sotto le sprite
  - [ ] Lista filtrata: SOLO i giochi per cui questo Pokémon ha almeno una sprite (front o back)
  - [ ] Ordinati cronologicamente (usa `GAME_VERSIONS_ORDERED`)
  - [ ] Anche le opzioni speciali: "Official Artwork" (solo moderna), "Showdown (animato)", "Home"
  - [ ] Al cambio: aggiorna `gameVersion` nello stato del `SpriteViewer`
  - [ ] Default:
    - **Retro mode**: gioco più vecchio disponibile
    - **Moderna mode**: 'official-artwork' (o se non disponibile, il gioco più recente)
  - [ ] **Quando si switcha tema** (retro ↔ moderna): aggiornare il default

- [ ] **SpritePopup** (`src/components/pokemon/SpritePopup.tsx`)
  - [ ] Modal overlay fullscreen quando si tappa una sprite
  - [ ] Backdrop semitrasparente scuro
  - [ ] Container interno: 100vw (mobile) con padding 8px, max-w-2xl su desktop
  - [ ] Sfondo del container coerente col tema:
    - Retro: verde Game Boy + scanlines
    - Moderna: gradiente del tipo
  - [ ] Sprite ingrandita centrale (max 80% larghezza container, `image-rendering: pixelated`)
  - [ ] Controlli:
    - ✕ in alto a sinistra (chiudi)
    - ⭐ in alto a destra (shiny toggle, sincronizzato con SpriteViewer principale o indipendente — scelta: **indipendente** nel popup)
    - [◀ FRONT] / [BACK ▶] sotto la sprite per switchare view
    - Dropdown gioco anche nel popup
  - [ ] Chiusura: ✕, tap fuori, swipe down (mobile, opzionale)
  - [ ] Animazione di apertura: fade-in backdrop + scale-up sprite (Framer Motion)
  - [ ] Animazione di chiusura: inverso

- [ ] **Integrazione con SpriteViewer**
  - [ ] Tap su una delle due sprite (front o back) → apre `SpritePopup` con quella view preselezionata
  - [ ] Passare a `SpritePopup` il `pokemon`, `initialView`, `initialShiny`, `initialGameVersion`

- [ ] **Reset di stati al cambio Pokémon**
  - [ ] Quando si naviga a un altro Pokémon (id cambia): resettare `shiny=false`, `gender='male'`, `gameVersion=default`
  - [ ] Usare `useEffect` con dipendenza sull'id del Pokémon

- [ ] **Reset di gameVersion al cambio tema**
  - [ ] Quando `mode` cambia (retro ↔ moderna): aggiornare `gameVersion` al default della nuova modalità
  - [ ] `useEffect` con dipendenza su `mode`

---

## 🎯 Definition of Done — Fase 5

1. ✅ Nel dettaglio si vedono front e back sprite affiancate
2. ✅ Le stelline ⭐ togglano lo shiny con animazione sparkle
3. ✅ Per Pokémon con sprite gender differenziate (es. Pikachu, Hippopotas), appare il toggle ♂/♀
4. ✅ Il selettore gioco permette di vedere come appariva il Pokémon in ogni gioco
5. ✅ In retro: default è il gioco più vecchio (Red/Blue per Bulbasaur)
6. ✅ In moderna: default è Official Artwork
7. ✅ Tap su una sprite → popup fullscreen su mobile (100vw)
8. ✅ Nel popup funzionano shiny, switch front/back, selettore gioco
9. ✅ Chiusura popup con ✕ o tap fuori
10. ✅ Navigando a un altro Pokémon, gli stati si resettano correttamente

---

## ⚠️ Cosa NON fare in questa fase

- ❌ Niente flavor text con selettore gioco (Fase 6) — il selettore gioco di Fase 5 è SOLO per le sprite
- ❌ Niente forme alternative Mega/Gmax (Fase 6)
- ❌ Niente catena evolutiva (Fase 6)
- ❌ Niente audio cry (Fase 7)
- ❌ Niente lingue multiple (Fase 6)

---

## 💡 Suggerimenti tecnici

- **Sprite null gestiti gracefully**: molti Pokémon non hanno sprite per giochi vecchi. Sempre check `!== null` prima di renderizzare. Mostra un placeholder "Sprite non disponibile" o nasconde la sprite.
- **Showdown GIF**: sono GIF animate, alcune sono molto belle. URL: `sprites.other.showdown.front_default`. Funzionano bene in moderna.
- **Performance popup**: il popup carica la stessa URL già in cache (se la sprite è già stata vista). React Query/browser cache si occupa di evitare doppio fetch.
- **Gender Pokémon**: i Pokémon con sprite differenziate sono ~25 (Pikachu, Venusaur, Butterfree, Rattata, Pidgeotto, ecc.). Verifica con Pikachu (#25).
- **Mobile swipe down per chiudere popup**: usa Framer Motion `drag="y"` + `onDragEnd` con threshold.
- **State management del popup**: nel `SpritePopup` lo stato shiny è indipendente dal `SpriteViewer` principale (decisione di design — più flessibile).

---

## 🧪 Test manuali da fare

- Aprire Bulbasaur (#1) → vedere front + back Gen I gray (retro) o artwork HD (moderna)
- Toggle shiny: stelline accese + sprite cambiano colore
- Cambiare gioco a "Crystal" → vedere sprite Gen II
- Cambiare gioco a "Black/White animated" → vedere GIF animate (se in moderna)
- Aprire Pikachu (#25): toggle ♂/♀ visibile (femmina ha la coda a cuore)
- Aprire Mewtwo (#150): toggle gender NON visibile (no sprite differenziate)
- Tap su sprite → popup fullscreen → 100vw su mobile
- Nel popup: toggle shiny funziona, switch front/back funziona
- Chiudere popup → torno al dettaglio con i miei stati precedenti (NON azzerati)
- Switch retro → moderna: il gioco selezionato torna al default della modalità

---

## ➡️ Prossima fase

Quando la Fase 5 è ✅ completata, aggiorna `00_AVANZAMENTO_PROGETTO.md` e passa a `06_FASE_6_CONTENUTI_DETTAGLIO.md`.
