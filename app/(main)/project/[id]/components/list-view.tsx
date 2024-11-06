import { useModal } from "@/hooks/useModal";
import { Section } from "@/lib/types";
import { ChevronRight, Plus } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SectionPopover from "./section-popover";
import TaskCard from "./task-card";
import NewSectionDiv from "./new-section-div";
import { useElementFocus } from "@/hooks/useElementFocus";
import { SectionsProps } from "./sections";
import classNames from "classnames";

export default function Listview({ sections }: SectionsProps) {
  const [sectionList, setSectionList] = useState<Section[]>([]);
  const [editingSectionId, setEditingSectionId] = useState("");
  const [expandedSections, setExpandedSections] = useState(
    new Map<string, string>()
  );
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

  function expandSection(id: string) {
    const updatedMap = new Map(expandedSections);

    if (updatedMap.has(id)) {
      updatedMap.delete(id);
    } else {
      updatedMap.set(id, id);
    }
    setExpandedSections(updatedMap);
  }

  console.log("expandeds", expandedSections);

  return (
    <div className="grid grid-cols-5 mt-5 pt-5 border-t border-t-main-border">
      <div className="col-span-2 border p-1">
        <span>Task name</span>
      </div>

      <div className="border p-1">
        <span>Assignee</span>
      </div>

      <div className="border p-1">
        <span>Priority</span>
      </div>

      <div className="border p-1">
        <span>Label</span>
      </div>

      <div className="col-span-full">
        {sectionList.map((section) => (
          <div key={section.id}>
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
                    "rotate-90": expandedSections.has(section.id),
                  })}
                />
              </button>
              <span className="font-semibold">{section.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
