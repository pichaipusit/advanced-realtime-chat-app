import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import React, { Ref, useRef, useState } from "react";
import MessageActions from "./MessageActions";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import {
  AddReaction,
  EditMessage,
  Message,
  MessageId,
} from "@/types/message.types";
import ReactionPicker from "./ReactionPicker";
import { useHold } from "@/hooks/useHold";

type MessageBubbleProps = {
  message: Message;
  onEdit: (message: EditMessage) => void;
  onUnsend: (id: MessageId) => void;
  onPin: (id: MessageId) => void;
  ref: Ref<HTMLDivElement> | undefined;
  onReact: ({ messageId, emoji }: AddReaction) => void;
};

const MessageBubble = ({
  message,
  onEdit,
  onUnsend,
  onPin,
  ref,
  onReact,
}: MessageBubbleProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isReactionsOpen, setIsReactionsOpen] = useState(false);
  const actionsRef = useRef<HTMLElement | null>(null);
  const reactionsRef = useRef<HTMLElement | null>(null);

  const { user } = useUser();
  const isMessageOwner = user?.id === message.authorId;

  const { handlePointerDown, handlePointerUp } = useHold({
    onHold: () => {
      setIsActionsOpen(true);
      setIsReactionsOpen(true);
    },
  });

  useOnClickOutside([reactionsRef, actionsRef], () => {
    setIsReactionsOpen(false);
    setIsActionsOpen(false);
  });

  return (
    <div ref={ref}>
      <div
        className={cn(
          "flex  space-x-2",
          isMessageOwner && "ml-auto justify-end items-end"
        )}
      >
        {message.isEdited && isMessageOwner && (
          <span className=" text-xs italic opacity-50  ">Edited</span>
        )}
        <div className="relative">
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
          {message.reactions.length > 0 && (
            <ul className="absolute flex left-1 top-3/4 -translate-x-1/2 rounded-full z-10">
              {message.reactions.map((reaction) => (
                <li key={reaction.userId}>{reaction.emoji} </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Reactions + Actions Menu*/}
      <div className="absolute z-50 right-1/2 flex flex-col gap-2">
        <span ref={reactionsRef}>
          <ReactionPicker
            isReactionsOpen={isReactionsOpen}
            onReact={onReact}
            messageId={message._id}
          />{" "}
        </span>
        <span ref={actionsRef}>
          {isMessageOwner && (
            <MessageActions
              isActionsOpen={isActionsOpen}
              onEdit={() => {
                setIsActionsOpen(false);
                onEdit(message);
              }}
              onUnsend={() => {
                setIsActionsOpen(false);
                onUnsend(message._id);
              }}
              onPin={() => {
                setIsActionsOpen(false);
                onPin(message._id);
              }}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
