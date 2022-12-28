// Import components
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

// Fire the hook
export default function useSaveLocaleCookie() {
  const { locale, defaultLocale } = useRouter();
  const language = getCookie("NEXT_LOCALE");

  // Save the locale cookie when the locale changes
  useEffect(saveLocaleCookie, [locale, defaultLocale, language]);

  // Save the locale cookie
  function saveLocaleCookie() {
    if (!language) {
      const date = new Date();
      const expire = 30 * 24 * 60 * 60 * 1000; // 30 days
      date.setTime(date.getTime() + expire);
      document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`;
    }
  }
}
