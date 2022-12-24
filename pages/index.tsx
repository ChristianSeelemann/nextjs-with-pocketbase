//Import components
import Head from "next/head";
import { Button } from "@mui/material";

// Define page props type
type HomeProps = {
  toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
  selectedTheme?: "light" | "dark";
};

// Fire the Home page
export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_META_DESCRIPTION}
        />
      </Head>
      <main>
        <h1>Hello World!!</h1>
        <h2>Hello World!</h2>
        <h3>Hello World!</h3>
        <h4>Hello World!</h4>
        <h5>Hello World!</h5>
        <h6>Hello World!</h6>
        <p>Normal Body Text</p>
        <p className="italic">Normal Body Text und Italic</p>
        <p className="font-bold">Normal Body Text mit Bold</p>
        <p className="italic font-bold">Normal Body Text mit Bold und Italic</p>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={props.toggleTheme}
          >
            Test
          </Button>
        </div>
      </main>
    </>
  );
}
