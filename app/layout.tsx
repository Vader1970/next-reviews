import type { ReactNode } from "react";
import "./globals.css";
import NavBar from "../components/NavBar";
import { exo2, orbitron } from "./fonts"; // Import font styles

// Metadata for the website
export const metadata = {
  title: {
    default: "Indie Gamer",
    template: "%s | Indie Gamer",
  },
  description: "Only the best indie games, reviewed for you.",
  keywords: ["Next.js", "React", "Typescript"],
  creator: "Daniel Wilkey",
  publisher: "Pixel Perfect Web Designs",
};

// Props for the Layout component
interface LayoutProps {
  children: ReactNode; // Children nodes
}

// Layout component
export default function RootLayout({ children }: LayoutProps) {
  return (
    // HTML document structure
    <html lang='en' className={`${exo2.variable} ${orbitron.variable}`}>
      <body className='bg-orange-50 flex flex-col px-4 py-2 min-h-screen'>
        {/* Header section */}
        <header>
          <NavBar /> {/* Render NavBar component */}
        </header>

        {/* Main content section */}
        <main className='grow py-3'>{children}</main>

        {/* Footer section */}
        <footer className='border-t text-center text-slate-500 text-xs'>
          {/* Credits for game data */}
          <div>
            Game data and images courtesy of{" "}
            <a href='https://rawg.io/' target='_blank' className='text-orange-800 hover:underline'>
              RAWG
            </a>
          </div>

          {/* Credits for website development */}
          <div>
            Website developed by{" "}
            <a
              href='https://www.pixelperfectwebdesigns.co.nz/'
              target='_blank'
              className='text-orange-800 hover:underline'
            >
              Pixel Perfect Web Designs
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
