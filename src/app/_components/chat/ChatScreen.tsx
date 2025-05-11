"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { EditMessage, Message } from "@/types/message.types";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import LoginDialog from "@/components/LoginDialog";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useChatLogic } from "@/hooks/useChatLogic";
import { cn } from "@/lib/utils";
import PinnedBar from "./PinnedBar";

const ChatScreen = () => {
  const [isPinMenuOpen, setIsPinMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();
  const messages = useQuery(api.messages.getMessages) as Message[];

  const chat = useChatLogic();

  const pinnedMessages = messages?.filter((msg) => msg.isPinned);

  return (
    <div className="relative h-screen max-w-xl flex flex-col container mx-auto p-4 pb-6 bg-slate-100 space-y-3">
      <nav className="flex">
        <SignedIn>
          <UserButton />
          {isSignedIn && (
            <h2 className="flex-1 text-center text-2xl">{user?.fullName}</h2>
          )}
        </SignedIn>

        <LoginDialog
          isDialogOpen={chat.isDialogOpen}
          onClose={() => chat.setIsDialogOpen(false)}
        />
      </nav>

      {pinnedMessages && (
        <PinnedBar
          pinnedMessages={pinnedMessages}
          isPinMenuOpen={isPinMenuOpen}
          setIsPinMenuOpen={setIsPinMenuOpen}
        />
      )}

      <section className="flex-1 space-y-4 mt-8">
        {messages?.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            onEdit={chat.handleEditMessage}
            onUnsend={chat.handleUnsendMessage}
            onPin={chat.handlePinMessage}
          />
        ))}
      </section>
      <footer className="relative">
        <input
          type="text"
          placeholder="type message..."
          value={chat.chatInput}
          onChange={(e) => chat.setChatInput(e.target.value)}
          className="p-3 bg-slate-200 rounded-full w-full"
          onKeyUp={(e) => {
            if (e.key === "Enter") chat.handleSendMessage();
          }}
        />
        <Button
          onClick={chat.handleSendMessage}
          className="absolute right-2 rounded-full top-1/2 -translate-y-1/2 bg-teal-500 hover:bg-teal-400"
        >
          <Send />
        </Button>
      </footer>
    </div>
  );
};

export default ChatScreen;
