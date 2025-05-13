import { useChatLogic } from "@/hooks/useChatLogic";
import { useHold } from "@/hooks/useHold";
import { cn } from "@/lib/utils";
import { Message, MessageId } from "@/types/message.types";
import { ChevronRight } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

type PinnedBarProps = {
  pinnedMessages: Message[];
  isPinMenuOpen: boolean;
  setIsPinMenuOpen: Dispatch<SetStateAction<boolean>>;
  onScrollToMessage: (id: MessageId) => void;
};
const PinnedBar = ({
  pinnedMessages,
  isPinMenuOpen,
  setIsPinMenuOpen,
  onScrollToMessage,
}: PinnedBarProps) => {
  const { handlePinMessage } = useChatLogic();
  const { handlePointerDown, handlePointerUp } = useHold<MessageId>({
    onHold: (id) => handlePinMessage(id),
  });

  return (
    <div className="z-50">
      {pinnedMessages && (
        <div className="bg-slate-200 w-full max-w-xl fixed top-18 left-1/2 -translate-1/2 right-0 cursor-pointer">
          {pinnedMessages.length > 0 && (
            <button
              className="p-2 w-full text-left flex cursor-pointer "
              onClick={() => setIsPinMenuOpen(!isPinMenuOpen)}
            >
              <ChevronRight
                className={cn(
                  isPinMenuOpen && "rotate-90",
                  "transition-transform"
                )}
              />{" "}
              {pinnedMessages[0].content}
            </button>
          )}

          <ul
            className={cn(
              " pl-4 transition-all w-full overflow-hidden bg-slate-200 absolute top-8",
              isPinMenuOpen ? "translate-y-2 h-fit" : "translate-y-0 h-0"
            )}
          >
            {pinnedMessages.map((msg) => (
              <li
                key={msg._id}
                className="py-2"
                onPointerDown={() => {
                  handlePointerDown(msg._id);
                  onScrollToMessage(msg._id);
                }}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                {msg.content}{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PinnedBar;
