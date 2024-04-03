import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../../contexts/userContext.jsx";
import { ChatContext } from "../../../contexts/chatContext.jsx";

export function ChatBoxComponent({ currentUser }) {
  const { token } = useContext(UserContext);
  const { selectedChat, setSelectedChat, selectedConversation, socket } =
    useContext(ChatContext);

  //console.log("selectedConversation: ", selectedConversation);

  const [otherUsername, setOtherUsername] = useState("");
  const [otherUserProfileImg, setOtherUserProfileImg] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const chatContainerRef = useRef(null);

  const typingHandler = (event) => {
    setNewMessage(event.target.value);
    //typing indicator to other user:
    //socket.emit("typing", { sender: currentUser, recipient: otherUsername });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    //console.log("newMessage: ", newMessage);

    if (!newMessage.trim()) return;

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

      setSelectedChat([...selectedChat, response.data.answer.data]);
      setNewMessage("");

      socket.emit(
        "sendMessage",
        {
          message: newMessage,
          sender: currentUser,
          recipient: otherUsername,
          conversationKey: selectedConversation.conversationKey,
        },
        selectedConversation.conversationKey
      );
    } catch (error) {
      console.log("Error sending message: ", error);
    }
  };

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

  const isSameSenderAsNext = (currentIndex) => {
    if (currentIndex === selectedChat.length - 1) {
      return false; // If it's the last message -> return false
    }
    return (
      selectedChat[currentIndex].sender ===
      selectedChat[currentIndex + 1].sender
    );
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedChat]);

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

  useEffect(() => {
    if (selectedConversation && selectedConversation.conversationKey) {
      //socket = io(endpoint);
      socket.emit("setup", selectedConversation.conversationKey);
      socket.emit("joinChat", selectedConversation.conversationKey);
      socket.removeAllListeners("message");
      socket.on("message", (messageData) => {
        setSelectedChat((prevChat) => [...prevChat, messageData]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, selectedConversation]);

  if (!selectedChat.length) {
    return (
      <div className="p-5">
        No conversation selected. Click on a chat or search for a friend to
        start chatting.
      </div>
    );
  }
  //console.log("otherUserProfileImg: ", otherUserProfileImg);
  //console.log("selectedChat: ", selectedChat);

  return (
    <div className="w-2/3 h-screen bg-purple-800  text-gray-900 relative">
      <div className="text-xl px-5 py-1 mb-1 bg-yellow-100 w-full">
        <button>{otherUsername}</button>
      </div>

      <div className="px-5 overflow-y-auto h-5/6" ref={chatContainerRef}>
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
              className={`text-indigo-900 bg-white rounded-lg py-1 px-2 max-w-[60%] flex justify-between ${
                message.sender === currentUser ? "ml-auto bg-blue-100" : ""
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

      <div className=" absolute bottom-0 mt-5 w-full">
        <form
          action=""
          className="flex gap-2 px-5 mt-5 justify-center items-center"
        >
          <input
            type="text"
            className="w-4/5 h-14 p-2 rounded-md bg-white resize-none overflow-ellipsis"
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
