// Import components
import RootFooter from "../footers/RootFooter";
import RootHeader from "../headers/RootHeader";

// Fire up the layout
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mt-[76px] pt-4">
      <RootHeader />
      <main>{children}</main>
      <RootFooter />
    </main>
  );
}
