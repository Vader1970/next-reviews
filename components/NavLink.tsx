"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define interface for NavLinkProps
export interface NavLinkProps {
  children: ReactNode; // Child elements of NavLink
  href: string; // Href attribute for the link
  prefetch?: boolean; // Optional prefetch attribute
}

// Define NavLink component
export default function NavLink({ children, href, prefetch }: NavLinkProps) {
  // Get the current pathname using usePathname hook
  const pathname = usePathname();
  // Check if the href matches the current pathname
  if (href === pathname) {
    // If the href matches, render the children with orange text color
    return <span className='text-orange-800'>{children}</span>;
  }
  // If the href doesn't match the current pathname, render a Link component
  return (
    <Link href={href} prefetch={prefetch} className='text-orange-800 hover:underline'>
      {children}
    </Link>
  );
}
