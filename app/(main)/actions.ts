"use server";

import { ProjectSchema, TaskSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createProjectAction(formData: FormData) {
  const projectName = formData.get("project-name")?.toString();
  const sectionNames = formData.getAll("section-name");
  const supabase = createClient();

  const result = ProjectSchema.safeParse({ projectName, sectionNames });

  if (!result.success) {
    return console.error(result.error);
  }

  const { data, error } = await supabase
    .from("projects")
    .insert([{ name: projectName }])
    .select("id")
    .single();

  if (error) console.error(error);

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
}

export async function createSectionAction(id: string, formData: FormData) {
  const name = formData.get("new-section")?.toString();
  const supabase = createClient();

  const { error } = await supabase
    .from("sections")
    .insert([{ name, project_id: id }]);

  if (error) return console.error(error);

  revalidatePath("/project");
}

export async function createTaskAction(id: string, formData: FormData) {
  const taskName = formData.get("task-name")?.toString();
  const subtaskNames = formData.getAll("subtask-name");
  const supabase = createClient();

  const result = TaskSchema.safeParse({ taskName, subtaskNames });

  if (!result.success) {
    return console.error(result.error);
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert([{ name: taskName, section_id: id }])
    .select("id")
    .single();

  if (error) console.error(error);

  if (subtaskNames) {
    for (const name of subtaskNames) {
      const { error } = await supabase.from("subtasks").insert([
        {
          name,
          task_id: data?.id,
        },
      ]);
      if (error) console.error(error);
    }
  }
}
