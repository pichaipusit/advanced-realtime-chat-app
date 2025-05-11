import { Id } from "../../convex/_generated/dataModel";

export type Message = {
  _id: Id<"messages">; // Convex document ID
  content: string;
  authorId: string;
  isPinned: boolean;
  reactions: {
    userId: string;
    emoji: string;
  }[];
  isEdited: boolean;
  editedAt?: number;
  deletedAt?: number;
};

export type EditMessage = Pick<Message, "_id" | "content">;
export type UnsendMessage = Id<"messages">;
