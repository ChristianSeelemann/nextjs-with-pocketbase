//Import components
import { useState } from "react";
import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import {
  Container,
  Text,
  Row,
  Switch,
  Grid,
  Checkbox,
  Button,
} from "@nextui-org/react";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { deleteCookie, getCookie } from "cookies-next";
import Layout from "../../../components/layouts/RootLayout";
import initPocketBase from "../../../helpers/initPocketbase";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import PageHeading from "../../../components/common/PageHeading";
import Tooltip from "../../../components/ui/Tooltip";
import Popover from "../../../components/ui/Popover";
import ColorSwitcher from "../../../components/interactive/ColorSwitcher";
import PageSection from "../../../components/common/PageSection";
import PageHead from "../../../components/common/PageHead";

// Import types
import type { ReactElement } from "react";
import type { GetServerSidePropsContext } from "next";
import type { authData } from "../../../types/user";

// Import icons
import { IoWarningOutline } from "react-icons/io5";
import { AiOutlineUserDelete } from "react-icons/ai";

// Fire the dashboard settings page
export default function DashboardSettings({
  isLoggedIn,
  authData,
  roles,
}: {
  isLoggedIn: boolean;
  authData: authData;
  roles: string[];
}) {
  const { t } = useTranslation("common");
  const router = useRouter();

  // Set states
  const [showEmail, setShowEmail] = useState(authData.emailVisibility);
  const [showOnline, setShowOnline] = useState(authData.showOnline);
  const [selectedLocale, setSelectedLocale] = useState([router.locale || "en"]);
  const [showOnlinePressed, setShowOnlinePressed] = useState(false);
  const [showEmailPressed, setShowEmailPressed] = useState(false);
  const [isDeletePopoverOpen, setIsDeletePopoverOpen] = useState(false);

  // Connect to database
  const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

  return (
    <>
      <PageHead title={t("settings")} />
      <PageHeading text="Settings" />

      <Container xl>
        {/* Show content if logged in */}
        {isLoggedIn && (
          <>
            {/* Section: Privacy Settings */}
            <PageSection title="Privacy Settings">
              <Grid.Container className="gap-2">
                <Row align="center" className="gap-2">
                  <Tooltip
                    alternativeText="Please wait a moment!"
                    text="Change the visibility of your email adress"
                    isAlternative={showEmailPressed}
                  >
                    <Switch
                      checked={showEmail}
                      initialChecked={showEmail}
                      disabled={showEmailPressed}
                      color="secondary"
                      aria-label="Show my email adress"
                      onChange={async () => {
                        setShowEmailPressed(true);
                        setShowEmail(!showEmail);
                        await pb.collection("users").update(authData.id, {
                          emailVisibility: !showEmail,
                        });
                        setTimeout(() => {
                          setShowEmailPressed(false);
                        }, 3000);
                      }}
                    />
                  </Tooltip>
                  <Text className="pt-1">Show my email adress</Text>
                </Row>

                <Row align="center" className="gap-2">
                  <Tooltip
                    alternativeText="Please wait a moment!"
                    text="Change the visibility of your online status"
                    isAlternative={showOnlinePressed}
                  >
                    <Switch
                      checked={showOnline}
                      initialChecked={showOnline}
                      disabled={showOnlinePressed}
                      color="secondary"
                      aria-label="Show my online status"
                      onChange={async () => {
                        setShowOnlinePressed(true);
                        setShowOnline(!showOnline);
                        await pb.collection("users").update(authData.id, {
                          showOnline: !showOnline,
                        });
                        router.push(router.asPath, undefined, {
                          locale: router.locale,
                        });
                        setTimeout(() => {
                          setShowOnlinePressed(false);
                        }, 3000);
                      }}
                    />
                  </Tooltip>
                  <Text className="pt-1">Show my online status</Text>
                </Row>
              </Grid.Container>
            </PageSection>

            {/* Section: Other Settings */}
            <PageSection title="Other Settings">
              <Grid.Container className="gap-2">
                <Row align="center" className="gap-2">
                  <ColorSwitcher size="md" />
                  <Text className="pt-1">Dark Interface</Text>
                </Row>

                <Row className="mt-3">
                  <Text>Choose your prefered language</Text>
                </Row>

                <Row align="center" className="gap-2">
                  <Checkbox.Group
                    orientation="horizontal"
                    aria-label="Select your prefered Language"
                    color="secondary"
                    value={selectedLocale}
                    onChange={() => {
                      setLanguage(selectedLocale[0]);
                    }}
                  >
                    {router.locales?.map((locale) => {
                      let text = "";

                      switch (locale) {
                        case "en":
                          text = "English";
                          break;
                        case "de":
                          text = "Deutsch";
                      }

                      return (
                        <Checkbox
                          value={locale}
                          key={locale}
                          size="sm"
                          isDisabled={router.locale === locale ? true : false}
                          onClick={() => setSelectedLocale([locale])}
                        >
                          {text}
                        </Checkbox>
                      );
                    })}
                  </Checkbox.Group>
                </Row>
              </Grid.Container>
            </PageSection>

            {/* Section: Delete my Account */}
            <PageSection title="Delete my Account">
              <Row
                css={{
                  backgroundColor: "$errorLightHover",
                }}
                className="rounded-md px-3 py-4 mb-3 mt-1"
                align="center"
                justify="space-between"
              >
                <Text>Caution! This can´t be undone!</Text>
                <IoWarningOutline className="text-2xl" />
              </Row>

              <Row>
                <Text>
                  Please delete your account only if you really don&apos;t plan
                  to come back. Your data will be deleted completely and
                  irrevocably! It was nice having you here. See you around.
                </Text>
              </Row>

              <Row className="mt-8">
                {/* <DeleteMyAccountPopover authData={authData} /> */}
                <Popover
                  text="Delete my Account"
                  icon={<AiOutlineUserDelete />}
                  isOpen={isDeletePopoverOpen}
                  setIsOpen={setIsDeletePopoverOpen}
                  width="25rem"
                >
                  <Row justify="center" align="center" className="mb-2">
                    <Text b>Confirm</Text>
                  </Row>
                  <Row>
                    <Text>
                      Please delete your account only if you really don&apos;t
                      plan to come back. Your data will be deleted completely
                      and irrevocably! It was nice having you here. See you
                      around.
                    </Text>
                  </Row>
                  <Row
                    justify="center"
                    align="center"
                    className="mt-6 mb-1 gap-4"
                  >
                    <Button
                      size="sm"
                      ghost
                      color="success"
                      className="rounded-md w-full"
                      onPress={() => setIsDeletePopoverOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      shadow
                      color="error"
                      className="rounded-md w-full"
                      onPress={async () => {
                        await pb.collection("users").delete(authData.id);
                        deleteCookie("pb_auth");
                        router.push("/", undefined, { locale: router.locale });
                      }}
                    >
                      Delete
                    </Button>
                  </Row>
                </Popover>
              </Row>
            </PageSection>
          </>
        )}

        {/* For security: Not show content if not logged in */}
        {!isLoggedIn && (
          <Row>
            <Text b>You are not logged in!</Text>
          </Row>
        )}
      </Container>
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
  const authData = JSON.parse(JSON.stringify(pb.authStore));

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

DashboardSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout authData={page.props}>{page}</DashboardLayout>
    </Layout>
  );
};
