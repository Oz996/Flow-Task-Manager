import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings2 } from "lucide-react";
import HeaderAvatar from "../header-avatar";
import ThemePicker from "./theme-picker";
import { userSession } from "@/lib/supabase/user-session";
import SignOutButton from "./sign-out-button";
import UserModal from "../../modals/user-modal/user-modal";

export default async function ConfigSheet() {
  const user = await userSession();

  return (
    <Sheet>
      <SheetTrigger asChild className="flex gap-2 items-center">
        <button className="py-1 px-2 text-white hover:bg-transparent/20 duration-200 rounded-lg">
          <HeaderAvatar />
          <Settings2 size={22} className="text-white" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configurations</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-3 pt-5">
          <ThemePicker />
          <UserModal user={user!} />
          <SignOutButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}
