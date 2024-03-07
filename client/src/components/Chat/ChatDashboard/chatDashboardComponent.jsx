import { useEffect, useState } from "react";
import axios from "axios";
import { ChatListComponent } from "./ChatList/chatListComponent.jsx";
import { ProfileButtonComponent } from "./ProfileImgButton/profileButtonComponent.jsx";
import { SearchResultComponent } from "./SearchBar/searchResultComponent.jsx";

export function ChatDashboardComponent({
  token,
  currentUser,
  conversations,
  chooseAConversationHandler,
}) {
  const [showChatList, setShowChatList] = useState(true);
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const focusHandler = () => {
    setShowChatList(false);
    setShowCancelBtn(true);
  };

  const inputChangeHandler = async (event) => {
    const input = event.target.value;
    setSearchInput(input);

    try {
      if (input.length === 0) {
        const response = await axios.get("http://localhost:3022/search", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setSearchResults(response.data.answer.data);
        console.log("Search results: ", searchResults);
      } else {
        const response = await axios.post(
          "http://localhost:3022/search",
          {
            searchInput: input,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("Search results: ", response.data.answer.data);
        setSearchResults(response.data.answer.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.answer.message);
      }
      console.log("Error searching: ", error);
    }
  };

  const cancelHandler = () => {
    setShowChatList(true);
    setShowCancelBtn(false);
    setSearchInput("");
  };

  //update the error message when the search input changes
  useEffect(() => {
    setError("");
  }, [searchInput]);

  return (
    <div className="w-1/3 h-screen bg-purple-500 px-5 text-gray-900 ">
      <div className="flex justify-between items-center pt-5">
        <h1 className="text-white text-2xl inline-block w-2/3">
          Welcome {currentUser}!
        </h1>

        <ProfileButtonComponent token={token} />
      </div>

      <div className="flex justify-between pt-3">
        <input
          className="bg-white mt-3 mr-1 p-2 rounded-md w-full"
          type="text"
          placeholder="Search for a friend..."
          value={searchInput}
          onFocus={focusHandler}
          onClick={inputChangeHandler}
          onChange={inputChangeHandler}
        />
        {showCancelBtn && (
          <button
            className="text-white mt-3 rounded-md w-1/6"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        )}
      </div>

      {showChatList ? (
        <ChatListComponent
          conversations={conversations}
          chooseAConversationHandler={chooseAConversationHandler}
        />
      ) : (
        <SearchResultComponent
          searchResults={searchResults}
          chooseAConversationHandler={chooseAConversationHandler}
          error={error}
        />
      )}
    </div>
  );
}
