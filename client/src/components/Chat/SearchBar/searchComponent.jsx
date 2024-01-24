import { useState } from "react";
import axios from "axios";

export function SearchComponent({ conversations, chooseAConversationHandler }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showCancel, setShowCancel] = useState(false);

  const searchInputHandler = async (event) => {
    const input = event.target.value;

    try {
      setSearchInput(input);
      setShowCancel(true);
      console.log("Search input: ", searchInput);

      const response = await axios.post(
        "http://localhost:3022/search",
        {
          searchInput: searchInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Response answer: ", response.data.answer);
      setSearchResults(response.data.answer.data);

      console.log("Search results: ", searchResults);
    } catch (error) {
      console.log("Error searching: ", error);
    }
  };

  const focusHandler = async () => {
    setShowCancel(true);
    try {
      const response = await axios.get("http://localhost:3022/search", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setSearchResults(response.data.answer.data);
    } catch (error) {
      console.log("Error fetching search results: ", error);
    }
  };

  return (
    <>
      <div className="pt-3 pb-8">
        {showCancel ? (
          <div className="flex justify-between">
            <input
              className="bg-white mt-3 p-2 rounded-md w-4/5"
              type="text"
              placeholder="Search for a friend..."
              onChange={searchInputHandler}
            />
            <button className="text-white mt-3 rounded-md w-1/6">Cancel</button>
          </div>
        ) : (
          <input
            className="bg-white mt-3 mr-1 p-2 rounded-md w-full"
            type="text"
            placeholder="Search for a friend..."
            onFocus={focusHandler}
          />
        )}
      </div>

      {searchResults && (
        <div className=" bg-red-100">
          {searchResults.map((result, index) => (
            <div key={index}>
              <p>{result}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
