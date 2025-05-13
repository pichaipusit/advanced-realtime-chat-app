import { useEffect } from "react";

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement | null>[],
  handler: (event: PointerEvent) => void
) {
  useEffect(() => {
    const listener = (event: PointerEvent) => {
      const isInsideAny = refs.some(
        (ref) => ref.current && ref.current.contains(event.target as Node)
      );
      if (isInsideAny) return;

      handler(event);
    };

    window.addEventListener("pointerdown", listener);
    return () => {
      window.removeEventListener("pointerdown", listener);
    };
  }, [refs, handler]);
}
