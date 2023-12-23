import { useState } from "react";

export function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const onClickHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form action="" method="get" id="loginForm" className="w-full">
      <label htmlFor="email" className="block mb-2 pl-2 font-bold">
        Email *:
      </label>
      <input
        type="email"
        id="login-email"
        name="email"
        placeholder="Your email"
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
      />

      <label htmlFor="password" className="block mb-2 pl-2 font-bold">
        Password *:
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="login-password"
          name="password"
          placeholder="Secure your account with 8+ chars, 1 UPPERCASE"
          required={true}
          className="block w-full p-2 mb-2 rounded-sm input-bordered input-info bg-gray-50 focus:bg-white"
        />
        <button
          className="absolute inset-y-0 right-3 flex items-center pr-2 cursor-pointer"
          onClick={onClickHandler}
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

      <button className="bg-blue-500 text-white block w-full p-2 rounded-md font-bold hover:text-blue-500 hover:bg-blue-200">
        Login
      </button>
    </form>
  );
}
