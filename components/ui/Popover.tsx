// Import Components
import { Button, Grid, Popover as UIPopover } from "@nextui-org/react";

// Import types
import { authData } from "../../types/user";

type Props = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  text: string;
  authData?: authData;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  width?: string;
  offset?: number;
  padding?: string;
};

export default function Popover({
  children,
  icon,
  text,
  isOpen,
  setIsOpen,
  width,
  offset,
  padding,
}: Props) {
  return (
    <UIPopover
      offset={offset ? offset : -60}
      isOpen={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
    >
      <UIPopover.Trigger>
        <Button color="error" icon={icon ? icon : null} className="rounded-md">
          {text}
        </Button>
      </UIPopover.Trigger>
      <UIPopover.Content className="rounded-lg">
        <Grid.Container
          css={{
            padding: padding ? padding : "0.75rem",
            maxWidth: width ? width : "22rem",
          }}
        >
          {children}
        </Grid.Container>
      </UIPopover.Content>
    </UIPopover>
  );
}
