"use client";
import TypesafeI18n from "@/src/i18n/i18n-react";
import { Locales } from "@/src/i18n/i18n-types";
import { detectLocale } from "@/src/i18n/i18n-util";
import { loadLocaleAsync } from "@/src/i18n/i18n-util.async";
import { useSettingsStore } from "@/src/store/settings";
import { useEffect, useState } from "react";
import { navigatorDetector } from "typesafe-i18n/detectors";

export function LangConfig({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = useSettingsStore((state) => state.language);
  const detectedLocale = detectLocale(navigatorDetector);
  const locale = language === "auto" ? detectedLocale : (language as Locales);

  const [localesLoaded, setLocalesLoaded] = useState(false);

  useEffect(() => {
    loadLocaleAsync(locale).then(() => {
      setLocalesLoaded(true);
    });
  }, [locale]);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLocalesLoaded(false);
      loadLocaleAsync(locale).then(() => {
        setLocalesLoaded(true);
      });
    };

    window.addEventListener("languageChange", handleLanguageChange);
    window.dispatchEvent(new Event("languageChange"));

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, [locale]);

  if (!localesLoaded) {
    return <></>;
  }

  return <TypesafeI18n locale={locale}>{children}</TypesafeI18n>;
}
