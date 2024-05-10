import type { Metadata } from "next";
import Heading from "../../components/Heading";

// Define metadata for the About page
export const metadata: Metadata = {
  title: "About", // Set the title of the page
};

// Define the functional component for rendering the About page
export default function AboutPage() {
  return (
    <>
      <Heading>About</Heading>
      <p>A website created to learn Next.js</p>
    </>
  );
}
