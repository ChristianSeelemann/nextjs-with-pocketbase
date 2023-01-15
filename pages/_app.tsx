// Import used fonts
import "@fontsource/bai-jamjuree/400.css";
import "@fontsource/bai-jamjuree/400-italic.css";
import "@fontsource/bai-jamjuree/600.css";
import "@fontsource/bai-jamjuree/700.css";
import "@fontsource/bai-jamjuree/700-italic.css";
import "@fontsource/chakra-petch/700.css";
import "@fontsource/chakra-petch/700-italic.css";

// Import global css
import "../styles/globals.css";

// Import components
import Head from "next/head";
import { NextUIProvider, createTheme, globalCss } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import globalStyles from "../helpers/globalStyles";
import { themeLight, themeDark } from "../helpers/theme";
import useSaveLocaleCookie from "../hooks/useSaveLocaleCookie";

// Import and set types
import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Create custom themes
const lightTheme = createTheme(themeLight);
const darkTheme = createTheme(themeDark);

// Create global css
const globalStyle = globalCss(globalStyles);

// Fire the app
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  // Set global css
  globalStyle();
  // Save locale cookie
  useSaveLocaleCookie();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          {getLayout(<Component {...pageProps} />)}
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
}
