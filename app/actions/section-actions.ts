"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createSectionAction(id: string, formData: FormData) {
  const name = formData.get("new-section")?.toString();
  const supabase = createClient();

  const { error } = await supabase
    .from("sections")
    .insert([{ name, project_id: id }]);

  if (error) return console.error(error);

  revalidatePath("/project");
}

export async function updateSectionAction(id: string, formData: FormData) {
  const name = formData.get("section-name")?.toString();
  const supabase = createClient();

  const { error } = await supabase
    .from("sections")
    .update({ name })
    .eq("id", id);

  if (error) return console.error(error);

  revalidatePath("/project");
}

export async function deleteSectionAction(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("sections").delete().eq("id", id);

  if (error) return console.error(error);

  revalidatePath("/project");
}
