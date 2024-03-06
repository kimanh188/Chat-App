import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/userContext.jsx";
import { PasswordFormView } from "./View/passwordFormView.jsx";

export function PasswordForm({ setShowPasswordChange }) {
  const { token } = useContext(UserContext);
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [message, setMessage] = useState("");

  const changePassword = async (event) => {
    //prevent default form submission
    event.preventDefault();
    setMessage("");

    try {
      const response = await axios.put(
        "http://localhost:3022/user/profile/change-password",
        {
          currentPassword: currentPasswordInput,
          newPassword: newPasswordInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Response from change password: ", response.data.answer);
        setMessage(response.data.answer.message);
        setTimeout(() => {
          setShowPasswordChange(false);
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error response: ", error.response);
        setMessage(`Error: ${error.response.data.answer.message}`);
      }

      console.log("Error changing password: ", error);
    }
  };

  const cancelChange = () => {
    setShowPasswordChange(false);
  };

  return (
    <PasswordFormView
      setCurrentPasswordInput={setCurrentPasswordInput}
      setNewPasswordInput={setNewPasswordInput}
      changePassword={changePassword}
      cancelChange={cancelChange}
      message={message}
    />
  );
}
