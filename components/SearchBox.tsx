"use client";

import { useIsClient } from "@/lib/hooks";
import type { SearchableReview } from "@/lib/reviews";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// Define interface for SearchBoxProps
export interface SearchBoxProps {
  reviews: SearchableReview[]; // Array of searchable reviews
}

// Define SearchBox component
export default function SearchBox() {
  // Initialize router and isClient hook
  const router = useRouter();
  const isClient = useIsClient();

  // Initialize state variables for query and debounced query
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);

  // Initialize state variable for search results
  const [reviews, setReviews] = useState([]);

  // Fetch search results based on debounced query
  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = "/api/search?query=" + encodeURIComponent(debouncedQuery);
        const response = await fetch(url, { signal: controller.signal });
        const reviews = await response.json();
        setReviews(reviews);
      })();
      return () => controller.abort(); // Cleanup function to abort fetch if component unmounts or query changes
    } else {
      setReviews([]); // Clear search results if query length is less than 2
    }
  }, [debouncedQuery]);

  // Function to handle selection from dropdown menu
  const handleChange = (review: SearchableReview) => {
    if (review && review.slug) {
      router.push(`/reviews/${review.slug}`); // Navigate to selected review page
    }
  };

  // If not running on the client-side, return null
  if (!isClient) {
    return null;
  }

  // Render search box with dropdown menu
  return (
    <div className='relative w-48'>
      <Combobox onChange={handleChange}>
        <ComboboxInput
          placeholder='Search...'
          value={query}
          onChange={(event) => setQuery(event.target.value)} // Update query state as user types
          className='border px-2 py-1 rounded w-full'
        />
        <ComboboxOptions className='absolute bg-white py-1 w-full'>
          {reviews.map((review) => (
            <ComboboxOption key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full
              ${active ? "bg-orange-100" : ""}
              `}
                >
                  {review.title}
                </span>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
