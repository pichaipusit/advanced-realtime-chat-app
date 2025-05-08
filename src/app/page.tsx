import Image from "next/image";
import ChatScreen from "./_components/chat/ChatScreen";

export default function Home() {
  return (
    <div className="h-screen w-screen ">
      <main>
        <ChatScreen />
      </main>
    </div>
  );
}
