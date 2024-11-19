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
  viewMode: ViewModeType | null;
  setViewMode: Dispatch<SetStateAction<ViewModeType | null>>;
}

const initialState: ViewModeContextInterface = {
  viewMode: null,
  setViewMode: () => null,
};

export const ViewModeContext =
  createContext<ViewModeContextInterface>(initialState);

export default function ViewModeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [viewMode, setViewMode] = useState<ViewModeType | null>(null);

  useEffect(() => {
    const storedViewMode = localStorage.getItem("viewMode") as ViewModeType;
    setViewMode(storedViewMode ?? "board");
  }, []);

  useEffect(() => {
    if (viewMode) {
      localStorage.setItem("viewMode", viewMode);
    }
  }, [viewMode]);

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}
