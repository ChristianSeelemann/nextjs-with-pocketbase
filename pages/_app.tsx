// Import used fonts
import "@fontsource/bai-jamjuree/400.css";
import "@fontsource/bai-jamjuree/400-italic.css";
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

// Import types
import type { AppProps } from "next/app";

// Create custom themes
const lightTheme = createTheme(themeLight);
const darkTheme = createTheme(themeDark);

// Create global css
const globalStyle = globalCss(globalStyles);

// Fire the app
export default function MyApp({ Component, pageProps }: AppProps) {
  globalStyle();

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_META_DESCRIPTION}
        />
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
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
}
