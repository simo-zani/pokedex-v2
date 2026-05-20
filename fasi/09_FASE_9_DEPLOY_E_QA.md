# 🚀 Fase 9 — Deploy Finale e QA

> **Obiettivo della fase**: rifinire l'app, fare un giro completo di QA su mobile e desktop, ottimizzare le performance, configurare un dominio custom se vuoi, e archiviare il progetto in modo che resti facile da manutenere.

📄 Spec di riferimento: `POKEDEX_WEBAPP_SPEC.md` — sezione "Note Tecniche", "Accessibilità", "Performance".

---

## ✅ Checklist Fase 9

### 🧪 QA Mobile

- [ ] **iPhone (Safari iOS)**
  - [ ] Aprire l'app su iPhone reale (non solo DevTools)
  - [ ] La scocca occupa tutto lo schermo senza overflow
  - [ ] Notch / Dynamic Island non coprono il LED o pulsanti
  - [ ] Tutte le interazioni touch funzionano (no hover-only)
  - [ ] Tap target ≥ 44x44px
  - [ ] Animazioni fluide (no jank)
  - [ ] Audio funziona dopo prima interazione
  - [ ] Popup sprite fullscreen è 100vw senza overflow orizzontale
  - [ ] "Aggiungi a Home" → app fullscreen con icona
  - [ ] Performance: navigazione tra Pokémon < 500ms

- [ ] **Android (Chrome)**
  - [ ] Stessi check di iPhone
  - [ ] Web Audio API funziona
  - [ ] PWA install prompt visibile

- [ ] **Tablet (iPad)**
  - [ ] Layout si adatta (la scocca centrata, no stretch)
  - [ ] Tutto è ancora leggibile

### 🖥️ QA Desktop

- [ ] **Chrome/Edge/Firefox/Safari (macOS)**
  - [ ] Scocca centrata, max-width rispettato
  - [ ] Hover sui pulsanti e card funziona
  - [ ] Tastiera: arrow keys per prev/next nel dettaglio
  - [ ] Resize della finestra: niente layout broken

### ♿ Accessibilità

- [ ] **`aria-label` su tutti i pulsanti icona**
  - [ ] ⏻ PowerButton: `aria-label="Accendi/Spegni Pokédex"`
  - [ ] 🔊 CryButton: `aria-label="Riproduci verso del Pokémon"`
  - [ ] ⭐ ShinyToggle: `aria-label="Mostra versione shiny"`
  - [ ] ❤️ Favorite: `aria-label="Aggiungi ai preferiti"`
  - [ ] ◀ ▶ prev/next: `aria-label="Pokémon precedente/successivo"`
  - [ ] 🏳️ LanguageSelector: `aria-label="Cambia lingua"`

- [ ] **Contrasto colori**
  - [ ] In retro: verde chiaro su verde scuro deve essere leggibile (testare con Chrome DevTools Contrast)
  - [ ] In moderna: tutti i testi su sfondi tintati hanno contrasto AA (≥4.5:1)

- [ ] **Focus visibile**
  - [ ] Pulsanti hanno outline al focus da tastiera
  - [ ] `:focus-visible` per nasconderlo al click ma mostrarlo al tab

- [ ] **Riduzione movimento**
  - [ ] Rispettare `@media (prefers-reduced-motion: reduce)`:
    - Disabilitare animazioni Framer Motion
    - Boot/shutdown immediati
    - Sparkle shiny istantaneo

### ⚡ Performance

- [ ] **Lighthouse audit**
  - [ ] Performance ≥ 90
  - [ ] Accessibility ≥ 90
  - [ ] Best Practices ≥ 90
  - [ ] SEO ≥ 80

- [ ] **Bundle size**
  - [ ] `npm run build` → guardare la dimensione del bundle
  - [ ] Se > 300KB JS: investigare con `vite-plugin-visualizer`
  - [ ] Lazy load delle pagine con `React.lazy` (HomePage, GenerationsPage, etc.)
  - [ ] Code splitting per route

- [ ] **Lazy load immagini**
  - [ ] Tutte le `<img>` hanno `loading="lazy"` (tranne quelle above-the-fold)
  - [ ] Sprite della lista usano lazy loading nativo

- [ ] **Cache TanStack Query**
  - [ ] Verificare in DevTools che le query non rifetchino al focus
  - [ ] `staleTime: Infinity` ovunque

- [ ] **Service Worker (opzionale)**
  - [ ] Se vuoi offline support: `vite-plugin-pwa` con strategia `NetworkFirst` per API e `CacheFirst` per asset
  - [ ] Decisione: skip se non è prioritario

### 🐛 Bug fix finali

- [ ] **Cross-check su Pokémon edge case**
  - [ ] #0 — non esiste, deve mostrare errore graceful
  - [ ] #1025 — ultimo Pokémon, pulsante ▶ disabilitato
  - [ ] #1 — primo Pokémon, pulsante ◀ disabilitato
  - [ ] Pokémon senza evoluzioni (es. Tauros, Lapras) — "Non si evolve"
  - [ ] Pokémon con catena complessa (Wurmple → Silcoon/Cascoon → Beautifly/Dustox) — visualizzata correttamente
  - [ ] Pokémon con molte forme (es. Unown, Vivillon) — tab non rompono il layout
  - [ ] Pokémon Paldea-only (es. Koraidon #1007) — funziona, sprite disponibili

- [ ] **Error states**
  - [ ] PokéAPI down → messaggio "Impossibile caricare i dati. Riprova."
  - [ ] Sprite mancante → placeholder con `?`
  - [ ] Audio non disponibile → niente errore visibile, solo silenzio
  - [ ] URL `/pokemon/9999` → redirect a `/` o pagina 404

### 📄 Documentazione

- [ ] **README.md** del repo
  - [ ] Titolo e screenshot
  - [ ] Stack tecnico
  - [ ] Come avviare in locale (`npm install`, `npm run dev`)
  - [ ] Credits PokéAPI
  - [ ] Link al deploy Vercel

- [ ] **`.env.example`** (se applicabile)
  - [ ] Solo se hai aggiunto config esterne — non strettamente necessario per questa app

- [ ] **Commenti nel codice**
  - [ ] Funzioni complesse (parsing evolution chain, sprite resolution) hanno JSDoc
  - [ ] Costanti spiegate dove non ovvio

### 🌐 Deploy finale

- [ ] **Custom domain (opzionale)**
  - [ ] Acquistare dominio (es. `mio-pokedex.it`)
  - [ ] Configurare DNS su Vercel
  - [ ] HTTPS automatico

- [ ] **Build di produzione finale**
  - [ ] `npm run build` → verificare zero errori TypeScript/ESLint
  - [ ] `npm run preview` → testare la build locally
  - [ ] Push finale su `main` → deploy Vercel

- [ ] **Verifica deploy**
  - [ ] Aprire URL Vercel in incognito → tutto carica
  - [ ] Testare da uno smartphone reale
  - [ ] Condividere con un amico → feedback

### 📦 Repo cleanup

- [ ] `.gitignore` corretto (node_modules, dist, .env, .DS_Store)
- [ ] Niente file `.env` committato
- [ ] Niente chiavi/token committate
- [ ] Branch `main` come default
- [ ] Tag release `v1.0.0`

---

## 🎯 Definition of Done — Fase 9 (e dell'intero progetto)

1. ✅ L'app è online su Vercel a un URL stabile
2. ✅ Funziona su iPhone, Android, desktop
3. ✅ Lighthouse score ≥ 90 su Performance e Accessibility
4. ✅ Tutte le feature delle fasi 1-7 funzionano
5. ✅ Le extra opzionali implementate funzionano
6. ✅ Nessun errore in console
7. ✅ README chiaro e completo
8. ✅ Repo pulito, tag v1.0.0

---

## 💡 Suggerimenti tecnici

- **Lighthouse mobile**: spesso il punteggio mobile è più basso del desktop. Mira a ≥ 80 su mobile reale, ≥ 90 su desktop.
- **iOS Safari quirks**:
  - `position: fixed` con keyboard aperta → comportamento strano. Usare con cautela nei popup.
  - `100vh` su iOS Safari include la barra browser → usare `100dvh` (dynamic viewport height) o JS hack.
  - Bounce scroll fastidioso → `overscroll-behavior: none` sul body.
- **Bundle analyzer**: `npm i -D rollup-plugin-visualizer` e aggiungi al `vite.config.ts`. Genera report HTML.
- **Source maps in prod**: disabilita per produzione (`build.sourcemap: false` in vite.config) per non esporre il codice.
- **Cache headers Vercel**: Vercel automaticamente cache-busta gli asset con hash. Niente da configurare.

---

## 🧪 Test finali da fare

- Aprire l'app dopo 1 settimana → tutto carica veloce (cache locale del browser)
- Provare su connessione lenta (DevTools throttling "Slow 3G") → loading visibile, niente crash
- Provare con JS disabilitato → vedere pagina vuota (è una SPA, OK accettabile)
- Stampare la pagina (Ctrl+P) → output decente (anche se non è una feature prioritaria)
- Modalità lettura iOS Safari → si attiva? (non rilevante ma curioso)

---

## 🎉 Conclusione

Quando tutto è ✅, il progetto è completo. Aggiorna `00_AVANZAMENTO_PROGETTO.md` segnando la Fase 9 come ✅ con la data, e congratulati per aver costruito un Pokédex completo da zero. 🟢🎮

Mantenimento futuro:
- PokéAPI è stabile, non dovrebbe rompersi
- Vercel free tier ha limiti generosi (basta restare sotto 100GB/mese di banda — improbabile)
- Se aggiungono nuove generazioni (Gen X in futuro?) il limit=2000 della lista basterà ancora a lungo
- Aggiornare le dipendenze ogni 6 mesi: `npm outdated` poi `npm update`

Buon catch! 🔴🟢
