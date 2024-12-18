"use client";
import { Input } from "@/components/ui/input";
import classNames from "classnames";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Searchbar() {
  const [isActive, setIsActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // handling focusing and click outside directly in component instead of useElementFocus hook since it requires some additional functionality
  useEffect(() => {
    if (isActive) {
      const alwaysFocused = (e: MouseEvent) => {
        if (
          overlayRef.current &&
          overlayRef.current.contains(e.target as Node)
        ) {
          // preventing blur effect with preventDefault
          e.preventDefault();
          inputRef.current?.focus();
        } else {
          setIsActive(false);
        }
      };

      document.addEventListener("mousedown", alwaysFocused);

      return () => {
        document.removeEventListener("mousedown", alwaysFocused);
      };
    }
  }, [isActive]);

  function openOverlay() {
    setIsActive(true);
  }

  return (
    <div ref={overlayRef}>
      <div className="relative text-white z-20">
        {!isActive && (
          <Search className="absolute left-4 top-[.4rem]" size={20} />
        )}

        <Input
          ref={inputRef}
          onClick={openOverlay}
          aria-label="Search for tasks/projects"
          className={classNames({
            "rounded-full w-[30rem] px-10 placeholder:text-white bg-main-light border-none h-[2.1rem]":
              true,
            "px-5 bg-white placeholder:text-black text-black border-black":
              isActive,
          })}
          placeholder="Search"
        />
      </div>

      {isActive && (
        <div className="absolute inset-0 right-10 w-[33rem] h-[25rem] mx-auto bg-white rounded shadow-2xl z-10"></div>
      )}
    </div>
  );
}
