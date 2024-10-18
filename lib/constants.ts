import { ViewModeType } from "@/context/view-mode-context";
import { Section } from "./types";

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

export const viewModeOptions: {
  name: "Board" | "List";
  value: ViewModeType;
}[] = [
  {
    name: "Board",
    value: "board",
  },
  {
    name: "List",
    value: "list",
  },
];
