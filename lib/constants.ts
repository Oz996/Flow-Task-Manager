import { ViewModeType } from "@/context/view-mode-context";
import { Section, Task } from "./types";

export const projectTemplate: Section[] = [
  {
    id: crypto.randomUUID(),
    created_at: "",
    name: "To do",
  },
  {
    id: crypto.randomUUID(),
    created_at: "",
    name: "Doing",
  },
  {
    id: crypto.randomUUID(),
    created_at: "",
    name: "Completed",
  },
];

export const viewModeOptions: {
  name: "Board" | "List";
  value: ViewModeType;
}[] = [
  { name: "Board", value: "board" },
  { name: "List", value: "list" },
];

export const priorityOptions = [
  { name: "--", value: null },
  { name: "Low", value: "low" },
  { name: "Medium", value: "medium" },
  { name: "High", value: "high" },
] as const;

export const initialTask: Task = {
  id: "",
  created_at: "",
  edited_at: "",
  name: "",
  completed: false,
  description: "",
  labels: [],
  profiles: [],
  subtasks: [],
  priority: null,
};
