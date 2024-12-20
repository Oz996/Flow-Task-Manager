import { z } from "zod";

export const projectSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(1, { message: "Project name is required" })
    .max(50, { message: "Project should be at least less than 50 characters" }),
  sectionNames: z
    .array(
      z
        .string()
        .trim()
        .min(1, { message: "Section name is required" })
        .max(50, { message: "Section name should be less than 50 characters" })
        .regex(/^[^,]*$/, { message: "Section name cannot contain commas" })
    )
    .nonempty({ message: "At least one section is required for a project" }),
});

export const taskSchema = z.object({
  taskName: z
    .string()
    .trim()
    .min(1, { message: "Task name is required" })
    .max(50, { message: "Task name should be less than 50 characters" }),
  subtaskNames: z
    .array(
      z
        .string()
        .trim()
        .min(1, { message: "Subtask name is required" })
        .max(100, {
          message: "Subtask name should be less than 100 characters",
        })
        .regex(/^[^,]*$/, { message: "Subtask name cannot contain commas" })
    )
    .optional(),
  taskDescription: z
    .string()
    .max(150, { message: "Description should be less than 150 characters" }),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, { message: "Password should be at least 6 characters" }),
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export const usernameEmailSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Username should be at least 3 characters" }),
    email: z.string().trim().email(),
  })
  .refine((data) => data.username !== "" && data.email !== "", {
    message: "Email and username are required",
    path: ["username", "email"],
  });
