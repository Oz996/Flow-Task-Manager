import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Searchbar() {
  return (
    <div className="relative text-white">
      <Search className="absolute left-4 top-[.4rem]" size={20} />
      <Input
        className="rounded-full w-[30rem] px-10 placeholder:text-white bg-main-light border-none h-[2.1rem]"
        placeholder="Search"
      />
    </div>
  );
}
