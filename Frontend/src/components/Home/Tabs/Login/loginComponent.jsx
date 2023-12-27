import { useState } from "react";
import axios from "axios";
import { LoginView } from "./View/loginView.jsx";

export function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailInputHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setPassword(event.target.value);
  };

  const showHidePasswordHandler = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const requestData = {
        email: email,
        password: password,
      };

      console.log("Request data: ", requestData);

      const response = await axios.post(
        "http://localhost:3022/user/login",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response: ", response);
    } catch (error) {
      console.log("Error during login: " + error);
    }
  };

  return LoginView({
    loginHandler,
    emailInputHandler,
    passwordInputHandler,
    showHidePasswordHandler,
    showPassword,
  });
}
