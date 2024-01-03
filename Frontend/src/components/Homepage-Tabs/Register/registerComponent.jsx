import { useState, useContext } from "react";
import axios from "axios";
import { RegisterView } from "./View/registerView.jsx";
import { UserContext } from "../../../contexts/userContext.jsx";

export function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  const {
    setLoggedInEmail,
    setLoggedInId,
    setLoggedInUsername,
    setLoggedInProfileImg,
  } = useContext(UserContext);

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
    setErrors([]);
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
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Response: ", response.data.answer);
        setLoggedInEmail(response.data.answer.data.email);
        setLoggedInUsername(response.data.answer.data.username);
        setLoggedInId(response.data.answer.data._id);
        setLoggedInProfileImg(response.data.answer.data.profileImg);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error response:", error.response);

        const { status, data } = error.response;

        if (status === 400) {
          data.answer.errors.forEach((error) => {
            console.log("Error message: ", error.msg);
            setErrors((prevErrors) => [...prevErrors, error.msg]);
          });
          return;
        }
      }

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
    errors,
  });
}
