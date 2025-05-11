import { useRef } from "react";

type UseHoldOptions<T> = {
  onHold: (arg: T) => void;
  duration?: number;
};
export function useHold<T>(options: UseHoldOptions<T>) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onPointerDown = (arg: T) => {
    timeoutRef.current = setTimeout(
      () => options.onHold(arg),
      options.duration
    );
  };
  const onPointerUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  return {
    onPointerDown,
    onPointerUp,
  };
}
