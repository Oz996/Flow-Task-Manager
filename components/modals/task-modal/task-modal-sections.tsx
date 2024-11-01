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
  sections: Section[];
  sectionId: string;
  setSectionId: Dispatch<SetStateAction<string>>;
}

export default function TaskModalSections({
  sections,
  sectionId,
  setSectionId,
}: TaskModalSectionsProps) {
  const [sectionName, setSectionName] = useState<string>("");

  useEffect(() => {
    const section = sections.find((section) => section.id === sectionId);
    setSectionName(section?.name as string);
    console.log("first", section);
  }, [sectionId]);
  console.log("sectionName", sectionName);

  function handleChange(id: string) {
    setSectionId(id);
  }

  return (
    <div className="flex flex-col gap-2 py-2">
      <Label>Task status</Label>
      <Select value={sectionId ?? sections[0].id} onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={sectionName ?? sections[0].name} />
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
