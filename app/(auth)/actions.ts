"use server";
import { PasswordSchema, UsernameEmailSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { userSession } from "@/lib/supabase/user-session";
import { encodedNavigation } from "@/lib/utils";
import { revalidateTag } from "next/cache";
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
      "Username should be at least 3 characters"
    );
  }

  if (password !== cPassword) {
    return encodedNavigation("sign-up", "Passwords do not match");
  }

  // Handle profile picture upload if provided
  // Using user Id as the image name to connect the user to the image
  const generateAvatarUrl = async () => {
    if (picture) {
      const fileExt = picture.name.split(".").pop();
      const filePath = `public/${crypto.randomUUID()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, picture);

      if (error) console.error(error.message);

      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;
    }
    return null;
  };

  const avatarUrl = await generateAvatarUrl();

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        email,
        username,
        avatar_url: avatarUrl,
      },
    },
  });

  if (error) {
    console.error(error.message);
    return encodedNavigation("sign-up", error.message);
  }

  return redirect("/home");
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
  redirect("/sign-in");
};

export async function updateNamesAction(id: string, formData: FormData) {
  const username = formData.get("username")?.toString();
  const email = formData.get("email")?.toString();
  const supabase = createClient();

  const result = UsernameEmailSchema.safeParse({ username, email });

  if (!result.success) return console.error(result.error);

  // using custom function to update user and then updating the profiles table
  const { error: userError } = await supabase.rpc("update_user", {
    user_id: id,
    new_email: email,
    new_username: username,
  });

  if (userError) return console.error(userError.message);

  const { error: profileError } = await supabase
    .from("profiles")
    .update([{ username, email }])
    .eq("id", id);

  if (profileError) console.error(profileError.message);
  revalidateTag("user-data");
}

export async function updatePasswordAction(formData: FormData) {
  const password = formData.get("password")?.toString();
  const confirm_password = formData.get("confirm_password")?.toString();
  const supabase = createClient();

  const result = PasswordSchema.safeParse({ password, confirm_password });

  if (!result.success) return console.error(result.error);

  const { error } = await supabase.auth.updateUser({ password });

  if (error) console.error(error);
}

export async function deleteUserAction(id: string) {
  const user = await userSession();

  if (user?.id !== id) {
    return console.error("User is not authorized to delete this account");
  }

  const supabase = createClient();

  // deleting any relations to task assignments before deleting the user
  const { error: taskError } = await supabase
    .from("task_assignments")
    .delete()
    .eq("user_id", id);

  if (taskError) console.error(taskError);

  const { error } = await supabase.rpc("delete_user_self", { uid: id });

  if (error) {
    console.error(error);
  } else {
    await supabase.auth.signOut();
    redirect("/sign-in");
  }
}
