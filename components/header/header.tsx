import { createClient } from "@/lib/supabase/server";
import Searchbar from "./searchbar";
import SidebarButton from "./sidebar-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ConfigSheet from "./config-sheet";

export default async function Header() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  return (
    <header className="w-screen h-12 bg-main fixed left-0 top-0 border-b-main-light border-b">
      <div className="container flex justify-between items-center h-full">
        <SidebarButton />
        <Searchbar />
        <div className="flex gap-1 items-center">
          {user ? (
            <div className="size-8 rounded-full bg-main-light" />
          ) : (
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
