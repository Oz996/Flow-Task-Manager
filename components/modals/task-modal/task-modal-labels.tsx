import { createLabelAction } from "@/app/(main)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClient } from "@/lib/supabase/client";
import { Label as ILabel } from "@/lib/types";
import classNames from "classnames";
import { Plus, X } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useOptimistic,
  useState,
} from "react";

interface TaskModalLabelsProps {
  assignedLabels: ILabel[];
  setAssignedLabels: Dispatch<SetStateAction<ILabel[]>>;
}

export default function TaskModalLabels({
  assignedLabels,
  setAssignedLabels,
}: TaskModalLabelsProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [labels, setLabels] = useState<ILabel[]>([]);

  const supabase = createClient();

  useEffect(() => {
    async function fetchLabels() {
      const { data } = await supabase.from("labels").select();
      data && setLabels(data);
    }
    fetchLabels();
  }, []);

  function labelAlreadyAssigned(label: ILabel) {
    return assignedLabels.findIndex((l) => l.id === label.id);
  }

  function removeAssignedLabel(label: ILabel) {
    const newLabels = assignedLabels.filter((l) => l.id !== label.id);
    setAssignedLabels(newLabels);
    setPopoverOpen(false);
  }

  function assignLabel(label: ILabel) {
    const assigned = labelAlreadyAssigned(label);
    if (assigned !== -1) return removeAssignedLabel(label);

    setAssignedLabels((prevLabels) => [...prevLabels, label]);
    setPopoverOpen(false);
  }

  // creating a temp label to display instanly while the label gets added and later assigning real values
  async function formAction(formData: FormData) {
    const labelName = formData.get("label-name")?.toString();

    const tempLabel: ILabel = {
      name: labelName as string,
      id: crypto.randomUUID(),
    };

    setLabels((prevLabels) => [...prevLabels, tempLabel]);

    const newLabel = await createLabelAction(formData);

    setLabels((prevLabels) => {
      return prevLabels.map((label) =>
        label.id === tempLabel.id ? newLabel : label
      );
    });
    setAssignedLabels((prevLabels) => [...prevLabels, newLabel]);
  }

  return (
    <div className="py-2 flex gap-2 items-center flex-wrap">
      {assignedLabels.map((label) => (
        <div
          key={label.id}
          className="flex gap-1 items-center px-2 py-2 h-10 text-center rounded border border-l-2 border-l-black"
        >
          <p className="" key={label.id}>
            {label.name}
          </p>
          <button
            type="button"
            className="text-main-light"
            onClick={() => removeAssignedLabel(label)}
            aria-label="Assign or add label button"
          >
            <X size={18} />
          </button>
        </div>
      ))}

      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="px-2 py-2 h-10 rounded border text-main-light"
          >
            <Plus size={18} />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[20rem] p-0">
          <div className="space-y-1 p-4">
            <form action={formAction}>
              <Label htmlFor="label-name">New label</Label>
              <Input id="label-name" name="label-name" />
            </form>
          </div>

          <span className="text sm px-4 my-2">Labels</span>
          <ul className="flex flex-col">
            {labels.map((label) => (
              <li
                key={label.id}
                className={classNames({
                  "flex items-center gap-3 py-2 px-4 cursor-pointer hover:bg-transparent/10 duration-200 border-l-4 border-l-transparent hover:border-l-blue-600 rounded":
                    true,
                  "border-l-4 border-l-blue-600 bg-transparent/10":
                    labelAlreadyAssigned(label) !== -1,
                })}
                onClick={() => assignLabel(label)}
              >
                <span>{label.name}</span>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
