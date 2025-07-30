import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { userInfo, login } = useAuth();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userData = { email, password };
      const response = await api.post('/api/users/login', userData);
      login(response.data);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 md:mt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#1E1E1E] rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to continue to Bloggr.</p>
        </div>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-[#00A8E8] transition-colors" required />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-[#00A8E8] transition-colors" required />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 px-4 text-white font-semibold rounded-md bg-[#00A8E8] hover:bg-opacity-80 transition-all duration-300 disabled:bg-gray-500">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center text-gray-400">
          <p>Don't have an account? <Link to="/register" className="text-[#00A8E8] hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
