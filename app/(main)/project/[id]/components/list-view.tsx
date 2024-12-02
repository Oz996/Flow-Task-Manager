import { FilterType, OrderType, SortOptionsType, SortType } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import SectionPopover from "./section-popover";
import { useElementFocus } from "@/hooks/useElementFocus";
import { SectionsProps } from "./sections";
import classNames from "classnames";
import TaskListItem from "./task-list-item";
import TaskSortButtons from "./task-sort-buttons";
import LayoutSelect from "./layout-select";
import TaskSortSelect from "./task-sort-select";
import { sortSectionTasks } from "@/lib/utils";
import TaskFilterSelect from "./task-filter-select";
import { updateSectionAction } from "@/app/(main)/actions";
import TaskModal from "@/components/modals/task-modal/task-modal";

export default function Listview({ sections, user }: SectionsProps) {
  const [editingSectionId, setEditingSectionId] = useState("");
  const [editingSectionValue, setEditingSectionValue] = useState("");
  const [filter, setFilter] = useState<FilterType>("");
  const [sortOptions, setSortOptions] = useState<SortOptionsType>({
    sort: "",
    order: "",
  });
  const { sort, order } = sortOptions;

  const [closedSections, setClosedSections] = useState(
    new Map<string, string>()
  );

  const sectionInputRef = useRef<HTMLInputElement>(null);

  useElementFocus(editingSectionId, reset, sectionInputRef);

  // sorting/filtering functions

  function sortTasks(value?: SortType) {
    if (!value) return setSortOptions({ sort: "", order: "" });

    if (sort === value && order === "asc") {
      setSortOptions({ sort: value, order: "desc" });
    } else {
      setSortOptions({ sort: value, order: "asc" });
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

  async function formAction(formData: FormData) {
    await updateSectionAction(editingSectionId, formData);
    reset();
  }

  const sortedTasks = useMemo(
    () => sortSectionTasks(sortOptions, sections, user, filter),
    [sortOptions, sections, user, filter]
  );

  return (
    <div className="flex flex-col border-t border-t-gray-200 pt-4">
      <div className="flex gap-5 items-center">
        <LayoutSelect />
        <TaskSortSelect
          sortTasksOrder={sortTasksOrder}
          sortOptions={sortOptions}
          sortTasks={sortTasks}
        />
        <TaskFilterSelect setFilter={setFilter} filter={filter} />
      </div>
      <div className="grid grid-cols-5 mt-5 pt-5 border-t border-t-gray-200">
        <div className="col-span-2 flex justify-between border-b border-t border-r p-1">
          <span>Task name</span>
          <TaskSortButtons
            sortOptions={sortOptions}
            sortTasks={sortTasks}
            type="name"
          />
        </div>

        <div className="flex justify-between border-b border-t border-r p-1">
          <span>Assignee</span>
          <TaskSortButtons
            sortOptions={sortOptions}
            sortTasks={sortTasks}
            type="assignee"
          />
        </div>

        <div className="flex justify-between border-b border-t border-r p-1">
          <span>Priority</span>
          <TaskSortButtons
            sortOptions={sortOptions}
            sortTasks={sortTasks}
            type="priority"
          />
        </div>

        <div className="flex justify-between border-b border-t p-1">
          <span>Label</span>
          <TaskSortButtons
            sortOptions={sortOptions}
            sortTasks={sortTasks}
            type="label"
          />
        </div>

        <div className="col-span-full space-y-10 pt-3">
          {sortedTasks.map((section) => (
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
                {editingSectionId === section.id ? (
                  <form action={formAction}>
                    <input
                      type="text"
                      name="section-name"
                      ref={sectionInputRef}
                      value={editingSectionValue}
                      onChange={handleChange}
                    />
                  </form>
                ) : (
                  <div className="flex gap-1 items-center">
                    <span className="font-semibold">{section.name}</span>
                    <SectionPopover
                      editSection={editSection}
                      name={section.name}
                      id={section.id}
                    />
                  </div>
                )}
              </div>

              {!closedSections.has(section.id) && (
                <>
                  <ul>
                    {section.tasks?.map((task) => (
                      <>
                        <TaskListItem
                          key={task.id}
                          task={task}
                          sections={sections}
                        />
                      </>
                    ))}
                  </ul>
                  <TaskModal
                    id={section.id}
                    sections={sections}
                    type="add"
                    listView
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
