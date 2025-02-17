"use client";
import { Input } from "@/components/ui/input";
import classNames from "classnames";
import {
  CircleCheck,
  ClipboardList,
  Frown,
  Search,
  User as UserIcon,
  X,
} from "lucide-react";
import { ChangeEvent, ReactNode, useRef, useState } from "react";
import SearchLists from "./search-lists";
import { iconSize } from "@/lib/constants";
import { useElementFocus } from "@/hooks/use-element-focus";
import useSearchData from "../hooks/use-search-data";

export type FilterType = "tasks" | "projects" | "people";

export interface SearchFilterOptions {
  name: FilterType;
  value: FilterType;
}
const initialValue: SearchFilterOptions[] = [
  { name: "tasks", value: "tasks" },
  { name: "projects", value: "projects" },
  { name: "people", value: "people" },
];

const intialFilters: FilterType[] = ["tasks", "projects", "people"];

export default function Searchbar() {
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchFilterOptions, setSearchFilterOptions] = useState(initialValue);
  const [searchFilter, setSearchFilter] = useState(intialFilters);

  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { searchData, setSearchData, isLoading, intialData } =
    useSearchData(searchValue);

  useElementFocus(isActive, () => setIsActive(false), overlayRef);

  const emptyValues = Object.values(searchData).every((val) => {
    return val.length === 0;
  });

  const noResults = searchValue && emptyValues;

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
    const iconMap: Record<string, JSX.Element> = {
      tasks: (
        <CircleCheck
          size={iconSize - 3}
          strokeWidth={1}
          className="text-green-600"
        />
      ),
      projects: (
        <ClipboardList
          size={iconSize - 3}
          strokeWidth={1}
          className="text-blue-600"
        />
      ),
      people: (
        <UserIcon
          size={iconSize - 3}
          strokeWidth={1}
          className="text-violet-600"
        />
      ),
    };

    return iconMap[value];
  }

  return (
    <div ref={overlayRef}>
      <div className="relative text-white z-20">
        {!isActive && (
          <Search className="absolute left-4 top-[.4rem]" size={iconSize + 2} />
        )}

        <Input
          ref={inputRef}
          value={searchValue}
          onClick={openOverlay}
          onChange={handleSearch}
          aria-label="Search for tasks/projects/people"
          className={classNames({
            "rounded-full w-[20rem] md:w-[30rem] pl-10 placeholder:text-white bg-[#494a54] border-none h-[2.1rem]":
              true,
            "pl-5 bg-white placeholder:text-black text-black ring-2 ring-ring ring-offset-2":
              isActive,
          })}
          placeholder="Search"
        />
      </div>

      {isActive && (
        <div
          className={classNames({
            "fixed flex flex-col inset-0 right-10 w-[30rem] md:w-[33rem] h-[30rem] mx-auto bg-background text-primary rounded shadow-2xl overflow-y-auto z-10":
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
                    size={iconSize - 3}
                    onClick={handleResetFilter}
                    className=""
                  />
                )}
              </button>
            ))}
          </div>

          {renderContent()}
        </div>
      )}
    </div>
  );

  function renderContent() {
    if (noResults) return renderNoResults();
    else if (isLoading) return renderLoading();
    else if (searchValue) return renderResults();
    else if (isLoading) renderLoading();
    else return renderPlaceholder();
  }

  function renderNoResults() {
    return (
      <ContentDiv className="flex gap-1 items-center pt-10 px-6">
        <Frown size={iconSize + 2} strokeWidth={1} />
        <span>{`No results for ${searchValue}`}</span>
      </ContentDiv>
    );
  }

  function renderLoading() {
    return (
      <ContentDiv className="pt-16 px-6">
        <span>Loading...</span>
      </ContentDiv>
    );
  }

  function renderResults() {
    return (
      <SearchLists
        searchData={searchData}
        searchFilter={searchFilter}
        closeOverlay={closeOverlay}
      />
    );
  }

  function renderPlaceholder() {
    return (
      <ContentDiv className="flex gap-1 items-center pt-10 px-6">
        <Search size={iconSize + 2} strokeWidth={1} />
        <span>Search for tasks, projects or people</span>
      </ContentDiv>
    );
  }

  interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
  }

  function ContentDiv({ children, className, ...props }: DivProps) {
    return (
      <div {...props} className={`${className} "pt-10 px-6"`}>
        {children}
      </div>
    );
  }
}
