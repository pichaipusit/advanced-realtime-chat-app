"use client";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "@/types/message.types";
import { fakeMessages } from "@/lib/fake-data";

const ChatScreen = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(fakeMessages);

  const handleSendMessage = () => {
    const newMessage = {
      _id: Date.now().toString(),
      content: chatInput,
      authorId: "user2",
      isPinned: true,
      reactions: [{ userId: "user1", emoji: "😂" }],
      isEdited: true,
      editedAt: 1715150000000,
    };
    setMessages((prev) => [...prev, newMessage]);
    setChatInput("");
  };

  return (
    <div className=" h-screen flex flex-col container mx-auto p-3 pb-6 bg-slate-100">
      <nav>anv and note</nav>
      <section className="flex-1 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} {...msg} />
        ))}
      </section>
      <footer className="relative">
        <input
          type="text"
          placeholder="type message..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="p-3 bg-slate-200 rounded-full w-full"
          onKeyUp={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <Button
          onClick={handleSendMessage}
          className="absolute right-2 rounded-full top-1/2 -translate-y-1/2 bg-teal-500 hover:bg-teal-400"
        >
          <Send />
        </Button>
      </footer>
    </div>
  );
};

export default ChatScreen;
