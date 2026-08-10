import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import axios from 'axios';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin ? { email, password } : { name, email, password };

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}${endpoint}`, payload);
      const data = res.data;

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Logged in successfully');
        navigate('/dashboard');
      } else {
        toast.success('Registered successfully. Please login.');
        setIsLogin(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.response?.data?.error || error.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md p-8 bg-zinc-900/80 rounded-2xl border border-zinc-800 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isLogin ? 'Login to Job Tracker' : 'Create an Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Name</label>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
                className="bg-zinc-950 border-zinc-800 text-white"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Email</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-zinc-950 border-zinc-800 text-white"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Password</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-zinc-950 border-zinc-800 text-white"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-zinc-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 hover:text-purple-300"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
