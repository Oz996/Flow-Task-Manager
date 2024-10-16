import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../../submit-button";
import { createProjectAction } from "@/app/(main)/actions";
import { Section } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import ProjectModalButtons from "./project-modal-buttons";
import { ProjectSchema } from "@/lib/schemas";
import FormError from "@/app/(auth)/components/form-error";
import { ZodError, ZodIssue } from "zod";
import { useLocation } from "@/hooks/useLocation";

export const initialSections: Section = {
  id: crypto.randomUUID(),
  created_at: "",
  name: "",
};
export default function ProjectModalForm() {
  const [sections, setSections] = useState<Section[]>([initialSections]);
  const [errors, setErrors] = useState<ZodIssue[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { closeModal } = useLocation();
  const sectionsLimit = sections.length > 4;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function addSection() {
    if (sectionsLimit) return;
    setSections((prevTasks) => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        created_at: "",
        name: "",
      },
    ]);
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    index: number
  ) {
    const newName = e.target.value;

    const newSectionObject = {
      id,
      created_at: "",
      name: newName,
    };

    const sectionsArray = [...sections];
    sectionsArray[index] = newSectionObject;

    setSections(sectionsArray);
  }

  function removeSection(id: string) {
    const newTasks = sections.filter((task) => task.id !== id);
    setSections(newTasks);
  }

  async function formAction(formData: FormData) {
    const projectName = formData.get("project-name")?.toString();
    const sectionNames = formData.getAll("section-name");

    try {
      ProjectSchema.parse({ projectName, sectionNames });
      await createProjectAction(formData);
      closeModal();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error);
        setErrors(error.errors);
      }
    }
  }

  return (
    <form>
      <div className="flex flex-col gap-2">
        <ProjectModalButtons inputRef={inputRef} setSections={setSections} />
        <Label htmlFor="project-name" className="text-sm">
          Project Name
        </Label>
        <Input
          ref={inputRef}
          name="project-name"
          id="project-name"
          placeholder="Project name"
        />
      </div>
      {sections.map((section, index) => (
        <div className="flex flex-col gap-2 mt-2">
          <Label htmlFor={section.id} className="text-sm">
            Section Name
          </Label>
          <div className="flex gap-2">
            <Input
              name="section-name"
              id={section.id}
              placeholder="Section name"
              value={section.name}
              onChange={(e) => handleChange(e, section.id, index)}
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

      {errors.length > 0 && (
        <div className="flex flex-col gap-1 mt-5">
          {errors.map((error) => (
            <FormError error={error?.message} />
          ))}
        </div>
      )}

      <div className="w-full flex flex-col gap-3 mt-5">
        <Button
          type="button"
          disabled={sectionsLimit}
          onClick={addSection}
          className="rounded-full"
        >
          + Add Section{" "}
        </Button>
        <SubmitButton formAction={formAction} className="rounded-full">
          Submit
        </SubmitButton>
      </div>
    </form>
  );
}
