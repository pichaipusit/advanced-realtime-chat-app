import { Message } from "@/types/message.types";

export const fakeMessages: Message[] = [
  {
    _id: "msg1",
    content: "Hello world!",
    authorId: "user1",
    isPinned: false,
    reactions: [
      { userId: "user2", emoji: "👍" },
      { userId: "user3", emoji: "❤️" },
    ],
    isEdited: false,
  },
  {
    _id: "msg2",
    content: "This message was edited.",
    authorId: "user2",
    isPinned: true,
    reactions: [{ userId: "user1", emoji: "😂" }],
    isEdited: true,
    editedAt: 1715150000000,
  },
  {
    _id: "msg3",
    content: "This message was deleted.",
    authorId: "user3",
    isPinned: false,
    reactions: [],
    isEdited: false,
    deletedAt: 1715200000000,
  },
];
