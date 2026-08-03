export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Reports</h1>
        <p className="mt-2 text-slate-600">Analytics, performance reports, and export-ready summaries.</p>
      </div>
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Weekly performance</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">Task completion: 87%</div>
          <div className="rounded-2xl bg-slate-50 p-4">Attendance: 94%</div>
          <div className="rounded-2xl bg-slate-50 p-4">Delivery: 91%</div>
        </div>
      </div>
    </div>
  );
}
