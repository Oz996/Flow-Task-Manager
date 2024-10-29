"use server";

import { PriorityType } from "@/components/modals/task-modal/task-modal-form";
import { ProjectSchema, TaskSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { Profiles, Subtask, User } from "@/lib/types";
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
  assignees?: User[],
  priority?: PriorityType
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
        priority,
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
  assignees?: User[],
  priority?: PriorityType
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
    .update({ name: taskName, description: taskDescription, priority })
    .eq("id", id)
    .select("id")
    .single();

  if (error) console.error(error);

  // checking for newly added subtasks

  const newSubtasks = subtasks.filter((subtask) => {
    return (
      task.subtasks.findIndex((sub: Subtask) => sub.id === subtask.id) === -1
    );
  });

  if (newSubtasks.length > 0) {
    for (const subtask of newSubtasks) {
      await addSubtaskAction(subtask.name, task.id);
    }
  }

  // checking for subtasks to delete

  const deleteSubtasks = task.subtasks.filter((subtask: Subtask) => {
    return subtasks.findIndex((sub) => sub.id === subtask.id) === -1;
  });

  if (deleteSubtasks.length > 0) {
    for (const subtask of deleteSubtasks) {
      await deleteSubtaskAction(subtask.id);
    }
  }

  if (subtaskNames.length > 0) {
    for (let i = 0; i < subtaskNames.length; i++) {
      const name = subtaskNames[i];
      const id = subtaskIds[i];
      await updateSubtaskAction(name as string, id);
    }
  }

  // checking for users to unassign

  const users = task.task_assignments.map((user: Profiles) => user.profiles);

  const unassignUsers = users?.filter((user: User) => {
    return assignees?.findIndex((u) => u.id === user.id) === -1;
  });

  if (unassignUsers.length > 0) {
    for (const user of unassignUsers) {
      await removeAssigneeAction(user.id, task.id);
    }
  }

  if (assignees && assignees.length > 0) {
    for (const user of assignees) {
      await assignUserAction(user.id, data?.id);
    }
  }

  revalidatePath("/project");
}

export async function deleteSectionAction(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("sections").delete().eq("id", id);

  if (error) console.error(error);

  revalidatePath("/project");
}

export async function deleteTaskAction(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) console.error(error);

  revalidatePath("/project");
}

export async function addSubtaskAction(name: string, id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("subtasks")
    .insert([{ name, task_id: id }]);

  if (error) console.error(error);
}

export async function updateSubtaskAction(name: string, id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("subtasks")
    .update([{ name }])
    .eq("id", id);

  if (error) console.error(error);
}

export async function deleteSubtaskAction(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("subtasks").delete().eq("id", id);

  if (error) console.error(error);
}

export async function removeAssigneeAction(userId: string, id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("task_assignments")
    .delete()
    .eq("task_id", id)
    .eq("user_id", userId);

  if (error) console.error(error);
}

export async function assignUserAction(userId: string, id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("task_assignments")
    .insert({ user_id: userId, task_id: id });

  if (error) console.error(error);
}

export async function taskCompletedAction(completed: boolean, id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("tasks")
    .update({ completed: !completed })
    .eq("id", id);

  if (error) console.error(error);

  revalidatePath("/project");
}

export async function subtaskCompletedAction(completed: boolean, id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("subtasks")
    .update({ completed: !completed })
    .eq("id", id);

  if (error) console.error(error);

  revalidatePath("/project");
}
