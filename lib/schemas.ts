import { z } from "zod";

export const ProjectSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(2, { message: "Project name must be greater than 1 character" })
    .max(50, { message: "Project name must be less than 50 characters" }),
  sectionNames: z
    .array(
      z
        .string()
        .trim()
        .min(2, { message: "Section name must be greater than 1 character" })
        .max(50, { message: "Section name must be less than 50 characters" })
        .regex(/^[^,]*$/, { message: "Section name cannot contain commas" })
    )
    .nonempty({ message: "At least one section is required for a project" }),
});

export const TaskSchema = z.object({
  taskName: z
    .string()
    .trim()
    .min(2, { message: "Task name must be greater than 1 character" })
    .max(50, { message: "Task name must be less than 50 characters" }),
  subtaskNames: z
    .array(
      z
        .string()
        .trim()
        .min(2, { message: "Subtask name must be greater than 1 character" })
        .max(50, { message: "Subtask name must be less than 50 characters" })
        .regex(/^[^,]*$/, { message: "Subtask name cannot contain commas" })
    )
    .optional(),
  taskDescription: z
    .string()
    .max(150, { message: "Description must be less than 150 characters" }),
});
