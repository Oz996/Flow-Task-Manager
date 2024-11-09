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

const initialState: ViewModeContextInterface = {
  viewMode: "board",
  setViewMode: () => null,
};

export const ViewModeContext =
  createContext<ViewModeContextInterface>(initialState);

export default function ViewModeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [viewMode, setViewMode] = useState<ViewModeType>("board");

  useEffect(() => {
    const storedViewMode = localStorage.getItem("viewMode") as ViewModeType;
    if (storedViewMode) {
      setViewMode(storedViewMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}
