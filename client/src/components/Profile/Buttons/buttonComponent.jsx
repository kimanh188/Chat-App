export function Button({ onClick, disabled, imgSrc, text }) {
  return (
    <button
      className="flex items-center justify-center gap-2"
      onClick={onClick}
    >
      <img
        className="rounded-full border border-white bg-yellow-500 p-2 bottom-5 right-0"
        src={imgSrc}
        alt="icon"
      />
      <h6 className="font-semibold text-xl text-white hover:text-yellow-100 ">
        {text}
      </h6>
    </button>
  );
}
