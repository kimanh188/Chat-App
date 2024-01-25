import { ChatListComponent } from "./ChatList/chatListComponent.jsx";
import { ProfileButtonComponent } from "./ProfileImgButton/profileButtonComponent.jsx";
import { SearchComponent } from "./SearchBar/searchComponent.jsx";

export function ChatDashboardComponent({
  token,
  currentUser,
  conversations,
  chooseAConversationHandler,
}) {
  return (
    <div className="w-1/3 h-screen bg-purple-500 px-5 text-gray-900 ">
      <div className="flex justify-between items-center pt-5">
        <h1 className="text-white text-2xl inline-block w-2/3">
          Welcome {currentUser}!
        </h1>

        <ProfileButtonComponent token={token} />
      </div>

      <SearchComponent
        conversations={conversations}
        chooseAConversationHandler={chooseAConversationHandler}
      />

      <ChatListComponent
        conversations={conversations}
        chooseAConversationHandler={chooseAConversationHandler}
      />
    </div>
  );
}
