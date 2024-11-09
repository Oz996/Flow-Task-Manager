import { createTaskAction, updateTaskAction } from "@/app/(main)/actions";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskSchema } from "@/lib/schemas";
import { Label as Section, Subtask, Task } from "@/lib/types";
import { generateSubtask } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
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
import TaskModalSections from "./task-modal-sections";
import { initialTask } from "@/lib/constants";

interface TaskModalFormProps {
  addModal: boolean;
  sections: Section[];
}

export interface EditTaskState {
  task_name: string;
  description?: string;
}

export type PriorityType = "low" | "medium" | "high" | null;

export default function TaskModalForm({
  addModal,
  sections,
}: TaskModalFormProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [sectionId, setSectionId] = useState("");
  const [errors, setErrors] = useState<ZodError>();

  const [isLoading, setIsLoading] = useState(false);

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
            .single<Task>();

          if (taskError) return console.error(taskError);
          console.log("task form", task);

          setTask(task);
          setSubtasks(task.subtasks);
          setSectionId(task.section_id);
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
    return setTask((taskData) => ({
      ...taskData,
      [e.target.id]: e.target.value,
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
      await createTaskAction(sectionId || (id as string), formData, task);
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
      await updateTaskAction(id as string, formData, subtasks, task, sectionId);
      closeModal();
    }
  }

  return (
    <div>
      <form>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Task name</Label>
          <Input
            id="name"
            name="task_name"
            placeholder="Task name"
            value={task.name}
            onChange={handleTaskChange}
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Label htmlFor="description">Task description (optional)</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Task description"
            value={task.description}
            onChange={handleTaskChange}
          />
        </div>
        sectionId
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
        {subtasks.map((subtask, index) => (
          <motion.div
            className="flex flex-col gap-2 mt-2"
            key={subtask.id}
            initial={!subtask.name && { x: -45, opacity: 0 }}
            animate={!subtask.name && { x: 0, opacity: 1 }}
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
