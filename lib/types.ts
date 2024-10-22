export interface Task {
  id: string;
  created_at: string;
  edited_at: string;
  name: string;
  description?: string;
  subtasks?: Subtask[];
  task_assignments?: Profiles[];
}

interface Profiles {
  profiles: User;
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

export interface User {
  avatar_url: string;
  email: string;
  id: string;
  username: string;
}
