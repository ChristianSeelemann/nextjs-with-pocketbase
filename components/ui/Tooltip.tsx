// Import components
import { Tooltip as UITooltip } from "@nextui-org/react";

// Import types
import type { ReactElement } from "react";

type Props = {
  children: ReactElement;
  isAlternative?: boolean;
  text: string;
  alternativeText?: string;
  offset?: number;
  leaveDelay?: number;
  showArrow?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "invert";
  textColor?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error";
  click?: boolean;
};

// Render the tooltip
export default function Tooltip({
  children,
  isAlternative,
  text,
  alternativeText,
  offset,
  leaveDelay,
  showArrow,
  color,
  textColor,
  click,
}: Props) {
  return (
    <UITooltip
      hideArrow={!showArrow}
      color={color || "invert"}
      contentColor={textColor || "default"}
      content={isAlternative ? alternativeText : text}
      offset={offset || 85}
      leaveDelay={leaveDelay || 100}
      trigger={click ? "click" : "hover"}
    >
      {children}
    </UITooltip>
  );
}
