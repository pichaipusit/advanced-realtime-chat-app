import { cn } from "@/lib/utils";
import { EditMessage, Message } from "@/types/message.types";
import { icons, Pencil, Undo, UndoDot } from "lucide-react";
import React, { MouseEventHandler } from "react";

type MessageActionsProps = {
  isActionsOpen: boolean;
  onEdit: MouseEventHandler<HTMLButtonElement>;
  onUnsend: MouseEventHandler<HTMLButtonElement>;
};
const MessageActions = ({
  isActionsOpen,
  onEdit,
  onUnsend,
}: MessageActionsProps) => {
  const actions = [
    {
      label: "Edit",
      icon: <Pencil />,
      onClick: onEdit,
    },
    {
      label: "Unsend",
      icon: <UndoDot className="text-red-400" />,
      onClick: onUnsend,
    },
  ];
  return (
    <div
      className={cn(
        "bg-slate-200 w-1/3 absolute right-1/3  rounded-md transition-all z-50",
        isActionsOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}
    >
      {isActionsOpen &&
        actions.map((act) => (
          <button
            key={act.label}
            onClick={act.onClick}
            className={cn("flex space-x-2 p-2 cursor-pointer w-full")}
          >
            {act.icon}
            <p className={cn(act.label === "Unsend" && "text-red-400")}>
              {act.label}{" "}
            </p>
          </button>
        ))}
    </div>
  );
};

export default MessageActions;
