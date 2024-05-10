import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { ReactNode } from "react";

// Define interface for PaginationBarProps
export interface PaginationBarProps {
  href: string; // Base URL for pagination links
  page: number; // Current page number
  pageCount: number; // Total number of pages
}

// Define PaginationBar component
export default function PaginationBar({ href, page, pageCount }: PaginationBarProps) {
  return (
    <div className='flex gap-2 items-center pb-3'>
      {/* Previous Page Link */}
      <PaginationLink href={`${href}?page=${page - 1}`} enabled={page > 1}>
        <ChevronLeftIcon className='h-5 w-5' />
        <span className='sr-only'>Previous Page</span>
      </PaginationLink>
      {/* Page Information */}
      <span>
        Page {page} of {pageCount}
      </span>
      {/* Next Page Link */}
      <PaginationLink href={`${href}?page=${page + 1}`} enabled={page < pageCount}>
        <ChevronRightIcon className='h-5 w-5' />
        <span className='sr-only'>Next Page</span>
      </PaginationLink>
    </div>
  );
}

// Define interface for PaginationLinkProps
interface PaginationLinkProps {
  children: ReactNode; // Child elements of PaginationLink
  enabled: boolean; // Indicates if the link is enabled or disabled
  href: string; // Href attribute for the link
}

// Define PaginationLink component
function PaginationLink({ children, enabled, href }: PaginationLinkProps) {
  // If the link is disabled, render a disabled link
  if (!enabled) {
    return <span className='border cursor-not-allowed rounded text-slate-300 text-sm'>{children}</span>;
  }
  // If the link is enabled, render a clickable link
  return (
    <Link
      href={href}
      className='border rounded text-slate-500 text-sm
                 hover:bg-orange-100 hover:text-slate-700'
    >
      {children}
    </Link>
  );
}
