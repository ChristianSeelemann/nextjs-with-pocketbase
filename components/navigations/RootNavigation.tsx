// Import components
import { Navbar, Text, Badge } from "@nextui-org/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import ColorSwitcher from "../interactive/ColorSwitcher";

const collapseItems = ["Features", "Customers", "Pricing"];

export default function RootNavigation() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const shortUrl = router.asPath.split("/")[1];

  return (
    <>
      <Navbar
        variant="sticky"
        className="fixed"
        shouldHideOnScroll
        maxWidth="xl"
      >
        <Navbar.Brand className="gap-4">
          <Navbar.Toggle aria-label="Toggle Navigation" />
          <Text h1 className="text-xl m-0 uppercase tracking-wide">
            {t("sitename")}
          </Text>
          <Badge color="secondary" size="sm" variant="flat">
            ALPHA
          </Badge>
        </Navbar.Brand>
        <Navbar.Content
          variant="underline-rounded"
          activeColor="secondary"
          enableCursorHighlight
        >
          <Link href="/" locale={router.locale}>
            <Navbar.Item isActive={router.pathname === "/" ? true : false}>
              Home
            </Navbar.Item>
          </Link>
          <Link href="/user" locale={router.locale}>
            <Navbar.Item isActive={shortUrl === "user" ? true : false}>
              User
            </Navbar.Item>
          </Link>
          <Link href="/dashboard" locale={router.locale}>
            <Navbar.Item isActive={shortUrl === "dashboard" ? true : false}>
              Dashboard
            </Navbar.Item>
          </Link>
          <Link href="/login" locale={router.locale}>
            <Navbar.Item
              isActive={shortUrl === "login" ? true : false}
              onClick={() => {
                setCookie("redirect_after_login", router.asPath);
              }}
            >
              Login
            </Navbar.Item>
          </Link>
          <Navbar.Item>
            <ColorSwitcher shadow />
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse transitionTime={300}>
          {collapseItems.map((item) => (
            <Navbar.CollapseItem key={item}>
              <Link href="/" className="text-inherit w-full">
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
