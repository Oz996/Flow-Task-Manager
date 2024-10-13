import { createClient } from "./server";

export async function userSession() {
  const {
    data: { user },
    error,
  } = await createClient().auth.getUser();

  if (error) {
    console.error(error.message);
    return null;
  }

  if (!user) return null;

  return user;
}
