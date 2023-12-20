import { useState, useRef } from "react";
import { RegisterComponent } from "./Register/registerComponent.jsx";
import { LoginComponent } from "./Login/loginComponent.jsx";

export function TablistComponent() {
  const items = [
    {
      title: "Login",
      content: <LoginComponent />,
    },
    {
      title: "Register",
      content: <RegisterComponent />,
    },
  ];
  const [selectedTab, setSelectedTab] = useState(0);
  const tabRefs = useRef([]);

  const tabChange = (index) => {
    setSelectedTab(index);
    tabRefs.current[index]?.focus();
  };

  return (
    <div className="flex justify-center items-center py-10 w-7/12 max-w-2xl">
      <div className=" flex flex-col gap-y-2 w-full">
        <div className="bg-blue-400 p-1 rounded-xl flex justify-between items-center gap-x-2 font-bold text-white">
          {items.map((item, index) => (
            <button
              key={index}
              ref={(i) => (tabRefs.current[index] = i)}
              onClick={() => tabChange(index)}
              className={`outline-none w-full p-2 hover:bg-blue-300 rounded-xl text-center focus:ring-2 focus:bg-white focus:text-blue-600 ${
                selectedTab === index ? "ring-2 bg-white text-blue-600" : ""
              } `}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="bg-white p-2 rounded-xl">
          {items.map((item, index) => (
            <div
              className={`${selectedTab === index ? "" : "hidden"}`}
              key={index}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
