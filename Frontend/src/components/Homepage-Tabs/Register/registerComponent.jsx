import { useState } from "react";
import axios from "axios";
import { RegisterView } from "./View/registerView.jsx";

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

  return RegisterView({
    registerHandler,
    emailInputHandler,
    usernameInputHandler,
    passwordInputHandler,
    showPassword,
    showHidePasswordHandler,
  });
}
