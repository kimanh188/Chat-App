import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
//import { ChatPageComponent } from "../../components/ChatPage/chatPageComponent.jsx";
import { SearchComponent } from "../../components/Chat/SearchBar/searchComponent.jsx";
import { ProfileButtonComponent } from "../../components/Chat/ProfileImgButton/profileButtonComponent.jsx";
import { ChatBoxComponent } from "../../components/Chat/ChatBox/chatBoxComponent.jsx";
import { UserContext } from "../../contexts/userContext.jsx";

export function ChatPage() {
  const [token, setToken] = useState("");

  const { loggedInUsername } = useContext(UserContext);
  const storedUsername = localStorage.getItem("loggedInUsername") || "";

  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);

  const retrieveToken = () => {
    try {
      const storedToken = Cookies.get("jwt");
      //console.log("1. Stored token: ", storedToken);
      setToken(storedToken);
    } catch (error) {
      console.log("Error retrieving token: ", error);
    }
  };

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

  const chooseAConversationHandler = async (event, selectedConversation) => {
    try {
      event.stopPropagation();
      setSelectedChat([]);

      const conversationName = selectedConversation.conversationName;
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
    retrieveToken();
    getConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex">
      {/* <ChatPageComponent token={token} conversations={conversations} /> */}
      <div className="w-1/3 h-screen bg-purple-500 px-5 text-gray-900 ">
        <div className="flex justify-between items-center pt-5">
          <h1 className="text-white text-2xl inline-block w-2/3">
            Welcome {loggedInUsername || storedUsername}!
          </h1>

          <ProfileButtonComponent token={token} />
        </div>

        <SearchComponent
          conversations={conversations}
          chooseAConversationHandler={chooseAConversationHandler}
        />

        <div>
          {conversations.length === 0 ? (
            <h2 className="py-5 text-gray-400">
              All conversations with the latest message here. But first, search
              a user to start a new conversation!
            </h2>
          ) : (
            <div>
              {conversations.map((conversation, index) => (
                <button
                  key={index}
                  className="p-2 mb-4 rounded-md bg-yellow-500 hover:bg-yellow-300 focus:text-indigo-900 focus:bg-yellow-100 text-left border-none w-full"
                  onClick={(event) =>
                    chooseAConversationHandler(event, conversation)
                  }
                >
                  <h3 className="font-bold text-indigo-900">
                    {conversation.conversationName}
                  </h3>
                  <div className="truncate text-indigo-900">
                    {conversation.messages[0].message}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ChatBoxComponent
        selectedChat={selectedChat}
        currentUser={loggedInUsername || storedUsername}
      />
    </div>
  );
}
