export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Documents</h1>
        <p className="mt-2 text-slate-600">Upload, organize, search, and share files with your team.</p>
      </div>
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Recent files</h2>
          <button className="rounded-2xl bg-teal-500 px-4 py-2 font-medium text-white">Upload</button>
        </div>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li className="rounded-2xl bg-slate-50 px-4 py-3">Project brief.pdf</li>
          <li className="rounded-2xl bg-slate-50 px-4 py-3">Sprint roadmap.xlsx</li>
        </ul>
      </div>
    </div>
  );
}
