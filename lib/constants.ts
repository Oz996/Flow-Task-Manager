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

export const viewModeOptions = [
  { name: "Board", value: "board" },
  { name: "List", value: "list" },
] as const;

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

export const taskSortOptions = [
  { name: "Created", value: "created" },
  { name: "Assignee", value: "assignee" },
  { name: "Label", value: "label" },
  { name: "Name", value: "name" },
  { name: "Priority", value: "priority" },
] as const;

export const taskOrderOptions = [
  { name: "Ascending", value: "asc" },
  { name: "Descending", value: "desc" },
] as const;

export const taskFilterOptions = [
  { name: "Uncompleted", value: "uncompleted" },
  { name: "Completed", value: "completed" },
  { name: "My tasks", value: "my tasks" },
] as const;

export const iconSize = 18;
