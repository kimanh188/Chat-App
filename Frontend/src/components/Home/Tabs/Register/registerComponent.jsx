import { useState } from "react";

export function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileImg, setProfileImg] = useState();

  const emailInputHandler = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const usernameInputHandler = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const passwordInputHandler = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const onClickHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form action="" className=" w-full">
      <label htmlFor="email" className="block mb-2 pl-2 font-bold">
        Email *:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="yourMagicMail@example.com"
        required={true}
        value={email}
        onChange={emailInputHandler}
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info bg-gray-50 focus:bg-white"
      />

      <label htmlFor="username" className="block mb-2 pl-2 font-bold">
        Username *:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="ChattingWizard"
        required={true}
        value={username}
        onChange={usernameInputHandler}
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info bg-gray-50 focus:bg-white"
      />

      <label htmlFor="password" className="block mb-2 pl-2 font-bold">
        Password *:
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Secure your account with 8+ chars, 1 UPPERCASE"
          required={true}
          value={password}
          onChange={passwordInputHandler}
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

      <label htmlFor="profileImg" className="block mb-2 pl-2 font-bold">
        Upload a profile image (optional):
      </label>
      <input
        type="file"
        id="profileImg"
        name="profileImg"
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white block w-full p-2 rounded-md font-bold hover:text-blue-500 hover:bg-blue-200"
      >
        Register
      </button>
    </form>
  );
}
