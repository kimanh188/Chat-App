export function SearchResultComponent({ searchResults }) {
  return (
    <>
      {searchResults && (
        <div className="rounded-md">
          {searchResults.map((result, index) => (
            <div className="p-2 bg-yellow-600" key={index}>
              <button>{result}</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
