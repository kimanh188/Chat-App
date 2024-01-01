import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { TablistComponent } from "../../components/Homepage-Tabs/tablistComponent.jsx";
import { UserContext } from "../../contexts/userContext.jsx";

export function Homepage() {
  const { loggedInEmail, loggedInId, loggedInUsername } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInEmail) {
      console.log(
        "User is logged in: " +
          loggedInUsername +
          ", " +
          loggedInEmail +
          ", id: " +
          loggedInId
      );
      navigate("/chat");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInEmail]);

  return (
    <div className="bg-purple-50 h-screen flex flex-col items-center pt-20">
      <h1 className="text-blue-900 text-3xl m-5"> Let the chatting begin!</h1>
      <TablistComponent />
    </div>
  );
}
