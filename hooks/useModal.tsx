import { useRouter } from "next/navigation";
import { useLocation } from "./useLocation";

export function useModal() {
  const { url } = useLocation();
  const router = useRouter();

  // project modals

  function openCreateProjectModal() {
    url?.searchParams.set("modal", "true");
    url?.searchParams.set("type", "project");
    url?.searchParams.set("action", "add");
    return router.push(url?.toString() as string, { scroll: false });
  }

  // task modals

  function openCreateTaskModal(id: string) {
    url?.searchParams.set("modal", "true");
    url?.searchParams.set("type", "task");
    url?.searchParams.set("action", "add");
    url?.searchParams.set("id", id);
    return router.push(url?.toString() as string, { scroll: false });
  }

  function closeModal() {
    url?.searchParams.delete("modal");
    url?.searchParams.delete("type");
    url?.searchParams.delete("action");
    url?.searchParams.delete("id");
    return router.push(url?.toString() as string, { scroll: false });
  }

  return {
    openCreateProjectModal,
    openCreateTaskModal,
    closeModal,
  };
}
