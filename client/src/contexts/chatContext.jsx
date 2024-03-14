import { createContext, useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "./userContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedChat, setSelectedChat] = useState([]);
  const [messages, setMessages] = useState([]);

  const { token } = useContext(UserContext);

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
        setSelectedConversation(selectedEntity);

        const chatObjectArray = response.data.answer.data;
        setSelectedChat(chatObjectArray);

        console.log("selectedConversation: ", selectedConversation);

        setMessages(chatObjectArray);
      }
    } catch (error) {
      console.log("Error choosing a conversation: ", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        selectedConversation,
        setSelectedConversation,
        selectedChat,
        setSelectedChat,
        messages,
        setMessages,
        chooseAConversationHandler,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
