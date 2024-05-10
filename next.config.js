//1. Images Configuration: Configure image optimization settings.
//2. Remote Patterns: Specify remote image URL patterns for optimization.
//3. toRemotePattern Function: Function to convert environment variable URL string to remote pattern object.
//4. URL Parsing: Parse the URL string into a URL object and extract its components.
//5. Remote Pattern Object: Return an object representing the remote image URL pattern with the extracted components.
//6. Exported Configuration: Exported configuration object includes the images property with remotePatterns configured to match the remote image URL patterns.

/** @type {import('next').NextConfig} */
module.exports = {
  // Configure image optimization settings
  images: {
    // Specify remote image URL patterns for optimization
    remotePatterns: [toRemotePattern(process.env.CMS_IMAGE_PATTERN)],
  },
};

// Function to convert environment variable URL string to remote pattern object
function toRemotePattern(urlString) {
  // Parse the URL string into a URL object
  const url = new URL(urlString);

  // Extract URL components for the remote pattern
  return {
    protocol: url.protocol.replace(":", ""), // Remove colon from protocol
    hostname: url.hostname, // Extract hostname
    port: url.port, // Extract port
    pathname: url.pathname, // Extract pathname
  };
}
