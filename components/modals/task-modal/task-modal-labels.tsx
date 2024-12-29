import { createLabelAction } from "@/app/actions/task-actions";
import TooltipContainer from "@/components/tooltip-container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClient } from "@/lib/supabase/client";
import { Label as ILabel, Task } from "@/lib/types";
import classNames from "classnames";
import { Plus, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TaskModalLabelsProps {
  assignedLabels: ILabel[];
  setTask: Dispatch<SetStateAction<Task>>;
}

export default function TaskModalLabels({
  assignedLabels,
  setTask,
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
    return assignedLabels.some((l) => l.id === label.id);
  }

  function removeAssignedLabel(label: ILabel) {
    const newLabels = assignedLabels.filter((l) => l.id !== label.id);
    setTask((taskData) => ({ ...taskData, labels: newLabels }));
    setPopoverOpen(false);
  }

  function assignLabel(label: ILabel) {
    const assigned = labelAlreadyAssigned(label);
    if (assigned) return removeAssignedLabel(label);

    setTask((taskData) => ({
      ...taskData,
      labels: [...taskData.labels!, label],
    }));
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
      ) as ILabel[];
    });
    setTask((taskData) => ({
      ...taskData,
      labels: [...taskData.labels, newLabel] as ILabel[],
    }));
  }

  return (
    <div className="py-2 flex gap-2 items-center flex-wrap">
      {assignedLabels.map((label) => (
        <div
          key={label.id}
          className="flex gap-1 items-center px-2 py-2 h-10 text-center rounded-sm border border-l-2 border-l-black"
        >
          <p className="" key={label.id}>
            {label.name}
          </p>
          <button
            type="button"
            onClick={() => removeAssignedLabel(label)}
            className="text-main-light"
            aria-label={`Remove ${label.name} label`}
          >
            <X size={18} />
          </button>
        </div>
      ))}

      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger>
          <TooltipContainer
            className="bg-main text-white"
            trigger={
              <button
                type="button"
                className="px-2 py-2 h-10 rounded border text-main-light"
                aria-label="Assign or add a label"
              >
                <Plus size={18} />
              </button>
            }
          >
            <p>Create or assign a label</p>
          </TooltipContainer>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[20rem] p-0">
          <div className="space-y-1 p-4">
            <form action={formAction}>
              <Label htmlFor="label-name">New label</Label>
              <Input
                id="label-name"
                name="label-name"
                placeholder="Label name"
              />
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
                    labelAlreadyAssigned(label),
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
