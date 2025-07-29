import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-transparent p-4 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#00A8E8]">
          Bloggr
        </Link>
        <nav className="flex gap-6 items-center">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
          <Link to="/register" className="bg-[#00A8E8] text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all">
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;