export function LoginView({
  loginHandler,
  emailInputHandler,
  passwordInputHandler,
  showHidePasswordHandler,
  showPassword,
  error,
}) {
  return (
    <form
      action="http://localhost:3022/user/login"
      method="POST"
      id="loginForm"
      className="w-full"
      onSubmit={loginHandler}
    >
      <label
        htmlFor="email"
        className="block mb-2 pl-2 font-bold text-gray-600"
      >
        Email *:
      </label>
      <input
        type="email"
        id="login-email"
        name="email"
        placeholder="Your email"
        className="block w-full p-2 mb-2 rounded-sm bg-gray-50 focus:bg-white text-gray-600"
        required={true}
        onChange={emailInputHandler}
      />

      <label
        htmlFor="password"
        className="block mb-2 pl-2 font-bold text-gray-600"
      >
        Password *:
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="login-password"
          name="password"
          placeholder="Your password"
          required={true}
          className="block w-full p-2 mb-2 rounded-sm bg-gray-50 focus:bg-white text-gray-600"
          onChange={passwordInputHandler}
        />
        <button
          className="absolute inset-y-0 right-3 flex items-center pr-2 cursor-pointer"
          onClick={showHidePasswordHandler}
        >
          <img
            src={
              showPassword
                ? "src/assets/eye-hide.png"
                : "src/assets/eye-show.png"
            }
            alt={showPassword ? "hide eye-symbol" : "show eye-symbol"}
          />
        </button>
      </div>

      {error && <p className="text-red-600 text-md m-4 text-center">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white block w-full p-2 rounded-md font-bold hover:text-blue-500 hover:bg-blue-200"
      >
        Login
      </button>
    </form>
  );
}
