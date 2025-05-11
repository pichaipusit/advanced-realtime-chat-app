import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import React, {
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import MessageActions from "./MessageActions";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { EditMessage, Message, UnsendMessage } from "@/types/message.types";

type MessageBubbleProps = {
  message: Message;
  onEdit: (message: EditMessage) => void;
  onUnsend: (id: UnsendMessage) => void;
};

const MessageBubble = ({ message, onEdit, onUnsend }: MessageBubbleProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const actionsRef = useRef<HTMLElement | null>(null);

  const { user } = useUser();
  const isMessageOwner = user?.id === message.authorId;

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
      <div
        className={cn(
          "flex",
          isMessageOwner && "justify-end items-end space-x-2"
        )}
      >
        {message.isEdited && isMessageOwner && (
          <span className=" text-xs italic opacity-50  ">Edited</span>
        )}
        <p
          className={cn(
            " py-2 px-3 rounded-full w-fit cursor-pointer active:scale-95 transition-transform",
            isMessageOwner ? " bg-teal-400 text-white " : "bg-slate-200"
          )}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {message.content}
        </p>
      </div>

      <span ref={actionsRef}>
        {isMessageOwner && (
          <MessageActions
            isActionsOpen={isActionsOpen}
            onEdit={() => {
              onEdit(message);
              setIsActionsOpen(false);
            }}
            onUnsend={() => onUnsend(message._id)}
          />
        )}
      </span>
    </div>
  );
};

export default MessageBubble;
