import TooltipContainer from "@/components/tooltip-container";
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
import classNames from "classnames";
import { UserPlus2 } from "lucide-react";
import Image from "next/image";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface TaskModalUsersProps {
  assignedUsers: User[];
  setAssignedUsers: Dispatch<SetStateAction<User[]>>;
}

export default function TaskModalUsers({
  assignedUsers,
  setAssignedUsers,
}: TaskModalUsersProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [userlist, setUserlist] = useState<User[]>([]);
  const [userlistSearch, setUserlistSearch] = useState<User[]>(userlist);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await supabase.from("profiles").select();
      if (data) {
        setUserlist(data);
        setUserlistSearch(data);
      }
    }
    fetchUsers();
  }, []);

  function userAlreadyAssigned(user: User) {
    return assignedUsers.findIndex((u) => u.id === user.id);
  }

  function removeAssignedUser(user: User) {
    const newUsers = assignedUsers.filter((u) => u.id !== user.id);
    setAssignedUsers(newUsers);
    setPopoverOpen(false);
  }

  function assignUser(user: User) {
    const assigned = userAlreadyAssigned(user);
    if (assigned !== -1) return removeAssignedUser(user);

    setAssignedUsers((prevUsers) => [...prevUsers, user]);
    setPopoverOpen(false);
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    if (!search) return setUserlistSearch(userlist);

    const userSearch = userlist.filter((user) => {
      return (
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    setUserlistSearch(userSearch);
  }

  return (
    <div className="mt-2 flex items-center gap-2">
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
          <div className="space-y-1 p-4">
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              name="assignee"
              placeholder="Search username or email"
              onChange={handleSearch}
            />
          </div>
          <div>
            <ul className="flex flex-col mt-2">
              {userlistSearch.map((user) => (
                <li
                  key={user.id}
                  className={classNames({
                    "flex items-center gap-3 py-2 px-4 cursor-pointer hover:bg-transparent/10 duration-200 border-l-4 border-l-transparent hover:border-l-blue-600 rounded":
                      true,
                    "border-l-4 border-l-blue-600 bg-transparent/10":
                      userAlreadyAssigned(user) !== -1,
                  })}
                  onClick={() => assignUser(user)}
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

      {assignedUsers?.map((user) => (
        <TooltipContainer
          key={user.id}
          className="bg-main text-white"
          trigger={
            <Image
              width={50}
              height={50}
              src={user.avatar_url}
              alt="User avatar"
              className="size-7 rounded-full"
            />
          }
        >
          <p>{user.username}</p>
        </TooltipContainer>
      ))}
    </div>
  );
}
