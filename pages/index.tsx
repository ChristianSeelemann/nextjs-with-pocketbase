//Import components
import Head from "next/head";
import { Card, Container, Grid, Text, useTheme } from "@nextui-org/react";
import ColorSwitcher from "../components/layout/ColorSwitcher";

// Import icons
import { SiTailwindcss } from "react-icons/si";
import { AiOutlineApi, AiOutlineHtml5 } from "react-icons/ai";
import { FaReact, FaWpforms } from "react-icons/fa";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsTranslate } from "react-icons/bs";

// Fire the Home page
export default function Home() {
  const MockItems = ({
    text,
    icon,
    title,
  }: {
    text: string;
    icon: React.ReactNode;
    title: string;
  }) => {
    return (
      <Card className="min-h-[160px]">
        <Card.Header>
          <Grid.Container gap={1} alignItems="center">
            <Grid>{icon}</Grid>
            <Grid>
              <Text
                css={{
                  fontWeight: 700,
                  fontSize: 18,
                  mt: "-$2",
                }}
              >
                {title}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Body css={{ py: "$2" }}>
          <Text>{text}</Text>
        </Card.Body>
      </Card>
    );
  };

  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_META_DESCRIPTION}
        />
      </Head>
      <main>
        <Container>
          <Text
            h1
            css={{ textAlign: "center", mt: "$2xl", mb: "$xl", lh: "$sm" }}
          >
            Next.js + NextUI + Tailwind + Pocketbase = Boilerplate
          </Text>
        </Container>
        <Container md>
          <Grid.Container gap={2} justify="center">
            <Grid className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4">
              <MockItems
                text="Next.js for the complete frontend. Version 13+ without app directory."
                icon={
                  <AiOutlineHtml5
                    size={34}
                    className="rounded-full p-[0.35rem]"
                    style={{
                      backgroundColor: theme?.colors.secondaryLightActive.value,
                      fill: theme?.colors.secondarySolidHover.value,
                    }}
                  />
                }
                title="Next.js"
              />
            </Grid>
            <Grid className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4">
              <MockItems
                text="Pocketbase for the backend, authentication, storage and database."
                icon={
                  <AiOutlineApi
                    size={34}
                    className="rounded-full p-[0.3rem]"
                    style={{
                      backgroundColor: theme?.colors.secondaryLightActive.value,
                      fill: theme?.colors.secondarySolidHover.value,
                    }}
                  />
                }
                title="Pocketpase"
              />
            </Grid>
            <Grid className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4">
              <MockItems
                text="The best CSS framework for Next.js. Tailwind and NextUI."
                icon={
                  <SiTailwindcss
                    size={34}
                    className="rounded-full p-[0.3rem]"
                    style={{
                      backgroundColor: theme?.colors.secondaryLightActive.value,
                      fill: theme?.colors.secondarySolidHover.value,
                    }}
                  />
                }
                title="Tailwind & NextUI"
              />
            </Grid>
            <Grid className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4">
              <MockItems
                text="The best framework when it comes to icon."
                icon={
                  <FaReact
                    size={34}
                    className="rounded-full p-[0.4rem]"
                    style={{
                      backgroundColor: theme?.colors.secondaryLightActive.value,
                      fill: theme?.colors.secondarySolidHover.value,
                    }}
                  />
                }
                title="React-Icons"
              />
            </Grid>
            <Grid className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4">
              <MockItems
                text="Dark Mode Solution with Next Color Mode and NextUI and custom logic."
                icon={
                  <MdOutlineDarkMode
                    size={34}
                    className="rounded-full p-[0.3rem]"
                    style={{
                      backgroundColor: theme?.colors.secondaryLightActive.value,
                      fill: theme?.colors.secondarySolidHover.value,
                    }}
                  />
                }
                title="Dark Mode"
              />
            </Grid>
            <Grid className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4">
              <MockItems
                text="i18n with Next.js and Next-Translate for internationalization."
                icon={
                  <BsTranslate
                    size={34}
                    className="rounded-full p-2"
                    style={{
                      backgroundColor: theme?.colors.secondaryLightActive.value,
                      fill: theme?.colors.secondarySolidHover.value,
                    }}
                  />
                }
                title="i18n - Coming Soon"
              />
            </Grid>
            <Grid className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4">
              <MockItems
                text="Formik and Yup for easy and hasslefree forms and form validation."
                icon={
                  <FaWpforms
                    size={34}
                    className="rounded-full p-2"
                    style={{
                      backgroundColor: theme?.colors.secondaryLightActive.value,
                      fill: theme?.colors.secondarySolidHover.value,
                    }}
                  />
                }
                title="Formik - Coming Soon"
              />
            </Grid>
          </Grid.Container>
        </Container>
        <ColorSwitcher />
      </main>
    </>
  );
}
