import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

export default function ConfigSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent py-1 px-2">
          <Settings2 size={20} className="text-white" />
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
