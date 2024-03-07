import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/userContext.jsx";

export function ChatBoxComponent({ selectedChat, currentUser }) {
  const { token } = useContext(UserContext);
  const [otherUsername, setOtherUsername] = useState("");
  const [otherUserProfileImg, setOtherUserProfileImg] = useState(null);

  const responseFetchOtherUser = async (otherUsername) => {
    try {
      const response = await axios.post(
        "http://localhost:3022/search",
        {
          searchInput: otherUsername,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      let profileImgPath = "";
      if (response.data.answer.data[0].profileImg.startsWith("../")) {
        profileImgPath = response.data.answer.data[0].profileImg.substring(3);
      } else {
        profileImgPath = response.data.answer.data[0].profileImg;
      }

      setOtherUserProfileImg(`http://localhost:3022/${profileImgPath}`);
    } catch (error) {
      console.log("Error fetching other user: ", error);
    }
  };

  useEffect(() => {
    if (selectedChat.length > 0) {
      const otherUsername =
        selectedChat[0].sender === currentUser
          ? selectedChat[0].recipient
          : selectedChat[0].sender;
      setOtherUsername(otherUsername);
      responseFetchOtherUser(otherUsername);
    }
  }, [selectedChat, currentUser]);

  if (!selectedChat.length) {
    return null;
  }
  return (
    <div className="w-2/3 h-screen bg-purple-800  text-gray-900 relative">
      <div className="text-xl px-5 py-1 bg-yellow-100 w-full">
        <button>{otherUsername}</button>
      </div>

      <div className="px-5">
        {selectedChat.map((message, index) => (
          <div className="my-4 w-full flex items-center" key={index}>
            <span className="text-yellow-500 font-bold float-left mr-2">
              {message.sender === currentUser ? (
                ""
              ) : (
                <img
                  src={otherUserProfileImg}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
              )}
            </span>

            <span
              className={`text-indigo-900 bg-white rounded-lg p-2 max-w-[70%] flex justify-between ${
                message.sender === currentUser ? "ml-auto" : ""
              }`}
            >
              {message.message}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 w-full">
        <form action="" className="flex gap-2 px-5 justify-center items-center">
          <input
            type="text"
            className="w-4/5 h-14 p-2 rounded-md bg-white resize-none"
            placeholder="Type a message"
          ></input>
          <button
            type="submit"
            className=" w-1/6 h-12 bg-yellow-400 p-2 rounded-md"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
