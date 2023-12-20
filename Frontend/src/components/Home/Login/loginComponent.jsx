export function LoginComponent() {
  return (
    <form action="" className="w-2/3 max-w-2xl">
      <input
        type="email"
        placeholder="Email"
        className="block w-full p-2 mb-2 rounded-sm border"
      />
      <input
        type="password"
        placeholder="Password"
        className="block w-full p-2 mb-2 rounded-sm border"
      />
      <button className="bg-blue-500 text-white block w-full p-2 rounded-md">
        Login
      </button>
    </form>
  );
}
