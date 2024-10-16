import { z } from "zod";

export const ProjectSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(2, { message: "Project name must be greater than 1 character" })
    .max(50, { message: "Project name must be less than 50 characters" })
    .regex(/^[^,]*$/, { message: "Project name cannot contain commas" }),
  sectionNames: z
    .array(
      z
        .string()
        .trim()
        .min(2, { message: "Section name must be greater than 1 character" })
    )
    .nonempty({ message: "At least one section is required for a project" }),
});
