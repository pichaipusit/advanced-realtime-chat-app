import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import React, { RefObject, useEffect, useRef, useState } from "react";
import MessageActions from "./MessageActions";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

type MessageBubbleProps = {
  content: string;
  isEdited: boolean;
  authorId: string;
};

const MessageBubble = ({ content, isEdited, authorId }: MessageBubbleProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const actionsRef = useRef<HTMLElement | null>(null);

  const { user } = useUser();
  const isCurrentUserAuthor = user?.id === authorId;

  const handlePointerDown = () => {
    holdTimeout.current = setTimeout(() => {
      setIsActionsOpen(true);
    }, 600);
  };
  const handlePointerUp = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
  };

  useOnClickOutside(actionsRef, () => setIsActionsOpen(false));

  return (
    <div>
      <p
        className={cn(
          " py-2 px-3 rounded-full w-fit cursor-pointer active:scale-95 transition-transform",
          isCurrentUserAuthor
            ? "ml-auto bg-teal-400 text-white"
            : "bg-slate-200"
        )}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {content}
      </p>
      <span ref={actionsRef}>
        <MessageActions isActionsOpen={isActionsOpen} />
      </span>
    </div>
  );
};

export default MessageBubble;
