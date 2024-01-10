import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/userContext.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import { SearchComponent } from "../SearchBar/searchComponent.jsx";
import { UserProfileComponent } from "../../UserProfile/userProfileComponent.jsx";

export function ChatListComponent() {
  const { loggedInUsername } = useContext(UserContext);
  const storedUsername = localStorage.getItem("loggedInUsername") || "";
  const [token, setToken] = useState("");
  const [conversations, setConversations] = useState([]);

  const retrieveToken = () => {
    try {
      const storedToken = Cookies.get("jwt");
      console.log("1. Stored token: ", storedToken);
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
      console.log("2. Response getConversations: ", response.data.answer.data);
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
    retrieveToken();
  }, [token]);

  useEffect(() => {
    getConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // This will run only when conversations change

  /*   const chooseAConversationHandler = async () => {
    //
    try {
      const response = await axios.get(`http://localhost:3022/chat/${}`)
    } catch (error) {
      console.log("Error fetching a conversation: ", error);
    }
  }; */

  return (
    <>
      <div className="w-1/3 h-screen bg-purple-600 px-5 text-gray-900 ">
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
                className="p-2 mb-4 bg-yellow-500 rounded-md hover:bg-yellow-200 text-left border w-full"
                /* onClick={chooseAConversationHandler} */
              >
                <h3 className="font-bold">{conversation.conversationName}</h3>
                <div className="truncate">
                  {conversation.messages[0].message}
                  {/* {conversation.messages.map((mes, index) => (
                    <p key={index}>{mes.message}</p>
                  ))} */}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
