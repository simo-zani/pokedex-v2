# 🔊 Fase 7 — Audio e Polish (Versi, Beep UI, Loading, Generazioni, PWA, Prefetch)

> **Obiettivo della fase**: aggiungere l'audio (versi Pokémon e beep UI), la pagina Generazioni, il loading screen stile boot Game Boy, il manifest PWA, e il prefetch dei Pokémon adiacenti. Questa fase trasforma l'app "completa nei contenuti" in un'esperienza rifinita e immersiva.

📄 Spec di riferimento: `POKEDEX_WEBAPP_SPEC.md` — sezioni "Audio — Versi dei Pokémon", "Pagina Generazioni", "Note Tecniche".

---

## ✅ Checklist Fase 7

### 🔊 Audio - Versi Pokémon

- [ ] **Utility audio** (`src/lib/audio.ts`)
  - [ ] Funzione `playCry(pokemonId, isRetro)`:
    - URL retro: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/{id}.ogg`
    - URL moderno: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/{id}.ogg`
  - [ ] Usa `Audio` API HTML5: `const audio = new Audio(url); audio.volume = 0.3; audio.play();`
  - [ ] Catch error se il file non esiste (alcuni Pokémon recenti potrebbero non avere legacy cry → fallback su latest)
  - [ ] Volume iniziale basso (0.3) — alcuni cry sono fastidiosi se a volume pieno

- [ ] **Hook `useCry`** (`src/hooks/useCry.ts`)
  - [ ] Riceve `pokemonId` e `mode`
  - [ ] Espone `playCry()` che chiama l'utility con i parametri giusti
  - [ ] Preload del file `.ogg` al mount (`audio.preload = 'auto'`)
  - [ ] Cleanup: pause + null l'audio al unmount

- [ ] **CryButton component** (`src/components/pokemon/CryButton.tsx`)
  - [ ] Pulsante 🔊 nell'header del Pokémon (accanto a nome/bandierina)
  - [ ] Al tap: chiama `playCry()`
  - [ ] Feedback visivo durante il play: icona pulsa o cambia (es. ⏸️ → ▶️ al riavvio)
  - [ ] Disabilitato durante la riproduzione (anti-spam)

### 🔉 Beep UI

- [ ] **Beep generati via Web Audio API**
  - [ ] In `src/lib/audio.ts`, funzione `playBeep(frequency = 800, duration = 50)`:
    ```typescript
    function playBeep(frequency = 800, duration = 50) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square'; // suono 8-bit
      osc.frequency.value = frequency;
      gain.gain.value = 0.1;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration / 1000);
    }
    ```
  - [ ] Frequenze diverse per azioni diverse:
    - Tap pulsante: 800Hz, 30ms
    - Apertura dettaglio: 1200Hz, 50ms
    - Errore: 200Hz, 100ms
    - Boot Game Boy: sequenza di note
  - [ ] **Solo in retro mode** i beep sono audibili (in moderna sono silenziati o sono click discreti)
  - [ ] Opzione per disabilitare tutti i suoni (toggle nelle impostazioni — semplificato: in localStorage `pokedex_sounds_enabled`)

- [ ] **Integrazione beep**
  - [ ] Hook `useSound()` che restituisce le funzioni `beep`, `playCry`
  - [ ] Aggiungere beep ai pulsanti fisici (◀ ▶ HOME GEN MODE POWER) — solo in retro
  - [ ] Beep di accensione (sequenza 3 note ascendenti) al power on
  - [ ] Beep di spegnimento (1 nota discendente) al power off

### 🏠 Pagina Generazioni

- [ ] **Costanti generazioni** (`src/lib/constants.ts`)
  ```typescript
  export const GENERATIONS = [
    { num: 1, name: "Generazione I", range: [1, 151], region: "Kanto", count: 151 },
    { num: 2, name: "Generazione II", range: [152, 251], region: "Johto", count: 100 },
    { num: 3, name: "Generazione III", range: [252, 386], region: "Hoenn", count: 135 },
    { num: 4, name: "Generazione IV", range: [387, 493], region: "Sinnoh", count: 107 },
    { num: 5, name: "Generazione V", range: [494, 649], region: "Unima", count: 156 },
    { num: 6, name: "Generazione VI", range: [650, 721], region: "Kalos", count: 72 },
    { num: 7, name: "Generazione VII", range: [722, 809], region: "Alola", count: 88 },
    { num: 8, name: "Generazione VIII", range: [810, 905], region: "Galar", count: 96 },
    { num: 9, name: "Generazione IX", range: [906, 1025], region: "Paldea", count: 120 },
  ];
  ```

- [ ] **GenerationsPage** (`src/pages/GenerationsPage.tsx`)
  - [ ] Route `/generations`
  - [ ] Lista delle 9 generazioni
  - [ ] Per ogni gen: numero, nome, regione, range (es. "#001 - #151"), numero Pokémon
  - [ ] Sprite del Pokémon "starter" o "iconico" della gen come decorazione (Charizard per Gen I, Lugia per Gen II, ecc. — opzionale)
  - [ ] Click → naviga a `/?gen={N}` (Home con query param)

- [ ] **HomePage con scroll ancorato**
  - [ ] Leggere `?gen=N` da `useSearchParams`
  - [ ] Se presente: dopo che la lista è renderizzata, scrollare al primo Pokémon di quella gen
  - [ ] Usare il metodo `scrollToIndex` di `react-virtuoso`

- [ ] **Pulsante GEN funzionante**
  - [ ] Il pulsante "GEN" nella ButtonBar (placeholder dalla Fase 2) ora naviga a `/generations`

### ⏳ Loading Screen Boot Game Boy

- [ ] **LoadingScreen component** (`src/components/common/LoadingScreen.tsx`)
  - [ ] Schermata a tutto schermo (dentro lo ScreenArea)
  - [ ] In retro mode:
    - Sfondo verde Game Boy
    - Logo "POKÉDEX" pixel-art che lampeggia
    - Sotto: "LOADING..." con cursor lampeggiante
    - Sequenza di "punti" che si caricano (`.`, `..`, `...`)
  - [ ] In moderna mode:
    - Sfondo bianco/grigio chiaro
    - Spinner moderno (cerchio rotante stile Material)
    - Testo "Caricamento..."
  - [ ] Durata minima: 500ms (anche se i dati arrivano prima, mostra il loader per evitare flash)
  - [ ] Usato in:
    - Splash iniziale al primo caricamento dell'app
    - Quando si apre un dettaglio non ancora in cache
    - Durante l'animazione di boot

### 🔮 Prefetch

- [ ] **Prefetch prev/next** nella `PokemonPage`
  - [ ] Quando si entra nel dettaglio di un Pokémon: prefetch `id-1` e `id+1`
  - [ ] Usa `queryClient.prefetchQuery({ queryKey: ['pokemon', id-1], queryFn: ... })`
  - [ ] Solo se id > 1 e id < 1025
  - [ ] Prefetch anche species `id-1` e `id+1`
  - [ ] Non bloccante (fire-and-forget)

- [ ] **Prefetch al hover** (desktop)
  - [ ] Quando il mouse sta su una card della lista: prefetch quel Pokémon
  - [ ] Su mobile: prefetch i Pokémon visibili nello scroll (più aggressivo, opzionale)

### 📱 PWA Manifest

- [ ] **manifest.json** (`public/manifest.json`)
  ```json
  {
    "name": "Pokédex",
    "short_name": "Pokédex",
    "description": "Pokédex retro & moderno",
    "start_url": "/",
    "display": "standalone",
    "orientation": "portrait",
    "background_color": "#9BBC0F",
    "theme_color": "#DC0A2D",
    "icons": [
      { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
      { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
    ]
  }
  ```
  - [ ] Riferimento nel `index.html`: `<link rel="manifest" href="/manifest.json">`
  - [ ] Meta tag per iOS: `<meta name="apple-mobile-web-app-capable" content="yes">`
  - [ ] Meta theme-color: `<meta name="theme-color" content="#DC0A2D">`

- [ ] **Icone**
  - [ ] Creare manualmente `icon-192.png` e `icon-512.png` (rosso Pokédex con LED, oppure logo Game Boy verde)
  - [ ] Salvare in `public/`

- [ ] **Service Worker** (opzionale, per offline)
  - [ ] Usare `vite-plugin-pwa` se si vuole offline caching
  - [ ] Decisione: SKIP per ora, manifest base è sufficiente

---

## 🎯 Definition of Done — Fase 7

1. ✅ Il pulsante 🔊 nel dettaglio riproduce il verso del Pokémon
2. ✅ In retro: verso legacy (8-bit). In moderna: verso latest (HQ)
3. ✅ I pulsanti fisici fanno beep al tap (solo in retro)
4. ✅ Boot del Pokédex ha sequenza di beep
5. ✅ La pagina `/generations` è accessibile dal pulsante GEN
6. ✅ Cliccando una generazione, la Home si apre scrollata al primo Pokémon di quella gen
7. ✅ Il loading screen è visibile durante caricamenti
8. ✅ Navigando a un altro Pokémon, prev/next sono istantanei (prefetch attivo)
9. ✅ Su iPhone "Aggiungi alla schermata Home" → l'app si apre fullscreen con icona

---

## ⚠️ Cosa NON fare in questa fase

- ❌ Niente preferiti, confronto, easter egg, parlante (Fase 8)
- ❌ Niente service worker per offline (overkill per ora)

---

## 💡 Suggerimenti tecnici

- **Audio context su iOS**: Safari iOS richiede un'interazione utente prima di poter riprodurre audio (autoplay block). Il primo `playCry()` deve partire da un click reale. Il preload può essere fatto senza problemi.
- **`.ogg` su Safari**: dovrebbe funzionare da Safari 15+. Se hai problemi, fallback su `.mp3` se disponibile (PokéAPI cries è solo `.ogg`).
- **Beep troppo fastidiosi**: tieni il volume basso (`gain.gain.value = 0.05` se necessario). E permetti di disabilitarli (toggle in localStorage).
- **Boot beep sequence**: 3 note ascendenti tipo `[523, 659, 784]` Hz (Do, Mi, Sol) a 100ms ciascuna.
- **Generations icons**: la sprite "iconica" può essere il legendary box-art (Mewtwo, Lugia, Rayquaza, Dialga, Reshiram, Xerneas, Solgaleo, Zacian, Koraidon). Usa la sprite ufficiale del primo legendary di ogni gen.
- **scrollToIndex in Virtuoso**: usa `useRef<VirtuosoHandle>` e `ref.current?.scrollToIndex({ index: targetIndex, behavior: 'smooth' })`.
- **Prefetch e Vercel bandwidth**: non preoccuparti, PokéAPI è veloce e la cache TanStack Query è permanente.

---

## 🧪 Test manuali da fare

- Aprire Pikachu (#25) → click 🔊 → si sente il "pika!"
- Switch in moderna → click 🔊 → si sente il verso HQ
- Switch in retro → click 🔊 → si sente il verso 8-bit
- Tap su ▶ → beep
- Spegnere il Pokédex → beep di shutdown
- Riaccendere → boot beep sequence
- Pulsante GEN → pagina generazioni
- Click su "Gen V" → Home scrolla a Pokémon #494 (Victini)
- Aprire #500 → prev/next istantanei (sentire prefetch attivo)
- Aggiungere a schermata Home su iPhone → app fullscreen con icona

---

## ➡️ Prossima fase

Quando la Fase 7 è ✅ completata, aggiorna `00_AVANZAMENTO_PROGETTO.md`. La Fase 8 è **opzionale** (extra), puoi scegliere se farla o saltare direttamente alla Fase 9 (deploy finale e QA).

Prossimo file: `08_FASE_8_EXTRA.md` (opzionali) oppure `09_FASE_9_DEPLOY_E_QA.md`.
