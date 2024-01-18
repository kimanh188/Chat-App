import { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../../contexts/userContext.jsx";

export function UserProfileComponent() {
  const [token, setToken] = useState("");

  const { loggedInProfileImg } = useContext(UserContext);

  const profileImgPath = loggedInProfileImg
    ? `http://localhost:3022/${loggedInProfileImg}`
    : "src/assets/default-user-avatar.svg";
  //console.log("Profile Image Path:", profileImgPath);

  const profileRouteHandler = async () => {
    try {
      const retrieveToken = () => {
        const storedToken = Cookies.get("jwt");
        console.log("1. Stored token: ", storedToken);
        setToken(storedToken);
      };
      retrieveToken();

      const getProfile = async () => {
        const response = await axios.get("http://localhost:3022/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const profile = response.data.answer.data;
        for (const key in profile) {
          console.log(`${key}: ${profile[key]}`);
        }
      };
      getProfile();
    } catch (error) {
      console.log("Error fetching user's profile: ", error);
    }
  };

  return (
    <div className="flex items-center inline-block ">
      <button onClick={profileRouteHandler}>
        <img
          src={profileImgPath}
          alt="User Avatar"
          className="bg-blue-200 rounded-full p-1 w-16 h-16 object-cover"
        />
      </button>
    </div>
  );
}
