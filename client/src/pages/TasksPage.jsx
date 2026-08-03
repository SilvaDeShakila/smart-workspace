export default function TasksPage() {
  const lanes = ['Backlog', 'In Progress', 'Review', 'Done'];
  const tasks = { Backlog: ['Draft requirements'], 'In Progress': ['Build dashboard'], Review: ['QA review'], Done: ['Deployment prep'] };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Tasks</h1>
        <p className="mt-2 text-slate-600">Kanban board view for managing execution.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        {lanes.map((lane) => (
          <div key={lane} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="font-semibold text-slate-900">{lane}</h2>
            <div className="mt-3 space-y-2">
              {tasks[lane].map((task) => (
                <div key={task} className="rounded-2xl bg-slate-50 px-3 py-3 text-sm text-slate-700">{task}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
