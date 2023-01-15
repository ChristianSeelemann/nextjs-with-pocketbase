//Import Components
import { Container, Text } from "@nextui-org/react";

export default function PageHeading({ text }: { text: string }) {
  return (
    <Container xl>
      <Text h2>{text}</Text>
    </Container>
  );
}
