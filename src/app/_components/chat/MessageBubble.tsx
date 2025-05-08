import React from "react";

type MessageBubbleProps = {
  content: string;
  isEdited: boolean;
};
const MessageBubble = (props: MessageBubbleProps) => {
  return (
    <div className="bg-teal-200 py-2 px-3 rounded-full">{props.content}</div>
  );
};

export default MessageBubble;
