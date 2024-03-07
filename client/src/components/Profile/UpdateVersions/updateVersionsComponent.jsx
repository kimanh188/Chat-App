import { CloseWindowButton } from "../Buttons/closeWindowButtonComponent.jsx";

export function UpdateVersions({ setShowUpdateVersions }) {
  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-center mb-4">Update</h2>
      <p className="text-center mt-2">
        Updates will be added in the future and list of update versions will be
        shown here.
      </p>

      <CloseWindowButton setWindow={setShowUpdateVersions} />
    </div>
  );
}
