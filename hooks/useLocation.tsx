import { useEffect, useState } from "react";

export function useLocation() {
  const [url, setUrl] = useState<URL>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      setUrl(currentUrl);
    }
  }, []);

  return {
    url,
  };
}
