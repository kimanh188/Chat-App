export function LoginComponent() {
  return (
    <>
      <div className="bg-blue-200 h-screen flex flex-col items-center justify-center">
        <h1 className="text-blue-800 text-2xl m-5"> Let the chatting begin!</h1>
        <form action="" className="w-2/3 max-w-2xl mx-auto">
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
      </div>
    </>
  );
}
