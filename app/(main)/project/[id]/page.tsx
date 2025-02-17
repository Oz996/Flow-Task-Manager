import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import React from "react";
import { UserObject, userSession } from "@/lib/supabase/user-session";
import Container from "../../../../components/container";
import Sections from "./components/sections";
import ProjectName from "./components/project-name";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = createClient();
  const id = (await params).id;
  const { data: project, error } = await supabase
    .from("projects")
    .select()
    .eq("id", id)
    .single<Project>();

  if (error) return console.error(error);

  return {
    title: `${project.name} - Flow`,
    description: `Manage and edit project ${project.name}`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = createClient();
  const id = (await params).id;
  const user = await userSession();

  // fetching project and sections
  const { data: project, error } = await supabase
    .from("projects")
    .select(
      `*, sections (*, tasks (*, subtasks (*), profiles (*), labels (*)))`
    )
    .eq("id", id)
    .order("created_at", { ascending: true })
    .order("created_at", { referencedTable: "sections", ascending: true })
    .single<Project>();

  if (error) return console.error(error);

  const sections = project?.sections;

  // console.log("project", project);

  return (
    <section className="w-full px-8 absolute z-0">
      <Container>
        <ProjectName project={project} />
        {sections && <Sections sections={sections} user={user as UserObject} />}
      </Container>
    </section>
  );
}
