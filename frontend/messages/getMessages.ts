// lib/getMessages.ts
import { messages as en } from "./en";
import { messages as es } from "./es";

const locales = {
  en,
  es,
};

export function getMessages(locale: string) {
  return locales[locale as keyof typeof locales] || locales["en"];
}
