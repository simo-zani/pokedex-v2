# 🎮 Fase 2 — Shell del Pokédex e Power Button

> **Obiettivo della fase**: trasformare l'app "nuda" della Fase 1 in qualcosa che SEMBRI un Pokédex fisico. Aggiungiamo la scocca decorativa, il LED, i pulsanti fisici (anche se solo alcuni funzionano), e soprattutto il pulsante POWER con l'animazione di accensione/spegnimento stile Game Boy.

📄 Spec di riferimento: `POKEDEX_WEBAPP_SPEC.md` — sezioni "Accensione e Spegnimento del Pokédex 🔴🟢" e "UI / Layout".

---

## ✅ Checklist Fase 2

- [ ] **Installare Framer Motion**
  - [ ] `npm install framer-motion`

- [ ] **Stato globale `isPowered`**
  - [ ] Creare `src/hooks/usePowerState.ts` con React Context (o Zustand se preferisci)
  - [ ] Stato: `isPowered: boolean`, `setIsPowered: (v) => void`
  - [ ] Persistere in `localStorage` con chiave `pokedex_power_state`
  - [ ] Default: `true` (Pokédex acceso) — oppure `false` per forzare boot animation al primo accesso

- [ ] **PokedexShell** (`src/components/shell/PokedexShell.tsx`)
  - [ ] Container esterno che simula la scocca del device
  - [ ] Layout mobile-first: max-width ~480px, centrato, padding interno
  - [ ] Border-radius generoso, ombra esterna per effetto 3D
  - [ ] Colore scocca: rosso Pokédex `#DC0A2D` (placeholder per ora, in retro mode diventerà grigio Game Boy)
  - [ ] Slot interno per `<ScreenArea>` e `<ButtonBar>`

- [ ] **Header del device** (dentro PokedexShell)
  - [ ] Area in alto con LED a sinistra, scritta "POKÉDEX" al centro, PowerButton a destra
  - [ ] Layout flexbox: `[LED]  [POKÉDEX]  [POWER]`

- [ ] **LedIndicator** (`src/components/shell/LedIndicator.tsx`)
  - [ ] Cerchietto ~16px
  - [ ] Stato OFF: grigio scuro, nessun glow
  - [ ] Stato ON: blu acceso `#3B82F6` con `box-shadow` blu (glow)
  - [ ] Animazione di pulse leggera quando acceso (`framer-motion` con `animate` su boxShadow opacity)
  - [ ] Accetta prop `isOn: boolean`

- [ ] **PowerButton** (`src/components/shell/PowerButton.tsx`)
  - [ ] Pulsante rotondo con icona ⏻ (Unicode `\u23FB` o SVG)
  - [ ] Sempre cliccabile (anche a Pokédex spento)
  - [ ] Al click: toggle `isPowered`
  - [ ] Feedback visivo: scale down al press (Framer Motion `whileTap`)

- [ ] **ScreenArea** (`src/components/shell/ScreenArea.tsx`)
  - [ ] Container dello "schermo" interno
  - [ ] Border interno scuro, padding, background del tema
  - [ ] Contiene la route corrente (children = `<Outlet />` di React Router)
  - [ ] Quando `isPowered === false`: schermo nero/grigio scurissimo, contenuto nascosto

- [ ] **ScreenOverlay** (`src/components/shell/ScreenOverlay.tsx`)
  - [ ] Overlay assoluto sopra lo schermo per animazione boot/shutdown
  - [ ] Sequenza accensione (vedi spec):
    - Frame 0ms → schermo nero
    - Frame 100ms → LED si accende
    - Frame 200ms → riga orizzontale 2px al centro (60% larghezza)
    - Frame 200-600ms → riga espande verticalmente da 2px a 100%
    - Frame 600ms → schermo illuminato pieno
    - Frame 600-800ms → fade-in contenuto
  - [ ] Sequenza spegnimento (inverso):
    - Frame 0-200ms → fade-out contenuto
    - Frame 200-500ms → schermo collassa verticalmente verso il centro
    - Frame 500-700ms → riga si assottiglia e scompare
    - Frame 700-800ms → LED si spegne
  - [ ] Usare Framer Motion: `<motion.div>` con `animate` su `scaleY`, `opacity`
  - [ ] Easing: `ease-out` per espansione, `ease-in` per collasso

- [ ] **ButtonBar** (`src/components/shell/ButtonBar.tsx`)
  - [ ] Sotto lo schermo, area con pulsanti fisici decorativi
  - [ ] Pulsanti minimi per Fase 2:
    - [ ] **◀ ▶** prev/next (funzionanti: navigano a Pokémon precedente/successivo nel dettaglio)
    - [ ] **HOME** (funzionante: torna a `/`)
    - [ ] **GEN** (placeholder, non funzionante ancora — sarà la pagina generazioni in Fase 7)
    - [ ] **❤️** (placeholder per preferiti, Fase 8)
    - [ ] **⟳ MODE** (placeholder per switch retro/moderno, Fase 4)
  - [ ] Tutti i pulsanti hanno `pointer-events: none` quando `isPowered === false`
  - [ ] Stile: pulsanti tondi/squadrati che sembrino fisici (bordo rilevato, ombra interna al press)

- [ ] **Navigazione prev/next**
  - [ ] In `PokemonPage`: i pulsanti ◀ ▶ navigano a `/pokemon/{id-1}` e `/pokemon/{id+1}`
  - [ ] Disabilitati se id ≤ 1 o id ≥ 1025
  - [ ] Funzionano anche con tastiera (freccia sinistra/destra) — bonus

- [ ] **Layout globale**
  - [ ] Aggiornare `App.tsx`: `<PokedexShell>` wrappa l'intera app, con `<Outlet>` dentro `<ScreenArea>`
  - [ ] Su desktop: scocca centrata, max-width ~480px
  - [ ] Su mobile: scocca occupa tutto lo schermo

---

## 🎯 Definition of Done — Fase 2

1. ✅ L'app è racchiusa in una "scocca" visibile che sembra un device
2. ✅ Il LED in alto a sinistra fa glow quando acceso
3. ✅ Il pulsante POWER in alto a destra accende/spegne il Pokédex
4. ✅ L'animazione di accensione segue la sequenza dello schema Game Boy (riga centrale che si espande)
5. ✅ L'animazione di spegnimento fa il contrario (collasso verso il centro)
6. ✅ Quando spento, lo schermo è nero e i pulsanti (tranne POWER) non rispondono
7. ✅ Lo stato on/off persiste tra refresh (`localStorage`)
8. ✅ I pulsanti ◀ ▶ funzionano nel dettaglio
9. ✅ Il pulsante HOME riporta alla lista

---

## ⚠️ Cosa NON fare in questa fase

- ❌ Niente colori del tema retro/moderno ancora — la scocca è rossa "generica", lo schermo bianco/grigio chiaro
- ❌ Niente font speciali (Press Start 2P, VT323) — usa il font di default di Tailwind
- ❌ Niente scanlines, glitch, effetti CRT
- ❌ Il pulsante MODE è solo decorativo (non fa niente al click)

---

## 💡 Suggerimenti tecnici

- **Animazione boot con Framer Motion**:
  ```tsx
  <motion.div
    initial={{ scaleY: 0, opacity: 1 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
    style={{ transformOrigin: "center" }}
  />
  ```
- **Pointer events disabilitati**: usare classe condizionale `${!isPowered ? 'pointer-events-none opacity-0' : ''}` sul contenuto interno.
- **Persistenza power state**: leggi da localStorage all'init dell'hook (`useState(() => JSON.parse(localStorage.getItem(...)) ?? true)`), e scrivi in un `useEffect` quando cambia.
- **Tastiera prev/next**: usare un `useEffect` con `window.addEventListener('keydown', ...)` solo nella `PokemonPage`.
- **Boot all'avvio**: se vuoi forzare l'animazione di accensione ogni volta che l'app parte (anche se `isPowered` era `true`), usa un flag separato `hasBootedThisSession` in `sessionStorage`.

---

## 🧪 Test manuali da fare

- Accendere/spegnere più volte rapidamente → l'animazione si comporta bene?
- Refresh con Pokédex spento → riapre spento?
- Cliccare ◀ all'id 1 → non deve crashare
- Cliccare ▶ all'id 1025 → non deve crashare
- Su mobile (DevTools responsive): la scocca è proporzionata?

---

## ➡️ Prossima fase

Quando la Fase 2 è ✅ completata, aggiorna `00_AVANZAMENTO_PROGETTO.md` e passa a `03_FASE_3_MODALITA_RETRO.md`.
