import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
import { CloseWindowButton } from "../Buttons/closeWindowButtonComponent.jsx";

export function ProfileInfo({ profileImgPath, setShowProfileInfo }) {
  const { loggedInUsername, loggedInEmail, loggedInId } =
    useContext(UserContext);

  const storedUsername = localStorage.getItem("loggedInUsername") || "";
  const storedEmail = localStorage.getItem("storedEmail") || "";
  const storedId = localStorage.getItem("storedId") || "";

  return (
    <div className="flex flex-col items-center relative">
      <h1 className="text-3xl m-5">Profile</h1>
      <div className="flex flex-col items-center">
        <img
          className="rounded-full w-36 h-36 border-8 p-1 border-purple-300 mb-6"
          src={profileImgPath}
          alt="User Avatar"
        />

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-gray-400 text-sm">Your name</p>
            <p className="text-lg border-b-2 border-purple-500">
              {loggedInUsername || storedUsername}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-lg border-b-2 border-purple-500">
              {loggedInEmail || storedEmail}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">User&apos;s ID</p>
            <p className="text-lg border-b-2 border-purple-500">
              {loggedInId || storedId}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Change profile image</p>
            <input className="border-b-2 border-purple-500 pb-1" type="file" />
          </div>

          <div>
            <p className="text-gray-400 text-sm">City</p>
            <input
              type="text"
              className="border-b-2 border-purple-500 p-1 w-full"
              placeholder="Add city"
            />
          </div>

          <div>
            <p className="text-gray-400 text-sm">Birthday</p>
            <input
              type="date"
              className="border-2 border-purple-500 p-1 w-full rounded-2xl"
            />
          </div>
        </div>

        <button
          className="border p-2 mt-6 mb-4 rounded-lg 
          bg-purple-300 hover:bg-yellow-300 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed
          "
          type="submit"
          disabled={true}
        >
          Save changes
        </button>
      </div>

      <CloseWindowButton setWindow={setShowProfileInfo} />
    </div>
  );
}
