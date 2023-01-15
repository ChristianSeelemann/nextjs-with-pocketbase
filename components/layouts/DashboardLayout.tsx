// Import components
import { Container } from "@nextui-org/react";
import DashboardNavigation from "../navigations/DashboardNavigation";

// Import types
import type { authData } from "../../types/user";

type Props = {
  children: React.ReactNode;
  authData: {
    authData: authData;
    isLoggedIn: boolean;
    roles: string[];
  };
};

// Fire up the layout
export default function DashboardLayout({ children, authData }: Props) {
  return (
    <Container display="flex" wrap="nowrap" xl>
      <aside className="w-72">
        <DashboardNavigation
          authData={authData.authData}
          isLoggedIn={authData.isLoggedIn}
          roles={authData.roles}
        />
      </aside>
      <main className="flex-1">{children}</main>
    </Container>
  );
}
