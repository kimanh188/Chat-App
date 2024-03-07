import { CloseWindowButton } from "../Buttons/closeWindowButtonComponent.jsx";

export function UpdateVersions({ setShowUpdateVersions }) {
  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-center mb-4">Update</h2>
      <p className="text-justify mt-2">
        Updates will be added in the future and list of update versions will be
        shown here.
      </p>

      <p className="text-justify mt-2">These updates coming soon:</p>
      <ul className="ml-6 list-disc">
        <li>Add location and birthday to user profile</li>
        <li>Update styles for unread messages</li>
        <li>
          Show when the user is typing a message and when the user is online
        </li>
        <li>Add feature to delete a conversation</li>
      </ul>

      <CloseWindowButton setWindow={setShowUpdateVersions} />
    </div>
  );
}
