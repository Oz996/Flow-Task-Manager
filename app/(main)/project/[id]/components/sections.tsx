"use client";
import { Section } from "@/lib/types";
import { UserObject } from "@/lib/supabase/user-session";
import { useViewMode } from "@/hooks/useViewMode";
import BoardView from "./board-view";
import Listview from "./list-view";

export interface SectionsProps {
  sections: Section[];
}

export default function Sections({ sections }: SectionsProps) {
  const { viewMode } = useViewMode();

  if (viewMode === "board") return <BoardView sections={sections} />;

  if (viewMode === "list") return <Listview sections={sections} />;
}
