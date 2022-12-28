// Import components
import PocketBase from "pocketbase";

// Import types
import type { GetServerSidePropsContext } from "next";

export default async function initPocketBase(
  context: GetServerSidePropsContext
) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

  // load the store data from cookie
  pb.authStore.loadFromCookie(context.req?.headers?.cookie || "");

  // send new cookie if actual data
  pb.authStore.onChange(() => {
    context.res?.setHeader("set-cookie", pb.authStore.exportToCookie());
  });

  try {
    // get the user data from the server if the auth is valid
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    // clear the auth store if the auth is invalid
    pb.authStore.clear();
  }

  return pb;
}
