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
  const [sections, setSections] = useState<Task[]>([initialTasks]);

  const sectionsLimit = sections.length > 4;

  function addTask() {
    if (sectionsLimit) return;
    setSections((prevTasks) => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        created_at: "",
        edited_at: "",
        name: "",
      },
    ]);
  }

  function removeSection(id: string) {
    const newTasks = sections.filter((task) => task.id !== id);
    setSections(newTasks);
  }

  return (
    <form className="space-y-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="project-name">Project Name</Label>
        <Input
          name="project-name"
          id="project-name"
          placeholder="Project name"
        />
      </div>

      {sections.map((section) => (
        <div className="flex flex-col gap-2">
          <Label htmlFor={section.id}>Section Name</Label>
          <div className="flex gap-2">
            <Input
              name="section-name"
              id={section.id}
              placeholder="Section name"
            />
            {sections.length > 1 && (
              <Button
                type="button"
                className="bg-transparent hover:bg-transparent px-1 py-2 text-black"
                onClick={() => removeSection(section.id)}
              >
                <X />
              </Button>
            )}
          </div>
        </div>
      ))}

      <div className="w-full flex flex-col gap-2 mt-2">
        <Button type="button" disabled={sectionsLimit} onClick={addTask}>
          + Add Task{" "}
        </Button>
        <SubmitButton formAction={createProjectAction}>Submit</SubmitButton>
      </div>
    </form>
  );
}
