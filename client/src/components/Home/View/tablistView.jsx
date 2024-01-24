export function TablistView({ items, selectedTab, tabRefs, tabChangeHandler }) {
  return (
    <div className="flex justify-center items-center py-10 w-7/12 max-w-2xl">
      <div className=" flex flex-col gap-y-2 w-full">
        <div className="bg-yellow-500 p-1 rounded-xl flex justify-between items-center gap-x-2 font-bold text-white">
          {items.map((item, index) => (
            <button
              key={index}
              ref={(i) => (tabRefs.current[index] = i)}
              onClick={() => tabChangeHandler(index)}
              className={`outline-none w-full p-2 hover:bg-yellow-200 hover:text-white rounded-xl text-center focus:bg-white focus:text-indigo-900 ${
                selectedTab === index ? "bg-white text-indigo-900" : ""
              } `}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="bg-white p-2 rounded-xl">
          {items.map((item, index) => (
            <div
              className={`${selectedTab === index ? "" : "hidden"}`}
              key={index}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
