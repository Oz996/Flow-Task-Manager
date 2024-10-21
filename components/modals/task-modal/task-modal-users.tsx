import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createClient } from "@/lib/supabase/client";
import { User } from "@/lib/types";
import { UserPlus2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function TaskModalUsers() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [userlist, setUserlist] = useState<User[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await supabase.from("profiles").select();
      data && setUserlist(data);
    }
    fetchUsers();
  }, []);

  return (
    <div className="mt-2">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="p-1 bg-transparent hover:bg-transparent/10 rounded-lg"
                  onClick={() => setPopoverOpen(true)}
                  type="button"
                >
                  <UserPlus2 />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-main text-white">
                <p>Assign this task</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-[26rem] p-0">
          <form className="p-4">
            <div className="space-y-1">
              <Label htmlFor="assignee">Assignee</Label>
              <Input id="assignee" name="assignee" />
            </div>
          </form>
          <div>
            <ul className="flex flex-col gap-3 mt-2">
              {userlist.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center gap-3 py-2 px-4 cursor-pointer hover:bg-transparent/10 duration-200 border-l-4 hover:border-l-blue-600 rounded"
                >
                  <Image
                    width={50}
                    height={50}
                    src={user.avatar_url}
                    alt="User avatar"
                    className="size-7 rounded-full"
                  />
                  <span>{user.username}</span>
                  <span className="text-sm">{user.email}</span>
                </li>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
