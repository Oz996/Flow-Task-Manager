import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { taskSchema } from "@/lib/schemas";
import { Section, Subtask, Task } from "@/lib/types";
import { generateSubtask } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";
import { ZodError } from "zod";
import FormError from "@/app/(auth)/components/form-error";
import { Textarea } from "@/components/ui/textarea";
import TaskModalUsers from "./task-modal-users";
import { createClient } from "@/lib/supabase/client";
import TaskModalPriority from "./task-modal-priority";
import TaskModalLabels from "./task-modal-labels";
import TaskModalSections from "./task-modal-sections";
import { initialTask } from "@/lib/constants";
import { toast } from "sonner";
import { SubmitButton } from "@/components/submit-button";
import { createTaskAction, updateTaskAction } from "@/app/actions/task-actions";
import TaskModalSubtasks from "./task-modal-subtasks";

interface TaskModalFormProps {
  addModal: boolean;
  sections: Section[];
  id: string;
  closeModal: () => void;
}

export interface EditTaskState {
  task_name: string;
  description?: string;
}

export default function TaskModalForm({
  id,
  addModal,
  sections,
  closeModal,
}: TaskModalFormProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [sectionId, setSectionId] = useState("");
  const [errors, setErrors] = useState<ZodError>();

  const subtasksLimit = subtasks.length > 5;

  // fetch and set values if editing
  useEffect(() => {
    async function fetchTask() {
      if (!addModal) {
        try {
          const supabase = createClient();
          const { data: task, error: taskError } = await supabase
            .from("tasks")
            .select("*, subtasks (*), profiles (*), labels (*)")
            .eq("id", id)
            .single<Task>();

          if (taskError) return console.error(taskError);

          setTask(task);
          setSubtasks(task.subtasks);
          setSectionId(task.section_id);
        } catch (error: any) {
          console.error(error.message);
        }
      }
    }
    fetchTask();
  }, []);

  function addSubtask() {
    if (subtasksLimit) return;
    setSubtasks((prevSubtasks) => [...prevSubtasks, generateSubtask()]);
  }

  function handleTaskChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    return setTask((taskData) => ({
      ...taskData,
      [e.target.id]: e.target.value,
    }));
  }

  async function addFormAction(formData: FormData) {
    const taskName = formData.get("task_name")?.toString();
    const subtaskNames = formData.getAll("subtask-name");
    const taskDescription = formData.get("description")?.toString();

    const result = taskSchema.safeParse({
      taskName,
      subtaskNames,
      taskDescription,
    });

    if (!result.success) {
      setErrors(result.error);
      console.log(result.error.errors);
    } else {
      closeModal();
      toast.promise(
        createTaskAction(sectionId || (id as string), formData, task),
        {
          loading: "Loading...",
          success: "Task created",
          error: "Failed to create task, try again later",
        }
      );
    }
  }

  async function updateFormAction(formData: FormData) {
    const taskName = formData.get("task_name")?.toString();
    const subtaskNames = formData.getAll("subtask-name");
    const taskDescription = formData.get("description")?.toString();

    const result = taskSchema.safeParse({
      taskName,
      subtaskNames,
      taskDescription,
    });

    if (!result.success) {
      setErrors(result.error);
      console.log(result.error.errors);
    } else {
      closeModal();
      toast.promise(
        updateTaskAction(id as string, formData, subtasks, task, sectionId),
        {
          loading: "Loading...",
          success: "Task updated",
          error: "Failed to update task, try again later",
        }
      );
    }
  }

  function formAction(formData: FormData) {
    addModal ? addFormAction(formData) : updateFormAction(formData);
  }

  return (
    <div>
      <form className="flex flex-col gap-2">
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Task name</Label>
          <Input
            id="name"
            name="task_name"
            placeholder="Task name"
            value={task.name}
            onChange={handleTaskChange}
          />
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <Label htmlFor="description">Task description (optional)</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Task description"
            value={task.description}
            onChange={handleTaskChange}
          />
        </div>

        <TaskModalSections
          id={id as string}
          sections={sections}
          sectionId={sectionId}
          setSectionId={setSectionId}
        />

        <div className="flex gap-2 items-center flex-wrap">
          <TaskModalPriority priority={task.priority} setTask={setTask} />
          <TaskModalLabels assignedLabels={task.labels} setTask={setTask} />
        </div>

        <TaskModalUsers assignedUsers={task.profiles} setTask={setTask} />
        <TaskModalSubtasks subtasks={subtasks} setSubtasks={setSubtasks} />

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
          <SubmitButton formAction={formAction} className="rounded-full">
            Submit
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
