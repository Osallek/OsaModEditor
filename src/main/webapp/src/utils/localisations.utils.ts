import { locale } from "index";
import { KeyLocalizations, Localizations } from "types";

export function localisationsComparator(a: Localizations, b: Localizations): number {
  if (locale.startsWith("fr")) {
    return a.french.localeCompare(b.french, locale);
  } else if (locale.startsWith("de")) {
    return a.german.localeCompare(b.german, locale);
  } else if (locale.startsWith("es")) {
    return a.spanish.localeCompare(b.spanish, locale);
  } else {
    return a.english.localeCompare(b.english, locale);
  }
}

export function keyLocalisationsComparator(a: KeyLocalizations, b: KeyLocalizations): number {
  return a.name.localeCompare(b.name, locale);
}

export function localizedComparator(a: string, b: string): number {
  return a.localeCompare(b, locale);
}

export function localize(l: Localizations): string {
  if (locale.startsWith("fr")) {
    return l.french;
  } else if (locale.startsWith("de")) {
    return l.german;
  } else if (locale.startsWith("es")) {
    return l.spanish;
  } else {
    return l.english;
  }
}

export const defaultLocalization: Localizations = {
  english: "Unknown",
  french: "Inconnu",
  german: "Unbekannt",
  spanish: "Desconocido",
};

export const inHreLocalization: Localizations = {
  english: "Is part of the HRE",
  french: "Appartient au Saint-Empire",
  german: "Ist Teil des HRR",
  spanish: "Forma parte del SIR",
};

export const notInHreLocalization: Localizations = {
  english: "Is not part of the HRE",
  french: "N'appartient pas au Saint-Empire",
  german: "Ist kein Teil des HRR",
  spanish: "No forma parte del SIR",
};
