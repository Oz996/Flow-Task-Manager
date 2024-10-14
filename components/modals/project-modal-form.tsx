import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../submit-button";
import { createProjectAction } from "@/app/(main)/actions";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const initialTasks: Task = {
  id: crypto.randomUUID(),
  created_at: "",
  edited_at: "",
  name: "",
};

export default function ProjectModalForm() {
  const [formData, setFormData] = useState({});
  const [tasks, setTasks] = useState<Task[]>([initialTasks]);

  const tasksLimit = tasks.length > 4;

  function addTask() {
    if (tasksLimit) return;
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        created_at: "",
        edited_at: "",
        name: "",
      },
    ]);
  }

  function removeTask(id: string) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <form>
      <Label htmlFor="project-name">Name</Label>
      <Input name="project-name" id="project-name" placeholder="Project Name" />
      {tasks.length === 1 ? (
        <>
          <Label htmlFor="task">Name</Label>
          <Input name="task" id="task" placeholder="Task Name" />
        </>
      ) : (
        tasks.map((task) => (
          <>
            <Label htmlFor={task.id}>Name</Label>
            <div className="flex gap-2">
              <Input name="task" id={task.id} placeholder="Task Name" />
              <Button
                type="button"
                className="bg-transparent hover:bg-transparent px-1 py-2 text-black"
                onClick={() => removeTask(task.id)}
              >
                <X />
              </Button>
            </div>
          </>
        ))
      )}

      <div className="w-full flex flex-col gap-2 mt-2">
        <Button type="button" disabled={tasksLimit} onClick={addTask}>
          + Add Task{" "}
        </Button>
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  );
}
