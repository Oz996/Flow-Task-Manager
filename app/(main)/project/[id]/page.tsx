import { createClient } from "@/lib/supabase/server";
import { Project, Section } from "@/lib/types";
import React from "react";
import LayoutSelect from "./components/layout-select";
import SectionsGrid from "./components/sections-grid";
import TaskModal from "@/components/modals/task-modal/task-modal";
import { userSession } from "@/lib/supabase/user-session";
import Container from "./components/container";

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
  const user = await userSession();

  // fetching project and sections
  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .select(
      `*, sections (*, tasks (*, subtasks (*), profiles (*), labels (*)))`
    )
    .eq("id", params.id)
    .single();

  if (projectError) return console.error(projectError);

  const project: Project = projectData;
  const sections = project?.sections;

  // console.log("project", project);

  return (
    <section className="w-full px-8 absolute z-0">
      <Container>
        <h1 className="font-bold text-xl">{project.name}</h1>
        <LayoutSelect />
        {sections && <SectionsGrid sections={sections} user={user!} />}
        <TaskModal sections={sections!} />
      </Container>
    </section>
  );
}
