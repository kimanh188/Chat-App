import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { HomepageComponent } from "./components/Home/homepageComponent";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={"/"}>
        <Route index element={<HomepageComponent />} />
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
