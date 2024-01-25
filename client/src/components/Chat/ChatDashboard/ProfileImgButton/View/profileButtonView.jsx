export function ProfileButtonView({ profileImgPath, profileRouteHandler }) {
  return (
    <div className="flex items-center inline-block ">
      <button onClick={profileRouteHandler}>
        <img
          src={profileImgPath}
          alt="User Avatar"
          className="rounded-full w-16 h-16 object-cover"
        />
      </button>
    </div>
  );
}
