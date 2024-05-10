import { CACHE_TAG_REVIEWS } from "@/lib/reviews";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

// Define a function to handle POST requests
export async function POST(request: NextRequest) {
  // Parse the JSON payload from the request
  const payload = await request.json();
  // Check if the payload is for a review model
  if (payload.model === "review") {
    // If it is, trigger revalidation of the cache tag for reviews
    revalidateTag(CACHE_TAG_REVIEWS);
  }

  // Return a 204 (No Content) response to indicate successful processing
  return new Response(null, { status: 204 });
}
