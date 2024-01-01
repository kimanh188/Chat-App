import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [loggedInId, setLoggedInId] = useState(null);

  return (
    <UserContext.Provider
      value={{
        loggedInEmail,
        setLoggedInEmail,
        loggedInUsername,
        setLoggedInUsername,
        loggedInId,
        setLoggedInId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
