import { cn } from "@/lib/utils";
import React from "react";

type MessageBubbleProps = {
  content: string;
  isEdited: boolean;
  authorId: string;
};
const GuestMessageBubble = ({
  content,
  isEdited,
  authorId,
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "bg-teal-200 py-2 px-3 rounded-full w-fit",
        authorId === "user1" ? "bg-slate-200" : "ml-auto"
      )}
    >
      {content}
    </div>
  );
};

export default GuestMessageBubble;
