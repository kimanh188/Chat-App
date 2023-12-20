export function RegisterComponent() {
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
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
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
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
      />

      <label htmlFor="password" className="block mb-2 pl-2 font-bold">
        Password *:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Secure your account with 8+ chars, 1 UPPERCASE"
        required={true}
        className="block w-full p-2 mb-2 rounded-sm input-bordered input-info"
      />

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
        className="bg-blue-500 text-white block w-full p-2 rounded-md"
      >
        Register
      </button>
    </form>
  );
}
