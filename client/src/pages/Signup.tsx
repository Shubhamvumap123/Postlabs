import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/axios';
import { useAuth, type UserInfo } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post<UserInfo>('/auth/register', { email, password });
      login(data);
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || 'Registration failed');
      } else {
         toast.error('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-xl border border-zinc-800">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign up for JobTracker</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-zinc-400 text-sm mb-1 block">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm mb-1 block">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating account...' : 'Sign up'}
          </Button>
        </form>
        <p className="mt-4 text-center text-zinc-400 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
