import Image from "next/image";
import { notFound } from "next/navigation";
import Heading from "../../../components/Heading";
import ShareLinkButton from "../../../components/ShareLinkButton";
import { getReview, getSlugs } from "../../../lib/reviews";

// Define the parameters expected in the dynamic route
interface ReviewPageParams {
  slug: string;
}

// Define the props expected by the ReviewPage component
interface ReviewPageProps {
  params: ReviewPageParams;
}

// Function to generate static parameters for dynamic routes
export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Function to generate metadata for the page
export async function generateMetadata({ params: { slug } }: ReviewPageProps) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

// ReviewPage component
export default async function ReviewPage({ params: { slug } }: ReviewPageProps) {
  // Fetch the review data based on the slug
  const review = await getReview(slug);

  // If review data doesn't exist, return a 404 page
  if (!review) {
    notFound();
  }

  // Render the ReviewPage
  return (
    <>
      {/* Render the heading */}
      <Heading>{review.title}</Heading>
      {/* Render the subtitle */}
      <p className='font-semibold pb-3'>{review.subtitle}</p>
      {/* Render the date and share link button */}
      <div className='flex gap-3 items-baseline'>
        <p className='italic pb-2'>{review.date}</p>
        <ShareLinkButton />
      </div>
      {/* Render the image */}
      <Image src={review.image} alt='stardew valley image' priority width='640' height='360' className='mb-2 rounded' />
      {/* Render the review body */}
      <article dangerouslySetInnerHTML={{ __html: review.body }} className='max-w-screen-sm prose prose-slate' />
    </>
  );
}
