import { useModal } from "@/hooks/useModal";
import {
  FilterType,
  OrderType,
  Section,
  SortOptionsType,
  SortType,
} from "@/lib/types";
import { Plus } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SectionPopover from "./section-popover";
import TaskCard from "./task-card";
import NewSectionDiv from "./new-section-div";
import { useElementFocus } from "@/hooks/useElementFocus";
import { SectionsProps } from "./sections";
import LayoutSelect from "./layout-select";
import { sortSectionTasks } from "@/lib/utils";
import TaskSortSelect from "./task-sort-select";
import TaskFilterSelect from "./task-filter-select";

export default function BoardView({ sections }: SectionsProps) {
  const [sectionList, setSectionList] = useState<Section[]>([]);
  const [editingSectionId, setEditingSectionId] = useState("");
  const [editingSectionValue, setEditingSectionValue] = useState("");
  const [filter, setFilter] = useState<FilterType>(null);
  const [sortOptions, setSortOptions] = useState<SortOptionsType>({
    sort: "created",
    order: "asc",
  });
  const { sort, order } = sortOptions;

  const iconSize = 18;

  const { openCreateTaskModal } = useModal();

  const sectionInputRef = useRef<HTMLInputElement>(null);

  useElementFocus(editingSectionId, reset, sectionInputRef);

  // sorting/filtering functions

  useEffect(() => {
    sortSectionTasks(sort, order, sections, setSectionList, filter);
  }, [sections, sortOptions, filter]);

  function sortTasks(type: SortType = "created") {
    if (sort === type && order === "asc") {
      setSortOptions({ sort: type, order: "desc" });
    } else {
      setSortOptions({ sort: type, order: "asc" });
    }
  }

  function sortTasksOrder(order: OrderType) {
    setSortOptions((prevSort) => ({ ...prevSort, order }));
  }

  // ----------------------------------

  function editSection(id: string, name: string) {
    setEditingSectionId(id);
    setEditingSectionValue(name);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEditingSectionValue(e.target.value);
  }

  function reset() {
    setEditingSectionId("");
  }

  return (
    <div className="flex flex-col border-t border-t-gray-200 pt-4">
      <div className="flex gap-5 items-center">
        <LayoutSelect />
        <TaskSortSelect
          sortTasksOrder={sortTasksOrder}
          sortOptions={sortOptions}
          sortTasks={sortTasks}
          iconSize={iconSize}
        />
        <TaskFilterSelect
          setFilter={setFilter}
          filter={filter}
          iconSize={iconSize}
        />
      </div>
      <div className="flex gap-5 mt-5 pt-5 border-t border-t-gray-200">
        {sectionList?.map((section) => (
          <div key={section.id} className="min-w-[17.5rem] flex flex-col gap-5">
            <div className="flex justify-between">
              {editingSectionId === section.id ? (
                <form className="w-full">
                  <input
                    type="text"
                    ref={sectionInputRef}
                    value={editingSectionValue}
                    onChange={handleChange}
                    className="w-full"
                  />
                </form>
              ) : (
                <span className="font-semibold">{section.name}</span>
              )}
              <div className="flex gap-3">
                <button
                  aria-label={`Create task for ${section.name} section`}
                  className="p-1 hover:bg-transparent/10 duration-200 rounded-lg text-main-light"
                  onClick={() => openCreateTaskModal(section.id)}
                >
                  <Plus size={iconSize} />
                </button>
                <SectionPopover
                  editSection={editSection}
                  iconSize={iconSize}
                  name={section.name}
                  id={section.id}
                />
              </div>
            </div>
            {section.tasks?.map((task) => <TaskCard task={task} />)}
          </div>
        ))}
        <NewSectionDiv iconSize={iconSize} />
      </div>
    </div>
  );
}
