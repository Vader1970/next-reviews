import Image from "next/image";
import Heading from "../components/Heading";
import { getReviews } from "../lib/reviews";
import Link from "next/link";

// Home Page component
export default async function HomePage() {
  // Fetching the latest 3 reviews from the API
  const { reviews } = await getReviews(3);

  // Render the Home Page
  return (
    <>
      {/* Page Heading */}
      <Heading>Indie Gamer</Heading>
      {/* Page Description */}
      <p className='pb-3'>Only the best indie games, reviewed for you.</p>
      {/* List of Reviews */}
      <ul className='flex flex-col gap-3'>
        {/* Mapping through each review */}
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className='bg-white border rounded shadow w-80
                       hover:shadow-xl sm:w-full'
          >
            {/* Link to Review Page */}
            <Link href={`/reviews/${review.slug}`} className='flex flex-col sm:flex-row'>
              {/* Review Image */}
              <Image
                src={review.image}
                alt=''
                priority={index === 0}
                width='320'
                height='180'
                className='rounded-t sm:rounded-l sm:rounded-r-none'
              />
              {/* Review Details */}
              <div className='px-2 py-1 text-center sm:text-left'>
                {/* Review Title */}
                <h2 className='font-orbitron font-semibold'>{review.title}</h2>
                {/* Review Subtitle */}
                <p className='hidden pt-2 sm:block'>{review.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
