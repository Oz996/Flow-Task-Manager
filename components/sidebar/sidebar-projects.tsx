import React from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import ProjectModal from "../modals/project-modal/project-modal";

export default async function SidebarProjects() {
  const supabase = createClient();
  const { data: projects } = await supabase.from("projects").select("id, name");

  return (
    <nav className="py-5 px-4">
      <div className="flex justify-between items-center font-semibold px-3">
        <h2>Projects</h2>
        <ProjectModal type="add" />
      </div>
      <ul>
        {projects?.map((project) => (
          <li key={project.id} className="px-3 py-2">
            <Link href={`/project/${project.id}`} className="text-ellipsis">
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
