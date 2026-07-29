import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../lib/api/axios';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-zinc-400 text-sm">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
          </div>
          <div>
            <label className="text-zinc-400 text-sm">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white" />
          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-md p-2 transition-colors">Login</button>
        </form>
        <p className="text-zinc-400 text-sm mt-4 text-center">Don't have an account? <Link to="/signup" className="text-purple-400 hover:text-purple-300">Sign up</Link></p>
      </div>
    </div>
  );
};
export default Login;
