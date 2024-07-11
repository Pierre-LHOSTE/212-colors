"use client";
import { useState, useEffect } from "react";
import { loadLocaleAsync } from "@/src/i18n/i18n-util.async";
import { detectLocale } from "@/src/i18n/i18n-util";
import { navigatorDetector } from "typesafe-i18n/detectors";
import TypesafeI18n from "@/src/i18n/i18n-react";

export function LangConfig({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const locale = detectLocale(navigatorDetector);
  const locale = "debug"
  console.log("🚀 ~ locale:", locale);

  const [localesLoaded, setLocalesLoaded] = useState(false);
  useEffect(() => {
    try {
      loadLocaleAsync(locale).then((e) => {
        console.log("loaded");
        console.log(e);
        setLocalesLoaded(true);
      });
    } catch (error) {
      console.log(error);
    }
  }, [locale]);

  if (!localesLoaded) {
    return <></>;
  }

  return <TypesafeI18n locale={locale}>{children}</TypesafeI18n>;
}
