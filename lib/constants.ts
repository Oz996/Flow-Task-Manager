import { ViewModeType } from "@/context/view-mode-context";
import { FilterType, OrderType, Section, SortType, Task } from "./types";

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
  section_id: "",
  labels: [],
  profiles: [],
  subtasks: [],
  priority: null,
};

export const taskSortOptions: { name: SortType; value: SortType }[] = [
  { name: "created", value: "created" },
  { name: "assignee", value: "assignee" },
  { name: "label", value: "label" },
  { name: "name", value: "name" },
  { name: "priority", value: "priority" },
];

export const taskOrderOptions: {
  name: "Ascending" | "Descending";
  value: OrderType;
}[] = [
  { name: "Ascending", value: "asc" },
  { name: "Descending", value: "desc" },
];

export const taskFilterOptions: { name: FilterType; value: FilterType }[] = [
  { name: "uncompleted", value: "uncompleted" },
  { name: "completed", value: "completed" },
  { name: "my tasks", value: "my tasks" },
];

export const iconSize = 18;
