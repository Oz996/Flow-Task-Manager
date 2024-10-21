"use client";
import { Section } from "@/lib/types";
import { Plus } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import SectionPopover from "./section-popover";
import { useModal } from "@/hooks/useModal";
import NewSectionDiv from "./new-section-div";

interface SectionsGridProps {
  sections: Section[];
}

export default function SectionsGrid({ sections }: SectionsGridProps) {
  const [editingSectionId, setEditingSectionId] = useState("");
  const [editingSectionValue, setEditingSectionValue] = useState("");
  const iconSize = 18;

  const { openCreateTaskModal } = useModal();

  const sectionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the sections input if in editing mode
    if (editingSectionId) {
      sectionInputRef.current?.focus();
    }
  }, [editingSectionId]);

  useEffect(() => {
    // reset to empty value for section id if clicked outside input
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sectionInputRef.current &&
        !sectionInputRef.current.contains(e.target as Node)
      )
        setEditingSectionId("");
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function editSection(id: string, name: string) {
    setEditingSectionId(id);
    setEditingSectionValue(name);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEditingSectionValue(e.target.value);
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-5 mt-5 pt-5 border-t border-t-main-light">
        {sections?.map((section) => (
          <div key={section.id} className="min-w-[15rem]">
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
          </div>
        ))}
        <NewSectionDiv iconSize={iconSize} />
      </div>
    </>
  );
}
