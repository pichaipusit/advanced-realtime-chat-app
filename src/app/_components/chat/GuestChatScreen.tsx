"use client";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Message } from "@/types/message.types";
import { fakeMessages } from "@/lib/fake-data";
import { SignedOut, useUser } from "@clerk/nextjs";
import LoginDialog from "@/components/LoginDialog";
import GuestMessageBubble from "./GuestMessageBubble";

const GuestChatScreen = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(fakeMessages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const user = useUser();

  const handleSendMessage = () => {
    if (!user.isSignedIn) {
      setIsDialogOpen(true);
      return;
    }
  };

  return (
    <div className=" h-screen flex flex-col container mx-auto p-4 pb-6 bg-slate-100 space-y-3">
      <nav className="flex">
        <SignedOut>
          <h2 className="flex-1 text-center text-2xl">Who are you?</h2>
        </SignedOut>

        <LoginDialog
          isDialogOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </nav>

      <section className="flex-1 space-y-2">
        {messages.map((msg) => (
          <GuestMessageBubble key={msg._id} {...msg} />
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

export default GuestChatScreen;
