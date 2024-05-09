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
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  console.log("[ReviewsPage] rendering:", page);
  // console.log("[ReviewsPage] reviews:", reviews);
  // console.log(
  //   "[ReviewsPage] reviews:",
  //   reviews.map(({ slug, title }) => ({ slug, title }))
  // );
  return (
    <>
      <Heading>Reviews</Heading>
      <div className='flex justify-between pb-3'>
        <PaginationBar href='/reviews' page={page} pageCount={pageCount} />
        <SearchBox />
      </div>
      <ul className='flex flex-row flex-wrap justify-center gap-3'>
        {reviews.map((review, index) => (
          <li key={review.slug} className='bg-white border shadow w-80 hover:shadow-xl'>
            <Link href={`/reviews/${review.slug}`}>
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

function parsePageParam(paramValue: string): number {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
