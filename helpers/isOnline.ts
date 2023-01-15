// Importing types
import type { authData } from "../types/user";

//Fire the function
export default function isOnline({ authData }: { authData: authData }) {
  // Return false if the user was not active in the last 5 minutes
  const lastActive = Math.floor(new Date(authData.lastActive).getTime() / 1000);
  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5;
  if (fiveMinutesAgo - lastActive > 301) return false;
  // Return true if the user is online
  return true;
}
