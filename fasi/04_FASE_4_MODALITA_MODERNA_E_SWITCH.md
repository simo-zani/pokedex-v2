# 🎨 Fase 4 — Modalità Moderna + Switch tra Modalità

> **Obiettivo della fase**: implementare la seconda modalità visiva (Moderna) con artwork HD, colori per tipo, font VT323 e animazioni Framer Motion. E rendere funzionante il pulsante MODE per switchare tra retro e moderna con effetto CRT glitch.

📄 Spec di riferimento: `POKEDEX_WEBAPP_SPEC.md` — sezioni "Modalità MODERNA" e "Switch tra modalità".

---

## ✅ Checklist Fase 4

- [ ] **CSS variables per modalità moderna**
  - [ ] Estendere `gameboy.css` (o creare `modern.css`) con:
    ```css
    :root[data-theme="modern"] {
      --pokedex-red: #DC0A2D;
      --bg: #F5F5F5;
      --text: #1A1A1A;
      --screen-bg: #FFFFFF;
      --screen-border: #DC0A2D;
    }
    ```

- [ ] **Costanti colori tipo** (`src/lib/constants.ts`)
  ```typescript
  export const TYPE_COLORS = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0',
    electric: '#F7D02C', grass: '#7AC74C', ice: '#96D9D6',
    fighting: '#C22E28', poison: '#A33EA1', ground: '#E2BF65',
    flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC',
    dark: '#705746', steel: '#B7B7CE', fairy: '#D685AD',
  };
  ```

- [ ] **Font "VT323"**
  - [ ] Aggiungere `<link>` Google Fonts in `index.html`
  - [ ] In `tailwind.config.ts`: `fontFamily: { modern: ['"VT323"', 'monospace'] }`
  - [ ] In modalità moderna: tutto in VT323, dimensione base 16-18px (font è molto leggibile)

- [ ] **Hook `useThemeMode`** (`src/hooks/useThemeMode.ts`)
  - [ ] Stato: `mode: 'retro' | 'modern'`
  - [ ] Funzione: `toggleMode()`
  - [ ] Persistere in `localStorage` con chiave `pokedex_theme_mode`
  - [ ] Al cambio: aggiornare `document.documentElement.dataset.theme = mode`
  - [ ] Default: `'retro'` (o `'modern'` — decidere)

- [ ] **ModeSwitch component** (`src/components/shell/ModeSwitch.tsx`)
  - [ ] Pulsante "⟳ MODE" nella ButtonBar
  - [ ] Al click: chiama `toggleMode()` E innesca animazione CRT glitch
  - [ ] Mostrare l'indicatore della modalità attuale (icona o testo "RETRO" / "MODERN")

- [ ] **TypeBadge component** (`src/components/pokemon/TypeBadge.tsx`)
  - [ ] In modalità moderna: badge colorato col colore del tipo (da `TYPE_COLORS`)
  - [ ] In modalità retro: bordo squadrato monocromatico (già fatto in Fase 3)
  - [ ] Testo del tipo localizzato? Per ora in inglese (le traduzioni dei tipi non sono in PokéAPI direttamente, servirebbe `/type/{id}` con `names[]`)
  - [ ] Decisione semplificata Fase 4: solo inglese, italiano in Fase 6 se serve

- [ ] **Aggiornare PokemonPage in modalità moderna**
  - [ ] Sprite: usare `sprites.other['official-artwork'].front_default` (artwork HD)
  - [ ] Fallback: showdown GIF animata `sprites.other.showdown.front_default`
  - [ ] Fallback ulteriore: `sprites.other.home.front_default`
  - [ ] Niente `image-rendering: pixelated` su artwork HD (rendering normale)
  - [ ] Sfondo della pagina: gradiente leggero basato sul tipo primario del Pokémon
    ```css
    background: linear-gradient(135deg, {typeColor}33 0%, transparent 100%);
    ```

- [ ] **Aggiornare HomePage in modalità moderna**
  - [ ] Card del Pokémon: bordo arrotondato (border-radius: 12px), ombra leggera
  - [ ] Sprite della card: artwork HD piccolo (96px) oppure il sprite default ufficiale
  - [ ] Hover: scale 1.05 + ombra più pronunciata (Framer Motion `whileHover`)

- [ ] **Stats panel in modalità moderna**
  - [ ] Barre con gradient: rosso (basso, <50) → giallo (50-100) → verde (>100)
    ```css
    background: linear-gradient(90deg, #ef4444, #facc15, #22c55e);
    ```
  - [ ] Animazione riempimento da 0 al valore (Framer Motion `initial: { width: 0 }, animate: { width: '...%' }`)
  - [ ] Etichetta stat + valore numerico

- [ ] **Animazioni Framer Motion**
  - [ ] Page transition: fade-in + slide-up quando si naviga (`<motion.div variants={...} initial="hidden" animate="visible" />`)
  - [ ] Card hover: scale, shadow
  - [ ] Sprite reveal: scale da 0.8 a 1 con bounce all'apertura del dettaglio

- [ ] **CRT glitch transition** (`src/styles/crt-transition.css` + `src/components/common/CrtGlitch.tsx`)
  - [ ] Durata: ~300ms
  - [ ] Effetto: overlay nero che pulsa, distorsione orizzontale, scanlines che scorrono velocemente
  - [ ] Implementazione semplice:
    ```css
    @keyframes crtGlitch {
      0% { transform: scaleY(1); filter: brightness(1); }
      20% { transform: scaleY(0.05); filter: brightness(3); }
      40% { transform: scaleY(1); filter: brightness(0.5) hue-rotate(180deg); }
      60% { transform: scaleY(1.02) skewX(2deg); filter: brightness(1.5); }
      100% { transform: scaleY(1); filter: brightness(1); }
    }
    .crt-transition { animation: crtGlitch 0.3s ease-out; }
    ```
  - [ ] Applicare la classe al `<ScreenArea>` durante il transition
  - [ ] Aggiungere short audio "static" (opzionale, Fase 7)

- [ ] **LED in modalità moderna**
  - [ ] Diventa blu `#3B82F6` (come Fase 2)
  - [ ] Glow blu

- [ ] **Scocca in modalità moderna**
  - [ ] Torna rossa `#DC0A2D` (come Fase 2)
  - [ ] In retro mode rimane grigia (come Fase 3)
  - [ ] Tutto gestito da CSS variables

---

## 🎯 Definition of Done — Fase 4

1. ✅ Il pulsante MODE switcha tra retro e moderna
2. ✅ Il switch ha un effetto CRT glitch visibile (~300ms)
3. ✅ In modalità moderna: scocca rossa, LED blu, font VT323, sprite HD
4. ✅ I tipi dei Pokémon mostrano badge colorati in moderna
5. ✅ Le stats hanno gradient di colore in moderna
6. ✅ Lo sfondo del dettaglio è tintato del colore del tipo primario
7. ✅ Le animazioni Framer Motion (hover, page transition, sprite reveal) funzionano
8. ✅ Lo stato della modalità persiste tra refresh
9. ✅ Tornando in retro: tutto come Fase 3 (verde, pixel, scanlines)

---

## ⚠️ Cosa NON fare in questa fase

- ❌ Niente shiny toggle, gender, selettore gioco (Fase 5)
- ❌ Niente sprite back affiancata alla front (Fase 5)
- ❌ Niente popup fullscreen sprite (Fase 5)
- ❌ Niente flavor text, evoluzioni, forme alternative (Fase 6)
- ❌ Niente audio (Fase 7)

---

## 💡 Suggerimenti tecnici

- **Switch fluido**: il dato `data-theme` sul root permette di evitare flicker. Tutti i colori sono CSS variables, cambiano istantaneamente.
- **Sfondo tintato per tipo**: il colore del tipo è quello del PRIMO tipo del Pokémon (`pokemon.types[0].type.name`). Per Pokémon a doppio tipo si può fare un gradient da tipo1 a tipo2.
- **VT323 size**: il font è molto stretto, leggibile a 18px. Se sembra troppo piccolo aumenta a 20px.
- **Artwork HD pesa**: ogni artwork è ~50-100KB. Lazy load è fondamentale. Usa `loading="lazy"` o un IntersectionObserver.
- **CRT glitch su Safari iOS**: alcuni `filter` (hue-rotate, brightness) possono essere costosi. Testa su iPhone reale.
- **Animazioni Framer Motion in retro**: in retro mode le animazioni dovrebbero essere "a scatto", in moderna fluide. Usa una variabile `easing` che cambia con `mode`.

---

## 🧪 Test manuali da fare

- Switch retro → moderna: glitch CRT, poi tutto cambia
- Switch moderna → retro: glitch CRT, torna pixel
- Refresh in moderna: rimane in moderna
- Aprire un Pokémon di tipo fuoco: sfondo arancione, badge tipo Fire arancione
- Aprire un Pokémon doppio tipo (es. Charizard Fire/Flying): badge multipli colorati
- Stats di un Pokémon weak (es. Magikarp): barre quasi tutte rosse
- Stats di un Pokémon strong (es. Mewtwo): barre quasi tutte verdi
- Hover su una card nella lista (desktop): si ingrandisce

---

## ➡️ Prossima fase

Quando la Fase 4 è ✅ completata, aggiorna `00_AVANZAMENTO_PROGETTO.md` e passa a `05_FASE_5_SPRITE_SYSTEM.md`.
