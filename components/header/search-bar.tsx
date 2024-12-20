"use client";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { Project, Task, User } from "@/lib/types";
import classNames from "classnames";
import {
  CircleCheck,
  ClipboardList,
  Frown,
  Search,
  User as UserIcon,
  X,
} from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchLists from "./search-lists";

export type FilterType = "tasks" | "projects" | "people";

export interface SearchFilterOptions {
  name: FilterType;
  value: FilterType;
}

export interface SearchData {
  tasks: Task[];
  users: User[];
  projects: Project[];
}

const initialValue: SearchFilterOptions[] = [
  { name: "tasks", value: "tasks" },
  { name: "projects", value: "projects" },
  { name: "people", value: "people" },
];

const intialFilters: FilterType[] = ["tasks", "projects", "people"];

const intialData: SearchData = {
  tasks: [],
  users: [],
  projects: [],
};

export default function Searchbar() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState(intialData);
  const [searchFilterOptions, setSearchFilterOptions] = useState(initialValue);
  const [searchFilter, setSearchFilter] = useState(intialFilters);

  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const emptyValues = Object.values(searchData).every((val) => {
    return val.length === 0;
  });

  const noResults = searchValue && emptyValues;

  // handling focusing and click outside directly in component instead of useElementFocus hook since it requires some additional functionality
  useEffect(() => {
    if (isActive) {
      const alwaysFocused = (e: MouseEvent) => {
        if (
          overlayRef.current &&
          overlayRef.current.contains(e.target as Node)
        ) {
          // preventing blur effect with preventDefault
          e.preventDefault();
          inputRef.current?.focus();
        } else {
          setIsActive(false);
        }
      };

      document.addEventListener("mousedown", alwaysFocused);

      return () => {
        document.removeEventListener("mousedown", alwaysFocused);
      };
    }
  }, [isActive]);

  useEffect(() => {
    if (searchValue) {
      const supabase = createClient();
      const fetchResults = async () => {
        setIsLoading(true);
        const { data: tasksData, error: tasksError } = await supabase
          .from("tasks")
          .select("*, section:sections (project:projects (id, name))")
          .ilike("name", `${searchValue}%`);

        if (tasksError) console.error(tasksError.message);

        const { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select()
          .ilike("name", `${searchValue}%`);

        if (projectsError) console.error(projectsError.message);

        const { data: usersData, error: usersError } = await supabase
          .from("profiles")
          .select()
          .ilike("username", `${searchValue}%`);

        if (usersError) console.error(usersError.message);

        const tasks = tasksData as Task[];
        const users = usersData as User[];
        const projects = projectsData as Project[];

        setSearchData({
          tasks,
          users,
          projects,
        });
        setIsLoading(false);
      };
      fetchResults();
    }
  }, [searchValue]);

  function openOverlay() {
    setIsActive(true);
  }

  function closeOverlay() {
    setIsActive(false);
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchValue(value);

    if (!value) {
      setSearchData(intialData);
    }
  }

  function handleSearchFilter(value: FilterType) {
    if (searchFilter.length > 1) {
      setSearchFilter([value]);

      const newList = searchFilterOptions.filter((option) => {
        return option.value === value;
      });
      setSearchFilterOptions(newList);
    }
  }

  function handleResetFilter() {
    setSearchFilter(intialFilters);
    setSearchFilterOptions(initialValue);
  }

  function displayIcon(value: string) {
    const iconSize = 15;

    const iconMap: Record<string, JSX.Element> = {
      tasks: (
        <CircleCheck
          size={iconSize}
          strokeWidth={1}
          className="text-green-600"
        />
      ),
      projects: (
        <ClipboardList
          size={iconSize}
          strokeWidth={1}
          className="text-blue-600"
        />
      ),
      people: (
        <UserIcon size={iconSize} strokeWidth={1} className="text-violet-600" />
      ),
    };

    return iconMap[value] || null; // Return null if value is not in the map
  }

  return (
    <div ref={overlayRef}>
      <div className="relative text-white z-20">
        {!isActive && (
          <Search className="absolute left-4 top-[.4rem]" size={20} />
        )}

        <Input
          ref={inputRef}
          value={searchValue}
          onClick={openOverlay}
          onChange={handleSearch}
          aria-label="Search for tasks/projects"
          className={classNames({
            "rounded-full w-[30rem] px-10 placeholder:text-white bg-main-light border-none h-[2.1rem]":
              true,
            "px-5 bg-white placeholder:text-black text-black border-black":
              isActive,
          })}
          placeholder="Search"
        />
      </div>

      {isActive && (
        <div
          className={classNames({
            "fixed flex flex-col inset-0 right-10 w-[33rem] max-h-[30rem] mx-auto bg-white text-primary rounded shadow-2xl overflow-y-auto z-10":
              true,
            "max-h-[12rem]": noResults || !searchValue,
          })}
        >
          <div className="flex gap-2 pt-16 px-6">
            {searchFilterOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleSearchFilter(option.value)}
                className={classNames({
                  "flex gap-1 items-center py-1 px-3 border border-gray-300 rounded-full":
                    true,
                  "border-blue-500": searchFilter.length === 1,
                })}
              >
                {displayIcon(option.value)}

                <span>{option.name}</span>

                {searchFilter.length === 1 && (
                  <X
                    role="button"
                    aria-label="Reset search filter"
                    size={15}
                    onClick={handleResetFilter}
                    className=""
                  />
                )}
              </button>
            ))}
          </div>

          {noResults ? (
            <div className="flex gap-1 items-center pt-10 px-6">
              <Frown size={20} />
              <span>{`No results for ${searchValue}`}</span>
            </div>
          ) : isLoading ? (
            <div className="pt-16 px-6">
              <span>Loading...</span>
            </div>
          ) : (
            <SearchLists
              searchData={searchData}
              searchFilter={searchFilter}
              closeOverlay={closeOverlay}
            />
          )}
        </div>
      )}
    </div>
  );
}
