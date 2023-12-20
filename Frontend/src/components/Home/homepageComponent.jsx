import { useState } from "react";
import { LoginComponent } from "./Login/loginComponent.jsx";
import { RegisterComponent } from "./Register/registerComponent.jsx";
import "./homepage.style.css";

export function HomepageComponent() {
  const [activeTab, setActiveTab] = useState("login");
  const tabChangeHandler = (event) => {
    setActiveTab(event.target.name);
    console.log(event.target.name);
  };

  return (
    <>
      <div className="bg-blue-200 h-screen flex flex-col items-center pt-20">
        <h1 className="text-blue-800 text-3xl m-5"> Let the chatting begin!</h1>

        <div role="tablist" className="tabs tabs-bordered">
          <input
            type="radio"
            name="login-tab"
            role="tab"
            className="tab"
            aria-label="Login"
            checked={activeTab === "login-tab"}
            onChange={tabChangeHandler}
          />
          <LoginComponent />

          <input
            type="radio"
            name="register-tab"
            role="tab"
            className="tab"
            aria-label="Register"
            checked={activeTab === "register-tab"}
            onChange={tabChangeHandler}
          />
          <RegisterComponent />
        </div>
      </div>
    </>
  );
}
