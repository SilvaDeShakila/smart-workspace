export default function ProjectsPage() {
  const projects = [
    { name: 'Platform Redesign', status: 'In Progress', priority: 'High' },
    { name: 'Mobile App', status: 'Review', priority: 'Medium' },
    { name: 'Internal CRM', status: 'Planning', priority: 'Low' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Projects</h1>
          <p className="mt-2 text-slate-600">Plan, track, and manage your team's initiatives.</p>
        </div>
        <button className="rounded-2xl bg-blue-600 px-4 py-3 font-medium text-white">New Project</button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <div key={project.name} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">{project.priority}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">Status: {project.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
