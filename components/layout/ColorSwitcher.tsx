// Imoport components
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";

// Import icons
import { IoMoon, IoSunny } from "react-icons/io5";

// Fire the component
export default function ColorSwitcher() {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <>
      <Switch
        checked={isDark}
        shadow
        size="lg"
        iconOn={<IoMoon className="text-yellow-100" />}
        iconOff={<IoSunny className="text-yellow-500" />}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />
    </>
  );
}
