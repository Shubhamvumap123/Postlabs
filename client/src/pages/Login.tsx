import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/api';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (err) {
      toast.error((err as {response?:{data?:{message?:string},status?:number}}).response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-lg shadow-xl w-full max-w-md space-y-4 text-zinc-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to JobTracker</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 bg-zinc-800 rounded border border-zinc-700" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-2 bg-zinc-800 rounded border border-zinc-700" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-medium transition-colors">
          {loading ? 'Loading...' : 'Login'}
        </button>
        <p className="text-sm text-center mt-4">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
