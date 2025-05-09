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
  // const message = useQuery(api.messages.getMessage, { messageId });

  // const isCurrentUserAuthor = user?.id === message?.authorId;
  const isCurrentUserAuthor = true;
  return (
    <div
      className={cn(
        "bg-teal-200 py-2 px-3 rounded-full w-fit",
        isCurrentUserAuthor ? "bg-slate-200" : "ml-auto"
      )}
    >
      {content}
    </div>
  );
};

export default MessageBubble;
