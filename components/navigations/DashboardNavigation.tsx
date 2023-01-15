// Import components
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Badge, Card, Collapse, Text } from "@nextui-org/react";
import Tooltip from "../ui/Tooltip";

// Import icons
import { IoMdSettings } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import {
  FaChevronLeft,
  FaUsers,
  FaUsersSlash,
  FaUserEdit,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { BiUserPin } from "react-icons/bi";

// Import types
import type { authData } from "../../types/user";

type Props = {
  authData: authData;
  isLoggedIn: boolean;
  roles: string[];
};

// Items for main navigation
const mainItems = [
  { name: "Dashboard", href: "/dashboard", icon: <MdSpaceDashboard /> },
  { name: "Settings", href: "/dashboard/settings", icon: <IoSettingsSharp /> },
  { name: "Show Profile", href: "/user/me", icon: <BiUserPin /> },
  { name: "Edit Profile", href: "/user/me/edt", icon: <FaUserEdit /> },
];

// Items for user navigation
const userItems = [
  { name: "User List", href: "/user", icon: <FaUsers /> },
  { name: "Banned Users", href: "/user", icon: <FaUsersSlash /> },
];

// Fire up the navigation
export default function DashboardNavigation({
  authData,
  isLoggedIn,
  roles,
}: Props) {
  const router = useRouter();

  return (
    <Collapse.Group splitted className="p-0">
      <Collapse
        className="!rounded-lg select-none !mt-0 !px-0 !shadow-md"
        css={{
          background: "$gray50!important",
        }}
        title={
          <Text h3 size="$xl">
            Settings
          </Text>
        }
        subtitle={
          <Text size="$sm" color="$accents8" className="!-mt-1">
            Manage your settings
          </Text>
        }
        expanded
        arrowIcon={<IoMdSettings className="mr-3" />}
        contentLeft={
          <Avatar
            size="md"
            src={
              authData.avatar
                ? process.env.NEXT_PUBLIC_API_URL +
                  "/api/files/users/" +
                  authData.id +
                  "/" +
                  authData.avatar +
                  "?thumb=100x100"
                : authData.avatarUrl
                ? authData.avatarUrl
                : ""
            }
            color={authData.showOnline ? "success" : "gradient"}
            text={
              authData.firstName && authData.lastName
                ? authData.firstName[0] + authData.lastName[0]
                : authData.name
                ? authData.name.substring(0, 3)
                : authData.username.substring(0, 3).toUpperCase()
            }
            bordered
            squared
            className="cursor-pointer ml-3"
          />
        }
      >
        <nav className="!-mb-3">
          {mainItems.map((item) => (
            <Link href={item.href} locale={router.locale} key={item.name}>
              <Card
                variant="flat"
                isPressable
                className={
                  router.asPath === item.href
                    ? "rounded-none !mb-1 active"
                    : "rounded-none !mb-1"
                }
                css={{
                  "&:hover": {
                    backgroundColor: "$accents4",
                  },
                  "&.active": {
                    backgroundColor: "$accents3",
                  },
                }}
              >
                <Card.Body className="py-2 flex-row items-center gap-4">
                  {item.icon}
                  <Text className="tracking-normal">{item.name}</Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </nav>
      </Collapse>

      {isLoggedIn && roles && roles.some((item) => ["Superadmin", "Admin"]) && (
        <Collapse
          className="!rounded-lg select-none !mt-0 !px-0 !shadow-md"
          css={{
            background: "$gray50!important",
          }}
          title={
            <Text h3 size="$xl" className="!ml-3">
              User Management
              <Badge
                color="secondary"
                isSquared
                disableOutline
                size="sm"
                className="!ml-3 !-mt-[2px] tracking-wide"
              >
                <Tooltip
                  text="This is a admin section. Please be careful!"
                  offset={95}
                  color="error"
                >
                  <>Admin</>
                </Tooltip>
              </Badge>
            </Text>
          }
          subtitle={
            <Text size="$sm" color="$accents8" className="!-mt-1 !ml-3">
              Manage user and permissions
            </Text>
          }
          arrowIcon={<FaChevronLeft className="mr-3" />}
        >
          <nav className="!-mb-3">
            {userItems.map((item) => (
              <Link href={item.href} locale={router.locale} key={item.name}>
                <Card
                  variant="flat"
                  isPressable
                  className={
                    router.asPath === item.href
                      ? "rounded-none !mb-1 active"
                      : "rounded-none !mb-1"
                  }
                  css={{
                    "&:hover": {
                      backgroundColor: "$accents4",
                    },
                    "&.active": {
                      backgroundColor: "$accents3",
                    },
                  }}
                >
                  <Card.Body className="py-2 flex-row items-center gap-4">
                    {item.icon}
                    <Text className="tracking-normal">{item.name}</Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </nav>
        </Collapse>
      )}
    </Collapse.Group>
  );
}
