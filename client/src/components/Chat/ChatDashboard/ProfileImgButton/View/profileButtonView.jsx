export function ProfileButtonView({ profileImgPath, profileRouteHandler }) {
  return (
    <div className="flex items-center inline-block ">
      <button onClick={profileRouteHandler} title="Go to Profile">
        <img
          src={profileImgPath}
          alt="User Avatar"
          className="rounded-full w-16 h-16 object-cover hover:border-2 hover:p-1 hover:border-yellow-200"
        />
      </button>
    </div>
  );
}
