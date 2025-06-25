import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { forgotAPI } from '../Services/userServices';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/img3.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: forgotAPI,
    mutationKey: ['Forgot'],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutateAsync({ email });
    setTimeout(() => {
      setMessage(`If an account with ${email} exists, a reset link has been sent.`);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-blue-500">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Forgot Password</h2>
        {message ? (
          <div className="bg-green-100 text-green-800 border border-green-300 text-center p-4 rounded-lg">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Send Reset Link
            </button>
          </form>
        )}
        <button
          onClick={() => navigate('/login')}
          className="mt-6 w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
        >
          ⬅ Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
