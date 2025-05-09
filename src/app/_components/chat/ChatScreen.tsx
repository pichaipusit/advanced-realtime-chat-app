"use client";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "@/types/message.types";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import LoginDialog from "@/components/LoginDialog";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const ChatScreen = () => {
  const [chatInput, setChatInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const messages = useQuery(api.messages.getMessages);
  const sendMessage = useMutation(api.messages.sendMessage);

  const { user, isSignedIn } = useUser();

  const handleSendMessage = () => {
    if (!isSignedIn) {
      // open login dialog
      setIsDialogOpen(true);
      return;
    }

    sendMessage({
      content: chatInput,
      userId: user.id,
    });
    setChatInput("");
  };

  useEffect(() => {
    console.log("user", user?.id);
  }, []);

  return (
    <div className=" h-screen flex flex-col container mx-auto p-4 pb-6 bg-slate-100 space-y-3">
      <nav className="flex">
        <SignedIn>
          <UserButton />
          {isSignedIn && (
            <h2 className="flex-1 text-center text-2xl">{user?.fullName}</h2>
          )}
        </SignedIn>

        <LoginDialog
          isDialogOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </nav>

      <section className="flex-1 space-y-2">
        {messages?.map((msg) => <MessageBubble key={msg._id} {...msg} />)}
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
