import type { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";
import NavBar from "../components/NavBar";
import { exo2, orbitron } from "./fonts";

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

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en' className={`${exo2.variable} ${orbitron.variable}`}>
      <body className='bg-orange-50 flex flex-col px-4 py-2 min-h-screen'>
        <header>
          <NavBar />
        </header>
        <main className='grow py-3'>{children}</main>
        <footer className='border-t text-center text-slate-500 text-xs'>
          <div>
            Game data and images courtesy of{" "}
            <a href='https://rawg.io/' target='_blank' className='text-orange-800 hover:underline'>
              RAWG
            </a>
          </div>
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
