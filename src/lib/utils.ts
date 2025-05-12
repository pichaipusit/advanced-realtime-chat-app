import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function withErrorHandler<T>(
  action: () => Promise<T>,
  errorMessage: string = "Something went wrong"
) {
  try {
    return await action();
  } catch (error) {
    toast.error(errorMessage); // User-friendly message

    if (error instanceof ConvexError) {
      console.error("ConvexError:", error);
    } else if (error instanceof Error) {
      console.error("Error:", error);
    } else {
      console.error("Unknown error:", error);
    }

    return;
  }
}
