"use client";

// Hero Icons
// Import LinkIcon from Hero Icons
import { LinkIcon } from "@heroicons/react/20/solid";
import { useState } from "react"; // Import useState hook

// Define ShareLinkButton component
export default function ShareLinkButton() {
  // Initialize state variable to track whether button is clicked
  const [clicked, setClicked] = useState(false);

  // Function to handle button click event
  const handleClick = () => {
    // Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    // Set clicked state to true and reset after 1.5 seconds
    setClicked(true);
    setTimeout(() => setClicked(false), 1500);
  };

  // Render ShareLinkButton component
  return (
    <button
      onClick={handleClick} // Attach handleClick function to button click event
      className='border flex gap-1 items-center px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700'
    >
      <LinkIcon className='h-4 w-4' /> {/* Render LinkIcon */}
      {/* Conditional rendering based on clicked state */}
      {clicked ? "Link copied!" : "Share link"}
    </button>
  );
}
