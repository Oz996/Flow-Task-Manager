import { ViewModeContext } from "@/context/view-mode-context";
import { useContext } from "react";

export function useViewMode() {
  const context = useContext(ViewModeContext);

  if (!context) throw Error("Cannot use ViewModeContext outside its provider");

  return context;
}
