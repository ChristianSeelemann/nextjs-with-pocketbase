// Imoport components
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";

// Import icons
import { IoMoon, IoSunny } from "react-icons/io5";
import { useEffect, useState } from "react";

// Fire the component
export default function ColorSwitcher({
  size,
  shadow,
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shadow?: boolean;
}) {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  // Set loading state
  const [isLoading, setIsLoading] = useState(true);

  // Set loading state to false when component is mounted
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Return empty switch if loading
  if (isLoading) return <Switch shadow size="lg" disabled />;

  // Return switch
  return (
    <Switch
      checked={isDark}
      initialChecked={isDark}
      shadow={shadow ? shadow : false}
      color="secondary"
      size={size ? size : "lg"}
      iconOn={<IoMoon className="text-yellow-100" />}
      iconOff={<IoSunny className="text-yellow-500" />}
      onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
    />
  );
}
