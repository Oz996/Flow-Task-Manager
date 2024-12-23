import { createSectionAction } from "@/app/actions/section-actions";
import { useElementFocus } from "@/hooks/use-element-focus";
import { iconSize } from "@/lib/constants";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

export default function NewSectionDiv() {
  const [addMode, setAddMode] = useState(false);
  const [sectionValue, setSectionValue] = useState("");

  const newSectionInputRef = useRef<HTMLInputElement>(null);
  const params = useParams();

  useElementFocus(addMode, reset, newSectionInputRef);

  function reset() {
    setAddMode(false);
    setSectionValue("");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSectionValue(e.target.value);
  }

  async function formAction(formData: FormData) {
    toast.promise(createSectionAction(params.id as string, formData), {
      loading: "Loading...",
      success: "Section created",
      error: "Failed to create section, try again later",
    });
    reset();
  }

  if (addMode)
    return (
      <form action={formAction} className="min-w-[17.5rem]">
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
          className="w-full"
        />
      </form>
    );

  if (!addMode)
    return (
      <div
        className="min-w-[17.5rem] flex justify-center items-center h-[calc(100vh-13rem)] bg-transparent/5 hover:bg-transparent/10 duration-200 rounded-lg cursor-pointer group"
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
