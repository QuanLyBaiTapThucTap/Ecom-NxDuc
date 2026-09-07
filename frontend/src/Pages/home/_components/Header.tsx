import HeaderActions from "./HeaderActions";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-4 py-5">
        {/* logo  */}
        <div className="shrink-0">
          <span className="text-2xl font-bold">Swoo</span>
        </div>
        <HeaderSearch />
        <HeaderActions />
      </div>
    </header>
  );
};
export default Header;
