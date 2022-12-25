// Import components
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { Button } from "@nextui-org/react";

// Import i18n config and set locales
import i18nConfig from "../../i18n.json";
const { locales } = i18nConfig;

// Fire the component
export default function ChangeLanguage() {
  const { t, lang } = useTranslation("common");

  return (
    // Map though locales and return a button for each
    <>
      {locales.map((lng) => {
        if (lng === lang) return null;

        return (
          <Button
            key={lng}
            auto
            onClick={async () => {
              await setLanguage(lng);
            }}
          >
            {t(lng)}
          </Button>
        );
      })}
    </>
  );
}
