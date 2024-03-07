import { CloseWindowButton } from "../../Buttons/closeWindowButtonComponent.jsx";

export function PasswordFormView({
  setCurrentPasswordInput,
  setNewPasswordInput,
  changePassword,
  cancelChange,
  message,
  setShowPasswordChange,
}) {
  return (
    <form type="submit" className="flex flex-col gap-2 relative">
      <h2 className="text-2xl font-bold text-center">Change Password</h2>
      <div className="flex flex-col">
        <label htmlFor="current-password">Current Password :</label>
        <input
          className="ml-2 pl-2 p-1 rounded-md"
          type="text"
          onChange={(e) => setCurrentPasswordInput(e.target.value)}
          id="current-password"
          name="current-password"
        />
      </div>

      <div className="flex flex-col">
        <label className="" htmlFor="new-password">
          New Password :
        </label>
        <input
          className="ml-2 pl-2 p-1 rounded-md"
          type="text"
          onChange={(e) => setNewPasswordInput(e.target.value)}
          id="new-password"
          name="new-password"
        />
      </div>

      <div className="flex justify-center gap-4 mt-2">
        <button
          className="border p-2 rounded-lg bg-yellow-600 text-white w-20 hover:bg-yellow-900 transition-colors duration-300"
          onClick={changePassword}
          type="submit"
        >
          Save
        </button>
        <button
          className="border p-2 rounded-lg bg-purple-500 text-white w-20 hover:bg-purple-900 transition-colors duration-300"
          onClick={cancelChange}
          type="reset"
        >
          Cancel
        </button>
      </div>

      <p
        className={`text-center py-1 font-semibold ${
          message.includes("Error") ? "text-red-500" : "text-green-600"
        }`}
      >
        {message}
      </p>
      <CloseWindowButton setWindow={setShowPasswordChange} />
    </form>
  );
}
