import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { UserContext } from "../../contexts/userContext.jsx";
import { Button } from "../../components/Profile/Buttons/buttonComponent.jsx";
import { PasswordForm } from "../../components/Profile/PasswordForm/passwordForm.jsx";
import { ProfileImgUpload } from "../../components/Profile/ProfileImgUploadForm/profileImgUploadComponent.jsx";
import { ProfileInfo } from "../../components/Profile/ProfileInfo/profileInfoComponent.jsx";
import { AppInfo } from "../../components/Profile/AppInfo/appInfoComponent.jsx";
import { UpdateVersions } from "../../components/Profile/UpdateVersions/updateVersionsComponent.jsx";

import EditIcon from "../../assets/edit.svg";
import KeyIcon from "../../assets/key.svg";
import InfoIcon from "../../assets/info.svg";
import UpdateIcon from "../../assets/update.svg";
import LogoutIcon from "../../assets/logout.svg";

export function UserProfilePage() {
  const navigate = useNavigate();

  const { loggedInUsername, loggedInEmail, loggedInId, loggedInProfileImg } =
    useContext(UserContext);
  const storedUsername = localStorage.getItem("loggedInUsername") || "";
  const storedProfileImg = localStorage.getItem("loggedInProfileImg") || "";

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showAppInfo, setShowAppInfo] = useState(false);
  const [showUpdateVersions, setShowUpdateVersions] = useState(false);

  const profileImgPath =
    loggedInProfileImg || storedProfileImg
      ? `http://localhost:3022/${loggedInProfileImg || storedProfileImg}`
      : "src/assets/default-user-avatar.svg";

  const changeProfileImgClick = () => {
    setShowImageUpload(true);
  };

  const editProfileClick = () => {
    setShowProfileInfo(true);
  };

  const changePasswordClick = () => {
    setShowPasswordChange(true);
  };

  const showAppInfoClick = () => {
    setShowAppInfo(true);
  };

  const updateAppClick = () => {
    setShowUpdateVersions(true);
  };

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

  return (
    <div className="h-screen p-5 bg-purple-500 relative">
      <h1 className="text-4xl pb-5 text-white">Setting</h1>

      <button
        onClick={() => {
          navigate(-1);
        }}
        className="absolute bottom-5 left-5 text-white hover:text-yellow-300 hover:underline"
      >
        Back to Chat
      </button>

      <div className="flex flex-col items-center justify-center">
        <div className="relative max-w-max">
          <img
            className="rounded-full w-36 h-36 border-8 p-1 border-yellow-200"
            src={profileImgPath}
            alt="User Avatar"
          />
          <button title="Change profile image" onClick={changeProfileImgClick}>
            <img
              className="rounded-full border border-white bg-yellow-500 p-2 absolute bottom-5 right-0 hover:bg-yellow-00 transition-all duration-300"
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6/12 bg-white rounded-md p-3">
            {<PasswordForm setShowPasswordChange={setShowPasswordChange} />}
          </div>
        </>
      )}

      {showProfileInfo && (
        <>
          <div className="fixed inset-0 bg-gray-900 opacity-60 flex items-center justify-center"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6/12 bg-white rounded-md p-3">
            <ProfileInfo
              profileImgPath={profileImgPath}
              setShowProfileInfo={setShowProfileInfo}
            />
          </div>
        </>
      )}

      {showImageUpload && (
        <>
          <div className="fixed inset-0 bg-gray-900 opacity-60 flex items-center justify-center"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6/12 bg-white rounded-md p-3">
            <ProfileImgUpload setShowImageUpload={setShowImageUpload} />
          </div>
        </>
      )}

      {showAppInfo && (
        <>
          <div className="fixed inset-0 bg-gray-900 opacity-60 flex items-center justify-center"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6/12 bg-white rounded-md p-3">
            <AppInfo setShowAppInfo={setShowAppInfo} />
          </div>
        </>
      )}

      {showUpdateVersions && (
        <>
          <div className="fixed inset-0 bg-gray-900 opacity-60 flex items-center justify-center"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6/12 bg-white rounded-md p-3">
            <UpdateVersions setShowUpdateVersions={setShowUpdateVersions} />
          </div>
        </>
      )}
    </div>
  );
}
