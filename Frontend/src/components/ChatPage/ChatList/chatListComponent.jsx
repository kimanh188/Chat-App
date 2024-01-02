import { useState, useContext, useEffect } from "react";
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

  useEffect(() => {
    const retrieveToken = () => {
      try {
        const storedToken = Cookies.get("jwt");
        console.log("Stored token: ", storedToken);
        setToken(storedToken);
      } catch (error) {
        console.log("Error retrieving token: ", error);
      }
    };
    retrieveToken();

    const getConversations = async () => {
      try {
        const response = await axios.get("http://localhost:3022/chat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response getConversations: ", response.data);
      } catch (error) {
        console.log("Error fetching conversations: ", error);
      }
    };
    getConversations();
  }, []);

  return (
    <div className="w-1/3 h-screen bg-yellow-200 pl-5">
      <div className="flex justify-between items-center py-5 ">
        <h1 className="text-2xl inline-block w-2/3">
          Welcome {loggedInUsername}
        </h1>
        <div className="flex items-center inline-block w-1/3">
          <img
            src={profileImgPath}
            alt="User Avatar"
            className="bg-blue-200 rounded-full p-1 w-16 h-16 "
          />
        </div>
      </div>

      <div>
        <h2 className="">All conversations with the latest message here</h2>
        <div></div>
      </div>
    </div>
  );
}
