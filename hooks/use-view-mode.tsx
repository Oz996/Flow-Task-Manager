import { ViewModeContext } from "@/context/view-mode-context";
import { use } from "react";

export function useViewMode() {
  const context = use(ViewModeContext);

  if (!context) throw Error("Cannot use ViewModeContext outside its provider");

  return context;
}
