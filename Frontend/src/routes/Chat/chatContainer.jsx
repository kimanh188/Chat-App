export function ChatPage() {
  return (
    <div className="flex">
      <div className="w-1/3 h-screen bg-yellow-500 ">
        <h1>All conversations with the latest message here</h1>
      </div>
      <div className="w-2/3 h-screen bg-green-500">
        <h1>Chat with a specific user here</h1>
      </div>
    </div>
  );
}
