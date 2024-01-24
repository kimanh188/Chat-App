import { useState } from "react";
import axios from "axios";

export function SearchComponent() {
  const [searchInput, setSearchInput] = useState("");

  const searchInputHandler = async (event) => {
    //console.log(event.target.value);
    try {
      setSearchInput(event.target.value);
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
    } catch (error) {
      console.log("Error searching: ", error);
    }
  };

  return (
    <input
      className="bg-white mt-3 p-2 rounded-md w-full"
      type="text"
      placeholder="Search for a friend..."
      onChange={searchInputHandler}
    />
  );
}
