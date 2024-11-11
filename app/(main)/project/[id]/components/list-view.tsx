import { useModal } from "@/hooks/useModal";
import { OrderType, Section, SortOptionsType, SortType } from "@/lib/types";
import { ChevronRight, MoveDown, MoveUp, Plus, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SectionPopover from "./section-popover";
import TaskCard from "./task-card";
import NewSectionDiv from "./new-section-div";
import { useElementFocus } from "@/hooks/useElementFocus";
import { SectionsProps } from "./sections";
import classNames from "classnames";
import Image from "next/image";
import TaskSubtasks from "./task-subtasks";
import TaskListItem from "./task-list-item";
import TaskSortButtons from "./task-sort-buttons";
import { PriorityType } from "@/components/modals/task-modal/task-modal-form";
import LayoutSelect from "./layout-select";
import TaskSortSelect from "./task-sort-select";
import { sortSectionTasks } from "@/lib/utils";

export default function Listview({ sections }: SectionsProps) {
  const [sectionList, setSectionList] = useState<Section[]>([]);
  const [editingSectionId, setEditingSectionId] = useState("");
  const [editingSectionValue, setEditingSectionValue] = useState("");
  const [sortOptions, setSortOptions] = useState<SortOptionsType>({
    sort: "created",
    order: "asc",
  });
  const { sort, order } = sortOptions;

  const [closedSections, setClosedSections] = useState(
    new Map<string, string>()
  );
  const [openTasks, setOpenTasks] = useState(new Map<string, string>());

  const iconSize = 18;

  const { openCreateTaskModal } = useModal();

  const sectionInputRef = useRef<HTMLInputElement>(null);

  useElementFocus(editingSectionId, reset, sectionInputRef);

  // sorting functions

  useEffect(() => {
    sortSectionTasks(sort, order, sections, setSectionList);
  }, [sections, sortOptions]);

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

  function expandSection(id: string) {
    const updatedMap = new Map(closedSections);

    if (updatedMap.has(id)) {
      updatedMap.delete(id);
    } else {
      updatedMap.set(id, id);
    }
    setClosedSections(updatedMap);
  }

  function expandTask(id: string) {
    const updatedMap = new Map(openTasks);

    if (updatedMap.has(id)) {
      updatedMap.delete(id);
    } else {
      updatedMap.set(id, id);
    }
    setOpenTasks(updatedMap);
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
      </div>
      <div className="grid grid-cols-5 mt-5 pt-5 border-t border-t-gray-200">
        <div className="col-span-2 flex justify-between border p-1">
          <span>Task name</span>
          <TaskSortButtons
            sortOptions={sortOptions}
            sortTasks={sortTasks}
            iconSize={iconSize}
            type="name"
          />
        </div>

        <div className="flex justify-between border p-1">
          <span>Assignee</span>
          <TaskSortButtons
            sortOptions={sortOptions}
            sortTasks={sortTasks}
            iconSize={iconSize}
            type="assignee"
          />
        </div>

        <div className="flex justify-between border p-1">
          <span>Priority</span>
          <TaskSortButtons
            sortOptions={sortOptions}
            sortTasks={sortTasks}
            iconSize={iconSize}
            type="priority"
          />
        </div>

        <div className="flex justify-between border p-1">
          <span>Label</span>
          <TaskSortButtons
            sortOptions={sortOptions}
            sortTasks={sortTasks}
            iconSize={iconSize}
            type="label"
          />
        </div>

        <div className="col-span-full space-y-10 pt-3">
          {sectionList.map((section) => (
            <div key={section.id} className="pb-2">
              <div className="flex gap-1 items-center">
                <button
                  onClick={() => expandSection(section.id)}
                  aria-controls="tasks"
                  aria-label="Expand section to display tasks"
                  className="flex items-center gap-1 p-1 bg-transparent hover:bg-transparent/10 duration-200 rounded lg"
                >
                  <ChevronRight
                    size={18}
                    className={classNames({
                      "transition-transform ease-in-out rotate-0": true,
                      "rotate-90": !closedSections.has(section.id),
                    })}
                  />
                </button>
                <span className="font-semibold">{section.name}</span>
              </div>

              {!closedSections.has(section.id) && (
                <>
                  <ul>
                    {section.tasks?.map((task) => (
                      <TaskListItem
                        key={task.id}
                        task={task}
                        openTasks={openTasks}
                        expandTask={expandTask}
                        iconSize={iconSize}
                      />
                    ))}
                  </ul>
                  <button
                    className="border-none ml-[1.85rem] p-1 text-sm text-main-light"
                    onClick={() => openCreateTaskModal(section.id)}
                  >
                    Add task...
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
