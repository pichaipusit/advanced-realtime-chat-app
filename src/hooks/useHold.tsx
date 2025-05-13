import { useRef } from "react";

type UseHoldOptions<T> = {
  onHold: (arg: T) => void;
  duration?: number;
};
export function useHold<T>({ onHold, duration = 600 }: UseHoldOptions<T>) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHeldRef = useRef(false);

  const handlePointerDown = (arg: T) => {
    isHeldRef.current = true;
    timeoutRef.current = setTimeout(() => {
      if (isHeldRef.current) {
        onHold(arg);
      }
    }, duration);
  };
  const handlePointerUp = () => {
    isHeldRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  return {
    handlePointerDown,
    handlePointerUp,
  };
}
