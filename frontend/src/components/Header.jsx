import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-transparent p-4 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#00A8E8]">
          Bloggr
        </Link>
        <nav className="flex gap-6 items-center">
          {userInfo ? (
            <>
              <span className="text-white flex items-center gap-2">
                <FaUserCircle /> {userInfo.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="bg-[#00A8E8] text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all">
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;