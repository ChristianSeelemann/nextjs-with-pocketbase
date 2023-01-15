// Import components
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { setCookie } from "cookies-next";
import { Button } from "@nextui-org/react";

// Import icons
import { IoLanguage } from "react-icons/io5";

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
            color="gradient"
            shadow
            ghost
            icon={<IoLanguage />}
            onClick={async () => {
              setCookie("NEXT_LOCALE", lng, {
                maxAge: 365 * 24 * 60 * 60,
              });
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
