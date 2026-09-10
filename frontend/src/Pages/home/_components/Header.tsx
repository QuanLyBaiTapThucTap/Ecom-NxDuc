import { Link } from "react-router-dom";
import HeaderActions from "./HeaderActions";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-4 py-5">
        {/* logo  */}
        <div className="shrink-0">
          <Link to="/" className="text-2xl font-bold">
            Swoo
          </Link>
        </div>
        <HeaderSearch />
        <HeaderActions />
      </div>
    </header>
  );
};
export default Header;
