# 🟢 Fase 3 — Modalità Retro (Game Boy)

> **Obiettivo della fase**: implementare la prima delle due modalità visive, quella retro Game Boy. Dovrà essere l'UNICA modalità attiva al termine di questa fase (il switch a moderna arriverà nella Fase 4). Palette verde monocromatica, font pixel, sprite Gen I gray + filtro per i Pokémon >151, scanlines, glow, animazioni a scatto.

📄 Spec di riferimento: `POKEDEX_WEBAPP_SPEC.md` — sezioni "Le Due Modalità Visive — Modalità RETRO" e "Sprite — Struttura Completa dalla PokéAPI".

---

## ✅ Checklist Fase 3

- [ ] **Setup CSS variables per il tema**
  - [ ] Creare `src/styles/gameboy.css` con le 4 tonalità Game Boy:
    ```css
    :root[data-theme="retro"] {
      --gb-lightest: #9BBC0F;
      --gb-light:    #8BAC0F;
      --gb-dark:     #306230;
      --gb-darkest:  #0F380F;
      --gb-bg: var(--gb-lightest);
      --gb-text: var(--gb-darkest);
    }
    ```
  - [ ] Applicare `data-theme="retro"` su `<html>` o `<body>` (per ora hardcoded, lo switch arriva in Fase 4)
  - [ ] Aggiornare `tailwind.config.ts` per esporre le CSS variables come colori Tailwind (`gb-lightest`, `gb-dark`, ecc.)

- [ ] **Font "Press Start 2P"**
  - [ ] Aggiungere in `index.html` il `<link>` a Google Fonts: `Press Start 2P`
  - [ ] In `tailwind.config.ts`, aggiungere `fontFamily: { retro: ['"Press Start 2P"', 'monospace'] }`
  - [ ] Applicare globalmente quando `data-theme="retro"`: tutto in font retro
  - [ ] Dimensione base: 10px (font è chunky, va piccolo)
  - [ ] Line-height generoso (1.6+) perché il font è quadrato

- [ ] **Palette applicata ovunque**
  - [ ] Scocca esterna: grigio Game Boy `#8B8B8B` (sovrascrive il rosso di Fase 2)
  - [ ] Schermo: background `var(--gb-lightest)`, testo `var(--gb-darkest)`
  - [ ] Bordi: `var(--gb-dark)` o `var(--gb-darkest)`
  - [ ] Pulsanti fisici: colori coerenti (es. grigio scuro con testo verde)
  - [ ] LED: in retro mode il LED diventa rosso `#DC0A2D` con glow rosso

- [ ] **SpriteImage component** (`src/components/common/SpriteImage.tsx`)
  - [ ] Riceve `src`, `alt`, `pokemonId`
  - [ ] Logica:
    - Se `pokemonId <= 151` E disponibile → usa lo sprite **Gen I gray**: `sprites.versions['generation-i']['red-blue'].front_gray`
    - Se `pokemonId > 151` → usa sprite standard ma applica filtro CSS:
      ```css
      .gb-sprite-filter {
        image-rendering: pixelated;
        filter: grayscale(1) sepia(1) brightness(0.8) hue-rotate(50deg) saturate(3);
      }
      ```
  - [ ] Sempre `image-rendering: pixelated` per look pixel-art
  - [ ] Lazy loading con `loading="lazy"`
  - [ ] Fallback se sprite non disponibile (placeholder con `?`)

- [ ] **Aggiornare la HomePage in retro**
  - [ ] Sfondo verde Game Boy
  - [ ] Barra ricerca: stile pixel (bordo squadrato, niente border-radius, font retro)
  - [ ] Card del Pokémon nella lista: bordo verde scuro 2px, sfondo verde chiaro, numero e nome in font retro
  - [ ] Sprite della lista: usare `SpriteImage` con filtro retro applicato

- [ ] **Aggiornare la PokemonPage in retro**
  - [ ] Sfondo verde
  - [ ] Sprite con `SpriteImage` (filtro retro)
  - [ ] Stats: barre pixel-art (rettangoli verde scuro su sfondo verde chiaro, no gradient)
  - [ ] Tipi: badge squadrati con bordo, in font retro

- [ ] **Effetti visivi retro**
  - [ ] **Scanlines** sullo schermo:
    ```css
    .gb-screen::before {
      content: "";
      position: absolute; inset: 0;
      background: repeating-linear-gradient(
        0deg,
        rgba(0,0,0,0.1) 0px,
        rgba(0,0,0,0.1) 1px,
        transparent 1px,
        transparent 3px
      );
      pointer-events: none;
      z-index: 10;
    }
    ```
  - [ ] **Pixel grid** (opzionale, sottile): repeating-linear-gradient più fine
  - [ ] **Glow verde** sullo schermo: `box-shadow: inset 0 0 40px var(--gb-dark)` ai bordi interni
  - [ ] LED rosso: `box-shadow: 0 0 8px #DC0A2D, 0 0 16px #DC0A2D` quando acceso

- [ ] **Animazioni a scatto**
  - [ ] Le transizioni in retro devono essere "a scatto" (no easing smooth)
  - [ ] Usare `transition: all 0.1s steps(3, end)` per i hover/tap dei pulsanti
  - [ ] Per Framer Motion, usare `ease: "steps(5)"` o custom `ease: [0,0,1,1]`
  - [ ] Cursor blinking nei testi descrittivi (opzionale): `▌` lampeggiante stile DOS

- [ ] **Boot animation in retro**
  - [ ] La riga al centro è verde `#9BBC0F`
  - [ ] Lo sfondo finale è `var(--gb-lightest)`
  - [ ] Suono di boot retro (opzionale, viene in Fase 7)

- [ ] **Loading screen retro**
  - [ ] Quando si carica un Pokémon: schermata verde con scritta lampeggiante "LOADING..." in Press Start 2P
  - [ ] Componente: `src/components/common/LoadingScreen.tsx`

---

## 🎯 Definition of Done — Fase 3

1. ✅ Tutta l'app è verde Game Boy
2. ✅ Tutto il testo è in font "Press Start 2P"
3. ✅ Le sprite dei primi 151 Pokémon usano la versione Gen I gray
4. ✅ Le sprite dei Pokémon >151 hanno il filtro CSS verde
5. ✅ Tutte le sprite sono pixelate (no anti-aliasing)
6. ✅ Si vedono scanlines sullo schermo
7. ✅ Il LED in retro mode è rosso (non blu)
8. ✅ La scocca è grigia, non rossa
9. ✅ I pulsanti hanno stile pixel/squadrato
10. ✅ L'animazione di boot usa la palette verde

---

## ⚠️ Cosa NON fare in questa fase

- ❌ Niente switch retro/moderno ancora (la modalità retro è hardcoded)
- ❌ Niente sprite back, shiny, gender, selettore gioco (arriva in Fase 5)
- ❌ Niente flavor text, evoluzioni, forme (arriva in Fase 6)
- ❌ Niente audio (arriva in Fase 7)
- ❌ Niente colori per tipo Pokémon (sono moderna-only)

---

## 💡 Suggerimenti tecnici

- **Filtro CSS verde**: testa il filtro su vari Pokémon (Mewtwo, Charizard, Gyarados, Mew). Se sembra troppo saturato, abbassa `saturate(3)` a `saturate(2)` o tweak `hue-rotate`.
- **Press Start 2P è grande**: a 10px è leggibile ma occupa spazio. Per i nomi lunghi (es. "Crabominable") considera font-size 8px o testo a capo.
- **Scanlines su mobile**: su display ad alta densità le scanlines a 3px possono sembrare strane. Usa `@media (min-resolution: 2dppx)` per raddoppiarle.
- **Sprite Gen I gray non sempre presenti**: alcuni Pokémon di Gen I potrebbero non avere `front_gray` (raro ma possibile). Implementa fallback su `front_default` con filtro.
- **Performance del filtro CSS**: applicare `filter` a molte immagini contemporaneamente può essere pesante. Considera di applicarlo solo alle immagini visibili (la virtualizzazione di Virtuoso aiuta).
- **Data-attribute switching**: avere `data-theme="retro"` sul root permetterà in Fase 4 di switchare a `data-theme="modern"` cambiando solo le CSS variables, senza toccare i componenti.

---

## 🧪 Test manuali da fare

- Aprire Pokémon #1 (Bulbasaur) → sprite verde Gen I
- Aprire Pokémon #150 (Mewtwo) → sprite verde Gen I
- Aprire Pokémon #151 (Mew) → sprite verde Gen I
- Aprire Pokémon #152 (Chikorita) → sprite standard con filtro verde applicato
- Aprire Pokémon #1000+ (Gen IX) → filtro applicato, deve sembrare comunque "Game Boy"
- Scorrere la lista velocemente → niente lag dovuto al filtro
- Boot animation: la riga al centro è verde

---

## ➡️ Prossima fase

Quando la Fase 3 è ✅ completata, aggiorna `00_AVANZAMENTO_PROGETTO.md` e passa a `04_FASE_4_MODALITA_MODERNA_E_SWITCH.md`.
