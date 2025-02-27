export interface Task {
  id: string;
  section_id: string;
  created_at: string;
  edited_at: string;
  name: string;
  completed: boolean;
  description: string;
  subtasks: Subtask[];
  priority: PriorityType;
  labels: Label[];
  profiles: User[];
  section?: TaskProjectObject;
}

export interface Project {
  id: string;
  created_at: string;
  edited_at: string;
  name: string;
  sections?: Section[];
}

export interface Section {
  id: string;
  created_at: string;
  name: string;
  tasks?: Task[];
}

export interface Subtask {
  id: string;
  created_at: string;
  edited_at: string;
  name: string;
  completed: boolean;
}

export interface User {
  avatar_url: string;
  email: string;
  id: string;
  username: string;
}

export interface Label {
  id: string;
  name: string;
}

export interface TaskProjectObject {
  project: {
    id: string;
    name: string;
  };
}

export type SortType =
  | "created"
  | "name"
  | "assignee"
  | "priority"
  | "label"
  | "";

export type OrderType = "asc" | "desc" | "";

export interface SortOptionsType {
  sort: SortType;
  order: OrderType;
}

export type PriorityType = "low" | "medium" | "high" | null;

export type FilterType = "completed" | "uncompleted" | "my tasks" | "";
