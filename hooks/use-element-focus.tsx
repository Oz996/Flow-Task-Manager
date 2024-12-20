import { RefObject, SetStateAction, useEffect } from "react";

export function useElementFocus(
  state: SetStateAction<any>,
  reset: () => void,
  elementRef: RefObject<HTMLElement>
) {
  useEffect(() => {
    if (state) {
      elementRef.current?.focus();
    }
  }, [state]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(e.target as Node)
      ) {
        reset();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}
