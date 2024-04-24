import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

export const metadata = {
  title: "Reviews",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();
  // console.log("[ReviewsPage] reviews:", reviews);
  return (
    <>
      <Heading>Reviews</Heading>

      <ul className='flex flex-row flex-wrap justify-center gap-3'>
        {reviews.map((review) => (
          <li key={review.slug} className='bg-white border shadow w-80 hover:shadow-xl'>
            <Link href={`/reviews/${review.slug}`}>
              <img src={review.image} alt='hollow knight image' width='320' height='180' className='mb-2 rounded-t' />
              <h2 className='font-semibold font-orbitron py-1 text-center'>{review.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
