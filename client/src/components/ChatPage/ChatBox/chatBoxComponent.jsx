export function ChatBoxComponent({ selectedChat }) {
  return (
    <div className="w-2/3 h-screen bg-purple-800 px-5 text-gray-900">
      <h1 className="py-5 text-white">
        Get the conversation started — pick one!
      </h1>

      <div>{selectedChat}</div>
    </div>
  );
}
