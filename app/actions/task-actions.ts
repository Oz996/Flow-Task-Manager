"use server";
import { taskSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { Label, Subtask, Task, User } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createTaskAction(
  id: string,
  formData: FormData,
  taskData: Task
) {
  const taskName = formData.get("task_name")?.toString();
  const subtaskNames = formData.getAll("subtask-name");
  const taskDescription = formData.get("description")?.toString();
  const supabase = createClient();

  const { priority, profiles, labels } = taskData;

  taskSchema.parse({
    taskName,
    subtaskNames,
    taskDescription,
  });

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
    .single<Task>();

  if (error) throw Error(error.message);

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

  if (labels && labels.length > 0) {
    for (const label of labels) {
      assignLabelAction(label.id, data?.id);
    }
  }

  if (profiles && profiles.length > 0) {
    for (const user of profiles) {
      await assignUserAction(user.id, data?.id);
    }
  }

  revalidatePath("/project");
}

export async function updateTaskAction(
  id: string,
  formData: FormData,
  subtasks: Subtask[],
  taskData: Task,
  sectionId: string
) {
  const taskName = formData.get("task_name")?.toString();
  const subtaskNames = formData.getAll("subtask-name");
  const taskDescription = formData.get("description")?.toString();
  const supabase = createClient();

  const { priority, profiles, labels } = taskData;

  taskSchema.parse({
    taskName,
    subtaskNames,
    taskDescription,
  });

  const { data: task, error } = await supabase
    .from("tasks")
    .update({
      name: taskName,
      description: taskDescription,
      priority,
      section_id: sectionId,
    })
    .eq("id", id)
    .select("*, subtasks (*), profiles (*), labels (*)")
    .single<Task>();

  if (error) throw Error(error.message);

  const subtaskIds = task.subtasks.map((subtask: Subtask) => subtask.id);

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

  const unassignUsers = task?.profiles.filter((user: User) => {
    return profiles?.findIndex((u) => u.id === user.id) === -1;
  });

  if (unassignUsers.length > 0) {
    for (const user of unassignUsers) {
      await removeAssigneeAction(user.id, task.id);
    }
  }

  // checking for labels to unassign

  const unassignLabels = task.labels.filter((label: Label) => {
    return labels?.findIndex((l) => l.id === label.id) === -1;
  });

  if (unassignLabels.length > 0) {
    for (const label of unassignLabels) {
      await removeLabelAction(label.id, task.id);
    }
  }

  if (labels && labels?.length > 0) {
    for (const label of labels) {
      await assignLabelAction(label.id, task.id);
    }
  }

  if (profiles && profiles.length > 0) {
    for (const user of profiles) {
      await assignUserAction(user.id, task.id);
    }
  }

  revalidatePath("/project");
}

export async function createLabelAction(formData: FormData) {
  const labelName = formData.get("label-name")?.toString();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("labels")
    .insert({ name: labelName })
    .select()
    .single<Label>();

  if (error) return console.error(error);
  return data;
}

export async function assignLabelAction(labelId: string, taskId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("task_labels")
    .insert({ task_id: taskId, label_id: labelId });

  if (error) console.error(error);
}

export async function removeLabelAction(labelId: string, taskId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("task_labels")
    .delete()
    .eq("task_id", taskId)
    .eq("label_id", labelId);

  if (error) console.error(error);
}

export async function deleteTaskAction(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) return console.error(error);

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

  if (error) return console.error(error);

  revalidatePath("/project");
}

export async function subtaskCompletedAction(completed: boolean, id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("subtasks")
    .update({ completed: !completed })
    .eq("id", id);

  if (error) return console.error(error);

  revalidatePath("/project");
}
