// Import components
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import PocketBase, { type AuthProviderInfo } from "pocketbase";
import initPocketBase from "../../helpers/initPocketbase";
import Layout from "../../components/layouts/RootLayout";
import useTranslation from "next-translate/useTranslation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { Button, Container } from "@nextui-org/react";

// Import types
import type { ReactElement } from "react";
import type { GetServerSidePropsContext } from "next";
import type { authData } from "../../types/user";

// Import icons
import { FaTwitch, FaDiscord } from "react-icons/fa";

// Fire the site
export default function LoginPage({
  isLoggedIn,
  authData,
}: {
  isLoggedIn: boolean;
  authData: authData;
}) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [allProvider, setAllProvider] = useState<AuthProviderInfo[]>();

  // Fire login logic on mount
  useEffect(() => {
    // Init PocketBase
    const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

    // Get the saved provider data from localstorage
    (async () => {
      const fromStorage = JSON.parse(localStorage.getItem("provider") || "{}");

      // Fires when the user comes back from the oauth2 provider
      if (router.query.code) {
        const code = router.query.code.toString();

        // Login the user
        await pb
          .collection("users")
          .authWithOAuth2(
            fromStorage.name,
            code,
            fromStorage.codeVerifier,
            process.env.NEXT_PUBLIC_SITE_URL + "/login",
            {
              banned: false,
              showOnline: true,
              lastActive: new Date(),
              emailVisibility: false,
              verified: true,
            }
          )
          .then((response) => {
            // Get the authStore from localstorage
            const authStoreLocalStorage =
              localStorage.getItem("pocketbase_auth");

            // Update the user data with the data from the oauth2 provider
            const dataToAdd = {
              avatarUrl: response.meta?.avatarUrl,
              lastActive: new Date(),
            };
            pb.collection("users").update(response.record.id, dataToAdd);

            // Remove the provider data from localstorage
            localStorage.removeItem("provider");

            if (authStoreLocalStorage) {
              // Set the authStore cookie
              setCookie("pb_auth", authStoreLocalStorage, {
                maxAge: 60 * 60 * 24 * 14,
                path: "/",
                secure: true,
                sameSite: "strict",
              });

              //Remove the authStore from localstorage
              localStorage.removeItem("pocketbase_auth");

              // Refresh page to login the user with the new cookie
              router.push("/login", "/login", {
                locale: router.locale,
              });
            }
          })
          // BACKLOG: Add error handling
          .catch((error) => {
            console.error(error);
          });

        // When the user is not logged in and it is not a redirect from the oauth2 provider
      } else if (!router.query.code && !isLoggedIn) {
        // Get the enabled oauth2 providers
        (async () => {
          const authMethods = await pb.collection("users").listAuthMethods();
          setAllProvider(authMethods.authProviders);
        })();
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{t("sitename") + " | Login"}</title>
        <meta name="description" content={t("meta_description")} />
      </Head>
      <Container fluid>
        {!router.query.code ? <h1>Login</h1> : <h1>Wait for redirect...</h1>}
        {allProvider && !isLoggedIn && (
          <div className="grid gap-3">
            {allProvider.map((provider) => (
              <Button
                key={provider.name}
                color={provider.name === "twitch" ? "secondary" : "primary"}
                icon={
                  provider.name === "twitch" ? (
                    <FaTwitch className="text-lg" />
                  ) : (
                    <FaDiscord className="text-lg" />
                  )
                }
                onClick={() => {
                  localStorage.setItem("provider", JSON.stringify(provider));
                  router.push(
                    provider.authUrl +
                      process.env.NEXT_PUBLIC_SITE_URL +
                      "/login"
                  );
                }}
              >
                {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}{" "}
                Login
              </Button>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

// Export serverside props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get language cookie for correct redirect path
  const languageCookie = getCookie("NEXT_LOCALE", context);

  // Get the redirect after login cookie
  const redirectAfterLoginCookie = getCookie("redirect_after_login", context);

  // Init PocketBase
  const pb = await initPocketBase(context);

  // Strip the authData from the pb authStore
  const authData = JSON.parse(JSON.stringify(pb.authStore));

  // Redirect if the user is logged in
  if (pb.authStore.isValid) {
    // Remove the redirect after login cookie
    deleteCookie("redirect_after_login", context);

    // Handle the redirect string
    const redirect = redirectAfterLoginCookie ? redirectAfterLoginCookie : "/";
    const language = languageCookie ? languageCookie : "en";

    return {
      redirect: {
        destination: "/" + language + redirect,
        permanent: false,
      },
    };
  }

  // If the language cookie is not the actual language, redirect to correct language
  if (languageCookie && languageCookie !== context.locale) {
    return {
      redirect: {
        destination: "/" + languageCookie + context.resolvedUrl,
        permanent: false,
      },
    };
  }

  // Return the props when user is not logged in and correct language is set
  return {
    props: {
      isLoggedIn: pb.authStore.isValid,
      authData: authData.baseModel,
    },
  };
}

// Load the layout
LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
