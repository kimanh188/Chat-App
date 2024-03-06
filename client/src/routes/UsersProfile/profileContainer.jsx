import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { UserContext } from "../../contexts/userContext.jsx";
import { Button } from "../../components/Profile/Buttons/buttonComponent.jsx";
import { PasswordForm } from "../../components/Profile/PasswordForm/passwordForm.jsx";

import EditIcon from "../../assets/edit.svg";
import KeyIcon from "../../assets/key.svg";
import InfoIcon from "../../assets/info.svg";
import UpdateIcon from "../../assets/update.svg";
import LogoutIcon from "../../assets/logout.svg";

export function UserProfilePage() {
  const {
    loggedInUsername,
    loggedInEmail,
    loggedInId,
    loggedInProfileImg,
    token,
  } = useContext(UserContext);
  const storedUsername = localStorage.getItem("loggedInUsername") || "";
  const storedEmail = localStorage.getItem("loggedInEmail") || "";
  const storedId = localStorage.getItem("loggedInId") || "";
  const storedProfileImg = localStorage.getItem("loggedInProfileImg") || "";

  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const profileImgPath =
    loggedInProfileImg || storedProfileImg
      ? `http://localhost:3022/${loggedInProfileImg || storedProfileImg}`
      : "src/assets/default-user-avatar.svg";

  const editProfileClick = () => {};

  const changePasswordClick = () => {
    setShowPasswordChange(true);
  };

  const showAppInfoClick = () => {};

  const updateAppClick = () => {};

  const logOutClick = async () => {
    try {
      const response = await axios.post("http://localhost:3022/user/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Response from logout: ", response);

      //remove cookie jwt - temporary solution when figuring out why backend code doesn't remove the cookie
      Cookies.remove("jwt");

      localStorage.clear();

      window.location.href = "/login";
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  useEffect(() => {
    if (loggedInUsername) {
      localStorage.setItem("storedUsername", loggedInUsername);
    }
    if (loggedInEmail) {
      localStorage.setItem("storedEmail", loggedInEmail);
    }
    if (loggedInId) {
      localStorage.setItem("storedId", loggedInId);
    }
    if (loggedInProfileImg) {
      localStorage.setItem("storedProfileImg", loggedInProfileImg);
    }
  }, [loggedInUsername, loggedInEmail, loggedInId, loggedInProfileImg]);

  useEffect(() => {
    //retrieveToken();
    //getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen p-5 bg-purple-500 relative">
      <h1 className="text-4xl pb-5 text-white">Setting</h1>

      <div className="flex flex-col items-center justify-center">
        <div className="relative max-w-max">
          <img
            className="rounded-full w-36 h-36 border-8 p-1 border-yellow-200"
            src={profileImgPath}
            alt="User Avatar"
          />
          <button>
            <img
              className="rounded-full border border-white bg-yellow-500 p-2 absolute bottom-5 right-0"
              src={EditIcon}
              alt="edit icon"
            />
          </button>
        </div>
        <h2 className="pt-1 pb-8 text-2xl font-bold text-yellow-100">
          {loggedInUsername || storedUsername}
        </h2>

        <div className="flex flex-col gap-4 items-start ">
          <Button
            onClick={editProfileClick}
            imgSrc={EditIcon}
            text="Edit Profile"
          />

          <Button
            onClick={changePasswordClick}
            imgSrc={KeyIcon}
            text="Change password"
          />

          <Button
            onClick={showAppInfoClick}
            imgSrc={InfoIcon}
            text="Information"
          />

          <Button onClick={updateAppClick} imgSrc={UpdateIcon} text="Update" />

          <Button onClick={logOutClick} imgSrc={LogoutIcon} text="Logout" />
        </div>
      </div>

      {showPasswordChange && (
        <>
          <div className="fixed inset-0 bg-gray-900 opacity-60 flex items-center justify-center"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6/12 bg-yellow-100 rounded-md p-3">
            {<PasswordForm setShowPasswordChange={setShowPasswordChange} />}
          </div>
        </>
      )}
    </div>
  );
}
