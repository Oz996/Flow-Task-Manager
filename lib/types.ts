export interface Task {
  id: string;
  created_at: string;
  edited_at: string;
  name: string;
  description?: string;
}

export interface Project {
  id: string;
  created_at: string;
  edited_at: string;
  name: string;
}

export interface Section {
  id: string;
  created_at: string;
  name: string;
}
