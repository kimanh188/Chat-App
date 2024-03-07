export function ChatListComponent({
  conversations,
  chooseAConversationHandler,
  selectedConversation,
}) {
  return (
    <div className="pt-5">
      {conversations.length === 0 ? (
        <h2 className="py-5 text-gray-400">
          All conversations with the latest message here. But first, search a
          user to start a new conversation!
        </h2>
      ) : (
        <div>
          {conversations.map((conversation, index) => (
            <button
              key={index}
              className={`p-2 mb-4 rounded-md ${
                selectedConversation === conversation
                  ? "bg-yellow-100"
                  : "bg-yellow-500 hover:bg-yellow-300"
              } focus:text-indigo-900 focus:bg-yellow-100 text-left border-none w-full `}
              onClick={(event) =>
                chooseAConversationHandler(event, conversation)
              }
            >
              <h3 className="font-bold text-indigo-900">
                {conversation.conversationName}
              </h3>
              <div className="truncate text-indigo-900">
                {conversation.messages[0].message}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
