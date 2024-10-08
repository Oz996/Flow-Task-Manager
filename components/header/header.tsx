import Searchbar from "./searchbar";
import SidebarButton from "./sidebar-button";

export default function Header() {
  return (
    <header className="w-screen h-12 bg-main absolute left-0 top-0 border-b-main-light border-b">
      <div className="container flex justify-between items-center h-full">
        <SidebarButton />
        <Searchbar />
        <div></div>
      </div>
    </header>
  );
}
