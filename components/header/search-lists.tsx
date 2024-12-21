import Link from "next/link";
import { FilterType } from "./search-bar";
import { SearchData } from "./hooks/use-search-data";
import SearchList from "./search-list";

interface SearchListsProps {
  searchData: SearchData;
  searchFilter: FilterType[];
  closeOverlay: () => void;
}

export default function SearchLists({
  searchData,
  searchFilter,
  closeOverlay,
}: SearchListsProps) {
  const { tasks, projects, users } = searchData;

  return (
    <div>
      <SearchList
        title="tasks"
        items={tasks}
        isActive={tasks.length > 0 && searchFilter.includes("tasks")}
        closeOverlay={closeOverlay}
        renderItem={(task) => (
          <Link
            href={`/project/${task.section?.project.id}`}
            className="w-full"
          >
            {task.name}
          </Link>
        )}
      />

      <SearchList
        title="projects"
        items={projects}
        isActive={projects.length > 0 && searchFilter.includes("projects")}
        closeOverlay={closeOverlay}
        renderItem={(project) => (
          <Link href={`/project/${project.id}`} className="w-full">
            {project.name}
          </Link>
        )}
      />

      <SearchList
        title="people"
        items={users}
        isActive={users.length > 0 && searchFilter.includes("people")}
        closeOverlay={closeOverlay}
        renderItem={(user) => <span>{user.username}</span>}
      />
    </div>
  );
}
