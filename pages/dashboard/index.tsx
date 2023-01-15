//Import components
import Head from "next/head";
import { Container } from "@nextui-org/react";
import useTranslation from "next-translate/useTranslation";
import { getCookie } from "cookies-next";
import Layout from "../../components/layouts/RootLayout";
import initPocketBase from "../../helpers/initPocketbase";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import PageHeading from "../../components/common/PageHeading";

// Import types
import type { ReactElement } from "react";
import type { GetServerSidePropsContext } from "next";
import type { authData } from "../../types/user";

// Fire the Home page
export default function Dashboard({
  isLoggedIn,
  authData,
  roles,
}: {
  isLoggedIn: boolean;
  authData: authData;
  roles: string[];
}) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("sitename") + " | Dashboard"}</title>
        <meta name="description" content={t("meta_description")} />
      </Head>
      <PageHeading text="Dashboard" />
      <Container fluid>Content</Container>
    </>
  );
}

// Export serverside props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get the language cookie
  const langCookie = getCookie("NEXT_LOCALE", context.res);

  // Init PocketBase
  const pb = await initPocketBase(context);

  // Strip the authData from the pb authStore
  const authData = await JSON.parse(JSON.stringify(pb.authStore));

  let userRoles;
  let roles;

  // If the user is not logged in, redirect to the login page
  if (!pb.authStore.isValid) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // If the language cookie is not the actual language, redirect to correct language
  if (langCookie && langCookie !== context.locale) {
    return {
      redirect: {
        destination: "/" + langCookie + context.resolvedUrl,
        permanent: false,
      },
    };
  }

  // Get the user roles
  await pb
    .collection("users")
    .getOne(authData.baseModel.id, {
      expand: "roles",
    })
    .then((res) => {
      userRoles = res.expand.roles;
      roles = userRoles.map((role: { name: string }) => role.name);
    })
    .catch(() => {
      roles = [];
    });

  // Return the props if user is logged in and correct language is set
  return {
    props: {
      isLoggedIn: pb.authStore.isValid,
      authData: authData.baseModel,
      roles: roles,
    },
  };
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout authData={page.props}>{page}</DashboardLayout>
    </Layout>
  );
};
