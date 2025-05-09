"use client";
import Image from "next/image";
import ChatScreen from "./_components/chat/ChatScreen";
import { Authenticated, Unauthenticated } from "convex/react";
import GuestChatScreen from "./_components/chat/GuestChatScreen";

export default function Home() {
  return (
    <div className="h-screen w-screen ">
      <main>
        <Authenticated>
          <ChatScreen />
        </Authenticated>

        <Unauthenticated>
          <GuestChatScreen />
        </Unauthenticated>
      </main>
    </div>
  );
}
