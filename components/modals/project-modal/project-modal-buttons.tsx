import { projectTemplate } from "@/lib/constants";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { initialSections } from "./project-modal-form";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { Section } from "@/lib/types";
import classNames from "classnames";

interface ProjectModalButtonsProps {
  inputRef: RefObject<HTMLInputElement>;
  setSections: Dispatch<SetStateAction<Section[]>>;
}

export default function ProjectModalButtons({
  inputRef,
  setSections,
}: ProjectModalButtonsProps) {
  const [active, setActive] = useState(1);

  function focusInput() {
    if (inputRef.current?.value === "") {
      inputRef.current.focus();
    }
  }

  function setInitialState() {
    setSections([initialSections]);
    setActive(1);
    focusInput();
  }

  function setTemplateState() {
    setSections(projectTemplate);
    setActive(2);
    focusInput();
  }

  return (
    <div className="flex gap-2 mb-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={setInitialState}
              className={classNames({
                "size-24 bg-transparent hover:bg-transparent shadow": true,
                "border border-blue-400": active === 1,
              })}
            >
              <Image
                width={50}
                height={50}
                alt=""
                src={"/clipboard.svg"}
                className="object-cover"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-main text-white">
            <p>Blank project</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={setTemplateState}
              className={classNames({
                "size-24 bg-transparent hover:bg-transparent shadow": true,
                "border border-blue-400": active === 2,
              })}
            >
              <Image
                width={50}
                height={50}
                alt=""
                src={"/rocket.svg"}
                className="object-cover"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-main text-white">
            <p>Use a template</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
