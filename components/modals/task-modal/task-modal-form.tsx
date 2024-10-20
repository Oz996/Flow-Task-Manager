import { createTaskAction } from "@/app/(main)/actions";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskSchema } from "@/lib/schemas";
import { Subtask } from "@/lib/types";
import { generateSubtask } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { ZodError } from "zod";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useModal } from "@/hooks/useModal";

export default function TaskModalForm() {
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [errors, setErrors] = useState<ZodError>();

  const { closeModal } = useModal();
  const searchParams = useSearchParams();

  const sectionId = searchParams.get("id");

  const subtasksLimit = subtasks.length > 5;

  function addSubtask() {
    if (subtasksLimit) return;
    setSubtasks((prevSubtasks) => [...prevSubtasks, generateSubtask()]);
  }

  function removeSubtask(id: string) {
    const newSubtasks = subtasks.filter((subtask) => subtask.id !== id);
    setSubtasks(newSubtasks);
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    index: number
  ) {
    const newSubtask: Subtask = {
      id,
      created_at: "",
      edited_at: "",
      name: e.target.value,
    };

    const subtasksList = [...subtasks];
    subtasksList[index] = newSubtask;

    setSubtasks(subtasksList);
  }

  async function formAction(formData: FormData) {
    const taskName = formData.get("task-name")?.toString();
    const subtasks = formData.getAll("subtask-name");

    const result = TaskSchema.safeParse({ taskName, subtasks });

    if (!result.success) {
      setErrors(result.error);
      console.log(result.error.errors);
    } else {
      await createTaskAction(sectionId as string, formData);
      //   closeModal()
    }
  }

  return (
    <div>
      <form>
        <div className="flex flex-col gap-2">
          <Label htmlFor="task-name">Task name</Label>
          <Input id="task-name" name="task-name" placeholder="Task name" />
        </div>

        {subtasks.map((subtask, index) => (
          <motion.div
            className="flex flex-col gap-2 mt-2"
            key={subtask.id}
            initial={{ x: -45, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Label htmlFor={subtask.id} className="text-sm">
              Subtask name
            </Label>
            <div className="flex gap-2">
              <Input
                id={subtask.id}
                value={subtask.name}
                onChange={(e) => handleChange(e, subtask.id, index)}
              />
              {subtasks.length > 0 && (
                <Button
                  type="button"
                  className="bg-transparent hover:bg-transparent px-1 py-2 text-black"
                  onClick={() => removeSubtask(subtask.id)}
                >
                  <X />
                </Button>
              )}
            </div>
          </motion.div>
        ))}

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
