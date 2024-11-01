import { createTaskAction, updateTaskAction } from "@/app/(main)/actions";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskSchema } from "@/lib/schemas";
import { Label as ILabel, Subtask, User } from "@/lib/types";
import { generateSubtask } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ZodError } from "zod";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import FormError from "@/app/(auth)/components/form-error";
import { Textarea } from "@/components/ui/textarea";
import TaskModalUsers from "./task-modal-users";
import { createClient } from "@/lib/supabase/client";
import TaskModalPriority from "./task-modal-priority";
import TaskModalLabels from "./task-modal-labels";

interface TaskModalFormProps {
  addModal: boolean;
}

export interface EditTaskState {
  task_name: string;
  description?: string;
}

export type PriorityType = "low" | "medium" | "high" | null;

export default function TaskModalForm({ addModal }: TaskModalFormProps) {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [assignedUsers, setAssignedUsers] = useState<User[]>([]);
  const [priority, setPriority] = useState<PriorityType>(null);
  const [assignedLabels, setAssignedLabels] = useState<ILabel[]>([]);
  const [errors, setErrors] = useState<ZodError>();

  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState<EditTaskState>({
    task_name: "",
    description: "",
  });

  const { closeModal } = useModal();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const subtasksLimit = subtasks.length > 5;

  // fetch and set values if editing
  useEffect(() => {
    if (!addModal) {
      const fetchTask = async () => {
        setIsLoading(true);
        try {
          const supabase = createClient();
          const { data: task, error: taskError } = await supabase
            .from("tasks")
            .select("*, subtasks (*), profiles (*), labels (*)")
            .eq("id", id)
            .single();

          if (taskError) return console.error(taskError);
          console.log("task", task);

          setEditData({ task_name: task.name, description: task.description });

          if (task.subtasks.length > 0) {
            setSubtasks(task.subtasks);
          }

          if (task.profiles.length > 0) {
            setAssignedUsers(task.profiles);
          }

          if (task.priority) {
            setPriority(task.priority);
          }

          if (task.labels.length > 0) {
            setAssignedLabels(task.labels);
          }
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTask();
    }
  }, []);

  function addSubtask() {
    if (subtasksLimit) return;
    setSubtasks((prevSubtasks) => [...prevSubtasks, generateSubtask()]);
  }

  function removeSubtask(id: string) {
    const newSubtasks = subtasks.filter((subtask) => subtask.id !== id);
    setSubtasks(newSubtasks);
  }

  function handleTaskChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    return setEditData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubtaskChange(
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    index: number
  ) {
    const newSubtask: Subtask = {
      id,
      created_at: "",
      edited_at: "",
      completed: false,
      name: e.target.value,
    };

    const subtasksList = [...subtasks];
    subtasksList[index] = newSubtask;

    setSubtasks(subtasksList);
  }

  async function addFormAction(formData: FormData) {
    const taskName = formData.get("task_name")?.toString();
    const subtaskNames = formData.getAll("subtask-name");
    const taskDescription = formData.get("description")?.toString();

    const result = TaskSchema.safeParse({
      taskName,
      subtaskNames,
      taskDescription,
    });

    if (!result.success) {
      setErrors(result.error);
      console.log(result.error.errors);
    } else {
      await createTaskAction(id as string, formData, assignedUsers, priority);
      closeModal();
    }
  }

  async function updateFormAction(formData: FormData) {
    const taskName = formData.get("task_name")?.toString();
    const subtaskNames = formData.getAll("subtask-name");
    const taskDescription = formData.get("description")?.toString();

    const result = TaskSchema.safeParse({
      taskName,
      subtaskNames,
      taskDescription,
    });

    if (!result.success) {
      setErrors(result.error);
      console.log(result.error.errors);
    } else {
      await updateTaskAction(
        id as string,
        formData,
        subtasks,
        assignedUsers,
        priority,
        assignedLabels
      );
      closeModal();
    }
  }

  return (
    <div>
      <form>
        <div className="flex flex-col gap-2">
          <Label htmlFor="task-name">Task name</Label>
          <Input
            id="task-name"
            name="task_name"
            placeholder="Task name"
            value={editData.task_name}
            onChange={handleTaskChange}
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <Label htmlFor="description">Task description (optional)</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Task description"
            value={editData.description}
            onChange={handleTaskChange}
          />
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          <TaskModalPriority priority={priority} setPriority={setPriority} />
          <TaskModalLabels
            assignedLabels={assignedLabels}
            setAssignedLabels={setAssignedLabels}
          />
        </div>

        <TaskModalUsers
          assignedUsers={assignedUsers}
          setAssignedUsers={setAssignedUsers}
        />

        {subtasks.map((subtask, index) => (
          <motion.div
            className="flex flex-col gap-2 mt-2"
            key={subtask.id}
            initial={{ x: -45, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Label htmlFor={subtask.id} className="sr-only">
              Subtask name
            </Label>
            <div className="flex gap-2">
              <Input
                id={subtask.id}
                name="subtask-name"
                value={subtask.name}
                onChange={(e) => handleSubtaskChange(e, subtask.id, index)}
              />
              {subtasks.length > 0 && (
                <Button
                  type="button"
                  className="bg-transparent hover:bg-transparent px-1 py-2 text-main-light"
                  onClick={() => removeSubtask(subtask.id)}
                >
                  <X />
                </Button>
              )}
            </div>
          </motion.div>
        ))}

        {errors && (
          <div className="flex flex-col gap-1 mt-5">
            {errors.errors.map((error, index) => (
              <FormError error={error?.message} key={index} />
            ))}
          </div>
        )}

        <div className="w-full flex flex-col gap-3 mt-5">
          <Button
            className="rounded-full"
            type="button"
            onClick={addSubtask}
            disabled={subtasksLimit}
          >
            + Add subtask
          </Button>
          {addModal ? (
            <SubmitButton formAction={addFormAction} className="rounded-full">
              Submit
            </SubmitButton>
          ) : (
            <SubmitButton
              formAction={updateFormAction}
              className="rounded-full"
            >
              Submit
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}
