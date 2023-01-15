// Import components
import { Grid, Row, Text } from "@nextui-org/react";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function PageSection({ title, children }: Props) {
  return (
    <Grid.Container as="section" className="mb-8">
      <Row>
        <Text h3>{title}</Text>
      </Row>
      {children}
    </Grid.Container>
  );
}
