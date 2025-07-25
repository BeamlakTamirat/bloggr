import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, email, password });  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-md p-8 space-y-7 bg-[#1E1E1E] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">
          Create Your Account
        </h1>
        <p className="text-center text-gray-400">
          Join the community of writers and readers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-[#00A8E8] transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-[#00A8E8] transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-[#00A8E8] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-white font-semibold rounded-md bg-[#00A8E8] hover:bg-opacity-80 transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-gray-400">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-[#00A8E8] hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;