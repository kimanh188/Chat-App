import { useState, useContext } from "react";
import axios from "axios";
import { LoginView } from "./View/loginView.jsx";
import { UserContext } from "../../../contexts/userContext.jsx";

export function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const {
    setLoggedInEmail,
    setLoggedInId,
    setLoggedInUsername,
    setLoggedInProfileImg,
  } = useContext(UserContext);

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
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Response answer: ", response.data.answer);
        setLoggedInEmail(response.data.answer.data.email);
        setLoggedInUsername(response.data.answer.data.username);
        setLoggedInId(response.data.answer.data._id);
        setLoggedInProfileImg(response.data.answer.data.profileImg);
      }
    } catch (error) {
      // Handle axios errors to display error message
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error response:", error.response);
        const { status, data } = error.response;
        if (status === 401) {
          console.log("Error message:", data.answer.message);
          setError(data.answer.message);
          return;
        }
      }

      //"catch" other errors
      console.error("Error during login:", error.message);
    }
  };

  return LoginView({
    loginHandler,
    emailInputHandler,
    passwordInputHandler,
    showHidePasswordHandler,
    showPassword,
    error,
  });
}
