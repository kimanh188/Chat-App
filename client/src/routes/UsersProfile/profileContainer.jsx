import { useContext, useEffect } from "react";
/* import Cookies from "js-cookie";
import axios from "axios"; */
import { UserContext } from "../../contexts/userContext.jsx";

export function UserProfilePage() {
  //const [token, setToken] = useState("");

  const { loggedInUsername, loggedInEmail, loggedInId, loggedInProfileImg } =
    useContext(UserContext);
  const storedUsername = localStorage.getItem("loggedInUsername") || "";
  const storedEmail = localStorage.getItem("loggedInEmail") || "";
  const storedId = localStorage.getItem("loggedInId") || "";
  const storedProfileImg = localStorage.getItem("loggedInProfileImg") || "";

  const profileImgPath =
    loggedInProfileImg || storedProfileImg
      ? `http://localhost:3022/${loggedInProfileImg || storedProfileImg}`
      : "src/assets/default-user-avatar.svg";

  //const [profile, setProfile] = useState({});

  /*  const retrieveToken = () => {
    try {
      const storedToken = Cookies.get("jwt");
      setToken(storedToken);
    } catch (error) {
      console.log("Error retrieving token: ", error);
    }
  }; */

  /* const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3022/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
     
      setProfile(response.data.answer.data);
      console.log("Profile: ", profile);
    } catch (error) {
      console.log("Error fetching user's profile: ", error);
    }
  }; */

  useEffect(() => {
    if (loggedInUsername) {
      localStorage.setItem("storedUsername", loggedInUsername);
    }
    if (loggedInEmail) {
      localStorage.setItem("storedEmail", loggedInEmail);
    }
    if (loggedInId) {
      localStorage.setItem("storedId", loggedInId);
    }
    if (loggedInProfileImg) {
      localStorage.setItem("storedProfileImg", loggedInProfileImg);
    }
  }, [loggedInUsername, loggedInEmail, loggedInId, loggedInProfileImg]);

  useEffect(() => {
    //retrieveToken();
    //getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>{loggedInUsername || storedUsername}&apos;s Profile </h1>
      <h2>Username: {loggedInUsername || storedUsername}</h2>
      <h2>Email: {loggedInEmail || storedEmail}</h2>
      <h2>UserId: {loggedInId || storedId}</h2>
      <h2>Profile Image: </h2>
      <img src={profileImgPath} alt="User Avatar" />
      <button className="border border-indigo-600 rounded-md p-2 m-2">
        Change Profile Image
      </button>
      <button className="border border-indigo-600 rounded-md p-2 m-2">
        Change Password
      </button>
    </>
  );
}
