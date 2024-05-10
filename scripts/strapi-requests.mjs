// Script file fetches data from a Strapi API endpoint and writes the response to a JSON file.
import { writeFileSync } from "fs"; // Import writeFileSync function from the 'fs' module
import qs from "qs"; // Import qs library for query string parsing

// Define the URL of the Strapi API endpoint with query parameters
const url =
  "http://next-reviews-cms.encoded.io/api/reviews" + // Base URL of the API endpoint
  "?" + // Start of query parameters
  qs.stringify(
    // Serialize query parameters using qs library
    {
      fields: ["slug", "title", "subtitle", "publishedAt", "body"], // Fields to include in the response
      populate: { image: { fields: ["url"] } }, // Include image field with its URL
      sort: ["publishedAt:desc"], // Sort reviews by published date in descending order
      pagination: { pageSize: 6, page: 1 }, // Paginate results, 6 items per page, first page
    },
    { encodeValuesOnly: true } // Option to encode values only in the query string
  );

// Fetch data from the API endpoint
const response = await fetch(url);

// Parse the response body as JSON
const body = await response.json();

// Format the JSON with 2-space indentation
const formatted = JSON.stringify(body, null, 2);

// Define the file path to write the JSON data
const file = "scripts/strapi-response.json";

// Write the formatted JSON data to a file synchronously
writeFileSync(file, formatted, "utf8");
