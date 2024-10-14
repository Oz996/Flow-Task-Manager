"use server";

import { createClient } from "@/lib/supabase/server";

export async function createProjectAction(
  formData: FormData,
  projectId: string
) {
  const projectName = formData.get("project-name")?.toString();
  const supabase = createClient();

  const {} = await supabase.from("projects").insert([
    {
      name: projectName,
    },
  ]);
}
