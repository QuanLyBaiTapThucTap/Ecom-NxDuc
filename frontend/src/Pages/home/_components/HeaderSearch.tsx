const HeaderSearch = () => {
  return (
    <div className="flex flex-1">
      <input
        type="text"
        placeholder="Search anything..."
        className="h-11 w-full rounded-1-md border border-r-0 px-4 text-sm ouline-none"
      />
      <button
        type="button"
        className="h-11 w-12 rounded-r-md bg-black text-white"
      >
        🔍
      </button>
    </div>
  );
};

export default HeaderSearch;
