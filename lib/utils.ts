import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { FilterType, Section, SortOptionsType, Subtask } from "./types";
import { PriorityType } from "@/components/modals/task-modal/task-modal-form";
import { UserObject } from "./supabase/user-session";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodedNavigation(path: string, message: string) {
  return redirect(`/${path}?error=${encodeURIComponent(message)}`);
}

export function generateSection(): Section {
  return {
    id: crypto.randomUUID(),
    created_at: "",
    name: "",
  };
}

export function generateSubtask(): Subtask {
  return {
    id: crypto.randomUUID(),
    created_at: "",
    edited_at: "",
    name: "",
    completed: false,
  };
}

export function sortSectionTasks(
  sortOptions: SortOptionsType,
  sections: Section[],
  user: UserObject,
  filter?: FilterType
) {
  const { sort, order } = sortOptions;

  const sortedList = sections.map((section) => ({
    ...section,
    tasks: section.tasks?.toSorted((a, b) => {
      if (sort === "name" && order === "asc") {
        return a.name.localeCompare(b.name);
      }

      if (sort === "name" && order === "desc") {
        return b.name.localeCompare(a.name);
      }

      if (sort === "assignee" && order === "asc") {
        return a.profiles.length - b.profiles.length;
      }

      if (sort === "assignee" && order === "desc") {
        return b.profiles.length - a.profiles.length;
      }

      if (sort === "priority" && order === "asc") {
        return (
          (priorityValue(a.priority) ?? 0) - (priorityValue(b.priority) ?? 0)
        );
      }

      if (sort === "priority" && order === "desc") {
        return (
          (priorityValue(b.priority) ?? 0) - (priorityValue(a.priority) ?? 0)
        );
      }

      if (sort === "label" && order === "asc") {
        return a.labels.length - b.labels.length;
      }

      if (sort === "label" && order === "desc") {
        return b.labels.length - a.labels.length;
      }

      if (sort === "created" && order === "asc") {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }

      if (sort === "created" && order === "desc") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      // default for sorting = "created" & "asc"
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }),
  }));

  if (filter) {
    const filteredList = filterSectionTasks(sortedList, filter, user);
    return filteredList;
  } else {
    return sortedList;
  }
}

function priorityValue(priority: PriorityType) {
  if (priority === "high") return 2;
  if (priority === "medium") return 1;
  if (priority === "low") return 0;
  if (!priority) return -1;
}

function filterSectionTasks(
  sortedList: Section[],
  filter: FilterType,
  user: UserObject
) {
  const filteredList = sortedList.map((section) => ({
    ...section,
    tasks: section.tasks?.filter((task) => {
      if (filter === "completed") {
        return task.completed;
      }
      if (filter === "uncompleted") {
        return !task.completed;
      }
      if (filter === "my tasks") {
        return task.profiles.some((person) => person.id === user.id);
      }
    }),
  }));
  return filteredList;
}
