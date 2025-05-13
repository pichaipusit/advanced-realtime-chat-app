import { Id } from "../../convex/_generated/dataModel";

export type MessageReaction = {
  userId: string;
  emoji: string;
};
export type AddReaction = {
  messageId: Id<"messages">;
  emoji: string;
};

export type Message = {
  _id: Id<"messages">; // Convex document ID
  content: string;
  authorId: string;
  isPinned: boolean;
  reactions: MessageReaction[];
  isEdited: boolean;
  editedAt?: number;
  deletedAt?: number;
};

export type EditMessage = Pick<Message, "_id" | "content">;
export type MessageId = Id<"messages">;
