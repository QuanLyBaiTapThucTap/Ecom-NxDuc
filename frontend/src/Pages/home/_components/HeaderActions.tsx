const HeaderActions = () => {
  return (
    <div className="flex items-center gap-5">
      <div className="hidden lg:block">
        <p className="text-xs text-gray-500">Hotline 24/7</p>
        <p className="text-sm font-semibold">(025) 3686 25 16</p>
      </div>
      <button type="button">↻</button>
      <button type="button">👤</button>
      <button type="button" className="relative">
        🛒
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
          2
        </span>
      </button>
    </div>
  );
};

export default HeaderActions;
