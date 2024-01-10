import { useState } from "react";
import axios from "axios";
import { SearchComponent } from "../SearchBar/searchComponent.jsx";
import { UserProfileComponent } from "../../UserProfile/userProfileComponent.jsx";
import { ChatBoxComponent } from "../ChatBox/chatBoxComponent.jsx";

export function ChatListComponent({
  token,
  loggedInUsername,
  storedUsername,
  conversations,
}) {
  const [selectedChat, setSelectedChat] = useState([]);

  const chooseAConversationHandler = async (event, selectedConversation) => {
    try {
      event.stopPropagation();
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
      chatObjectArray.forEach((message) => {
        setSelectedChat((prevMes) => [...prevMes, message.message]);
      });
      /* setSelectedChat(response.data.answer.data); */
    } catch (error) {
      console.log("Error during fetching chat: " + error);
    }
  };

  return (
    <>
      <div className="w-1/3 h-screen bg-purple-500 px-5 text-gray-900 ">
        <SearchComponent />
        <div className="flex justify-between items-center pt-5 ">
          <h1 className="text-white text-2xl inline-block w-2/3">
            Welcome {loggedInUsername || storedUsername}!
          </h1>

          <UserProfileComponent />
        </div>

        <div>
          <h2 className="py-5 text-gray-400">
            All conversations with the latest message here
          </h2>
          <div>
            {conversations.map((conversation, index) => (
              <button
                key={index}
                className="p-2 mb-4 rounded-md bg-yellow-500 hover:bg-yellow-100 text-left border-none w-full"
                onClick={(event) =>
                  chooseAConversationHandler(event, conversation)
                }
              >
                <h3 className="font-bold text-indigo-900">
                  {conversation.conversationName}
                </h3>
                <div className="truncate text-white hover:text-indigo-900">
                  {conversation.messages[0].message}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ChatBoxComponent selectedChat={selectedChat} />
    </>
  );
}
