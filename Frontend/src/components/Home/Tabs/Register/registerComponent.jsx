import { useState } from "react";
import axios from "axios";

export function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const registerHandler = async (event) => {
    event.preventDefault();

    try {
      const requestData = {
        email: email,
        username: username,
        password: password,
      };

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
      className=" w-full"
      onSubmit={registerHandler}
    >
      <label
        htmlFor="email"
        className="block mb-2 pl-2 font-bold text-gray-600"
      >
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
        className="block w-full p-2 mb-2 rounded-sm  bg-gray-50 focus:bg-white text-gray-600"
      />

      <label
        htmlFor="username"
        className="block mb-2 pl-2 font-bold text-gray-600"
      >
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
        className="block w-full p-2 mb-2 rounded-sm  bg-gray-50 focus:bg-white text-gray-600"
      />

      <label
        htmlFor="password"
        className="block mb-2 pl-2 font-bold text-gray-600"
      >
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
          className="block w-full p-2 mb-2 rounded-sm  bg-gray-50 focus:bg-white text-gray-600"
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

      <button
        type="submit"
        className="bg-blue-500 text-white block w-full p-2 rounded-md font-bold hover:text-blue-500 hover:bg-blue-200"
      >
        Register
      </button>
    </form>
  );
}
