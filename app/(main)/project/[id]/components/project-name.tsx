"use client";
import { updateProjectAction } from "@/app/(main)/actions";
import EditButton from "@/components/popover-components/edit-button";
import PopoverButton from "@/components/popover-components/popover-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useElementFocus } from "@/hooks/use-element-focus";
import { editProjectSchema } from "@/lib/schemas";
import { Project } from "@/lib/types";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

interface ProjectNameProps {
  project: Project;
}

export default function ProjectName({ project }: ProjectNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(project.name);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useElementFocus(isEditing, reset, inputRef);

  function reset() {
    setIsEditing(false);
    setValue(project.name);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  async function formAction(formData: FormData) {
    const projectName = formData.get("name")?.toString();

    const result = editProjectSchema.safeParse({ projectName });

    if (!result.success) {
      toast.error(result.error.errors[0].message);
    } else {
      await updateProjectAction(project.id, formData);
      setIsEditing(false);
    }
  }

  return (
    <div className="flex gap-2 items-center h-10">
      {isEditing ? (
        <form action={formAction}>
          <input
            ref={inputRef}
            type="text"
            name="name"
            value={value}
            onChange={handleChange}
            className="p-1"
          />
        </form>
      ) : (
        <h1 className="font-bold text-xl">{project.name}</h1>
      )}

      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <PopoverButton labelFor="Project" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[12rem]">
          <EditButton labelFor="project" onClick={() => setIsEditing(true)}>
            Edit project
          </EditButton>
        </PopoverContent>
      </Popover>
    </div>
  );
}
