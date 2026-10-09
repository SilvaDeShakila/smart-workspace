import { useState } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    { name: 'Platform Redesign', status: 'In Progress', priority: 'High' },
    { name: 'Mobile App', status: 'Review', priority: 'Medium' },
    { name: 'Internal CRM', status: 'Planning', priority: 'Low' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', status: 'Planning', priority: 'Medium' });

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setForm({ name: '', status: 'Planning', priority: 'Medium' });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleCreate(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setProjects((p) => [{ ...form, name: form.name.trim() }, ...p]);
    closeModal();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Projects</h1>
          <p className="mt-2 text-slate-600">Plan, track, and manage your team's initiatives.</p>
        </div>
        <button onClick={openModal} className="rounded-2xl bg-blue-600 px-4 py-3 font-medium text-white">New Project</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project, idx) => (
          <div key={`${project.name}-${idx}`} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">{project.priority}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">Status: {project.status}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold">Create New Project</h3>
            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm text-slate-700">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-700">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2">
                  <option>Planning</option>
                  <option>In Progress</option>
                  <option>Review</option>
                  <option>Done</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-700">Priority</label>
                <select name="priority" value={form.priority} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="rounded-md px-4 py-2">Cancel</button>
                <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
