// Import statements for required modules

// Importing "server-only" to indicate this file is for server-side use only
import "server-only";

// Importing the "marked" library for Markdown processing
import { marked } from "marked";
// Importing the "qs" library for query string manipulation
import qs from "qs";

// Define a constant for cache tag used in caching
export const CACHE_TAG_REVIEWS = "reviews";

// Define the base URL of the CMS obtained from environment variables
const CMS_URL = process.env.CMS_URL;

// Interface for the CMS item
interface CmsItem {
  id: number;
  attributes: any;
}

// Interface for a review
export interface Review {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
}

// Interface for a full review including body
export interface FullReview extends Review {
  body: string;
}

// Interface for paginated reviews
export interface PaginatedReviews {
  pageCount: number;
  reviews: Review[];
}

// Interface for a searchable review (used in search functionality)
export type SearchableReview = Pick<Review, "slug" | "title">;

// Function to fetch a single review by slug
export async function getReview(slug: string): Promise<FullReview | null> {
  // Fetch reviews based on parameters including the slug
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  // If no review is found, return null
  if (data.length === 0) {
    return null;
  }
  // Extract the review data from the response
  const item = data[0];

  // Process the body of the review using the marked library
  const body = await marked(item.attributes.body);
  // Return the review object with processed body
  return {
    ...toReview(item),
    body: body,
  };
}

// Function to fetch reviews with pagination support
export async function getReviews(pageSize: number, page?: number): Promise<PaginatedReviews> {
  // Fetch reviews based on parameters including pagination
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize, page },
  });
  // Return paginated reviews along with metadata
  return {
    pageCount: meta.pagination.pageCount,
    reviews: data.map(toReview),
  };
}

// Function to search reviews based on a query string
export async function searchReviews(query: string): Promise<SearchableReview[]> {
  // Fetch reviews based on parameters including search query
  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ["slug", "title"],
    sort: ["title"],
    pagination: { pageSize: 5 },
  });
  // Return searchable reviews based on the query
  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}

// Function to fetch slugs of all reviews
export async function getSlugs(): Promise<string[]> {
  // Fetch reviews to obtain their slugs
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  // Extract and return slugs from the fetched reviews
  return data.map((item: CmsItem) => item.attributes.slug);
}

// Internal function to fetch reviews from the CMS
async function fetchReviews(parameters: any) {
  // Construct the URL with query parameters
  const url = `${CMS_URL}/api/reviews?` + qs.stringify(parameters, { encodeValuesOnly: true });
  // Fetch reviews from the constructed URL
  const response = await fetch(url, {
    next: {
      tags: [CACHE_TAG_REVIEWS], // Add cache tag to the response
    },
  });
  // If the response is not OK, throw an error
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  // Parse and return the JSON response
  return await response.json();
}

// Function to convert a CMS item to a review object
function toReview(item: CmsItem): Review {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: new URL(attributes.image.data.attributes.url, CMS_URL).href,
  };
}
