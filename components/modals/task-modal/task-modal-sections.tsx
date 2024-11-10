import { Section } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

interface TaskModalSectionsProps {
  id: string;
  sections: Section[];
  sectionId: string;
  setSectionId: Dispatch<SetStateAction<string>>;
}

export default function TaskModalSections({
  id,
  sections,
  sectionId,
  setSectionId,
}: TaskModalSectionsProps) {
  const [sectionName, setSectionName] = useState<string>("");

  // if modal is launched in add mode the id retrievied from the URL will the be id of the section meanwhile
  // if its launched in edit mode the id will be the id of the task. making sure to display the correct section name
  useEffect(() => {
    const section =
      sections.find((section) => section.id === id) ??
      sections.find((section) => section.id === sectionId);
    setSectionName(section?.name as string);
  }, [sectionId, id]);

  function handleChange(id: string) {
    setSectionId(id);
  }

  return (
    <div className="flex flex-col gap-2 py-2">
      <Label>Task status</Label>
      <Select value={sectionId ?? sections[0].id} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={sectionName} />
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            <SelectLabel>Priority</SelectLabel>
            {sections.map((section) => (
              <SelectItem key={section.id} value={section.id}>
                {section.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
