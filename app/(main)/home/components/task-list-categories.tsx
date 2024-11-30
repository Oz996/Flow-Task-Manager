export default function TaskListCategories() {
  return (
    <div className="grid grid-cols-5 mt-5 pt-5">
      <div className="col-span-2 flex justify-between border-b border-t border-r p-[0.35rem]">
        <span>Task name</span>
      </div>

      <div className="border-b border-t border-r p-[0.35rem]">
        <span>Assignee</span>
      </div>

      <div className="border-b border-t border-r p-[0.35rem]">
        <span>Priority</span>
      </div>

      <div className="border-b border-t p-[0.35rem]">
        <span>Label</span>
      </div>
    </div>
  );
}
