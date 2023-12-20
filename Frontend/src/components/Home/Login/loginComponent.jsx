export function LoginComponent() {
  return (
    <form action="" className="w-full tab-content">
      <input
        type="email"
        placeholder="Email"
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
      />
      <input
        type="password"
        placeholder="Password"
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
      />
      <button className="bg-blue-500 text-white block w-full p-2 rounded-md">
        Login
      </button>
    </form>
  );
}
