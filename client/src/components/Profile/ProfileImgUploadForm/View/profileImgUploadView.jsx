import { CloseWindowButton } from "../../Buttons/closeWindowButtonComponent.jsx";

export function ProfileImgUploadView({
  onChangeFile,
  uploadFile,
  message,
  setShowImageUpload,
}) {
  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-center mb-2">
        Upload profile image
      </h2>
      <input type="file" onChange={onChangeFile} />
      <p
        className={`text-center py-1 font-semibold ${
          message.includes("Error") ? "text-red-500" : "text-green-600"
        }`}
      >
        {message}
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <button
          type="submit"
          className="border p-2 rounded-lg bg-yellow-600 text-white w-20 hover:bg-yellow-900 transition-colors duration-300"
          onClick={uploadFile}
        >
          Upload
        </button>
        <button
          type="reset"
          className="border p-2 rounded-lg bg-purple-500 text-white w-20 hover:bg-purple-900 transition-colors duration-300"
          onClick={() => setShowImageUpload(false)}
        >
          Cancel
        </button>
      </div>

      <CloseWindowButton setWindow={setShowImageUpload} />
    </div>
  );
}
