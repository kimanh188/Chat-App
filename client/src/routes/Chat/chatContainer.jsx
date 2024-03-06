import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ChatBoxComponent } from "../../components/Chat/ChatBox/chatBoxComponent.jsx";
import { UserContext } from "../../contexts/userContext.jsx";
import { ChatDashboardComponent } from "../../components/Chat/ChatDashboard/chatDashboardComponent.jsx";

export function ChatPage() {
  const { loggedInUsername, token } = useContext(UserContext);
  const storedUsername = localStorage.getItem("loggedInUsername") || "";

  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);

  const getConversations = async () => {
    try {
      //console.log("token: " + token);
      const response = await axios.get("http://localhost:3022/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      //console.log("2. Response getConversations: ", response.data.answer.data);
      setConversations(response.data.answer.data);
    } catch (error) {
      console.log("Error fetching conversations: ", error);
    }
  };

  const chooseAConversationHandler = async (event, selectedEntity) => {
    try {
      event.stopPropagation();
      setSelectedChat([]);

      const conversationName =
        selectedEntity.conversationName || selectedEntity.username;
      console.log("conversationName: ", conversationName);

      if (conversationName) {
        const response = await axios.get(
          `http://localhost:3022/chat/${conversationName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        const chatObjectArray = response.data.answer.data;
        setSelectedChat(chatObjectArray);
      }
    } catch (error) {
      console.log("Error during fetching chat: " + error);
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
        conversations={conversations}
        chooseAConversationHandler={chooseAConversationHandler}
      />

      <ChatBoxComponent
        selectedChat={selectedChat}
        currentUser={loggedInUsername || storedUsername}
      />
    </div>
  );
}
