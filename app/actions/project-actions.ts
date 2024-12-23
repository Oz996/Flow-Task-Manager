"use server";
import { projectSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProjectAction(formData: FormData) {
  const projectName = formData.get("project-name")?.toString();
  const sectionNames = formData.getAll("section-name");
  const supabase = createClient();

  projectSchema.parse({ projectName, sectionNames });

  const { data, error } = await supabase
    .from("projects")
    .insert([{ name: projectName }])
    .select("id")
    .single<Project>();

  if (error) return console.error(error);

  if (sectionNames.length > 0) {
    for (const name of sectionNames) {
      const { error } = await supabase.from("sections").insert([
        {
          name,
          project_id: data?.id,
        },
      ]);
      if (error) console.error(error);
    }
  }

  redirect(`/project/${data.id}`);
}

export async function updateProjectAction(id: string, formData: FormData) {
  const name = formData.get("name")?.toString();
  const supabase = createClient();

  const { error } = await supabase
    .from("projects")
    .update({ name })
    .eq("id", id);

  console.log("dataa", name, id);
  if (error) return console.error(error);

  revalidatePath("/project");
}

export async function deleteProjectAction(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) return console.error(error);

  redirect("/home");
}
