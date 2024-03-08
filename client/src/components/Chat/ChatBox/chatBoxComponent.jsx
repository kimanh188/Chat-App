import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/userContext.jsx";

//import io from "socket.io-client";

export function ChatBoxComponent({
  selectedChat,
  //updateSelectedChat,
  currentUser,
  selectedConversation,
}) {
  console.log("selectedChat: ", selectedChat);
  const { token } = useContext(UserContext);

  const [otherUsername, setOtherUsername] = useState("");
  const [otherUserProfileImg, setOtherUserProfileImg] = useState(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  /* 
  const conversationKey = selectedConversation.conversationKey; */

  const typingHandler = (event) => {
    setNewMessage(event.target.value);
    //typing indicator to other user:
    //socket.emit("typing", { sender: currentUser, recipient: otherUsername });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    console.log("newMessage: ", newMessage);

    if (newMessage) {
      try {
        const response = await axios.post(
          "http://localhost:3022/chat",
          {
            message: newMessage,
            sender: currentUser,
            recipient: otherUsername,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setMessages([...messages, response.data.answer.data]);
        setNewMessage("");
      } catch (error) {
        console.log("Error sending message: ", error);
      }
    }
  };

  //fetch selected chat when changes

  //chat logic to check if same sender then only shows profile img of the other one with the last message
  /*   const isSameSender = (selectedChat, message, index, currentUser) => {
    return (
      index < selectedChat.length - 1 &&
      selectedChat[index + 1].sender !== message.sender &&
      selectedChat[index].sender !== currentUser
    );
  };

  const isLastMessage = (selectedChat, index, currentUser) => {
    return (
      index === selectedChat.length - 1 &&
      selectedChat[selectedChat.length - 1].sender !== currentUser &&
      selectedChat[selectedChat.length - 1].sender
    );
  };
 */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat, currentUser]);

  if (!selectedChat.length) {
    return null;
  }

  const isSameSenderAsNext = (currentIndex) => {
    if (currentIndex === selectedChat.length - 1) {
      return false; // If it's the last message, always return false
    }
    return (
      selectedChat[currentIndex].sender ===
      selectedChat[currentIndex + 1].sender
    );
  };

  return (
    <div className="w-2/3 h-screen bg-purple-800  text-gray-900 relative">
      <div className="text-xl px-5 py-1 bg-yellow-100 w-full">
        <button>{otherUsername}</button>
      </div>

      {/*  <div className="px-5">
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
                message.sender === currentUser ? "ml-auto bg-pink-100" : ""
              }`}
            >
              {message.message}
            </span>
          </div>
        ))}
      </div> */}
      <div className="px-5">
        {selectedChat.map((message, index) => (
          <div className="my-4 w-full flex items-center" key={index}>
            {index === selectedChat.length - 1 || !isSameSenderAsNext(index) ? (
              <span className="text-yellow-500 font-bold float-left mr-2">
                {message.sender !== currentUser && (
                  <img
                    src={otherUserProfileImg}
                    alt="profile"
                    className="w-7 h-7 rounded-full"
                  />
                )}
              </span>
            ) : null}

            <span
              className={`text-indigo-900 bg-white rounded-lg py-1 px-2 max-w-[70%] flex justify-between ${
                message.sender === currentUser ? "ml-auto bg-pink-100" : ""
              }
             ${
               isSameSenderAsNext(index) && message.sender !== currentUser
                 ? "ml-9"
                 : ""
             }
              `}
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
            onChange={typingHandler}
            value={newMessage}
          ></input>
          <button
            type="submit"
            className=" w-1/6 h-12 bg-yellow-400 p-2 rounded-md"
            onClick={sendMessage}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
