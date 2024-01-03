import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/userContext.jsx";
import axios from "axios";
import Cookies from "js-cookie";

export function ChatListComponent() {
  const { loggedInUsername, loggedInProfileImg } = useContext(UserContext);

  const profileImgPath = loggedInProfileImg
    ? `http://localhost:3022/${loggedInProfileImg}`
    : "src/assets/default-user-avatar.svg";
  //console.log("Profile Image Path:", profileImgPath);

  const [token, setToken] = useState("");
  const [conversations, setConversations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
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
        console.log(
          "2. Response getConversations: ",
          response.data.answer.data
        );
        setConversations(response.data.answer.data);
        console.log("3. Conversations array: " + conversations);
      } catch (error) {
        console.log("Error fetching conversations: ", error);
      }
    };
    retrieveToken();
    getConversations();
  }, []);

  return (
    <div className="w-1/3 h-screen bg-yellow-100 px-5 text-gray-900">
      <div className="flex justify-between items-center pt-5 ">
        <h1 className="text-2xl inline-block w-2/3">
          Welcome {loggedInUsername}!
        </h1>
        <div className="flex items-center inline-block ">
          <img
            src={profileImgPath}
            alt="User Avatar"
            className="bg-blue-200 rounded-full p-1 w-16 h-16 object-cover"
          />
        </div>
      </div>

      <div>
        <h2 className="py-5">All conversations with the latest message here</h2>
        <div>
          {conversations.map((conversation, index) => (
            <div key={index} className="py-2 mb-4 bg-blue-300">
              <h3 className="font-bold">{conversation.conversationName}</h3>
              <div>
                {conversation.messages.map((mes, index) => (
                  <p key={index}>{mes.message}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
