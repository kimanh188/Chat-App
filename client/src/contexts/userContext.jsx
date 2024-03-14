import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [loggedInId, setLoggedInId] = useState(null);
  const [loggedInProfileImg, setLoggedInProfileImg] = useState(null);

  const [token, setToken] = useState("");

  const retrieveToken = () => {
    try {
      const storedToken = Cookies.get("jwt");
      setToken(storedToken);
    } catch (error) {
      console.log("Error retrieving token: ", error);
    }
  };

  useEffect(() => {
    retrieveToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedInEmail,
        setLoggedInEmail,
        loggedInUsername,
        setLoggedInUsername,
        loggedInId,
        setLoggedInId,
        loggedInProfileImg,
        setLoggedInProfileImg,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
