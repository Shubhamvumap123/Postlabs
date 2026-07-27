import { useState, useContext } from "react";
import type { FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../lib/api/axios";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", { name, email, password });
      authContext?.login(response.data.token, { id: response.data._id, name: response.data.name, email: response.data.email, role: response.data.role });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 p-4">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-xl shadow-lg w-full max-w-md border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create an Account</h2>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-zinc-800/50 border-white/10 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-zinc-800/50 border-white/10 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-zinc-800/50 border-white/10 text-white" />
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">Register</Button>
        </div>
        <p className="text-center text-zinc-400 mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
