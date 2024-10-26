"use server";

import { ProjectSchema, TaskSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { Subtask, User } from "@/lib/types";
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

export async function createTaskAction(
  id: string,
  formData: FormData,
  assignees?: User[]
) {
  const taskName = formData.get("task_name")?.toString();
  const subtaskNames = formData.getAll("subtask-name");
  const taskDescription = formData.get("description")?.toString();
  const supabase = createClient();

  const result = TaskSchema.safeParse({
    taskName,
    subtaskNames,
    taskDescription,
  });

  if (!result.success) {
    return console.error(result.error);
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        name: taskName,
        description: taskDescription,
        section_id: id,
      },
    ])
    .select("id")
    .single();

  if (error) console.error(error);

  if (subtaskNames.length > 0) {
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

  if (assignees && assignees.length > 0) {
    for (const user of assignees) {
      await assignUserAction(user.id, data?.id);
    }
  }
  revalidatePath("/project");
}

export async function updateTaskAction(
  id: string,
  formData: FormData,
  subtasks: Subtask[],
  assignees?: User[]
) {
  const taskName = formData.get("task_name")?.toString();
  const subtaskNames = formData.getAll("subtask-name");
  const taskDescription = formData.get("description")?.toString();
  const supabase = createClient();

  const result = TaskSchema.safeParse({
    taskName,
    subtaskNames,
    taskDescription,
  });

  if (!result.success) {
    return console.error(result.error);
  }

  const { data: task, error: taskError } = await supabase
    .from("tasks")
    .select("*, subtasks (*), task_assignments ( profiles (*))")
    .eq("id", id)
    .single();

  if (taskError) console.error(taskError);

  const subtaskIds = task.subtasks.map((subtask: Subtask) => subtask.id);

  const { data, error } = await supabase
    .from("tasks")
    .update({ name: taskName, description: taskDescription })
    .eq("id", id)
    .select("id")
    .single();

  if (error) console.error(error);

  // checking for subtasks to delete

  const deleteSubtasks = task.subtasks.filter((subtask: Subtask) => {
    return subtasks.findIndex((sub) => sub.id === subtask.id) === -1;
  });

  for (const subtask of deleteSubtasks) {
    const { error } = await supabase
      .from("subtasks")
      .delete()
      .eq("id", subtask.id);

    if (error) console.error(error);
  }

  if (subtaskNames.length > 0) {
    for (let i = 0; i < subtaskNames.length; i++) {
      const name = subtaskNames[i];
      const id = subtaskIds[i];

      const { error } = await supabase
        .from("subtasks")
        .update([{ name }])
        .eq("id", id);
      if (error) console.error(error);
    }
  }

  if (assignees && assignees.length > 0) {
    for (const user of assignees) {
      await assignUserAction(user.id, data?.id);
    }
  }
  revalidatePath("/project");
}

export async function assignUserAction(userId: string, taskId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("task_assignments")
    .insert({ user_id: userId, task_id: taskId });

  if (error) console.error(error);
}

export async function updateSubtaskAction(completed: boolean, id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("subtasks")
    .update({ completed: !completed })
    .eq("id", id);

  if (error) console.error(error);

  revalidatePath("/project");
}
