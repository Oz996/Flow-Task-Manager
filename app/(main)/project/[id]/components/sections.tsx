"use client";
import { Section } from "@/lib/types";
import { useViewMode } from "@/hooks/use-view-mode";
import BoardView from "./board-view";
import Listview from "./list-view";
import { UserObject } from "@/lib/supabase/user-session";

export interface SectionsProps {
  sections: Section[];
  user: UserObject;
}

export default function Sections({ sections, user }: SectionsProps) {
  const { viewMode } = useViewMode();

  if (viewMode === "board") {
    return <BoardView sections={sections} user={user} />;
  }

  if (viewMode === "list") {
    return <Listview sections={sections} user={user} />;
  }
}
