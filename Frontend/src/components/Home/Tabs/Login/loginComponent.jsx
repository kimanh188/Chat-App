export function LoginComponent() {
  return (
    <form action="" className="w-full">
      <label htmlFor="email" className="block mb-2 pl-2 font-bold">
        Email *:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Your email"
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
      />

      <label htmlFor="password" className="block mb-2 pl-2 font-bold">
        Password *:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Your password"
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white block w-full p-2 rounded-md"
      >
        Login
      </button>
    </form>
  );
}
