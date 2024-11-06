import { useModal } from "@/hooks/useModal";
import { Section } from "@/lib/types";
import { Plus } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SectionPopover from "./section-popover";
import TaskCard from "./task-card";
import NewSectionDiv from "./new-section-div";
import { useElementFocus } from "@/hooks/useElementFocus";
import { SectionsProps } from "./sections";

export default function BoardView({ sections }: SectionsProps) {
  const [sectionList, setSectionList] = useState<Section[]>([]);
  const [editingSectionId, setEditingSectionId] = useState("");
  const [editingSectionValue, setEditingSectionValue] = useState("");
  const iconSize = 18;

  const { openCreateTaskModal } = useModal();

  const sectionInputRef = useRef<HTMLInputElement>(null);

  useElementFocus(editingSectionId, reset, sectionInputRef);

  useEffect(() => {
    function sortSectionTasks() {
      const sortedList = sections.map((section) => ({
        ...section,
        tasks: section.tasks
          ?.slice()
          .sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          ),
      }));
      setSectionList(sortedList);
    }
    sortSectionTasks();
  }, [sections]);

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
    <div className="flex gap-5 mt-5 pt-5 border-t border-t-main-border">
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
  );
}
