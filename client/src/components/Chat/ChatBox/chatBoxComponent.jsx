export function ChatBoxComponent({ selectedChat, currentUser }) {
  console.log(selectedChat);
  return (
    <div className="w-2/3 h-screen bg-purple-800 px-5 text-gray-900">
      <div>
        {selectedChat.map((message, index) => (
          <div className="my-4 w-full flex items-center" key={index}>
            <span className="text-yellow-500 font-bold float-left mr-2">
              {message.sender === currentUser ? "" : message.sender}
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
    </div>
  );
}
