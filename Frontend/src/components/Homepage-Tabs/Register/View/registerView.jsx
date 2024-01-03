export function RegisterView({
  registerHandler,
  emailInputHandler,
  usernameInputHandler,
  passwordInputHandler,
  showPassword,
  showHidePasswordHandler,
  errors,
}) {
  return (
    <form
      action="http://localhost:3022/user/register"
      method="POST"
      id="registerForm"
      className=" w-full"
      onSubmit={registerHandler}
    >
      <label
        htmlFor="email"
        className="block mb-2 pl-2 font-bold text-gray-600"
      >
        Email *:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="yourMagicMail@example.com"
        required={true}
        onChange={emailInputHandler}
        className="block w-full p-2 mb-2 rounded-sm  bg-gray-50 focus:bg-white text-gray-600"
      />

      <label
        htmlFor="username"
        className="block mb-2 pl-2 font-bold text-gray-600"
      >
        Username *:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="ChattingWizard"
        required={true}
        onChange={usernameInputHandler}
        className="block w-full p-2 mb-2 rounded-sm  bg-gray-50 focus:bg-white text-gray-600"
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
          id="password"
          name="password"
          placeholder="Secure your account with 8+ chars, 1 UPPERCASE"
          required={true}
          onChange={passwordInputHandler}
          className="block w-full p-2 mb-2 rounded-sm  bg-gray-50 focus:bg-white text-gray-600"
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

      {errors && (
        <div className="text-red-600 text-md m-4 text-center">
          {errors.map((error, index) => (
            <span key={index}>
              {error} <br />
            </span>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white block w-full p-2 rounded-md font-bold hover:text-blue-500 hover:bg-blue-200"
      >
        Register
      </button>
    </form>
  );
}
