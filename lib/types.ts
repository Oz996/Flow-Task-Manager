import { PriorityType } from "@/components/modals/task-modal/task-modal-form";

export interface Task {
  id: string;
  created_at: string;
  edited_at: string;
  name: string;
  completed: boolean;
  description: string;
  subtasks: Subtask[];
  priority: PriorityType;
  labels: Label[];
  profiles: User[];
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

export interface UserObject {
  id: string;
  user_metadata: User;
}

export interface Label {
  id: string;
  name: string;
}
