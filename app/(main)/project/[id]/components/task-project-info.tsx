import TooltipContainer from "@/components/tooltip-container";
import Link from "next/link";

interface TaskProjectInfoProps {
  project: { id: string; name: string };
}

export default function TaskProjectInfo({ project }: TaskProjectInfoProps) {
  return (
    <TooltipContainer
      className="bg-main text-white"
      trigger={
        <Link
          href={`/project/${project.id}`}
          className="px-2 py-1 text-sm rounded capitalize bg-cyan-400"
        >
          {project.name}
        </Link>
      }
    >
      <p>Click to view all tasks in this project</p>
    </TooltipContainer>
  );
}
