import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowRight, FaBriefcase, FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Login failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative isolate overflow-hidden px-6 py-12 sm:px-12 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),transparent_18%)]" />
        <div className="absolute inset-y-0 right-0 w-72 bg-gradient-to-b from-purple-600/20 to-transparent blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
          <div className="space-y-6 lg:w-1/2">
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
              <FaBriefcase className="text-base" />
              Professional workspace access
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Manage work with confidence and speed.
              </h1>
              <p className="max-w-xl text-base leading-8 text-slate-300">
                Sign in to the premium environment for projects, teams, and analytics.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Secure access', 'Fast onboarding', 'Comprehensive reports', 'Team collaboration'].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20">
                <FaBriefcase className="text-xl" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Sign in to your workspace</h2>
              <p className="mt-2 text-sm text-slate-400">Secure access for your team and projects.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-12 py-4 text-slate-100 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-4 top-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-12 py-4 text-slate-100 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                    placeholder="Your secure password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-slate-500 transition hover:text-slate-200"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200 ring-1 ring-red-500/20">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                <FaArrowRight />
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
              <Link to="/register" className="text-blue-400 hover:text-blue-300">
                Create account
              </Link>
              <Link to="/" className="text-slate-400 hover:text-slate-200">
                Back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
