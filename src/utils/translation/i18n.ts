import i18n, { TFunction } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/common.json";
import no from "./locales/no/common.json";
import sv from "./locales/sv/common.json";

i18n
  // Enable automatic language detection
  .use(LanguageDetector)
  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    lng: "en",
    resources: {
      en: {
        translation: en,
      },
      no: {
        translation: no,
      },
      sv: {
        translation: sv,
      },
    },
    detection: {
      // https://github.com/i18next/i18next-browser-languageDetector
      // order and from where user language should be detected
      order: ["localStorage", "cookie", "navigator"],

      // keys or params to lookup language from
      lookupCookie: "lng",
      lookupLocalStorage: "lng",

      // optional expire and domain for set cookie
      // 12 months in minutes
      cookieMinutes: 60 * 24 * 30 * 12,

      // cache user language on
      caches: ["localStorage", "cookie"],
      excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

      // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
      cookieOptions: { path: "/", sameSite: "strict" },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export { i18n, useTranslation };
export type { TFunction };
