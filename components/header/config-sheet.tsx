import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings2, Trash2 } from "lucide-react";
import HeaderAvatar from "./header-avatar";
import ThemePicker from "./theme-picker";
import DeleteUserButton from "./delete-user-button";
import { userSession } from "@/lib/supabase/user-session";

export default async function ConfigSheet() {
  const user = (await userSession()) as any;
  return (
    <Sheet>
      <SheetTrigger asChild className="flex gap-2 items-center">
        <Button className="bg-transparent py-1 px-2">
          <HeaderAvatar />
          <Settings2 size={22} className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configurations</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-3">
          <ThemePicker />
          <Button className="rounded-lg">Account settings</Button>
          <Button className="rounded-lg">Sign out</Button>
          <DeleteUserButton user={user} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
