import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { EditMessage, MessageId } from "@/types/message.types";
import { Id } from "../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { withErrorHandler } from "@/lib/utils";

export function useChatLogic() {
  const [chatInput, setChatInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] =
    useState<Id<"messages"> | null>(null);
  const { user, isSignedIn } = useUser();

  const sendMessage = useMutation(api.messages.sendMessage);
  const editMessage = useMutation(api.messages.editMessage);
  const deleteMessage = useMutation(api.messages.deleteMessage);
  const togglePinMessage = useMutation(api.messages.togglePinMessage);

  const resetInput = () => {
    setChatInput("");
    setEditingMessageId(null);
  };

  const handleSendMessage = async () => {
    if (!isSignedIn) {
      setIsDialogOpen(true);
      return;
    }

    if (!chatInput.trim()) return;

    await withErrorHandler(async () => {
      if (editingMessageId) {
        await editMessage({
          messageId: editingMessageId,
          content: chatInput,
        });
        resetInput();
        return;
      }
      await sendMessage({
        content: chatInput,
      });
      resetInput();
    }, "Failed to send message");
  };

  const handleEditMessage = (message: EditMessage) => {
    setChatInput(message.content);
    setEditingMessageId(message._id);
  };
  const handleUnsendMessage = (messageId: MessageId) => {
    withErrorHandler(
      async () => deleteMessage({ messageId }),
      "Failed to delete message"
    );
  };
  const handlePinMessage = (messageId: MessageId) => {
    withErrorHandler(
      async () => togglePinMessage({ messageId }),
      "Failed to delete message"
    );
  };

  return {
    chatInput,
    setChatInput,
    isDialogOpen,
    setIsDialogOpen,
    handleSendMessage,
    handleEditMessage,
    handleUnsendMessage,
    handlePinMessage,
  };
}
