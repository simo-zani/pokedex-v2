import { useState, useCallback } from "react";

export const LANGUAGES = [
  { code: "it", countryCode: "it", label: "Italiano" },
  { code: "en", countryCode: "gb", label: "English" },
  { code: "de", countryCode: "de", label: "Deutsch" },
  { code: "fr", countryCode: "fr", label: "Français" },
  { code: "es", countryCode: "es", label: "Español" },
  { code: "ja-Hrkt", countryCode: "jp", label: "日本語 (kana)" },
  { code: "ja", countryCode: "jp", label: "日本語 (kanji)" },
  { code: "ko", countryCode: "kr", label: "한국어" },
  { code: "zh-Hant", countryCode: "tw", label: "繁體中文" },
  { code: "zh-Hans", countryCode: "cn", label: "简体中文" },
];

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export function useLanguage() {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("pokedex_language") as LanguageCode) || "it";
    }
    return "it";
  });

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code);
    localStorage.setItem("pokedex_language", code);
  }, []);

  return { language, setLanguage };
}

export function getLocalizedName(
  species: { names: Array<{ language: { name: string }; name: string }> } | undefined,
  language: string
): string | null {
  if (!species) return null;
  const entry = species.names.find((n) => n.language.name === language);
  if (entry) return entry.name;
  const fallback = species.names.find((n) => n.language.name === "en");
  return fallback?.name ?? null;
}
