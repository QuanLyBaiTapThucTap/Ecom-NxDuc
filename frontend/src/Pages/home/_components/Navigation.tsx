const navigationItems = [
  {
    label: "Demos",
    hasDropdown: true,
  },
  {
    label: "Pages",
    hasDropdown: true,
  },
  {
    label: "Products",
    hasDropodown: true,
  },
  {
    label: "Contact",
    hasDropdown: false,
  },
];

const Navigation = () => {
  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4">
        <div className="flex items-center">
          <button
            type="button"
            className="bg-black px-6 py-4 text-sm font-semibold text-white"
          >
            All Categories
          </button>

          {navigationItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="flex items-center gap-1 px-5 py-4 text-sm"
            >
              {item.label}

              {item.hasDropdown && <span>⌄</span>}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-5 text-sm lg:flex">
          <button type="button">Sell on Swoo</button>
          <button type="button">Order Tracking</button>
          <button type="button">Recently Viewed ⌄</button>
          <button type="button">USD ⌄</button>
          <button type="button">Eng ⌄</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
