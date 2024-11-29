import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import React from "react";
import { UserObject, userSession } from "@/lib/supabase/user-session";
import Container from "../../../../components/container";
import Sections from "./components/sections";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select()
    .eq("id", params.id)
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
  params: { id: string };
}) {
  const supabase = createClient();
  const user = await userSession();

  // fetching project and sections
  const { data: project, error } = await supabase
    .from("projects")
    .select(
      `*, sections (*, tasks (*, subtasks (*), profiles (*), labels (*)))`
    )
    .eq("id", params.id)
    .order("created_at", { ascending: true })
    .order("created_at", { referencedTable: "sections", ascending: true })
    .single<Project>();

  if (error) return console.error(error);

  const sections = project?.sections;

  // console.log("project", project);

  return (
    <section className="w-full px-8 absolute z-0">
      <Container>
        <h1 className="font-bold text-xl">{project.name}</h1>
        {sections && <Sections sections={sections} user={user as UserObject} />}
      </Container>
    </section>
  );
}
