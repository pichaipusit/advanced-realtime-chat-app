import { useEffect } from "react";

export function useOnClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: PointerEvent) => void
) {
  useEffect(() => {
    const listener = (event: PointerEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    window.addEventListener("pointerdown", listener);
    return () => {
      window.removeEventListener("pointerdown", listener);
    };
  }, [ref, handler]);
}
