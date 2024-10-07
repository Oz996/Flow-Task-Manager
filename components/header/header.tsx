import Searchbar from "./searchbar";
import SidebarButton from "./sidebar-button";

export default function Header() {
  return (
    <header className="w-screen h-[3rem] bg-main absolute left-0 top-0">
      <div className="container flex justify-between items-center h-full">
        <SidebarButton />
        <Searchbar />
        <div></div>
      </div>
    </header>
  );
}
