import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import React from "react";

type MessageBubbleProps = {
  content: string;
  isEdited: boolean;
  authorId: string;
};

const MessageBubble = ({ content, isEdited, authorId }: MessageBubbleProps) => {
  const { user } = useUser();
  const isCurrentUserAuthor = user?.id === authorId;

  return (
    <div
      className={cn(
        " py-2 px-3 rounded-full w-fit",
        isCurrentUserAuthor ? "ml-auto bg-teal-200" : "bg-slate-200"
      )}
    >
      {content}
    </div>
  );
};

export default MessageBubble;
