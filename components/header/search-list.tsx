import { FilterType } from "./search-bar";

interface SearchListProps {
  title: FilterType;
  items: any[];
  isActive: boolean;
  renderItem: (item: any) => React.ReactNode;
  closeOverlay: () => void;
}

export default function SearchList({
  title,
  items,
  isActive,
  renderItem,
  closeOverlay,
}: SearchListProps) {
  if (!isActive) return null;

  return (
    <>
      <h2 className="text-sm text-main-light font-semibold capitalize pt-5 pb-1 px-6">
        {title}
      </h2>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={closeOverlay}
            className="flex items-center gap-3 py-2 px-4 cursor-pointer hover:bg-transparent/10 duration-200 border-l-4 border-l-transparent hover:border-l-blue-600 rounded"
          >
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </>
  );
}
