import Searchbar from "./search-bar/search-bar";
import SidebarButton from "./sidebar-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ConfigSheet from "./sheet/config-sheet";
import { userSession } from "@/lib/supabase/user-session";

export default async function Header() {
  const user = await userSession();

  return (
    <header className="w-screen h-12 bg-main fixed left-0 top-0 z-10">
      <div className="flex justify-between items-center h-full mx-5">
        <SidebarButton />
        <Searchbar />
        <div className="flex gap-1 items-center">
          {!user && (
            <Button asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          )}
          <ConfigSheet />
        </div>
      </div>
    </header>
  );
}
