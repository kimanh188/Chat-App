import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/userContext.jsx";

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
    <form className="flex flex-col gap-2">
      <div className="flex flex-col">
        <label className="" htmlFor="current-password">
          Current Password :
        </label>
        <input
          className="ml-2 pl-2 p-1 rounded-md"
          type="text"
          onChange={(e) => setCurrentPasswordInput(e.target.value)}
          id="current-password"
          name="current-password"
        />
      </div>

      <div className="flex flex-col">
        <label className="" htmlFor="new-password">
          New Password :
        </label>
        <input
          className="ml-2 pl-2 p-1 rounded-md"
          type="text"
          onChange={(e) => setNewPasswordInput(e.target.value)}
          id="new-password"
          name="new-password"
        />
      </div>

      <div className="flex justify-center gap-4 mt-2">
        <button
          className="border p-2 rounded-lg bg-yellow-600 text-white w-20 hover:bg-yellow-900 transition-colors duration-300"
          onClick={changePassword}
          type="submit"
        >
          Save
        </button>
        <button
          className="border p-2 rounded-lg bg-purple-500 text-white w-20 hover:bg-purple-900 transition-colors duration-300"
          onClick={cancelChange}
          type="reset"
        >
          Cancel
        </button>
      </div>

      <p
        className={`text-center py-1 font-semibold ${
          message.includes("Error") ? "text-red-500" : "text-green-600"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
