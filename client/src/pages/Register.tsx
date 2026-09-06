import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import api from '../lib/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { email, password });
      login(response.data.token, response.data.user);
      toast.success('Registered successfully');
      navigate('/dashboard');
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || 'Registration failed');
      } else {
        toast.error('Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md p-8 bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:ring-2 focus:ring-purple-500 outline-none"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:ring-2 focus:ring-purple-500 outline-none"
              required
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded font-medium transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-zinc-400">
          Already have an account? <Link to="/login" className="text-purple-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
