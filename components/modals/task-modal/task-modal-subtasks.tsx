import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Subtask } from "@/lib/types";
import { motion } from "framer-motion";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import RemoveButton from "../remove-button";

interface TaskModalSubtasksProps {
  subtasks: Subtask[];
  setSubtasks: Dispatch<SetStateAction<Subtask[]>>;
}

export default function TaskModalSubtasks({
  subtasks,
  setSubtasks,
}: TaskModalSubtasksProps) {
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

  function removeSubtask(id: string) {
    const newSubtasks = subtasks.filter((subtask) => subtask.id !== id);
    setSubtasks(newSubtasks);
  }

  return (
    <>
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
              <RemoveButton onClick={() => removeSubtask(subtask.id)} />
            )}
          </div>
        </motion.div>
      ))}
    </>
  );
}
