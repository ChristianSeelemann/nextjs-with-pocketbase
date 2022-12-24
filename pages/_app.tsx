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
import createEmotionCache from "../helpers/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";

// Import types
import type { AppProps } from "next/app";
import { useState } from "react";

// Client-side cache, shared for the session
const clientSideEmotionCache = createEmotionCache();

// Define MyAppProps type
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Fire the app
export default function MyApp(props: MyAppProps) {
  // Set the emotion cache to the client-side cache
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Set the default theme to light
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  // Create the theme instance
  const theme = createTheme({
    palette: {
      mode: selectedTheme,
    },
    typography: {
      fontFamily: "Bai Jamjuree, sans-serif",
    },
  });

  // Change theme toggle function
  const toggleTheme = () => {
    const newTheme = selectedTheme === "light" ? "dark" : "light";
    setSelectedTheme(newTheme);
  };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  console.log(prefersDarkMode);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_META_DESCRIPTION}
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component
          {...pageProps}
          toggleTheme={toggleTheme}
          selectedTheme={selectedTheme}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}
