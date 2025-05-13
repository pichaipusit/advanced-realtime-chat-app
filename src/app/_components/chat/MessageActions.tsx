import { cn } from "@/lib/utils";
import { EditMessage, Message } from "@/types/message.types";
import { icons, Pencil, Pin, Undo, UndoDot } from "lucide-react";
import React, { MouseEventHandler } from "react";

type MessageActionsProps = {
  isActionsOpen: boolean;
  onEdit: React.PointerEventHandler<HTMLButtonElement>;
  onUnsend: React.PointerEventHandler<HTMLButtonElement>;
  onPin: React.PointerEventHandler<HTMLButtonElement>;
};
const MessageActions = ({
  isActionsOpen,
  onEdit,
  onUnsend,
  onPin,
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
    {
      label: "Pin",
      icon: <Pin />,
      onClick: onPin,
    },
  ];
  return (
    <div
      className={cn(
        "bg-slate-200 w-fit  right-1/3  rounded-md transition-all ",
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
