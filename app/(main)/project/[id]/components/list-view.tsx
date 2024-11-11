import { useModal } from "@/hooks/useModal";
import { Section } from "@/lib/types";
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

export type SortType = "created" | "name" | "assignee" | "priority" | "label";
export type OrderType = "asc" | "desc";
export interface SortOptionsType {
  sort: SortType;
  order: OrderType;
}

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

  useEffect(() => {
    sortSectionTasks(sort, order);
  }, [sections, sortOptions]);

  // sorting functions

  function sortSectionTasks(sort: SortType, order: OrderType) {
    const sortedList = sections.map((section) => ({
      ...section,
      tasks: section.tasks?.slice().sort((a, b) => {
        if (sort === "name" && order === "asc") {
          return a.name.localeCompare(b.name);
        }

        if (sort === "name" && order === "desc") {
          return b.name.localeCompare(a.name);
        }

        if (sort === "assignee" && order === "asc") {
          return a.profiles.length - b.profiles.length;
        }

        if (sort === "assignee" && order === "desc") {
          return b.profiles.length - a.profiles.length;
        }

        if (sort === "priority" && order === "asc") {
          return (
            (priorityValue(a.priority) ?? 0) - (priorityValue(b.priority) ?? 0)
          );
        }

        if (sort === "priority" && order === "desc") {
          return (
            (priorityValue(b.priority) ?? 0) - (priorityValue(a.priority) ?? 0)
          );
        }

        if (sort === "label" && order === "asc") {
          return a.labels.length - b.labels.length;
        }

        if (sort === "label" && order === "desc") {
          return b.labels.length - a.labels.length;
        }

        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }),
    }));
    setSectionList(sortedList);
  }

  function priorityValue(priority: PriorityType) {
    if (priority === "high") return 2;
    if (priority === "medium") return 1;
    if (priority === "low") return 0;
    if (!priority) return -1;
  }

  function sortTasks(type: SortType = "created") {
    if (sort === type && order === "asc") {
      setSortOptions({ sort: type, order: "desc" });
    } else {
      setSortOptions({ sort: type, order: "asc" });
    }
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
    <div className="grid grid-cols-5 mt-5 pt-5 border-t border-t-main-border">
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
  );
}
