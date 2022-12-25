// Import components
import { useRouter } from "next/router";
import { useEffect } from "react";

// Fire the hook
export default function useSaveLocaleCookie() {
  const { locale, defaultLocale } = useRouter();

  // Save the locale cookie when the locale changes
  useEffect(saveLocaleCookie, [locale, defaultLocale]);

  // Save the locale cookie
  function saveLocaleCookie() {
    if (locale !== defaultLocale) {
      const date = new Date();
      const expire = 30 * 24 * 60 * 60 * 1000; // 30 days
      date.setTime(date.getTime() + expire);
      document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`;
    }
  }
}
