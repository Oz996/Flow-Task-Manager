import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useLocation() {
  const [url, setUrl] = useState<URL>();

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      setUrl(currentUrl);
    }
  }, []);

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
