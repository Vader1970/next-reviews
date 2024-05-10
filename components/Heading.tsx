// Heading Component

// Import ReactNode type from React to handle children props
import type { ReactNode } from "react";

// Define props interface for the Heading component
export interface HeadingProps {
  children: ReactNode; // ReactNode type for children props
}

// Define the Heading component
export default function Heading({ children }: HeadingProps) {
  // Render a heading element with the provided children
  return <h1 className='font-bold font-orbitron pb-3 text-2xl'>{children}</h1>;
}
