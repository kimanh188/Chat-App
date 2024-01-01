import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext.jsx";

export function ChatListComponent() {
  const { loggedInUsername } = useContext(UserContext);

  return (
    <div className="w-1/3 h-screen bg-yellow-200 pl-5">
      <div>
        <h1 className="py-5">Welcome {loggedInUsername}</h1>
      </div>

      <h2>All conversations with the latest message here</h2>
    </div>
  );
}
