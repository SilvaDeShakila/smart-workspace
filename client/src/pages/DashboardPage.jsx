import { motion } from 'framer-motion';

const stats = [
  { label: 'Projects', value: '14' },
  { label: 'Tasks', value: '128' },
  { label: 'Meetings', value: '8' },
  { label: 'Attendance', value: '96%' }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 p-8 text-white shadow-soft">
        <p className="text-sm uppercase tracking-[0.35em] text-blue-100">Good morning</p>
        <h1 className="mt-2 text-3xl font-semibold">Welcome back to Smart Workspace</h1>
        <p className="mt-3 max-w-2xl text-sm text-blue-50">Here is your daily snapshot of projects, tasks, meetings, and progress.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Today’s tasks</h2>
          <ul className="mt-4 space-y-3">
            {['Design review', 'Sprint planning', 'Client follow-up'].map((task) => (
              <li key={task} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span>{task}</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">On track</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Upcoming meetings</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="rounded-2xl bg-slate-50 px-4 py-3">09:00 — Team sync</li>
            <li className="rounded-2xl bg-slate-50 px-4 py-3">12:30 — Product review</li>
            <li className="rounded-2xl bg-slate-50 px-4 py-3">16:00 — Client check-in</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
