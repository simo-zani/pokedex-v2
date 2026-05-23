# 🔄 Aggiornamenti Futuri — Nuove Generazioni Pokémon

> Cosa fare quando PokéAPI aggiunge una nuova generazione di Pokémon (Gen X, Gen XI, ecc.).

## ✅ Cosa funziona già automaticamente

| Feature | Motivo |
|---------|--------|
| Lista Pokémon | `fetchPokemonList()` usa `/pokemon?limit=2000` — include tutti i nuovi ID |
| Dettaglio Pokémon | `usePokemon(id)` chiama `/pokemon/{id}` — dinamico |
| Sprite | `sprites.versions` arriva dalla API, nessun hardcode |
| Tipi, stats, altezza/peso | Tutto via API |
| Forme alternative | `species.varieties` è dinamico |
| Catene evolutive | `evolution-chain/{id}` via API |
| Verso Pokémon | `playCry(id)` costruisce URL su CDN PokeAPI — funziona per qualsiasi ID |

## ⚠️ Cosa va aggiornato manualmente

### 1. `src/lib/sprites.ts` — `getPokemonGeneration()`

Aggiungere il nuovo range **PRIMA** del `return 9` finale.

```typescript
export function getPokemonGeneration(id: number): number {
  if (id <= 151) return 1;   // Kanto
  if (id <= 251) return 2;   // Johto
  if (id <= 386) return 3;   // Hoenn
  if (id <= 493) return 4;   // Sinnoh
  if (id <= 649) return 5;   // Unima
  if (id <= 721) return 6;   // Kalos
  if (id <= 809) return 7;   // Alola
  if (id <= 898) return 8;   // Galar
  if (id <= 1025) return 9;  // Paldea
  if (id <= NUOVO_MAX) return 10;  // ← da aggiungere
  return 10; // aggiornare l'ultimo return
}
```

### 2. `src/lib/sprites.ts` — `getDefaultRetroGame()`

Aggiungere il default game per la nuova gen **PRIMA** del `return "default"`.

```typescript
export function getDefaultRetroGame(id: number): GameVersion {
  if (id <= 151) return "red-blue";
  if (id <= 251) return "gold";
  if (id <= 386) return "ruby-sapphire";
  if (id <= 493) return "diamond-pearl";
  if (id <= 649) return "black-white";
  if (id <= 721) return "x-y";
  if (id <= 809) return "ultra-sun-ultra-moon";
  if (id <= 1025) return "default";
  return "default"; // invariato se la nuova gen non ha sprite retro
}
```

### 3. `src/lib/sprites.ts` — `gameVersionMap` + `GAME_VERSION_GENERATION`

Se PokeAPI aggiunge `generation-x` a `sprites.versions`, va aggiunta la entry corrispondente in `gameVersionMap` (array righe 271-294) e in `GAME_VERSION_GENERATION` (se è un nuovo GameVersion):

```typescript
// in gameVersionMap:
{ key: "nuovo-gioco", gen: "generation-x", gameKey: "nuovo-gioco", label: "Nuovo Gioco" },
```

### 4. `src/lib/constants.ts` — `POKEMON_LIST_LIMIT`

Se i Pokémon totali superano 2000, alzare il limite:

```typescript
export const POKEMON_LIST_LIMIT = 2000; // → 3000 se necessario
```

---

## 📦 Se si implementa la Fase 10 (Static Dump)

Dopo una nuova generazione, rigenerare il dump:

```bash
npm run build
# lo script prebuild scaricherà automaticamente i nuovi Pokémon
```

Se il dump è incrementale, assicurarsi che `savedMax` sia aggiornato.

---

## 🧪 Test rapidi dopo l'aggiornamento

1. Aprire il primo Pokémon della nuova gen → sprite, stats, tipo corretti
2. Aprire l'ultimo Pokémon della nuova gen → tutto ok
3. Verificare catena evolutiva di un Pokémon della nuova gen
4. Verificare forme alternative (se presenti)
5. Modalità retro: sprite per generazione funzionante
6. Modalità moderna: selector giochi include i nuovi titoli
7. Build: `npm run build` passa senza errori
