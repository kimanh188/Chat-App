import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Homepage } from "./routes/Home/homeContainer.jsx";
import { ChatPage } from "./routes/Chat/chatContainer.jsx";
import { UserProfilePage } from "./routes/UsersProfile/profileContainer.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={"/"}>
        <Route index element={<Homepage />} />
        <Route path={"/login"} element={<Homepage />} />
        <Route path={"/register"} element={<Homepage />} />
      </Route>
      <Route path={"/chat"} element={<ChatPage />} />
      <Route path={"/profile"} element={<UserProfilePage />} />
      <Route path={"*"} element={"404 Not Found"} />
    </>
  )
);

function App() {
  return (
    <>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </>
  );
}

export default App;
