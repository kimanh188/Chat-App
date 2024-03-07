import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../contexts/userContext.jsx";
import { ProfileImgUploadView } from "./View/profileImgUploadView.jsx";

export function ProfileImgUpload({ setShowImageUpload }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [message, setMessage] = useState("");
  const { setLoggedInProfileImg, token } = useContext(UserContext);

  const onChangeFile = (event) => {
    setMessage("");
    const file = event.target.files[0];
    console.log("Selected file: ", file);
    setSelectedImg(file);
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("profileImg", selectedImg);

      const response = await axios.post(
        "http://localhost:3022/user/profile/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Response from image upload: ", response);
      setMessage(response.data.answer.message);

      // Update the profile image in the user context and local storage through the GET request to take the profile image from the server
      const getProfileImgResponse = await axios.get(
        "http://localhost:3022/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Response from get profile img: ", getProfileImgResponse);
      setLoggedInProfileImg(getProfileImgResponse.data.answer.data.profileImg);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error response: ", error.response);
        setMessage(`Error: ${error.response.data.answer.message}`);
      }
      console.log("Error uploading image: ", error);
    }
  };

  return (
    <ProfileImgUploadView
      onChangeFile={onChangeFile}
      uploadFile={uploadFile}
      message={message}
      setShowImageUpload={setShowImageUpload}
    />
  );
}
