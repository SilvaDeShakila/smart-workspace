
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, CheckCircle2, Clock3, AlertCircle } from 'lucide-react';
import api from '../services/api';

const statusLabels = {
  planning: 'Planning',
  active: 'Active',
  completed: 'Completed',
  'on-hold': 'On Hold'
};

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const response = await api.get('/projects');
        const data = response.data?.data;
        const items = data?.projects ?? data?.data?.projects ?? [];

        if (!cancelled) setProjects(Array.isArray(items) ? items : []);
      } catch {
        if (!cancelled) setError('Unable to load projects. Please refresh the page.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  const active = projects.filter((p) => p.status === 'active').length;
  const completed = projects.filter((p) => p.status === 'completed').length;
  const planning = projects.filter((p) => p.status === 'planning').length;
  const onHold = projects.filter((p) => p.status === 'on-hold').length;

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderKanban, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Projects', value: active, icon: Clock3, color: 'bg-cyan-50 text-cyan-600' },
    { label: 'Completed', value: completed, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'On Hold', value: onHold, icon: AlertCircle, color: 'bg-amber-50 text-amber-600' }
  ];

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[24px] bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-soft"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-blue-100">SMART WORKSPACE</p>
        <h1 className="mt-3 text-3xl font-semibold">Dashboard Overview</h1>
        <p className="mt-3 max-w-2xl text-sm text-blue-50">
          Track your projects and monitor progress from one place.
        </p>
      </motion.section>

      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.label}</p>
                <span className={`rounded-xl p-3 ${item.color}`}>
                  <Icon size={21} />
                </span>
              </div>
              <p className="mt-4 text-3xl font-semibold text-slate-900">
                {loading ? '—' : item.value}
              </p>
            </motion.div>
          );
        })}
      </section>

      <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Project Overview</h2>
            <p className="mt-1 text-sm text-slate-500">Live summary from your project database</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            {loading ? 'Loading…' : `${projects.length} projects`}
          </span>
        </div>

        {loading ? (
          <p className="py-8 text-sm text-slate-500">Loading projects…</p>
        ) : projects.length === 0 && !error ? (
          <p className="py-8 text-sm text-slate-500">No projects yet. Create your first project to see it here.</p>
        ) : (
          <>
            <div className="mt-6 space-y-5">
              {projects.slice(0, 5).map((project) => {
                const progress = Math.max(0, Math.min(100, Number(project.progress) || 0));

                return (
                  <div key={project._id} className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium text-slate-800">{project.name}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        {statusLabels[project.status] || project.status || 'Planning'}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-right text-xs text-slate-500">{progress}% complete</p>
                  </div>
                );
              })}
            </div>
            {projects.length > 5 && (
              <p className="mt-4 text-sm text-slate-500">
                Showing 5 of {projects.length} projects.
              </p>
            )}
          </>
        )}

        <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Planning</p>
            <p className="mt-1 text-2xl font-semibold text-slate-800">{loading ? '—' : planning}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">On Hold</p>
            <p className="mt-1 text-2xl font-semibold text-slate-800">{loading ? '—' : onHold}</p>
          </div>
        </div>
      </section>
    </div>
  );
}