import { CloseWindowButton } from "../Buttons/closeWindowButtonComponent.jsx";

export function AppInfo({ setShowAppInfo }) {
  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-center mb-4">Information</h2>
      <p className="text-justify">
        This app is my first fullstack project - a Chat App where users can
        register, login, find and chat with other users, and update their
        profile.
      </p>
      <p className="text-justify mt-2">
        This app is created using MERN stack and Tailwind CSS.
      </p>

      <CloseWindowButton setWindow={setShowAppInfo} />
    </div>
  );
}
