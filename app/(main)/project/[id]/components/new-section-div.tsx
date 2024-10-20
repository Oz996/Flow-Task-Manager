import { createSectionAction } from "@/app/(main)/actions";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface NewSectionDivProps {
  iconSize: number;
}

export default function NewSectionDiv({ iconSize }: NewSectionDivProps) {
  const [addMode, setAddMode] = useState(false);
  const [sectionValue, setSectionValue] = useState("");

  const newSectionInputRef = useRef<HTMLInputElement>(null);
  const params = useParams();

  useEffect(() => {
    if (addMode) {
      newSectionInputRef.current?.focus();
    }
  }, [addMode]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        newSectionInputRef.current &&
        !newSectionInputRef.current.contains(e.target as Node)
      ) {
        reset();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function reset() {
    setAddMode(false);
    setSectionValue("");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSectionValue(e.target.value);
  }

  async function formAction(formData: FormData) {
    await createSectionAction(params.id as string, formData);
    reset();
  }

  if (addMode)
    return (
      <form action={formAction}>
        <label htmlFor="new-section" className="sr-only">
          Section name
        </label>
        <input
          id="new-section"
          name="new-section"
          type="text"
          ref={newSectionInputRef}
          value={sectionValue}
          onChange={handleChange}
          placeholder="Section name"
        />
      </form>
    );

  if (!addMode)
    return (
      <div
        className="min-w-[15rem] flex justify-center items-center h-[calc(100vh-13rem)] bg-transparent/5 hover:bg-transparent/10 duration-200 rounded-lg cursor-pointer group"
        onClick={() => setAddMode(true)}
        role="button"
      >
        <div className="flex gap-1 p-1 pr-2 duration-200 rounded-lg text-main-light items-start group-hover:text-black">
          <Plus size={iconSize} />
          <span className="font-semibold leading-none">Add section</span>
        </div>
      </div>
    );
}
