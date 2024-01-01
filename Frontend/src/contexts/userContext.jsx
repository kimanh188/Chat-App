import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [loggedInId, setLoggedInId] = useState(null);

  useEffect(() => {
    try {
      axios.post("http://localhost:3022/user/login").then((response) => {
        console.log("Response: ", response);
        console.log("id: " + response.data._id);
        setLoggedInEmail(response.data.email);
        setLoggedInId(response.data._id);
      });
    } catch (error) {
      console.log("Error during login: " + error);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ loggedInEmail, setLoggedInEmail, loggedInId, setLoggedInId }}
    >
      {children}
    </UserContext.Provider>
  );
};
