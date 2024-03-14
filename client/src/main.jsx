import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./contexts/userContext.jsx";
import { ChatProvider } from "./contexts/chatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </UserContextProvider>
  </React.StrictMode>
);
