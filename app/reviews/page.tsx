// This ReviewsPage component is responsible for rendering a page that displays a list of reviews.
// This component fetches reviews based on the provided page size and page number. It then renders the reviews along with pagination controls and a search box. Each review is displayed as a clickable link with an image and title. The parsePageParam function is used to parse and validate the page parameter from the URL query string.

import Image from "next/image";
import Link from "next/link";
import Heading from "../../components/Heading";
import { getReviews } from "../../lib/reviews";
import PaginationBar from "../../components/PaginationBar";
import SearchBox from "../../components/SearchBox";

// export const dynamic = "force-dynamic";
// export const revalidate = 30; //seconds

interface ReviewsPageProps {
  searchParams: { page?: string };
}

export const metadata = {
  title: "Reviews",
};

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  // Parse the page parameter from the searchParams object
  const page = parsePageParam(searchParams.page);
  // Fetch reviews for the current page
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  console.log("[ReviewsPage] rendering:", page);

  // Render the ReviewsPage component
  return (
    <>
      {/* Display the heading */}
      <Heading>Reviews</Heading>
      <div className='flex justify-between pb-3'>
        {/* Display the pagination bar and search box */}
        <PaginationBar href='/reviews' page={page} pageCount={pageCount} />
        <SearchBox />
      </div>
      {/* Display the list of reviews */}
      <ul className='flex flex-row flex-wrap justify-center gap-3'>
        {reviews.map((review, index) => (
          <li key={review.slug} className='bg-white border shadow w-80 hover:shadow-xl'>
            {/* Link to the individual review page */}
            <Link href={`/reviews/${review.slug}`}>
              {/* Display the review image and title */}
              <Image
                src={review.image}
                alt='hollow knight image'
                priority={index === 0}
                width='320'
                height='180'
                className='mb-2 rounded-t'
              />
              <h2 className='font-semibold font-orbitron py-1 text-center'>{review.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// Function to parse the page parameter
function parsePageParam(paramValue: string): number {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
