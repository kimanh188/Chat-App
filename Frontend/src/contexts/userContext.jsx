import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loggedInEmail, setLoggedInEmail] = useState(null);

  useEffect(() => {
    try {
      axios.get("http://localhost:3022/user/profile").then((response) => {
        console.log("Response: ", response);
        setLoggedInEmail(response.data.email);
      });
    } catch (error) {
      console.log("Error during login: " + error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ loggedInEmail, setLoggedInEmail }}>
      {children}
    </UserContext.Provider>
  );
};
