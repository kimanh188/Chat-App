import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
//import axios from "axios";
import { UserContext } from "../../../../contexts/userContext.jsx";
import { ProfileButtonView } from "./View/profileButtonView.jsx";

export function ProfileButtonComponent() {
  const navigate = useNavigate();

  const { loggedInProfileImg } = useContext(UserContext);
  const storedProfileImg = localStorage.getItem("loggedInProfileImg") || "";

  const profileImgPath = `http://localhost:3022/${
    loggedInProfileImg || storedProfileImg
  }`;

  //console.log("Profile Image Path:", profileImgPath);

  const profileRouteHandler = async () => {
    navigate("/profile");
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
