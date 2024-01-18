export function ChatBoxComponent({ selectedChat, currentUser }) {
  return (
    <div className="w-2/3 h-screen bg-purple-800 px-5 text-gray-900">
      {selectedChat.length === 0 ? (
        <h1 className="py-5 text-white">
          Get the conversation started — pick one!
        </h1>
      ) : (
        <div>
          {selectedChat.map((message, index) => (
            <div key={index} className="py-2">
              <span className="text-yellow-500 font-bold">
                {message.sender === currentUser ? "" : message.sender}
              </span>

              <div className="">
                <span
                  className={`text-indigo-900 bg-white rounded-lg p-2 mb-1 max-w-[70%] ${
                    message.sender === currentUser ? "float-right" : ""
                  }`}
                >
                  {message.message}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
