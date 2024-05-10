// This custom hook useIsClient is used to determine whether the code is being executed on the client-side or server-side.
import { useEffect, useState } from "react";

// Custom hook to determine if the code is running on the client-side
export function useIsClient() {
  // Initialize state variable to false, indicating that we're not on the client yet
  const [isClient, setIsClient] = useState(false);
  // useEffect hook to update the state once the component is mounted
  // Update the state to true once the component is mounted and rendered on the client-side
  useEffect(() => setIsClient(true), []); // Empty dependency array ensures that the effect runs only once after initial render
  // Return the current value of isClient
  return isClient;
}
