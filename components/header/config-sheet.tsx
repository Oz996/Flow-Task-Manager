import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import HeaderAvatar from "./header-avatar";

export default function ConfigSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent py-1 px-2">
          <HeaderAvatar />
        </Button>
      </SheetTrigger>
      <SheetTrigger asChild>
        <Button className="bg-transparent py-1 px-2">
          <Settings2 size={22} className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configurations</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
