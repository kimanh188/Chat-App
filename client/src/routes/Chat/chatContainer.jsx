import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext.jsx";
import Cookies from "js-cookie";
import axios from "axios";
import { ChatPageComponent } from "../../components/ChatPage/chatPageComponent.jsx";

export function ChatPage() {
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

  return (
    <div className="flex">
      <ChatPageComponent
        token={token}
        loggedInUsername={loggedInUsername}
        storedUsername={storedUsername}
        conversations={conversations}
      />
    </div>
  );
}
