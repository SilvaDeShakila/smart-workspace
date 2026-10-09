import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaBriefcase, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'employee' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', form);
      if (res.data.success) {
        setSuccessMessage('Account created! Redirecting...');
        localStorage.setItem('token', res.data.data.token);
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Registration failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = form.password.length > 0 ? Math.min(form.password.length / 12, 1) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative isolate overflow-hidden px-6 py-12 sm:px-12 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),transparent_18%)]" />
        <div className="absolute inset-y-0 left-0 w-72 bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
          <div className="space-y-6 lg:w-1/2">
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
              <FaBriefcase className="text-base" />
              Create a pro account
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Build team workflows that feel premium.
              </h1>
              <p className="max-w-xl text-base leading-8 text-slate-300">
                Sign up for polished dashboards, secure access, and faster collaboration.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Fast setup', 'Role-based access', 'Secure collaboration', 'Reporting studio'].map((item) => (
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
              <h2 className="text-2xl font-semibold text-white">Register your account</h2>
              <p className="mt-2 text-sm text-slate-400">Create secure access for your team.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Full name</label>
                <div className="relative">
                  <FaUser className="pointer-events-none absolute left-4 top-4 text-slate-500" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-12 py-4 text-slate-100 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <div className="relative">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-4 text-slate-500" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-12 py-4 text-slate-100 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                    placeholder="Create a password"
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
                {form.password && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">
                      {passwordStrength < 0.33 ? 'Weak' : passwordStrength < 0.66 ? 'Fair' : 'Strong'}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Confirm password</label>
                <div className="relative">
                  <FaLock className="pointer-events-none absolute left-4 top-4 text-slate-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-12 py-4 text-slate-100 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-4 text-slate-500 transition hover:text-slate-200"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-4 text-slate-100 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10"
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {error && (
                <div className="rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200 ring-1 ring-red-500/20">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="rounded-3xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 ring-1 ring-emerald-500/20 flex items-center gap-2">
                  <FaCheckCircle />
                  {successMessage}
                </div>
              )}

              <label className="flex items-center gap-3 cursor-pointer text-slate-300 hover:text-white transition text-sm">
                <input type="checkbox" className="w-4 h-4 rounded" required />
                I agree to the Terms of Service and Privacy Policy
              </label>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Creating account...' : 'Create account'}
                <FaArrowRight />
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
              <Link to="/login" className="text-blue-400 hover:text-blue-300">
                Already have an account?
              </Link>
              <Link to="/" className="text-slate-300 hover:text-white">
                Back to homepage
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
