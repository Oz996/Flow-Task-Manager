import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="w-screen h-[3rem] bg-main absolute left-0 top-0">
      <div className="container flex justify-between items-center h-full">
        <Button className="bg-transparent p-1">
          <Menu size={28} />
        </Button>
      </div>
    </header>
  );
}
