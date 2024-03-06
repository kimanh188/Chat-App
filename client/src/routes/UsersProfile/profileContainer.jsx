import { useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../../contexts/userContext.jsx";
import EditIcon from "../../assets/edit.svg";
import KeyIcon from "../../assets/key.svg";
import InfoIcon from "../../assets/info.svg";
import UpdateIcon from "../../assets/update.svg";
import LogoutIcon from "../../assets/logout.svg";

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

  const logOutHandler = async () => {
    try {
      const response = await axios.post("http://localhost:3022/user/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Response from logout: ", response);

      //remove cookie jwt - temporary solution when figuring out why backend code doesn't remove the cookie
      Cookies.remove("jwt");

      localStorage.clear();

      window.location.href = "/login";
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

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
    <div className="h-screen p-5 mx-auto max-w-4xl">
      <h1 className="text-2xl pb-5">Setting</h1>

      <div className="flex flex-col items-center justify-center ">
        <div className="relative max-w-max">
          <img
            className="rounded-full w-36 h-36 border-8 p-1 border-purple-600"
            src={profileImgPath}
            alt="User Avatar"
          />
          <button>
            <img
              className="rounded-full border border-white bg-purple-300 p-2 absolute bottom-5 right-0"
              src={EditIcon}
              alt="edit icon"
            />
          </button>
        </div>
        <h2 className="pt-1 pb-8 text-2xl font-bold">
          {loggedInUsername || storedUsername}
        </h2>

        <div className="flex flex-col gap-4 items-start ">
          <button className="flex items-center justify-center gap-2 ">
            <img
              className="rounded-full border border-white bg-purple-400 p-2 bottom-5 right-0"
              src={EditIcon}
              alt="edit icon"
            />
            <h6 className="font-semibold text-xl hover:text-indigo-600 ">
              Edit profile
            </h6>
          </button>

          <button className="flex items-center justify-center gap-2">
            <img
              className="rounded-full border border-white bg-purple-400 p-2 bottom-5 right-0"
              src={KeyIcon}
              alt="key icon"
            />
            <h6 className="font-semibold text-xl hover:text-indigo-600 ">
              Change password
            </h6>
          </button>

          <button className="flex items-center justify-center gap-2">
            <img
              className="rounded-full border border-white bg-purple-400 p-2 bottom-5 right-0"
              src={InfoIcon}
              alt="info icon"
            />
            <h6 className="font-semibold text-xl hover:text-indigo-600 ">
              Information
            </h6>
          </button>

          <button className="flex items-center justify-center gap-2">
            <img
              className="rounded-full border border-white bg-purple-400 p-2 bottom-5 right-0"
              src={UpdateIcon}
              alt="update icon"
            />
            <h6 className="font-semibold text-xl hover:text-indigo-600 ">
              Update
            </h6>
          </button>

          <button
            className="flex items-center justify-center gap-2"
            onClick={logOutHandler}
          >
            <img
              className="rounded-full border border-white bg-purple-400 p-2 bottom-5 right-0"
              src={LogoutIcon}
              alt="logout icon"
            />
            <h6 className="font-semibold text-xl hover:text-indigo-600 ">
              Logout
            </h6>
          </button>
        </div>
      </div>
    </div>
  );
}
