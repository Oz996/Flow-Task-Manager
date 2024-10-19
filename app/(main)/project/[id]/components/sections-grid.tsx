import { Section } from "@/lib/types";
import { Ellipsis, Plus } from "lucide-react";
import React from "react";

interface SectionsGridProps {
  sections: Section[];
}

export default function SectionsGrid({ sections }: SectionsGridProps) {
  const iconSize = 18;
  return (
    <>
      <div className="grid grid-cols-5 gap-5 mt-5 pt-5 border-t border-t-main-light">
        {sections?.map((section) => (
          <div key={section.id} className="min-w-[15rem]">
            <div className="flex justify-between">
              <span className="font-semibold">{section.name}</span>
              <div className="flex gap-3">
                <button className="p-1 hover:bg-transparent/10 duration-200 rounded-lg text-main-light">
                  <Plus size={iconSize} />
                </button>
                <button className="p-1 hover:bg-transparent/10 duration-200 rounded-lg text-main-light">
                  <Ellipsis size={iconSize} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
