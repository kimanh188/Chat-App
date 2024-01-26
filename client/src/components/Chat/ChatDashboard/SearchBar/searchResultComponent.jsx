export function SearchResultComponent({ searchResults }) {
  return (
    <>
      {searchResults && (
        <div className="mt-2">
          {searchResults.map((result, index) => (
            <div className="p-2 bg-yellow-500 flex" key={index}>
              <img
                src={`http://localhost:3022/${result.profileImg}`}
                alt="user avatar"
                className="rounded-full w-10 h-10 object-cover"
              />
              <button className="pl-2 rounded-md hover:bg-yellow-300 focus:text-indigo-900 focus:bg-yellow-100 text-left border-none w-full">
                {result.username}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
