import { cn } from "@/lib/utils";
import { AddReaction, MessageId } from "@/types/message.types";
import React from "react";

type ReactionPickerProps = {
  isReactionsOpen: boolean;
  onReact: ({ messageId, emoji }: AddReaction) => void;
  messageId: MessageId;
};

const ReactionPicker = ({
  isReactionsOpen,
  onReact,
  messageId,
}: ReactionPickerProps) => {
  const emojis = ["♥️", "😊", "😢"];
  return (
    <div
      className={cn(
        "bg-slate-200  top-1/2 right-1/3 rounded-md transition-all w-fit p-2 space-x-2",
        isReactionsOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}
    >
      {isReactionsOpen &&
        emojis.map((emoji) => (
          <button
            onClick={() => onReact({ messageId, emoji })}
            className="cursor-pointer"
            key={emoji}
          >
            {emoji}
          </button>
        ))}
    </div>
  );
};

export default ReactionPicker;
