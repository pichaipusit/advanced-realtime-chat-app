export type Message = {
  _id: string; // Convex document ID
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
