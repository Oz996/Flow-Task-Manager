import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import React from "react";
import LayoutSelect from "./components/layout-select";
import SectionsGrid from "./components/sections-grid";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("id", params.id)
    .single();

  const project: Project = data;

  return {
    title: `${project.name} - Flow`,
    description: `Manage and edit project ${project.name}`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  // fetching project and sections
  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .select(
      `*, sections (*, tasks (*, subtasks (*), task_assignments ( profiles (*))))`
    )
    .eq("id", params.id)
    .single();

  if (projectError) return null;

  const project: Project = projectData;
  const sections = project?.sections;

  console.log("project", project);

  return (
    <section className="px-8">
      <h1 className="font-bold text-xl">{project.name}</h1>
      <LayoutSelect />
      {sections && <SectionsGrid sections={sections} />}
    </section>
  );
}
