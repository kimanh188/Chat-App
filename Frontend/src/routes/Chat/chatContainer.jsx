import { ChatBoxComponent } from "../../components/ChatPage/ChatBox/chatBoxComponent.jsx";
import { ChatListComponent } from "../../components/ChatPage/ChatList/chatListComponent.jsx";

export function ChatPage() {
  return (
    <div className="flex">
      <ChatListComponent />
      <ChatBoxComponent />
    </div>
  );
}
