"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export type ViewModeType = "board" | "list";

interface ViewModeContextInterface {
  viewMode: ViewModeType;
  setViewMode: Dispatch<SetStateAction<ViewModeType>>;
}

const localViewMode = localStorage.getItem("viewMode") as ViewModeType;

const initialState: ViewModeContextInterface = {
  viewMode: localViewMode ?? "board",
  setViewMode: () => null,
};

export const ViewModeContext =
  createContext<ViewModeContextInterface>(initialState);

export default function ViewModeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [viewMode, setViewMode] = useState<ViewModeType>(localViewMode);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}
