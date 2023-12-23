import { useState } from "react";
import axios from "axios";

export function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgLoaded, setProfileImgLoaded] = useState(false);

  const emailInputHandler = (event) => {
    setEmail(event.target.value);
  };

  const usernameInputHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setPassword(event.target.value);
  };

  const showHidePasswordHandler = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const imageUploadHandler = (event) => {
    setProfileImg(event.target.files[0]);
    setProfileImgLoaded(true);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const requestData = {
        email: email,
        username: username,
        password: password,
      };

      // Add profileImg to requestData if it's not null
      if (profileImg !== null) {
        requestData.profileImg = profileImg;
      }

      const response = await axios.post(
        "http://localhost:3022/user/register",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response fetch: ", response);
    } catch (error) {
      console.log("Error during registration: " + error);
    }
  };

  return (
    <form
      action="http://localhost:3022/user/register"
      method="POST"
      id="registerForm"
      encType="multipart/form-data"
      className=" w-full"
    >
      <label htmlFor="email" className="block mb-2 pl-2 font-bold">
        Email *:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="yourMagicMail@example.com"
        required={true}
        value={email}
        onChange={emailInputHandler}
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info bg-gray-50 focus:bg-white"
      />

      <label htmlFor="username" className="block mb-2 pl-2 font-bold">
        Username *:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="ChattingWizard"
        required={true}
        value={username}
        onChange={usernameInputHandler}
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info bg-gray-50 focus:bg-white"
      />

      <label htmlFor="password" className="block mb-2 pl-2 font-bold">
        Password *:
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Secure your account with 8+ chars, 1 UPPERCASE"
          required={true}
          value={password}
          onChange={passwordInputHandler}
          className="block w-full p-2 mb-2 rounded-sm input-bordered input-info bg-gray-50 focus:bg-white"
        />
        <button
          className="absolute inset-y-0 right-3 flex items-center pr-2 cursor-pointer"
          onClick={showHidePasswordHandler}
        >
          <img
            src={
              showPassword
                ? "src/assets/eye-hide.png"
                : "src/assets/eye-show.png"
            }
            alt={showPassword ? "hide eye-symbol" : "show eye-symbol"}
          />
        </button>
      </div>

      <label htmlFor="profileImg" className="block mb-2 pl-2 font-bold">
        Upload a profile image (optional):
      </label>
      <div className="relative">
        <input
          type="file"
          id="profileImg"
          name="profileImg"
          accept="image/*"
          className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
          onChange={imageUploadHandler}
        />
        {profileImgLoaded && (
          <svg
            className="absolute inset-y-0 right-5 flex items-center"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4676c3"
              d="M9.71 11.29a1 1 0 0 0-1.42 1.42l3 3A1 1 0 0 0 12 16a1 1 0 0 0 .72-.34l7-8a1 1 0 0 0-1.5-1.32L12 13.54Z"
            />
            <path
              fill="#4676c3"
              d="M21 11a1 1 0 0 0-1 1a8 8 0 0 1-8 8A8 8 0 0 1 6.33 6.36A7.93 7.93 0 0 1 12 4a8.79 8.79 0 0 1 1.9.22a1 1 0 1 0 .47-1.94A10.54 10.54 0 0 0 12 2a10 10 0 0 0-7 17.09A9.93 9.93 0 0 0 12 22a10 10 0 0 0 10-10a1 1 0 0 0-1-1"
            />
          </svg>
        )}
      </div>

      <button
        className="bg-blue-500 text-white block w-full p-2 rounded-md font-bold hover:text-blue-500 hover:bg-blue-200"
        onClick={submitHandler}
      >
        Register
      </button>
    </form>
  );
}
