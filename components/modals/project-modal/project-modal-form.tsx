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
import { ZodError } from "zod";
import { generateSection } from "@/lib/utils";
import { motion } from "framer-motion";
import { useModal } from "@/hooks/useModal";

export default function ProjectModalForm() {
  const [sections, setSections] = useState<Section[]>([generateSection()]);
  const [errors, setErrors] = useState<ZodError>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { closeModal } = useModal();
  const sectionsLimit = sections.length > 4;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function addSection() {
    if (sectionsLimit) return;
    setSections((prevTasks) => [...prevTasks, generateSection()]);
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    index: number
  ) {
    const newSectionObject = {
      id,
      created_at: "",
      name: e.target.value,
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

    const result = ProjectSchema.safeParse({ projectName, sectionNames });

    if (!result.success) {
      setErrors(result.error);
      console.log("errr", result.error.errors);
    } else {
      await createProjectAction(formData);
      closeModal();
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
        <motion.div
          className="flex flex-col gap-2 mt-2"
          key={section.id}
          initial={sections.length > 1 && { x: -45, opacity: 0 }}
          animate={sections.length > 1 && { x: 0, opacity: 1 }}
        >
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
          type="button"
          disabled={sectionsLimit}
          onClick={addSection}
          className="rounded-full"
        >
          + Add Section
        </Button>
        <SubmitButton formAction={formAction} className="rounded-full">
          Submit
        </SubmitButton>
      </div>
    </form>
  );
}
