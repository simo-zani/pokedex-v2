# 🎁 Fase 8 — Extra Opzionali (Preferiti, Confronto, Easter Egg, Parlante, Desktop a Due Pannelli)

> **⚠️ Fase OPZIONALE**: queste feature sono extra. Puoi farne anche solo una o saltarle tutte. Ogni feature è indipendente dalle altre, puoi sceglierle a piacere. Le ho ordinate dalla più utile alla più "gimmick".

📄 Spec di riferimento: `POKEDEX_WEBAPP_SPEC.md` — sezione "Fase 8 — Extra (opzionali)".

---

## 🎯 Lista delle feature opzionali

Spunta solo quelle che vuoi implementare:

- [ ] **8.1** Preferiti ❤️ (localStorage)
- [ ] **8.2** Confronto due Pokémon
- [ ] **8.3** Pokémon del giorno
- [ ] **8.4** Tabella nomi completa multilingua
- [ ] **8.5** Layout desktop a due pannelli
- [ ] **8.6** Pokédex parlante (Web Speech API)
- [ ] **8.7** Easter egg Konami code → MissingNo

---

## ❤️ 8.1 — Preferiti

**Utilità**: medio-alta. Permette di marcare Pokémon e vederli rapidamente.

- [ ] **Hook `useFavorites`** (`src/hooks/useFavorites.ts`)
  - [ ] Stato: `favorites: number[]` (array di id)
  - [ ] Funzioni: `addFavorite(id)`, `removeFavorite(id)`, `toggleFavorite(id)`, `isFavorite(id)`
  - [ ] Persistere in `localStorage` (`pokedex_favorites`)

- [ ] **Cuore ❤️ nella PokemonPage**
  - [ ] Pulsante cuore nell'header (accanto a 🔊 e 🏳️)
  - [ ] Vuoto (🤍) se non preferito, pieno (❤️) se preferito
  - [ ] Animazione al toggle: scala 0.8 → 1.3 → 1 (Framer Motion)

- [ ] **Pagina Preferiti**
  - [ ] Route `/favorites`
  - [ ] Lista virtualizzata dei Pokémon preferiti (riusa `PokemonCard`)
  - [ ] Pulsante ❤️ nella ButtonBar (Fase 2 placeholder) ora naviga qui
  - [ ] Stato vuoto: "Nessun preferito ancora. Aggiungi cliccando ❤️ in un Pokémon"

---

## ⚖️ 8.2 — Confronto due Pokémon

**Utilità**: alta per power user.

- [ ] **Pagina Confronto**
  - [ ] Route `/compare`
  - [ ] Due slot: "Pokémon A" e "Pokémon B"
  - [ ] Ogni slot ha un search input per scegliere
  - [ ] Mostra side-by-side:
    - Sprite (front)
    - Tipi
    - Stats (barre comparative — chi è più alto vince visivamente)
    - Totale stats
    - Altezza, peso
  - [ ] Highlight della stat dove uno supera l'altro

- [ ] **Pulsante "Confronta" nel dettaglio**
  - [ ] Bottone "⚖️ Confronta" che porta a `/compare?a={currentId}`
  - [ ] L'altro slot rimane da scegliere

---

## 🌅 8.3 — Pokémon del giorno

**Utilità**: bassa, ma carina.

- [ ] **Logica deterministica**
  - [ ] Funzione `getPokemonOfTheDay()`:
    ```typescript
    const seed = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const hash = simpleHash(seed); // funzione hash semplice
    return (hash % 1025) + 1;
    ```
  - [ ] Lo stesso giorno → stesso Pokémon per tutti

- [ ] **Banner in Home**
  - [ ] In cima alla HomePage (sopra la lista): "🌟 Pokémon del giorno: Charmander #004"
  - [ ] Card cliccabile → naviga al suo dettaglio
  - [ ] Aggiorna a mezzanotte (refresh giornaliero)

---

## 🌐 8.4 — Tabella nomi completa multilingua

**Utilità**: bassa, ma è una feature "geek-friendly".

- [ ] **NameTable component** (`src/components/pokemon/NameTable.tsx`)
  - [ ] Sezione collassabile in fondo al dettaglio
  - [ ] Tabella: bandiera | lingua | nome
  - [ ] Tutte le 10+ lingue da `species.names[]`
  - [ ] Sezione chiusa di default, apre al click su "Mostra tutti i nomi"

---

## 🖥️ 8.5 — Layout desktop a due pannelli

**Utilità**: media. Migliora l'UX su schermi grandi.

- [ ] **Media query desktop** (≥1024px)
  - [ ] Layout a due colonne: lista a sinistra (300-400px), dettaglio a destra (resto)
  - [ ] Selezionando un Pokémon nella lista: il dettaglio si aggiorna a destra (no navigation, stato condiviso)
  - [ ] URL aggiornato comunque (`/pokemon/25`)
  - [ ] Su mobile/tablet: comportamento attuale (full page navigation)

- [ ] **Sfide tecniche**:
  - Mantenere il routing funzionante (`useNavigate` ma anche stato condiviso)
  - Adattare la scocca: due "schermi" affiancati o uno solo gigante?
  - Decisione: scocca più larga, due aree schermo affiancate

---

## 🗣️ 8.6 — Pokédex parlante (Web Speech API)

**Utilità**: gimmick, ma molto divertente.

- [ ] **Web Speech API utility** (`src/lib/speech.ts`)
  - [ ] Funzione `speak(text, lang)`:
    ```typescript
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; // 'it-IT', 'en-US', ecc.
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
    ```

- [ ] **Pulsante "Leggi descrizione"**
  - [ ] Nel componente `FlavorText`: pulsante 📢 che legge il testo ad alta voce
  - [ ] Lingua: usa la `language` corrente, mappata a un BCP-47 (it → it-IT, en → en-US, ecc.)
  - [ ] Le voci giapponese/coreano/cinese dipendono dal sistema dell'utente

- [ ] **Voce dell'app stessa**
  - [ ] Al cambio Pokémon: l'app annuncia "Pokémon numero 25, Pikachu, Tipo Elettro"
  - [ ] Solo se attivato (toggle nelle impostazioni)

---

## 🎮 8.7 — Easter Egg Konami → MissingNo

**Utilità**: pura gimmick. Per fan vecchio stile.

- [ ] **Listener Konami**
  - [ ] `useEffect` globale: ascolta sequenze di tasti
  - [ ] Sequenza: `ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight B A`
  - [ ] Al match: attiva l'easter egg

- [ ] **Pagina/modal MissingNo**
  - [ ] Schermata "glitchata" stile bug del Game Boy
  - [ ] Sprite distorta (filtri CSS: hue-rotate, blur, scale weird)
  - [ ] Stats con numeri casuali altissimi
  - [ ] Audio: rumore bianco o cry distorto
  - [ ] Disclaimer: "Hai trovato MissingNo! [Chiudi]"

- [ ] **Versione mobile**
  - [ ] Konami sequence con i pulsanti fisici del Pokédex (◀◀▼▼◀▶◀▶... oppure tap sul LED 7 volte di seguito)

---

## ⚠️ Cosa NON fare in questa fase

- Non implementare tutte le feature insieme — scegli quelle che ti interessano
- Non rompere le fasi precedenti (la app deve continuare a funzionare anche senza queste extra)
- Ogni feature deve essere ATTIVABILE/DISATTIVABILE senza impatto sul resto

---

## 💡 Suggerimenti tecnici

- **Konami code**: usa una ref con buffer degli ultimi N tasti, confronta con la sequenza.
- **Web Speech voices**: le voci disponibili dipendono dal sistema. iOS Safari ha voci buone, Android decenti, desktop ottime. `speechSynthesis.getVoices()` per esplorare.
- **Confronto stats**: per le barre comparative, normalizza al max delle due (non al 255 assoluto). Visivamente più impattante.
- **Pokémon del giorno**: usa una semplice hash function tipo `Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0)`.
- **Layout desktop two-panel**: usa `useMediaQuery` (custom hook con `window.matchMedia`) per detectare ≥1024px.

---

## 🎯 Definition of Done — Fase 8

La Fase 8 è "completata" anche se non hai fatto nessuna delle extra. Spunta solo quelle implementate, segna le altre come ⏭️ Saltate in `00_AVANZAMENTO_PROGETTO.md`.

---

## ➡️ Prossima fase

Passa a `09_FASE_9_DEPLOY_E_QA.md` per il deploy finale e QA completo.
