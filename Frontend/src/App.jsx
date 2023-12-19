import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LoginComponent } from "./components/Login/loginComponent.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={"/"}>
        <Route index element={<LoginComponent />} />
      </Route>
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
