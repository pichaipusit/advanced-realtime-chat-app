import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { EditMessage, UnsendMessage } from "@/types/message.types";
import { Id } from "../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";

export function useChatLogic() {
  const [chatInput, setChatInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] =
    useState<Id<"messages"> | null>(null);
  const { user, isSignedIn } = useUser();

  const sendMessage = useMutation(api.messages.sendMessage);
  const editMessage = useMutation(api.messages.editMessage);
  const deleteMessage = useMutation(api.messages.deleteMessage);

  const resetInput = () => {
    setChatInput("");
    setEditingMessageId(null);
  };

  const handleSendMessage = () => {
    if (!isSignedIn) {
      setIsDialogOpen(true);
      return;
    }

    if (!chatInput.trim()) return;

    if (editingMessageId) {
      editMessage({ messageId: editingMessageId, content: chatInput });
      resetInput();
      return;
    }

    sendMessage({
      content: chatInput,
    });
    resetInput();
  };

  const handleEditMessage = (message: EditMessage) => {
    setChatInput(message.content);
    setEditingMessageId(message._id);
  };
  const handleUnsendMessage = (messageId: UnsendMessage) => {
    deleteMessage({ messageId });
  };

  return {
    chatInput,
    setChatInput,
    isDialogOpen,
    setIsDialogOpen,
    handleSendMessage,
    handleEditMessage,
    handleUnsendMessage,
  };
}
