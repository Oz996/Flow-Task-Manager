import { useRouter } from "next/navigation";
import { useLocation } from "./useLocation";

export function useModal() {
  const { url } = useLocation();
  const router = useRouter();

  function openAddModal() {
    url?.searchParams.set("modal", "true");
    url?.searchParams.set("type", "add");
    return router.push(url?.toString() as string, { scroll: false });
  }
  function closeModal() {
    url?.searchParams.delete("modal");
    url?.searchParams.delete("type");
    return router.push(url?.toString() as string, { scroll: false });
  }

  return {
    openAddModal,
    closeModal,
  };
}
