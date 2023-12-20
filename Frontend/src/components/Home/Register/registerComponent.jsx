export function RegisterComponent() {
  return (
    <form action="" className="tab-content w-full">
      <input
        type="email"
        placeholder="Email"
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
      />
      <input
        type="text"
        placeholder="Username"
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
      />
      <input
        type="password"
        placeholder="Password"
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
      />
      <button className="bg-blue-500 text-white block w-full p-2 rounded-md">
        Register
      </button>
    </form>
  );
}
