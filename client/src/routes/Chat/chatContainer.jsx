import { useEffect, useContext } from "react";
import axios from "axios";
import { ChatBoxComponent } from "../../components/Chat/ChatBox/chatBoxComponent.jsx";
import { UserContext } from "../../contexts/userContext.jsx";

import { ChatContext } from "../../contexts/chatContext.jsx";

import { ChatDashboardComponent } from "../../components/Chat/ChatDashboard/chatDashboardComponent.jsx";

export function ChatPage() {
  const { loggedInUsername, token } = useContext(UserContext);

  const { setConversations } = useContext(ChatContext);

  const storedUsername = localStorage.getItem("loggedInUsername") || "";

  const getConversations = async () => {
    try {
      //console.log("token: " + token);
      const response = await axios.get("http://localhost:3022/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setConversations(response.data.answer.data);
    } catch (error) {
      console.log("Error fetching conversations: ", error);
    }
  };

  useEffect(() => {
    if (loggedInUsername) {
      localStorage.setItem("loggedInUsername", loggedInUsername);
    }
  }, [loggedInUsername]);

  useEffect(() => {
    getConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex">
      <ChatDashboardComponent
        token={token}
        currentUser={loggedInUsername || storedUsername}
      />

      <ChatBoxComponent currentUser={loggedInUsername || storedUsername} />
    </div>
  );
}
