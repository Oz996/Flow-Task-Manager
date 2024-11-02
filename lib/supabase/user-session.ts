interface UserMetadata {
  avatar_url: string;
  email: string;
  username: string;
}

export interface UserObject {
  id: string;
  user_metadata: UserMetadata;
}

import { createClient } from "./server";

export async function userSession(): Promise<UserObject | null> {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error.message);
    return null;
  }

  if (!data?.user) return null;

  const user: UserObject = {
    id: data.user.id,
    user_metadata: {
      avatar_url: data.user.user_metadata.avatar_url,
      email: data.user.user_metadata.email,
      username: data.user.user_metadata.username,
    },
  };

  return user;
}
