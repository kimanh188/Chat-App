import CloseIcon from "../../../assets/close.svg";

export function CloseWindowButton({ setWindow }) {
  return (
    <button
      title="Close window"
      className="absolute top-0 right-0 hover:bg-purple-200 rounded-full p-2 transition-colors duration-300"
      onClick={() => setWindow(false)}
      type="reset"
    >
      <img src={CloseIcon} alt="close icon" />
    </button>
  );
}
