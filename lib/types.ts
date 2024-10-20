export interface Task {
  id: string;
  created_at: string;
  edited_at: string;
  name: string;
  description?: string;
  subtasks?: Subtask[];
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
}
