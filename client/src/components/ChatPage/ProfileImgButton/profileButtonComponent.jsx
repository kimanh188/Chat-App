import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
//import axios from "axios";
import { UserContext } from "../../../contexts/userContext.jsx";
import { ProfileButtonView } from "./View/profileButtonView.jsx";

export function ProfileButtonComponent({ token }) {
  const navigate = useNavigate();

  const { loggedInProfileImg } = useContext(UserContext);
  const storedProfileImg = localStorage.getItem("loggedInProfileImg") || "";

  const profileImgPath =
    loggedInProfileImg || storedProfileImg
      ? `http://localhost:3022/${loggedInProfileImg || storedProfileImg}`
      : "src/assets/default-user-avatar.svg";
  //console.log("Profile Image Path:", profileImgPath);

  const profileRouteHandler = async () => {
    try {
      /* const getProfile = async () => {
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
      getProfile(); */
      navigate("/profile");
    } catch (error) {
      console.log("Error fetching user's profile: ", error);
    }
  };

  useEffect(() => {
    if (loggedInProfileImg) {
      localStorage.setItem("loggedInProfileImg", loggedInProfileImg);
    }
  }, [loggedInProfileImg]);

  return (
    <ProfileButtonView
      profileImgPath={profileImgPath}
      profileRouteHandler={profileRouteHandler}
    />
  );
}
