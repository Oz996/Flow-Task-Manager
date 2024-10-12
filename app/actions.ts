"use server";

import { createClient } from "@/lib/supabase/server";
import { encodedNavigation } from "@/lib/utils";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  const cPassword = formData.get("confirm-password")?.toString();
  const picture = formData.get("picture") as File | null;
  const supabase = createClient();

  if (!email || !username || !password) {
    return encodedNavigation(
      "sign-up",
      "Email, username and password are required"
    );
  }

  if (username.length <= 2) {
    return encodedNavigation(
      "sign-up",
      "Username must be at least 3 characters"
    );
  }

  if (password !== cPassword) {
    return encodedNavigation("sign-up", "Passwords do not match");
  }

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        email,
        username,
      },
    },
  });

  // Handle profile picture upload if provided
  // Using user Id as the image name to connect the user to the image
  let pictureUrl = null;
  if (picture) {
    const fileExt = picture?.name.split(".").pop();
    const filePath = `public/${data?.user?.id}.${fileExt}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, picture, {
        cacheControl: "3600",
      });

    if (error) {
      console.error(error.message);
      return encodedNavigation("sign-up", "Image upload failed");
    }

    pictureUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/public/${filePath}`;
  }

  const {} = await supabase.auth.updateUser({
    data: {
      avatar_url: pictureUrl,
    },
  });

  if (error) {
    console.error(error.message);
    return encodedNavigation("sign-up", error.message);
  } else {
    return redirect("/home");
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  if (!email || !password) {
    return encodedNavigation("sign-in", "Email and password are required");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    return encodedNavigation("sign-in", error.message);
  }

  return redirect("/home");
};

export const signOutAction = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await createClient().auth.getUser();
  if (!user) return;

  await supabase.auth.signOut();
};
