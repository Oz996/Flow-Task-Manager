import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Project, Task, User } from "@/lib/types";

export interface SearchData {
  tasks: Task[];
  users: User[];
  projects: Project[];
}

const intialData: SearchData = {
  tasks: [],
  users: [],
  projects: [],
};

export default function useSearchData(searchValue: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState(intialData);

  useEffect(() => {
    if (!searchValue.trim()) return;

    const fetchResults = async () => {
      const supabase = createClient();

      setIsLoading(true);
      const [{ data: tasks }, { data: projects }, { data: users }] =
        await Promise.all([
          supabase
            .from("tasks")
            .select("*, section:sections (project:projects (id, name))")
            .ilike("name", `${searchValue}%`),

          supabase.from("projects").select().ilike("name", `${searchValue}%`),

          supabase
            .from("profiles")
            .select()
            .ilike("username", `${searchValue}%`),
        ]);

      setIsLoading(false);
      setSearchData({ tasks, projects, users } as SearchData);
    };
    fetchResults();
  }, [searchValue]);

  return { searchData, setSearchData, intialData, isLoading };
}
