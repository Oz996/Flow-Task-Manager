import { createClient } from "@/lib/supabase/server";
import { Project, Section } from "@/lib/types";
import React from "react";
import LayoutSelect from "./components/layout-select";

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
    .select(`id, name, sections (id, name)`)
    .eq("id", params.id)
    .single();

  const project: any = projectData;

  console.log("project", project);

  // fetching sections related to project

  return (
    <section className="px-8">
      <h1 className="font-bold text-xl">{project.name}</h1>
      <LayoutSelect />
    </section>
  );
}
