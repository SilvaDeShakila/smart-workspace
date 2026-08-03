import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FaArrowRight, FaChartLine, FaShieldAlt, FaProjectDiagram, FaBriefcase } from 'react-icons/fa';
import DashboardLayout from './layouts/DashboardLayout';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';
import LoginPage from './pages/LoginPage';
import MeetingsPage from './pages/MeetingsPage';
import ProjectsPage from './pages/ProjectsPage';
import RegisterPage from './pages/RegisterPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import TasksPage from './pages/TasksPage';

const Logo = () => (
  <motion.div
    className="flex items-center gap-3 text-2xl font-bold"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-3 shadow-xl shadow-blue-500/20">
      <FaBriefcase className="text-white text-xl" />
    </div>
    <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Smart Workspace</span>
  </motion.div>
);

function LandingPage() {
  const [status, setStatus] = useState('Checking API...');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.success ? 'Live API' : 'API unavailable'))
      .catch(() => setStatus('API unavailable'));
  }, []);

  const features = [
    {
      title: 'Unified workflow',
      description: 'Connect projects, tasks, meetings, and documents in one polished workspace.',
      icon: FaProjectDiagram
    },
    {
      title: 'Real-time insights',
      description: 'Turn every update into action with modern reporting and team analytics.',
      icon: FaChartLine
    },
    {
      title: 'Enterprise security',
      description: 'Protect your workspace with role-based access and secure collaboration.',
      icon: FaShieldAlt
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),transparent_15%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.22),transparent_18%)] opacity-90" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-12">
        <Logo />
        <div className="flex items-center gap-3">
          <Link className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/5" to="/login">
            Sign in
          </Link>
          <Link className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95" to="/register">
            Get Started
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-12">
        <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.3em] text-slate-400 shadow-inner shadow-slate-900/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Trusted by growing teams
              </span>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Professional workspace performance for your entire team.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-400">
                Securely manage projects, meetings, documents, and insights with a premium experience built for modern teams.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link to="/register" className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:scale-[1.01]">
                Start free trial
              </Link>
              <Link to="/login" className="rounded-3xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-base text-slate-200 transition hover:bg-slate-800">
                Sign in to workspace
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {['Secure architecture', 'Team collaboration', 'Actionable reporting'].map((text) => (
                <div key={text} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-300">
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
            <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl" />
            <div className="relative space-y-6">
              <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-100 shadow-sm shadow-slate-950/10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Workspace status</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Live collaboration</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-300">
                    Active
                  </div>
                </div>
              </div>
              <div className="grid gap-4 rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
                {features.map((feature) => (
                  <div key={feature.title} className="rounded-3xl bg-slate-900/80 p-5">
                    <div className="flex items-center gap-3 text-slate-100">
                      <feature.icon className="text-xl" />
                      <h3 className="text-base font-semibold">{feature.title}</h3>
                    </div>
                    <p className="mt-3 text-sm text-slate-400">{feature.description}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Key metrics</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Projects', value: '14' },
                    { label: 'Tasks complete', value: '672' },
                    { label: 'Team utilization', value: '98%' },
                    { label: 'Meetings saved', value: '86%' }
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                      <p className="text-2xl font-semibold text-white">{stat.value}</p>
                      <p className="mt-1 text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-4 rounded-[32px] border border-white/10 bg-slate-900/70 p-8 text-slate-300 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">API connection</p>
              <p className="mt-2 text-xl font-semibold text-white">{status}</p>
            </div>
            <Link className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/90 px-5 py-3 text-sm text-white transition hover:bg-slate-800" to="/register">
              Start your workspace <FaArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'meetings', element: <MeetingsPage /> },
      { path: 'documents', element: <DocumentsPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> }
    ]
  },
  { path: '*', element: <LandingPage /> }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
