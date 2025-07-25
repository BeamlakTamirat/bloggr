import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#1E1E1E] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#00A8E8]">
          Bloggr
        </Link>
        <nav className="flex gap-4">
          <Link to="/login" className="hover:text-[#00A8E8] transition-colors">
            Login
          </Link>
          <Link to="/register" className="hover:text-[#00A8E8] transition-colors">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
