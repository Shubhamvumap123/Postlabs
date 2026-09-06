import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/api/axios';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data);
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700 focus:outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Password</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700 focus:outline-none focus:border-purple-500" />
          </div>
          <button type="submit" className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition-colors mt-2 cursor-pointer">Login</button>
        </form>
        <p className="text-zinc-400 text-sm text-center mt-6">
          Don't have an account? <Link to="/signup" className="text-purple-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
