import { projectTemplate } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { Section } from "@/lib/types";
import classNames from "classnames";
import { generateSection } from "@/lib/utils";
import TooltipContainer from "@/components/tooltip-container";

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
    inputRef.current?.focus();
  }

  function setInitialState() {
    setSections([generateSection()]);
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
      <TooltipContainer
        side="bottom"
        className="bg-main text-white"
        trigger={
          <Button
            type="button"
            onClick={setInitialState}
            className={classNames({
              "size-24 bg-transparent hover:bg-transparent shadow dark:bg-white dark:hover:bg-white":
                true,
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
        }
      >
        <p>Blank project</p>
      </TooltipContainer>

      <TooltipContainer
        side="bottom"
        className="bg-main text-white"
        trigger={
          <Button
            type="button"
            onClick={setTemplateState}
            className={classNames({
              "size-24 bg-transparent hover:bg-transparent shadow dark:bg-white dark:hover:bg-white":
                true,
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
        }
      >
        <p>Use a template</p>
      </TooltipContainer>
    </div>
  );
}
