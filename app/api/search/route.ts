// Import the searchReviews function from the reviews library
import { searchReviews } from "@/lib/reviews";
// Import NextRequest and NextResponse from the next/server module
import { NextRequest, NextResponse } from "next/server";

// Define the handler function for GET requests
export async function GET(request: NextRequest) {
  // Extract the 'query' parameter from the request URL
  const query = request.nextUrl.searchParams.get("query");
  // Call the searchReviews function with the extracted query
  const reviews = await searchReviews(query);
  // Return a JSON response containing the search results
  return NextResponse.json(reviews);
}
