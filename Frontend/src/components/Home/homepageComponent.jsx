import { LoginComponent } from "./Login/loginComponent.jsx";
import { RegisterComponent } from "./Register/registerComponent.jsx";
import "./homepage.style.css";

export function HomepageComponent() {
  return (
    <>
      <div className="bg-blue-200 h-screen flex flex-col items-center pt-20">
        <h1 className="text-blue-800 text-3xl m-5"> Let the chatting begin!</h1>

        <div role="tablist" className="tabs tabs-bordered w-2/3 max-w-2xl ">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Login"
          />
          <div role="tabpanel" className="tab-content ">
            <LoginComponent />
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Register"
            checked
          />
          <div role="tabpanel" className="tab-content">
            <RegisterComponent />
          </div>
        </div>

        {/*  */}
      </div>
    </>
  );
}
