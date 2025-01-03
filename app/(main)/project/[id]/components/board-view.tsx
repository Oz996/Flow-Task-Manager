import { FilterType, OrderType, SortOptionsType, SortType } from "@/lib/types";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import SectionPopover from "../../../../../components/popovers/section-popover";
import TaskCard from "./task-card";
import NewSectionDiv from "./new-section-div";
import { useElementFocus } from "@/hooks/use-element-focus";
import { SectionsProps } from "./sections";
import LayoutSelect from "./layout-select";
import { sortSectionTasks } from "@/lib/utils";
import TaskSortSelect from "./task-sort-select";
import TaskFilterSelect from "./task-filter-select";
import TaskModal from "@/components/modals/task-modal/task-modal";
import { updateSectionAction } from "@/app/actions/section-actions";

export default function BoardView({ sections, user }: SectionsProps) {
  const [editingSectionId, setEditingSectionId] = useState("");
  const [editingSectionValue, setEditingSectionValue] = useState("");
  const [filter, setFilter] = useState<FilterType>("");
  const [sortOptions, setSortOptions] = useState<SortOptionsType>({
    sort: "",
    order: "",
  });
  const { sort, order } = sortOptions;

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

  async function formAction(formData: FormData) {
    await updateSectionAction(editingSectionId, formData);
    reset();
  }

  const sortedTasks = useMemo(
    () => sortSectionTasks(sortOptions, sections, user, filter),
    [sortOptions, sections, user, filter]
  );

  return (
    <div className="flex flex-col border-t pt-4">
      <div className="flex gap-5 items-center">
        <LayoutSelect />
        <TaskSortSelect
          sortTasksOrder={sortTasksOrder}
          sortOptions={sortOptions}
          sortTasks={sortTasks}
        />
        <TaskFilterSelect setFilter={setFilter} filter={filter} />
      </div>
      <div className="flex gap-5 mt-5 pt-5 border-t">
        {sortedTasks.map((section) => (
          <div key={section.id} className="min-w-[17.5rem] flex flex-col gap-5">
            <div className="flex justify-between">
              {editingSectionId === section.id ? (
                <form action={formAction} className="w-full">
                  <input
                    type="text"
                    name="section-name"
                    ref={sectionInputRef}
                    value={editingSectionValue}
                    onChange={handleChange}
                    className="p-1 w-full"
                  />
                </form>
              ) : (
                <span className="font-semibold h-8">{section.name}</span>
              )}
              <div className="flex gap-3">
                <TaskModal id={section.id} sections={sections} type="add" />

                <SectionPopover
                  editSection={editSection}
                  name={section.name}
                  id={section.id}
                />
              </div>
            </div>
            {section.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} sections={sections} />
            ))}
          </div>
        ))}
        <NewSectionDiv />
      </div>
    </div>
  );
}
