import { Message } from "@/types/message.types";
import { Id } from "../../convex/_generated/dataModel";

export const fakeMessages: Message[] = [
  {
    _id: "msg1" as Id<"messages">,
    content: "Hello world!",
    authorId: "user1",
    isPinned: false,
    reactions: [{ userId: "user2", emoji: "👍" }],
    isEdited: false,
  },
  {
    _id: "msg2" as Id<"messages">,
    content: "This message was edited.",
    authorId: "user2",
    isPinned: true,
    reactions: [{ userId: "user1", emoji: "😂" }],
    isEdited: true,
    editedAt: 1715150000000,
  },
  {
    _id: "msg3" as Id<"messages">,
    content: "อุ้ย หลงเข้ามาอยู่ในใจผมได้ไงครับเนี่ย 😊",
    authorId: "user1",
    isPinned: false,
    reactions: [],
    isEdited: false,
    deletedAt: 1715200000000,
  },
];
