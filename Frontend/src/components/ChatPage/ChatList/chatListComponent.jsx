import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext.jsx";

export function ChatListComponent() {
  const { loggedInUsername } = useContext(UserContext);

  return (
    <div className="w-1/3 h-screen bg-yellow-200 px-5">
      <div className="flex justify-between content-center">
        <h1 className="py-5 text-2xl inline-block">
          Welcome {loggedInUsername}
        </h1>
        <div className="flex items-center inline-block">
          <img
            src="src/assets/default-user-avatar.svg"
            alt="User Avatar"
            className="bg-blue-200 rounded-full w-15 p-2"
          />
        </div>
      </div>

      <h2>All conversations with the latest message here</h2>
    </div>
  );
}
