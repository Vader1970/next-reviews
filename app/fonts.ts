// Import the Exo_2 and Orbitron font families from the Google Fonts API
import { Exo_2, Orbitron } from "next/font/google";

// Define a function to load the Exo_2 font family
export const exo2 = Exo_2({
  // Specify the subsets of characters to include (in this case, Latin characters)
  subsets: ["latin"],
  // Define the CSS variable name for Exo_2 font family
  variable: "--font-exo2",
});

// Define a function to load the Orbitron font family
export const orbitron = Orbitron({
  // Specify the subsets of characters to include (in this case, Latin characters)
  subsets: ["latin"],
  // Define the CSS variable name for Orbitron font family
  variable: "--font-orbitron",
});
