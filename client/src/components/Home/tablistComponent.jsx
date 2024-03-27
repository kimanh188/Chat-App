import { useState, useRef } from "react";
import { RegisterComponent } from "./Register/registerComponent.jsx";
import { LoginComponent } from "./Login/loginComponent.jsx";
import { TablistView } from "./View/tablistView.jsx";

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

  const tabChangeHandler = (index) => {
    setSelectedTab(index);
    tabRefs.current[index]?.focus();
  };

  return (
    <TablistView
      items={items}
      selectedTab={selectedTab}
      tabRefs={tabRefs}
      tabChangeHandler={tabChangeHandler}
    />
  );
}
