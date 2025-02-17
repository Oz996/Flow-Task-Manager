import React from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import ProjectModal from "../modals/project-modal/project-modal";
import { House } from "lucide-react";
import { iconSize } from "@/lib/constants";

export default async function SidebarProjects() {
  const supabase = createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, name")
    .order("created_at", { ascending: true });

  return (
    <nav className="py-5 px-4">
      <ul className="flex flex-col md:hidden mb-2 border-b border-main-border_secondary">
        <li>
          <Link
            href="/"
            className="flex gap-2 items-center font-semibold rounded-lg px-3 py-2 hover:bg-main-light duration-200"
          >
            <House size={iconSize} />
            <span>Home</span>
          </Link>
        </li>
      </ul>

      <div className="flex justify-between items-center font-semibold px-3">
        <h2>Projects</h2>
        <ProjectModal type="add" />
      </div>

      <ul>
        {projects?.map((project) => (
          <li key={project.id} className="px-3 py-1 md:py-2">
            <Link href={`/project/${project.id}`} className="text-ellipsis">
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
